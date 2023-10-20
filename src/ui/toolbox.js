import { GLOBAL_STATE } from "../state";
import { html } from "lit-html";
import { beginToolDrag } from "../events/toolboxDragAndDrop";
import { fileName } from "../utils";

export function toolbox() {
  return html`<div class="modal toolbox">
    <div class="modal-title">
      <i class="fa-solid fa-toolbox"></i>
      <span>toolbox</span>
    </div>
    <div class="modal-content">
      ${Object.keys(GLOBAL_STATE.toolbox).map(
        (path) =>
          html`<div
            class="modal-entry grab"
            @pointerdown=${(e) => beginToolDrag(e, path)}>
            ${fileName(path)}
          </div>`
      )}
    </div>
  </div>`;
}
