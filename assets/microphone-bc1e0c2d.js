import{D as c,x as n}from"./index-6e2f550d.js";function a(){return{displayName:"Microphone",outputConfig:{mediaStream:{type:"MediaStream"}},stateConfig:{microphone:{type:"MediaStream",change({outputs:o},t,i){i&&i.getTracks().forEach(function(e){e.stop()}),o.mediaStream=t}}},render({state:o,outputs:t,dom:i}){c(o.microphone?n`<button
              style="width: 100%;"
              @click=${()=>o.microphone=void 0}>
              Disconnect
            </button>`:n`<button
              style="width: 100%;"
              @click=${()=>navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(e=>{o.microphone=e,t.mediaStream=e}).catch(e=>{console.log(e)})}>
              Select Microphone
            </button>`,i)}}}export{a as default};
