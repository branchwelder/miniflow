import { html, nothing } from "lit-html";
import { when } from "lit-html/directives/when.js";
import { GLOBAL_STATE } from "../state";
import { importTool } from "../toolchain/lifecycle";
import { pan, zoom } from "../events/panZoom";
import { danglingPipe, pipes } from "./pipe";
import { keyed } from "lit-html/directives/keyed.js";

function toolbox() {
  return Object.entries(GLOBAL_STATE.toolbox).map(
    ([path, mod]) =>
      html`<button class="tool-import" @click=${() => importTool(path)}>
        ${path}
      </button>`
  );
}

export function view() {
  return html`
    <div id="title-bar">toolchains</div>
    <div id="workspace">
      <div id="toolbox">${toolbox()}</div>
      <canvas
        draggable="false"
        id="background"
        style="--offset-x: ${GLOBAL_STATE.pan.x}px;--offset-y: ${GLOBAL_STATE
          .pan.y}px;--scale: ${GLOBAL_STATE.scale};"
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
        <g
          id="pipes-container"
          class="transform-group"
          style="transform: translate(${GLOBAL_STATE.pan.x}px, ${GLOBAL_STATE
            .pan.y}px) scale(${GLOBAL_STATE.scale})">
          ${pipes()}
        </g>
      </svg>
      <div
        id="tool-ui"
        style="transform: translate(${GLOBAL_STATE.pan.x}px, ${GLOBAL_STATE.pan
          .y}px) scale(${GLOBAL_STATE.scale});"></div>
      <svg
        id="dangling-pipe"
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g
          id="dangling-pipe-container"
          class="transform-group"
          style="transform: translate(${GLOBAL_STATE.pan.x}px, ${GLOBAL_STATE
            .pan.y}px) scale(${GLOBAL_STATE.scale})"></g>
      </svg>
    </div>
  `;
}
