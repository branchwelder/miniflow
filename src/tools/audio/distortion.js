import { html, render } from "lit-html";

const DEG = Math.PI / 180;

function makeDistortionCurve(k = 50) {
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  curve.forEach((_, i) => {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * DEG) / (Math.PI + k * Math.abs(x));
  });
  return curve;
}

export default function distortion() {
  return {
    displayName: "Distortion",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    stateConfig: {
      amount: {
        value: 50,
        type: "Number",
        change({ outputs }, current) {
          outputs.node.curve = makeDistortionCurve(current);
        },
      },
      overSample: {
        value: "2x",
        type: "String",
        change({ outputs }, current) {
          outputs.node.overSample = current;
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
    setup({ global, outputs, state }) {
      outputs.node = global.audioContext.createWaveShaper();
      outputs.node.curve = makeDistortionCurve(state.amount);
    },
    teardown({ outputs }) {
      outputs.node.disconnect();
    },
    render({ state, dom }) {
      render(
        html`<div>
          <input
            @input=${(e) => (state.amount = Number(e.target.value))}
            type="range"
            min="0"
            max="200"
            step="1"
            .value=${state.amount}
            list="volumes"
            name="volume" />
          ${["none", "2x", "4x"].map(
            (option) => html`<input
                type="radio"
                id=${option}
                value=${option}
                name="oversample"
                @change=${(e) => (state.overSample = option)}
                ?checked=${state.overSample === option} />
              <label for=${option}>${option}</label><br />`
          )}
        </div>`,
        dom
      );
    },
  };
}
