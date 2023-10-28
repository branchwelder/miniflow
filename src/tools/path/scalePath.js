export default function scalePath() {
  return {
    displayName: "Scale Path",
    scale({ inputs, outputs }) {
      if (!inputs.path) {
        outputs.path = undefined;
        return;
      }
      const x = inputs.scaleX ?? 1;
      const y = inputs.scaleY ?? 1;

      outputs.path = inputs.path.scale(x, y);
    },
    inputConfig: {
      path: {
        type: "Path",
        change(tool) {
          tool.scale(tool);
        },
      },
      scaleX: {
        type: "number",
        change(tool) {
          tool.scale(tool);
        },
      },
      scaleY: {
        type: "number",
        change(tool) {
          tool.scale(tool);
        },
      },
    },
    outputConfig: { path: { type: "Path" } },
  };
}
