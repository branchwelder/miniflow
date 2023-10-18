function validateInputs(tool) {
  for (const [input, currentValue] of Object.entries(tool.inputs)) {
    if (currentValue === undefined) {
      return false;
    }
  }

  return true;
}

export function updateTool(tool) {
  if (!tool.updated) return;

  let updatedOutputs;
  let valid = validateInputs(tool);

  if (valid) {
    updatedOutputs = tool.updated({
      inputs: tool.inputs,
      state: tool.state,
    });
  } else {
    updatedOutputs = Object.fromEntries(
      Object.keys(tool.outputs).map((output) => [output, undefined])
    );
  }

  Object.entries(updatedOutputs).forEach(([output, newValue]) => {
    tool.outputs[output] = newValue;
  });
}
