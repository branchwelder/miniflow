import { ToolchainGraph } from "../toolchain/ToolchainGraph";
import { GLOBAL_STATE, dispatch } from "../state";
import {
  importTool,
  addTool,
  removeToolDom,
  addPipe,
  positionTool,
} from "./toolLifecycle";

export function importExample(path) {
  GLOBAL_STATE.examples[path]().then((json) => loadToolchainJSON(json));
}

export async function loadToolchainJSON(workspaceJSON) {
  await clearCurrentToolchain();
  const { pan, layout, scale, toolchain } = workspaceJSON;

  const tools = await Promise.all(
    Object.entries(toolchain.tools).map(async ([toolID, { path, state }]) => {
      const toolModule = await importTool(path);

      const { tool } = addTool(path, toolModule(), state, toolID);
      positionTool(tool, layout[toolID]);

      return [toolID, tool];
    })
  );

  dispatch({
    toolchain: new ToolchainGraph(Object.fromEntries(tools), {}),
    pan,
    layout,
    scale,
  }).then(() => {
    Object.entries(toolchain.pipes).forEach(([pipeID, { start, end }]) => {
      addPipe(start, end);
    });
  });
}

export function clearCurrentToolchain() {
  // Clean up tool dom
  Object.values(GLOBAL_STATE.toolchain.tools).forEach((tool) => {
    removeToolDom(tool);
    if (tool.teardown) tool.teardown(tool);
  });

  return dispatch({
    layout: {},
    portInspection: {},
    toolchain: new ToolchainGraph(),
    pan: { x: 0, y: 0 },
    scale: 1,
  });
}
