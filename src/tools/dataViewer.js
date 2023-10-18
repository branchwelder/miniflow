import { html, render } from "lit-html";

export default function dataViewer() {
  function view({ inputs }) {
    return html`<span>${inputs.data}</span>`;
  }
  return {
    inputConfig: {
      data: { type: "any" },
    },
    render(current) {
      render(view(current), this.dom);
    },
  };
}