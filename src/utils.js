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

export function elementCenter(el) {
  const rect = el.getBoundingClientRect();

  return toWorkspaceCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

export function getPortConfig(toolID, portID, side) {
  if (side === "in")
    return GLOBAL_STATE.toolchain.tools[toolID].inputConfig[portID];
  return GLOBAL_STATE.toolchain.tools[toolID].outputConfig[portID];
}

export function getPortColor(toolID, portID, side) {
  const portType = getPortConfig(toolID, portID, side).type;

  return GLOBAL_STATE.colors[portType] ?? "--purple";
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

export function queryPortElement({ toolID, portID }, side) {
  return document.querySelector(
    `[data-toolid="${toolID}"] [data-portside=${side}][data-portid="${portID}"]`
  );
}

export function blurTargetOnEnter(e) {
  if (e.code === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
}

export function selectElementContents(element) {
  let range = document.createRange();
  range.selectNodeContents(element);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function checkCharacterCount(element, max, e) {
  if (element.textContent.length > max) {
    e.preventDefault();
  }
}
