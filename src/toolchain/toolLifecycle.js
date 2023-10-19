import { GLOBAL_STATE, dispatch } from "../state";
import { buildPipeID } from "../utils";
import { toolFrame } from "../ui/toolFrame";
import { buildProxies } from "./proxies";
import { render } from "lit-html";
import baseTool from "./baseTool";

function initToolDom(toolID, tool) {
  if (tool.setup) tool.setup(tool);

  tool.root = document.createElement("div");
  tool.root.dataset.toolid = toolID;
  tool.root.classList.add("tool");

  render(toolFrame(toolID, tool), tool.root);

  tool.dom = tool.root
    .querySelector(".tool-content")
    .attachShadow({ mode: "open" });

  renderTool(toolID, tool);

  document.getElementById("tool-ui").appendChild(tool.root);

  if (tool.connected) tool.connected(tool);
}

export function renderTool(toolID, tool) {
  if (tool.render) tool.render(tool);
}

export function addTool(path, toolConfig, startState, id) {
  const tool = {
    ...baseTool,
    ...toolConfig,
    path: path,
    global: GLOBAL_STATE.global,
  };

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

export function importAndAddTool(path, pos) {
  importTool(path).then((toolModule) => {
    const { toolID, tool } = addTool(path, toolModule());

    dispatch({
      toolchain: GLOBAL_STATE.toolchain.addTool(toolID, tool),
      layout: {
        ...GLOBAL_STATE.layout,
        [toolID]: pos,
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
  const endTool = GLOBAL_STATE.toolchain.tools[end.toolID];
  const endPort = endTool.inputConfig[end.portID];
  const lastValue = endTool.inputs[end.portID];

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.addPipe(
      buildPipeID(start, end),
      start,
      end
    ),
  }).then(() => {
    if (endPort.change) {
      endPort.change(endTool, endTool.inputs[end.portID], lastValue);
    }
  });
}

export function deletePipe(pipeID) {
  const { start, end } = GLOBAL_STATE.toolchain.pipes[pipeID];

  const endTool = GLOBAL_STATE.toolchain.tools[end.toolID];
  const endPort = endTool.inputConfig[end.portID];
  const lastValue = endTool.inputs[end.portID];

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.deletePipe(pipeID),
  }).then(() => {
    if (endPort.change) {
      endPort.change(endTool, endTool.inputs[end.portID], lastValue);
    }
  });
}

export function removeToolDom(tool) {
  if (tool.disconnected) tool.disconnected();
  tool.root.remove();
}

export function deleteTool(toolID) {
  const tool = GLOBAL_STATE.toolchain.tools[toolID];
  removeToolDom(tool);
  if (tool.teardown) tool.teardown(tool);

  dispatch({
    toolchain: GLOBAL_STATE.toolchain.deleteTool(toolID),
  });
}
