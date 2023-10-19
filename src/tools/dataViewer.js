import { html, render } from "lit-html";

export default function dataViewer() {
  return {
    inputConfig: {
      data: { type: "any" },
    },
    render({ dom, inputs }) {
      render(html`<span>${inputs.data}</span>`, dom);
    },
  };
}
