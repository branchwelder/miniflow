import { html, nothing } from "lit-html";
import { when } from "lit-html/directives/when.js";
import { GLOBAL_STATE, dispatch } from "../state";
import { taskbar } from "./taskbar";
import { toolbox } from "./toolbox";
import { pan, zoom } from "../events/panZoom";
import { fileName } from "../utils";
import { importExample } from "../toolchain/toolchainLifecycle";
import { portInspection, portInspectionLine } from "./portInspection";

export function view() {
  return html`
    ${taskbar()} ${when(GLOBAL_STATE.showExamples, examplesModal)}
    <div id="workspace">
      ${toolbox()}
      <canvas
        draggable="false"
        id="background"
        @pointerdown=${(e) => pan(e)}
        @wheel=${(e) => zoom(e)}></canvas>
      <svg
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="select-box-container" class="transform-group">
          ${GLOBAL_STATE.selectBox.start && GLOBAL_STATE.selectBox.end
            ? drawSelectBox(GLOBAL_STATE)
            : nothing}
        </g>
        <g id="pipes-container" class="transform-group"></g>
        <g id="port-inspection-lines" class="transform-group">
          ${portInspectionLine()}
        </g>
      </svg>
      <div id="tool-ui" class="workspace-layer transform-group"></div>
      <svg
        id="dangling-pipe"
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="dangling-pipe-container" class="transform-group"></g>
      </svg>
      <div class="port-inspection workspace-layer transform-group">
        ${portInspection()}
      </div>
    </div>
  `;
}

function examplesModal() {
  return html`<div class="modal examples">
    <div class="modal-title">Examples</div>
    <div class="modal-content">
      ${Object.keys(GLOBAL_STATE.examples).map(
        (path) =>
          html`<div
            @click=${() => {
              dispatch({ showExamples: false });
              importExample(path);
            }}
            class="modal-entry">
            ${fileName(path)}
          </div>`
      )}
    </div>
  </div>`;
}
