import { html, render } from "lit-html";

export default function biquadFilter() {
  return {
    displayName: "Biquad Filter",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      filterType: {
        type: "String",
        value: "lowpass",
        change({ outputs }, current) {
          outputs.node.type = current;
        },
      },
    },
    inputConfig: {
      Q: { type: "any" },
      detune: { type: "Number" },
      frequency: { type: "Number" },
      gain: { type: "Number" },
      node: {
        type: "AudioNode",
        change({ outputs }, current, last) {
          if (last) last.disconnect(outputs.node);
          if (current) current.connect(outputs.node);
        },
      },
    },
    setup({ global, outputs, state }) {
      outputs.node = global.audioContext.createBiquadFilter();
      outputs.node.type = state.filterType;
      outputs.node.frequency.setTargetAtTime(
        1000,
        global.audioContext.currentTime,
        0
      );
      outputs.node.gain.setTargetAtTime(25, global.audioContext.currentTime, 0);
    },
    teardown({ outputs }) {
      outputs.node.disconnect();
    },
    render({ state, dom }) {
      render(
        html` <style>
            .container {
              display: flex;
              flex-direction: column;
            }
          </style>
          <div class="container">
            <select
              name="type"
              .value=${state.filterType}
              @change=${(e) => (state.filterType = e.target.value)}>
              <option value="lowpass">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
              <option value="lowshelf">lowshelf</option>
              <option value="highshelf">highshelf</option>
              <option value="peaking">peaking</option>
              <option value="notch">notch</option>
              <option value="allpass">allpass</option>
            </select>
          </div>`,
        dom
      );
    },
  };
}
