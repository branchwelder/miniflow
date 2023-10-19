import { html, render } from "lit-html";

export default function serialReader() {
  const history = [];

  return {
    async readUntilClosed(readableStream) {
      const reader = readableStream;

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          history.unshift(value);
        }
      } catch (error) {
        console.log(error);
      } finally {
        reader.releaseLock();
      }
    },
    displayName: "Number",
    inputConfig: {
      readableStream: {
        type: "readableStream",
        change(tool, currentValue, lastValue) {
          if (currentValue) tool.readUntilClosed(currentValue);
        },
      },
    },
    render({ dom }) {
      render(
        html` <style>
            .container {
              display: flex;
              flex-direction: column-reverse;
              font-family: monospace;
              color: var(--text-highlight);
              background-color: var(--base1);
              height: 300px;
              overflow-y: auto;
            }

            .entry {
              padding: 0.2em;
            }
          </style>
          <div class="container">
            ${history.map(
              (message) => html`<div class="entry">${message}</div>`
            )}
          </div>`,
        dom
      );
    },
  };
}
