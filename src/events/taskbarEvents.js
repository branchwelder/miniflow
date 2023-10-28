import {
  blurTargetOnEnter,
  selectElementContents,
  checkCharacterCount,
} from "../utils";
import { GLOBAL_STATE, dispatch } from "../state";

function updateToolchainName(e) {
  const tcTitle = document.getElementById("title-field");

  dispatch({ toolchain: GLOBAL_STATE.toolchain.setTitle(tcTitle.textContent) });

  tcTitle.contentEditable = false;
  tcTitle.removeEventListener("focusout", updateToolchainName);
  tcTitle.removeEventListener("keypress", blurTargetOnEnter);
  tcTitle.removeEventListener("keypress", check);
}

function check(e) {
  const tcTitle = document.getElementById("title-field");

  checkCharacterCount(tcTitle, 50, e);
}

export function startEditingTitle(e) {
  const tcTitle = document.getElementById("title-field");
  tcTitle.contentEditable = true;

  tcTitle.addEventListener("focusout", updateToolchainName);
  tcTitle.addEventListener("keypress", blurTargetOnEnter);
  tcTitle.addEventListener("keypress", check);

  setTimeout(function () {
    selectElementContents(tcTitle);
    tcTitle.focus();
  }, 0);
}
