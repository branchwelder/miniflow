import{D as i,x as t}from"./index-414d293e.js";function d(){return{displayName:"Gain",outputConfig:{node:{type:"AudioNode"}},stateConfig:{volume:{value:.5,type:"Number",change({outputs:e},n){e.node.gain.value=n}}},inputConfig:{node:{type:"AudioNode",change({outputs:e},n,o){o&&o.disconnect(e.node),n&&n.connect(e.node)}}},setup({global:e,outputs:n}){n.node=e.audioContext.createGain()},teardown({outputs:e}){console.log("teardown"),e.node.disconnect()},render({state:e,dom:n}){i(t`<div>
          <input
            @input=${o=>e.volume=Number(o.target.value)}
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            .value=${e.volume}
            list="volumes"
            name="volume" />
        </div>`,n)}}}export{d as default};
