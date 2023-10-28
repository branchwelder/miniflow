import { html } from "lit-html";
import {
  downloadToolchain,
  uploadToolchain,
  newToolchain,
} from "../toolchain/document";
import { GLOBAL_STATE, dispatch, undo } from "../state";
import { startEditingTitle } from "../events/taskbarEvents";

export function taskbar() {
  return html` <div id="taskbar">
    <span class="site-title">toolchains</span>

    <span id="toolchain-title" @pointerdown=${(e) => startEditingTitle(e)}>
      <span id="title-field">${GLOBAL_STATE.toolchain.title}</span>
      <i class="edit-name fa-solid fa-pen-to-square"></i>
    </span>

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
