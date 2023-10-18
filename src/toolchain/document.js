import { GLOBAL_STATE } from "../state";
import { loadToolchainJSON, clearCurrentToolchain } from "./toolchainLifecycle";

export function newToolchain() {
  clearCurrentToolchain();
}

export function uploadToolchain() {
  let fileInput = document.createElement("input");

  fileInput.setAttribute("type", "file");
  fileInput.style.display = "none";

  document.body.appendChild(fileInput);
  fileInput.click();
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      loadToolchainJSON(JSON.parse(fileReader.result));
    };
  };
  document.body.removeChild(fileInput);
}

export function downloadToolchain() {
  const toolchainJSON = {
    pan: GLOBAL_STATE.pan,
    scale: GLOBAL_STATE.scale,
    layout: GLOBAL_STATE.layout,
    toolchain: GLOBAL_STATE.toolchain.toJSON(),
  };

  const downloadLink = document.createElement("a");
  downloadLink.href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(toolchainJSON));
  downloadLink.download = `${GLOBAL_STATE.title}.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
