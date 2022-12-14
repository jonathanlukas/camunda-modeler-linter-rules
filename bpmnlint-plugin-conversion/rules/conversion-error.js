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
          if (nodeToReportOn.id) {
            reporter.report(nodeToReportOn.id, value.$body);
          }
        });
    }
  }

  function isEvent(node) {
    return [
      "bpmn:Error",
      "bpmn:Escalation",
      "bpmn:Message",
      "bpmn:Signal",
    ].includes(node.$type);
  }

  function check(node, reporter) {
    console.log(node);
    if (node.eventDefinitions) {
      node.eventDefinitions.forEach((eventDefinition) => {
        if (eventDefinition.messageRef) {
          findAndReportMessage(eventDefinition.messageRef, node, reporter);
        }
        if (eventDefinition.signalRef) {
          findAndReportMessage(eventDefinition.signalRef, node, reporter);
        }
        if (eventDefinition.escalationRef) {
          findAndReportMessage(eventDefinition.escalationRef, node, reporter);
        }
        if (eventDefinition.errorRef) {
          findAndReportMessage(eventDefinition.errorRef, node, reporter);
        }
      });
    }
    if (!isEvent(node)) {
      findAndReportMessage(node, node, reporter);
    }
  }

  return {
    check: check,
  };
};
