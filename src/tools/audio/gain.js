import { html, render } from "lit-html";

export default function gain() {
  let gainNode;
  function view(state) {
    return html` <div>
      <input
        @input=${(e) => (state.volume = Number(e.target.value))}
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        .value=${state.volume}
        list="volumes"
        name="volume" />
    </div>`;
  }

  return {
    displayName: "Gain",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      volume: { value: 0.5, type: "Number" },
    },
    inputConfig: {
      node: { type: "AudioNode" },
    },
    init({ inputs, state }, context) {
      gainNode = context.audio.createGain();
    },
    updated({ inputs, state }) {
      gainNode.gain.value = state.volume;

      return {
        node: inputs.node.connect(gainNode),
      };
    },
    render(dom, { state }) {
      render(view(state), dom);
    },
  };
}
