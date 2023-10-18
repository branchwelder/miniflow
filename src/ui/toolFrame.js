import { html } from "lit-html";
import { GLOBAL_STATE } from "../state";
import { moveTool } from "../events/toolEvents";
import { beginPortDrag } from "../events/portEvents.js";
import { deleteTool } from "../toolchain/lifecycle";
import { live } from "lit-html/directives/live.js";

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

function output(toolID, portID) {
  return html`<div class="field out">
    <span>${portID}</span>
    <div
      class="port"
      data-portside="out"
      data-portid=${portID}
      @pointerdown=${(e) => beginPortDrag(e, toolID, portID, "out")}></div>
  </div>`;
}

export function toolFrame(toolID, tool) {
  return html`<div class="toolbar" @pointerdown=${(e) => moveTool(e, toolID)}>
      ${tool.displayName}
      <div class="menu-icon">
        <a class="menu" href="#"
          ><i class="fa-solid fa-ellipsis-vertical"></i
        ></a>
        <div class="tool-menu">${toolMenu(toolID)}</div>
      </div>
    </div>
    <div class="tool-content"></div>
    <div class="tooldata">
      ${Object.entries(tool.inputs).map(
        ([portID, portData]) =>
          html`<div class="field in">
            <div
              class="port"
              data-portside="in"
              data-portid=${portID}
              @pointerdown=${(e) =>
                beginPortDrag(e, toolID, portID, "in")}></div>
            <span>${portID}</span>
          </div>`
      )}
      ${Object.keys(tool.state).reduce((acc, cur) => {
        console.log(cur);
        console.log(tool.state);
        if (tool.stateVars[cur].output) acc.push(output(toolID, cur));
        return acc;
      }, [])}
    </div>`;
}
