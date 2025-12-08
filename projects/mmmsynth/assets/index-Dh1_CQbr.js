(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const M=""+new URL("msynth-worklet-BdxmyLhY.js",import.meta.url).href;function z(e,t,i){return new Uint8Array([144|e&15,t&127,i&127])}function W(e,t,i){return new Uint8Array([128|e&15,t&127,i&127])}const I=48e3,N=document.getElementById("ui"),h=document.createElement("canvas"),n=h.getContext("2d");N.appendChild(h);const g=2;let r=0,a=0;function O(){h.style.width=innerWidth+"px",h.style.height=innerHeight+"px",h.width=innerWidth*devicePixelRatio,h.height=innerHeight*devicePixelRatio,n.scale(devicePixelRatio,devicePixelRatio),r=(innerWidth-2*g)/13,a=(innerHeight-2*g)/8}window.addEventListener("resize",O),O();const C=16;let c="tap here",p="mpe",x="pwm";const B=42,D=5;let u=0;class H{constructor(t,i,s){this.col=t,this.row=i,this.noteName=s}get note(){return B+12*u+D*(7-this.row)+this.col}get posX(){return g+this.col*r}get posY(){return g+this.row*a}contains(t,i){return this.posX<=t&&t<=this.posX+r&&this.posY<=i&&i<=this.posY+a}render(){n.beginPath(),n.lineWidth=4,n.strokeStyle="#eee",n.strokeRect(this.posX,this.posY,r,a),n.stroke(),n.beginPath(),n.fillStyle=this.noteName===""?"#ccc":"#ddd",n.fillRect(this.posX,this.posY,r,a),this.noteName!==""&&(n.font="14px sans-serif",n.fillStyle="#bbb",n.fillText(this.noteName,this.posX+4,this.posY+16),n.fill())}}const w=[],$=["C","","D","","E","F","","G","","A","","B"];let T=0;for(let e=2;e<=7;e++){for(let t=0;t<=12;t++)w.push(new H(t,e,$[(T+t)%12]));T+=7}const m=new Map;class U{constructor(t,i,s,o,l){this.id=t,this.voice=i,this.x=0,this.y=0,this.glide=0,this.slide=0,this.pressure=0,this.move(s,o,l)}move(t,i,s){const o=this.pad;this.pad=w.find(P=>{var A;return(p==="piano"||P.row!==((A=this.pad)==null?void 0:A.row))&&P.contains(t,i)})??this.pad;const l=this.pad!==o;this.x=t,this.y=i,l&&(o&&this.voice.noteOff(o.note,127),this.quantizationOffset=p==="piano"?0:(this.pad.posX+r/2-this.x)/r),this.pad&&this.updateParams(s),l&&this.pad&&this.voice.noteOn(this.pad.note,127)}updateParams(t){const i=this.pad.posX+r/2,s=this.pad.posY+a/2;this.glide=p==="piano"?0:(this.x-i)/r,this.slide=Math.max(-1,Math.min((s-this.y)/(a/2),1)),this.pressure=t,this.voice.params[0]=this.glide+this.quantizationOffset,this.voice.params[1]=this.slide,this.voice.params[2]=t}lift(){this.voice.noteOff(this.pad.note,0)}render(){if(this.pad)for(let t of w){if(t.col!==0)continue;const i=t.posX+r/2+(this.pad.note+this.quantizationOffset+this.glide-t.note)*r,s=t.posY+a/2-this.slide*(a/2);n.beginPath(),n.strokeStyle=`rgba(100, 100, 100, ${this.pressure})`,n.arc(i,s,r/3,0,Math.PI*2),n.stroke()}}}class k{contains(t,i){return this.x<=t&&t<=this.x+this.w&&this.y<=i&&i<=this.y+this.h}onTap(t,i){}}const f=10,q=new class extends k{get x(){return innerWidth-f-this.w}get y(){return f}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=`octave ${u}`;n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(e,t){e<this.x+this.w/2?u-=1:u+=1,u=Math.max(-2,Math.min(u,2))}},F=new class extends k{get x(){return innerWidth-f-this.w}get y(){return q.y+q.h+f}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=p;n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(){p=p==="mpe"?"piano":"mpe"}},j=new class extends k{get x(){return innerWidth-f-this.w}get y(){return F.y+F.h+f}get w(){return 100}get h(){return 40}render(){n.beginPath(),n.fillStyle="#ddd",n.fillRect(this.x,this.y,this.w,this.h);const e=J(x);n.beginPath(),n.font="12px sans-serif",n.fillStyle="#888",n.fillText(e,this.x+(this.w-n.measureText(e).width)/2,this.y+25),n.fill()}onTap(){const e=Object.keys(S),t=(e.indexOf(x)+1)%e.length;Y(e[t])}},E=[q,F,j];window.addEventListener("pointerdown",e=>{for(const t of E)t.contains(e.clientX,e.clientY)&&t.onTap(e.clientX,e.clientY)});function R(){n.clearRect(0,0,innerWidth,innerHeight),n.font="16px sans-serif",n.fillStyle="#000",n.fillText(c,10,30),n.fill();for(const e of E)e.render();for(const e of w)e.render();for(const e of m.values())e.render();requestAnimationFrame(R)}R();const S={pwm:`
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
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
  `},v=new AudioContext({latencyHint:"balanced",sampleRate:I});class G{constructor(t,i){this.node=t,this.params=i}noteOn(t,i){b(this.node,{command:"process midi message",data:z(0,t,i)})}noteOff(t,i){b(this.node,{command:"process midi message",data:W(0,t,i)})}}const d=[];let y="need initialization";function K(){return y==="ready"?!0:(y==="need initialization"&&Z(),!1)}async function Z(){if(y==="need initialization"){y="initializing",c="initializing audio...",v.resume(),c="loading worklet...",await v.audioWorklet.addModule(M),c="initializing voices...";try{Y("pwm")}catch(e){throw c=e.message,e}y="ready",c="ready!",await _(2),c=""}}function b(e,t){e.port.postMessage(t)}function Y(e){x=e;for(const t of d)b(t.node,{command:"stop"}),t.node.disconnect();d.length=0;for(let t=0;t<C;t++){const i=new AudioWorkletNode(v,"msynth"),s=new Float32Array(new SharedArrayBuffer(512));d.push(new G(i,s)),i.channelInterpretation="discrete",i.channelCount=2,i.channelCountMode="explicit",i.connect(v.destination),i.port.onmessage=o=>console.log("worklet:",o.data),b(i,{command:"load patch",code:S[x],params:s.buffer})}}window.addEventListener("pointerdown",async e=>{if(K()){for(const t of w)if(t.contains(e.clientX,e.clientY)){m.set(e.pointerId,new U(e.pointerId,V(),e.clientX,e.clientY,X(e)));break}}}),window.addEventListener("pointermove",e=>{const t=m.get(e.pointerId);t&&t.move(e.clientX,e.clientY,X(e))}),window.addEventListener("pointerup",L),window.addEventListener("pointercancel",L);function L(e){const t=m.get(e.pointerId);t&&(t.lift(),m.delete(e.pointerId))}function X(e){return e.pointerType==="pen"?e.pressure:e.pointerType==="touch"?Math.abs(Math.max(e.width,e.height)-20)/130:1}function V(){const e=[...m.values()],t=d.findLast(i=>!e.some(s=>s.voice===i))??d.at(-1);return d.splice(d.indexOf(t),1),d.unshift(t),t}function _(e){return new Promise(t=>setTimeout(t,e*1e3))}function J(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1 $2").toLowerCase()}
