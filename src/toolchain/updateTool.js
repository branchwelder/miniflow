function validateInputs(tool) {
  for (const [input, currentValue] of Object.entries(tool.inputs)) {
    if (currentValue === undefined) return false;
  }

  return true;
}

export function updateTool(tool) {
  if (!tool.updated) return;

  const updatedOutputs = validateInputs(tool)
    ? tool.updated({
        inputs: tool.inputs,
        state: tool.state,
      })
    : Object.fromEntries(
        Object.keys(tool.outputs).map((output) => [output, undefined])
      );

  Object.entries(updatedOutputs).forEach(([output, newValue]) => {
    tool.outputs[output] = newValue;
  });
}
