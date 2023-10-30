import{D as a,x as n}from"./index-7bd21d40.js";function l(){return{displayName:"Function",stateConfig:{text:{value:'console.log("hello world")',type:"text",change({outputs:e},t){e.text=t}}},setup({state:e,outputs:t}){t.text=e.text},outputConfig:{text:{type:"text"}},render({dom:e,state:t,outputs:r}){a(n`<textarea
          rows="30"
          cols="80"
          @change=${o=>{console.log("asdf"),t.text=o.target.value}}
          .value=${t.text}></textarea>`,e)}}}export{l as default};
