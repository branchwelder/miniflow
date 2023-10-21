import { GLOBAL_STATE, dispatch } from "../state";
import { html, svg, nothing } from "lit-html";
import { beginPortWindowDrag } from "../events/portWindowEvents";
import {
  queryPortElement,
  elementCenter,
  toWorkspaceCoords,
  getPortColor,
} from "../utils";

export function portInspection() {
  return Object.entries(GLOBAL_STATE.portInspection).map(([id, pos]) => {
    const [toolID, portID] = id.split(":");
    const port = GLOBAL_STATE.toolchain.tools[toolID].outputConfig[portID];
    const portColor = getPortColor(toolID, portID, "out");
    return html`<div
      class="port-window grab"
      data-portwindowid=${id}
      @pointerdown=${(e) => beginPortWindowDrag(e, id)}
      style="transform: translate(${pos.x}px, ${pos.y}px); --color: var(${portColor});">
      <div class="port-window-title">
        ${portID}
        <i
          @click=${() => {
            const { [id]: del, ...rest } = GLOBAL_STATE.portInspection;
            dispatch({ portInspection: rest });
          }}
          class="fa-solid fa-rectangle-xmark"></i>
      </div>
      <div class="port-window-content">
        <div>type</div>
        <div class="port-type">${port.type}</div>
        <div>value</div>
        <div class="port-value">
          ${port.value === undefined ? "undefined" : port.value.toString()}
        </div>
      </div>
    </div>`;
  });
}

function getPortWindowPos(id) {
  const portWindow = document.querySelector(`[data-portwindowid="${id}"]`);
  if (!portWindow) return false;
  const rect = portWindow.getBoundingClientRect();
  return toWorkspaceCoords({
    x: rect.left,
    y: rect.top + rect.height / 2,
  });
}

export function portInspectionLine() {
  return Object.entries(GLOBAL_STATE.portInspection).map(([id, pos]) => {
    const [toolID, portID] = id.split(":");
    const portColor = getPortColor(toolID, portID, "out");
    const portPos = elementCenter(queryPortElement({ toolID, portID }, "out"));

    const portWindowPos = getPortWindowPos(id);
    if (!portWindowPos) return nothing;

    return svg`<line  x1=${portPos.x} y1=${portPos.y} x2=${
      portWindowPos.x - 2
    } y2=${portWindowPos.y} stroke="var(--base0)" stroke-width="3px" />
        <circle fill="var(--base0)" cx="${portWindowPos.x}" cy="${
      portWindowPos.y
    }" r="6.5px" />
    <line x1=${portPos.x} y1=${portPos.y} x2=${portWindowPos.x - 2} y2=${
      portWindowPos.y
    } stroke="var(${portColor})" stroke-width="2px" />
    <circle fill="var(${portColor})" cx="${portWindowPos.x}" cy="${
      portWindowPos.y
    }" r="6px" />`;
  });
}
