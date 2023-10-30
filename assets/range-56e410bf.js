import{D as a,x as i}from"./index-7bd21d40.js";function p(){return{displayName:"Range",stateConfig:{number:{value:5,type:"number",change({outputs:r},e){r.number=e}},min:{value:0,type:"number"},max:{value:10,type:"number"},step:{value:1,type:"number"},live:{value:!0,type:"boolean"}},setup({state:r,outputs:e}){e.number=r.number},outputConfig:{number:{type:"number"}},render({dom:r,state:e}){a(i` <style>
            * {
              box-sizing: border-box;
            }
            .container {
              width: 200px;
            }
            .controls {
              gap: 4px;
              display: none;
              grid-template-columns: auto auto;
              padding: 4px;
            }

            .controls input {
              width: 100%;
            }

            .range-ui {
              display: flex;
              gap: 4px;
              padding: 4px;
            }

            .expander {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }

            #config-toggle:checked + .controls {
              display: grid;
            }

            .toggle-btn {
              outline: 1px solid var(--tool-frame);
              padding: 2px 3px;
              text-align: end;
              user-select: none;
              background-color: var(--background-accent);
              color: var(--text-inactive);
            }

            .toggle-btn:hover {
              cursor: pointer;
              color: var(--tool-frame);
              background-color: var(--purple);
            }
          </style>
          <div class="container">
            <div class="range-ui">
              <input
                style="flex: 1;"
                layout,
                scale,
                type="range"
                .value=${String(e.number)}
                .min=${String(e.min)}
                .max=${String(e.max)}
                .step=${String(e.step)}
                @input=${n=>{e.live&&(e.number=Number(n.target.value))}}
                @change=${n=>{e.live||(e.number=Number(n.target.value))}} /><span>${e.number}</span>
            </div>
            <div class="expander">
              <label for="config-toggle" class="toggle-btn">config...</label>
              <input id="config-toggle" type="checkbox" hidden />
              <div class="controls">
                <span>min</span>
                <input
                  type="number"
                  .value=${String(e.min)}
                  @change=${n=>{e.min=Number(n.target.value)}} />
                <span>max</span>
                <input
                  type="number"
                  .value=${String(e.max)}
                  @change=${n=>{e.max=Number(n.target.value)}} />
                <span>step</span>
                <input
                  type="number"
                  .value=${String(e.step)}
                  @change=${n=>{e.step=Number(n.target.value)}} />
                <span>live</span>
                <input
                  type="checkbox"
                  ?checked=${e.live}
                  @change=${n=>{e.live=n.target.checked}} />
              </div>
            </div>
          </div>`,r)}}}export{p as default};
