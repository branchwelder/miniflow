import { html, render } from "lit-html";

export default function textArea() {
  return {
    displayName: "Text Area",
    stateConfig: {
      text: {
        value: `Hello World!`,
        type: "string",
        change({ outputs }, current) {
          outputs.text = current;
        },
      },
    },
    setup({ state, outputs }) {
      outputs.text = state.text;
    },
    outputConfig: {
      text: { type: "string" },
    },
    render({ dom, state, outputs }) {
      render(
        html`<textarea
          style="display: block;"
          rows="5"
          cols="30"
          @input=${(e) => {
            state.text = e.target.value;
          }}
          .value=${state.text}></textarea>`,
        dom
      );
    },
  };
}
