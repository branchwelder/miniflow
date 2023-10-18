import { GLOBAL_STATE } from "../state";
import { html } from "lit-html";
import { beginToolDrag } from "../events/toolboxDragAndDrop";
import { fileName } from "../utils";

export function toolbox() {
  return html`<div id="toolbox">
    ${Object.keys(GLOBAL_STATE.toolbox).map(
      (path) =>
        html`<div class="grab" @pointerdown=${(e) => beginToolDrag(e, path)}>
          ${fileName(path)}
        </div>`
    )}
  </div>`;
}
