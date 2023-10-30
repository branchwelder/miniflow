import{D as n,x as a}from"./index-7bd21d40.js";function r(){return{displayName:"Oscillator",inputConfig:{frequency:{type:"Number",change({outputs:e},o){o&&(e.node.frequency.value=o)}}},outputConfig:{node:{type:"AudioNode"}},stateConfig:{waveType:{value:"sine",type:"String",change({outputs:e},o){o&&(e.node.type=o)}}},setup({outputs:e,global:o}){e.node=o.audioContext.createOscillator(),e.node.start()},teardown({outputs:e}){e.node.disconnect()},render({state:e,dom:o}){n(a`<div>
          <span>waveform:</span>
          <select
            name="waveform"
            .value=${e.waveType}
            @change=${t=>e.waveType=t.target.value}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>`,o)}}}export{r as default};
