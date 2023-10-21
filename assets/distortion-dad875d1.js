import{D as i,x as r}from"./index-6e2f550d.js";const m=Math.PI/180;function u(e=50){const n=new Float32Array(44100);return n.forEach((d,o)=>{const t=o*2/44100-1;n[o]=(3+e)*t*20*m/(Math.PI+e*Math.abs(t))}),n}function l(){return{displayName:"Distortion",outputConfig:{node:{type:"AudioNode"}},stateConfig:{amount:{value:50,type:"Number",change({outputs:e},a){e.node.curve=u(a)}},overSample:{value:"2x",type:"String",change({outputs:e},a){e.node.overSample=a}}},inputConfig:{node:{type:"AudioNode",change({outputs:e},a,n){n&&n.disconnect(e.node),a&&a.connect(e.node)}}},setup({global:e,outputs:a,state:n}){a.node=e.audioContext.createWaveShaper(),a.node.curve=u(n.amount)},teardown({outputs:e}){e.node.disconnect()},render({state:e,dom:a}){i(r`<div>
          <input
            @input=${n=>e.amount=Number(n.target.value)}
            type="range"
            min="0"
            max="200"
            step="1"
            .value=${e.amount}
            list="volumes"
            name="volume" />
          ${["none","2x","4x"].map(n=>r`<input
                type="radio"
                id=${n}
                value=${n}
                name="oversample"
                @change=${d=>e.overSample=n}
                ?checked=${e.overSample===n} />
              <label for=${n}>${n}</label><br />`)}
        </div>`,a)}}}export{l as default};
