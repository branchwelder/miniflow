import { GLOBAL_STATE } from "../state";
import { importAndAddTool } from "../toolchain/lifecycle";
import { html, nothing } from "lit-html";

export function toolbox() {
  return html`<div id="toolbox">
    ${Object.entries(GLOBAL_STATE.toolbox).map(
      ([path, mod]) =>
        html`<button class="tool-import" @click=${() => importAndAddTool(path)}>
          ${path}
        </button>`
    )}
  </div>`;
}
