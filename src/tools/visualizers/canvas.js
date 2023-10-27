export default function drawToCanvas() {
  return {
    displayName: "drawWaveform",
    outputConfig: {
      analyserNode: { type: "AudioNode" },
    },
    stateConfig: {
      canvas: {
        type: "Element",
      },
      drawFunc: {
        value: undefined,
        type: "Function",
        change({ state }, current) {
          if (!current) {
            return;
          }
          current(state.canvas);
        },
      },
    },
    draw({ state, inputs }) {},
    inputConfig: {
      func: {
        type: "Function",
        change({ state }, current) {
          if (!current) {
            state.drawFunc = undefined;
            return;
          }
          state.drawFunc = new Function("canvas", current);
        },
      },
    },
    connected({ dom, state }) {
      dom.appendChild(state.canvas);
    },
    setup({ state }) {
      state.canvas = document.createElement("canvas");
      state.canvas.style.cssText = "display:block";
      state.canvas.width = 600;
      state.canvas.height = 400;
    },
  };
}
