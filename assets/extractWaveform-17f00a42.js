function l(){return{displayName:"Extract Waveform",outputConfig:{numberArray:{type:"Number[]"}},extract({outputs:e,inputs:t}){if(!t.audioBuffer){e.numberArray=void 0;return}const o=t.audioBuffer.getChannelData(0),m=t.numSamples??70,r=Math.floor(o.length/m),u=[];for(let a=0;a<m;a++){let i=r*a,f=0;for(let n=0;n<r;n++)f=f+Math.abs(o[i+n]);u.push(f/r)}const c=Math.pow(Math.max(...u),-1);e.numberArray=u.map(a=>a*c)},inputConfig:{audioBuffer:{type:"AudioBuffer",change(e,t){e.extract(e)}},numSamples:{type:"Number",change(e){e.extract(e)}}}}}export{l as default};
