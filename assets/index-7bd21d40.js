(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const N=window,w=N.trustedTypes,X=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,W="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,rt="?"+E,Pt=`<${rt}>`,x=document,O=()=>x.createComment(""),D=e=>e===null||typeof e!="object"&&typeof e!="function",at=Array.isArray,wt=e=>at(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",U=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,K=/>/g,b=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,G=/"/g,lt=/^(?:script|style|textarea|title)$/i,ct=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),_=ct(1),J=ct(2),C=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),tt=new WeakMap,A=x.createTreeWalker(x,129,null,!1);function dt(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return X!==void 0?X.createHTML(t):t}const Lt=(e,t)=>{const n=e.length-1,i=[];let o,s=t===2?"<svg>":"",r=I;for(let l=0;l<n;l++){const c=e[l];let d,u,f=-1,m=0;for(;m<c.length&&(r.lastIndex=m,u=r.exec(c),u!==null);)m=r.lastIndex,r===I?u[1]==="!--"?r=Z:u[1]!==void 0?r=K:u[2]!==void 0?(lt.test(u[2])&&(o=RegExp("</"+u[2],"g")),r=b):u[3]!==void 0&&(r=b):r===b?u[0]===">"?(r=o??I,f=-1):u[1]===void 0?f=-2:(f=r.lastIndex-u[2].length,d=u[1],r=u[3]===void 0?b:u[3]==='"'?G:Q):r===G||r===Q?r=b:r===Z||r===K?r=I:(r=b,o=void 0);const $=r===b&&e[l+1].startsWith("/>")?" ":"";s+=r===I?c+Pt:f>=0?(i.push(d),c.slice(0,f)+W+c.slice(f)+E+$):c+E+(f===-2?(i.push(void 0),l):$)}return[dt(e,s+(e[n]||"<?>")+(t===2?"</svg>":"")),i]};class j{constructor({strings:t,_$litType$:n},i){let o;this.parts=[];let s=0,r=0;const l=t.length-1,c=this.parts,[d,u]=Lt(t,n);if(this.el=j.createElement(d,i),A.currentNode=this.el.content,n===2){const f=this.el.content,m=f.firstChild;m.remove(),f.append(...m.childNodes)}for(;(o=A.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const f=[];for(const m of o.getAttributeNames())if(m.endsWith(W)||m.startsWith(E)){const $=u[r++];if(f.push(m),$!==void 0){const xt=o.getAttribute($.toLowerCase()+W).split(E),S=/([.?@])?(.*)/.exec($);c.push({type:1,index:s,name:S[2],strings:xt,ctor:S[1]==="."?Tt:S[1]==="?"?Dt:S[1]==="@"?Ct:H})}else c.push({type:6,index:s})}for(const m of f)o.removeAttribute(m)}if(lt.test(o.tagName)){const f=o.textContent.split(E),m=f.length-1;if(m>0){o.textContent=w?w.emptyScript:"";for(let $=0;$<m;$++)o.append(f[$],O()),A.nextNode(),c.push({type:2,index:++s});o.append(f[m],O())}}}else if(o.nodeType===8)if(o.data===rt)c.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(E,f+1))!==-1;)c.push({type:7,index:s}),f+=E.length-1}s++}}static createElement(t,n){const i=x.createElement("template");return i.innerHTML=t,i}}function L(e,t,n=e,i){var o,s,r,l;if(t===C)return t;let c=i!==void 0?(o=n._$Co)===null||o===void 0?void 0:o[i]:n._$Cl;const d=D(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==d&&((s=c==null?void 0:c._$AO)===null||s===void 0||s.call(c,!1),d===void 0?c=void 0:(c=new d(e),c._$AT(e,n,i)),i!==void 0?((r=(l=n)._$Co)!==null&&r!==void 0?r:l._$Co=[])[i]=c:n._$Cl=c),c!==void 0&&(t=L(e,c._$AS(e,t.values),c,i)),t}class It{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var n;const{el:{content:i},parts:o}=this._$AD,s=((n=t==null?void 0:t.creationScope)!==null&&n!==void 0?n:x).importNode(i,!0);A.currentNode=s;let r=A.nextNode(),l=0,c=0,d=o[0];for(;d!==void 0;){if(l===d.index){let u;d.type===2?u=new R(r,r.nextSibling,this,t):d.type===1?u=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(u=new jt(r,this,t)),this._$AV.push(u),d=o[++c]}l!==(d==null?void 0:d.index)&&(r=A.nextNode(),l++)}return A.currentNode=x,s}v(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}class R{constructor(t,n,i,o){var s;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var t,n;return(n=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&n!==void 0?n:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=L(this,t,n),D(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):wt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var n;const{values:i,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=j.createElement(dt(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)===null||n===void 0?void 0:n._$AD)===s)this._$AH.v(i);else{const r=new It(s,this),l=r.u(this.options);r.v(i),this.$(l),this._$AH=r}}_$AC(t){let n=tt.get(t.strings);return n===void 0&&tt.set(t.strings,n=new j(t)),n}T(t){at(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,o=0;for(const s of t)o===n.length?n.push(i=new R(this.k(O()),this.k(O()),this,this.options)):i=n[o],i._$AI(s),o++;o<n.length&&(this._$AR(i&&i._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,n);t&&t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var n;this._$AM===void 0&&(this._$Cp=t,(n=this._$AP)===null||n===void 0||n.call(this,t))}}class H{constructor(t,n,i,o,s){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,n=this,i,o){const s=this.strings;let r=!1;if(s===void 0)t=L(this,t,n,0),r=!D(t)||t!==this._$AH&&t!==C,r&&(this._$AH=t);else{const l=t;let c,d;for(t=s[0],c=0;c<s.length-1;c++)d=L(this,l[i+c],n,c),d===C&&(d=this._$AH[c]),r||(r=!D(d)||d!==this._$AH[c]),d===v?t=v:t!==v&&(t+=(d??"")+s[c+1]),this._$AH[c]=d}r&&!o&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Tt extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const Ot=w?w.emptyScript:"";class Dt extends H{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,Ot):this.element.removeAttribute(this.name)}}class Ct extends H{constructor(t,n,i,o,s){super(t,n,i,o,s),this.type=5}_$AI(t,n=this){var i;if((t=(i=L(this,t,n,0))!==null&&i!==void 0?i:v)===C)return;const o=this._$AH,s=t===v&&o!==v||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==v&&(o===v||s);s&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n,i;typeof this._$AH=="function"?this._$AH.call((i=(n=this.options)===null||n===void 0?void 0:n.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class jt{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const et=N.litHtmlPolyfillSupport;et==null||et(j,R),((B=N.litHtmlVersions)!==null&&B!==void 0?B:N.litHtmlVersions=[]).push("2.8.0");const k=(e,t,n)=>{var i,o;const s=(i=n==null?void 0:n.renderBefore)!==null&&i!==void 0?i:t;let r=s._$litPart$;if(r===void 0){const l=(o=n==null?void 0:n.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=r=new R(t.insertBefore(O(),l),l,void 0,n??{})}return r._$AI(e),r};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function kt(e,t,n){return e?t():n==null?void 0:n()}const Rt="modulepreload",St=function(e){return"/miniflow/"+e},nt={},p=function(t,n,i){if(!n||n.length===0)return t();const o=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=St(s),s in nt)return;nt[s]=!0;const r=s.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(!!i)for(let u=o.length-1;u>=0;u--){const f=o[u];if(f.href===s&&(!r||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${l}`))return;const d=document.createElement("link");if(d.rel=r?"stylesheet":Rt,r||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),r)return new Promise((u,f)=>{d.addEventListener("load",u),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t()).catch(s=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s})};class y{constructor(t={},n={},i="toolchain"){this.tools=t,this.pipes=n,this.title=i}setTitle(t){return new y({...this.tools},{...this.pipes},t)}toJSON(){return{tools:Object.fromEntries(Object.entries(this.tools).map(([n,i])=>[n,{state:i.saveState(i.state),path:i.path}])),pipes:this.pipes,title:this.title}}rootTools(){return Object.fromEntries(Object.entries(this.tools).filter(([t,n])=>Object.keys(n.inputs).every(i=>!this.connectedOutput(t,i))))}getConnectedPipes(t){return Object.fromEntries(Object.entries(this.pipes).filter(([n,i])=>i.start.toolID==t||i.end.toolID==t))}addTool(t,n){return new y({...this.tools,[t]:n},this.pipes,this.title)}deleteTool(t){const n=this.getConnectedPipes(t),i={};Object.entries(this.pipes).forEach(([r,l])=>{r in n||(i[r]=l)});const{[t]:o,...s}=this.tools;return new y(s,i,this.title)}addPipe(t,n,i){if(n.toolID==i.toolID){console.log("Can't connect a tool to itself!");return}let o=this.connectedOutput(i.toolID,i.portID);if(o){const{[o.pipeID]:s,...r}=this.pipes;return new y({...this.tools},{...r,[t]:{start:n,end:i}},this.title)}return new y({...this.tools},{...this.pipes,[t]:{start:n,end:i}},this.title)}deletePipe(t){const{[t]:n,...i}=this.pipes;return new y({...this.tools},i,this.title)}connectedInputs(t,n){return Object.entries(this.pipes).filter(([i,o])=>o.start.toolID==t&&o.start.portID==n)}connectedOutput(t,n){for(const i of Object.entries(this.pipes)){let[o,s]=i;if(s.end.toolID==t&&s.end.portID==n)return{pipeID:o,pipeData:s}}return!1}}const Nt={"--pink":"#ff79c6","--red":"#ff5555","--orange":"#ffad55","--yellow":"#fcef3e","--green":"#50fa7b","--cyan":"#8be9fd","--blue":"#4395d4","--purple":"#9674c8","--gray":"#848484","--black":"#282a36","--black-accent":"#353745","--inactive":"#b4b4b4","--text-light":"#f8f8f2","--text-dark":"#282a36","--pipe":"#b7b7b7","--background":"#44475a","--toolbar":"#282a36","--tool-background":"#f8f8f2","--tool-background-accent":"#d5d5d5","--background-dots":"#d6cce0","--port":"#b7b7b7","--port-hover":"#e7e7e7"},ut=["toolchain","layout"],Vt=1e3;let a={title:"toolchain",toolchain:new y,toolbox:Object.assign({"./tools/add.js":()=>p(()=>import("./add-e3b7699b.js"),[]).then(e=>e.default),"./tools/audio/audioAnalyser.js":()=>p(()=>import("./audioAnalyser-cdafbe3e.js"),[]).then(e=>e.default),"./tools/audio/audioDestination.js":()=>p(()=>import("./audioDestination-694c9e25.js"),[]).then(e=>e.default),"./tools/audio/biquadFilter.js":()=>p(()=>import("./biquadFilter-29af7ab5.js"),[]).then(e=>e.default),"./tools/audio/convolver.js":()=>p(()=>import("./convolver-7cccffe9.js"),[]).then(e=>e.default),"./tools/audio/distortion.js":()=>p(()=>import("./distortion-01941c97.js"),[]).then(e=>e.default),"./tools/audio/drawWaveform.js":()=>p(()=>import("./drawWaveform-4f9b2beb.js"),["assets/drawWaveform-4f9b2beb.js","assets/path-bec00ab6.js"]).then(e=>e.default),"./tools/audio/extractWaveform.js":()=>p(()=>import("./extractWaveform-17f00a42.js"),[]).then(e=>e.default),"./tools/audio/gain.js":()=>p(()=>import("./gain-f6207bc6.js"),[]).then(e=>e.default),"./tools/audio/mediaStreamSource.js":()=>p(()=>import("./mediaStreamSource-53950084.js"),[]).then(e=>e.default),"./tools/audio/oscillator.js":()=>p(()=>import("./oscillator-d97447ab.js"),[]).then(e=>e.default),"./tools/audio/playAudio.js":()=>p(()=>import("./playAudio-01a9119f.js"),[]).then(e=>e.default),"./tools/audio/playPause.js":()=>p(()=>import("./playPause-a3123325.js"),[]).then(e=>e.default),"./tools/audio/recorder.js":()=>p(()=>import("./recorder-ffff1f12.js"),[]).then(e=>e.default),"./tools/audio/sweep.js":()=>p(()=>import("./sweep-8de5dfab.js"),[]).then(e=>e.default),"./tools/axidraw.js":()=>p(()=>import("./axidraw-77af0fa9.js"),["assets/axidraw-77af0fa9.js","assets/path-bec00ab6.js"]).then(e=>e.default),"./tools/commandSet.js":()=>p(()=>import("./commandSet-64a79cd7.js"),[]).then(e=>e.default),"./tools/data/trim.js":()=>p(()=>import("./trim-4ed993c7.js"),[]).then(e=>e.default),"./tools/dataViewer.js":()=>p(()=>import("./dataViewer-52596fc8.js"),[]).then(e=>e.default),"./tools/inputs/funcConstructor.js":()=>p(()=>import("./funcConstructor-f3d355c5.js"),[]).then(e=>e.default),"./tools/inputs/inputNumber.js":()=>p(()=>import("./inputNumber-223f0e59.js"),[]).then(e=>e.default),"./tools/inputs/microphone.js":()=>p(()=>import("./microphone-c0780526.js"),[]).then(e=>e.default),"./tools/inputs/range.js":()=>p(()=>import("./range-56e410bf.js"),[]).then(e=>e.default),"./tools/inputs/textArea.js":()=>p(()=>import("./textArea-7996f925.js"),[]).then(e=>e.default),"./tools/path/hersheyText.js":()=>p(()=>import("./hersheyText-5c9f1671.js"),["assets/hersheyText-5c9f1671.js","assets/path-bec00ab6.js"]).then(e=>e.default),"./tools/path/scalePath.js":()=>p(()=>import("./scalePath-7d519220.js"),[]).then(e=>e.default),"./tools/path/translatePath.js":()=>p(()=>import("./translatePath-b40d5c30.js"),[]).then(e=>e.default),"./tools/serial/serialPort.js":()=>p(()=>import("./serialPort-511ba49c.js"),[]).then(e=>e.default),"./tools/serial/serialReader.js":()=>p(()=>import("./serialReader-d19e0639.js"),[]).then(e=>e.default),"./tools/serial/serialWriter.js":()=>p(()=>import("./serialWriter-6681317a.js"),[]).then(e=>e.default),"./tools/visualizers/canvas.js":()=>p(()=>import("./canvas-b407132e.js"),[]).then(e=>e.default)}),examples:Object.assign({"./examples/audioAnalyser.json":()=>p(()=>import("./audioAnalyser-0a010b42.js"),[]).then(e=>e.default),"./examples/audioLabelPlot.json":()=>p(()=>import("./audioLabelPlot-889db859.js"),[]).then(e=>e.default),"./examples/audioplot.json":()=>p(()=>import("./audioplot-447bf28f.js"),[]).then(e=>e.default),"./examples/axidrawSerial.json":()=>p(()=>import("./axidrawSerial-2c980fe3.js"),[]).then(e=>e.default),"./examples/hershey.json":()=>p(()=>import("./hershey-6f9a8590.js"),[]).then(e=>e.default),"./examples/voicechanger.json":()=>p(()=>import("./voicechanger-40058016.js"),[]).then(e=>e.default)}),danglingPipe:null,layout:{},portInspection:{},pan:{x:0,y:0},scale:1,lastSnapshot:0,transforming:!1,snapshots:[],global:{audioContext:new(window.AudioContext||window.webkitAudioContext)},selectBox:{start:null,end:null},heldKeys:new Set,showExamples:!1,theme:Nt,colors:{Number:"--cyan",Object:"--purple",Boolean:"--purple",String:"--yellow",Undefined:"--red"}};function Ht(e){if(!(a.lastSnapshot<Date.now()-Vt))return!1;for(const t of ut)if(t in e)return!0;return!1}function Mt(e){return a={...a,...e,snapshots:[Object.fromEntries(ut.map(t=>[t,a[t]])),...a.snapshots],lastSnapshot:Date.now()},a}function Bt(e){return a={...a,...e},a}function Ut(e){return Ht(e)?Mt(e):Bt(e)}function Wt(){if(a.snapshots.length<1)return;const e=Object.keys(a.snapshots[0]);a={...a,...a.snapshots[0],lastSnapshot:0,snapshots:a.snapshots.slice(1)},T.notify(e)}async function h(e){const t=Object.keys(e);return new Promise(n=>{Ut(e),T.notify(t),n(t)})}const T=(()=>{const e=Object.fromEntries(Object.keys(a).map(o=>[o,new Set]));function t(o){o.forEach(s=>e[s].forEach(r=>r()))}function n(o,...s){s.forEach(r=>e[o].add(r))}function i(o,...s){s.forEach(r=>e[o].delete(r))}return{subscribe:n,notify:t,unsubscribe:i}})();function g(e){return{x:e.clientX,y:e.clientY}}function qt(e,t){return`${e.toolID}_${e.portID}_${t.toolID}_${t.portID}`}function P({x:e,y:t}){const n=document.getElementById("workspace").getBoundingClientRect();return{x:(e-a.pan.x)/a.scale,y:(t-a.pan.y)/a.scale-n.top/a.scale}}function V(e){const t=e.getBoundingClientRect();return P({x:t.left+t.width/2,y:t.top+t.height/2})}function zt(e,t,n){return n==="in"?a.toolchain.tools[e].inputConfig[t]:a.toolchain.tools[e].outputConfig[t]}function pt(e,t,n){const i=zt(e,t,n).type;return a.colors[i]??"--purple"}function ot(e){return{toolID:e.closest(".tool").dataset.toolid,portID:e.dataset.portid}}function M(e){return e.split("/").at(-1).split(".")[0]}function q({toolID:e,portID:t},n){return document.querySelector(`[data-toolid="${e}"] [data-portside=${n}][data-portid="${t}"]`)}function ft(e){e.code==="Enter"&&(e.preventDefault(),e.target.blur())}function Ft(e){let t=document.createRange();t.selectNodeContents(e);let n=window.getSelection();n.removeAllRanges(),n.addRange(t)}function Jt(e,t,n){e.textContent.length>t&&n.preventDefault()}function Yt(e,t){let n={...a.layout[t]},i=g(e);const o=e.target;o.setPointerCapture(e.pointerId),o.classList.remove("grab"),o.classList.add("grabbing"),h({transforming:!0});function s(l){h({transforming:!1}),o.classList.add("grab"),o.classList.remove("grabbing"),o.removeEventListener("pointermove",r),o.removeEventListener("pointerup",s),o.removeEventListener("pointercancel",s)}function r(l){l.preventDefault();let c=n.x-Math.floor((i.x-g(l).x)/a.scale),d=n.y-Math.floor((i.y-g(l).y)/a.scale);h({layout:{...a.layout,[t]:{x:c,y:d}}})}o.addEventListener("pointermove",r),o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s)}function Xt(e,t,n,i){let o=g(e),s=g(e);const r=e.target;r.setPointerCapture(e.pointerId),h({transforming:!0});function l(d){let u=document.elementFromPoint(d.clientX,d.clientY);u.classList.contains("port")&&(i=="in"?z(ot(u),{toolID:t,portID:n}):z({toolID:t,portID:n},ot(u))),h({danglingPipe:null,transforming:!1}),r.removeEventListener("pointermove",c),r.removeEventListener("pointerup",l),r.removeEventListener("pointercancel",l)}function c(d){d.preventDefault();const u=g(d);let f=o.x-Math.floor(s.x-u.x),m=o.y-Math.floor(s.y-u.y);h({danglingPipe:{toolID:t,portID:n,originPort:r,side:i,endCoords:P({x:f,y:m})}})}r.addEventListener("pointermove",c),r.addEventListener("pointerup",l),r.addEventListener("pointercancel",l)}function Zt(e){return _`<div class="menu-item edit-toolname">
      <i class="edit-toolname fa-solid fa-pen-to-square fa-fw"></i>
      <span class="edit-toolname">Edit Display Name</span>
    </div>
    <div class="menu-item" @click=${t=>re(e)}>
      <i class="fa-solid fa-trash fa-fw"></i>
      <span class="remove">Delete</span>
    </div>`}function it(e,t,n){return _`<div class="field ${n}">
    <div
      class="port"
      data-portside=${n}
      data-portid=${t}
      @pointerdown=${i=>Xt(i,e,t,n)}></div>
    <span>${t}</span>
  </div>`}function Kt(e,t){return _`<div
      class="toolbar grab"
      @pointerdown=${n=>Yt(n,e)}>
      ${t.displayName??M(t.path)}
      <div class="menu-icon">
        <a class="menu" href="#">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </a>
        <div class="tool-menu">${Zt(e)}</div>
      </div>
    </div>
    <div class="tool-content"></div>
    <div class="tooldata">
      ${Object.keys(t.inputs).map(n=>it(e,n,"in"))}
      ${Object.keys(t.outputs).map(n=>it(e,n,"out"))}
    </div>`}function Qt(e){return{get(t,n,i){const o=a.toolchain.connectedOutput(e,n);if(o){const s=o.pipeData.start;return a.toolchain.tools[s.toolID].outputs[s.portID]}},set(t,n,i){console.log("Can't set an input")}}}function Gt(e,t){return{get(n,i,o){return i in e.stateConfig?Reflect.get(...arguments).value:(console.error(`Error!  property "${i}" not in ${e.displayName}'s state`),!0)},set(n,i,o){if(!(i in e.stateConfig))return console.error(`Error!  property "${i}" not in ${e.displayName}'s state`),!0;const s=Reflect.get(...arguments).value;return Reflect.get(...arguments).value=o,e.stateConfig[i].change&&e.stateConfig[i].change(e,o,s),!0}}}function te(e,t){return{get(n,i,o){return Reflect.get(...arguments).value},set(n,i,o){const s=Reflect.get(...arguments).value;return Reflect.get(...arguments).value=o,a.toolchain.connectedInputs(t,i).forEach(([l,{start:c,end:d}])=>{const u=a.toolchain.tools[d.toolID],f=u.inputConfig[d.portID];f.change&&f.change(u,o,s)}),!0}}}function ee(e,t){t.inputs=new Proxy(t.inputConfig,Qt(e)),t.state=new Proxy(t.stateConfig,Gt(t)),t.outputs=new Proxy(t.outputConfig,te(t,e))}const ne={displayName:"Tool",inputConfig:{},stateConfig:{},outputConfig:{},saveState:e=>Object.fromEntries(Object.entries(e).map(([t,n])=>[t,n]))};function oe(e,t){t.setup&&t.setup(t),t.root=document.createElement("div"),t.root.dataset.toolid=e,t.root.classList.add("tool"),k(Kt(e,t),t.root),t.dom=t.root.querySelector(".tool-content").attachShadow({mode:"open"}),ht(e,t),document.getElementById("tool-ui").appendChild(t.root),t.connected&&t.connected(t)}function ht(e,t){t.render&&t.render(t)}function vt(e,t){e.root.style.cssText=`transform: translate(${t.x}px, ${t.y}px)`}function mt(e,t,n,i){const o={...ne,...t,path:e,global:a.global};n&&Object.entries(n).forEach(([r,l])=>{o.stateConfig[r].value=l});const s=i??crypto.randomUUID();return ee(s,o),oe(s,o),{toolID:s,tool:o}}function ie(e,t){gt(e).then(n=>{const{toolID:i,tool:o}=mt(e,n());h({toolchain:a.toolchain.addTool(i,o),layout:{...a.layout,[i]:t}})})}function gt(e){return e in a.toolbox||console.error(`Error: module at path ${e} not found`),a.toolbox[e]()}function z(e,t){if(e.toolID==t.toolID){console.log("Can't connect a tool to itself!");return}const n=a.toolchain.tools[t.toolID],i=n.inputConfig[t.portID],o=n.inputs[t.portID];h({toolchain:a.toolchain.addPipe(qt(e,t),e,t)}).then(()=>{i.change&&i.change(n,n.inputs[t.portID],o)})}function se(e){const{start:t,end:n}=a.toolchain.pipes[e],i=a.toolchain.tools[n.toolID],o=i.inputConfig[n.portID],s=i.inputs[n.portID];h({toolchain:a.toolchain.deletePipe(e)}).then(()=>{o.change&&o.change(i,i.inputs[n.portID],s)})}function _t(e){e.disconnected&&e.disconnected(),e.root.remove()}function re(e){const t=a.toolchain.tools[e];_t(t),t.teardown&&t.teardown(t),h({toolchain:a.toolchain.deleteTool(e)})}function ae(e){a.examples[e]().then(t=>$t(t))}async function $t(e){await yt();const{pan:t,layout:n,scale:i,toolchain:o}=e,s=await Promise.all(Object.entries(o.tools).map(async([r,{path:l,state:c}])=>{const d=await gt(l),{tool:u}=mt(l,d(),c,r);return vt(u,n[r]),[r,u]}));h({toolchain:new y(Object.fromEntries(s),{},o.title),pan:t,layout:n,scale:i}).then(()=>{Object.entries(o.pipes).forEach(([r,{start:l,end:c}])=>{z(l,c)})})}function yt(){return Object.values(a.toolchain.tools).forEach(e=>{_t(e),e.teardown&&e.teardown(e)}),h({layout:{},portInspection:{},toolchain:new y,pan:{x:0,y:0},scale:1})}function le(){yt()}function ce(){let e=document.createElement("input");e.setAttribute("type","file"),e.style.display="none",document.body.appendChild(e),e.click(),e.onchange=t=>{const n=t.target.files[0],i=new FileReader;i.readAsText(n),i.onload=()=>{$t(JSON.parse(i.result))}},document.body.removeChild(e)}function de(){const e={pan:a.pan,scale:a.scale,layout:a.layout,toolchain:a.toolchain.toJSON()},t=document.createElement("a");t.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),t.download=`${a.title}.json`,document.body.appendChild(t),t.click(),document.body.removeChild(t)}function Et(e){const t=document.getElementById("title-field");h({toolchain:a.toolchain.setTitle(t.textContent)}),t.contentEditable=!1,t.removeEventListener("focusout",Et),t.removeEventListener("keypress",ft),t.removeEventListener("keypress",bt)}function bt(e){const t=document.getElementById("title-field");Jt(t,50,e)}function ue(e){const t=document.getElementById("title-field");t.contentEditable=!0,t.addEventListener("focusout",Et),t.addEventListener("keypress",ft),t.addEventListener("keypress",bt),setTimeout(function(){Ft(t),t.focus()},0)}function pe(){return _` <div id="taskbar">
    <span class="site-title">toolchains</span>

    <span id="toolchain-title" @pointerdown=${e=>ue()}>
      <span id="title-field">${a.toolchain.title}</span>
      <i class="edit-name fa-solid fa-pen-to-square"></i>
    </span>

    <div class="taskbar-buttons">
      <button class="taskbar-btn" @click=${()=>Wt()}>
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button class="taskbar-btn" @click=${()=>le()}>
        <i class="fa-solid fa-file"></i>
      </button>

      <button class="taskbar-btn" @click=${()=>ce()}>
        <i class="fa-solid fa-upload"></i>
      </button>
      <button class="taskbar-btn" @click=${()=>de()}>
        <i class="fa-solid fa-download"></i>
      </button>
      <button
        class="taskbar-btn"
        @click=${()=>h({showExamples:!a.showExamples})}>
        <i class="fa-solid fa-book"></i>
      </button>
    </div>
  </div>`}function fe(e,t){g(e),h({transforming:!0});const n=e.target;n.setPointerCapture(e.pointerId),n.classList.remove("grab"),n.classList.add("grabbing");const i=document.createElement("div");i.classList.add("drag-image"),document.body.appendChild(i),k(_`<span>${M(t)}</span>`,i);function o(l){const c=g(l);i.style.cssText=`transform: translate(${c.x}px, ${c.y}px);`}o(e);function s(l){h({transforming:!1}),n.classList.add("grab"),n.classList.remove("grabbing"),i.remove(),ie(t,P(g(l))),n.removeEventListener("pointermove",r),n.removeEventListener("pointerup",s),n.removeEventListener("pointercancel",s)}function r(l){l.preventDefault(),o(l)}n.addEventListener("pointermove",r),n.addEventListener("pointerup",s),n.addEventListener("pointercancel",s)}function he(){return _`<div class="modal toolbox">
    <div class="modal-title">
      <i class="fa-solid fa-toolbox"></i>
      <span>toolbox</span>
    </div>
    <div class="modal-content">
      ${Object.keys(a.toolbox).map(e=>_`<div
            class="modal-entry grab"
            @pointerdown=${t=>fe(t,e)}>
            ${M(e)}
          </div>`)}
    </div>
  </div>`}function ve(e){let t=a.pan,n=g(e);const i=e.target;i.setPointerCapture(e.pointerId),h({transforming:!0});function o(r){h({transforming:!1}),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",o),i.removeEventListener("pointercancel",o)}function s(r){r.preventDefault(),h({pan:{x:t.x-Math.floor(n.x-g(r).x),y:t.y-Math.floor(n.y-g(r).y)}})}i.addEventListener("pointermove",s),i.addEventListener("pointerup",o),i.addEventListener("pointercancel",o)}function me(e,t){const n={x:(e.x-a.pan.x)/a.scale,y:(e.y-a.pan.y)/a.scale};h({scale:t,pan:{x:e.x-n.x*t,y:e.y-n.y*t}})}function ge(e){const t=e.target.getBoundingClientRect(),n=Math.sign(e.deltaY)>0?a.scale*.9:a.scale*1.1;me({x:e.clientX-t.left,y:e.clientY-t.top},n)}function _e(e,t){let n=a.portInspection[t],i=P(g(e));const o=e.target;o.setPointerCapture(e.pointerId),h({transforming:!0}),o.classList.remove("grab"),o.classList.add("grabbing");function s(l){h({transforming:!1}),o.classList.add("grab"),o.classList.remove("grabbing"),o.removeEventListener("pointermove",r),o.removeEventListener("pointerup",s),o.removeEventListener("pointercancel",s)}function r(l){l.preventDefault();const c=P(g(l));let d=n.x-Math.floor(i.x-c.x),u=n.y-Math.floor(i.y-c.y);h({portInspection:{...a.portInspection,[t]:{x:d,y:u}}})}o.addEventListener("pointermove",r),o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s)}function $e(){return Object.entries(a.portInspection).map(([e,t])=>{const[n,i]=e.split(":"),o=a.toolchain.tools[n].outputConfig[i],s=pt(n,i,"out");return _`<div
      class="port-window grab"
      data-portwindowid=${e}
      @pointerdown=${r=>_e(r,e)}
      style="transform: translate(${t.x}px, ${t.y}px); --color: var(${s});">
      <div class="port-window-title">
        ${i}
        <i
          @click=${()=>{const{[e]:r,...l}=a.portInspection;h({portInspection:l})}}
          class="fa-solid fa-rectangle-xmark"></i>
      </div>
      <div class="port-window-content">
        <div>type</div>
        <div class="port-type">${o.type}</div>
        <div>value</div>
        <div class="port-value">
          ${o.value===void 0?"undefined":o.value.toString()}
        </div>
      </div>
    </div>`})}function ye(e){const t=document.querySelector(`[data-portwindowid="${e}"]`);if(!t)return!1;const n=t.getBoundingClientRect();return P({x:n.left,y:n.top+n.height/2})}function Ee(){return Object.entries(a.portInspection).map(([e,t])=>{const[n,i]=e.split(":"),o=pt(n,i,"out"),s=V(q({toolID:n,portID:i},"out")),r=ye(e);return r?J`<line  x1=${s.x} y1=${s.y} x2=${r.x-2} y2=${r.y} stroke="var(--base0)" stroke-width="3px" />
        <circle fill="var(--base0)" cx="${r.x}" cy="${r.y}" r="6.5px" />
    <line x1=${s.x} y1=${s.y} x2=${r.x-2} y2=${r.y} stroke="var(${o})" stroke-width="2px" />
    <circle fill="var(${o})" cx="${r.x}" cy="${r.y}" r="6px" />`:v})}function be(){return _`
    ${pe()} ${kt(a.showExamples,Ae)}
    <div id="workspace">
      ${he()}
      <canvas
        draggable="false"
        id="background"
        @pointerdown=${e=>ve(e)}
        @wheel=${e=>ge(e)}></canvas>
      <svg
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="select-box-container" class="transform-group">
          ${a.selectBox.start&&a.selectBox.end?drawSelectBox(a):v}
        </g>
        <g id="pipes-container" class="transform-group"></g>
        <g id="port-inspection-lines" class="transform-group">
          ${Ee()}
        </g>
      </svg>
      <div id="tool-ui" class="workspace-layer transform-group"></div>
      <svg
        id="dangling-pipe"
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="dangling-pipe-container" class="transform-group"></g>
      </svg>
      <div class="port-inspection workspace-layer transform-group">
        ${$e()}
      </div>
    </div>
  `}function Ae(){return _`<div class="modal examples">
    <div class="modal-title">
      <span>Examples</span>
      <i
        @click=${()=>h({showExamples:!1})}
        class="fa-solid fa-rectangle-xmark">
      </i>
    </div>
    <div class="modal-content">
      ${Object.keys(a.examples).map(e=>_`<div
            @click=${()=>{h({showExamples:!1}),ae(e)}}
            class="modal-entry">
            ${M(e)}
          </div>`)}
    </div>
  </div>`}function F(e,t){return`M${e.x},${e.y}
    C${e.x+100},${e.y}
    ${t.x-100},${t.y}
    ${t.x},${t.y}`}function xe(e,t,n){return e=="in"?F(n,t):F(t,n)}function Pe(){if(a.danglingPipe){const{side:e,originPort:t,endCoords:n}=a.danglingPipe,i=V(t);return J`<path class="pipe-progress" d=${xe(e,i,n)} /><circle class="pipe-start" cx="${n.x}" cy="${n.y}" r="5" />`}return v}function we({start:e,end:t}){let n=q(e,"out"),i=q(t,"in");if(!(!n||!i))return{start:V(n),end:V(i)}}function Le({toolID:e,portID:t},n){h({portInspection:{...a.portInspection,[`${e}:${t}`]:n}})}function Ie(){return Object.entries(a.toolchain.pipes).map(([e,t])=>{const{start:n,end:i}=we(t),o=F(n,i);return J`<path class="pipe-background"  data-pipeid=${e} d="${o}" />
    <path class="pipe" data-pipeid=${e} @click=${s=>Le(t.start,P(g(s)))} @contextmenu=${s=>{s.preventDefault(),se(e)}} d="${o}" />`})}function Te(){Object.entries(a.toolchain.tools).forEach(([e,t])=>{vt(t,a.layout[e])}),Y()}function st(){document.querySelectorAll(".transform-group").forEach(t=>{t.style.cssText=`transform: translate(${a.pan.x}px, ${a.pan.y}px) scale(${a.scale})`}),document.getElementById("background").style.cssText=`--offset-x: ${a.pan.x}px;--offset-y: ${a.pan.y}px;--scale: ${a.scale};`,Y()}function Y(){k(Ie(),document.getElementById("pipes-container")),k(Pe(),document.getElementById("dangling-pipe-container"))}function Oe(){Object.entries(a.toolchain.tools).forEach(([e,t])=>{ht(e,t)})}function At(){k(be(),document.body),Oe(),Y(),window.requestAnimationFrame(At)}function De(){Object.entries(a.theme).map(([e,t])=>{document.documentElement.style.setProperty(e,t)})}function Ce(){At(),De(),T.subscribe("layout",Te),T.subscribe("pan",st),T.subscribe("scale",st)}window.onload=Ce;export{k as D,_ as x};