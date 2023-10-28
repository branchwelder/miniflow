export default function translatePath() {
  return {
    displayName: "Translate Path",
    translate({ inputs, outputs }) {
      if (!inputs.path) {
        outputs.path = undefined;
        return;
      }
      const x = inputs.translateX ?? 0;
      const y = inputs.translateY ?? 0;

      outputs.path = inputs.path.translate(x, y);
    },
    inputConfig: {
      path: {
        type: "Path",
        change(tool) {
          tool.translate(tool);
        },
      },
      translateX: {
        type: "number",
        change(tool) {
          tool.translate(tool);
        },
      },
      translateY: {
        type: "number",
        change(tool) {
          tool.translate(tool);
        },
      },
    },
    outputConfig: { path: { type: "Path" } },
  };
}
