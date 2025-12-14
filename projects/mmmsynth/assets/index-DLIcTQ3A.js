(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const _=""+new URL("msynth-worklet-DComo-gP.js",import.meta.url).href;function ee(t,e,n){return new Uint8Array([144|t&15,e&127,n&127])}function te(t,e,n){return new Uint8Array([128|t&15,e&127,n&127])}const ne=96e3;function q(t,e,n){return Math.max(e,Math.min(t,n))}const se=document.getElementById("ui"),b=document.createElement("canvas"),s=b.getContext("2d");se.appendChild(b);const c=2;let r=0,p=0,W=0,Y=0,ie="18px sans-serif";function B(){b.style.width=innerWidth+"px",b.style.height=innerHeight+"px",b.width=innerWidth*devicePixelRatio,b.height=innerHeight*devicePixelRatio,s.scale(devicePixelRatio,devicePixelRatio),r=(innerWidth-2*c)/13,p=(innerHeight-2*c)/8,W=r*1.5,Y=p/1.5}window.addEventListener("resize",B),B();const oe=16;let f="tap here";class d{constructor(e,n,i=!1){this.name=e,this.code=n,this.mono=i}}const A=[new d("pwm",`
      out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
    `),new d("pwm pencil",`
      out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4) * pressure
    `),new d("sine",`
      out = noteFreq sine * adsr(0.01, 0, 1, 0.3)
    `),new d("square",`
      out = noteFreq pwm * adsr(0.01, 0, 1, 0.3)
    `),new d("saw",`
      out = noteFreq saw * adsr(0.01, 0, 1, 0.3)
    `),new d("slow saw",`
      mod = (param1 lglide(0.1) norm * 10) sine * param2 lglide(0.1) norm lscale(0.01, 0.05)
      out = (noteFreq * (1 + mod)) saw * adsr(0.1, 0.2, 0.5, 1)
    `),new d("rebel yell",`
      ampEnv = adsr(0.03, 0, 1, 0.1)
      mod = param3 lglide(0.05) norm abs lscale(0.45, 0.55)
      dry = noteFreq pwm(mod) lpf(6000, 0.2) * ampEnv
      out = dry + 0.5 * dry delay(0.4)
    `),new d("hello again",`
      sync = 0.6
      osc1 = (noteFreq / 4) pwm
      osc2 = sync * 500 * ad(0.2, 0.5) >> pwm(0.5, osc1)
      out = osc2 * adsr(0.05, 0, 1, 0.2)
    `),new d("duran duran",`
      decay = 0.102
      delayAmt = 0.547
      detuneAmt = 0.252
      portamento = paramA
      freq = (paramB abs - 0.5) ifPos(noteFreq * 2, noteFreq)
      f1 = freq eglide(portamento)
      f2 = f1 * detuneAmt escale(1.01, 1.05)
      oscs = (f1 pwm + f2 pwm) / 2
      dry = oscs * adsr(0, 0, 1, decay escale(0.1, 2))
      out = dry + delayAmt * dry delay(0.378)
    `,!0),new d("stranger things",`
      release = paramA
      resonance = (paramB norm - 0.5) abs lscale(0.15, 1)
      pwmRate = 0.218
      osc1 = noteFreq pwm(pwmRate sine norm lscale(0.2, 0.8))
      osc2 = (2 * noteFreq * 1.005) pwm(pwmRate sine norm lscale(0.4, 0.6))
      out = ((osc1 + osc2) lpf(10000 * adsr(0.001, 0, 1, 0.5), resonance)) * adsr(0, 0, 1, release)
    `),new d("tom sawyer",`
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
    `),new d("guitar",`
      impulseAmt = paramA // default: 0.2
      sustain = paramB // default: 1
      l = 1 / noteFreq
      impulse  = noise * ad(0, impulseAmt lscale(0.001, 0.05))
      ks = (impulse + ksFilter) dcBlock delay(l)
      ksFilter = (ksFilter + ks) / 2
      out = (ksFilter * adsr(0, 0, 1, sustain * 5))
    `),new d("rick and morty",`
      sound1 = noise bpf(0.2 sine * 800 + 1200, 1)
      sound2 = noise bpf(-(0.25 sine) * 800 + 1200, 1)
      ring = (sound1 + sound1 delay(2) + sound2) * 5.5 pwm norm * 0.5
      out = ring * adsr(0.01, 0, 1, 2)
    `)];class O{constructor(){this.mode="mpe",this.patch=A.find(e=>e.name==="pwm"),this.worklet=null,this.voices=[],this.octave=0}init(){this.worklet=new AudioWorkletNode(x,"msynth"),this.sendToWorklet({command:"init",voiceParams:this.voices.map(e=>e.params.buffer)}),this.worklet.channelInterpretation="discrete",this.worklet.channelCount=2,this.worklet.channelCountMode="explicit",this.worklet.connect(x.destination),this.worklet.port.onmessage=e=>ye(e.data),this.loadPatch(this.patch)}toggleMode(){this.mode=this.mode==="mpe"?"piano":"mpe"}sendToWorklet(e){var n;(n=this.worklet)==null||n.port.postMessage(e)}loadPatch(e){this.patch=e,this.sendToWorklet({command:"load patch",...e})}grabVoice(){if(this.patch.mono)return this.voices[0];const e=[...y.values()],n=this.voices.findLast(i=>!e.some(o=>o.voice===i))??this.voices.at(-1);return this.voices.splice(this.voices.indexOf(n),1),this.voices.unshift(n),n}}const m=new O,a=new O;let l=m;const re=47,ae=5,P=4;class le{constructor(e,n,i){this.col=e,this.row=n,this.noteName=i,this.isBeingPlayedBySequencer=!1}get note(){return re+12*l.octave+ae*(7-this.row)+this.col}get posX(){return c+this.col*r}get posY(){return c+this.row*p}contains(e,n){return this.posX<=e&&e<=this.posX+r&&this.posY<=n&&n<=this.posY+p}render(){s.beginPath(),s.lineWidth=3,s.strokeStyle="#eee",s.roundRect(this.posX,this.posY,r,p,P),s.stroke(),s.beginPath(),s.fillStyle=this.noteName===""?"#ccc":"#ddd",s.roundRect(this.posX,this.posY,r,p,P),s.fill(),l===a&&this.isBeingPlayedBySequencer&&(s.beginPath(),s.fillStyle=this.noteName===""?"#eee":"#bbb",s.roundRect(this.posX+20,this.posY+20,r-40,p-40,P),s.fill()),this.noteName!==""&&(s.beginPath(),s.font="14px sans-serif",s.fillStyle="#bbb",s.fillText(this.noteName,this.posX+4,this.posY+16),s.fill())}}const g=[],de=["C","","D","","E","F","","G","","A","","B"];let R=0;for(let t=2;t<=7;t++){for(let e=0;e<=12;e++)g.push(new le(e,t,de[(R+e)%12]));R+=7}const y=new Map;class he{constructor(e,n,i,o,h){this.id=e,this.voice=n,this.x=0,this.y=0,this.glide=0,this.slide=0,this.pressure=0,this.move(i,o,h)}move(e,n,i){const o=this.pad;this.pad=g.find(T=>{var X;return(l.mode==="piano"||T.row!==((X=this.pad)==null?void 0:X.row))&&T.contains(e,n)})??this.pad;const h=this.pad!==o;this.x=e,this.y=n,h&&(o&&this.voice.noteOff(o.note,127),this.quantizationOffset=l.mode==="piano"?0:(this.pad.posX+r/2-this.x)/r),this.pad&&this.updateParams(i),h&&this.pad&&this.voice.noteOn(this.pad.note,127)}updateParams(e){const n=this.pad.posX+r/2,i=this.pad.posY+p/2;this.glide=l.mode==="piano"?0:(this.x-n)/r,this.slide=q((i-this.y)/(p/2),-1,1),this.pressure=e,this.voice.params[0]=this.glide+this.quantizationOffset,this.voice.params[1]=this.slide,this.voice.params[2]=e}lift(){this.voice.noteOff(this.pad.note,127)}render(){if(this.pad)for(let e of g){if(e.col!==0)continue;const n=e.posX+r/2+(this.pad.note+this.quantizationOffset+this.glide-e.note)*r,i=e.posY+p/2-this.slide*(p/2),o=`rgba(100, 100, 100, ${this.pressure})`,h=e.row===this.pad.row;s.beginPath(),h?s.fillStyle=o:s.strokeStyle=o,s.arc(n,i,r/3,0,Math.PI*2),h?s.fill():s.stroke()}}}class w{constructor(e=null){this.thingAbove=e,this.pointer=null}get x(){if(this.thingAbove)return this.thingAbove.x;throw new Error("must override x if no thingAbove")}get y(){if(this.thingAbove)return this.thingAbove.y+this.thingAbove.h;throw new Error("must override y if no thingAbove")}get w(){var e;return((e=this.thingAbove)==null?void 0:e.w)??W}get h(){var e;return((e=this.thingAbove)==null?void 0:e.h)??Y}contains(e,n){return this.x<=e&&e<=this.x+this.w&&this.y<=n&&n<=this.y+this.h}get backgroundColor(){return this.pointer?"#ccc":"#ddd"}get foregroundColor(){return this.pointer?"#fff":"#888"}render(e){s.beginPath(),s.lineWidth=3,s.strokeStyle="#eee",s.roundRect(this.x,this.y,this.w,this.h,P),s.stroke(),s.beginPath(),s.fillStyle=this.backgroundColor,s.roundRect(this.x,this.y,this.w,this.h,P),s.fill(),e&&this.renderLabel(e)}renderLabel(e){s.beginPath(),s.font=ie,s.fillStyle="#888",s.fillText(e,this.x+(this.w-s.measureText(e).width)/2,this.y+this.h/2),s.fill()}onPointerDown(e,n){}onPointerMove(e,n){}onPointerUp(e,n){}}class N extends w{constructor(e){super(),this.synth=e}render(){super.render(this.synth.patch.name)}onPointerDown(){const e=(A.indexOf(this.synth.patch)+1)%A.length;this.synth.loadPatch(A[e])}}class D extends w{constructor(e,n){super(n),this.synth=e}render(){super.render(this.synth.mode)}onPointerDown(){this.synth.toggleMode()}}class I extends w{constructor(e,n){super(n),this.synth=e,this.octave0=null}render(){super.render(`octave ${this.synth.octave}`)}onPointerDown(e,n){this.octave0=this.synth.octave}onPointerMove(e,n){const i=n-this.pointer.y0;this.synth.octave=q(Math.round(this.octave0-i/25),-3,3)}}const C=new class extends N{get x(){return c}get y(){return c}}(m),z=new D(m,C),ce=new I(m,z);class H extends w{constructor(e,n,i){super(i),this.paramNum=e,this.name=n,this.value0=null,this.x0=null}get backgroundColor(){return"#ddd"}render(){super.render(),s.beginPath(),s.fillStyle="#ccc",s.roundRect(this.x,this.y,this.w*this.value,this.h,P),s.fill(),this.renderLabel(this.name)}get value(){var e;return((e=l==null?void 0:l.voices[0])==null?void 0:e.params[this.paramNum])??0}set value(e){for(const n of l.voices)n.params[this.paramNum]=e}onPointerDown(e,n){this.value0=this.value,this.x0=e}onPointerMove(e,n){const i=e-this.pointer.x0;this.value=q(this.value0+i/this.w,0,1)}}const U=new class extends w{get x(){return c+r*5}get y(){return c}get w(){return W*2}render(){super.render(l===m?"\u2190 controlling synth 1":"controlling synth 2 \u2192")}onPointerDown(){l=l===m?a:m}},$=new H(3,"param A",U),pe=new H(4,"param B",$),V=new class extends N{get x(){return M.x-this.w}get y(){return c}}(a),j=new D(a,V),ue=new I(a,j);let F=120;const M=new class extends w{constructor(){super(...arguments),this.tempo0=null}get x(){return innerWidth-c-this.w}get y(){return c}render(){super.render(`tempo ${F}`)}onPointerDown(t,e){this.tempo0=F}onPointerMove(t,e){const n=e-this.pointer.y0;F=q(Math.round(this.tempo0-n/10),10,200),a.sendToWorklet({command:"set tempo",value:F})}};let u=[[60],[62],[64],[65],[67],[69],[71],[72]],v,L=0;const G=new class extends w{render(){super.render(v==="playing"?`step ${L+1} / ${u.length}`:u.length===0?"record steps":`${u.length} steps`)}onPointerDown(){S(),u=[],v="recording"}onPointerUp(){a.sendToWorklet({command:"load steps",steps:u}),u.length>0?J():S()}}(M),me=new class extends w{render(){super.render(v==="playing"?"stop":"play")}onPointerDown(){v==="playing"?S():J()}}(G);function J(){if(u.length!==0){for(const t of a.voices)t.params[0]=0;v="playing",L=0,a.sendToWorklet({command:"start sequencer"})}}function S(){v="stopped",a.sendToWorklet({command:"stop sequencer"});for(const t of g)t.isBeingPlayedBySequencer=!1}const E=[C,z,ce,U,$,pe,V,j,ue,M,G,me];window.addEventListener("pointerdown",t=>{for(const e of E)e.contains(t.clientX,t.clientY)&&(e.onPointerDown(t.clientX,t.clientY),e.pointer={id:t.pointerId,x0:t.clientX,y0:t.clientY})}),window.addEventListener("pointermove",t=>{var e;for(const n of E)((e=n.pointer)==null?void 0:e.id)===t.pointerId&&n.onPointerMove(t.clientX,t.clientY)}),window.addEventListener("pointerup",t=>{var e;for(const n of E)((e=n.pointer)==null?void 0:e.id)===t.pointerId&&(n.onPointerUp(t.clientX,t.clientY),n.pointer=null)});function K(){s.clearRect(0,0,innerWidth,innerHeight);for(const e of E)e.render();for(const e of g)e.render();for(const e of y.values())e.render();s.font="16px sans-serif";const{width:t}=s.measureText(f);s.beginPath(),s.fillStyle="#00ff",s.fillText(f,innerWidth-t-20,innerHeight-20),s.fill(),requestAnimationFrame(K)}K();const x=new AudioContext({latencyHint:"balanced",sampleRate:ne});class fe{constructor(e,n){this.synth=e,this.channel=n,this.params=new Float32Array(new SharedArrayBuffer(512))}noteOn(e,n){this.synth.sendToWorklet({command:"process midi message",data:ee(this.channel,e,n)})}noteOff(e,n){this.synth.sendToWorklet({command:"process midi message",data:te(this.channel,e,n)})}}for(let t of[m,a])for(let e=0;e<oe;e++)t.voices.push(new fe(t,e));let k="need initialization";function we(){return k==="ready"?!0:(k==="need initialization"&&ge(),!1)}async function ge(){k==="need initialization"&&(k="initializing",f="initializing audio...",x.resume(),f="loading worklet...",await x.audioWorklet.addModule(_),m.init(),a.init(),a.sendToWorklet({command:"load steps",steps:u}),k="ready",f="ready!",await ve(2),f="")}function ye(t){switch(t.event){case"seq step":{t.action==="noteOn"&&(L=t.index);for(const e of u[t.index]||[])for(const n of g)n.note===e&&(n.isBeingPlayedBySequencer=t.action==="noteOn");break}case"log":{f=t.message;break}default:f="??? "+JSON.stringify(t);break}}window.addEventListener("pointerdown",()=>{(x.state==="suspended"||x.state==="interrupted")&&x.resume()}),window.addEventListener("pointerdown",async t=>{if(!we())return;const e=[...y.values()].some(n=>!!n.pad);for(const n of g)if(n.contains(t.clientX,t.clientY)){v==="recording"&&l===a&&(e||u.push([]),u.at(-1).push(n.note)),y.set(t.pointerId,new he(t.pointerId,l.grabVoice(),t.clientX,t.clientY,Z(t)));break}}),window.addEventListener("pointermove",t=>{const e=y.get(t.pointerId);e&&e.move(t.clientX,t.clientY,Z(t))}),window.addEventListener("pointerup",Q),window.addEventListener("pointercancel",Q);function Q(t){const e=y.get(t.pointerId);e&&(e.lift(),y.delete(t.pointerId))}function Z(t){return t.pointerType==="pen"?t.pressure:t.pointerType==="touch"?Math.abs(Math.max(t.width,t.height)-20)/130:1}function ve(t){return new Promise(e=>setTimeout(e,t*1e3))}
