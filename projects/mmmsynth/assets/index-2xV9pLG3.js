(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) o(s);
  new MutationObserver((s) => {
    for (const r of s) if (r.type === "childList") for (const c of r.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && o(c);
  }).observe(document, { childList: true, subtree: true });
  function i(s) {
    const r = {};
    return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function o(s) {
    if (s.ep) return;
    s.ep = true;
    const r = i(s);
    fetch(s.href, r);
  }
})();
const C = "" + new URL("msynth-worklet-DhFL8hbd.js", import.meta.url).href;
function N(e, t, i) {
  return new Uint8Array([144 | e & 15, t & 127, i & 127]);
}
function z(e, t, i) {
  return new Uint8Array([128 | e & 15, t & 127, i & 127]);
}
const q = 48e3, J = 1 / q, Q = 2 * Math.PI, X = document.getElementById("ui"), u = document.createElement("canvas"), n = u.getContext("2d");
X.appendChild(u);
const x = 2;
let a = 0, l = 0;
function E() {
  u.style.width = innerWidth + "px", u.style.height = innerHeight + "px", u.width = innerWidth * devicePixelRatio, u.height = innerHeight * devicePixelRatio, n.scale(devicePixelRatio, devicePixelRatio), a = (innerWidth - 2 * x) / 13, l = (innerHeight - 2 * x) / 8;
}
window.addEventListener("resize", E);
E();
const Y = 16;
let h = "tap here", f = "mpe", v = "pwm";
const W = 42, U = 5;
let p = 0;
class D {
  constructor(t, i, o) {
    this.col = t, this.row = i, this.noteName = o;
  }
  get note() {
    return W + 12 * p + U * (7 - this.row) + this.col;
  }
  get posX() {
    return x + this.col * a;
  }
  get posY() {
    return x + this.row * l;
  }
  contains(t, i) {
    return this.posX <= t && t <= this.posX + a && this.posY <= i && i <= this.posY + l;
  }
  render() {
    n.beginPath(), n.lineWidth = 4, n.strokeStyle = "#eee", n.strokeRect(this.posX, this.posY, a, l), n.stroke(), n.beginPath(), n.fillStyle = this.noteName === "" ? "#ccc" : "#ddd", n.fillRect(this.posX, this.posY, a, l), this.noteName !== "" && (n.font = "14px sans-serif", n.fillStyle = "#bbb", n.fillText(this.noteName, this.posX + 4, this.posY + 16), n.fill());
  }
}
const y = [], B = ["C", "", "D", "", "E", "F", "", "G", "", "A", "", "B"];
let F = 0;
for (let e = 2; e <= 7; e++) {
  for (let t = 0; t <= 12; t++) y.push(new D(t, e, B[(F + t) % 12]));
  F += 7;
}
const m = /* @__PURE__ */ new Map();
class H {
  constructor(t, i, o, s, r) {
    this.id = t, this.voice = i, this.x = 0, this.y = 0, this.glide = 0, this.slide = 0, this.pressure = 0, this.move(o, s, r);
  }
  move(t, i, o) {
    const s = this.pad;
    this.pad = y.find((c) => {
      var _a;
      return (f === "piano" || c.row !== ((_a = this.pad) == null ? void 0 : _a.row)) && c.contains(t, i);
    }) ?? this.pad;
    const r = this.pad !== s;
    this.x = t, this.y = i, r && (s && this.voice.noteOff(s.note, 127), this.quantizationOffset = f === "piano" ? 0 : (this.pad.posX + a / 2 - this.x) / a), this.pad && this.updateParams(o), r && this.pad && this.voice.noteOn(this.pad.note, 127);
  }
  updateParams(t) {
    const i = this.pad.posX + a / 2, o = this.pad.posY + l / 2;
    this.glide = f === "piano" ? 0 : (this.x - i) / a, this.slide = Math.max(-1, Math.min((o - this.y) / (l / 2), 1)), this.pressure = t, this.voice.params[0] = this.glide + this.quantizationOffset, this.voice.params[1] = this.slide, this.voice.params[2] = t;
  }
  lift() {
    this.voice.noteOff(this.pad.note, 0);
  }
  render() {
    if (this.pad) for (let t of y) {
      if (t.col !== 0) continue;
      const i = t.posX + a / 2 + (this.pad.note + this.quantizationOffset + this.glide - t.note) * a, o = t.posY + l / 2 - this.slide * (l / 2);
      n.beginPath(), n.strokeStyle = `rgba(100, 100, 100, ${this.pressure})`, n.arc(i, o, a / 3, 0, Math.PI * 2), n.stroke();
    }
  }
}
class O {
  contains(t, i) {
    return this.x <= t && t <= this.x + this.w && this.y <= i && i <= this.y + this.h;
  }
  onTap(t, i) {
  }
}
const w = 10, A = new class extends O {
  get x() {
    return innerWidth - w - this.w;
  }
  get y() {
    return w;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    n.beginPath(), n.fillStyle = "#ddd", n.fillRect(this.x, this.y, this.w, this.h);
    const e = `octave ${p}`;
    n.beginPath(), n.font = "12px sans-serif", n.fillStyle = "#888", n.fillText(e, this.x + (this.w - n.measureText(e).width) / 2, this.y + 25), n.fill();
  }
  onTap(e, t) {
    e < this.x + this.w / 2 ? p -= 1 : p += 1, p = Math.max(-2, Math.min(p, 2));
  }
}(), T = new class extends O {
  get x() {
    return innerWidth - w - this.w;
  }
  get y() {
    return A.y + A.h + w;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    n.beginPath(), n.fillStyle = "#ddd", n.fillRect(this.x, this.y, this.w, this.h);
    const e = f;
    n.beginPath(), n.font = "12px sans-serif", n.fillStyle = "#888", n.fillText(e, this.x + (this.w - n.measureText(e).width) / 2, this.y + 25), n.fill();
  }
  onTap() {
    f = f === "mpe" ? "piano" : "mpe";
  }
}(), V = new class extends O {
  get x() {
    return innerWidth - w - this.w;
  }
  get y() {
    return T.y + T.h + w;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    n.beginPath(), n.fillStyle = "#ddd", n.fillRect(this.x, this.y, this.w, this.h);
    const e = Z(v);
    n.beginPath(), n.font = "12px sans-serif", n.fillStyle = "#888", n.fillText(e, this.x + (this.w - n.measureText(e).width) / 2, this.y + 25), n.fill();
  }
  onTap() {
    const e = Object.keys(S), i = (e.indexOf(v) + 1) % e.length;
    I(e[i]);
  }
}(), M = [A, T, V];
window.addEventListener("pointerdown", (e) => {
  for (const t of M) t.contains(e.clientX, e.clientY) && t.onTap(e.clientX, e.clientY);
});
function R() {
  n.clearRect(0, 0, innerWidth, innerHeight), n.font = "16px sans-serif", n.fillStyle = "#000", n.fillText(h, 10, 30), n.fill();
  for (const e of M) e.render();
  for (const e of y) e.render();
  for (const e of m.values()) e.render();
  requestAnimationFrame(R);
}
R();
const S = { pwm: `
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
  `, sine: `
    out = noteFreq sine * adsr(0.01, 0, 1, 0.3)
  `, square: `
    out = noteFreq pwm * adsr(0.01, 0, 1, 0.3)
  `, saw: `
    out = noteFreq saw * adsr(0.01, 0, 1, 0.3)
  `, slowSaw: `
    mod = (param1 lglide(0.1) norm * 10) sine * param2 lglide(0.1) norm lscale(0.01, 0.05)
    out = (noteFreq * (1 + mod)) saw * adsr(0.1, 0.2, 0.5, 1)
  `, rebelYell: `
    ampEnv = adsr(0.03, 0, 1, 0.1)
    mod = param3 lglide(0.05) norm abs lscale(0.45, 0.55)
    dry = noteFreq pwm(mod) lpf(6000, 0.2) * ampEnv
    out = dry + 0.5 * dry delay(0.4)
  `, helloAgain: `
    sync = 0.6
    osc1 = (noteFreq / 4) pwm
    osc2 = sync * 500 * ad(0.2, 0.5) >> pwm(0.5, osc1)
    out = osc2 * adsr(0.05, 0, 1, 0.2)
  `, duranDuran: `
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
  `, strangerThings: `
    release = param0 clamp(-0.5, 0.5) norm
    resonance = (param1 norm - 0.5) abs lscale(0.15, 1)
    pwmRate = 0.218
    osc1 = noteFreq pwm(pwmRate sine norm lscale(0.2, 0.8))
    osc2 = (2 * noteFreq * 1.005) pwm(pwmRate sine norm lscale(0.4, 0.6))
    out = ((osc1 + osc2) lpf(10000 * adsr(0.001, 0, 1, 0.5), resonance)) * adsr(0, 0, 1, release)
  `, tomSawyer: `
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
  `, guitar: `
    // cc0: 0.218 impulse
    impulseAmt = 0.2 // TODO: use velocity?
    sustain = 1 // TODO: use a slider or knob
    l = 1 / noteFreq
    impulse  = noise * ad(0, impulseAmt lscale(0.001, 0.05))
    ks = (impulse + ksFilter) dcBlock delay(l)
    ksFilter = (ksFilter + ks) / 2
    out = (ksFilter * adsr(0, 0, 1, sustain * 5))
  `, rickAndMorty: `
    sound1 = noise bpf(0.2 sine * 800 + 1200, 1)
    sound2 = noise bpf(-(0.25 sine) * 800 + 1200, 1)
    ring = (sound1 + sound1 delay(2) + sound2) * 5.5 pwm norm * 0.5
    out = ring * adsr(0.01, 0, 1, 2)
  ` }, b = new AudioContext({ latencyHint: "balanced", sampleRate: q });
