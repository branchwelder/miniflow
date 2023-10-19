import { html, render } from "lit-html";

export default function oscillator() {
  let osc;
  function view(state) {
    return html`<div class="right">
      <span>Current waveform: </span>
      <select
        name="waveform"
        .value=${state.waveType}
        @change=${(e) => (state.waveType = e.target.value)}>
        <option value="sine">Sine</option>
        <option value="square" selected>Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>`;
  }
  return {
    displayName: "Oscillator",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      frequency: { value: 100, type: "Number" },
      waveType: { value: "sine", type: "String" },
    },
    init({ inputs, state }, context) {
      osc = context.audio.createOscillator();
      osc.start();
    },
    updated({ state }) {
      osc.type = state.waveType;
      osc.frequency.value = state.frequency;

      return {
        node: osc,
      };
    },
    render(dom, { state }) {
      render(view(state), dom);
    },
  };
}
