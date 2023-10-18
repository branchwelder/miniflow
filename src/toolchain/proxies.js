import { GLOBAL_STATE } from "../state";
import { updateTool } from "./updateTool";

function inputHandler(toolID) {
  return {
    get(target, prop, receiver) {
      const connected = GLOBAL_STATE.toolchain.connectedOutput(toolID, prop);

      if (connected) {
        const start = connected.pipeData.start;
        return GLOBAL_STATE.toolchain.tools[start.toolID].outputs[start.portID];
      }

      return undefined;
    },

    set(obj, prop, value) {
      console.log("Can't set an input");
    },
  };
}

function stateHandler(tool, toolID) {
  return {
    get(target, prop, receiver) {
      return Reflect.get(...arguments).value;
    },
    set(obj, prop, value) {
      Reflect.get(...arguments).value = value;
      updateTool(tool);
      return true;
    },
  };
}

function outputHandler(toolID) {
  return {
    get(target, prop, receiver) {
      return Reflect.get(...arguments).value;
    },
    set(obj, prop, value) {
      Reflect.get(...arguments).value = value;
      const connected = GLOBAL_STATE.toolchain.connectedInputs(toolID, prop);

      connected.forEach(([pipeID, pipeData]) => {
        updateTool(GLOBAL_STATE.toolchain.tools[pipeData.end.toolID]);
      });

      return true;
    },
  };
}

export function buildProxies(toolID, tool) {
  tool.inputs = new Proxy(tool.inputConfig, inputHandler(toolID));
  tool.state = new Proxy(tool.stateConfig, stateHandler(tool, toolID));
  tool.outputs = new Proxy(tool.outputConfig, outputHandler(toolID));
}