class _ {
  constructor(t, i) {
    this.node = t, this.params = i;
  }
  noteOn(t, i) {
    P(this.node, { command: "process midi message", data: N(0, t, i) });
  }
  noteOff(t, i) {
    P(this.node, { command: "process midi message", data: z(0, t, i) });
  }
}
const d = [];
let g = "need initialization";
function $() {
  return g === "ready" ? true : (g === "need initialization" && G(), false);
}
async function G() {
  g === "need initialization" && (g = "initializing", h = "initializing audio...", b.resume(), h = "loading worklet...", await b.audioWorklet.addModule(C), h = "initializing voices...", I("pwm"), g = "ready", h = "ready!", await K(2), h = "");
}
function P(e, t) {
  e.port.postMessage(t);
}
function I(e) {
  v = e;
  for (const t of d) P(t.node, { command: "stop" }), t.node.disconnect();
  d.length = 0;
  for (let t = 0; t < Y; t++) {
    const i = new AudioWorkletNode(b, "msynth"), o = new Float32Array(new SharedArrayBuffer(128 * 4));
    d.push(new _(i, o)), i.channelInterpretation = "discrete", i.channelCount = 2, i.channelCountMode = "explicit", i.connect(b.destination), i.port.onmessage = (s) => console.log("worklet:", s.data), P(i, { command: "load patch", code: S[v], params: o.buffer });
  }
}
window.addEventListener("pointerdown", async (e) => {
  if ($()) {
    for (const t of y) if (t.contains(e.clientX, e.clientY)) {
      m.set(e.pointerId, new H(e.pointerId, j(), e.clientX, e.clientY, k(e)));
      break;
    }
  }
});
window.addEventListener("pointermove", (e) => {
  const t = m.get(e.pointerId);
  t && t.move(e.clientX, e.clientY, k(e));
});
window.addEventListener("pointerup", L);
window.addEventListener("pointercancel", L);
function L(e) {
  const t = m.get(e.pointerId);
  t && (t.lift(), m.delete(e.pointerId));
}
function k(e) {
  return e.pointerType === "pen" ? e.pressure : e.pointerType === "touch" ? Math.abs(Math.max(e.width, e.height) - 20) / 130 : 1;
}
function j() {
  const e = [...m.values()], i = d.findLast((o) => !e.some((s) => s.voice === o)) ?? d.at(-1);
  return d.splice(d.indexOf(i), 1), d.unshift(i), i;
}
function K(e) {
  return new Promise((t) => setTimeout(t, e * 1e3));
}
function Z(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
}
