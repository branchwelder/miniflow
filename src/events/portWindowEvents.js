import { GLOBAL_STATE, dispatch } from "../state";
import { eventPos, toWorkspaceCoords } from "../utils";

export function beginPortWindowDrag(e, id) {
  let startPos = GLOBAL_STATE.portInspection[id];
  let startClientPos = toWorkspaceCoords(eventPos(e));

  const portWindow = e.target;
  portWindow.setPointerCapture(e.pointerId);
  dispatch({ transforming: true });

  portWindow.classList.remove("grab");
  portWindow.classList.add("grabbing");

  function end(e) {
    dispatch({ transforming: false });

    portWindow.classList.add("grab");
    portWindow.classList.remove("grabbing");

    portWindow.removeEventListener("pointermove", onDrag);
    portWindow.removeEventListener("pointerup", end);
    portWindow.removeEventListener("pointercancel", end);
  }

  function onDrag(e) {
    e.preventDefault();
    const currentPos = toWorkspaceCoords(eventPos(e));

    let x = startPos.x - Math.floor(startClientPos.x - currentPos.x);
    let y = startPos.y - Math.floor(startClientPos.y - currentPos.y);

    dispatch({
      portInspection: {
        ...GLOBAL_STATE.portInspection,
        [id]: { x, y },
      },
    });
  }

  portWindow.addEventListener("pointermove", onDrag);
  portWindow.addEventListener("pointerup", end);
  portWindow.addEventListener("pointercancel", end);
}
