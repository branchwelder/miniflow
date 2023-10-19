import { html, render } from "lit-html";

export default function serialWriter() {
  return {
    displayName: "Serial Writer",
    stateConfig: {},
    inputConfig: {
      command: {
        type: "String",
        change(tool, currentValue) {
          if (currentValue) tool.writeToPort(currentValue);
        },
      },
      writableStream: { type: "writableStream" },
    },
    async writeToPort(text) {
      await this.inputs.writableStream.write(text + "\n");
    },
    shouldWrite(e) {
      if (e.key === "Enter" && this.inputs.writableStream) {
        this.writeToPort(e.target.value);
        e.target.value = "";
      }
    },
    render({ dom }) {
      render(
        html`<input type="text" @keydown=${(e) => this.shouldWrite(e)} />`,
        dom
      );
    },
  };
}
