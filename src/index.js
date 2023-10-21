import { render } from "lit-html";
import { view } from "./ui/view";
import { pipes, danglingPipe } from "./ui/pipe";
import { renderTool, positionTool } from "./toolchain/toolLifecycle";

import { GLOBAL_STATE, StateObserver } from "./state";

function updateLayout() {
  Object.entries(GLOBAL_STATE.toolchain.tools).forEach(([toolID, tool]) => {
    positionTool(tool, GLOBAL_STATE.layout[toolID]);
  });

  renderPipes();
}

function updateTransform() {
  const toMove = document.querySelectorAll(".transform-group");
  toMove.forEach((el) => {
    el.style.cssText = `transform: translate(${GLOBAL_STATE.pan.x}px, ${GLOBAL_STATE.pan.y}px) scale(${GLOBAL_STATE.scale})`;
  });
  document.getElementById(
    "background"
  ).style.cssText = `--offset-x: ${GLOBAL_STATE.pan.x}px;--offset-y: ${GLOBAL_STATE.pan.y}px;--scale: ${GLOBAL_STATE.scale};`;
  renderPipes();
}

function renderPipes() {
  render(pipes(), document.getElementById("pipes-container"));
  render(danglingPipe(), document.getElementById("dangling-pipe-container"));
}

function renderTools() {
  Object.entries(GLOBAL_STATE.toolchain.tools).forEach(([toolID, tool]) => {
    renderTool(toolID, tool);
  });
}

function r() {
  render(view(), document.body);
  renderTools();
  renderPipes();
  window.requestAnimationFrame(r);
}

function setCustomProperties() {
  Object.entries(GLOBAL_STATE.theme).map(([key, val]) => {
    document.documentElement.style.setProperty(key, val);
  });
}

function init() {
  r();
  setCustomProperties();
  StateObserver.subscribe("layout", updateLayout);
  StateObserver.subscribe("pan", updateTransform);
  StateObserver.subscribe("scale", updateTransform);
}

window.onload = init;
