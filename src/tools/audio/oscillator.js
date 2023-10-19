import { html, render } from "lit-html";

export default function oscillator() {
  return {
    displayName: "Oscillator",
    inputConfig: {
      frequency: {
        type: "Number",
        change({ outputs }, newValue) {
          if (newValue) outputs.node.frequency.value = newValue;
        },
      },
    },
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      waveType: {
        value: "sine",
        type: "String",
        change({ outputs }, newValue) {
          if (newValue) outputs.node.type.value = newValue;
        },
      },
    },
    setup({ outputs, global }) {
      outputs.node = global.audioContext.createOscillator();
      outputs.node.start();
    },
    teardown({ outputs }) {
      outputs.node.disconnect();
    },
    render({ state, dom }) {
      render(
        html`<div>
          <span>waveform:</span>
          <select
            name="waveform"
            .value=${state.waveType}
            @change=${(e) => (state.waveType = e.target.value)}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>`,
        dom
      );
    },
  };
}
