export default function audioAnalyzer() {
  let canvas;
  function view({ state }) {
    return html`<canvas>bonjour</canvas>`;
  }

  function draw() {
    const ctx = canvas.getContext("2d");
  }

  return {
    displayName: "Number",
    connected(dom) {
      canvas = document.createElement("canvas");
      dom.appendChild(canvas);
    },
    inputConfig: {
      node: { type: "AudioNode" },
    },

    render(dom, current) {},
  };
}
