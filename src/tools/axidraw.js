import { html, render as renderTemplate, nothing } from "lit-html";
import { Path } from "../lib/path";
const stepsMM = 40;

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
  minikit: {
    width: 150,
    height: 100,
  },
  A3: {
    width: 150,
    height: 100,
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
        value: "minikit",
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
        change({ state }, path) {
          if (!path) return;
          const canvas = state.previewCanvas;
          let ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "black";
          path.draw(ctx);
        },
      },
      writableStream: {
        type: "WritableStream",
      },
    },
    setup({ state }) {
      state.previewCanvas = document.createElement("canvas");
      state.previewCanvas.style.cssText = "display:block";
      state.previewCanvas.width = 600;
      state.previewCanvas.height = 400;

      state.historyCanvas = document.createElement("canvas");
      state.historyCanvas.style.cssText = "display:block";
      state.historyCanvas.width = 600;
      state.historyCanvas.height = 400;
    },
    async sendCommand(text) {
      await this.inputs.writableStream.write(text + "\n");
    },
    clearHistory() {
      this.history = new Path();
    },
    controlsView() {
      return html`<select
          name="model-type"
          .value=${this.state.model}
          @change=${(e) => (this.state.model = e.target.value)}>
          ${Object.entries(models).map(
            ([model, config]) => html`<option value=${model}>${model}</option>`
          )}</select
        >${Object.entries(controls).map(
          ([commandName, command]) =>
            html`<button @click=${(e) => this.sendCommand(command)}>
              ${commandName}
            </button>`
        )}`;
    },
    connected({ dom, state }) {
      const canvasContainer = dom.getElementById("canvas-container");

      canvasContainer.appendChild(state.previewCanvas);
      canvasContainer.appendChild(state.historyCanvas);
    },
    plot() {
      const path = this.inputs.path;
      if (!path) return;

      this.sendCommand(commands.penUp);
      this.sendCommand(commands.home);

      path.segments.forEach((segment) => {
        if (segment.length < 2) return;
        this.sendCommand(
          absoluteMove(segment[0][0], segment[0][1], this.state.penDownSpeed)
        );
        this.sendCommand(commands.penDown);
        segment.forEach(([x, y]) =>
          this.sendCommand(absoluteMove(x, y, this.state.penUpSpeed))
        );
        this.sendCommand(commands.penUp);
      });

      this.sendCommand(commands.home);
    },
    render({ dom, inputs }) {
      renderTemplate(
        html`<style>
            .controls {
              display: flex;
            }
            #container {
              display: flex;
              flex-direction: column;
              padding: 10px;
              gap: 5px;
            }
            #canvas-container {
              background-color: white;
              border: 1px solid black;
              position: relative;
            }
            #canvas-container canvas {
              position: absolute;
              top: 0px;
              left: 0px;
            }
          </style>
          <div id="container">
            ${inputs.writableStream
              ? nothing
              : html`<div>No available machine! Preview only!</div>`}
            <div class="controls">${this.controlsView()}</div>
            <div
              id="canvas-container"
              style="width: ${600}px; height: ${400}px;"></div>
            <button @click=${() => this.plot()}>Plot</button>
          </div>`,
        dom
      );
    },
  };
}
