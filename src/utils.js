import { GLOBAL_STATE } from "./state";

export function eventPos(e) {
  return { x: e.clientX, y: e.clientY };
}

export function buildPipeID(start, end) {
  return `${start.toolID}_${start.portID}_${end.toolID}_${end.portID}`;
}

export function toWorkspaceCoords({ x, y }) {
  const workspace = document
    .getElementById("workspace")
    .getBoundingClientRect();

  return {
    x: (x - GLOBAL_STATE.pan.x) / GLOBAL_STATE.scale,
    y:
      (y - GLOBAL_STATE.pan.y) / GLOBAL_STATE.scale -
      workspace.top / GLOBAL_STATE.scale,
  };
}

export function getPortDetails(port) {
  return {
    toolID: port.closest(".tool").dataset.toolid,
    portID: port.dataset.portid,
  };
}

export function fileName(path) {
  return path.split("/").at(-1).split(".")[0];
}
