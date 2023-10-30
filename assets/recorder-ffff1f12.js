import{D as d,x as a}from"./index-7bd21d40.js";function b(){return{displayName:"Record",outputConfig:{objectURL:{type:"objectURL"},audioBuffer:{type:"AudioBuffer"}},stateConfig:{recorder:{value:null,type:"MediaRecorder"}},inputConfig:{mediaStream:{type:"MediaStream",change({outputs:e,state:r,global:u},c,s){if(!c)return;r.recorder=new MediaRecorder(c);let o=[];r.recorder.ondataavailable=i=>{o.push(i.data)},r.recorder.onstop=i=>{const n=new Blob(o,{type:"audio/ogg; codecs=opus"});o=[],e.objectURL=window.URL.createObjectURL(n);const t=new FileReader;t.onloadend=()=>{const l=t.result;u.audioContext.decodeAudioData(l,f=>{e.audioBuffer=f})},t.readAsArrayBuffer(n)}}}},render({state:e,dom:r}){e.recorder?e.recorder.state=="recording"?d(a` <button
            style="width: 100%;"
            @click=${()=>{e.recorder.stop()}}>
            Stop
          </button>`,r):d(a` <button
            style="width: 100%;"
            @click=${()=>{e.recorder.start()}}>
            Record
          </button>`,r):d(a`no stream available`,r)}}}export{b as default};
