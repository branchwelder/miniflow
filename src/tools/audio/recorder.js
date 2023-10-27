import { html, render } from "lit-html";

export default function recorder() {
  return {
    displayName: "Record",
    outputConfig: {
      objectURL: { type: "objectURL" },
      audioBuffer: { type: "AudioBuffer" },
    },
    stateConfig: {
      recorder: {
        value: null,
        type: "MediaRecorder",
      },
    },
    inputConfig: {
      mediaStream: {
        type: "MediaStream",
        change({ outputs, state, global }, current, last) {
          if (!current) return;

          state.recorder = new MediaRecorder(current);

          let chunks = [];

          state.recorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          state.recorder.onstop = (e) => {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            outputs.objectURL = window.URL.createObjectURL(blob);

            const fileReader = new FileReader();

            fileReader.onloadend = () => {
              const arrayBuffer = fileReader.result;

              global.audioContext.decodeAudioData(
                arrayBuffer,
                (audioBuffer) => {
                  outputs.audioBuffer = audioBuffer;
                }
              );
            };

            fileReader.readAsArrayBuffer(blob);
          };
        },
      },
    },
    render({ state, dom }) {
      if (!state.recorder) {
        render(html`no stream available`, dom);
      } else if (state.recorder.state == "recording") {
        render(
          html` <button
            style="width: 100%;"
            @click=${() => {
              state.recorder.stop();
            }}>
            Stop
          </button>`,
          dom
        );
      } else {
        render(
          html` <button
            style="width: 100%;"
            @click=${() => {
              state.recorder.start();
            }}>
            Record
          </button>`,
          dom
        );
      }
    },
  };
}
