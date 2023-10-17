import { render, html, nothing } from "lit-html";
import { Directive, directive } from "lit-html/directive.js";
import { GLOBAL_STATE } from "../state";
import { moveTool } from "../events/toolEvents";
import { beginPortDrag } from "../events/portEvents.js";
import { deleteTool } from "../actions/toolchainManagement";

class Shadow extends Directive {
  constructor(partInfo) {
    super(partInfo);
    partInfo.parentNode.attachShadow({ mode: "open" });
  }
  update(part, arr) {
    let tool = arr[1];

    render(arr[0], part.parentNode.shadowRoot);

    // if (!tool.domInitialized) {
    //   tool.domInitialized = true;
    //   if ("postInit" in tool.lifecycle) {
    //     tool.lifecycle.postInit();

    //     render(arr[0], part.parentNode.shadowRoot);
    //   }
    // }
  }
}

const shadow = directive(Shadow);

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

export function tool(toolID, tool) {
  return html`<div
    class="tool"
    data-toolid=${toolID}
    style="transform: translate(${GLOBAL_STATE.layout[toolID]
      .x}px, ${GLOBAL_STATE.layout[toolID].y}px)">
    <div class="toolbar" @pointerdown=${(e) => moveTool(e, toolID)}>
      ${tool.displayName}
      <div class="menu-icon">
        <a class="menu" href="#"
          ><i class="fa-solid fa-ellipsis-vertical"></i
        ></a>
        <div class="tool-menu">${toolMenu(toolID)}</div>
      </div>
    </div>
    <div class="tool-content">
      ${tool.view ? shadow(tool.view(), tool) : nothing}
    </div>

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
      ${Object.entries(tool.outputs).map(
        ([portID, portData]) =>
          html`<div class="field out">
            <span>${portID}</span>
            <div
              class="port"
              data-portside="out"
              data-portid=${portID}
              @pointerdown=${(e) =>
                beginPortDrag(e, toolID, portID, "out")}></div>
          </div>`
      )}
    </div>
  </div>`;
}
