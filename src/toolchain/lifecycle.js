import { GLOBAL_STATE, dispatch } from "../state";
import { buildPipeID } from "../utils";
import { toolFrame } from "../ui/toolFrame";
import { render } from "lit-html";
import { buildProxies } from "./proxies";
import { updateTool } from "./updateTool";
import baseTool from "./baseTool";
import { ToolchainGraph } from "../toolchain/ToolchainGraph";

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
  });
}

export function clearCurrentToolchain() {
  // Clean up tool dom
  Object.values(GLOBAL_STATE.toolchain.tools).forEach((tool) =>
    removeToolDom(tool)
  );

  return dispatch({
    layout: {},
    toolchain: new ToolchainGraph(),
  });
}

function initToolDom(toolID, tool) {
  if (tool.init) tool.init({ inputs: tool.inputs, state: tool.state });

  updateTool(tool);

  tool.root = document.createElement("div");
  tool.root.dataset.toolid = toolID;
  tool.root.classList.add("tool");

  render(toolFrame(toolID, tool), tool.root);

  tool.dom = tool.root
    .querySelector(".tool-content")
    .attachShadow({ mode: "open" });

  renderTool(toolID, tool);

  document.getElementById("tool-ui").appendChild(tool.root);

  if (tool.connected) tool.connected();
}

function renderTool(toolID, tool) {
  if (tool.render) tool.render({ inputs: tool.inputs, state: tool.state });
}

function addTool(path, toolConfig, startState, id) {
  const tool = { ...baseTool, ...toolConfig, path: path };

  if (startState) {
    Object.entries(startState).forEach(
      ([key, value]) => (tool.stateConfig[key].value = value)
    );
  }

  const toolID = id ?? crypto.randomUUID();

  buildProxies(toolID, tool);

  initToolDom(toolID, tool);

  return { toolID, tool };
}

export function importAndAddTool(path) {
  importTool(path).then((toolModule) => {
    const { toolID, tool } = addTool(path, toolModule());

    dispatch({
      toolchain: GLOBAL_STATE.toolchain.addTool(toolID, tool),
      layout: {
        ...GLOBAL_STATE.layout,
        [toolID]: { x: 100, y: 500 },
      },
    });
  });
}

export function importTool(path) {
  if (!(path in GLOBAL_STATE.toolbox))
    console.error(`Error: module at path ${path} not found`);

  return GLOBAL_STATE.toolbox[path]();
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
  }).then(() => updateTool(GLOBAL_STATE.toolchain.tools[end.toolID]));
}

export function deletePipe(pipeID) {
  const endToolID = GLOBAL_STATE.toolchain.pipes[pipeID].end.toolID;

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.deletePipe(pipeID),
  }).then(() => {
    updateTool(GLOBAL_STATE.toolchain.tools[endToolID]);
  });
}

function removeToolDom(tool) {
  if (tool.disconnected) tool.disconnected();
  tool.root.remove();
}

export function deleteTool(toolID) {
  const tool = GLOBAL_STATE.toolchain.tools[toolID];
  removeToolDom(tool);

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.deleteTool(toolID),
  });
}
