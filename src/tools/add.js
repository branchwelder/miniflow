export default {
  displayName: "add",
  icon: "plus",
  inputs: {
    x: { type: "number" },
    y: { type: "number" },
  },
  outputs: { sum: { type: "number" } },
  func({ x, y }) {
    return { sum: x + y };
  },
};
