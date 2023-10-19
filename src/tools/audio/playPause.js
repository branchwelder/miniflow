import { html, render } from "lit-html";

export default function playPause() {
  return {
    displayName: "Play/Pause",
    toggleState(ctx) {
      if (ctx.state === "suspended") {
        ctx.resume();
      } else if (ctx.state === "running") {
        ctx.suspend();
      }
    },
    render({ dom, global }) {
      render(
        html`<button
          style="width: 100%;"
          @click=${() => this.toggleState(global.audioContext)}>
          Play/Pause
        </button>`,
        dom
      );
    },
  };
}
