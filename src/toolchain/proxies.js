import { GLOBAL_STATE } from "../state";

function inputHandler(toolID) {
  return {
    get(target, prop, receiver) {
      const connected = GLOBAL_STATE.toolchain.connectedOutput(toolID, prop);

      if (connected) {
        return GLOBAL_STATE.toolchain.tools[connected.toolID].stateVars[
          connected.portID
        ].value;
      }

      return undefined;
    },

    set(obj, prop, value) {
      console.log("Can't set an input");
    },
  };
}

function stateHandler(toolID) {
  return {
    get(target, prop, receiver) {
      return Reflect.get(...arguments).value;
    },
    set(obj, prop, value) {
      Reflect.get(...arguments).value = value;
      return true;
    },
  };
}

export function buildProxies(toolID, tool) {
  tool.inputs = new Proxy(tool.inputs, inputHandler(toolID));
  tool.state = new Proxy(tool.stateVars, stateHandler(toolID));
}
