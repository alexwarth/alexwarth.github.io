(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const B=""+new URL("msynth-worklet-BKiUKktq.js",import.meta.url).href;function H(e,t,n){return new Uint8Array([144|e&15,t&127,n&127])}function K(e,t,n){return new Uint8Array([128|e&15,t&127,n&127])}const j=48e3;function O(e,t,n){return Math.max(t,Math.min(e,n))}const J=document.getElementById("ui"),y=document.createElement("canvas"),i=y.getContext("2d");J.appendChild(y);const m=2;let r=0,l=0,L=0,R=0,G="18px sans-serif";function S(){y.style.width=innerWidth+"px",y.style.height=innerHeight+"px",y.width=innerWidth*devicePixelRatio,y.height=innerHeight*devicePixelRatio,i.scale(devicePixelRatio,devicePixelRatio),r=(innerWidth-2*m)/13,l=(innerHeight-2*m)/8,L=r*1.5,R=l/1.5}window.addEventListener("resize",S),S();const Q=16;let u="tap here",v="mpe",b="pwm",c=null;const f=[],V=47,Z=5;let q=0;class _{constructor(t,n,s){this.col=t,this.row=n,this.noteName=s}get note(){return V+12*q+Z*(7-this.row)+this.col}get posX(){return m+this.col*r}get posY(){return m+this.row*l}contains(t,n){return this.posX<=t&&t<=this.posX+r&&this.posY<=n&&n<=this.posY+l}render(){i.beginPath(),i.lineWidth=3,i.strokeStyle="#eee",i.strokeRect(this.posX,this.posY,r,l),i.stroke(),i.beginPath(),i.fillStyle=this.noteName===""?"#ccc":"#ddd",i.fillRect(this.posX,this.posY,r,l),this.noteName!==""&&(i.font="14px sans-serif",i.fillStyle="#bbb",i.fillText(this.noteName,this.posX+4,this.posY+16),i.fill())}}const P=[],ee=["C","","D","","E","F","","G","","A","","B"];let D=0;for(let e=2;e<=7;e++){for(let t=0;t<=12;t++)P.push(new _(t,e,ee[(D+t)%12]));D+=7}const w=new Map;class te{constructor(t,n,s,o,a){this.id=t,this.voice=n,this.x=0,this.y=0,this.glide=0,this.slide=0,this.pressure=0,this.move(s,o,a)}move(t,n,s){const o=this.pad;this.pad=P.find(M=>{var Y;return(v==="piano"||M.row!==((Y=this.pad)==null?void 0:Y.row))&&M.contains(t,n)})??this.pad;const a=this.pad!==o;this.x=t,this.y=n,a&&(o&&this.voice.noteOff(o.note,127),this.quantizationOffset=v==="piano"?0:(this.pad.posX+r/2-this.x)/r),this.pad&&this.updateParams(s),a&&this.pad&&this.voice.noteOn(this.pad.note,127)}updateParams(t){const n=this.pad.posX+r/2,s=this.pad.posY+l/2;this.glide=v==="piano"?0:(this.x-n)/r,this.slide=O((s-this.y)/(l/2),-1,1),this.pressure=t,this.voice.params[0]=this.glide+this.quantizationOffset,this.voice.params[1]=this.slide,this.voice.params[2]=t}lift(){this.voice.noteOff(this.pad.note,127)}render(){if(this.pad)for(let t of P){if(t.col!==0)continue;const n=t.posX+r/2+(this.pad.note+this.quantizationOffset+this.glide-t.note)*r,s=t.posY+l/2-this.slide*(l/2),o=`rgba(100, 100, 100, ${this.pressure})`,a=t.row===this.pad.row;i.beginPath(),a?i.fillStyle=o:i.strokeStyle=o,i.arc(n,s,r/3,0,Math.PI*2),a?i.fill():i.stroke()}}}class x{constructor(t=null){this.thingAbove=t,this.pointer=null}get x(){if(this.thingAbove)return this.thingAbove.x;throw new Error("must override x if no thingAbove")}get y(){if(this.thingAbove)return this.thingAbove.y+this.thingAbove.h;throw new Error("must override y if no thingAbove")}get w(){var t;return((t=this.thingAbove)==null?void 0:t.w)??L}get h(){var t;return((t=this.thingAbove)==null?void 0:t.h)??R}contains(t,n){return this.x<=t&&t<=this.x+this.w&&this.y<=n&&n<=this.y+this.h}get backgroundColor(){return this.pointer?"#ccc":"#ddd"}get foregroundColor(){return this.pointer?"#fff":"#888"}render(t){i.beginPath(),i.lineWidth=3,i.strokeStyle="#eee",i.strokeRect(this.x,this.y,this.w,this.h),i.stroke(),i.beginPath(),i.fillStyle=this.backgroundColor,i.fillRect(this.x,this.y,this.w,this.h),t&&(i.beginPath(),i.font=G,i.fillStyle="#888",i.fillText(t,this.x+(this.w-i.measureText(t).width)/2,this.y+this.h/2),i.fill())}onPointerDown(t,n){}onPointerMove(t,n){}onPointerUp(t,n){}}const E=new class extends x{get x(){return innerWidth-m-this.w}get y(){return m}render(){super.render(b)}onPointerDown(){const e=Object.keys(C),t=(e.indexOf(b)+1)%e.length;W(e[t])}},I=new class extends x{render(){super.render(v)}onPointerDown(){v=v==="mpe"?"piano":"mpe"}}(E),ne=new class extends x{constructor(){super(...arguments),this.octave0=null}render(){super.render(`octave ${q}`)}onPointerDown(e,t){this.octave0=q}onPointerMove(e,t){const n=t-this.pointer.y0;q=O(Math.round(this.octave0-n/25),-3,3)}}(I);let A=120;const N=new class extends x{constructor(){super(...arguments),this.tempo0=null}get x(){return E.x-this.w}get y(){return m}render(){super.render(`tempo ${A}`)}onPointerDown(e,t){this.tempo0=A}onPointerMove(e,t){const n=t-this.pointer.y0;A=O(Math.round(this.tempo0-n/10),10,200),d({command:"set tempo",value:A})}};let p=[[60],[62],[64],[65],[67],[69],[71],[72]],h,X=0;const T=new class extends x{render(){super.render(h==="playing"?`step ${X+1} / ${p.length}`:p.length===0?"record steps":`${p.length} steps`)}onPointerDown(){p=[],h="recording",d({command:"stop sequencer"})}onPointerUp(){d({command:"load steps",steps:p}),p.length>0?(h="playing",X=0,d({command:"start sequencer"})):h="stopped"}}(N),ie=new class extends x{render(){super.render(h==="playing"?"stop":"play")}onPointerDown(){h==="playing"?(d({command:"stop sequencer"}),h="stopped"):(d({command:"start sequencer"}),h="playing")}}(T),F=[N,T,ie,E,I,ne];window.addEventListener("pointerdown",e=>{for(const t of F)t.contains(e.clientX,e.clientY)&&(t.onPointerDown(e.clientX,e.clientY),t.pointer={id:e.pointerId,x0:e.clientX,y0:e.clientY})}),window.addEventListener("pointermove",e=>{var t;for(const n of F)((t=n.pointer)==null?void 0:t.id)===e.pointerId&&n.onPointerMove(e.clientX,e.clientY)}),window.addEventListener("pointerup",e=>{var t;for(const n of F)((t=n.pointer)==null?void 0:t.id)===e.pointerId&&(n.onPointerUp(e.clientX,e.clientY),n.pointer=null)});function z(){i.clearRect(0,0,innerWidth,innerHeight),i.font="16px sans-serif",i.fillStyle="#000",i.fillText(u,10,30),i.fill();for(const e of F)e.render();for(const e of P)e.render();for(const e of w.values())e.render();requestAnimationFrame(z)}z();const C={pwm:`
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
  `,"pwm pencil":`
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4) * pressure
  `,sine:`
    out = noteFreq sine * adsr(0.01, 0, 1, 0.3)
  `,square:`
    out = noteFreq pwm * adsr(0.01, 0, 1, 0.3)
  `,saw:`
    out = noteFreq saw * adsr(0.01, 0, 1, 0.3)
  `,"slow saw":`
    mod = (param1 lglide(0.1) norm * 10) sine * param2 lglide(0.1) norm lscale(0.01, 0.05)
    out = (noteFreq * (1 + mod)) saw * adsr(0.1, 0.2, 0.5, 1)
  `,"rebel yell":`
    ampEnv = adsr(0.03, 0, 1, 0.1)
    mod = param3 lglide(0.05) norm abs lscale(0.45, 0.55)
    dry = noteFreq pwm(mod) lpf(6000, 0.2) * ampEnv
    out = dry + 0.5 * dry delay(0.4)
  `,"hello again":`
    sync = 0.6
    osc1 = (noteFreq / 4) pwm
    osc2 = sync * 500 * ad(0.2, 0.5) >> pwm(0.5, osc1)
    out = osc2 * adsr(0.05, 0, 1, 0.2)
  `,"duran duran":`
    decay = 0.102
    delayAmt = 0.547
    detuneAmt = 0.252
    portamento = 0 // param1 abs --- TODO: use a fader or knob
    freq = (param2 abs - 0.5) ifPos(noteFreq * 2, noteFreq)
    f1 = freq eglide(portamento)
    f2 = f1 * detuneAmt escale(1.01, 1.05)
    oscs = (f1 pwm + f2 pwm) / 2
    dry = oscs * adsr(0, 0, 1, decay escale(0.1, 2))
    out = dry + delayAmt * dry delay(0.378)
  `,"stranger things":`
    release = param0 clamp(-0.5, 0.5) norm
    resonance = (param1 norm - 0.5) abs lscale(0.15, 1)
    pwmRate = 0.218
    osc1 = noteFreq pwm(pwmRate sine norm lscale(0.2, 0.8))
    osc2 = (2 * noteFreq * 1.005) pwm(pwmRate sine norm lscale(0.4, 0.6))
    out = ((osc1 + osc2) lpf(10000 * adsr(0.001, 0, 1, 0.5), resonance)) * adsr(0, 0, 1, release)
  `,"tom sawyer":`
    resonance = 0.655
    w = 0.5 + (1/5) sine declip(0, 0.4)
    detune1 = 0.091 * 0.01
    detune2 = 0.836 * 0.01
    delayAmt = 0.127
    oscs =
      (
        (noteFreq * (1 - detune1)) pwm(w) +
        (noteFreq * (1 + detune1)) pwm(w) +
        (noteFreq * (1 - 3 * detune2)) pwm(w) +
        (noteFreq * (1 + 3 * detune2)) pwm(w)
      ) / 4
    filterEnv = adsr(0.05, 0, 1, 6) escale(0, 1)
    ampEnv = adsr(0, 0, 1, 12)
    dry = oscs lpf12(10000 * filterEnv, resonance) * ampEnv
    out = dry + delayAmt * dry delay(0.15)
  `,guitar:`
    impulseAmt = 0.2 // TODO: use velocity?
    sustain = 1 // TODO: use a slider or knob
    l = 1 / noteFreq
    impulse  = noise * ad(0, impulseAmt lscale(0.001, 0.05))
    ks = (impulse + ksFilter) dcBlock delay(l)
    ksFilter = (ksFilter + ks) / 2
    out = (ksFilter * adsr(0, 0, 1, sustain * 5))
  `,"rick and morty":`
    sound1 = noise bpf(0.2 sine * 800 + 1200, 1)
    sound2 = noise bpf(-(0.25 sine) * 800 + 1200, 1)
    ring = (sound1 + sound1 delay(2) + sound2) * 5.5 pwm norm * 0.5
    out = ring * adsr(0.01, 0, 1, 2)
  `},g=new AudioContext({latencyHint:"balanced",sampleRate:j});class se{constructor(t){this.channel=t,this.params=new Float32Array(new SharedArrayBuffer(512))}noteOn(t,n){d({command:"process midi message",data:H(this.channel,t,n)})}noteOff(t,n){d({command:"process midi message",data:K(this.channel,t,n)})}}for(let e=0;e<Q;e++)f.push(new se(e));let k="need initialization";function oe(){return k==="ready"?!0:(k==="need initialization"&&re(),!1)}async function re(){k==="need initialization"&&(k="initializing",u="initializing audio...",g.resume(),u="loading worklet...",await g.audioWorklet.addModule(B),c=new AudioWorkletNode(g,"msynth"),d({command:"init",voiceParams:f.map(e=>e.params.buffer)}),c.channelInterpretation="discrete",c.channelCount=2,c.channelCountMode="explicit",c.connect(g.destination),c.port.onmessage=e=>ae(e.data),W(b),d({command:"load steps",steps:p}),k="ready",u="ready!",await le(2),u="")}function ae(e){switch(u=JSON.stringify(e),e.event){case"seq step":{e.action==="noteOn"&&(X=e.index);break}case"log":{u=e.message;break}default:u="??? "+JSON.stringify(e);break}}function d(e){c==null||c.port.postMessage(e)}function W(e){b=e,d({command:"load patch",code:C[b]})}window.addEventListener("pointerdown",()=>{(g.state==="suspended"||g.state==="interrupted")&&g.resume()}),window.addEventListener("pointerdown",async e=>{if(!oe())return;const t=[...w.values()].some(n=>!!n.pad);for(const n of P)if(n.contains(e.clientX,e.clientY)){h==="recording"&&(t||p.push([]),p.at(-1).push(n.note)),w.set(e.pointerId,new te(e.pointerId,de(),e.clientX,e.clientY,$(e)));break}}),window.addEventListener("pointermove",e=>{const t=w.get(e.pointerId);t&&t.move(e.clientX,e.clientY,$(e))}),window.addEventListener("pointerup",U),window.addEventListener("pointercancel",U);function U(e){const t=w.get(e.pointerId);t&&(t.lift(),w.delete(e.pointerId))}function $(e){return e.pointerType==="pen"?e.pressure:e.pointerType==="touch"?Math.abs(Math.max(e.width,e.height)-20)/130:1}function de(){const e=[...w.values()],t=f.findLast(n=>!e.some(s=>s.voice===n))??f.at(-1);return f.splice(f.indexOf(t),1),f.unshift(t),t}function le(e){return new Promise(t=>setTimeout(t,e*1e3))}
