import { html, render } from "lit-html";

export default function inputNumber() {
  return {
    displayName: "Number",
    stateConfig: {
      num: {
        value: 10,
        type: "number",
        change({ outputs }, currentValue) {
          outputs.num = currentValue;
        },
      },
    },
    setup({ state, outputs }) {
      outputs.num = state.num;
    },
    outputConfig: {
      num: { type: "number" },
    },
    render({ dom, state }) {
      render(
        html`<input
          type="number"
          .value=${String(state.num)}
          @change=${(e) => {
            state.num = Number(e.target.value);
          }} />`,
        dom
      );
    },
  };
}
