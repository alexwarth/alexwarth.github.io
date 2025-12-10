(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const W=""+new URL("msynth-worklet-DhAKMKni.js",import.meta.url).href;function I(e,t,i){return new Uint8Array([144|e&15,t&127,i&127])}function N(e,t,i){return new Uint8Array([128|e&15,t&127,i&127])}const C=48e3;function T(e,t,i){return Math.max(t,Math.min(e,i))}const D=document.getElementById("ui"),p=document.createElement("canvas"),n=p.getContext("2d");D.appendChild(p);const b=2;let r=0,l=0;function E(){p.style.width=innerWidth+"px",p.style.height=innerHeight+"px",p.width=innerWidth*devicePixelRatio,p.height=innerHeight*devicePixelRatio,n.scale(devicePixelRatio,devicePixelRatio),r=(innerWidth-2*b)/13,l=(innerHeight-2*b)/8}window.addEventListener("resize",E),E();const H=16;let y="tap here",u="mpe",g="pwm",d=null;const c=[],B=47,$=5;let m=0;class K{constructor(t,i,s){this.col=t,this.row=i,this.noteName=s}get note(){return B+12*m+$*(7-this.row)+this.col}get posX(){return b+this.col*r}get posY(){return b+this.row*l}contains(t,i){return this.posX<=t&&t<=this.posX+r&&this.posY<=i&&i<=this.posY+l}render(){n.beginPath(),n.lineWidth=4,n.strokeStyle="#eee",n.strokeRect(this.posX,this.posY,r,l),n.stroke(),n.beginPath(),n.fillStyle=this.noteName===""?"#ccc":"#ddd",n.fillRect(this.posX,this.posY,r,l),this.noteName!==""&&(n.font="14px sans-serif",n.fillStyle="#bbb",n.fillText(this.noteName,this.posX+4,this.posY+16),n.fill())}}const x=[],U=["C","","D","","E","F","","G","","A","","B"];let S=0;for(let e=2;e<=7;e++){for(let t=0;t<=12;t++)x.push(new K(t,e,U[(S+t)%12]));S+=7}const f=new Map;class j{constructor(t,i,s,o,a){this.id=t,this.voice=i,this.x=0,this.y=0,this.glide=0,this.slide=0,this.pressure=0,this.move(s,o,a)}move(t,i,s){const o=this.pad;this.pad=x.find(A=>{var O;return(u==="piano"||A.row!==((O=this.pad)==null?void 0:O.row))&&A.contains(t,i)})??this.pad;const a=this.pad!==o;this.x=t,this.y=i,a&&(o&&this.voice.noteOff(o.note,127),this.quantizationOffset=u==="piano"?0:(this.pad.posX+r/2-this.x)/r),this.pad&&this.updateParams(s),a&&this.pad&&this.voice.noteOn(this.pad.note,127)}updateParams(t){const i=this.pad.posX+r/2,s=this.pad.posY+l/2;this.glide=u==="piano"?0:(this.x-i)/r,this.slide=T((s-this.y)/(l/2),-1,1),this.pressure=t,this.voice.params[0]=this.glide+this.quantizationOffset,this.voice.params[1]=this.slide,this.voice.params[2]=t}lift(){this.voice.noteOff(this.pad.note,127)}render(){if(this.pad)for(let t of x){if(t.col!==0)continue;const i=t.posX+r/2+(this.pad.note+this.quantizationOffset+this.glide-t.note)*r,s=t.posY+l/2-this.slide*(l/2),o=`rgba(100, 100, 100, ${this.pressure})`,a=t.row===this.pad.row;n.beginPath(),a?n.fillStyle=o:n.strokeStyle=o,n.arc(i,s,r/3,0,Math.PI*2),a?n.fill():n.stroke()}}}class k{contains(t,i){return this.x<=t&&t<=this.x+this.w&&this.y<=i&&i<=this.y+this.h}onTap(t,i){}}const w=10,F=new class extends k{get x(){return innerWidth-w-this.w}get y(){return w}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=`octave ${m}`;n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(e,t){e<this.x+this.w/2?m-=1:m+=1,m=T(m,-2,2)}},P=new class extends k{get x(){return innerWidth-w-this.w}get y(){return F.y+F.h+w}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=u;n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(){u=u==="mpe"?"piano":"mpe"}},G=new class extends k{get x(){return innerWidth-w-this.w}get y(){return P.y+P.h+w}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=ee(g);n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(){const e=Object.keys(X),t=(e.indexOf(g)+1)%e.length;Y(e[t])}},R=[F,P,G];window.addEventListener("pointerdown",e=>{for(const t of R)t.contains(e.clientX,e.clientY)&&t.onTap(e.clientX,e.clientY)});function L(){n.clearRect(0,0,innerWidth,innerHeight),n.font="16px sans-serif",n.fillStyle="#000",n.fillText(y,10,30),n.fill();for(const e of R)e.render();for(const e of x)e.render();for(const e of f.values())e.render();requestAnimationFrame(L)}L();const X={pwm:`
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
  `,pwmPencil:`
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4) * pressure
  `,sine:`
    out = noteFreq sine * adsr(0.01, 0, 1, 0.3)
  `,square:`
    out = noteFreq pwm * adsr(0.01, 0, 1, 0.3)
  `,saw:`
    out = noteFreq saw * adsr(0.01, 0, 1, 0.3)
  `,slowSaw:`
    mod = (param1 lglide(0.1) norm * 10) sine * param2 lglide(0.1) norm lscale(0.01, 0.05)
    out = (noteFreq * (1 + mod)) saw * adsr(0.1, 0.2, 0.5, 1)
  `,rebelYell:`
    ampEnv = adsr(0.03, 0, 1, 0.1)
    mod = param3 lglide(0.05) norm abs lscale(0.45, 0.55)
    dry = noteFreq pwm(mod) lpf(6000, 0.2) * ampEnv
    out = dry + 0.5 * dry delay(0.4)
  `,helloAgain:`
    sync = 0.6
    osc1 = (noteFreq / 4) pwm
    osc2 = sync * 500 * ad(0.2, 0.5) >> pwm(0.5, osc1)
    out = osc2 * adsr(0.05, 0, 1, 0.2)
  `,duranDuran:`
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
  `,strangerThings:`
    release = param0 clamp(-0.5, 0.5) norm
    resonance = (param1 norm - 0.5) abs lscale(0.15, 1)
    pwmRate = 0.218
    osc1 = noteFreq pwm(pwmRate sine norm lscale(0.2, 0.8))
    osc2 = (2 * noteFreq * 1.005) pwm(pwmRate sine norm lscale(0.4, 0.6))
    out = ((osc1 + osc2) lpf(10000 * adsr(0.001, 0, 1, 0.5), resonance)) * adsr(0, 0, 1, release)
  `,tomSawyer:`
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
    // cc0: 0.218 impulse
    impulseAmt = 0.2 // TODO: use velocity?
    sustain = 1 // TODO: use a slider or knob
    l = 1 / noteFreq
    impulse  = noise * ad(0, impulseAmt lscale(0.001, 0.05))
    ks = (impulse + ksFilter) dcBlock delay(l)
    ksFilter = (ksFilter + ks) / 2
    out = (ksFilter * adsr(0, 0, 1, sustain * 5))
  `,rickAndMorty:`
    sound1 = noise bpf(0.2 sine * 800 + 1200, 1)
    sound2 = noise bpf(-(0.25 sine) * 800 + 1200, 1)
    ring = (sound1 + sound1 delay(2) + sound2) * 5.5 pwm norm * 0.5
    out = ring * adsr(0.01, 0, 1, 2)
  `},h=new AudioContext({latencyHint:"balanced",sampleRate:C});class Z{constructor(t){this.channel=t,this.params=new Float32Array(new SharedArrayBuffer(512))}noteOn(t,i){q({command:"process midi message",data:I(this.channel,t,i)})}noteOff(t,i){q({command:"process midi message",data:N(this.channel,t,i)})}}for(let e=0;e<H;e++)c.push(new Z(e));let v="need initialization";function J(){return v==="ready"?!0:(v==="need initialization"&&Q(),!1)}async function Q(){v==="need initialization"&&(v="initializing",y="initializing audio...",h.resume(),y="loading worklet...",await h.audioWorklet.addModule(W),d=new AudioWorkletNode(h,"msynth"),q({command:"init",voiceParams:c.map(e=>e.params.buffer)}),d.channelInterpretation="discrete",d.channelCount=2,d.channelCountMode="explicit",d.connect(h.destination),d.port.onmessage=e=>console.log("worklet:",e.data),Y(g),v="ready",y="ready!",await _(2),y="")}function q(e){d==null||d.port.postMessage(e)}function Y(e){g=e,q({command:"load patch",code:X[g]})}window.addEventListener("pointerdown",()=>{(h.state==="suspended"||h.state==="interrupted")&&h.resume()}),window.addEventListener("pointerdown",async e=>{if(J()){for(const t of x)if(t.contains(e.clientX,e.clientY)){f.set(e.pointerId,new j(e.pointerId,V(),e.clientX,e.clientY,z(e)));break}}}),window.addEventListener("pointermove",e=>{const t=f.get(e.pointerId);t&&t.move(e.clientX,e.clientY,z(e))}),window.addEventListener("pointerup",M),window.addEventListener("pointercancel",M);function M(e){const t=f.get(e.pointerId);t&&(t.lift(),f.delete(e.pointerId))}function z(e){return e.pointerType==="pen"?e.pressure:e.pointerType==="touch"?Math.abs(Math.max(e.width,e.height)-20)/130:1}function V(){const e=[...f.values()],t=c.findLast(i=>!e.some(s=>s.voice===i))??c.at(-1);return c.splice(c.indexOf(t),1),c.unshift(t),t}function _(e){return new Promise(t=>setTimeout(t,e*1e3))}function ee(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1 $2").toLowerCase()}
