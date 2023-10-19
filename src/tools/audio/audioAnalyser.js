export default function audioAnalyser() {
  return {
    displayName: "Audio Analyser",
    outputConfig: {
      analyserNode: { type: "AudioNode" },
    },
    stateConfig: {
      canvas: {
        type: "Element",
      },
    },
    inputConfig: {
      node: {
        type: "AudioNode",
        change({ outputs }, current, last) {
          if (last) last.disconnect(outputs.analyserNode);
          if (current) current.connect(outputs.analyserNode);
        },
      },
    },
    connected({ dom, state }) {
      dom.appendChild(state.canvas);
    },
    setup({ global, state, outputs }) {
      outputs.analyserNode = global.audioContext.createAnalyser();
      state.canvas = document.createElement("canvas");
      state.canvas.style.cssText = "display:block";
    },
    render({ state, outputs }) {
      const bufferLength = outputs.analyserNode.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      const WIDTH = state.canvas.width;
      const HEIGHT = state.canvas.height;

      outputs.analyserNode.getByteTimeDomainData(dataArray);
      const ctx = state.canvas.getContext("2d");

      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 0, 0)";

      ctx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(WIDTH, HEIGHT / 2);
      ctx.stroke();
    },
  };
}
