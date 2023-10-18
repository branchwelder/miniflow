export class ToolchainGraph {
  constructor(tools = {}, pipes = {}) {
    this.tools = tools;
    this.pipes = pipes;
  }

  getConnectedPipes(toolID) {
    return Object.fromEntries(
      Object.entries(this.pipes).filter(([pipeID, pipeData]) => {
        return pipeData.start.toolID == toolID || pipeData.end.toolID == toolID;
      })
    );
  }

  addTool(toolID, tool) {
    return new ToolchainGraph({ ...this.tools, [toolID]: tool }, this.pipes);
  }

  deleteTool(toolID) {
    const connectedPipes = this.getConnectedPipes(toolID);
    const newPipes = {};

    Object.entries(this.pipes).forEach(([pipeID, pipe]) => {
      if (pipeID in connectedPipes) {
        // If pipe is connected
        if (pipe.end.toolID != toolID) {
          // If pipe ends at a different tool set the input to null
          const endTool = this.tools[pipe.end.toolID];
          const endPort = endTool.inputs[pipe.end.portID];
          endPort.value = null;
        }
      } else {
        // If pipe is not connected add it to the new pipe object
        newPipes[pipeID] = pipe;
      }
    });

    const { [toolID]: old, ...newTools } = this.tools;

    return new ToolchainGraph(newTools, newPipes);
  }

  addPipe(pipeID, start, end) {
    if (start.toolID == end.toolID) {
      console.log("Can't connect a tool to itself!");
      return;
    }

    return new ToolchainGraph(
      { ...this.tools },
      { ...this.pipes, [pipeID]: { start, end } }
    );
  }

  deletePipe(pipeID) {
    const { [pipeID]: _, ...remainingPipes } = this.pipes;

    return new ToolchainGraph({ ...this.tools }, remainingPipes);
  }

  connectedInputs(toolID, portID) {
    return Object.entries(this.pipes).filter(([pipeID, pipeData]) => {
      return pipeData.start.toolID == toolID && pipeData.start.portID == portID;
    });
  }

  connectedOutput(toolID, portID) {
    for (const pipe of Object.entries(this.pipes)) {
      let [pipeID, pipeData] = pipe;
      if (pipeData.end.toolID == toolID && pipeData.end.portID == portID) {
        return pipeData.start;
      }
    }
    return false;
  }
}
