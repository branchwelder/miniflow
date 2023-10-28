import hershey from "../../lib/hershey.json";
import { html, render } from "lit-html";
import { Turtle } from "../../lib/turtle";
import { Path } from "../../lib/path";

function generatePaths(s, fontKey) {
  const charWidth = 10;
  const charHeight = 28;
  const font = hershey[fontKey].chars;
  const lines = s.split(/\r?\n/);

  let t = new Turtle();

  for (const [index, line] of lines.entries()) {
    // const words = line.split(" ");
    t.setTransform(0, charHeight * index);

    // for (const word of words) {
    for (let i in line) {
      const charCode = line.charCodeAt(i);
      if (charCode == 32) {
        // it's a space
        t.translate(charWidth, 0);
        continue;
      }

      const index = charCode - 33;

      if (font[index]) {
        const charOffset = font[index].o;
        const newpath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        newpath.setAttribute("d", font[index].d);

        newpath.getPathData().forEach(({ type, values }) => {
          if (type == "L") {
            t.lineTo(...values);
          } else if (type == "M") {
            t.moveTo(...values);
          }
        });
        t.translate(charOffset + charWidth, 0);
      }
    }

    // }
  }
  return new Path(t.segs);
}

export default function hersheyText() {
  return {
    displayName: "Hershey Text",
    stateConfig: {
      font: {
        type: "string",
        value: "astrology",
        change(tool, newval) {
          tool.generate();
        },
      },
    },
    inputConfig: {
      text: {
        type: "string",
        change(tool) {
          tool.generate();
        },
      },
    },
    outputConfig: { path: { type: "Path" } },
    generate() {
      const text = this.inputs.text;
      if (!text) {
        this.outputs.path = undefined;
        return;
      }
      this.outputs.path = generatePaths(text, this.state.font);
    },
    render({ dom, state }) {
      render(
        html`<div style="display: flex; gap: 5px; padding: 5px;">
          <span>Font</span>
          <select
            name="font"
            .value=${state.font}
            @change=${(e) => (state.font = e.target.value)}>
            ${Object.entries(hershey).map(
              ([key, data]) => html`<option value=${key}>${data.name}</option>`
            )}
          </select>
        </div>`,
        dom
      );
    },
  };
}
