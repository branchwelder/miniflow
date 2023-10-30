import{D as t,x as i}from"./index-7bd21d40.js";function u(){return{displayName:"Convolver",outputConfig:{node:{type:"AudioNode"}},stateConfig:{volume:{value:.5,type:"Number",change({outputs:e},o){e.node.gain.value=o}}},inputConfig:{node:{type:"AudioNode",change({outputs:e},o,n){n&&n.disconnect(e.node),o&&o.connect(e.node)}}},setup({global:e,outputs:o}){o.node=e.audioContext.createConvolver()},teardown({outputs:e}){e.node.disconnect()},render({state:e,dom:o}){t(i`<div>
          <input
            @input=${n=>e.volume=Number(n.target.value)}
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            .value=${e.volume}
            list="volumes"
            name="volume" />
        </div>`,o)}}}export{u as default};
