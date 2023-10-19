import { html, render } from "lit-html";

export default function convolver() {
  return {
    displayName: "Convolver",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      volume: {
        value: 0.5,
        type: "Number",
        change({ outputs }, current) {
          outputs.node.gain.value = current;
        },
      },
    },
    inputConfig: {
      node: {
        type: "AudioNode",
        change({ outputs }, current, last) {
          if (last) last.disconnect(outputs.node);
          if (current) current.connect(outputs.node);
        },
      },
    },
    setup({ global, outputs }) {
      outputs.node = global.audioContext.createConvolver();
    },
    teardown({ outputs }) {
      outputs.node.disconnect();
    },
    render({ state, dom }) {
      render(
        html`<div>
          <input
            @input=${(e) => (state.volume = Number(e.target.value))}
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            .value=${state.volume}
            list="volumes"
            name="volume" />
        </div>`,
        dom
      );
    },
  };
}
