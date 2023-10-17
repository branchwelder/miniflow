import { GLOBAL_STATE, dispatch } from "../state";
import { eventPos, toWorkspaceCoords } from "../utils";

export function pan(e) {
  let startPos = GLOBAL_STATE.pan;
  let startClientPos = eventPos(e);

  const workspace = e.target;
  workspace.setPointerCapture(e.pointerId);
  dispatch({ transforming: true });

  function end(e) {
    dispatch({ transforming: false });

    workspace.removeEventListener("pointermove", onDrag);
    workspace.removeEventListener("pointerup", end);
    workspace.removeEventListener("pointercancel", end);
  }

  function onDrag(e) {
    e.preventDefault();

    dispatch({
      pan: {
        x: startPos.x - Math.floor(startClientPos.x - eventPos(e).x),
        y: startPos.y - Math.floor(startClientPos.y - eventPos(e).y),
      },
    });
  }

  workspace.addEventListener("pointermove", onDrag);
  workspace.addEventListener("pointerup", end);
  workspace.addEventListener("pointercancel", end);
}

function zoomAtPoint(pt, scale) {
  const start = {
    x: (pt.x - GLOBAL_STATE.pan.x) / GLOBAL_STATE.scale,
    y: (pt.y - GLOBAL_STATE.pan.y) / GLOBAL_STATE.scale,
  };

  dispatch({
    scale,
    pan: {
      x: pt.x - start.x * scale,
      y: pt.y - start.y * scale,
    },
  });
}

export function zoom(e) {
  const bounds = e.target.getBoundingClientRect();
  const scale =
    Math.sign(e.deltaY) > 0
      ? GLOBAL_STATE.scale * 0.9
      : GLOBAL_STATE.scale * 1.1;

  zoomAtPoint(
    {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    },
    scale
  );
}
