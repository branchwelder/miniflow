function r(){return{displayName:"Translate Path",translate({inputs:a,outputs:t}){if(!a.path){t.path=void 0;return}const e=a.translateX??0,n=a.translateY??0;t.path=a.path.translate(e,n)},inputConfig:{path:{type:"Path",change(a){a.translate(a)}},translateX:{type:"number",change(a){a.translate(a)}},translateY:{type:"number",change(a){a.translate(a)}}},outputConfig:{path:{type:"Path"}}}}export{r as default};
