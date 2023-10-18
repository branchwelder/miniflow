import { html, render } from "lit-html";

export default function add() {
  return {
    displayName: "add",
    inputs: {
      x: { type: "number" },
      y: { type: "number" },
    },
    outputs: { sum: { type: "number" } },
    updated({ inputs, state }) {
      return { sum: inputs.x + inputs.y };
    },
  };
}
