import { html } from "lit-html";
import {
  downloadToolchain,
  uploadToolchain,
  newToolchain,
} from "../toolchain/document";
import { GLOBAL_STATE, dispatch, undo } from "../state";

export function taskbar() {
  return html` <div id="taskbar">
    <span>toolchains</span>
    <div class="taskbar-buttons">
      <button class="taskbar-btn" @click=${() => undo()}>
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button class="taskbar-btn" @click=${() => newToolchain()}>
        <i class="fa-solid fa-file"></i>
      </button>

      <button class="taskbar-btn" @click=${() => uploadToolchain()}>
        <i class="fa-solid fa-upload"></i>
      </button>
      <button class="taskbar-btn" @click=${() => downloadToolchain()}>
        <i class="fa-solid fa-download"></i>
      </button>
      <button
        class="taskbar-btn"
        @click=${() => dispatch({ showExamples: !GLOBAL_STATE.showExamples })}>
        <i class="fa-solid fa-book"></i>
      </button>
    </div>
  </div>`;
}
