import { GLOBAL_STATE, dispatch } from "../state";
import { eventPos, toWorkspaceCoords, getPortDetails } from "../utils";
import { addPipe } from "../toolchain/toolLifecycle";

export function beginPortDrag(e, toolID, portID, side) {
  let startPos = eventPos(e);
  let startClientPos = eventPos(e);
  const originPort = e.target;
  originPort.setPointerCapture(e.pointerId);
  dispatch({ transforming: true });

  function end(e) {
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    if (elemBelow.classList.contains("port")) {
      if (side == "in") {
        addPipe(getPortDetails(elemBelow), { toolID, portID });
      } else {
        addPipe({ toolID, portID }, getPortDetails(elemBelow));
      }
    }
    dispatch({ danglingPipe: null, transforming: false });

    originPort.removeEventListener("pointermove", onDrag);
    originPort.removeEventListener("pointerup", end);
    originPort.removeEventListener("pointercancel", end);
  }

  function onDrag(e) {
    e.preventDefault();
    const currentPos = eventPos(e);

    let x = startPos.x - Math.floor(startClientPos.x - currentPos.x);
    let y = startPos.y - Math.floor(startClientPos.y - currentPos.y);

    dispatch({
      danglingPipe: {
        toolID,
        portID,
        originPort,
        side,
        endCoords: toWorkspaceCoords({ x, y }),
      },
    });
  }

  originPort.addEventListener("pointermove", onDrag);
  originPort.addEventListener("pointerup", end);
  originPort.addEventListener("pointercancel", end);
}
