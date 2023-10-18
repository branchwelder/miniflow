import { ToolchainGraph } from "../toolchain/ToolchainGraph";
import { GLOBAL_STATE, dispatch } from "../state";
import { importTool, addTool, removeToolDom } from "./toolLifecycle";
import { updateTool } from "./updateTool";

function updateRootTools() {
  Object.entries(GLOBAL_STATE.toolchain.rootTools()).forEach(([toolID, tool]) =>
    updateTool(tool)
  );
}

export async function loadToolchainJSON(workspaceJSON) {
  await clearCurrentToolchain();
  const { pan, layout, scale, toolchain } = workspaceJSON;

  const tools = await Promise.all(
    Object.entries(toolchain.tools).map(async ([toolID, { path, state }]) => {
      const toolModule = await importTool(path);
      const { tool } = addTool(path, toolModule(), state, toolID);
      return [toolID, tool];
    })
  );

  dispatch({
    toolchain: new ToolchainGraph(Object.fromEntries(tools), toolchain.pipes),
    pan,
    layout,
    scale,
  }).then(updateRootTools);
}

export function clearCurrentToolchain() {
  // Clean up tool dom
  Object.values(GLOBAL_STATE.toolchain.tools).forEach((tool) =>
    removeToolDom(tool)
  );

  return dispatch({
    layout: {},
    toolchain: new ToolchainGraph(),
    pan: { x: 0, y: 0 },
    scale: 1,
  });
}
