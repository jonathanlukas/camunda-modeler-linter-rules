const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports manual tasks being used.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:manualTask')) {
      reporter.report(node.id, 'Element has disallowed type bpmn:manualTask');
    }
  }

  return {
    check: check
  };
};
