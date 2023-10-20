(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var M;const k=window,P=k.trustedTypes,J=P?P.createPolicy("lit-html",{createHTML:e=>e}):void 0,V="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,it="?"+A,At=`<${it}>`,E=document,T=()=>E.createComment(""),C=e=>e===null||typeof e!="object"&&typeof e!="function",rt=Array.isArray,bt=e=>rt(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",B=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,X=/>/g,b=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Z=/'/g,K=/"/g,at=/^(?:script|style|textarea|title)$/i,lt=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),_=lt(1),ct=lt(2),I=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Q=new WeakMap,x=E.createTreeWalker(E,129,null,!1);function dt(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return J!==void 0?J.createHTML(t):t}const xt=(e,t)=>{const n=e.length-1,o=[];let s,i=t===2?"<svg>":"",r=L;for(let d=0;d<n;d++){const l=e[d];let c,u,p=-1,m=0;for(;m<l.length&&(r.lastIndex=m,u=r.exec(l),u!==null);)m=r.lastIndex,r===L?u[1]==="!--"?r=Y:u[1]!==void 0?r=X:u[2]!==void 0?(at.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=b):u[3]!==void 0&&(r=b):r===b?u[0]===">"?(r=s??L,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?b:u[3]==='"'?K:Z):r===K||r===Z?r=b:r===Y||r===X?r=L:(r=b,s=void 0);const $=r===b&&e[d+1].startsWith("/>")?" ":"";i+=r===L?l+At:p>=0?(o.push(c),l.slice(0,p)+V+l.slice(p)+A+$):l+A+(p===-2?(o.push(void 0),d):$)}return[dt(e,i+(e[n]||"<?>")+(t===2?"</svg>":"")),o]};class D{constructor({strings:t,_$litType$:n},o){let s;this.parts=[];let i=0,r=0;const d=t.length-1,l=this.parts,[c,u]=xt(t,n);if(this.el=D.createElement(c,o),x.currentNode=this.el.content,n===2){const p=this.el.content,m=p.firstChild;m.remove(),p.append(...m.childNodes)}for(;(s=x.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const p=[];for(const m of s.getAttributeNames())if(m.endsWith(V)||m.startsWith(A)){const $=u[r++];if(p.push(m),$!==void 0){const yt=s.getAttribute($.toLowerCase()+V).split(A),N=/([.?@])?(.*)/.exec($);l.push({type:1,index:i,name:N[2],strings:yt,ctor:N[1]==="."?Pt:N[1]==="?"?Lt:N[1]==="@"?Ot:R})}else l.push({type:6,index:i})}for(const m of p)s.removeAttribute(m)}if(at.test(s.tagName)){const p=s.textContent.split(A),m=p.length-1;if(m>0){s.textContent=P?P.emptyScript:"";for(let $=0;$<m;$++)s.append(p[$],T()),x.nextNode(),l.push({type:2,index:++i});s.append(p[m],T())}}}else if(s.nodeType===8)if(s.data===it)l.push({type:2,index:i});else{let p=-1;for(;(p=s.data.indexOf(A,p+1))!==-1;)l.push({type:7,index:i}),p+=A.length-1}i++}}static createElement(t,n){const o=E.createElement("template");return o.innerHTML=t,o}}function w(e,t,n=e,o){var s,i,r,d;if(t===I)return t;let l=o!==void 0?(s=n._$Co)===null||s===void 0?void 0:s[o]:n._$Cl;const c=C(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((i=l==null?void 0:l._$AO)===null||i===void 0||i.call(l,!1),c===void 0?l=void 0:(l=new c(e),l._$AT(e,n,o)),o!==void 0?((r=(d=n)._$Co)!==null&&r!==void 0?r:d._$Co=[])[o]=l:n._$Cl=l),l!==void 0&&(t=w(e,l._$AS(e,t.values),l,o)),t}class Et{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var n;const{el:{content:o},parts:s}=this._$AD,i=((n=t==null?void 0:t.creationScope)!==null&&n!==void 0?n:E).importNode(o,!0);x.currentNode=i;let r=x.nextNode(),d=0,l=0,c=s[0];for(;c!==void 0;){if(d===c.index){let u;c.type===2?u=new S(r,r.nextSibling,this,t):c.type===1?u=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(u=new Tt(r,this,t)),this._$AV.push(u),c=s[++l]}d!==(c==null?void 0:c.index)&&(r=x.nextNode(),d++)}return x.currentNode=E,i}v(t){let n=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,n),n+=o.strings.length-2):o._$AI(t[n])),n++}}class S{constructor(t,n,o,s){var i;this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=o,this.options=s,this._$Cp=(i=s==null?void 0:s.isConnected)===null||i===void 0||i}get _$AU(){var t,n;return(n=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&n!==void 0?n:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=w(this,t,n),C(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):bt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==f&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var n;const{values:o,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=D.createElement(dt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)===null||n===void 0?void 0:n._$AD)===i)this._$AH.v(o);else{const r=new Et(i,this),d=r.u(this.options);r.v(o),this.$(d),this._$AH=r}}_$AC(t){let n=Q.get(t.strings);return n===void 0&&Q.set(t.strings,n=new D(t)),n}T(t){rt(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let o,s=0;for(const i of t)s===n.length?n.push(o=new S(this.k(T()),this.k(T()),this,this.options)):o=n[s],o._$AI(i),s++;s<n.length&&(this._$AR(o&&o._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,n);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cp=t,(n=this._$AP)===null||n===void 0||n.call(this,t))}}class R{constructor(t,n,o,s,i){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=f}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,n=this,o,s){const i=this.strings;let r=!1;if(i===void 0)t=w(this,t,n,0),r=!C(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const d=t;let l,c;for(t=i[0],l=0;l<i.length-1;l++)c=w(this,d[o+l],n,l),c===I&&(c=this._$AH[l]),r||(r=!C(c)||c!==this._$AH[l]),c===f?t=f:t!==f&&(t+=(c??"")+i[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}const wt=P?P.emptyScript:"";class Lt extends R{constructor(){super(...arguments),this.type=4}j(t){t&&t!==f?this.element.setAttribute(this.name,wt):this.element.removeAttribute(this.name)}}class Ot extends R{constructor(t,n,o,s,i){super(t,n,o,s,i),this.type=5}_$AI(t,n=this){var o;if((t=(o=w(this,t,n,0))!==null&&o!==void 0?o:f)===I)return;const s=this._$AH,i=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==f&&(s===f||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n,o;typeof this._$AH=="function"?this._$AH.call((o=(n=this.options)===null||n===void 0?void 0:n.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,n,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const G=k.litHtmlPolyfillSupport;G==null||G(D,S),((M=k.litHtmlVersions)!==null&&M!==void 0?M:k.litHtmlVersions=[]).push("2.8.0");const j=(e,t,n)=>{var o,s;const i=(o=n==null?void 0:n.renderBefore)!==null&&o!==void 0?o:t;let r=i._$litPart$;if(r===void 0){const d=(s=n==null?void 0:n.renderBefore)!==null&&s!==void 0?s:null;i._$litPart$=r=new S(t.insertBefore(T(),d),d,void 0,n??{})}return r._$AI(e),r};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ct(e,t,n){return e?t():n==null?void 0:n()}const It="modulepreload",Dt=function(e){return"/miniflow/"+e},tt={},v=function(t,n,o){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=Dt(i),i in tt)return;tt[i]=!0;const r=i.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!o)for(let u=s.length-1;u>=0;u--){const p=s[u];if(p.href===i&&(!r||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${d}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":It,r||(c.as="script",c.crossOrigin=""),c.href=i,document.head.appendChild(c),r)return new Promise((u,p)=>{c.addEventListener("load",u),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t()).catch(i=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i})};class y{constructor(t={},n={}){this.tools=t,this.pipes=n}toJSON(){return{tools:Object.fromEntries(Object.entries(this.tools).map(([n,o])=>[n,{state:o.saveState(o.state),path:o.path}])),pipes:this.pipes}}rootTools(){return Object.fromEntries(Object.entries(this.tools).filter(([t,n])=>Object.keys(n.inputs).every(o=>!this.connectedOutput(t,o))))}getConnectedPipes(t){return Object.fromEntries(Object.entries(this.pipes).filter(([n,o])=>o.start.toolID==t||o.end.toolID==t))}addTool(t,n){return new y({...this.tools,[t]:n},this.pipes)}deleteTool(t){const n=this.getConnectedPipes(t),o={};Object.entries(this.pipes).forEach(([r,d])=>{r in n||(o[r]=d)});const{[t]:s,...i}=this.tools;return new y(i,o)}addPipe(t,n,o){if(n.toolID==o.toolID){console.log("Can't connect a tool to itself!");return}let s=this.connectedOutput(o.toolID,o.portID);if(s){const{[s.pipeID]:i,...r}=this.pipes;return new y({...this.tools},{...r,[t]:{start:n,end:o}})}return new y({...this.tools},{...this.pipes,[t]:{start:n,end:o}})}deletePipe(t){const{[t]:n,...o}=this.pipes;return new y({...this.tools},o)}connectedInputs(t,n){return Object.entries(this.pipes).filter(([o,s])=>s.start.toolID==t&&s.start.portID==n)}connectedOutput(t,n){for(const o of Object.entries(this.pipes)){let[s,i]=o;if(i.end.toolID==t&&i.end.portID==n)return{pipeID:s,pipeData:i}}return!1}}const ut=["toolchain","layout"],jt=1e3;let a={title:"toolchain",toolchain:new y,toolbox:Object.assign({"./tools/add.js":()=>v(()=>import("./add-e3b7699b.js"),[]).then(e=>e.default),"./tools/audio/audioAnalyser.js":()=>v(()=>import("./audioAnalyser-cdafbe3e.js"),[]).then(e=>e.default),"./tools/audio/audioDestination.js":()=>v(()=>import("./audioDestination-694c9e25.js"),[]).then(e=>e.default),"./tools/audio/convolver.js":()=>v(()=>import("./convolver-1b7fed85.js"),[]).then(e=>e.default),"./tools/audio/gain.js":()=>v(()=>import("./gain-785199de.js"),[]).then(e=>e.default),"./tools/audio/oscillator.js":()=>v(()=>import("./oscillator-5da23273.js"),[]).then(e=>e.default),"./tools/audio/playPause.js":()=>v(()=>import("./playPause-a306eaa4.js"),[]).then(e=>e.default),"./tools/audio/sweep.js":()=>v(()=>import("./sweep-88c4b134.js"),[]).then(e=>e.default),"./tools/commandSet.js":()=>v(()=>import("./commandSet-57620a3b.js"),[]).then(e=>e.default),"./tools/dataViewer.js":()=>v(()=>import("./dataViewer-53a3bbbb.js"),[]).then(e=>e.default),"./tools/inputs/inputNumber.js":()=>v(()=>import("./inputNumber-67c8efc2.js"),[]).then(e=>e.default),"./tools/serial/serialPort.js":()=>v(()=>import("./serialPort-ab2f2891.js"),[]).then(e=>e.default),"./tools/serial/serialReader.js":()=>v(()=>import("./serialReader-b76e4690.js"),[]).then(e=>e.default),"./tools/serial/serialWriter.js":()=>v(()=>import("./serialWriter-bf585b92.js"),[]).then(e=>e.default)}),examples:Object.assign({"./examples/audioAnalyser.json":()=>v(()=>import("./audioAnalyser-0a010b42.js"),[]).then(e=>e.default),"./examples/axidrawSerial.json":()=>v(()=>import("./axidrawSerial-2c980fe3.js"),[]).then(e=>e.default)}),danglingPipe:null,layout:{},pan:{x:0,y:0},scale:1,lastSnapshot:0,transforming:!1,snapshots:[],global:{audioContext:new AudioContext},selectBox:{start:null,end:null},heldKeys:new Set,showExamples:!1};function St(e){if(!(a.lastSnapshot<Date.now()-jt))return!1;for(const t of ut)if(t in e)return!0;return!1}function Nt(e){return a={...a,...e,snapshots:[Object.fromEntries(ut.map(t=>[t,a[t]])),...a.snapshots],lastSnapshot:Date.now()},a}function kt(e){return a={...a,...e},a}function Rt(e){return St(e)?Nt(e):kt(e)}function Ht(){if(a.snapshots.length<1)return;const e=Object.keys(a.snapshots[0]);a={...a,...a.snapshots[0],lastSnapshot:0,snapshots:a.snapshots.slice(1)},O.notify(e)}async function h(e){const t=Object.keys(e);return new Promise(n=>{Rt(e),O.notify(t),n(t)})}const O=(()=>{const e=Object.fromEntries(Object.keys(a).map(s=>[s,new Set]));function t(s){s.forEach(i=>e[i].forEach(r=>r()))}function n(s,...i){i.forEach(r=>e[s].add(r))}function o(s,...i){i.forEach(r=>e[s].delete(r))}return{subscribe:n,notify:t,unsubscribe:o}})();function g(e){return{x:e.clientX,y:e.clientY}}function Mt(e,t){return`${e.toolID}_${e.portID}_${t.toolID}_${t.portID}`}function W({x:e,y:t}){const n=document.getElementById("workspace").getBoundingClientRect();return{x:(e-a.pan.x)/a.scale,y:(t-a.pan.y)/a.scale-n.top/a.scale}}function et(e){return{toolID:e.closest(".tool").dataset.toolid,portID:e.dataset.portid}}function H(e){return e.split("/").at(-1).split(".")[0]}function Bt(e,t){let n={...a.layout[t]},o=g(e);const s=e.target;s.setPointerCapture(e.pointerId),s.classList.remove("grab"),s.classList.add("grabbing"),h({transforming:!0});function i(d){h({transforming:!1}),s.classList.add("grab"),s.classList.remove("grabbing"),s.removeEventListener("pointermove",r),s.removeEventListener("pointerup",i),s.removeEventListener("pointercancel",i)}function r(d){d.preventDefault();let l=n.x-Math.floor((o.x-g(d).x)/a.scale),c=n.y-Math.floor((o.y-g(d).y)/a.scale);h({layout:{...a.layout,[t]:{x:l,y:c}}})}s.addEventListener("pointermove",r),s.addEventListener("pointerup",i),s.addEventListener("pointercancel",i)}function Vt(e,t,n,o){let s=g(e),i=g(e);const r=e.target;r.setPointerCapture(e.pointerId),h({transforming:!0});function d(c){let u=document.elementFromPoint(c.clientX,c.clientY);u.classList.contains("port")&&(o=="in"?U(et(u),{toolID:t,portID:n}):U({toolID:t,portID:n},et(u))),h({danglingPipe:null,transforming:!1}),r.removeEventListener("pointermove",l),r.removeEventListener("pointerup",d),r.removeEventListener("pointercancel",d)}function l(c){c.preventDefault();const u=g(c);let p=s.x-Math.floor(i.x-u.x),m=s.y-Math.floor(i.y-u.y);h({danglingPipe:{toolID:t,portID:n,originPort:r,side:o,endCoords:W({x:p,y:m})}})}r.addEventListener("pointermove",l),r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d)}function Ut(e){return _`<div class="menu-item edit-toolname">
      <i class="edit-toolname fa-solid fa-pen-to-square fa-fw"></i>
      <span class="edit-toolname">Edit Display Name</span>
    </div>
    <div class="menu-item" @click=${t=>Qt(e)}>
      <i class="fa-solid fa-trash fa-fw"></i>
      <span class="remove">Delete</span>
    </div>`}function nt(e,t,n){return _`<div class="field ${n}">
    <div
      class="port"
      data-portside=${n}
      data-portid=${t}
      @pointerdown=${o=>Vt(o,e,t,n)}></div>
    <span>${t}</span>
  </div>`}function qt(e,t){return _`<div
      class="toolbar grab"
      @pointerdown=${n=>Bt(n,e)}>
      ${t.displayName??H(t.path)}
      <div class="menu-icon">
        <a class="menu" href="#">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </a>
        <div class="tool-menu">${Ut(e)}</div>
      </div>
    </div>
    <div class="tool-content"></div>
    <div class="tooldata">
      ${Object.keys(t.inputs).map(n=>nt(e,n,"in"))}
      ${Object.keys(t.outputs).map(n=>nt(e,n,"out"))}
    </div>`}function zt(e){return{get(t,n,o){const s=a.toolchain.connectedOutput(e,n);if(s){const i=s.pipeData.start;return a.toolchain.tools[i.toolID].outputs[i.portID]}},set(t,n,o){console.log("Can't set an input")}}}function Wt(e,t){return{get(n,o,s){return Reflect.get(...arguments).value},set(n,o,s){o in e.stateConfig||console.error(`Error!  property "${o}" not in ${e.displayName}'s state`);const i=Reflect.get(...arguments).value;return Reflect.get(...arguments).value=s,e.stateConfig[o].change&&e.stateConfig[o].change(e,s,i),!0}}}function Ft(e,t){return{get(n,o,s){return Reflect.get(...arguments).value},set(n,o,s){const i=Reflect.get(...arguments).value;return Reflect.get(...arguments).value=s,a.toolchain.connectedInputs(t,o).forEach(([d,{start:l,end:c}])=>{const u=a.toolchain.tools[c.toolID],p=u.inputConfig[c.portID];p.change&&p.change(u,s,i)}),!0}}}function Jt(e,t){t.inputs=new Proxy(t.inputConfig,zt(e)),t.state=new Proxy(t.stateConfig,Wt(t)),t.outputs=new Proxy(t.outputConfig,Ft(t,e))}const Yt={displayName:"Tool",inputConfig:{},stateConfig:{},outputConfig:{},saveState:e=>Object.fromEntries(Object.entries(e).map(([t,n])=>[t,n]))};function Xt(e,t){t.setup&&t.setup(t),t.root=document.createElement("div"),t.root.dataset.toolid=e,t.root.classList.add("tool"),j(qt(e,t),t.root),t.dom=t.root.querySelector(".tool-content").attachShadow({mode:"open"}),pt(e,t),document.getElementById("tool-ui").appendChild(t.root),t.connected&&t.connected(t)}function pt(e,t){t.render&&t.render(t)}function ft(e,t){e.root.style.cssText=`transform: translate(${t.x}px, ${t.y}px)`}function ht(e,t,n,o){const s={...Yt,...t,path:e,global:a.global};n&&Object.entries(n).forEach(([r,d])=>s.stateConfig[r].value=d);const i=o??crypto.randomUUID();return Jt(i,s),Xt(i,s),{toolID:i,tool:s}}function Zt(e,t){mt(e).then(n=>{const{toolID:o,tool:s}=ht(e,n());h({toolchain:a.toolchain.addTool(o,s),layout:{...a.layout,[o]:t}})})}function mt(e){return e in a.toolbox||console.error(`Error: module at path ${e} not found`),a.toolbox[e]()}function U(e,t){if(e.toolID==t.toolID){console.log("Can't connect a tool to itself!");return}const n=a.toolchain.tools[t.toolID],o=n.inputConfig[t.portID],s=n.inputs[t.portID];h({toolchain:a.toolchain.addPipe(Mt(e,t),e,t)}).then(()=>{o.change&&o.change(n,n.inputs[t.portID],s)})}function Kt(e){const{start:t,end:n}=a.toolchain.pipes[e],o=a.toolchain.tools[n.toolID],s=o.inputConfig[n.portID],i=o.inputs[n.portID];h({toolchain:a.toolchain.deletePipe(e)}).then(()=>{s.change&&s.change(o,o.inputs[n.portID],i)})}function vt(e){e.disconnected&&e.disconnected(),e.root.remove()}function Qt(e){const t=a.toolchain.tools[e];vt(t),t.teardown&&t.teardown(t),h({toolchain:a.toolchain.deleteTool(e)})}function Gt(e){a.examples[e]().then(t=>gt(t))}async function gt(e){await $t();const{pan:t,layout:n,scale:o,toolchain:s}=e,i=await Promise.all(Object.entries(s.tools).map(async([r,{path:d,state:l}])=>{const c=await mt(d),{tool:u}=ht(d,c(),l,r);return ft(u,n[r]),[r,u]}));h({toolchain:new y(Object.fromEntries(i),{}),pan:t,layout:n,scale:o}).then(()=>{Object.entries(s.pipes).forEach(([r,{start:d,end:l}])=>{U(d,l)})})}function $t(){return Object.values(a.toolchain.tools).forEach(e=>vt(e)),h({layout:{},toolchain:new y,pan:{x:0,y:0},scale:1})}function te(){$t()}function ee(){let e=document.createElement("input");e.setAttribute("type","file"),e.style.display="none",document.body.appendChild(e),e.click(),e.onchange=t=>{const n=t.target.files[0],o=new FileReader;o.readAsText(n),o.onload=()=>{gt(JSON.parse(o.result))}},document.body.removeChild(e)}function ne(){const e={pan:a.pan,scale:a.scale,layout:a.layout,toolchain:a.toolchain.toJSON()},t=document.createElement("a");t.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),t.download=`${a.title}.json`,document.body.appendChild(t),t.click(),document.body.removeChild(t)}function oe(){return _` <div id="taskbar">
    <span>toolchains</span>
    <div class="taskbar-buttons">
      <button class="taskbar-btn" @click=${()=>Ht()}>
        <i class="fa-solid fa-rotate-left"></i>
      </button>
      <button class="taskbar-btn" @click=${()=>te()}>
        <i class="fa-solid fa-file"></i>
      </button>

      <button class="taskbar-btn" @click=${()=>ee()}>
        <i class="fa-solid fa-upload"></i>
      </button>
      <button class="taskbar-btn" @click=${()=>ne()}>
        <i class="fa-solid fa-download"></i>
      </button>
      <button
        class="taskbar-btn"
        @click=${()=>h({showExamples:!a.showExamples})}>
        <i class="fa-solid fa-book"></i>
      </button>
    </div>
  </div>`}function se(e,t){g(e),h({transforming:!0});const n=e.target;n.setPointerCapture(e.pointerId),n.classList.remove("grab"),n.classList.add("grabbing");const o=document.createElement("div");o.classList.add("drag-image"),document.body.appendChild(o),j(_`<span>${H(t)}</span>`,o);function s(d){const l=g(d);o.style.cssText=`transform: translate(${l.x}px, ${l.y}px);`}s(e);function i(d){h({transforming:!1}),n.classList.add("grab"),n.classList.remove("grabbing"),o.remove(),Zt(t,W(g(d))),n.removeEventListener("pointermove",r),n.removeEventListener("pointerup",i),n.removeEventListener("pointercancel",i)}function r(d){d.preventDefault(),s(d)}n.addEventListener("pointermove",r),n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i)}function ie(){return _`<div class="modal toolbox">
    <div class="modal-title">
      <i class="fa-solid fa-toolbox"></i>
      <span>toolbox</span>
    </div>
    <div class="modal-content">
      ${Object.keys(a.toolbox).map(e=>_`<div
            class="modal-entry grab"
            @pointerdown=${t=>se(t,e)}>
            ${H(e)}
          </div>`)}
    </div>
  </div>`}function re(e){let t=a.pan,n=g(e);const o=e.target;o.setPointerCapture(e.pointerId),h({transforming:!0});function s(r){h({transforming:!1}),o.removeEventListener("pointermove",i),o.removeEventListener("pointerup",s),o.removeEventListener("pointercancel",s)}function i(r){r.preventDefault(),h({pan:{x:t.x-Math.floor(n.x-g(r).x),y:t.y-Math.floor(n.y-g(r).y)}})}o.addEventListener("pointermove",i),o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s)}function ae(e,t){const n={x:(e.x-a.pan.x)/a.scale,y:(e.y-a.pan.y)/a.scale};h({scale:t,pan:{x:e.x-n.x*t,y:e.y-n.y*t}})}function le(e){const t=e.target.getBoundingClientRect(),n=Math.sign(e.deltaY)>0?a.scale*.9:a.scale*1.1;ae({x:e.clientX-t.left,y:e.clientY-t.top},n)}function ce(){return _`
    ${oe()} ${Ct(a.showExamples,de)}
    <div id="workspace">
      ${ie()}
      <canvas
        draggable="false"
        id="background"
        @pointerdown=${e=>re(e)}
        @wheel=${e=>le(e)}></canvas>
      <svg
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="select-box-container" class="transform-group">
          ${a.selectBox.start&&a.selectBox.end?drawSelectBox(a):f}
        </g>
        <g id="pipes-container" class="transform-group"></g>
      </svg>
      <div id="tool-ui" class="transform-group"></div>
      <svg
        id="dangling-pipe"
        class="svg-layer"
        preserveAspectRatio="xMidYMid meet"
        draggable="false">
        <g id="dangling-pipe-container" class="transform-group"></g>
      </svg>
    </div>
  `}function de(){return _`<div class="modal examples">
    <div class="modal-title">Examples</div>
    <div class="modal-content">
      ${Object.keys(a.examples).map(e=>_`<div
            @click=${()=>{h({showExamples:!1}),Gt(e)}}
            class="modal-entry">
            ${H(e)}
          </div>`)}
    </div>
  </div>`}function q(e){const t=e.getBoundingClientRect();return W({x:t.left+t.width/2,y:t.top+t.height/2})}function z(e,t){return`M${e.x},${e.y}
    C${e.x+100},${e.y}
    ${t.x-100},${t.y}
    ${t.x},${t.y}`}function ue(e,t,n){return e=="in"?z(n,t):z(t,n)}function pe(){if(a.danglingPipe){const{side:e,originPort:t,endCoords:n}=a.danglingPipe,o=q(t);return ct`<path class="pipe-progress" d=${ue(e,o,n)} /><circle class="pipe-start" cx="${n.x}" cy="${n.y}" r="5" />`}return f}function ot({toolID:e,portID:t},n){return document.querySelector(`[data-toolid="${e}"] [data-portside=${n}][data-portid="${t}"]`)}function fe({start:e,end:t}){let n=ot(e,"out"),o=ot(t,"in");if(!(!n||!o))return{start:q(n),end:q(o)}}function he(){return Object.entries(a.toolchain.pipes).map(([e,t])=>{const{start:n,end:o}=fe(t),s=z(n,o);return ct`<path class="pipe-background " data-pipeid=${e} d="${s}" />
    <path class="pipe" data-pipeid=${e} @contextmenu=${i=>{i.preventDefault(),Kt(e)}} d="${s}" />`})}function me(){Object.entries(a.toolchain.tools).forEach(([e,t])=>{ft(t,a.layout[e])}),F()}function st(){document.querySelectorAll(".transform-group").forEach(t=>{t.style.cssText=`transform: translate(${a.pan.x}px, ${a.pan.y}px) scale(${a.scale})`}),document.getElementById("background").style.cssText=`--offset-x: ${a.pan.x}px;--offset-y: ${a.pan.y}px;--scale: ${a.scale};`,F()}function F(){j(he(),document.getElementById("pipes-container")),j(pe(),document.getElementById("dangling-pipe-container"))}function ve(){Object.entries(a.toolchain.tools).forEach(([e,t])=>{pt(e,t)})}function _t(){j(ce(),document.body),ve(),F(),window.requestAnimationFrame(_t)}function ge(){_t(),O.subscribe("layout",me),O.subscribe("pan",st),O.subscribe("scale",st)}window.onload=ge;export{j as D,_ as x};
