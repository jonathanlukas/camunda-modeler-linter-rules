const { is } = require("bpmnlint-utils");

/**
 * Rule that reports manual tasks being used.
 */
module.exports = function () {
  function check(node, reporter) {
    if (node.extensionElements && node.extensionElements.values) {
      node.extensionElements.values.filter((value) => value.$type === 'conversion:message').filter((value) => value.severity === 'TASK').forEach((value) => {
        console.log(value);
        reporter.report(node.id,value.$body);
      });
    }
  }

  return {
    check: check,
  };
};
