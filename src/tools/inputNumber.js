import { html } from "lit-html";

export default {
  displayName: "Number",
  inputs: {},
  outputs: {
    num: { value: 10, type: "number" },
  },
  view(inputs, outputs) {
    return html`<input
      type="number"
      .value=${String(this.outputs.num)}
      @change=${(e) => {
        this.outputs.num.value = Number(e.target.value);
      }} />`;
  },
};
