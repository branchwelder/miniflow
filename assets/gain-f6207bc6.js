import{D as i,x as a}from"./index-7bd21d40.js";function t(){return{displayName:"Gain",outputConfig:{node:{type:"AudioNode"}},stateConfig:{volume:{value:.5,type:"Number",change({outputs:e},n){e.node.gain.value=n}}},inputConfig:{node:{type:"AudioNode",change({outputs:e},n,o){o&&o.disconnect(e.node),n&&n.connect(e.node)}}},setup({global:e,state:n,outputs:o}){o.node=e.audioContext.createGain(),o.node.gain.value=n.volume},teardown({outputs:e}){e.node.disconnect()},render({state:e,dom:n}){i(a`<div>
          <input
            @input=${o=>e.volume=Number(o.target.value)}
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            .value=${e.volume}
            list="volumes"
            name="volume" />
        </div>`,n)}}}export{t as default};
