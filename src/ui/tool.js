import { render, html, nothing } from "lit-html";
import { Directive, directive } from "lit-html/directive.js";
import { GLOBAL_STATE } from "../state";
import { moveTool } from "../events/toolEvents";
import { beginPortDrag } from "../events/portEvents.js";

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

export function tool(toolID, tool) {
  return html`<div
    class="tool"
    data-toolid=${toolID}
    style="transform: translate(${GLOBAL_STATE.layout[toolID]
      .x}px, ${GLOBAL_STATE.layout[toolID].y}px)">
    <div class="toolbar" @pointerdown=${(e) => moveTool(e, toolID)}>
      ${tool.displayName}
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
