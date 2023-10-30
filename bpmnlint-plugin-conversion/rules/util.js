function findAndReportMessage(
  nodeToSearch,
  nodeToReportOn,
  reporter,
  severity
) {
  if (nodeToSearch.extensionElements && nodeToSearch.extensionElements.values) {
    nodeToSearch.extensionElements.values
      .filter((value) => value.$type === "conversion:message")
      .filter((value) => value.severity === severity)
      .forEach((value) => {
        console.log(`Reporting ${severity}:`, nodeToReportOn.id, value.$body);
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

export function checkProvider(severity) {
  return function check(node, reporter) {
    if (node.eventDefinitions) {
      node.eventDefinitions.forEach((eventDefinition) => {
        if (eventDefinition.messageRef) {
          findAndReportMessage(
            eventDefinition.messageRef,
            node,
            reporter,
            severity
          );
        }
        if (eventDefinition.signalRef) {
          findAndReportMessage(
            eventDefinition.signalRef,
            node,
            reporter,
            severity
          );
        }
        if (eventDefinition.escalationRef) {
          findAndReportMessage(
            eventDefinition.escalationRef,
            node,
            reporter,
            severity
          );
        }
        if (eventDefinition.errorRef) {
          findAndReportMessage(
            eventDefinition.errorRef,
            node,
            reporter,
            severity
          );
        }
      });
    }
    if (!isEvent(node)) {
      findAndReportMessage(node, node, reporter, severity);
    }
  };
}
