export class Toolchain {
  constructor(tools = {}, pipes = {}) {
    this.tools = tools;
    this.pipes = pipes;
  }

  addTool(toolID, tool) {
    return new Toolchain({ ...this.tools, [toolID]: tool }, this.pipes);
  }

  removeTool() {}

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

  removePipe() {}

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
