import { html, render } from "lit-html";

class LineBreakTransformer {
  constructor() {
    // Holds stream data until a new line
    this.container = "";
  }

  transform(chunk, controller) {
    // appends the incoming incoming chunk to the container
    this.container += chunk;
    // tries to split on newline characters
    const lines = this.container.split("\r\n");
    // update the container to be whatever is left after splitting
    this.container = lines.pop();
    // for each line enqueue it in the controller (pop removed any unfinished line)
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // Flush the stream
    controller.enqueue(this.container);
  }
}

export default function serialMonitor() {
  const history = [];
  async function readFromPort(port) {
    console.log("reading from port");
    while (port.readable) {
      let decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
      const inputStream = decoder.readable.pipeThrough(
        new TransformStream(new LineBreakTransformer())
      );
      const reader = inputStream.getReader();

      try {
        while (true) {
          const { value, done } = await reader.read();
          history.unshift(value);

          if (done) {
            // |reader| has been canceled.
            break;
          }
          // Do something with |value|...
        }
      } catch (error) {
        // Handle |error|...
      } finally {
        reader.releaseLock();
      }
    }
  }

  function view({ state }) {
    return html` <style>
        .container {
          display: flex;
          flex-direction: column-reverse;
          font-family: monospace;
          color: white;
          background-color: var(--base0);
          height: 300px;
          overflow-y: auto;
        }

        .entry {
          padding: 0.2em;
        }
      </style>
      <div class="container">
        ${history.map((entry) => html`<div class="entry">${entry}</div>`)}
      </div>`;
  }

  return {
    displayName: "Number",
    stateConfig: {
      history: { type: "string[]" },
    },
    inputConfig: {
      serialPort: { type: "SerialPort" },
    },
    updated({ inputs, state }) {
      if (inputs.serialPort) readFromPort(inputs.serialPort);
      return {};
    },
    render(dom, current) {
      render(view(current), dom);
    },
  };
}
