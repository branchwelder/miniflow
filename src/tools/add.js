export default function add() {
  return {
    displayName: "add",
    func({ inputs, outputs }) {
      if (inputs.x && inputs.y) {
        outputs.sum = inputs.x + inputs.y;
      } else {
        outputs.sum = undefined;
      }
    },
    inputConfig: {
      x: {
        type: "number",
        change(tool) {
          tool.func(tool);
        },
      },
      y: {
        type: "number",
        change(tool) {
          tool.func(tool);
        },
      },
    },
    // eval({ x, y }) {
    //   return { sum: x + y };
    // },
    outputConfig: { sum: { type: "number" } },
  };
}
