"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _ansiEscapes = _interopRequireDefault(require("ansi-escapes"));

var _jestWatcher = require("jest-watcher");

var _jestRegexUtil = require("jest-regex-util");

var _scroll = _interopRequireDefault(require("../lib/scroll"));

var _utils = require("../lib/utils");

var _pattern_mode_helpers = require("../lib/pattern_mode_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestNamePatternPrompt extends _jestWatcher.PatternPrompt {
  constructor(pipe, prompt) {
    super(pipe, prompt);
    this._entityName = 'tests';
    this._cachedTestResults = [];
    this._offset = -1;
  }

  _onChange(pattern, options) {
    super._onChange(pattern, options);

    this._offset = options.offset;

    this._printTypeahead(pattern, options);
  }

  _printTypeahead(pattern, options) {
    const matchedTests = this._getMatchedTests(pattern);

    const total = matchedTests.length;
    const pipe = this._pipe;
    const prompt = this._prompt;
    (0, _jestWatcher.printPatternCaret)(pattern, pipe);
    pipe.write(_ansiEscapes.default.cursorLeft);

    if (pattern) {
      (0, _pattern_mode_helpers.printPatternMatches)(total, 'test', pipe, ` from ${_chalk.default.yellow('cached')} test suites`);
      const width = (0, _utils.getTerminalWidth)(pipe);
      const {
        start,
        end,
        index
      } = (0, _scroll.default)(total, options);
      prompt.setPromptLength(total);
      matchedTests.slice(start, end).map(name => (0, _utils.formatTestNameByPattern)(name, pattern, width - 4)).map((item, i) => (0, _pattern_mode_helpers.formatTypeaheadSelection)(item, i, index, prompt)).forEach(item => (0, _pattern_mode_helpers.printTypeaheadItem)(item, pipe));

      if (total > end) {
        (0, _pattern_mode_helpers.printMore)('test', pipe, total - end);
      }
    } else {
      (0, _pattern_mode_helpers.printStartTyping)('test name', pipe);
    }

    (0, _jestWatcher.printRestoredPatternCaret)(pattern, this._currentUsageRows, pipe);
  }

  _getMatchedTests(pattern) {
    let regex;

    try {
      regex = new RegExp(pattern, 'i');
    } catch (e) {
      return [];
    }

    return this._cachedTestResults.reduce((matchedTests, {
      testResults
    }) => {
      return matchedTests.concat(testResults.filter(({
        fullName
      }) => regex.test(fullName)).map(({
        fullName
      }) => fullName));
    }, []);
  }

  updateCachedTestResults(testResults = []) {
    this._cachedTestResults = testResults;
  }

  run(onSuccess, onCancel, options) {
    super.run(value => {
      const preparedPattern = (0, _jestRegexUtil.escapeStrForRegex)((0, _utils.removeTrimmingDots)(value));
      const useExactMatch = this._offset !== -1;
      onSuccess(useExactMatch ? `^${preparedPattern}$` : preparedPattern);
    }, onCancel, options);
  }

}

exports.default = TestNamePatternPrompt;