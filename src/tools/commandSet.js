import { html, render } from "lit-html";

const commands = {
  penDown: "SP,0,500",
  penUp: "SP,1,500",
  home: "HM,20000",
  motorsOff: "EM,0,0",
  motorsOn: "EM,1,1",
  nickname: "QT",
  reboot: "RB",
  queryPenUp: "QP",
  togglePen: "TP",
  home: "HM,1000",
  queryMotors: "QE",
  disableMotors: "EM,0,0",
  enableMotors: "EM,1,1",
  eStop: "ES",
  queryVersion: "V",
};

export default function commandSet() {
  return {
    displayName: "Serial Command Set",
    stateConfig: {
      last: {
        value: undefined,
        type: "String",
        change({ outputs }, currentValue) {
          outputs.command = currentValue;
        },
      },
    },
    outputConfig: {
      command: {
        type: "String",
      },
    },
    render({ dom }) {
      render(
        html`<div
          class="container"
          style="display: flex; flex-direction: column;">
          ${Object.entries(commands).map(
            ([commandName, command]) =>
              html`<button @click=${(e) => (this.state.last = command)}>
                ${commandName}
              </button>`
          )}
        </div>`,
        dom
      );
    },
  };
}
