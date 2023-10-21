import { html, render } from "lit-html";

export default function mic() {
  return {
    displayName: "Microphone",
    outputConfig: {
      mediaStream: { type: "MediaStream" },
    },
    stateConfig: {
      microphone: {
        type: "MediaStream",
        change({ outputs }, current, lastStream) {
          if (lastStream) {
            lastStream.getTracks().forEach(function (track) {
              track.stop();
            });
          }
          outputs.mediaStream = current;
        },
      },
    },
    render({ state, outputs, dom }) {
      render(
        state.microphone
          ? html`<button
              style="width: 100%;"
              @click=${() => (state.microphone = undefined)}>
              Disconnect
            </button>`
          : html`<button
              style="width: 100%;"
              @click=${() =>
                navigator.mediaDevices
                  .getUserMedia({ audio: true, video: false })
                  .then((stream) => {
                    state.microphone = stream;
                    outputs.mediaStream = stream;
                  })
                  .catch((err) => {
                    console.log(err);
                  })}>
              Select Microphone
            </button>`,
        dom
      );
    },
  };
}
