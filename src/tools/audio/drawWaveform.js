import { Path } from "../../lib/path";

export default function drawWaveform() {
  return {
    displayName: "drawWaveform",
    outputConfig: {
      path: {
        type: "path",
      },
    },
    stateConfig: {
      canvas: {
        type: "Element",
      },
    },
    draw({ state, inputs, outputs }) {
      const normalizedData = inputs.dataArray;
      if (!normalizedData) return;
      // const canvas = state.canvas;
      const padding = inputs.padding ?? 50;
      // const ctx = canvas.getContext("2d");

      // ctx.resetTransform();
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      let base = 400 / 2;
      // ctx.translate(0, canvas.height / 2);
      // ctx.strokeStyle = "black";
      // ctx.lineWidth = 1;

      const maxHeight = 400 / 2 - padding;
      const width = 600 / normalizedData.length;
      const path = new Path();

      path.moveTo(0, base);

      for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let y = normalizedData[i] * maxHeight;
        if (y < 0) {
          y = 0;
        } else if (y > maxHeight) {
          y = maxHeight;
        }

        const isEven = (i + 1) % 2;

        // ctx.beginPath();
        y = isEven ? base + y : base - y;

        path.lineTo(x, y);
        // ctx.moveTo(x, 0);
        // ctx.lineTo(x, y);
        // ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
        // ctx.lineTo(x + width, 0);
        // ctx.stroke();
      }
      // path.lineTo(400, base);
      outputs.path = path;
    },
    inputConfig: {
      padding: {
        type: "Number",
        change(tool) {
          tool.draw(tool);
        },
      },
      dataArray: {
        type: "Number[]",
        change(tool) {
          tool.draw(tool);
        },
      },
    },
    // connected({ dom, state }) {
    //   dom.appendChild(state.canvas);
    // },
    // setup({ state }) {
    //   state.canvas = document.createElement("canvas");
    //   state.canvas.style.cssText = "display:block";
    //   state.canvas.width = 600;
    //   state.canvas.height = 400;
    // },
  };
}
