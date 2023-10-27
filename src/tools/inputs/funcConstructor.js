import { html, render } from "lit-html";

export default function funcContructor() {
  return {
    displayName: "Function",
    stateConfig: {
      text: {
        value: `console.log("hello world")`,
        type: "text",
        change({ outputs }, current) {
          outputs.text = current;
        },
      },
    },
    setup({ state, outputs }) {
      outputs.text = state.text;
    },
    outputConfig: {
      text: { type: "text" },
    },
    render({ dom, state, outputs }) {
      render(
        html`<textarea
          rows="30"
          cols="80"
          @change=${(e) => {
            console.log("asdf");
            state.text = e.target.value;
          }}
          .value=${state.text}></textarea>`,
        dom
      );
    },
  };
}

// const drawLineSegment = (ctx, x, y, width, isEven) => {
//   ctx.beginPath();
//   y = isEven ? y : -y;
//   ctx.moveTo(x, 0);
//   ctx.lineTo(x, y);
//   ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
//   ctx.lineTo(x + width, 0);
//   ctx.stroke();
// };

// const normalizedData = inputs.dataArray;
// if (!normalizedData) return;
// const canvas = state.canvas;
// const padding = inputs.padding ?? 50;
// const ctx = canvas.getContext("2d");

// ctx.resetTransform();
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.translate(0, canvas.height / 2);
// ctx.strokeStyle = "black";
// ctx.lineWidth = 1;

// const maxHeight = canvas.height / 2 - padding;
// const width = canvas.width / normalizedData.length;

// for (let i = 0; i < normalizedData.length; i++) {
//   const x = width * i;
//   let height = normalizedData[i] * maxHeight;
//   if (height < 0) {
//     height = 0;
//   } else if (height > maxHeight) {
//     height = maxHeight;
//   }

//   drawLineSegment(ctx, x, height, width, (i + 1) % 2);
// }
