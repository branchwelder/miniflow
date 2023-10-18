import { html, render } from "lit-html";

export default function inputNumber() {
  function view({ inputs, state }) {
    return html`<input
      type="number"
      .value=${String(state.num)}
      @change=${(e) => {
        state.num = Number(e.target.value);
      }} />`;
  }

  return {
    displayName: "Number",
    stateVars: {
      num: { value: 10, type: "number", output: true },
    },
    render(current) {
      render(view(current), this.dom);
    },
  };
}
