import { html, render } from "lit-html";

export default function playAudio() {
  return {
    displayName: "playAudio",
    inputConfig: {
      objectURL: { type: "objectURL" },
    },
    render({ inputs, dom }) {
      if (inputs.objectURL) {
        render(
          html`<audio controls loop src=${inputs.objectURL}></audio>`,
          dom
        );
      }
    },
  };
}
