import{D as i,x as t}from"./index-6e2f550d.js";function s(){const o=[];return{async readUntilClosed(a){const e=a;try{for(;;){const{value:r,done:l}=await e.read();if(l){e.releaseLock();break}o.unshift(r)}}catch(r){console.log(r)}finally{e.releaseLock()}},displayName:"Number",inputConfig:{readableStream:{type:"readableStream",change(a,e,r){e&&a.readUntilClosed(e)}}},render({dom:a}){i(t` <style>
            .container {
              display: flex;
              flex-direction: column-reverse;
              font-family: monospace;
              color: var(--text-highlight);
              background-color: var(--base1);
              height: 300px;
              overflow-y: auto;
            }

            .entry {
              padding: 0.2em;
            }
          </style>
          <div class="container">
            ${o.map(e=>t`<div class="entry">${e}</div>`)}
          </div>`,a)}}}export{s as default};
