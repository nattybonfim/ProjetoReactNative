/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

// type only import. No runtime dependency
// eslint-disable-next-line import/no-extraneous-dependencies
const createInlinePlatformChecks = require("./utils/createInlinePlatformChecks");

const env = {
  name: "env",
};
const nodeEnv = {
  name: "NODE_ENV",
};
const processId = {
  name: "process",
};
const dev = {
  name: "__DEV__",
};

function inlinePlugin({ types: t }, options) {
  const {
    isAssignmentExpression,
    isIdentifier,
    isMemberExpression,
    isObjectExpression,
    isObjectMethod,
    isObjectProperty,
    isSpreadElement,
    isStringLiteral,
  } = t;
  const { isPlatformNode, isPlatformSelectNode } = createInlinePlatformChecks(
    t,
    options.requireName || "require"
  );

  const isGlobal = (binding) => !binding;

  const isFlowDeclared = (binding) => t.isDeclareVariable(binding.path);

  const isGlobalOrFlowDeclared = (binding) =>
    isGlobal(binding) || isFlowDeclared(binding);

  const isLeftHandSideOfAssignmentExpression = (node, parent) =>
    isAssignmentExpression(parent) && parent.left === node;

  const isProcessEnvNodeEnv = (node, scope) =>
    isIdentifier(node.property, nodeEnv) &&
    isMemberExpression(node.object) &&
    isIdentifier(node.object.property, env) &&
    isIdentifier(node.object.object, processId) &&
    isGlobal(scope.getBinding(processId.name));

  const isDev = (node, parent, scope) =>
    isIdentifier(node, dev) &&
    isGlobalOrFlowDeclared(scope.getBinding(dev.name)) &&
    !isMemberExpression(parent) && // not { __DEV__: 'value'}
    (!isObjectProperty(parent) || parent.value === node);

  function findProperty(objectExpression, key, fallback) {
    var _value;

    let value = null;

    for (const p of objectExpression.properties) {
      if (!isObjectProperty(p) && !isObjectMethod(p)) {
        continue;
      }

      if (
        (isIdentifier(p.key) && p.key.name === key) ||
        (isStringLiteral(p.key) && p.key.value === key)
      ) {
        if (isObjectProperty(p)) {
          value = p.value;
          break;
        } else if (isObjectMethod(p)) {
          value = t.toExpression(p);
          break;
        }
      }
    }

    return (_value = value) !== null && _value !== void 0 ? _value : fallback();
  }

  function hasStaticProperties(objectExpression) {
    return objectExpression.properties.every((p) => {
      if (p.computed || isSpreadElement(p)) {
        return false;
      }

      if (isObjectMethod(p) && p.kind !== "method") {
        return false;
      }

      return isIdentifier(p.key) || isStringLiteral(p.key);
    });
  }

  return {
    visitor: {
      Identifier(path, state) {
        if (!state.opts.dev && isDev(path.node, path.parent, path.scope)) {
          path.replaceWith(t.booleanLiteral(state.opts.dev));
        }
      },

      MemberExpression(path, state) {
        const node = path.node;
        const scope = path.scope;
        const opts = state.opts;

        if (!isLeftHandSideOfAssignmentExpression(node, path.parent)) {
          if (
            opts.inlinePlatform &&
            isPlatformNode(node, scope, !!opts.isWrapped)
          ) {
            path.replaceWith(t.stringLiteral(opts.platform));
          } else if (!opts.dev && isProcessEnvNodeEnv(node, scope)) {
            path.replaceWith(
              t.stringLiteral(opts.dev ? "development" : "production")
            );
          }
        }
      },

      CallExpression(path, state) {
        const node = path.node;
        const scope = path.scope;
        const arg = node.arguments[0];
        const opts = state.opts;

        if (
          opts.inlinePlatform &&
          isPlatformSelectNode(node, scope, !!opts.isWrapped) &&
          isObjectExpression(arg)
        ) {
          if (hasStaticProperties(arg)) {
            const fallback = () =>
              findProperty(arg, "native", () =>
                findProperty(arg, "default", () => t.identifier("undefined"))
              );

            path.replaceWith(findProperty(arg, opts.platform, fallback));
          }
        }
      },
    },
  };
}

module.exports = inlinePlugin;
