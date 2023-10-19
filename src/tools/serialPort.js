import { html, render } from "lit-html";

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
    await port.open({ baudRate: 9600 });
    state.port = port;
  }

  function view({ state }) {
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
      port: { type: "port", value: undefined },
    },
    outputConfig: {
      serialPort: { type: "SerialPort" },
    },
    updated({ state }) {
      return { serialPort: state.port };
    },
    render(dom, current) {
      render(view(current), dom);
    },
    saveState(state) {
      return { port: undefined };
    },
  };
}
