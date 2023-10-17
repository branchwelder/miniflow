import { GLOBAL_STATE, dispatch } from "../state";
import { buildPipeID } from "../utils";

export function importTool(path) {
  if (!(path in GLOBAL_STATE.toolbox))
    console.error(`Error: module at path ${path} not found`);

  GLOBAL_STATE.toolbox[path]().then((tool) => {
    const toolID = crypto.randomUUID();

    dispatch({
      toolchain: GLOBAL_STATE.toolchain.addTool(toolID, tool),
      layout: { ...GLOBAL_STATE.layout, [toolID]: { x: 100, y: 500 } },
    });
  });
}

export function addPipe(start, end) {
  if (start.toolID == end.toolID) {
    console.log("Can't connect a tool to itself!");
    return;
  }

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.addPipe(
      buildPipeID(start, end),
      start,
      end
    ),
  });
}
