import { html } from "lit-html";
import { moveTool } from "../events/toolEvents";
import { beginPortDrag } from "../events/portEvents.js";
import { deleteTool } from "../toolchain/lifecycle";

function toolMenu(toolID) {
  return html`<div class="menu-item edit-toolname">
      <i class="edit-toolname fa-solid fa-pen-to-square fa-fw"></i>
      <span class="edit-toolname">Edit Display Name</span>
    </div>
    <div class="menu-item" @click=${(e) => deleteTool(toolID)}>
      <i class="fa-solid fa-trash fa-fw"></i>
      <span class="remove">Delete</span>
    </div>`;
}

function port(toolID, portID, side) {
  return html`<div class="field ${side}">
    <div
      class="port"
      data-portside=${side}
      data-portid=${portID}
      @pointerdown=${(e) => beginPortDrag(e, toolID, portID, side)}></div>
    <span>${portID}</span>
  </div>`;
}

export function toolFrame(toolID, tool) {
  return html`<div class="toolbar" @pointerdown=${(e) => moveTool(e, toolID)}>
      ${tool.displayName}
      <div class="menu-icon">
        <a class="menu" href="#">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </a>
        <div class="tool-menu">${toolMenu(toolID)}</div>
      </div>
    </div>
    <div class="tool-content"></div>
    <div class="tooldata">
      ${Object.keys(tool.inputs).map((portID) => port(toolID, portID, "in"))}
      ${Object.keys(tool.outputs).map((portID) => port(toolID, portID, "out"))}
    </div>`;
}
