import { html, render } from "lit-html";

export default function oscillator() {
  let ctx;
  function toggleState() {
    if (ctx.state === "suspended") {
      ctx.resume();
    } else if (ctx.state === "running") {
      ctx.suspend();
    }
  }
  function view() {
    return html`<button @click=${() => toggleState()}>Play/Pause</button>`;
  }
  return {
    displayName: "Play/Pause",
    init({ inputs, state }, context) {
      ctx = context.audio;
    },
    render(dom) {
      render(view(), dom);
    },
  };
}
