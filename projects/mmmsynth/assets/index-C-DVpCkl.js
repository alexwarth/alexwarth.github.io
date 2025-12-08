(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const workletUrl = "" + new URL("msynth-worklet-C3uluhmG.js", import.meta.url).href;
function noteOn(ch, note, velocity) {
  return new Uint8Array([144 | ch & 15, note & 127, velocity & 127]);
}
function noteOff(ch, note, velocity) {
  return new Uint8Array([128 | ch & 15, note & 127, velocity & 127]);
}
const SAMPLE_RATE = 48e3;
const uiDiv = document.getElementById("ui");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
uiDiv.appendChild(canvas);
const MARGIN = 2;
let cellWidth = 0;
let cellHeight = 0;
function resize() {
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  cellWidth = (innerWidth - 2 * MARGIN) / 13;
  cellHeight = (innerHeight - 2 * MARGIN) / 8;
}
window.addEventListener("resize", resize);
resize();
const NUM_VOICES = 16;
let status = "tap here";
let mode = "mpe";
let patchName = "pwm";
const LOW_B = 42;
const PERFECT_4TH = 5;
let octave = 0;
class Pad {
  constructor(col, row, noteName) {
    this.col = col;
    this.row = row;
    this.noteName = noteName;
  }
  get note() {
    return LOW_B + 12 * octave + PERFECT_4TH * (7 - this.row) + this.col;
  }
  get posX() {
    return MARGIN + this.col * cellWidth;
  }
  get posY() {
    return MARGIN + this.row * cellHeight;
  }
  contains(px, py) {
    return this.posX <= px && px <= this.posX + cellWidth && this.posY <= py && py <= this.posY + cellHeight;
  }
  render() {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#eee";
    ctx.strokeRect(this.posX, this.posY, cellWidth, cellHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = this.noteName === "" ? "#ccc" : "#ddd";
    ctx.fillRect(this.posX, this.posY, cellWidth, cellHeight);
    if (this.noteName !== "") {
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#bbb";
      ctx.fillText(this.noteName, this.posX + 4, this.posY + 16);
      ctx.fill();
    }
  }
}
const pads = [];
const noteNames = ["C", "", "D", "", "E", "F", "", "G", "", "A", "", "B"];
let noteNameIdxOffset = 0;
for (let row = 2; row <= 7; row++) {
  for (let col = 0; col <= 12; col++) {
    pads.push(new Pad(col, row, noteNames[(noteNameIdxOffset + col) % 12]));
  }
  noteNameIdxOffset += 7;
}
const fingersById = /* @__PURE__ */ new Map();
class Finger {
  constructor(id, voice, x, y, pressure) {
    this.id = id;
    this.voice = voice;
    this.x = 0;
    this.y = 0;
    this.glide = 0;
    this.slide = 0;
    this.pressure = 0;
    this.move(x, y, pressure);
  }
  move(newX, newY, pressure) {
    const oldPad = this.pad;
    this.pad = pads.find(
      (pad) => {
        var _a;
        return (mode === "piano" || pad.row !== ((_a = this.pad) == null ? void 0 : _a.row)) && pad.contains(newX, newY);
      }
    ) ?? this.pad;
    const changedPads = this.pad !== oldPad;
    this.x = newX;
    this.y = newY;
    if (changedPads) {
      if (oldPad) {
        this.voice.noteOff(oldPad.note, 127);
      }
      this.quantizationOffset = mode === "piano" ? 0 : (this.pad.posX + cellWidth / 2 - this.x) / cellWidth;
    }
    if (this.pad) {
      this.updateParams(pressure);
    }
    if (changedPads && this.pad) {
      this.voice.noteOn(this.pad.note, 127);
    }
  }
  updateParams(pressure) {
    const padCenterX = this.pad.posX + cellWidth / 2;
    const padCenterY = this.pad.posY + cellHeight / 2;
    this.glide = mode === "piano" ? 0 : (this.x - padCenterX) / cellWidth;
    this.slide = Math.max(-1, Math.min((padCenterY - this.y) / (cellHeight / 2), 1));
    this.pressure = pressure;
    this.voice.params[0] = this.glide + this.quantizationOffset;
    this.voice.params[1] = this.slide;
    this.voice.params[2] = pressure;
  }
  lift() {
    this.voice.noteOff(this.pad.note, 0);
  }
  render() {
    if (!this.pad) {
      return;
    }
    for (let pad of pads) {
      if (pad.col !== 0) {
        continue;
      }
      const x = pad.posX + cellWidth / 2 + (this.pad.note + this.quantizationOffset + this.glide - pad.note) * cellWidth;
      const y = pad.posY + cellHeight / 2 - this.slide * (cellHeight / 2);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(100, 100, 100, ${this.pressure})`;
      ctx.arc(x, y, cellWidth / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}
class Thing {
  contains(px, py) {
    return this.x <= px && px <= this.x + this.w && this.y <= py && py <= this.y + this.h;
  }
  onTap(x, y) {
  }
}
const PADDING = 10;
const octaveControls = new class extends Thing {
  get x() {
    return innerWidth - PADDING - this.w;
  }
  get y() {
    return PADDING;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = "#ddd";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    const label = `octave ${octave}`;
    ctx.beginPath();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#888";
    ctx.fillText(label, this.x + (this.w - ctx.measureText(label).width) / 2, this.y + 25);
    ctx.fill();
  }
  onTap(x, y) {
    if (x < this.x + this.w / 2) {
      octave -= 1;
    } else {
      octave += 1;
    }
    octave = Math.max(-2, Math.min(octave, 2));
  }
}();
const modeToggle = new class extends Thing {
  get x() {
    return innerWidth - PADDING - this.w;
  }
  get y() {
    return octaveControls.y + octaveControls.h + PADDING;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = "#ddd";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    const label = mode;
    ctx.beginPath();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#888";
    ctx.fillText(label, this.x + (this.w - ctx.measureText(label).width) / 2, this.y + 25);
    ctx.fill();
  }
  onTap() {
    mode = mode === "mpe" ? "piano" : "mpe";
  }
}();
const patchToggle = new class extends Thing {
  get x() {
    return innerWidth - PADDING - this.w;
  }
  get y() {
    return modeToggle.y + modeToggle.h + PADDING;
  }
  get w() {
    return 100;
  }
  get h() {
    return 40;
  }
  render() {
    ctx.beginPath();
    ctx.fillStyle = "#ddd";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    const label = unCamelCase(patchName);
    ctx.beginPath();
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#888";
    ctx.fillText(label, this.x + (this.w - ctx.measureText(label).width) / 2, this.y + 25);
    ctx.fill();
  }
  onTap() {
    const patchNames = Object.keys(patchLibrary);
    const currentIdx = patchNames.indexOf(patchName);
    const nextIdx = (currentIdx + 1) % patchNames.length;
    loadPatch(patchNames[nextIdx]);
  }
}();
const things = [octaveControls, modeToggle, patchToggle];
window.addEventListener("pointerdown", (e) => {
  for (const thing of things) {
    if (thing.contains(e.clientX, e.clientY)) {
      thing.onTap(e.clientX, e.clientY);
    }
  }
});
function render() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(status, 10, 30);
  ctx.fill();
  for (const thing of things) {
    thing.render();
  }
  for (const pad of pads) {
    pad.render();
  }
  for (const finger of fingersById.values()) {
    finger.render();
  }
  requestAnimationFrame(render);
}
render();
const patchLibrary = {
  pwm: `
    out = noteFreq pwm(slide lglide(0.05) norm lscale(0.2, 0.8)) * adsr(0.05, 0, 1, 0.4)
  `,
  sine: `
    out = noteFreq sine * adsr(0.01, 0, 1, 0.3)
  `,
  square: `
    out = noteFreq pwm * adsr(0.01, 0, 1, 0.3)
  `,
  saw: `
    out = noteFreq saw * adsr(0.01, 0, 1, 0.3)
  `,
  slowSaw: `
    mod = (param1 lglide(0.1) norm * 10) sine * param2 lglide(0.1) norm lscale(0.01, 0.05)
    out = (noteFreq * (1 + mod)) saw * adsr(0.1, 0.2, 0.5, 1)
  `,
  rebelYell: `
    ampEnv = adsr(0.03, 0, 1, 0.1)
    mod = param3 lglide(0.05) norm abs lscale(0.45, 0.55)
    dry = noteFreq pwm(mod) lpf(6000, 0.2) * ampEnv
    out = dry + 0.5 * dry delay(0.4)
  `,
  helloAgain: `
    sync = 0.6
    osc1 = (noteFreq / 4) pwm
    osc2 = sync * 500 * ad(0.2, 0.5) >> pwm(0.5, osc1)
    out = osc2 * adsr(0.05, 0, 1, 0.2)
  `,
  duranDuran: `
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
  `,
  strangerThings: `
    release = param0 clamp(-0.5, 0.5) norm
    resonance = (param1 norm - 0.5) abs lscale(0.15, 1)
    pwmRate = 0.218
    osc1 = noteFreq pwm(pwmRate sine norm lscale(0.2, 0.8))
    osc2 = (2 * noteFreq * 1.005) pwm(pwmRate sine norm lscale(0.4, 0.6))
    out = ((osc1 + osc2) lpf(10000 * adsr(0.001, 0, 1, 0.5), resonance)) * adsr(0, 0, 1, release)
  `,
  tomSawyer: `
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
  `,
  guitar: `
    // cc0: 0.218 impulse
    impulseAmt = 0.2 // TODO: use velocity?
    sustain = 1 // TODO: use a slider or knob
    l = 1 / noteFreq
    impulse  = noise * ad(0, impulseAmt lscale(0.001, 0.05))
    ks = (impulse + ksFilter) dcBlock delay(l)
    ksFilter = (ksFilter + ks) / 2
    out = (ksFilter * adsr(0, 0, 1, sustain * 5))
  `,
  rickAndMorty: `
    sound1 = noise bpf(0.2 sine * 800 + 1200, 1)
    sound2 = noise bpf(-(0.25 sine) * 800 + 1200, 1)
    ring = (sound1 + sound1 delay(2) + sound2) * 5.5 pwm norm * 0.5
    out = ring * adsr(0.01, 0, 1, 2)
  `
};
const context = new AudioContext({
  latencyHint: "balanced",
  sampleRate: SAMPLE_RATE
});
class Voice {
  constructor(node, params) {
    this.node = node;
    this.params = params;
  }
  noteOn(note, velocity) {
    sendToSynth(this.node, {
      command: "process midi message",
      data: noteOn(0, note, velocity)
    });
  }
  noteOff(note, velocity) {
    sendToSynth(this.node, {
      command: "process midi message",
      data: noteOff(0, note, velocity)
    });
  }
}
const voices = [];
let webAudioState = "need initialization";
function initialized() {
  if (webAudioState === "ready") {
    return true;
  }
  if (webAudioState === "need initialization") {
    initialize();
  }
  return false;
}
async function initialize() {
  if (webAudioState !== "need initialization") {
    return;
  }
  webAudioState = "initializing";
  status = "initializing audio...";
  context.resume();
  status = "loading worklet...";
  await context.audioWorklet.addModule(workletUrl);
  status = "initializing voices...";
  loadPatch("pwm");
  webAudioState = "ready";
  status = "ready!";
  await seconds(2);
  status = "";
}
function sendToSynth(synth, message) {
  synth.port.postMessage(message);
}
function loadPatch(_patchName) {
  patchName = _patchName;
  for (const voice of voices) {
    sendToSynth(voice.node, { command: "stop" });
    voice.node.disconnect();
  }
  voices.length = 0;
  for (let i = 0; i < NUM_VOICES; i++) {
    const node = new AudioWorkletNode(context, "msynth");
    const params = new Float32Array(new SharedArrayBuffer(128 * 4));
    voices.push(new Voice(node, params));
    node.channelInterpretation = "discrete";
    node.channelCount = 2;
    node.channelCountMode = "explicit";
    node.connect(context.destination);
    node.port.onmessage = (msg) => console.log("worklet:", msg.data);
    sendToSynth(node, {
      command: "load patch",
      code: patchLibrary[patchName],
      params: params.buffer
    });
  }
}
window.addEventListener("pointerdown", async (e) => {
  if (!initialized()) {
    return;
  }
  for (const pad of pads) {
    if (pad.contains(e.clientX, e.clientY)) {
      fingersById.set(
        e.pointerId,
        new Finger(e.pointerId, grabVoice(), e.clientX, e.clientY, getPressure(e))
      );
      break;
    }
  }
});
window.addEventListener("pointermove", (e) => {
  const finger = fingersById.get(e.pointerId);
  if (finger) {
    finger.move(e.clientX, e.clientY, getPressure(e));
  }
});
window.addEventListener("pointerup", onPointerUp);
window.addEventListener("pointercancel", onPointerUp);
function onPointerUp(e) {
  const finger = fingersById.get(e.pointerId);
  if (finger) {
    finger.lift();
    fingersById.delete(e.pointerId);
  }
}
function getPressure(e) {
  if (e.pointerType === "pen") {
    return e.pressure;
  } else if (e.pointerType === "touch") {
    return Math.abs(Math.max(e.width, e.height) - 20) / (150 - 20);
  } else {
    return 1;
  }
}
function grabVoice() {
  const fingers = [...fingersById.values()];
  const freeVoice = voices.findLast((v) => !fingers.some((f) => f.voice === v));
  const voice = freeVoice ?? voices.at(-1);
  voices.splice(voices.indexOf(voice), 1);
  voices.unshift(voice);
  return voice;
}
function seconds(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1e3));
}
function unCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
}
