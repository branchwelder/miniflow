import{D as a,x as s}from"./index-6e2f550d.js";function n(){return{displayName:"Play/Pause",toggleState(e){e.state==="suspended"?e.resume():e.state==="running"&&e.suspend()},render({dom:e,global:t}){a(s`<button
          style="width: 100%;"
          @click=${()=>this.toggleState(t.audioContext)}>
          Play/Pause
        </button>`,e)}}}export{n as default};
