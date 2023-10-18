import { html, render } from "lit-html";

export default function inputNumber() {
  function view({ state }) {
    return html`<input
      type="number"
      .value=${String(state.num)}
      @change=${(e) => {
        state.num = Number(e.target.value);
      }} />`;
  }

  return {
    displayName: "Number",
    stateConfig: {
      num: { value: 10, type: "number" },
    },
    outputConfig: {
      num: { type: "number" },
    },
    updated({ state }) {
      return { num: state.num };
    },
    render(dom, current) {
      render(view(current), dom);
    },
  };
}
