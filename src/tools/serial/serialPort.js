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

export default function serialPort() {
  async function disconnect(state) {
    console.log(state.port);
    await state.port.close();
    state.port = undefined;
  }

  async function connect(state) {
    if (!"serial" in navigator) {
      // The Web Serial API is not supported.
      alert("Please update to the latest Chrome");
      return;
    }
    const port = await navigator.serial.requestPort();
    const { usbProductId, usbVendorId } = port.getInfo();
    await port.open({ baudRate: 9600 });

    state.port = port;
  }

  function view(state) {
    if (state.port) {
      return html`<button @click=${() => disconnect(state)}>
        disconnect
      </button>`;
    } else {
      return html`<button @click=${() => connect(state)}>connect</button>`;
    }
  }

  return {
    displayName: "Number",
    stateConfig: {
      port: {
        type: "port",
        value: undefined,
        change({ state, outputs }, currentValue, lastValue) {
          if (!currentValue) {
            outputs.readableStream = undefined;
            outputs.writableStream = undefined;
          }

          const textEncoder = new TextEncoderStream();
          const writableStreamClosed = textEncoder.readable.pipeTo(
            currentValue.writable
          );

          let decoder = new TextDecoderStream();

          currentValue.readable.pipeTo(decoder.writable);

          const inputStream = decoder.readable.pipeThrough(
            new TransformStream(new LineBreakTransformer())
          );

          outputs.readableStream = inputStream.getReader();
          outputs.writableStream = textEncoder.writable.getWriter();
        },
      },
    },
    // setup({ outputs }) {
    //   state.port = global.audioContext.createGain();
    // },
    outputConfig: {
      readableStream: { type: "readableStream" },
      writableStream: { type: "writableStream" },
    },
    // updated({ state }) {
    //   if (!state.port)
    //     return {
    //       writableStream: undefined,
    //       readableStream: undefined,
    //     };

    //   const textEncoder = new TextEncoderStream();
    //   const writableStreamClosed = textEncoder.readable.pipeTo(
    //     state.port.writable
    //   );

    //   let decoder = new TextDecoderStream();

    //   state.port.readable.pipeTo(decoder.writable);

    //   const inputStream = decoder.readable.pipeThrough(
    //     new TransformStream(new LineBreakTransformer())
    //   );

    //   return {
    //     readableStream: inputStream.getReader(),
    //     writableStream: textEncoder.writable.getWriter(),
    //   };
    // },
    render({ dom, state }) {
      render(view(state), dom);
    },
    saveState(state) {
      return { port: undefined };
    },
  };
}
