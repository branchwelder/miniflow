import { html, render } from "lit-html";

export default function range() {
  return {
    displayName: "Range",
    stateConfig: {
      number: {
        value: 10,
        type: "number",
        change({ outputs }, currentValue) {
          outputs.number = currentValue;
        },
      },
      min: {
        value: 0,
        type: "number",
      },
      max: {
        value: 300,
        type: "number",
      },
      step: {
        value: 1,
        type: "number",
      },
      live: {
        value: true,
        type: "boolean",
      },
    },
    setup({ state, outputs }) {
      outputs.number = state.number;
    },
    outputConfig: {
      number: { type: "number" },
    },
    render({ dom, state }) {
      render(
        html`<div style="padding:4px;">
          <div
            style="display: grid; grid-template-columns: auto auto; gap: 4px;">
            <span>min</span>
            <input
              type="number"
              .value=${String(state.min)}
              @change=${(e) => {
                state.min = Number(e.target.value);
              }} />
            <span>max</span>
            <input
              type="number"
              .value=${String(state.max)}
              @change=${(e) => {
                state.max = Number(e.target.value);
              }} />
            <span>step</span>
            <input
              type="number"
              .value=${String(state.step)}
              @change=${(e) => {
                state.step = Number(e.target.value);
              }} />
            <span>live</span>
            <input
              type="checkbox"
              ?checked=${state.live}
              @change=${(e) => {
                state.live = e.target.checked;
              }} />
          </div>
          <div style="display: flex; gap: 4px;">
            <input
              style="flex: 1;"
              type="range"
              .value=${String(state.number)}
              .min=${String(state.min)}
              .max=${String(state.max)}
              .step=${String(state.step)}
              @input=${(e) => {
                if (state.live) state.number = Number(e.target.value);
              }}
              @change=${(e) => {
                if (!state.live) state.number = Number(e.target.value);
              }} /><span>${state.number}</span>
          </div>
        </div>`,
        dom
      );
    },
  };
}
