import { render } from "lit-html";
import { view } from "./ui/view";
import { pipes, danglingPipe } from "./ui/pipe";

function r() {
  render(view(), document.body);
  render(pipes(), document.getElementById("pipes-container"));
  render(danglingPipe(), document.getElementById("dangling-pipe-container"));
  window.requestAnimationFrame(r);
}

function init() {
  r();
}

window.onload = init;
