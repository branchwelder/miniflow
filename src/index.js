import { render } from "lit-html";
import { view } from "./ui/view";
import { pipes, danglingPipe } from "./ui/pipe";

import { GLOBAL_STATE } from "./state";

function setTransform(toolID, tool) {
  let pos = GLOBAL_STATE.layout[toolID];
  tool.root.style.cssText = `transform: translate(${pos.x}px, ${pos.y}px)`;
}

function renderTools() {
  Object.entries(GLOBAL_STATE.toolchain.tools).forEach(([toolID, tool]) => {
    if (tool.render) tool.render({ inputs: tool.inputs, state: tool.state });

    setTransform(toolID, tool);
  });
}

function r() {
  render(view(), document.body);
  render(pipes(), document.getElementById("pipes-container"));
  render(danglingPipe(), document.getElementById("dangling-pipe-container"));
  renderTools();
  window.requestAnimationFrame(r);
}

function init() {
  r();
}

window.onload = init;
