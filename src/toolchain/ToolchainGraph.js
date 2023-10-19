export class ToolchainGraph {
  constructor(tools = {}, pipes = {}) {
    this.tools = tools;
    this.pipes = pipes;
  }

  toJSON() {
    const tools = Object.fromEntries(
      Object.entries(this.tools).map(([toolID, tool]) => [
        toolID,
        {
          state: tool.saveState(tool.state),
          path: tool.path,
        },
      ])
    );
    return {
      tools,
      pipes: this.pipes,
    };
  }

  rootTools() {
    return Object.fromEntries(
      Object.entries(this.tools).filter(([toolID, tool]) => {
        return Object.keys(tool.inputs).every(
          (portID) => !this.connectedOutput(toolID, portID)
        );
      })
    );
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
      if (!(pipeID in connectedPipes)) {
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

    let connected = this.connectedOutput(end.toolID, end.portID);

    if (connected) {
      // if a pipe is already connected to the input, remove it
      const { [connected.pipeID]: _, ...remainingPipes } = this.pipes;

      return new ToolchainGraph(
        { ...this.tools },
        { ...remainingPipes, [pipeID]: { start, end } }
      );
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
        return { pipeID, pipeData };
      }
    }
    return false;
  }
}
