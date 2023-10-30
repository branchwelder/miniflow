import{D as r,x as o}from"./index-7bd21d40.js";function u(){return{displayName:"Text Area",stateConfig:{text:{value:"Hello World!",type:"string",change({outputs:e},t){e.text=t}}},setup({state:e,outputs:t}){t.text=e.text},outputConfig:{text:{type:"string"}},render({dom:e,state:t,outputs:x}){r(o`<textarea
          style="display: block;"
          rows="5"
          cols="30"
          @input=${a=>{t.text=a.target.value}}
          .value=${t.text}></textarea>`,e)}}}export{u as default};
