import { GLOBAL_STATE, dispatch } from "../state";
import { eventPos } from "../utils";

export function moveTool(e, toolID) {
  let startPos = { ...GLOBAL_STATE.layout[toolID] };
  let startClientPos = eventPos(e);
  const toolbar = e.target;
  toolbar.setPointerCapture(e.pointerId);

  dispatch({ transforming: true });

  function end(e) {
    dispatch({ transforming: false });

    toolbar.removeEventListener("pointermove", onDrag);
    toolbar.removeEventListener("pointerup", end);
    toolbar.removeEventListener("pointercancel", end);
  }

  function onDrag(e) {
    e.preventDefault();

    let x =
      startPos.x -
      Math.floor((startClientPos.x - eventPos(e).x) / GLOBAL_STATE.scale);

    let y =
      startPos.y -
      Math.floor((startClientPos.y - eventPos(e).y) / GLOBAL_STATE.scale);

    dispatch({
      layout: { ...GLOBAL_STATE.layout, [toolID]: { x, y } },
    });
  }

  toolbar.addEventListener("pointermove", onDrag);
  toolbar.addEventListener("pointerup", end);
  toolbar.addEventListener("pointercancel", end);
}
