import { GLOBAL_STATE } from "../state";
import { html } from "lit-html";
import { beginToolDrag } from "../events/toolboxDragAndDrop";
import { fileName } from "../utils";

export function toolbox() {
  return html`<div id="toolbox">
    <div class="toolbox-title">
      <i class="fa-solid fa-toolbox"></i>
      <span>toolbox</span>
    </div>
    <div class="toolbox-contents">
      ${Object.keys(GLOBAL_STATE.toolbox).map(
        (path) =>
          html`<div
            class="toolbox-tool grab"
            @pointerdown=${(e) => beginToolDrag(e, path)}>
            ${fileName(path)}
          </div>`
      )}
    </div>
  </div>`;
}
