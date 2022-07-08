/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _HermesParserDeserializer = _interopRequireDefault(require("./HermesParserDeserializer"));

var _HermesParserWASM = _interopRequireDefault(require("./HermesParserWASM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hermesParse = _HermesParserWASM["default"].cwrap('hermesParse', 'number', ['number', 'number', 'number', 'number', 'number']);

var hermesParseResult_free = _HermesParserWASM["default"].cwrap('hermesParseResult_free', 'void', ['number']);

var hermesParseResult_getError = _HermesParserWASM["default"].cwrap('hermesParseResult_getError', 'string', ['number']);

var hermesParseResult_getErrorLine = _HermesParserWASM["default"].cwrap('hermesParseResult_getErrorLine', 'number', ['number']);

var hermesParseResult_getErrorColumn = _HermesParserWASM["default"].cwrap('hermesParseResult_getErrorColumn', 'number', ['number']);

var hermesParseResult_getProgramBuffer = _HermesParserWASM["default"].cwrap('hermesParseResult_getProgramBuffer', 'number', ['number']);

var hermesParseResult_getPositionBuffer = _HermesParserWASM["default"].cwrap('hermesParseResult_getPositionBuffer', 'number', ['number']);

var hermesParseResult_getPositionBufferSize = _HermesParserWASM["default"].cwrap('hermesParseResult_getPositionBufferSize', 'number', ['number']); // Copy a string into the WASM heap and null-terminate


function copyToHeap(buffer, addr) {
  _HermesParserWASM["default"].HEAP8.set(buffer, addr);

  _HermesParserWASM["default"].HEAP8[addr + buffer.length] = 0;
}

function parse(source, options) {
  // Allocate space on heap for source text
  var sourceBuffer = Buffer.from(source, 'utf8');

  var sourceAddr = _HermesParserWASM["default"]._malloc(sourceBuffer.length + 1);

  if (!sourceAddr) {
    throw new Error('Parser out of memory');
  }

  try {
    // Copy source text onto WASM heap
    copyToHeap(sourceBuffer, sourceAddr);
    var parseResult = hermesParse(sourceAddr, sourceBuffer.length + 1, options.flow === 'detect', options.tokens, options.allowReturnOutsideFunction);

    try {
      // Extract and throw error from parse result if parsing failed
      var err = hermesParseResult_getError(parseResult);

      if (err) {
        var syntaxError = new SyntaxError(err); // $FlowExpectedError[prop-missing]

        syntaxError.loc = {
          line: hermesParseResult_getErrorLine(parseResult),
          column: hermesParseResult_getErrorColumn(parseResult)
        };
        throw syntaxError;
      }

      var deserializer = new _HermesParserDeserializer["default"](hermesParseResult_getProgramBuffer(parseResult), hermesParseResult_getPositionBuffer(parseResult), hermesParseResult_getPositionBufferSize(parseResult), _HermesParserWASM["default"], options);
      return deserializer.deserialize();
    } finally {
      hermesParseResult_free(parseResult);
    }
  } finally {
    _HermesParserWASM["default"]._free(sourceAddr);
  }
}