import { directive, Directive } from "lit-html/directive.js";
import { AsyncDirective } from "lit-html/async-directive.js";
import { render, noChange } from "lit-html";

class Shadow extends AsyncDirective {
  // Attaches a shadow dom to the parent node, and renders
  // the tool view into it on each update
  constructor(partInfo) {
    super(partInfo);
    // console.log(partInfo);
    this.shadowRoot = partInfo.parentNode.attachShadow({ mode: "open" });
  }

  update(part, [toolID, tool]) {
    this.toolName = tool.displayName;
    if (this.isConnected) {
      render(tool.view(), this.shadowRoot);
    }
    // if (!tool.domInitialized) {
    //   tool.domInitialized = true;
    //   if ("postInit" in tool.lifecycle) {
    //     tool.lifecycle.postInit();
    //     render(arr[0], part.parentNode.shadowRoot);
    //   }
    // }

    return noChange;
  }

  // subscribe(observable) {
  //   this.unsubscribe = observable.subscribe((v) => {
  //     this.setValue(v);
  //   });
  // }

  disconnected() {
    // this.unsubscribe();
    console.log("DISCONNECT");
    console.log(this.shadowRoot);
    console.log(this.toolName);
  }

  // reconnected() {
  //   console.log("RECONNECT");
  // }
}

export const shadow = directive(Shadow);
