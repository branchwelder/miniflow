import { html, render } from "lit-html";

export default function range() {
  return {
    displayName: "Range",
    stateConfig: {
      number: {
        value: 5,
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
        value: 10,
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
        html` <style>
            * {
              box-sizing: border-box;
            }
            .container {
              width: 200px;
            }
            .controls {
              gap: 4px;
              display: none;
              grid-template-columns: auto auto;
              padding: 4px;
            }

            .controls input {
              width: 100%;
            }

            .range-ui {
              display: flex;
              gap: 4px;
              padding: 4px;
            }

            .expander {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }

            #config-toggle:checked + .controls {
              display: grid;
            }

            .toggle-btn {
              outline: 1px solid var(--tool-frame);
              padding: 2px 3px;
              text-align: end;
              user-select: none;
              background-color: var(--background-accent);
              color: var(--text-inactive);
            }

            .toggle-btn:hover {
              cursor: pointer;
              color: var(--tool-frame);
              background-color: var(--purple);
            }
          </style>
          <div class="container">
            <div class="range-ui">
              <input
                style="flex: 1;"
                layout,
                scale,
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
            <div class="expander">
              <label for="config-toggle" class="toggle-btn">config...</label>
              <input id="config-toggle" type="checkbox" hidden />
              <div class="controls">
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
            </div>
          </div>`,
        dom
      );
    },
  };
}
