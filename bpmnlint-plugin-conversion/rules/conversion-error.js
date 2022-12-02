const { is } = require("bpmnlint-utils");

module.exports = function () {
  function findAndReportMessage(nodeToSearch, nodeToReportOn, reporter) {
    if (
      nodeToSearch.extensionElements &&
      nodeToSearch.extensionElements.values
    ) {
      nodeToSearch.extensionElements.values
        .filter((value) => value.$type === "conversion:message")
        .filter((value) => value.severity === "WARNING")
        .forEach((value) => {
          console.log("Reporting WARNING:", nodeToReportOn.id, value.$body);
          reporter.report(nodeToReportOn.id, value.$body);
        });
    }
  }

  function check(node, reporter) {
    if (node.eventDefinitions) {
      node.eventDefinitions.forEach((eventDefinition) => {
        if (eventDefinition.messageRef) {
          findAndReportMessage(eventDefinition.messageRef, node, reporter);
        }
        if (eventDefinition.signalRef) {
          findAndReportMessage(eventDefinition.messageRef, node, reporter);
        }
        if (eventDefinition.escalationRef) {
          findAndReportMessage(eventDefinition.messageRef, node, reporter);
        }
        if (eventDefinition.errorRef) {
          findAndReportMessage(eventDefinition.messageRef, node, reporter);
        }
      });
    }
    findAndReportMessage(node,node,reporter);
  }

  return {
    check: check,
  };
};
