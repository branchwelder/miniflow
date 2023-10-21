import{D as t,x as i}from"./index-6e2f550d.js";function p(){return{displayName:"Biquad Filter",outputConfig:{node:{type:"AudioNode"}},stateConfig:{filterType:{type:"String",value:"lowpass",change({outputs:e},o){e.node.type=o}}},inputConfig:{Q:{type:"any"},detune:{type:"Number"},frequency:{type:"Number"},gain:{type:"Number"},node:{type:"AudioNode",change({outputs:e},o,n){n&&n.disconnect(e.node),o&&o.connect(e.node)}}},setup({global:e,outputs:o,state:n}){o.node=e.audioContext.createBiquadFilter(),o.node.type=n.filterType,o.node.frequency.setTargetAtTime(1e3,e.audioContext.currentTime,0),o.node.gain.setTargetAtTime(25,e.audioContext.currentTime,0)},teardown({outputs:e}){e.node.disconnect()},render({state:e,dom:o}){t(i` <style>
            .container {
              display: flex;
              flex-direction: column;
            }
          </style>
          <div class="container">
            <select
              name="type"
              .value=${e.filterType}
              @change=${n=>e.filterType=n.target.value}>
              <option value="lowpass">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
              <option value="lowshelf">lowshelf</option>
              <option value="highshelf">highshelf</option>
              <option value="peaking">peaking</option>
              <option value="notch">notch</option>
              <option value="allpass">allpass</option>
            </select>
          </div>`,o)}}}export{p as default};
