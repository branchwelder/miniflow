import { GLOBAL_STATE } from "../state";

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
      const lastValue = Reflect.get(...arguments).value;
      Reflect.get(...arguments).value = value;
      if (tool.stateConfig[prop].change)
        tool.stateConfig[prop].change(tool, value, lastValue);
      return true;
    },
  };
}

function outputHandler(tool, toolID) {
  return {
    get(target, prop, receiver) {
      return Reflect.get(...arguments).value;
    },
    set(obj, portID, value) {
      const lastValue = Reflect.get(...arguments).value;

      Reflect.get(...arguments).value = value;
      const connected = GLOBAL_STATE.toolchain.connectedInputs(toolID, portID);

      connected.forEach(([pipeID, { start, end }]) => {
        const endTool = GLOBAL_STATE.toolchain.tools[end.toolID];
        const endPort = endTool.inputConfig[end.portID];
        if (endPort.change) endPort.change(endTool, value, lastValue);
      });

      return true;
    },
  };
}

export function buildProxies(toolID, tool) {
  tool.inputs = new Proxy(tool.inputConfig, inputHandler(toolID));
  tool.state = new Proxy(tool.stateConfig, stateHandler(tool, toolID));
  tool.outputs = new Proxy(tool.outputConfig, outputHandler(tool, toolID));
}
