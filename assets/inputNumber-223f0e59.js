import{D as m,x as t}from"./index-7bd21d40.js";function a(){return{displayName:"Number",stateConfig:{num:{value:10,type:"number",change({outputs:e},u){e.num=u}}},setup({state:e,outputs:u}){u.num=e.num},outputConfig:{num:{type:"number"}},render({dom:e,state:u}){m(t`<input
          type="number"
          .value=${String(u.num)}
          @change=${n=>{u.num=Number(n.target.value)}} />`,e)}}}export{a as default};
