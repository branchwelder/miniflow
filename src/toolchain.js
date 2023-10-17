export class Toolchain {
  constructor(tools = {}, pipes = {}) {
    this.tools = tools;
    this.pipes = pipes;
  }

  getConnectedPipes(toolID) {
    console.log(this.pipes);
    return Object.keys(this.pipes).filter((pipeID) => {
      return (
        this.pipes[pipeID].start.toolID == toolID ||
        this.pipes[pipeID].end.toolID == toolID
      );
    });
  }

  addTool(toolID, tool) {
    return new Toolchain({ ...this.tools, [toolID]: tool }, this.pipes);
  }

  deleteTool(toolID) {
    const connectedPipes = this.getConnectedPipes(toolID);
    const newPipes = {};

    Object.keys(this.pipes).forEach((pipeID) => {
      if (pipeID in connectedPipes) {
        if (this.pipes[pipeID].end.toolID != toolID) {
          const endTool = this.tools[pipe.end.toolID];
          const endPort = endTool.inputs[pipe.end.portID];
          endPort.value = null;
        }
      } else {
        newPipes[pipeID] = this.pipes[pipeID];
      }
    });

    const { [toolID]: _, ...newTools } = this.tools;
    console.log(newPipes);

    return new Toolchain(newTools, newPipes);
  }

  addPipe(pipeID, start, end) {
    if (start.toolID == end.toolID) {
      console.log("Can't connect a tool to itself!");
      return;
    }

    return new Toolchain(
      { ...this.tools },
      { ...this.pipes, [pipeID]: { start, end } }
    );
  }

  deletePipe(pipeID) {
    const { [pipeID]: _, ...remainingPipes } = this.pipes;

    return new Toolchain({ ...this.tools }, remainingPipes);
  }

  getConnectedInports(toolID, portID) {
    let pipes = Object.entries(globalState.toolchain.pipes).filter(
      ([pipeID, pipeData]) => {
        return (
          pipeData.start.toolID == toolID && pipeData.start.portID == portID
        );
      }
    );
    return pipes;
  }
}
