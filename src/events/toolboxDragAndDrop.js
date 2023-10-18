import { importAndAddTool } from "../toolchain/toolLifecycle";
import { eventPos, toWorkspaceCoords } from "../utils";
import { GLOBAL_STATE, dispatch } from "../state";
import { html, render } from "lit-html";
import { fileName } from "../utils";

export function beginToolDrag(e, path) {
  let startPos = eventPos(e);
  dispatch({ transforming: true });

  const dragged = e.target;
  dragged.setPointerCapture(e.pointerId);
  dragged.classList.remove("grab");
  dragged.classList.add("grabbing");

  const dragImage = document.createElement("div");
  dragImage.classList.add("drag-image");
  document.body.appendChild(dragImage);
  render(html`<span>${fileName(path)}</span>`, dragImage);

  function translateDragImage(e) {
    const pos = eventPos(e);
    dragImage.style.cssText = `transform: translate(${pos.x}px, ${pos.y}px);`;
  }

  translateDragImage(e);

  function end(e) {
    dispatch({ transforming: false });
    dragged.classList.add("grab");
    dragged.classList.remove("grabbing");
    dragImage.remove();

    importAndAddTool(path, toWorkspaceCoords(eventPos(e)));

    dragged.removeEventListener("pointermove", onDrag);
    dragged.removeEventListener("pointerup", end);
    dragged.removeEventListener("pointercancel", end);
  }

  function onDrag(e) {
    e.preventDefault();
    translateDragImage(e);
  }

  dragged.addEventListener("pointermove", onDrag);
  dragged.addEventListener("pointerup", end);
  dragged.addEventListener("pointercancel", end);
}
