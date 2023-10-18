import { html, nothing } from "lit-html";
import { GLOBAL_STATE } from "../state";
import { taskbar } from "./taskbar";
import { toolbox } from "./toolbox";
import { pan, zoom } from "../events/panZoom";

export function view() {
  return html`
    ${taskbar()}
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
      </svg>
      <div id="tool-ui" class="transform-group"></div>
      <svg
        id="dangling-pipe"
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="dangling-pipe-container" class="transform-group"></g>
      </svg>
    </div>
  `;
}
