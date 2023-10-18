import { svg, nothing } from "lit-html";
import { GLOBAL_STATE } from "../state";
import { toWorkspaceCoords } from "../utils";
import { deletePipe } from "../toolchain/lifecycle";

function portConnectionPoint(portEl) {
  const rect = portEl.getBoundingClientRect();

  return toWorkspaceCoords({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

function pipeBezier(start, end) {
  return `M${start.x},${start.y}
    C${start.x + 100},${start.y}
    ${end.x - 100},${end.y}
    ${end.x},${end.y}`;
}

function danglingBezier(side, startCoords, endCoords) {
  if (side == "in") {
    return pipeBezier(endCoords, startCoords);
  } else {
    return pipeBezier(startCoords, endCoords);
  }
}

export function danglingPipe() {
  if (GLOBAL_STATE.danglingPipe) {
    const { side, originPort, endCoords } = GLOBAL_STATE.danglingPipe;
    const startCoords = portConnectionPoint(originPort);

    return svg`<path class="pipe-progress" d=${danglingBezier(
      side,
      startCoords,
      endCoords
    )} /><circle class="pipe-start" cx="${endCoords.x}" cy="${
      endCoords.y
    }" r="5" />`;
  }
  return nothing;
}

function queryPortCoords({ toolID, portID }, side) {
  return document.querySelector(
    `[data-toolid="${toolID}"] [data-portside=${side}][data-portid="${portID}"]`
  );
}

function portCoords({ start, end }) {
  let startPort = queryPortCoords(start, "out");
  let endPort = queryPortCoords(end, "in");

  if (!startPort || !endPort) return;

  return {
    start: portConnectionPoint(startPort),
    end: portConnectionPoint(endPort),
  };
}

export function pipes() {
  return Object.entries(GLOBAL_STATE.toolchain.pipes).map(
    ([pipeID, pipeData]) => {
      const { start, end } = portCoords(pipeData);
      const bezierPath = pipeBezier(start, end);

      return svg`<path class="pipe-background " data-pipeid=${pipeID} d="${bezierPath}" />
    <path class="pipe" data-pipeid=${pipeID} @contextmenu=${(e) => {
        e.preventDefault();
        deletePipe(pipeID);
      }} d="${bezierPath}" />`;
    }
  );
}
