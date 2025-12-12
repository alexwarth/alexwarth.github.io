(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const J=""+new URL("msynth-worklet-BiA4EveP.js",import.meta.url).href;function V(t,e,n){return new Uint8Array([144|t&15,e&127,n&127])}function G(t,e,n){return new Uint8Array([128|t&15,e&127,n&127])}const K=48e3;function A(t,e,n){return Math.max(e,Math.min(t,n))}const Q=document.getElementById("ui"),b=document.createElement("canvas"),s=b.getContext("2d");Q.appendChild(b);const l=2;let r=0,c=0,F=0,O=0,Z="18px sans-serif";function M(){b.style.width=innerWidth+"px",b.style.height=innerHeight+"px",b.width=innerWidth*devicePixelRatio,b.height=innerHeight*devicePixelRatio,s.scale(devicePixelRatio,devicePixelRatio),r=(innerWidth-2*l)/13,c=(innerHeight-2*l)/8,F=r*1.5,O=c/1.5}window.addEventListener("resize",M),M();const _=16;let p="tap here";class X{constructor(){this.mode="mpe",this.patchName="pwm",this.worklet=null,this.voices=[],this.octave=0}init(){this.worklet=new AudioWorkletNode(v,"msynth"),this.sendToWorklet({command:"init",voiceParams:this.voices.map(e=>e.params.buffer)}),this.worklet.channelInterpretation="discrete",this.worklet.channelCount=2,this.worklet.channelCountMode="explicit",this.worklet.connect(v.destination),this.worklet.port.onmessage=e=>pe(e.data),this.loadPatch(this.patchName)}toggleMode(){this.mode=this.mode==="mpe"?"piano":"mpe"}sendToWorklet(e){var n;(n=this.worklet)==null||n.port.postMessage(e)}loadPatch(e){this.patchName=e,this.sendToWorklet({command:"load patch",code:U[this.patchName]})}grabVoice(){const e=[...y.values()],n=this.voices.findLast(i=>!e.some(o=>o.voice===i))??this.voices.at(-1);return this.voices.splice(this.voices.indexOf(n),1),this.voices.unshift(n),n}}const u=new X,a=new X;let m=u;const ee=47,te=5,k=4;class ne{constructor(e,n,i){this.col=e,this.row=n,this.noteName=i,this.isBeingPlayedBySequencer=!1}get note(){return ee+12*m.octave+te*(7-this.row)+this.col}get posX(){return l+this.col*r}get posY(){return l+this.row*c}contains(e,n){return this.posX<=e&&e<=this.posX+r&&this.posY<=n&&n<=this.posY+c}render(){s.beginPath(),s.lineWidth=3,s.strokeStyle="#eee",s.roundRect(this.posX,this.posY,r,c,k),s.stroke(),s.beginPath(),s.fillStyle=this.noteName===""?"#ccc":"#ddd",s.roundRect(this.posX,this.posY,r,c,k),s.fill(),m===a&&this.isBeingPlayedBySequencer&&(s.beginPath(),s.fillStyle=this.noteName===""?"#eee":"#bbb",s.roundRect(this.posX+20,this.posY+20,r-40,c-40,k),s.fill()),this.noteName!==""&&(s.beginPath(),s.font="14px sans-serif",s.fillStyle="#bbb",s.fillText(this.noteName,this.posX+4,this.posY+16),s.fill())}}const w=[],se=["C","","D","","E","F","","G","","A","","B"];let N=0;for(let t=2;t<=7;t++){for(let e=0;e<=12;e++)w.push(new ne(e,t,se[(N+e)%12]));N+=7}const y=new Map;class ie{constructor(e,n,i,o,d){this.id=e,this.voice=n,this.x=0,this.y=0,this.glide=0,this.slide=0,this.pressure=0,this.move(i,o,d)}move(e,n,i){const o=this.pad;this.pad=w.find(W=>{var S;return(m.mode==="piano"||W.row!==((S=this.pad)==null?void 0:S.row))&&W.contains(e,n)})??this.pad;const d=this.pad!==o;this.x=e,this.y=n,d&&(o&&this.voice.noteOff(o.note,127),this.quantizationOffset=m.mode==="piano"?0:(this.pad.posX+r/2-this.x)/r),this.pad&&this.updateParams(i),d&&this.pad&&this.voice.noteOn(this.pad.note,127)}updateParams(e){const n=this.pad.posX+r/2,i=this.pad.posY+c/2;this.glide=m.mode==="piano"?0:(this.x-n)/r,this.slide=A((i-this.y)/(c/2),-1,1),this.pressure=e,this.voice.params[0]=this.glide+this.quantizationOffset,this.voice.params[1]=this.slide,this.voice.params[2]=e}lift(){this.voice.noteOff(this.pad.note,127)}render(){if(this.pad)for(let e of w){if(e.col!==0)continue;const n=e.posX+r/2+(this.pad.note+this.quantizationOffset+this.glide-e.note)*r,i=e.posY+c/2-this.slide*(c/2),o=`rgba(100, 100, 100, ${this.pressure})`,d=e.row===this.pad.row;s.beginPath(),d?s.fillStyle=o:s.strokeStyle=o,s.arc(n,i,r/3,0,Math.PI*2),d?s.fill():s.stroke()}}}class g{constructor(e=null){this.thingAbove=e,this.pointer=null}get x(){if(this.thingAbove)return this.thingAbove.x;throw new Error("must override x if no thingAbove")}get y(){if(this.thingAbove)return this.thingAbove.y+this.thingAbove.h;throw new Error("must override y if no thingAbove")}get w(){var e;return((e=this.thingAbove)==null?void 0:e.w)??F}get h(){var e;return((e=this.thingAbove)==null?void 0:e.h)??O}contains(e,n){return this.x<=e&&e<=this.x+this.w&&this.y<=n&&n<=this.y+this.h}get backgroundColor(){return this.pointer?"#ccc":"#ddd"}get foregroundColor(){return this.pointer?"#fff":"#888"}render(e){s.beginPath(),s.lineWidth=3,s.strokeStyle="#eee",s.roundRect(this.x,this.y,this.w,this.h,k),s.stroke(),s.beginPath(),s.fillStyle=this.backgroundColor,s.roundRect(this.x,this.y,this.w,this.h,k),s.fill(),e&&(s.beginPath(),s.font=Z,s.fillStyle="#888",s.fillText(e,this.x+(this.w-s.measureText(e).width)/2,this.y+this.h/2),s.fill())}onPointerDown(e,n){}onPointerMove(e,n){}onPointerUp(e,n){}}class Y extends g{constructor(e){super(),this.synth=e}render(){super.render(this.synth.patchName)}onPointerDown(){const e=Object.keys(U),n=(e.indexOf(this.synth.patchName)+1)%e.length;this.synth.loadPatch(e[n])}}class B extends g{constructor(e,n){super(n),this.synth=e}render(){super.render(this.synth.mode)}onPointerDown(){this.synth.toggleMode()}}class L extends g{constructor(e,n){super(n),this.synth=e,this.octave0=null}render(){super.render(`octave ${this.synth.octave}`)}onPointerDown(e,n){this.octave0=this.synth.octave}onPointerMove(e,n){const i=n-this.pointer.y0;this.synth.octave=A(Math.round(this.octave0-i/25),-3,3)}}const R=new class extends Y{get x(){return l}get y(){return l}}(u),D=new B(u,R),oe=new L(u,D),re=new class extends g{get x(){return l+r*5}get y(){return l+O}get w(){return F*2}render(){super.render(m===u?"\u2190 controlling synth 1":"controlling synth 2 \u2192")}onPointerDown(){m=m===u?a:u}},I=new class extends Y{get x(){return T.x-this.w}get y(){return l}}(a),z=new B(a,I),ae=new L(a,z);let P=120;const T=new class extends g{constructor(){super(...arguments),this.tempo0=null}get x(){return innerWidth-l-this.w}get y(){return l}render(){super.render(`tempo ${P}`)}onPointerDown(t,e){this.tempo0=P}onPointerMove(t,e){const n=e-this.pointer.y0;P=A(Math.round(this.tempo0-n/10),10,200),a.sendToWorklet({command:"set tempo",value:P})}};let h=[[60],[62],[64],[65],[67],[69],[71],[72]],f,E=0;const C=new class extends g{render(){super.render(f==="playing"?`step ${E+1} / ${h.length}`:h.length===0?"record steps":`${h.length} steps`)}onPointerDown(){h=[],f="recording",a.sendToWorklet({command:"stop sequencer"})}onPointerUp(){if(a.sendToWorklet({command:"load steps",steps:h}),h.length>0)f="playing",E=0,a.sendToWorklet({command:"start sequencer"});else{f="stopped";for(const t of w)t.isBeingPlayedBySequencer=!1}}}(T),de=new class extends g{render(){super.render(f==="playing"?"stop":"play")}onPointerDown(){if(f==="playing"){a.sendToWorklet({command:"stop sequencer"}),f="stopped";for(const t of w)t.isBeingPlayedBySequencer=!1}else a.sendToWorklet({command:"start sequencer"}),f="playing"}}(C),q=[R,D,oe,re,I,z,ae,T,C,de];window.addEventListener("pointerdown",t=>{for(const e of q)e.contains(t.clientX,t.clientY)&&(e.onPointerDown(t.clientX,t.clientY),e.pointer={id:t.pointerId,x0:t.clientX,y0:t.clientY})}),window.addEventListener("pointermove",t=>{var e;for(const n of q)((e=n.pointer)==null?void 0:e.id)===t.pointerId&&n.onPointerMove(t.clientX,t.clientY)}),window.addEventListener("pointerup",t=>{var e;for(const n of q)((e=n.pointer)==null?void 0:e.id)===t.pointerId&&(n.onPointerUp(t.clientX,t.clientY),n.pointer=null)});function H(){s.clearRect(0,0,innerWidth,innerHeight);for(const e of q)e.render();for(const e of w)e.render();for(const e of y.values())e.render();s.font="16px sans-serif";const{width:t}=s.measureText(p);s.beginPath(),s.fillStyle="#00ff",s.fillText(p,innerWidth-t-20,innerHeight-20),s.fill(),requestAnimationFrame(H)}H();const U={pwm:`
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
  `},v=new AudioContext({latencyHint:"balanced",sampleRate:K});class le{constructor(e,n){this.synth=e,this.channel=n,this.params=new Float32Array(new SharedArrayBuffer(512))}noteOn(e,n){this.synth.sendToWorklet({command:"process midi message",data:V(this.channel,e,n)})}noteOff(e,n){this.synth.sendToWorklet({command:"process midi message",data:G(this.channel,e,n)})}}for(let t of[u,a])for(let e=0;e<_;e++)t.voices.push(new le(t,e));let x="need initialization";function ce(){return x==="ready"?!0:(x==="need initialization"&&he(),!1)}async function he(){x==="need initialization"&&(x="initializing",p="initializing audio...",v.resume(),p="loading worklet...",await v.audioWorklet.addModule(J),u.init(),a.init(),a.sendToWorklet({command:"load steps",steps:h}),x="ready",p="ready!",await ue(2),p="")}function pe(t){switch(p=JSON.stringify(t),t.event){case"seq step":{t.action==="noteOn"&&(E=t.index);for(const e of h[t.index]||[])for(const n of w)n.note===e&&(n.isBeingPlayedBySequencer=t.action==="noteOn");break}case"log":{p=t.message;break}default:p="??? "+JSON.stringify(t);break}}window.addEventListener("pointerdown",()=>{(v.state==="suspended"||v.state==="interrupted")&&v.resume()}),window.addEventListener("pointerdown",async t=>{if(!ce())return;const e=[...y.values()].some(n=>!!n.pad);for(const n of w)if(n.contains(t.clientX,t.clientY)){f==="recording"&&(e||h.push([]),h.at(-1).push(n.note)),y.set(t.pointerId,new ie(t.pointerId,m.grabVoice(),t.clientX,t.clientY,j(t)));break}}),window.addEventListener("pointermove",t=>{const e=y.get(t.pointerId);e&&e.move(t.clientX,t.clientY,j(t))}),window.addEventListener("pointerup",$),window.addEventListener("pointercancel",$);function $(t){const e=y.get(t.pointerId);e&&(e.lift(),y.delete(t.pointerId))}function j(t){return t.pointerType==="pen"?t.pressure:t.pointerType==="touch"?Math.abs(Math.max(t.width,t.height)-20)/130:1}function ue(t){return new Promise(e=>setTimeout(e,t*1e3))}
