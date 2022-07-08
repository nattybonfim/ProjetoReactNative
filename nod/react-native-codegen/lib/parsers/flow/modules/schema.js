/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */
'use strict';

function wrapModuleSchema(nativeModuleSchema, hasteModuleName) {
  return {
    modules: {
      [hasteModuleName]: nativeModuleSchema,
    },
  };
}

module.exports = {
  wrapModuleSchema,
};