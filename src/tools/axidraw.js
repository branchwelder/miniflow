import { html, render as renderTemplate, nothing } from "lit-html";
import { Path } from "../lib/path";
const stepsMM = 40 * 2;

// speed: mm/s
// x: mm
// y: mm
function absoluteMove(x, y, speed) {
  let stepFrequency = speed * stepsMM;

  let stepsX = Math.round(x * stepsMM);
  let stepsY = Math.round(y * stepsMM);

  // Convert to stepper move for mixed-axis geometry
  const AxisSteps1 = stepsX + stepsY;
  const AxisSteps2 = stepsX - stepsY;

  stepFrequency = stepFrequency > 25000 ? 25000 : stepFrequency;
  stepFrequency = stepFrequency < 2 ? 2 : stepFrequency;

  return `HM,${stepFrequency},${AxisSteps1},${AxisSteps2}`;
}

function relativeMove(dx, dy, speed) {
  let stepsX = Math.round(dx * stepsMM);
  let stepsY = Math.round(dy * stepsMM);

  let dist = Math.sqrt(dx * dx + dy * dy);
  let duration = Math.round((dist / speed) * 1000);

  if (duration == 0) console.log("INVALID DURATION");

  // Probably a bad fix but streaming XM commands can only be sustained
  // at 3 - 4ms duration. see https://evil-mad.github.io/EggBot/ebb.html#performance
  duration = duration < 4 ? 4 : duration;

  return `XM,${duration},${stepsX},${stepsY}`;
}

const commands = {
  penDown: "SP,0,500",
  penUp: "SP,1,500",
  motorsOff: "EM,0,0",
  motorsOn: "EM,1,1",
  nickname: "QT",
  reboot: "RB",
  queryPenUp: "QP",
  togglePen: "TP",
  home: "HM,10000",
  queryMotors: "QE",
  disableMotors: "EM,0,0",
  enableMotors: "EM,1,1",
  eStop: "ES",
  queryVersion: "V",
};

const controls = {
  Home: "HM,1000",
  "Motors Off": "EM,0,0",
  "Motors On": "EM,1,1",
  Reboot: "RB",
  "Toggle Pen": "TP",
  "E Stop": "ES",
};

const models = {
  A6: {
    width: 150,
    height: 100,
  },
  A4: {
    width: 279,
    height: 215,
  },
  A3: {
    width: 420,
    height: 297,
  },
};

export default function commandSet() {
  return {
    displayName: "AxiDraw",
    stateConfig: {
      history: {
        value: [],
        type: "Path",
      },
      previewCanvas: { type: "element" },
      historyCanvas: { type: "element" },
      model: {
        type: "string",
        value: "A6",
        change(tool) {
          tool.sizeCanvas();
        },
      },
      penUpSpeed: {
        type: "Number",
        value: 100,
      },
      penDownSpeed: {
        type: "Number",
        value: 30,
      },
    },
    outputConfig: {
      command: {
        type: "String",
      },
    },
    inputConfig: {
      path: {
        type: "Path",
        change(tool) {
          tool.drawPaths();
        },
      },
      writableStream: {
        type: "WritableStream",
      },
    },
    drawPaths() {
      const history = this.state.historyCanvas;
      const preview = this.state.previewCanvas;

      const { width, height } = models[this.state.model];

      const scale = preview.width / width;
      console.log(scale);

      let pctx = preview.getContext("2d");
      let hctx = history.getContext("2d");

      pctx.resetTransform();
      hctx.resetTransform();
      pctx.scale(scale, scale);
      hctx.scale(scale, scale);
      pctx.clearRect(0, 0, preview.width, preview.height);
      hctx.clearRect(0, 0, history.width, history.height);

      pctx.strokeStyle = "red";
      if (this.inputs.path) this.inputs.path.draw(pctx);

      hctx.strokeStyle = "black";
      if (this.state.history) {
        this.state.history.forEach((hist) => hist.draw(hctx));
      }
    },
    sizeCanvas() {
      const { width, height } = models[this.state.model];
      const aspect = height / width;

      const w = this.state.previewCanvas.getBoundingClientRect().width;

      this.state.previewCanvas.width = w;
      this.state.previewCanvas.height = w * aspect;
      this.state.historyCanvas.width = w;
      this.state.historyCanvas.height = w * aspect;
      this.drawPaths();
    },
    setup({ state }) {
      state.previewCanvas = document.createElement("canvas");
      state.previewCanvas.id = "preview";
      state.historyCanvas = document.createElement("canvas");
      state.history = [];
    },
    async sendCommand(text) {
      await this.inputs.writableStream.write(text + "\n");
    },
    clearHistory() {
      this.history = new Path();
    },
    controlsView() {
      return html`${Object.entries(controls).map(
        ([commandName, command]) =>
          html`<button
            ?disabled=${!this.inputs.writableStream}
            @click=${(e) => this.sendCommand(command)}>
            ${commandName}
          </button>`
      )}`;
    },
    connected({ dom, state }) {
      const canvasContainer = dom.getElementById("canvas-container");

      canvasContainer.appendChild(state.previewCanvas);
      canvasContainer.appendChild(state.historyCanvas);

      this.sizeCanvas();
    },
    plot() {
      const path = this.inputs.path;
      if (!path) return;

      this.sendCommand(commands.penUp);
      this.sendCommand(commands.home);

      path.segments.forEach((segment) => {
        if (segment.length < 2) return;
        let pos = segment[0];
        this.sendCommand(absoluteMove(pos[0], pos[1], this.state.penUpSpeed));
        this.sendCommand(commands.penDown);
        segment.forEach(([x, y]) => {
          this.sendCommand(
            relativeMove(x - pos[0], y - pos[1], this.state.penDownSpeed)
          );
          pos = [x, y];
        });
        this.sendCommand(commands.penUp);
      });

      this.sendCommand(commands.home);
      this.state.history.push(path);
    },
    render({ dom, inputs, state }) {
      renderTemplate(
        html`<style>
            .controls {
              display: flex;
              gap: 4px;
            }
            #container {
              display: flex;
              flex-direction: column;
              padding: 10px;
              gap: 5px;
              resize: horizontal;
              overflow: auto;
            }
            #canvas-container {
              background-color: white;
              border: 1px solid black;
              position: relative;
            }
            #canvas-container canvas {
              display: block;
              width: 100%;
              height: auto;
            }

            #preview {
              position: absolute;
              top: 0px;
              left: 0px;
            }
            button {
              white-space: nowrap;
            }
          </style>
          <div id="container">
            <div class="controls">
              <select
                name="model-type"
                .value=${this.state.model}
                @change=${(e) => (this.state.model = e.target.value)}>
                ${Object.entries(models).map(
                  ([model, config]) =>
                    html`<option value=${model}>${model}</option>`
                )}
              </select>
              <button
                @click=${() => {
                  state.history = [];
                  this.drawPaths();
                }}>
                Clear
              </button>
            </div>
            <div id="canvas-container"></div>
            <button
              @click=${() => this.plot()}
              ?disabled=${!inputs.writableStream}>
              ${inputs.writableStream
                ? "Plot it!"
                : "Connect a machine to plot"}
            </button>
            <div class="controls">${this.controlsView()}</div>
          </div>`,
        dom
      );
    },
  };
}
