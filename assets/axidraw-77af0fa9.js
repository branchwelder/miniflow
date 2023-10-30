import{x as p,D as d}from"./index-7bd21d40.js";import{P as m}from"./path-bec00ab6.js";const h=40*2;function v(t,e,a){let s=a*h,n=Math.round(t*h),o=Math.round(e*h);const i=n+o,l=n-o;return s=s>25e3?25e3:s,s=s<2?2:s,`HM,${s},${i},${l}`}function u(t,e,a){let s=Math.round(t*h),n=Math.round(e*h),o=Math.sqrt(t*t+e*e),i=Math.round(o/a*1e3);return i==0&&console.log("INVALID DURATION"),i=i<4?4:i,`XM,${i},${s},${n}`}const r={penDown:"SP,0,500",penUp:"SP,1,500",motorsOff:"EM,0,0",motorsOn:"EM,1,1",nickname:"QT",reboot:"RB",queryPenUp:"QP",togglePen:"TP",home:"HM,10000",queryMotors:"QE",disableMotors:"EM,0,0",enableMotors:"EM,1,1",eStop:"ES",queryVersion:"V"},w={Home:"HM,1000","Motors Off":"EM,0,0","Motors On":"EM,1,1",Reboot:"RB","Toggle Pen":"TP","E Stop":"ES"},c={A6:{width:150,height:100},A4:{width:279,height:215},A3:{width:420,height:297}};function g(){return{displayName:"AxiDraw",stateConfig:{history:{value:[],type:"Path"},previewCanvas:{type:"element"},historyCanvas:{type:"element"},model:{type:"string",value:"A6",change(t){t.sizeCanvas()}},penUpSpeed:{type:"Number",value:100},penDownSpeed:{type:"Number",value:30}},outputConfig:{command:{type:"String"}},inputConfig:{path:{type:"Path",change(t){t.drawPaths()}},writableStream:{type:"WritableStream"}},drawPaths(){const t=this.state.historyCanvas,e=this.state.previewCanvas,{width:a,height:s}=c[this.state.model],n=e.width/a;let o=e.getContext("2d"),i=t.getContext("2d");o.resetTransform(),i.resetTransform(),o.scale(n,n),i.scale(n,n),o.clearRect(0,0,e.width,e.height),i.clearRect(0,0,t.width,t.height),o.strokeStyle="red",this.inputs.path&&this.inputs.path.draw(o),i.strokeStyle="black",this.state.history&&this.state.history.forEach(l=>l.draw(i))},sizeCanvas(){const{width:t,height:e}=c[this.state.model],a=e/t,s=this.state.previewCanvas.getBoundingClientRect().width;this.state.previewCanvas.width=s,this.state.previewCanvas.height=s*a,this.state.historyCanvas.width=s,this.state.historyCanvas.height=s*a,this.drawPaths()},setup({state:t}){t.previewCanvas=document.createElement("canvas"),t.previewCanvas.id="preview",t.historyCanvas=document.createElement("canvas"),t.history=[]},async sendCommand(t){await this.inputs.writableStream.write(t+`
`)},clearHistory(){this.history=new m},controlsView(){return p`${Object.entries(w).map(([t,e])=>p`<button
            ?disabled=${!this.inputs.writableStream}
            @click=${a=>this.sendCommand(e)}>
            ${t}
          </button>`)}`},connected({dom:t,state:e}){const a=t.getElementById("canvas-container");a.appendChild(e.previewCanvas),a.appendChild(e.historyCanvas),this.sizeCanvas()},plot(){const t=this.inputs.path;t&&(this.sendCommand(r.penUp),this.sendCommand(r.home),t.segments.forEach(e=>{if(e.length<2)return;let a=e[0];this.sendCommand(v(a[0],a[1],this.state.penUpSpeed)),this.sendCommand(r.penDown),e.forEach(([s,n])=>{this.sendCommand(u(s-a[0],n-a[1],this.state.penDownSpeed)),a=[s,n]}),this.sendCommand(r.penUp)}),this.sendCommand(r.home),this.state.history.push(t))},render({dom:t,inputs:e,state:a}){d(p`<style>
            .controls {
              display: flex;
              gap: 4px;
            }
            #container {
              display: flex;
              flex-direction: column;
              padding: 10px;
              gap: 5px;
              resize: horizontal;
              overflow: auto;
            }
            #canvas-container {
              background-color: white;
              border: 1px solid black;
              position: relative;
            }
            #canvas-container canvas {
              display: block;
              width: 100%;
              height: auto;
            }

            #preview {
              position: absolute;
              top: 0px;
              left: 0px;
            }
            button {
              white-space: nowrap;
            }
          </style>
          <div id="container">
            <div class="controls">
              <select
                name="model-type"
                .value=${this.state.model}
                @change=${s=>this.state.model=s.target.value}>
                ${Object.entries(c).map(([s,n])=>p`<option value=${s}>${s}</option>`)}
              </select>
              <button
                @click=${()=>{a.history=[],this.drawPaths()}}>
                Clear
              </button>
            </div>
            <div id="canvas-container"></div>
            <button
              @click=${()=>this.plot()}
              ?disabled=${!e.writableStream}>
              ${e.writableStream?"Plot it!":"Connect a machine to plot"}
            </button>
            <div class="controls">${this.controlsView()}</div>
          </div>`,t)}}}export{g as default};
