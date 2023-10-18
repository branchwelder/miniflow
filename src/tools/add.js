export default function add() {
  return {
    displayName: "add",
    inputConfig: {
      x: { type: "number" },
      y: { type: "number" },
    },
    outputConfig: { sum: { type: "number" } },
    updated({ inputs }) {
      return { sum: inputs.x + inputs.y };
    },
  };
}
