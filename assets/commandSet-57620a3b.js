import{D as a,x as o}from"./index-414d293e.js";const r={penDown:"SP,0,500",penUp:"SP,1,500",home:"HM,20000",motorsOff:"EM,0,0",motorsOn:"EM,1,1",nickname:"QT",reboot:"RB",queryPenUp:"QP",togglePen:"TP",home:"HM,1000",queryMotors:"QE",disableMotors:"EM,0,0",enableMotors:"EM,1,1",eStop:"ES",queryVersion:"V"};function m(){return{displayName:"Serial Command Set",stateConfig:{last:{value:void 0,type:"String",change({outputs:e},t){e.command=t}}},outputConfig:{command:{type:"String"}},render({dom:e}){a(o`<div
          class="container"
          style="display: flex; flex-direction: column;">
          ${Object.entries(r).map(([t,n])=>o`<button @click=${i=>this.state.last=n}>
                ${t}
              </button>`)}
        </div>`,e)}}}export{m as default};
