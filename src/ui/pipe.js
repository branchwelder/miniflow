import { svg, nothing } from "lit-html";
import { GLOBAL_STATE, dispatch } from "../state";
import {
  toWorkspaceCoords,
  queryPortElement,
  eventPos,
  elementCenter,
} from "../utils";
import { deletePipe } from "../toolchain/toolLifecycle";

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
    const startCoords = elementCenter(originPort);

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

function portCoords({ start, end }) {
  let startPort = queryPortElement(start, "out");
  let endPort = queryPortElement(end, "in");

  if (!startPort || !endPort) return;

  return {
    start: elementCenter(startPort),
    end: elementCenter(endPort),
  };
}

function inspectPort({ toolID, portID }, pos) {
  dispatch({
    portInspection: {
      ...GLOBAL_STATE.portInspection,
      [`${toolID}:${portID}`]: pos,
    },
  });
}

export function pipes() {
  return Object.entries(GLOBAL_STATE.toolchain.pipes).map(
    ([pipeID, pipeData]) => {
      const { start, end } = portCoords(pipeData);
      const bezierPath = pipeBezier(start, end);

      return svg`<path class="pipe-background"  data-pipeid=${pipeID} d="${bezierPath}" />
    <path class="pipe" data-pipeid=${pipeID} @click=${(e) =>
        inspectPort(
          pipeData.start,
          toWorkspaceCoords(eventPos(e))
        )} @contextmenu=${(e) => {
        e.preventDefault();
        deletePipe(pipeID);
      }} d="${bezierPath}" />`;
    }
  );
}
