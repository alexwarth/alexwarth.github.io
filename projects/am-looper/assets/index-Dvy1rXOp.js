var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
(async () => {
  var _t2, _e2, _n2, _r2, _s2, _Wu_instances, i_get, a_get, o_fn, c_fn, _t3, _e3, _n3, _r3, _s3, _i2, _ed_instances, a_fn, o_fn2, _t4, _e4, _n4, _r4, _s4, _i3, _a2, _t5, _e5, _n5, _r5, _s5, _hd_instances, i_fn, a_fn2, o_fn3, c_fn2, _t6, _e6, _n6, _r6, _s6, _i4, _a3, _o2, _c2, __d_instances, g_fn, p_fn, y_fn, u_fn, b_fn, m_fn, d_fn, l_fn, h_fn, f_fn, __fn, _t7, _e7, _n7, _gd_instances, r_fn, s_fn, i_fn2, _t8, _e8, _n8, _r7, _s7, _pd_instances, i_fn3, _a4, o_fn4, c_fn3, _t9, _e9, _n9, _Rh_instances, r_fn2;
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver((s) => {
      for (const i of s) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function n(s) {
      const i = {};
      return s.integrity && (i.integrity = s.integrity), s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? i.credentials = "include" : s.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
    }
    function r(s) {
      if (s.ep) return;
      s.ep = true;
      const i = n(s);
      fetch(s.href, i);
    }
  })();
  const Nn = 128, Ma = 48e3, rn = {
    autoGainControl: false,
    echoCancellation: false
  };
  let zn = true;
  async function Ra(t, e) {
    const n = await ja();
    console.log(rn);
    const r = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: n,
        ...rn
      }
    }), s = t.createMediaStreamSource(r);
    return console.log("input stream", s), s.connect(e).connect(t.destination), t.resume(), e.connect(t.destination), {
      id: n,
      numChannels: s.channelCount,
      useMidiPedal: zn
    };
  }
  async function ja() {
    const t = await navigator.mediaDevices.enumerateDevices();
    return new Promise((e) => {
      const n = document.getElementById("buttons");
      n.appendChild(Jt("div", document.createTextNode("Select input device:")));
      for (const r of t) {
        if (r.kind !== "audioinput") continue;
        const s = document.createElement("button");
        s.textContent = r.label, s.onclick = (i) => {
          n.textContent = "", e(r.deviceId);
        }, n.appendChild(s);
      }
      n.appendChild(Jt("div", document.createTextNode(""))), n.appendChild(Jt("div", document.createTextNode("Options:"))), n.appendChild(kn("autoGainControl", "auto gain control")), n.appendChild(kn("echoCancellation", "echo cancellation")), n.appendChild(kn("useMidiPedal", "use MIDI pedal"));
    });
  }
  function Jt(t, ...e) {
    const n = document.createElement(t);
    for (const r of e) n.appendChild(r);
    return n;
  }
  function kn(t, e) {
    const n = document.createElement("input");
    return n.type = "checkbox", n.checked = t === "useMidiPedal" ? zn : rn[t], n.onchange = () => {
      t === "useMidiPedal" ? zn = n.checked : rn[t] = n.checked;
    }, Jt("span", n, document.createTextNode(" " + e));
  }
  function Da(t) {
    if (t.length === 0) return null;
    let e = t[0].lengthInFrames;
    for (let n of t) e = Math.max(e, n.lengthInFrames);
    return e;
  }
  function Ua(t) {
    const e = {
      ...t
    };
    return delete e.samples, e;
  }
  function Wn() {
    let t = localStorage.getItem("ui-state");
    const e = t !== null ? JSON.parse(t) : {};
    return "lastUsedDeviceId" in e || (e.lastUsedDeviceId = null), "deviceSpecificLatencyOffset" in e || (e.deviceSpecificLatencyOffset = {}), "channelToRecord" in e || (e.channelToRecord = {}), e;
  }
  function Pa(t) {
    localStorage.setItem("ui-state", JSON.stringify(t));
  }
  function js(t) {
    const e = Wn();
    t(e), Pa(e);
  }
  let qt, Ye, Se, Ut, vt = 0, An = null;
  async function $a(t, e, n, r) {
    qt = t, window.looper = qt, Ye = e, Se = n, Ut = r, qt.port.onmessage = (o) => Ba(o.data);
    const s = Wn().deviceSpecificLatencyOffset[Ye.id] ?? 20;
    if (Qe({
      command: "set latency offset",
      value: s
    }), Ds(Wn().channelToRecord[Ye.id] ?? 0), window.addEventListener("keydown", Fa), window.addEventListener("keyup", La), window.addEventListener("pointerdown", Ga), window.addEventListener("pointermove", qa), window.addEventListener("pointerup", Ja), Ye.useMidiPedal) try {
      An = await navigator.requestMIDIAccess(), An.inputs.forEach((o) => {
        o.onmidimessage = (a) => {
          a.data && a.data[0] >> 4 === 11 && a.data[1] === 64 && a.data[2] >= 64 && wr();
        };
      }), console.log("midi", An);
    } catch {
      console.log("no midi :(");
    }
    function i() {
      Ya(), requestAnimationFrame(i);
    }
    i(), hn();
  }
  function Qe(t) {
    qt.port.postMessage(t);
  }
  function Ba(t) {
    switch (t.event) {
      case "playhead moved":
        Se.playhead = t.value;
        break;
      case "finished recording":
        Ut((e) => {
          e.layers.push({
            ...t.layer,
            samples: new Uint8Array(t.samples)
          });
        });
        break;
      case "changed latency offset":
        Jn(`latency offset = ${t.value}`), js((e) => {
          e.deviceSpecificLatencyOffset[Ye.id] = t.value;
        });
        break;
      default:
        console.info("worklet:", t);
    }
  }
  function Ds(t) {
    vt = t, js((e) => {
      e.channelToRecord[Ye.id] = t;
    }), Qe({
      command: "set channel to record",
      channel: t
    }), hn();
  }
  function It(t, e) {
    t !== null && Ut((n) => {
      const r = n.layers.find((s) => s.id === t);
      r && e(r);
    });
  }
  const Re = document.getElementById("canvas"), q = Re.getContext("2d");
  Us();
  function Us() {
    if (Re.width = innerWidth, Re.height = innerHeight, devicePixelRatio !== 1) {
      const t = Re.width, e = Re.height;
      Re.width = t * devicePixelRatio, Re.height = e * devicePixelRatio, Re.style.width = t + "px", Re.style.height = e + "px", q.scale(devicePixelRatio, devicePixelRatio);
    }
  }
  window.addEventListener("resize", Us);
  let Vn = false;
  function Fa(t) {
    switch (t.key) {
      case " ":
        Vn || (Vn = true, wr());
        break;
      case "Backspace":
        Ha();
        break;
      case "d":
        Na();
        break;
      case "s":
        za();
        break;
      case "m":
        Wa();
        break;
      case "b":
        Va();
        break;
      case "Shift":
        $s("down");
        break;
      case "Control":
        Ps("down");
        break;
      case "ArrowUp":
      case "ArrowDown":
        Ka(t.key === "ArrowUp" ? 1 : -1);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        vt = Math.max(0, Math.min(vt + (t.key === "ArrowLeft" ? -1 : 1), Ye.numChannels - 1)), Ds(vt);
        break;
      case "h":
        tc();
        break;
    }
  }
  function La(t) {
    switch (t.key) {
      case " ":
        Vn = false;
        break;
      case "Shift":
        $s("up");
        break;
      case "Control":
        Ps("up");
        break;
    }
  }
  let Yt = false;
  function wr() {
    Yt ? (Qe({
      command: "stop recording"
    }), Yt = false, Jn("stopped recording", "#888")) : (Qe({
      command: "start recording"
    }), Yt = true, Jn("recording...", "red")), hn();
  }
  function Ha() {
    const t = nt();
    t !== null && Ut((e) => {
      const n = e.layers.findIndex((r) => r.id === t);
      n >= 0 && e.layers.splice(n, 1);
    });
  }
  function Na() {
    const t = nt();
    t !== null && Ut((e) => {
      const n = e.layers.findIndex((s) => s.id === t);
      if (n < 0) return;
      const r = e.layers[n];
      e.layers.splice(n, 0, {
        ...r,
        id: Math.random()
      });
    });
  }
  function za() {
    It(nt(), (t) => {
      t.soloed = !t.soloed;
    });
  }
  function Wa() {
    It(nt(), (t) => {
      t.muted = !t.muted;
    });
  }
  function Va() {
    It(nt(), (t) => {
      t.backwards = !t.backwards;
    });
  }
  let xt = null, Kn = false;
  function Ps(t) {
    if (t === "up") {
      Kn = false, xt = null;
      return;
    }
    if (xe.x >= innerWidth - Gn) {
      Kn = true, Fs();
      return;
    }
    const e = nt();
    if (e === null) {
      xt = null;
      return;
    }
    const n = Se.shared.layers.find((r) => r.id === e);
    xt = {
      id: e,
      origGain: n.gain,
      origPos: {
        ...xe
      }
    };
  }
  let St = null;
  function $s(t) {
    if (t === "up") {
      St = null;
      return;
    }
    const e = nt();
    if (e === null) {
      St = null;
      return;
    }
    const n = Se.shared.layers.find((r) => r.id === e);
    St = {
      id: e,
      origOffset: n.frameOffset,
      origPos: {
        ...xe
      }
    };
  }
  function Ka(t) {
    Qe({
      command: "change latency offset",
      by: t
    });
  }
  const xe = {
    x: 0,
    y: 0
  };
  let vr = false;
  function Ga(t) {
    if (t.y >= innerHeight - Sr) {
      wr();
      return;
    }
    Ue !== null && (vr = true, Bs());
  }
  function Ja(t) {
    vr = false;
  }
  function qa(t) {
    if (xe.x = t.x, xe.y = t.y, vr && Bs(), Kn && Fs(), xt !== null) {
      const { id: e, origPos: n, origGain: r } = xt;
      It(e, (s) => {
        const i = -(xe.y - n.y);
        s.gain = Math.max(0, Math.min(r + i / xr, 2));
      });
    }
    if (St !== null) {
      const { id: e, origPos: n, origOffset: r } = St;
      It(e, (s) => {
        const i = xe.x - n.x;
        s.frameOffset = Math.round(r + i / Ne);
      });
    }
  }
  function Bs() {
    const t = Math.max(0, Math.min(Math.round((xe.x - kt) / Ne), Ue - 1));
    Qe({
      command: "move playhead",
      value: t
    });
  }
  function Fs() {
    Se.masterGain = (innerHeight - xe.y) / innerHeight, Qe({
      command: "set master gain",
      value: Se.masterGain
    });
  }
  function nt() {
    for (const t of Se.shared.layers) {
      const { topY: e, bottomY: n } = Ls(t);
      if (e <= xe.y && xe.y <= n) return t.id;
    }
    return null;
  }
  const Qr = /* @__PURE__ */ new Map();
  function Ls(t) {
    let e = Qr.get(t.id);
    if (e) return e;
    const n = new Float32Array(t.samples.buffer), r = [];
    let s = 0, i = 0;
    for (; i < n.length; ) {
      let o = 0;
      for (let a = 0; a < Nn; a++) for (let c = 0; c < t.numChannels; c++) {
        if (i > n.length) throw new Error("uh-oh: not enough samples in layer w/ id " + t.id);
        o = Math.max(o, Math.abs(n[i++]));
      }
      r.push(o), s = Math.max(s, o);
    }
    return e = {
      maxAmplitudesInChunks: r,
      maxAmplitudeInLayer: s,
      gainNubbinCenterPosition: {
        x: 0,
        y: 0
      },
      topY: 0,
      bottomY: 0
    }, Qr.set(t.id, e), e;
  }
  const kt = 100, Hs = 30, Gn = 10;
  let Ue = null, Ne = 1, je = 32, xr = je / 2;
  function Ya() {
    q.clearRect(0, 0, innerWidth, innerHeight), je = Hs, xr = Math.ceil(je / 2), Ue = Da(Se.shared.layers), Ue !== null && (Ne = (innerWidth - 2 * kt) / Ue), Xa(), Za(), ec(), Qa();
  }
  function Xa() {
    if (Ue === null) return;
    let t = Hs;
    const e = kt, n = e + Ue * Ne;
    for (const s of Se.shared.layers) {
      const i = Ls(s), o = s.muted ? 0.25 : 1, a = s.soloed ? "50, 75, 117" : "100, 149, 237", c = `rgba(${a}, ${o})`;
      q.strokeStyle = c, q.lineWidth = Nn * Ne;
      let f = t, u = e + (s.frameOffset + Ue) % Ue * Ne;
      for (let l = 0; l < i.maxAmplitudesInChunks.length; l++) {
        u >= n && (u = e, f += je);
        const b = i.maxAmplitudesInChunks[s.backwards ? i.maxAmplitudesInChunks.length - l - 1 : l] / i.maxAmplitudeInLayer * je / 2 * s.gain;
        q.beginPath(), q.moveTo(u, f - b / 2), q.lineTo(u, f + b / 2), q.stroke(), u += Nn * Ne;
      }
      const d = kt / 2, _ = (t + f) / 2;
      i.gainNubbinCenterPosition = {
        x: d,
        y: _
      }, i.topY = t - je / 2, i.bottomY = f + je / 2, q.fillStyle = `rgba(${a}, ${o / 4})`, q.beginPath(), q.arc(d, _, s.gain * xr, 0, 2 * Math.PI), q.fill(), t = f + je * 1.15;
    }
    const r = kt + Se.playhead * Ne;
    q.strokeStyle = "#999", q.lineWidth = 4, q.beginPath(), q.moveTo(r, je), q.lineTo(r, t), q.stroke();
  }
  function hn() {
    Ws(), Yt ? ee({
      color: "cornflowerblue",
      text: "SPACE"
    }, " to ", {
      color: "#888",
      text: "\u25A0"
    }) : ee({
      color: "cornflowerblue",
      text: "SPACE"
    }, " to ", {
      color: "red",
      text: "\u25CF"
    }, ` channel ${vt}`), ee({
      color: "cornflowerblue",
      text: "H"
    }, " for help");
  }
  function Za() {
    const t = Se.masterGain * innerHeight;
    q.fillStyle = "rgba(100, 149, 237, .25)", q.fillRect(innerWidth - Gn, innerHeight - t, Gn, t), q.fill();
  }
  let sn = "", Ns = "cornflowerblue", es = 0;
  const zs = 40, Sr = 40;
  function Jn(t, e = "cornflowerblue", n = 3e3) {
    sn = t, Ns = e, es = Date.now() + n, setTimeout(() => {
      Date.now() >= es && (sn = "");
    }, n);
  }
  function Qa() {
    q.font = "20px Monaco", q.fillStyle = Ns;
    const t = q.measureText(sn).width;
    q.fillText(sn, innerWidth - zs - t, innerHeight - Sr);
  }
  const kr = [];
  function ee(...t) {
    kr.unshift(t);
  }
  function Ws() {
    kr.length = 0;
  }
  function ec() {
    q.font = "20px Monaco";
    let t = innerHeight - Sr;
    const e = zs;
    for (const n of kr) {
      let r = e;
      for (const s of n) {
        const i = typeof s == "string" ? s : s.text;
        q.fillStyle = typeof s == "string" ? "black" : s.color, q.fillText(i, r, t), r += q.measureText(i).width;
      }
      t -= 25;
    }
  }
  let En = false;
  function tc() {
    En ? hn() : nc(), En = !En;
  }
  function nc() {
    Ws(), ee("To start recording a new layer, press ", t("SPACE"), "."), ee("To stop recording, press ", t("SPACE"), " again."), ee(""), ee("If you point at a layer,"), ee("- hold down ", t("SHIFT"), " and move mouse left/right to slide layer in time"), ee("- hold down ", t("CONTROL"), " and move mouse up/down to change the layer's gain (louder/softer)"), ee("- press ", t("BACKSPACE"), " to delete the layer"), ee("- press ", t("M"), " to toggle mute"), ee("- press ", t("S"), " to toggle solo"), ee("- press ", t("B"), " to toggle backwards"), ee("- press ", t("D"), " to duplicate the layer"), ee(""), ee("The blue bar at the right margin is the master volume slider."), ee("Point at it, hold down ", t("CONTROL"), " and move mouse up/down to adjust it."), ee(), ee("Press ", t("LEFT"), "/", t("RIGHT"), " to change the channel you're recording from."), ee(), ee("Press ", t("UP"), "/", t("DOWN"), " to adjust the latency offset."), ee("(The right setting depends on your input device and computer -- see what works best!)"), ee(), ee("Press ", t("H"), " to make this help go away.");
    function t(e) {
      return {
        color: "cornflowerblue",
        text: e
      };
    }
  }
  const rc = "" + new URL("worklet-C8D1e_cw.js", import.meta.url).href, ze = Symbol.for("_am_meta"), dt = Symbol.for("_am_trace"), lt = Symbol.for("_am_objectId"), _n = Symbol.for("_am_isProxy"), Vs = Symbol.for("_am_clearCache"), sc = Symbol.for("_am_uint"), ic = Symbol.for("_am_int"), oc = Symbol.for("_am_f64"), Ks = Symbol.for("_am_counter"), ac = Symbol.for("_am_text");
  class $e {
    constructor(e) {
      if (typeof e == "string") this.elems = [
        ...e
      ];
      else if (Array.isArray(e)) this.elems = e;
      else if (e === void 0) this.elems = [];
      else throw new TypeError(`Unsupported initial value for Text: ${e}`);
      Reflect.defineProperty(this, ac, {
        value: true
      });
    }
    get length() {
      return this.elems.length;
    }
    get(e) {
      return this.elems[e];
    }
    [Symbol.iterator]() {
      const e = this.elems;
      let n = -1;
      return {
        next() {
          return n += 1, n < e.length ? {
            done: false,
            value: e[n]
          } : {
            done: true
          };
        }
      };
    }
    toString() {
      if (!this.str) {
        this.str = "";
        for (const e of this.elems) typeof e == "string" ? this.str += e : this.str += "\uFFFC";
      }
      return this.str;
    }
    toSpans() {
      if (!this.spans) {
        this.spans = [];
        let e = "";
        for (const n of this.elems) typeof n == "string" ? e += n : (e.length > 0 && (this.spans.push(e), e = ""), this.spans.push(n));
        e.length > 0 && this.spans.push(e);
      }
      return this.spans;
    }
    toJSON() {
      return this.toString();
    }
    set(e, n) {
      if (this[ze]) throw new RangeError("object cannot be modified outside of a change block");
      this.elems[e] = n;
    }
    insertAt(e, ...n) {
      if (this[ze]) throw new RangeError("object cannot be modified outside of a change block");
      n.every((r) => typeof r == "string") ? this.elems.splice(e, 0, ...n.join("")) : this.elems.splice(e, 0, ...n);
    }
    deleteAt(e, n = 1) {
      if (this[ze]) throw new RangeError("object cannot be modified outside of a change block");
      this.elems.splice(e, n);
    }
    map(e) {
      this.elems.map(e);
    }
    lastIndexOf(e, n) {
      this.elems.lastIndexOf(e, n);
    }
    concat(e) {
      return new $e(this.elems.concat(e.elems));
    }
    every(e) {
      return this.elems.every(e);
    }
    filter(e) {
      return new $e(this.elems.filter(e));
    }
    find(e) {
      return this.elems.find(e);
    }
    findIndex(e) {
      return this.elems.findIndex(e);
    }
    forEach(e) {
      this.elems.forEach(e);
    }
    includes(e) {
      return this.elems.includes(e);
    }
    indexOf(e) {
      return this.elems.indexOf(e);
    }
    join(e) {
      return this.elems.join(e);
    }
    reduce(e) {
      this.elems.reduce(e);
    }
    reduceRight(e) {
      this.elems.reduceRight(e);
    }
    slice(e, n) {
      return new $e(this.elems.slice(e, n));
    }
    some(e) {
      return this.elems.some(e);
    }
    toLocaleString() {
      this.toString();
    }
  }
  class qn {
    constructor(e) {
      this.value = e || 0, Reflect.defineProperty(this, Ks, {
        value: true
      });
    }
    valueOf() {
      return this.value;
    }
    toString() {
      return this.valueOf().toString();
    }
    toJSON() {
      return this.value;
    }
    increment(e) {
      throw new Error("Counters should not be incremented outside of a change callback");
    }
    decrement(e) {
      throw new Error("Counters should not be decremented outside of a change callback");
    }
  }
  class cc extends qn {
    constructor(e, n, r, s, i) {
      super(e), this.context = n, this.path = r, this.objectId = s, this.key = i;
    }
    increment(e) {
      return e = typeof e == "number" ? e : 1, this.context.increment(this.objectId, this.key, e), this.value += e, this.value;
    }
    decrement(e) {
      return this.increment(typeof e == "number" ? -e : -1);
    }
  }
  function fc(t, e, n, r, s) {
    return new cc(t, e, n, r, s);
  }
  class Yn {
    constructor(e) {
      this.val = e;
    }
    toString() {
      return this.val;
    }
    toJSON() {
      return this.val;
    }
  }
  function Ce(t) {
    if (typeof t == "string" && /^[0-9]+$/.test(t) && (t = parseInt(t, 10)), typeof t != "number") return t;
    if (t < 0 || isNaN(t) || t === 1 / 0 || t === -1 / 0) throw new RangeError("A list index must be positive, but you passed " + t);
    return t;
  }
  function pe(t, e) {
    const { context: n, objectId: r, path: s, textV2: i } = t, o = n.getWithType(r, e);
    if (o === null) return;
    const a = o[0], c = o[1];
    switch (a) {
      case void 0:
        return;
      case "map":
        return Pt(n, c, i, [
          ...s,
          e
        ]);
      case "list":
        return pn(n, c, i, [
          ...s,
          e
        ]);
      case "text":
        return i ? n.text(c) : Ct(n, c, [
          ...s,
          e
        ]);
      case "str":
        return c;
      case "uint":
        return c;
      case "int":
        return c;
      case "f64":
        return c;
      case "boolean":
        return c;
      case "null":
        return null;
      case "bytes":
        return c;
      case "timestamp":
        return c;
      case "counter":
        return fc(c, n, s, r, e);
      default:
        throw RangeError(`datatype ${a} unimplemented`);
    }
  }
  function on(t, e, n, r) {
    const s = typeof t;
    switch (s) {
      case "object":
        if (t == null) return [
          null,
          "null"
        ];
        if (t[sc]) return [
          t.value,
          "uint"
        ];
        if (t[ic]) return [
          t.value,
          "int"
        ];
        if (t[oc]) return [
          t.value,
          "f64"
        ];
        if (t[Ks]) return [
          t.value,
          "counter"
        ];
        if (t instanceof Date) return [
          t.getTime(),
          "timestamp"
        ];
        if (t instanceof Yn) return [
          t.toString(),
          "str"
        ];
        if (t instanceof $e) return [
          t,
          "text"
        ];
        if (t instanceof Uint8Array) return [
          t,
          "bytes"
        ];
        if (t instanceof Array) return [
          t,
          "list"
        ];
        if (Object.prototype.toString.call(t) === "[object Object]") return [
          t,
          "map"
        ];
        throw gn(t, r) ? new RangeError("Cannot create a reference to an existing document object") : new RangeError(`Cannot assign unknown object: ${t}`);
      case "boolean":
        return [
          t,
          "boolean"
        ];
      case "number":
        return Number.isInteger(t) ? [
          t,
          "int"
        ] : [
          t,
          "f64"
        ];
      case "string":
        return e ? [
          t,
          "text"
        ] : [
          t,
          "str"
        ];
      case "undefined":
        throw new RangeError([
          `Cannot assign undefined value at ${ts(n)}, `,
          "because `undefined` is not a valid JSON data type. ",
          "You might consider setting the property's value to `null`, ",
          "or using `delete` to remove it altogether."
        ].join(""));
      default:
        throw new RangeError([
          `Cannot assign ${s} value at ${ts(n)}. `,
          "All JSON primitive datatypes (object, array, string, number, boolean, null) ",
          `are supported in an Automerge document; ${s} values are not. `
        ].join(""));
    }
  }
  function gn(t, e) {
    var n, r;
    return t instanceof Date ? false : !!(t && ((r = (n = t[ze]) === null || n === void 0 ? void 0 : n.handle) === null || r === void 0 ? void 0 : r.__wbg_ptr) === e.__wbg_ptr);
  }
  const uc = {
    get(t, e) {
      const { context: n, objectId: r, cache: s } = t;
      return e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === lt ? r : e === _n ? true : e === dt ? t.trace : e === ze ? {
        handle: n,
        textV2: t.textV2
      } : (s[e] || (s[e] = pe(t, e)), s[e]);
    },
    set(t, e, n) {
      const { context: r, objectId: s, path: i, textV2: o } = t;
      if (t.cache = {}, gn(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
      if (e === dt) return t.trace = n, true;
      if (e === Vs) return true;
      const [a, c] = on(n, o, [
        ...i,
        e
      ], r);
      switch (c) {
        case "list": {
          const f = r.putObject(s, e, []), u = pn(r, f, o, [
            ...i,
            e
          ]);
          for (let d = 0; d < a.length; d++) u[d] = a[d];
          break;
        }
        case "text": {
          if (o) an(a), r.putObject(s, e, a);
          else {
            Er(a);
            const f = r.putObject(s, e, "");
            Ct(r, f, [
              ...i,
              e
            ]).splice(0, 0, ...a);
          }
          break;
        }
        case "map": {
          const f = r.putObject(s, e, {}), u = Pt(r, f, o, [
            ...i,
            e
          ]);
          for (const d in a) u[d] = a[d];
          break;
        }
        default:
          r.put(s, e, a, c);
      }
      return true;
    },
    deleteProperty(t, e) {
      const { context: n, objectId: r } = t;
      return t.cache = {}, n.delete(r, e), true;
    },
    has(t, e) {
      return this.get(t, e) !== void 0;
    },
    getOwnPropertyDescriptor(t, e) {
      const n = this.get(t, e);
      if (typeof n < "u") return {
        configurable: true,
        enumerable: true,
        value: n
      };
    },
    ownKeys(t) {
      const { context: e, objectId: n } = t, r = e.keys(n);
      return [
        ...new Set(r)
      ];
    }
  }, Gs = {
    get(t, e) {
      const { context: n, objectId: r } = t;
      return e = Ce(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === lt ? r : e === _n ? true : e === dt ? t.trace : e === ze ? {
        handle: n
      } : e === "length" ? n.length(r) : typeof e == "number" ? pe(t, e) : Ar(t)[e];
    },
    set(t, e, n) {
      const { context: r, objectId: s, path: i, textV2: o } = t;
      if (e = Ce(e), gn(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
      if (e === Vs) return true;
      if (e === dt) return t.trace = n, true;
      if (typeof e == "string") throw new RangeError("list index must be a number");
      const [a, c] = on(n, o, [
        ...i,
        e
      ], r);
      switch (c) {
        case "list": {
          let f;
          e >= r.length(s) ? f = r.insertObject(s, e, []) : f = r.putObject(s, e, []), pn(r, f, o, [
            ...i,
            e
          ]).splice(0, 0, ...a);
          break;
        }
        case "text": {
          if (o) an(a), e >= r.length(s) ? r.insertObject(s, e, a) : r.putObject(s, e, a);
          else {
            let f;
            Er(a), e >= r.length(s) ? f = r.insertObject(s, e, "") : f = r.putObject(s, e, ""), Ct(r, f, [
              ...i,
              e
            ]).splice(0, 0, ...a);
          }
          break;
        }
        case "map": {
          let f;
          e >= r.length(s) ? f = r.insertObject(s, e, {}) : f = r.putObject(s, e, {});
          const u = Pt(r, f, o, [
            ...i,
            e
          ]);
          for (const d in a) u[d] = a[d];
          break;
        }
        default:
          e >= r.length(s) ? r.insert(s, e, a, c) : r.put(s, e, a, c);
      }
      return true;
    },
    deleteProperty(t, e) {
      const { context: n, objectId: r } = t;
      e = Ce(e);
      const s = n.get(r, e);
      if (s != null && s[0] == "counter") throw new TypeError("Unsupported operation: deleting a counter from a list");
      return n.delete(r, e), true;
    },
    has(t, e) {
      const { context: n, objectId: r } = t;
      return e = Ce(e), typeof e == "number" ? e < n.length(r) : e === "length";
    },
    getOwnPropertyDescriptor(t, e) {
      const { context: n, objectId: r } = t;
      return e === "length" ? {
        writable: true,
        value: n.length(r)
      } : e === lt ? {
        configurable: false,
        enumerable: false,
        value: r
      } : (e = Ce(e), {
        configurable: true,
        enumerable: true,
        value: pe(t, e)
      });
    },
    getPrototypeOf(t) {
      return Object.getPrototypeOf(t);
    },
    ownKeys() {
      const t = [];
      return t.push("length"), t;
    }
  }, dc = Object.assign({}, Gs, {
    get(t, e) {
      const { context: n, objectId: r } = t;
      return e = Ce(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === lt ? r : e === _n ? true : e === dt ? t.trace : e === ze ? {
        handle: n
      } : e === "length" ? n.length(r) : typeof e == "number" ? pe(t, e) : hc(t)[e] || Ar(t)[e];
    },
    getPrototypeOf() {
      return Object.getPrototypeOf(new $e());
    }
  });
  function Pt(t, e, n, r) {
    const s = {
      context: t,
      objectId: e,
      path: r || [],
      cache: {},
      textV2: n
    }, i = {};
    return Object.assign(i, s), new Proxy(i, uc);
  }
  function pn(t, e, n, r) {
    const s = {
      context: t,
      objectId: e,
      path: r || [],
      cache: {},
      textV2: n
    }, i = [];
    return Object.assign(i, s), new Proxy(i, Gs);
  }
  function Ct(t, e, n) {
    const r = {
      context: t,
      objectId: e,
      path: n || [],
      cache: {},
      textV2: false
    }, s = {};
    return Object.assign(s, r), new Proxy(s, dc);
  }
  function lc(t, e) {
    return Pt(t, "_root", e, []);
  }
  function Ar(t) {
    const { context: e, objectId: n, path: r, textV2: s } = t;
    return {
      deleteAt(o, a) {
        return typeof a == "number" ? e.splice(n, o, a) : e.delete(n, o), this;
      },
      fill(o, a, c) {
        const [f, u] = on(o, s, [
          ...r,
          a
        ], e), d = e.length(n);
        a = Ce(a || 0), c = Ce(c || d);
        for (let _ = a; _ < Math.min(c, d); _++) if (u === "list" || u === "map") e.putObject(n, _, f);
        else if (u === "text") if (s) an(f), e.putObject(n, _, f);
        else {
          Er(f);
          const l = e.putObject(n, _, ""), b = Ct(e, l, [
            ...r,
            _
          ]);
          for (let v = 0; v < f.length; v++) b[v] = f.get(v);
        }
        else e.put(n, _, f, u);
        return this;
      },
      indexOf(o, a = 0) {
        const c = e.length(n);
        for (let f = a; f < c; f++) {
          const u = e.getWithType(n, f);
          if (u && (u[1] === o[lt] || u[1] === o)) return f;
        }
        return -1;
      },
      insertAt(o, ...a) {
        return this.splice(o, 0, ...a), this;
      },
      pop() {
        const o = e.length(n);
        if (o == 0) return;
        const a = pe(t, o - 1);
        return e.delete(n, o - 1), a;
      },
      push(...o) {
        const a = e.length(n);
        return this.splice(a, 0, ...o), e.length(n);
      },
      shift() {
        if (e.length(n) == 0) return;
        const o = pe(t, 0);
        return e.delete(n, 0), o;
      },
      splice(o, a, ...c) {
        o = Ce(o), typeof a != "number" && (a = e.length(n) - o), a = Ce(a);
        for (const d of c) if (gn(d, e)) throw new RangeError("Cannot create a reference to an existing document object");
        const f = [];
        for (let d = 0; d < a; d++) {
          const _ = pe(t, o);
          _ !== void 0 && f.push(_), e.delete(n, o);
        }
        const u = c.map((d, _) => {
          try {
            return on(d, s, [
              ...r
            ], e);
          } catch (l) {
            throw l instanceof RangeError ? new RangeError(`${l.message} (at index ${_} in the input)`) : l;
          }
        });
        for (const [d, _] of u) {
          switch (_) {
            case "list": {
              const l = e.insertObject(n, o, []);
              pn(e, l, s, [
                ...r,
                o
              ]).splice(0, 0, ...d);
              break;
            }
            case "text": {
              if (s) an(d), e.insertObject(n, o, d);
              else {
                const l = e.insertObject(n, o, "");
                Ct(e, l, [
                  ...r,
                  o
                ]).splice(0, 0, ...d);
              }
              break;
            }
            case "map": {
              const l = e.insertObject(n, o, {}), b = Pt(e, l, s, [
                ...r,
                o
              ]);
              for (const v in d) b[v] = d[v];
              break;
            }
            default:
              e.insert(n, o, d, _);
          }
          o += 1;
        }
        return f;
      },
      unshift(...o) {
        return this.splice(0, 0, ...o), e.length(n);
      },
      entries() {
        let o = 0;
        return {
          next: () => {
            const c = pe(t, o);
            return c === void 0 ? {
              value: void 0,
              done: true
            } : {
              value: [
                o++,
                c
              ],
              done: false
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      keys() {
        let o = 0;
        const a = e.length(n);
        return {
          next: () => o < a ? {
            value: o++,
            done: false
          } : {
            value: void 0,
            done: true
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      values() {
        let o = 0;
        return {
          next: () => {
            const c = pe(t, o++);
            return c === void 0 ? {
              value: void 0,
              done: true
            } : {
              value: c,
              done: false
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      toArray() {
        const o = [];
        let a;
        do
          a = pe(t, o.length), a !== void 0 && o.push(a);
        while (a !== void 0);
        return o;
      },
      map(o) {
        return this.toArray().map(o);
      },
      toString() {
        return this.toArray().toString();
      },
      toLocaleString() {
        return this.toArray().toLocaleString();
      },
      forEach(o) {
        return this.toArray().forEach(o);
      },
      concat(o) {
        return this.toArray().concat(o);
      },
      every(o) {
        return this.toArray().every(o);
      },
      filter(o) {
        return this.toArray().filter(o);
      },
      find(o) {
        let a = 0;
        for (const c of this) {
          if (o(c, a)) return c;
          a += 1;
        }
      },
      findIndex(o) {
        let a = 0;
        for (const c of this) {
          if (o(c, a)) return a;
          a += 1;
        }
        return -1;
      },
      includes(o) {
        return this.find((a) => a === o) !== void 0;
      },
      join(o) {
        return this.toArray().join(o);
      },
      reduce(o, a) {
        return this.toArray().reduce(o, a);
      },
      reduceRight(o, a) {
        return this.toArray().reduceRight(o, a);
      },
      lastIndexOf(o, a = 1 / 0) {
        return this.toArray().lastIndexOf(o, a);
      },
      slice(o, a) {
        return this.toArray().slice(o, a);
      },
      some(o) {
        let a = 0;
        for (const c of this) {
          if (o(c, a)) return true;
          a += 1;
        }
        return false;
      },
      [Symbol.iterator]: function* () {
        let o = 0, a = pe(t, o);
        for (; a !== void 0; ) yield a, o += 1, a = pe(t, o);
      }
    };
  }
  function hc(t) {
    const { context: e, objectId: n } = t;
    return {
      set(s, i) {
        return this[s] = i;
      },
      get(s) {
        return this[s];
      },
      toString() {
        return e.text(n).replace(/￼/g, "");
      },
      toSpans() {
        const s = [];
        let i = "";
        const o = e.length(n);
        for (let a = 0; a < o; a++) {
          const c = this[a];
          typeof c == "string" ? i += c : (i.length > 0 && (s.push(i), i = ""), s.push(c));
        }
        return i.length > 0 && s.push(i), s;
      },
      toJSON() {
        return this.toString();
      },
      indexOf(s, i = 0) {
        return e.text(n).indexOf(s, i);
      },
      insertAt(s, ...i) {
        i.every((o) => typeof o == "string") ? e.splice(n, s, 0, i.join("")) : Ar(t).insertAt(s, ...i);
      }
    };
  }
  function Er(t) {
    if (!(t instanceof $e)) throw new Error("value was not a Text instance");
  }
  function an(t) {
    if (typeof t != "string") throw new Error("value was not a string");
  }
  function ts(t) {
    const e = t.map((n) => {
      if (typeof n == "number") return n.toString();
      if (typeof n == "string") return n.replace(/~/g, "~0").replace(/\//g, "~1");
    });
    return t.length === 0 ? "" : "/" + e.join("/");
  }
  let Lt;
  const _c = new Uint8Array(16);
  function gc() {
    if (!Lt && (Lt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Lt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return Lt(_c);
  }
  const pc = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function yn(t) {
    return typeof t == "string" && pc.test(t);
  }
  const oe = [];
  for (let t = 0; t < 256; ++t) oe.push((t + 256).toString(16).slice(1));
  function Js(t, e = 0) {
    return oe[t[e + 0]] + oe[t[e + 1]] + oe[t[e + 2]] + oe[t[e + 3]] + "-" + oe[t[e + 4]] + oe[t[e + 5]] + "-" + oe[t[e + 6]] + oe[t[e + 7]] + "-" + oe[t[e + 8]] + oe[t[e + 9]] + "-" + oe[t[e + 10]] + oe[t[e + 11]] + oe[t[e + 12]] + oe[t[e + 13]] + oe[t[e + 14]] + oe[t[e + 15]];
  }
  function yc(t, e = 0) {
    const n = Js(t, e);
    if (!yn(n)) throw TypeError("Stringified UUID is invalid");
    return n;
  }
  function bc(t) {
    if (!yn(t)) throw TypeError("Invalid UUID");
    let e;
    const n = new Uint8Array(16);
    return n[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24, n[1] = e >>> 16 & 255, n[2] = e >>> 8 & 255, n[3] = e & 255, n[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8, n[5] = e & 255, n[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8, n[7] = e & 255, n[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8, n[9] = e & 255, n[10] = (e = parseInt(t.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = e / 4294967296 & 255, n[12] = e >>> 24 & 255, n[13] = e >>> 16 & 255, n[14] = e >>> 8 & 255, n[15] = e & 255, n;
  }
  const mc = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ns = {
    randomUUID: mc
  };
  function qs(t, e, n) {
    if (ns.randomUUID && !e && !t) return ns.randomUUID();
    t = t || {};
    const r = t.random || (t.rng || gc)();
    if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
      n = n || 0;
      for (let s = 0; s < 16; ++s) e[n + s] = r[s];
      return e;
    }
    return Js(r);
  }
  let Ys;
  const Xs = new Array(128).fill(void 0);
  Xs.push(void 0, null, true, false);
  Xs.length;
  const In = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
    encode: () => {
      throw Error("TextEncoder not available");
    }
  };
  In.encodeInto;
  const wc = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  }) : {
    decode: () => {
      throw Error("TextDecoder not available");
    }
  };
  typeof TextDecoder < "u" && wc.decode();
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => Ys.__wbg_automerge_free(t >>> 0));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => Ys.__wbg_syncstate_free(t >>> 0));
  let vc = [];
  function xc(t) {
    for (const e in t) le[e] = t[e];
    for (const e of vc) e();
  }
  const le = {
    create(t) {
      throw new RangeError("Automerge.use() not called");
    },
    load(t, e) {
      throw new RangeError("Automerge.use() not called (load)");
    },
    encodeChange(t) {
      throw new RangeError("Automerge.use() not called (encodeChange)");
    },
    decodeChange(t) {
      throw new RangeError("Automerge.use() not called (decodeChange)");
    },
    initSyncState() {
      throw new RangeError("Automerge.use() not called (initSyncState)");
    },
    encodeSyncMessage(t) {
      throw new RangeError("Automerge.use() not called (encodeSyncMessage)");
    },
    decodeSyncMessage(t) {
      throw new RangeError("Automerge.use() not called (decodeSyncMessage)");
    },
    encodeSyncState(t) {
      throw new RangeError("Automerge.use() not called (encodeSyncState)");
    },
    decodeSyncState(t) {
      throw new RangeError("Automerge.use() not called (decodeSyncState)");
    },
    exportSyncState(t) {
      throw new RangeError("Automerge.use() not called (exportSyncState)");
    },
    importSyncState(t) {
      throw new RangeError("Automerge.use() not called (importSyncState)");
    }
  };
  function ce(t, e = true) {
    if (typeof t != "object") throw new RangeError("must be the document root");
    const n = Reflect.get(t, ze);
    if (n === void 0 || n == null || e && Sc(t) !== "_root") throw new RangeError("must be the document root");
    return n;
  }
  function Zs(t) {
    return Reflect.get(t, dt);
  }
  function Sc(t) {
    return typeof t != "object" || t === null ? null : Reflect.get(t, lt);
  }
  function bn(t) {
    return !!Reflect.get(t, _n);
  }
  var kc = function(t, e) {
    var n = {};
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, r = Object.getOwnPropertySymbols(t); s < r.length; s++) e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (n[r[s]] = t[r[s]]);
    return n;
  };
  function Ir(t) {
    return typeof t == "object" ? t : {
      actor: t
    };
  }
  function Cr(t) {
    const e = Ir(t), n = !!e.freeze, r = e.patchCallback, s = !e.enableTextV2, i = e.actor, o = le.create({
      actor: i,
      text_v1: s
    });
    o.enableFreeze(!!e.freeze);
    const a = e.enableTextV2 || false;
    return ri(o, a), o.materialize("/", void 0, {
      handle: o,
      heads: void 0,
      freeze: n,
      patchCallback: r,
      textV2: a
    });
  }
  function Ac(t, e) {
    const n = ce(t), r = n.heads, s = Ir(e), i = n.handle.fork(s.actor, r);
    i.updateDiffCursor();
    const o = kc(n, [
      "heads"
    ]);
    return o.patchCallback = s.patchCallback, i.applyPatches(t, Object.assign(Object.assign({}, o), {
      handle: i
    }));
  }
  function Ec(t, e) {
    return Tt(Cr(e), "from", {}, (n) => Object.assign(n, t)).newDoc;
  }
  function Ic(t, e, n) {
    if (typeof e == "function") return Tt(t, "change", {}, e).newDoc;
    if (typeof n == "function") return typeof e == "string" && (e = {
      message: e
    }), Tt(t, "change", e, n).newDoc;
    throw RangeError("Invalid args for change");
  }
  function Cc(t, e, n, r) {
    if (typeof n == "function") return Tt(t, "changeAt", {}, n, e);
    if (typeof r == "function") return typeof n == "string" && (n = {
      message: n
    }), Tt(t, "changeAt", n, r, e);
    throw RangeError("Invalid args for changeAt");
  }
  function $t(t, e, n, r) {
    if (n == null) return t;
    const s = ce(t), i = Object.assign(Object.assign({}, s), {
      heads: void 0
    }), { value: o, patches: a } = s.handle.applyAndReturnPatches(t, i);
    if (a.length > 0) {
      r == null ? void 0 : r(a, {
        before: t,
        after: o,
        source: e
      });
      const c = ce(o);
      c.mostRecentPatch = {
        before: ce(t).heads,
        after: c.handle.getHeads(),
        patches: a
      };
    }
    return s.heads = n, o;
  }
  function Tt(t, e, n, r, s) {
    if (typeof r != "function") throw new RangeError("invalid change function");
    const i = ce(t);
    if (t === void 0 || i === void 0) throw new RangeError("must be the document root");
    if (i.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (bn(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    let o = i.handle.getHeads();
    s && jc(s, o) && (s = void 0), s && (i.handle.isolate(s), o = s), "time" in n || (n.time = Math.floor(Date.now() / 1e3));
    try {
      i.heads = o;
      const a = lc(i.handle, i.textV2);
      if (r(a), i.handle.pendingOps() === 0) return i.heads = void 0, s && i.handle.integrate(), {
        newDoc: t,
        newHeads: null
      };
      {
        const c = i.handle.commit(n.message, n.time);
        return i.handle.integrate(), {
          newDoc: $t(t, e, o, n.patchCallback || i.patchCallback),
          newHeads: c != null ? [
            c
          ] : null
        };
      }
    } catch (a) {
      throw i.heads = void 0, i.handle.rollback(), a;
    }
  }
  function Tc(t, e) {
    e === void 0 && (e = {}), typeof e == "string" && (e = {
      message: e
    }), "time" in e || (e.time = Math.floor(Date.now() / 1e3));
    const n = ce(t);
    if (n.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (bn(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const r = n.handle.getHeads();
    return n.handle.emptyChange(e.message, e.time), $t(t, "emptyChange", r);
  }
  function Oc(t, e) {
    const n = Ir(e), r = n.actor, s = n.patchCallback, i = !n.enableTextV2, o = n.unchecked || false, a = n.allowMissingChanges || false, c = n.convertRawStringsToText || false, f = le.load(t, {
      text_v1: i,
      actor: r,
      unchecked: o,
      allowMissingDeps: a,
      convertRawStringsToText: c
    });
    f.enableFreeze(!!n.freeze);
    const u = n.enableTextV2 || false;
    return ri(f, u), f.materialize("/", void 0, {
      handle: f,
      heads: void 0,
      patchCallback: s,
      textV2: u
    });
  }
  function Qs(t, e, n) {
    n || (n = {});
    const r = ce(t);
    if (r.heads) throw new RangeError("Attempting to change an out of date document - set at: " + Zs(t));
    if (bn(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const s = r.handle.getHeads();
    return r.handle.loadIncremental(e), $t(t, "loadIncremental", s, n.patchCallback || r.patchCallback);
  }
  function ei(t) {
    return ce(t).handle.save();
  }
  function Mc(t, e) {
    const n = ce(t);
    if (n.heads) throw new RangeError("Attempting to change an out of date document - set at: " + Zs(t));
    const r = n.handle.getHeads(), s = ce(e), i = n.handle.getChangesAdded(s.handle);
    return n.handle.applyChanges(i), $t(t, "merge", r, n.patchCallback);
  }
  function Rc(t, e, n) {
    rs(e, "before"), rs(n, "after");
    const r = ce(t);
    return r.mostRecentPatch && Xn(r.mostRecentPatch.before, e) && Xn(r.mostRecentPatch.after, n) ? r.mostRecentPatch.patches : r.handle.diff(e, n);
  }
  function jc(t, e) {
    if (t.length !== e.length) return false;
    for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return false;
    return true;
  }
  function rs(t, e) {
    if (!Array.isArray(t)) throw new Error(`${e} must be an array`);
  }
  function Xn(t, e) {
    if (!ss(t) || !ss(e)) return t === e;
    const n = Object.keys(t).sort(), r = Object.keys(e).sort();
    if (n.length !== r.length) return false;
    for (let s = 0; s < n.length; s++) if (n[s] !== r[s] || !Xn(t[n[s]], e[r[s]])) return false;
    return true;
  }
  function ti(t) {
    const e = le.importSyncState(t), n = le.encodeSyncState(e);
    return e.free(), n;
  }
  function ni(t) {
    const e = le.decodeSyncState(t), n = le.exportSyncState(e);
    return e.free(), n;
  }
  function Dc(t, e) {
    const n = ce(t), r = le.importSyncState(e), s = n.handle.generateSyncMessage(r);
    return [
      le.exportSyncState(r),
      s
    ];
  }
  function Uc(t, e, n, r) {
    const s = le.importSyncState(e);
    r || (r = {});
    const i = ce(t);
    if (i.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (bn(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const o = i.handle.getHeads();
    i.handle.receiveSyncMessage(s, n);
    const a = le.exportSyncState(s);
    return [
      $t(t, "receiveSyncMessage", o, r.patchCallback || i.patchCallback),
      a,
      null
    ];
  }
  function Pc() {
    return le.exportSyncState(le.initSyncState());
  }
  function $c(t) {
    return le.decodeSyncMessage(t);
  }
  function ve(t) {
    const e = ce(t);
    return e.heads || e.handle.getHeads();
  }
  function ss(t) {
    return typeof t == "object" && t !== null;
  }
  function Bc(t, e) {
    return ce(t).handle.saveSince(e);
  }
  function ri(t, e) {
    t.registerDatatype("counter", (n) => new qn(n), (n) => {
      if (n instanceof qn) return n.value;
    }), e ? t.registerDatatype("str", (n) => new Yn(n), (n) => {
      if (n instanceof Yn) return n.val;
    }) : t.registerDatatype("text", (n) => new $e(n), (n) => {
      if (n instanceof $e) return n.join("");
    });
  }
  function mn(t) {
    const e = wn(t);
    return e.enableTextV2 = true, Cr(e);
  }
  function is(t, e) {
    const n = wn(e);
    return n.enableTextV2 = true, Ac(t, n);
  }
  function Fc(t, e) {
    const n = wn(e);
    return n.enableTextV2 = true, Ec(t, n);
  }
  function Lc(t, e) {
    const n = wn(e);
    return n.enableTextV2 = true, n.patchCallback ? Qs(Cr(n), t) : Oc(t, n);
  }
  function wn(t) {
    return {
      actor: t
    };
  }
  var Hc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function Tr(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
  }
  var Zn = {
    exports: {}
  }, Cn, os;
  function Nc() {
    if (os) return Cn;
    os = 1;
    var t = 1e3, e = t * 60, n = e * 60, r = n * 24, s = r * 7, i = r * 365.25;
    Cn = function(u, d) {
      d = d || {};
      var _ = typeof u;
      if (_ === "string" && u.length > 0) return o(u);
      if (_ === "number" && isFinite(u)) return d.long ? c(u) : a(u);
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(u));
    };
    function o(u) {
      if (u = String(u), !(u.length > 100)) {
        var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(u);
        if (d) {
          var _ = parseFloat(d[1]), l = (d[2] || "ms").toLowerCase();
          switch (l) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return _ * i;
            case "weeks":
            case "week":
            case "w":
              return _ * s;
            case "days":
            case "day":
            case "d":
              return _ * r;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return _ * n;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return _ * e;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return _ * t;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return _;
            default:
              return;
          }
        }
      }
    }
    function a(u) {
      var d = Math.abs(u);
      return d >= r ? Math.round(u / r) + "d" : d >= n ? Math.round(u / n) + "h" : d >= e ? Math.round(u / e) + "m" : d >= t ? Math.round(u / t) + "s" : u + "ms";
    }
    function c(u) {
      var d = Math.abs(u);
      return d >= r ? f(u, d, r, "day") : d >= n ? f(u, d, n, "hour") : d >= e ? f(u, d, e, "minute") : d >= t ? f(u, d, t, "second") : u + " ms";
    }
    function f(u, d, _, l) {
      var b = d >= _ * 1.5;
      return Math.round(u / _) + " " + l + (b ? "s" : "");
    }
    return Cn;
  }
  function zc(t) {
    n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = s, n.enabled = a, n.humanize = Nc(), n.destroy = f, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function e(u) {
      let d = 0;
      for (let _ = 0; _ < u.length; _++) d = (d << 5) - d + u.charCodeAt(_), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = e;
    function n(u) {
      let d, _ = null, l, b;
      function v(...S) {
        if (!v.enabled) return;
        const j = v, D = Number(/* @__PURE__ */ new Date()), E = D - (d || D);
        j.diff = E, j.prev = d, j.curr = D, d = D, S[0] = n.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let L = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, ($, J) => {
          if ($ === "%%") return "%";
          L++;
          const W = n.formatters[J];
          if (typeof W == "function") {
            const Y = S[L];
            $ = W.call(j, Y), S.splice(L, 1), L--;
          }
          return $;
        }), n.formatArgs.call(j, S), (j.log || n.log).apply(j, S);
      }
      return v.namespace = u, v.useColors = n.useColors(), v.color = n.selectColor(u), v.extend = r, v.destroy = n.destroy, Object.defineProperty(v, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => _ !== null ? _ : (l !== n.namespaces && (l = n.namespaces, b = n.enabled(u)), b),
        set: (S) => {
          _ = S;
        }
      }), typeof n.init == "function" && n.init(v), v;
    }
    function r(u, d) {
      const _ = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return _.log = this.log, _;
    }
    function s(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const _ of d) _[0] === "-" ? n.skips.push(_.slice(1)) : n.names.push(_);
    }
    function i(u, d) {
      let _ = 0, l = 0, b = -1, v = 0;
      for (; _ < u.length; ) if (l < d.length && (d[l] === u[_] || d[l] === "*")) d[l] === "*" ? (b = l, v = _, l++) : (_++, l++);
      else if (b !== -1) l = b + 1, v++, _ = v;
      else return false;
      for (; l < d.length && d[l] === "*"; ) l++;
      return l === d.length;
    }
    function o() {
      const u = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), u;
    }
    function a(u) {
      for (const d of n.skips) if (i(u, d)) return false;
      for (const d of n.names) if (i(u, d)) return true;
      return false;
    }
    function c(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  var Wc = zc;
  (function(t, e) {
    var n = {};
    e.formatArgs = s, e.save = i, e.load = o, e.useColors = r, e.storage = a(), e.destroy = /* @__PURE__ */ (() => {
      let f = false;
      return () => {
        f || (f = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
      let f;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (f = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(f[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function s(f) {
      if (f[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + f[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
      const u = "color: " + this.color;
      f.splice(1, 0, u, "color: inherit");
      let d = 0, _ = 0;
      f[0].replace(/%[a-zA-Z%]/g, (l) => {
        l !== "%%" && (d++, l === "%c" && (_ = d));
      }), f.splice(_, 0, u);
    }
    e.log = console.debug || console.log || (() => {
    });
    function i(f) {
      try {
        f ? e.storage.setItem("debug", f) : e.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let f;
      try {
        f = e.storage.getItem("debug");
      } catch {
      }
      return !f && typeof process < "u" && "env" in process && (f = n.DEBUG), f;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    t.exports = Wc(e);
    const { formatters: c } = t.exports;
    c.j = function(f) {
      try {
        return JSON.stringify(f);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  })(Zn, Zn.exports);
  var Vc = Zn.exports;
  const Be = Tr(Vc);
  var si = {
    exports: {}
  };
  (function(t) {
    var e = Object.prototype.hasOwnProperty, n = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n = false));
    function s(c, f, u) {
      this.fn = c, this.context = f, this.once = u || false;
    }
    function i(c, f, u, d, _) {
      if (typeof u != "function") throw new TypeError("The listener must be a function");
      var l = new s(u, d || c, _), b = n ? n + f : f;
      return c._events[b] ? c._events[b].fn ? c._events[b] = [
        c._events[b],
        l
      ] : c._events[b].push(l) : (c._events[b] = l, c._eventsCount++), c;
    }
    function o(c, f) {
      --c._eventsCount === 0 ? c._events = new r() : delete c._events[f];
    }
    function a() {
      this._events = new r(), this._eventsCount = 0;
    }
    a.prototype.eventNames = function() {
      var f = [], u, d;
      if (this._eventsCount === 0) return f;
      for (d in u = this._events) e.call(u, d) && f.push(n ? d.slice(1) : d);
      return Object.getOwnPropertySymbols ? f.concat(Object.getOwnPropertySymbols(u)) : f;
    }, a.prototype.listeners = function(f) {
      var u = n ? n + f : f, d = this._events[u];
      if (!d) return [];
      if (d.fn) return [
        d.fn
      ];
      for (var _ = 0, l = d.length, b = new Array(l); _ < l; _++) b[_] = d[_].fn;
      return b;
    }, a.prototype.listenerCount = function(f) {
      var u = n ? n + f : f, d = this._events[u];
      return d ? d.fn ? 1 : d.length : 0;
    }, a.prototype.emit = function(f, u, d, _, l, b) {
      var v = n ? n + f : f;
      if (!this._events[v]) return false;
      var S = this._events[v], j = arguments.length, D, E;
      if (S.fn) {
        switch (S.once && this.removeListener(f, S.fn, void 0, true), j) {
          case 1:
            return S.fn.call(S.context), true;
          case 2:
            return S.fn.call(S.context, u), true;
          case 3:
            return S.fn.call(S.context, u, d), true;
          case 4:
            return S.fn.call(S.context, u, d, _), true;
          case 5:
            return S.fn.call(S.context, u, d, _, l), true;
          case 6:
            return S.fn.call(S.context, u, d, _, l, b), true;
        }
        for (E = 1, D = new Array(j - 1); E < j; E++) D[E - 1] = arguments[E];
        S.fn.apply(S.context, D);
      } else {
        var L = S.length, H;
        for (E = 0; E < L; E++) switch (S[E].once && this.removeListener(f, S[E].fn, void 0, true), j) {
          case 1:
            S[E].fn.call(S[E].context);
            break;
          case 2:
            S[E].fn.call(S[E].context, u);
            break;
          case 3:
            S[E].fn.call(S[E].context, u, d);
            break;
          case 4:
            S[E].fn.call(S[E].context, u, d, _);
            break;
          default:
            if (!D) for (H = 1, D = new Array(j - 1); H < j; H++) D[H - 1] = arguments[H];
            S[E].fn.apply(S[E].context, D);
        }
      }
      return true;
    }, a.prototype.on = function(f, u, d) {
      return i(this, f, u, d, false);
    }, a.prototype.once = function(f, u, d) {
      return i(this, f, u, d, true);
    }, a.prototype.removeListener = function(f, u, d, _) {
      var l = n ? n + f : f;
      if (!this._events[l]) return this;
      if (!u) return o(this, l), this;
      var b = this._events[l];
      if (b.fn) b.fn === u && (!_ || b.once) && (!d || b.context === d) && o(this, l);
      else {
        for (var v = 0, S = [], j = b.length; v < j; v++) (b[v].fn !== u || _ && !b[v].once || d && b[v].context !== d) && S.push(b[v]);
        S.length ? this._events[l] = S.length === 1 ? S[0] : S : o(this, l);
      }
      return this;
    }, a.prototype.removeAllListeners = function(f) {
      var u;
      return f ? (u = n ? n + f : f, this._events[u] && o(this, u)) : (this._events = new r(), this._eventsCount = 0), this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, t.exports = a;
  })(si);
  var Kc = si.exports;
  const pt = Tr(Kc);
  function Gc() {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    console.warn("XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues");
  }
  function Jc() {
    const t = Gc();
    if (t.__xstate__) return t.__xstate__;
  }
  const qc = (t) => {
    if (typeof window > "u") return;
    const e = Jc();
    e && e.register(t);
  };
  class as {
    constructor(e) {
      this._process = e, this._active = false, this._current = null, this._last = null;
    }
    start() {
      this._active = true, this.flush();
    }
    clear() {
      this._current && (this._current.next = null, this._last = this._current);
    }
    enqueue(e) {
      const n = {
        value: e,
        next: null
      };
      if (this._current) {
        this._last.next = n, this._last = n;
        return;
      }
      this._current = n, this._last = n, this._active && this.flush();
    }
    flush() {
      for (; this._current; ) {
        const e = this._current;
        this._process(e.value), this._current = e.next;
      }
      this._last = null;
    }
  }
  const ii = ".", Yc = "", oi = "", Xc = "#", Qn = "*", ai = "xstate.init", er = "xstate.stop";
  function Zc(t, e) {
    return {
      type: `xstate.after.${t}.${e}`
    };
  }
  function tr(t, e) {
    return {
      type: `xstate.done.state.${t}`,
      output: e
    };
  }
  function Qc(t, e) {
    return {
      type: `xstate.done.actor.${t}`,
      output: e,
      actorId: t
    };
  }
  function ef(t, e) {
    return {
      type: `xstate.error.actor.${t}`,
      error: e,
      actorId: t
    };
  }
  function ci(t) {
    return {
      type: ai,
      input: t
    };
  }
  function Oe(t) {
    setTimeout(() => {
      throw t;
    });
  }
  const tf = typeof Symbol == "function" && Symbol.observable || "@@observable";
  function fi(t, e) {
    const n = cs(t), r = cs(e);
    return typeof r == "string" ? typeof n == "string" ? r === n : false : typeof n == "string" ? n in r : Object.keys(n).every((s) => s in r ? fi(n[s], r[s]) : false);
  }
  function Or(t) {
    if (di(t)) return t;
    const e = [];
    let n = "";
    for (let r = 0; r < t.length; r++) {
      switch (t.charCodeAt(r)) {
        case 92:
          n += t[r + 1], r++;
          continue;
        case 46:
          e.push(n), n = "";
          continue;
      }
      n += t[r];
    }
    return e.push(n), e;
  }
  function cs(t) {
    if (Pf(t)) return t.value;
    if (typeof t != "string") return t;
    const e = Or(t);
    return nf(e);
  }
  function nf(t) {
    if (t.length === 1) return t[0];
    const e = {};
    let n = e;
    for (let r = 0; r < t.length - 1; r++) if (r === t.length - 2) n[t[r]] = t[r + 1];
    else {
      const s = n;
      n = {}, s[t[r]] = n;
    }
    return e;
  }
  function fs(t, e) {
    const n = {}, r = Object.keys(t);
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      n[i] = e(t[i], i, t, s);
    }
    return n;
  }
  function ui(t) {
    return di(t) ? t : [
      t
    ];
  }
  function Pe(t) {
    return t === void 0 ? [] : ui(t);
  }
  function nr(t, e, n, r) {
    return typeof t == "function" ? t({
      context: e,
      event: n,
      self: r
    }) : (t && typeof t == "object" && Object.values(t).some((s) => typeof s == "function") && console.warn(`Dynamically mapping values to individual properties is deprecated. Use a single function that returns the mapped object instead.
Found object containing properties whose values are possibly mapping functions: ${Object.entries(t).filter(([, s]) => typeof s == "function").map(([s, i]) => `
 - ${s}: ${i.toString().replace(/\n\s*/g, "")}`).join("")}`), t);
  }
  function di(t) {
    return Array.isArray(t);
  }
  function rf(t) {
    return t.type.startsWith("xstate.error.actor");
  }
  function at(t) {
    return ui(t).map((e) => typeof e > "u" || typeof e == "string" ? {
      target: e
    } : e);
  }
  function li(t) {
    if (!(t === void 0 || t === Yc)) return Pe(t);
  }
  function rr(t, e, n) {
    var _a5, _b, _c3;
    const r = typeof t == "object", s = r ? t : void 0;
    return {
      next: (_a5 = r ? t.next : t) == null ? void 0 : _a5.bind(s),
      error: (_b = r ? t.error : e) == null ? void 0 : _b.bind(s),
      complete: (_c3 = r ? t.complete : n) == null ? void 0 : _c3.bind(s)
    };
  }
  function us(t, e) {
    return `${e}.${t}`;
  }
  function Mr(t, e) {
    const n = e.match(/^xstate\.invoke\.(\d+)\.(.*)/);
    if (!n) return t.implementations.actors[e];
    const [, r, s] = n, o = t.getStateNodeById(s).config.invoke;
    return (Array.isArray(o) ? o[r] : o).src;
  }
  function ds(t, e) {
    return `${t.sessionId}.${e}`;
  }
  let sf = 0;
  function of(t, e) {
    const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new Set(), o = {}, { clock: a, logger: c } = e, f = {
      schedule: (_, l, b, v, S = Math.random().toString(36).slice(2)) => {
        const j = {
          source: _,
          target: l,
          event: b,
          delay: v,
          id: S,
          startedAt: Date.now()
        }, D = ds(_, S);
        d._snapshot._scheduledEvents[D] = j;
        const E = a.setTimeout(() => {
          delete o[D], delete d._snapshot._scheduledEvents[D], d._relay(_, l, b);
        }, v);
        o[D] = E;
      },
      cancel: (_, l) => {
        const b = ds(_, l), v = o[b];
        delete o[b], delete d._snapshot._scheduledEvents[b], v !== void 0 && a.clearTimeout(v);
      },
      cancelAll: (_) => {
        for (const l in d._snapshot._scheduledEvents) {
          const b = d._snapshot._scheduledEvents[l];
          b.source === _ && f.cancel(_, b.id);
        }
      }
    }, u = (_) => {
      if (!i.size) return;
      const l = {
        ..._,
        rootId: t.sessionId
      };
      i.forEach((b) => {
        var _a5;
        return (_a5 = b.next) == null ? void 0 : _a5.call(b, l);
      });
    }, d = {
      _snapshot: {
        _scheduledEvents: ((e == null ? void 0 : e.snapshot) && e.snapshot.scheduler) ?? {}
      },
      _bookId: () => `x:${sf++}`,
      _register: (_, l) => (n.set(_, l), _),
      _unregister: (_) => {
        n.delete(_.sessionId);
        const l = s.get(_);
        l !== void 0 && (r.delete(l), s.delete(_));
      },
      get: (_) => r.get(_),
      _set: (_, l) => {
        const b = r.get(_);
        if (b && b !== l) throw new Error(`Actor with system ID '${_}' already exists.`);
        r.set(_, l), s.set(l, _);
      },
      inspect: (_) => {
        const l = rr(_);
        return i.add(l), {
          unsubscribe() {
            i.delete(l);
          }
        };
      },
      _sendInspectionEvent: u,
      _relay: (_, l, b) => {
        d._sendInspectionEvent({
          type: "@xstate.event",
          sourceRef: _,
          actorRef: l,
          event: b
        }), l._send(b);
      },
      scheduler: f,
      getSnapshot: () => ({
        _scheduledEvents: {
          ...d._snapshot._scheduledEvents
        }
      }),
      start: () => {
        const _ = d._snapshot._scheduledEvents;
        d._snapshot._scheduledEvents = {};
        for (const l in _) {
          const { source: b, target: v, event: S, delay: j, id: D } = _[l];
          f.schedule(b, v, S, j, D);
        }
      },
      _clock: a,
      _logger: c
    };
    return d;
  }
  let At = false;
  const Rr = 1;
  let ue = function(t) {
    return t[t.NotStarted = 0] = "NotStarted", t[t.Running = 1] = "Running", t[t.Stopped = 2] = "Stopped", t;
  }({});
  const af = {
    clock: {
      setTimeout: (t, e) => setTimeout(t, e),
      clearTimeout: (t) => clearTimeout(t)
    },
    logger: console.log.bind(console),
    devTools: false
  };
  class cf {
    constructor(e, n) {
      this.logic = e, this._snapshot = void 0, this.clock = void 0, this.options = void 0, this.id = void 0, this.mailbox = new as(this._process.bind(this)), this.observers = /* @__PURE__ */ new Set(), this.eventListeners = /* @__PURE__ */ new Map(), this.logger = void 0, this._processingStatus = ue.NotStarted, this._parent = void 0, this._syncSnapshot = void 0, this.ref = void 0, this._actorScope = void 0, this._systemId = void 0, this.sessionId = void 0, this.system = void 0, this._doneEvent = void 0, this.src = void 0, this._deferred = [];
      const r = {
        ...af,
        ...n
      }, { clock: s, logger: i, parent: o, syncSnapshot: a, id: c, systemId: f, inspect: u } = r;
      this.system = o ? o.system : of(this, {
        clock: s,
        logger: i
      }), u && !o && this.system.inspect(rr(u)), this.sessionId = this.system._bookId(), this.id = c ?? this.sessionId, this.logger = (n == null ? void 0 : n.logger) ?? this.system._logger, this.clock = (n == null ? void 0 : n.clock) ?? this.system._clock, this._parent = o, this._syncSnapshot = a, this.options = r, this.src = r.src ?? e, this.ref = this, this._actorScope = {
        self: this,
        id: this.id,
        sessionId: this.sessionId,
        logger: this.logger,
        defer: (d) => {
          this._deferred.push(d);
        },
        system: this.system,
        stopChild: (d) => {
          if (d._parent !== this) throw new Error(`Cannot stop child actor ${d.id} of ${this.id} because it is not a child`);
          d._stop();
        },
        emit: (d) => {
          const _ = this.eventListeners.get(d.type), l = this.eventListeners.get("*");
          if (!_ && !l) return;
          const b = [
            ..._ ? _.values() : [],
            ...l ? l.values() : []
          ];
          for (const v of b) v(d);
        },
        actionExecutor: (d) => {
          const _ = () => {
            if (this._actorScope.system._sendInspectionEvent({
              type: "@xstate.action",
              actorRef: this,
              action: {
                type: d.type,
                params: d.params
              }
            }), !d.exec) return;
            const l = At;
            try {
              At = true, d.exec(d.info, d.params);
            } finally {
              At = l;
            }
          };
          this._processingStatus === ue.Running ? _() : this._deferred.push(_);
        }
      }, this.send = this.send.bind(this), this.system._sendInspectionEvent({
        type: "@xstate.actor",
        actorRef: this
      }), f && (this._systemId = f, this.system._set(f, this)), this._initState((n == null ? void 0 : n.snapshot) ?? (n == null ? void 0 : n.state)), f && this._snapshot.status !== "active" && this.system._unregister(this);
    }
    _initState(e) {
      var _a5;
      try {
        this._snapshot = e ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(e, this._actorScope) : e : this.logic.getInitialSnapshot(this._actorScope, (_a5 = this.options) == null ? void 0 : _a5.input);
      } catch (n) {
        this._snapshot = {
          status: "error",
          output: void 0,
          error: n
        };
      }
    }
    update(e, n) {
      var _a5, _b;
      this._snapshot = e;
      let r;
      for (; r = this._deferred.shift(); ) try {
        r();
      } catch (s) {
        this._deferred.length = 0, this._snapshot = {
          ...e,
          status: "error",
          error: s
        };
      }
      switch (this._snapshot.status) {
        case "active":
          for (const s of this.observers) try {
            (_a5 = s.next) == null ? void 0 : _a5.call(s, e);
          } catch (i) {
            Oe(i);
          }
          break;
        case "done":
          for (const s of this.observers) try {
            (_b = s.next) == null ? void 0 : _b.call(s, e);
          } catch (i) {
            Oe(i);
          }
          this._stopProcedure(), this._complete(), this._doneEvent = Qc(this.id, this._snapshot.output), this._parent && this.system._relay(this, this._parent, this._doneEvent);
          break;
        case "error":
          this._error(this._snapshot.error);
          break;
      }
      this.system._sendInspectionEvent({
        type: "@xstate.snapshot",
        actorRef: this,
        event: n,
        snapshot: e
      });
    }
    subscribe(e, n, r) {
      var _a5;
      const s = rr(e, n, r);
      if (this._processingStatus !== ue.Stopped) this.observers.add(s);
      else switch (this._snapshot.status) {
        case "done":
          try {
            (_a5 = s.complete) == null ? void 0 : _a5.call(s);
          } catch (i) {
            Oe(i);
          }
          break;
        case "error": {
          const i = this._snapshot.error;
          if (!s.error) Oe(i);
          else try {
            s.error(i);
          } catch (o) {
            Oe(o);
          }
          break;
        }
      }
      return {
        unsubscribe: () => {
          this.observers.delete(s);
        }
      };
    }
    on(e, n) {
      let r = this.eventListeners.get(e);
      r || (r = /* @__PURE__ */ new Set(), this.eventListeners.set(e, r));
      const s = n.bind(void 0);
      return r.add(s), {
        unsubscribe: () => {
          r.delete(s);
        }
      };
    }
    start() {
      if (this._processingStatus === ue.Running) return this;
      this._syncSnapshot && this.subscribe({
        next: (r) => {
          r.status === "active" && this.system._relay(this, this._parent, {
            type: `xstate.snapshot.${this.id}`,
            snapshot: r
          });
        },
        error: () => {
        }
      }), this.system._register(this.sessionId, this), this._systemId && this.system._set(this._systemId, this), this._processingStatus = ue.Running;
      const e = ci(this.options.input);
      switch (this.system._sendInspectionEvent({
        type: "@xstate.event",
        sourceRef: this._parent,
        actorRef: this,
        event: e
      }), this._snapshot.status) {
        case "done":
          return this.update(this._snapshot, e), this;
        case "error":
          return this._error(this._snapshot.error), this;
      }
      if (this._parent || this.system.start(), this.logic.start) try {
        this.logic.start(this._snapshot, this._actorScope);
      } catch (r) {
        return this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: r
        }, this._error(r), this;
      }
      return this.update(this._snapshot, e), this.options.devTools && this.attachDevTools(), this.mailbox.start(), this;
    }
    _process(e) {
      let n, r;
      try {
        n = this.logic.transition(this._snapshot, e, this._actorScope);
      } catch (s) {
        r = {
          err: s
        };
      }
      if (r) {
        const { err: s } = r;
        this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: s
        }, this._error(s);
        return;
      }
      this.update(n, e), e.type === er && (this._stopProcedure(), this._complete());
    }
    _stop() {
      return this._processingStatus === ue.Stopped ? this : (this.mailbox.clear(), this._processingStatus === ue.NotStarted ? (this._processingStatus = ue.Stopped, this) : (this.mailbox.enqueue({
        type: er
      }), this));
    }
    stop() {
      if (this._parent) throw new Error("A non-root actor cannot be stopped directly.");
      return this._stop();
    }
    _complete() {
      var _a5;
      for (const e of this.observers) try {
        (_a5 = e.complete) == null ? void 0 : _a5.call(e);
      } catch (n) {
        Oe(n);
      }
      this.observers.clear();
    }
    _reportError(e) {
      if (!this.observers.size) {
        this._parent || Oe(e);
        return;
      }
      let n = false;
      for (const r of this.observers) {
        const s = r.error;
        n || (n = !s);
        try {
          s == null ? void 0 : s(e);
        } catch (i) {
          Oe(i);
        }
      }
      this.observers.clear(), n && Oe(e);
    }
    _error(e) {
      this._stopProcedure(), this._reportError(e), this._parent && this.system._relay(this, this._parent, ef(this.id, e));
    }
    _stopProcedure() {
      return this._processingStatus !== ue.Running ? this : (this.system.scheduler.cancelAll(this), this.mailbox.clear(), this.mailbox = new as(this._process.bind(this)), this._processingStatus = ue.Stopped, this.system._unregister(this), this);
    }
    _send(e) {
      if (this._processingStatus === ue.Stopped) {
        {
          const n = JSON.stringify(e);
          console.warn(`Event "${e.type}" was sent to stopped actor "${this.id} (${this.sessionId})". This actor has already reached its final state, and will not transition.
Event: ${n}`);
        }
        return;
      }
      this.mailbox.enqueue(e);
    }
    send(e) {
      if (typeof e == "string") throw new Error(`Only event objects may be sent to actors; use .send({ type: "${e}" }) instead`);
      this.system._relay(void 0, this, e);
    }
    attachDevTools() {
      const { devTools: e } = this.options;
      e && (typeof e == "function" ? e : qc)(this);
    }
    toJSON() {
      return {
        xstate$$type: Rr,
        id: this.id
      };
    }
    getPersistedSnapshot(e) {
      return this.logic.getPersistedSnapshot(this._snapshot, e);
    }
    [tf]() {
      return this;
    }
    getSnapshot() {
      if (!this._snapshot) throw new Error("Snapshot can't be read while the actor initializes itself");
      return this._snapshot;
    }
  }
  function Ot(t, ...[e]) {
    return new cf(t, e);
  }
  function ff(t, e, n, r, { sendId: s }) {
    const i = typeof s == "function" ? s(n, r) : s;
    return [
      e,
      {
        sendId: i
      },
      void 0
    ];
  }
  function uf(t, e) {
    t.defer(() => {
      t.system.scheduler.cancel(t.self, e.sendId);
    });
  }
  function df(t) {
    function e(n, r) {
      throw new Error("This isn't supposed to be called");
    }
    return e.type = "xstate.cancel", e.sendId = t, e.resolve = ff, e.execute = uf, e;
  }
  function lf(t, e, n, r, { id: s, systemId: i, src: o, input: a, syncSnapshot: c }) {
    const f = typeof o == "string" ? Mr(e.machine, o) : o, u = typeof s == "function" ? s(n) : s;
    let d, _;
    return f && (_ = typeof a == "function" ? a({
      context: e.context,
      event: n.event,
      self: t.self
    }) : a, d = Ot(f, {
      id: u,
      src: o,
      parent: t.self,
      syncSnapshot: c,
      systemId: i,
      input: _
    })), d || console.warn(`Actor type '${o}' not found in machine '${t.id}'.`), [
      et(e, {
        children: {
          ...e.children,
          [u]: d
        }
      }),
      {
        id: s,
        systemId: i,
        actorRef: d,
        src: o,
        input: _
      },
      void 0
    ];
  }
  function hf(t, { actorRef: e }) {
    e && t.defer(() => {
      e._processingStatus !== ue.Stopped && e.start();
    });
  }
  function _f(...[t, { id: e, systemId: n, input: r, syncSnapshot: s = false } = {}]) {
    function i(o, a) {
      throw new Error("This isn't supposed to be called");
    }
    return i.type = "xstate.spawnChild", i.id = e, i.systemId = n, i.src = t, i.input = r, i.syncSnapshot = s, i.resolve = lf, i.execute = hf, i;
  }
  function gf(t, e, n, r, { actorRef: s }) {
    const i = typeof s == "function" ? s(n, r) : s, o = typeof i == "string" ? e.children[i] : i;
    let a = e.children;
    return o && (a = {
      ...a
    }, delete a[o.id]), [
      et(e, {
        children: a
      }),
      o,
      void 0
    ];
  }
  function pf(t, e) {
    if (e) {
      if (t.system._unregister(e), e._processingStatus !== ue.Running) {
        t.stopChild(e);
        return;
      }
      t.defer(() => {
        t.stopChild(e);
      });
    }
  }
  function hi(t) {
    function e(n, r) {
      throw new Error("This isn't supposed to be called");
    }
    return e.type = "xstate.stopChild", e.actorRef = t, e.resolve = gf, e.execute = pf, e;
  }
  function jr(t, e, n, r) {
    const { machine: s } = r, i = typeof t == "function", o = i ? t : s.implementations.guards[typeof t == "string" ? t : t.type];
    if (!i && !o) throw new Error(`Guard '${typeof t == "string" ? t : t.type}' is not implemented.'.`);
    if (typeof o != "function") return jr(o, e, n, r);
    const a = {
      context: e,
      event: n
    }, c = i || typeof t == "string" ? void 0 : "params" in t ? typeof t.params == "function" ? t.params({
      context: e,
      event: n
    }) : t.params : void 0;
    return "check" in o ? o.check(r, a, o) : o(a, c);
  }
  const Dr = (t) => t.type === "atomic" || t.type === "final";
  function ht(t) {
    return Object.values(t.states).filter((e) => e.type !== "history");
  }
  function Bt(t, e) {
    const n = [];
    if (e === t) return n;
    let r = t.parent;
    for (; r && r !== e; ) n.push(r), r = r.parent;
    return n;
  }
  function cn(t) {
    const e = new Set(t), n = gi(e);
    for (const r of e) if (r.type === "compound" && (!n.get(r) || !n.get(r).length)) ls(r).forEach((s) => e.add(s));
    else if (r.type === "parallel") {
      for (const s of ht(r)) if (s.type !== "history" && !e.has(s)) {
        const i = ls(s);
        for (const o of i) e.add(o);
      }
    }
    for (const r of e) {
      let s = r.parent;
      for (; s; ) e.add(s), s = s.parent;
    }
    return e;
  }
  function _i(t, e) {
    const n = e.get(t);
    if (!n) return {};
    if (t.type === "compound") {
      const s = n[0];
      if (s) {
        if (Dr(s)) return s.key;
      } else return {};
    }
    const r = {};
    for (const s of n) r[s.key] = _i(s, e);
    return r;
  }
  function gi(t) {
    const e = /* @__PURE__ */ new Map();
    for (const n of t) e.has(n) || e.set(n, []), n.parent && (e.has(n.parent) || e.set(n.parent, []), e.get(n.parent).push(n));
    return e;
  }
  function pi(t, e) {
    const n = cn(e);
    return _i(t, gi(n));
  }
  function Ur(t, e) {
    return e.type === "compound" ? ht(e).some((n) => n.type === "final" && t.has(n)) : e.type === "parallel" ? ht(e).every((n) => Ur(t, n)) : e.type === "final";
  }
  const vn = (t) => t[0] === Xc;
  function yf(t, e) {
    return t.transitions.get(e) || [
      ...t.transitions.keys()
    ].filter((r) => {
      if (r === Qn) return true;
      if (!r.endsWith(".*")) return false;
      /.*\*.+/.test(r) && console.warn(`Wildcards can only be the last token of an event descriptor (e.g., "event.*") or the entire event descriptor ("*"). Check the "${r}" event.`);
      const s = r.split("."), i = e.split(".");
      for (let o = 0; o < s.length; o++) {
        const a = s[o], c = i[o];
        if (a === "*") {
          const f = o === s.length - 1;
          return f || console.warn(`Infix wildcards in transition events are not allowed. Check the "${r}" transition.`), f;
        }
        if (a !== c) return false;
      }
      return true;
    }).sort((r, s) => s.length - r.length).flatMap((r) => t.transitions.get(r));
  }
  function bf(t) {
    const e = t.config.after;
    if (!e) return [];
    const n = (s) => {
      const i = Zc(s, t.id), o = i.type;
      return t.entry.push(Vf(i, {
        id: o,
        delay: s
      })), t.exit.push(df(o)), o;
    };
    return Object.keys(e).flatMap((s) => {
      const i = e[s], o = typeof i == "string" ? {
        target: i
      } : i, a = Number.isNaN(+s) ? s : +s, c = n(a);
      return Pe(o).map((f) => ({
        ...f,
        event: c,
        delay: a
      }));
    }).map((s) => {
      const { delay: i } = s;
      return {
        ...Je(t, s.event, s),
        delay: i
      };
    });
  }
  function Je(t, e, n) {
    const r = li(n.target), s = n.reenter ?? false, i = vf(t, r);
    if (n.cond) throw new Error(`State "${t.id}" has declared \`cond\` for one of its transitions. This property has been renamed to \`guard\`. Please update your code.`);
    const o = {
      ...n,
      actions: Pe(n.actions),
      guard: n.guard,
      target: i,
      source: t,
      reenter: s,
      eventType: e,
      toJSON: () => ({
        ...o,
        source: `#${t.id}`,
        target: i ? i.map((a) => `#${a.id}`) : void 0
      })
    };
    return o;
  }
  function mf(t) {
    const e = /* @__PURE__ */ new Map();
    if (t.config.on) for (const n of Object.keys(t.config.on)) {
      if (n === oi) throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
      const r = t.config.on[n];
      e.set(n, at(r).map((s) => Je(t, n, s)));
    }
    if (t.config.onDone) {
      const n = `xstate.done.state.${t.id}`;
      e.set(n, at(t.config.onDone).map((r) => Je(t, n, r)));
    }
    for (const n of t.invoke) {
      if (n.onDone) {
        const r = `xstate.done.actor.${n.id}`;
        e.set(r, at(n.onDone).map((s) => Je(t, r, s)));
      }
      if (n.onError) {
        const r = `xstate.error.actor.${n.id}`;
        e.set(r, at(n.onError).map((s) => Je(t, r, s)));
      }
      if (n.onSnapshot) {
        const r = `xstate.snapshot.${n.id}`;
        e.set(r, at(n.onSnapshot).map((s) => Je(t, r, s)));
      }
    }
    for (const n of t.after) {
      let r = e.get(n.eventType);
      r || (r = [], e.set(n.eventType, r)), r.push(n);
    }
    return e;
  }
  function wf(t, e) {
    const n = typeof e == "string" ? t.states[e] : e ? t.states[e.target] : void 0;
    if (!n && e) throw new Error(`Initial state node "${e}" not found on parent state node #${t.id}`);
    const r = {
      source: t,
      actions: !e || typeof e == "string" ? [] : Pe(e.actions),
      eventType: null,
      reenter: false,
      target: n ? [
        n
      ] : [],
      toJSON: () => ({
        ...r,
        source: `#${t.id}`,
        target: n ? [
          `#${n.id}`
        ] : []
      })
    };
    return r;
  }
  function vf(t, e) {
    if (e !== void 0) return e.map((n) => {
      if (typeof n != "string") return n;
      if (vn(n)) return t.machine.getStateNodeById(n);
      const r = n[0] === ii;
      if (r && !t.parent) return fn(t, n.slice(1));
      const s = r ? t.key + n : n;
      if (t.parent) try {
        return fn(t.parent, s);
      } catch (i) {
        throw new Error(`Invalid transition definition for state node '${t.id}':
${i.message}`);
      }
      else throw new Error(`Invalid target: "${n}" is not a valid target from the root node. Did you mean ".${n}"?`);
    });
  }
  function yi(t) {
    const e = li(t.config.target);
    return e ? {
      target: e.map((n) => typeof n == "string" ? fn(t.parent, n) : n)
    } : t.parent.initial;
  }
  function Xe(t) {
    return t.type === "history";
  }
  function ls(t) {
    const e = bi(t);
    for (const n of e) for (const r of Bt(n, t)) e.add(r);
    return e;
  }
  function bi(t) {
    const e = /* @__PURE__ */ new Set();
    function n(r) {
      if (!e.has(r)) {
        if (e.add(r), r.type === "compound") n(r.initial.target[0]);
        else if (r.type === "parallel") for (const s of ht(r)) n(s);
      }
    }
    return n(t), e;
  }
  function _t(t, e) {
    if (vn(e)) return t.machine.getStateNodeById(e);
    if (!t.states) throw new Error(`Unable to retrieve child state '${e}' from '${t.id}'; no child states exist.`);
    const n = t.states[e];
    if (!n) throw new Error(`Child state '${e}' does not exist on '${t.id}'`);
    return n;
  }
  function fn(t, e) {
    if (typeof e == "string" && vn(e)) try {
      return t.machine.getStateNodeById(e);
    } catch {
    }
    const n = Or(e).slice();
    let r = t;
    for (; n.length; ) {
      const s = n.shift();
      if (!s.length) break;
      r = _t(r, s);
    }
    return r;
  }
  function un(t, e) {
    if (typeof e == "string") {
      const s = t.states[e];
      if (!s) throw new Error(`State '${e}' does not exist on '${t.id}'`);
      return [
        t,
        s
      ];
    }
    const n = Object.keys(e), r = n.map((s) => _t(t, s)).filter(Boolean);
    return [
      t.machine.root,
      t
    ].concat(r, n.reduce((s, i) => {
      const o = _t(t, i);
      if (!o) return s;
      const a = un(o, e[i]);
      return s.concat(a);
    }, []));
  }
  function xf(t, e, n, r) {
    const i = _t(t, e).next(n, r);
    return !i || !i.length ? t.next(n, r) : i;
  }
  function Sf(t, e, n, r) {
    const s = Object.keys(e), i = _t(t, s[0]), o = Pr(i, e[s[0]], n, r);
    return !o || !o.length ? t.next(n, r) : o;
  }
  function kf(t, e, n, r) {
    const s = [];
    for (const i of Object.keys(e)) {
      const o = e[i];
      if (!o) continue;
      const a = _t(t, i), c = Pr(a, o, n, r);
      c && s.push(...c);
    }
    return s.length ? s : t.next(n, r);
  }
  function Pr(t, e, n, r) {
    return typeof e == "string" ? xf(t, e, n, r) : Object.keys(e).length === 1 ? Sf(t, e, n, r) : kf(t, e, n, r);
  }
  function Af(t) {
    return Object.keys(t.states).map((e) => t.states[e]).filter((e) => e.type === "history");
  }
  function Ve(t, e) {
    let n = t;
    for (; n.parent && n.parent !== e; ) n = n.parent;
    return n.parent === e;
  }
  function Ef(t, e) {
    const n = new Set(t), r = new Set(e);
    for (const s of n) if (r.has(s)) return true;
    for (const s of r) if (n.has(s)) return true;
    return false;
  }
  function mi(t, e, n) {
    const r = /* @__PURE__ */ new Set();
    for (const s of t) {
      let i = false;
      const o = /* @__PURE__ */ new Set();
      for (const a of r) if (Ef(sr([
        s
      ], e, n), sr([
        a
      ], e, n))) if (Ve(s.source, a.source)) o.add(a);
      else {
        i = true;
        break;
      }
      if (!i) {
        for (const a of o) r.delete(a);
        r.add(s);
      }
    }
    return Array.from(r);
  }
  function If(t) {
    const [e, ...n] = t;
    for (const r of Bt(e, void 0)) if (n.every((s) => Ve(s, r))) return r;
  }
  function $r(t, e) {
    if (!t.target) return [];
    const n = /* @__PURE__ */ new Set();
    for (const r of t.target) if (Xe(r)) if (e[r.id]) for (const s of e[r.id]) n.add(s);
    else for (const s of $r(yi(r), e)) n.add(s);
    else n.add(r);
    return [
      ...n
    ];
  }
  function wi(t, e) {
    const n = $r(t, e);
    if (!n) return;
    if (!t.reenter && n.every((s) => s === t.source || Ve(s, t.source))) return t.source;
    const r = If(n.concat(t.source));
    if (r) return r;
    if (!t.reenter) return t.source.machine.root;
  }
  function sr(t, e, n) {
    var _a5;
    const r = /* @__PURE__ */ new Set();
    for (const s of t) if ((_a5 = s.target) == null ? void 0 : _a5.length) {
      const i = wi(s, n);
      s.reenter && s.source === i && r.add(i);
      for (const o of e) Ve(o, i) && r.add(o);
    }
    return [
      ...r
    ];
  }
  function Cf(t, e) {
    if (t.length !== e.size) return false;
    for (const n of t) if (!e.has(n)) return false;
    return true;
  }
  function ir(t, e, n, r, s, i) {
    if (!t.length) return e;
    const o = new Set(e._nodes);
    let a = e.historyValue;
    const c = mi(t, o, a);
    let f = e;
    s || ([f, a] = Rf(f, r, n, c, o, a, i, n.actionExecutor)), f = gt(f, r, n, c.flatMap((d) => d.actions), i, void 0), f = Of(f, r, n, c, o, i, a, s);
    const u = [
      ...o
    ];
    f.status === "done" && (f = gt(f, r, n, u.sort((d, _) => _.order - d.order).flatMap((d) => d.exit), i, void 0));
    try {
      return a === e.historyValue && Cf(e._nodes, o) ? f : et(f, {
        _nodes: u,
        historyValue: a
      });
    } catch (d) {
      throw d;
    }
  }
  function Tf(t, e, n, r, s) {
    if (r.output === void 0) return;
    const i = tr(s.id, s.output !== void 0 && s.parent ? nr(s.output, t.context, e, n.self) : void 0);
    return nr(r.output, t.context, i, n.self);
  }
  function Of(t, e, n, r, s, i, o, a) {
    let c = t;
    const f = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
    Mf(r, o, u, f), a && u.add(t.machine.root);
    const d = /* @__PURE__ */ new Set();
    for (const _ of [
      ...f
    ].sort((l, b) => l.order - b.order)) {
      s.add(_);
      const l = [];
      l.push(..._.entry);
      for (const b of _.invoke) l.push(_f(b.src, {
        ...b,
        syncSnapshot: !!b.onSnapshot
      }));
      if (u.has(_)) {
        const b = _.initial.actions;
        l.push(...b);
      }
      if (c = gt(c, e, n, l, i, _.invoke.map((b) => b.id)), _.type === "final") {
        const b = _.parent;
        let v = (b == null ? void 0 : b.type) === "parallel" ? b : b == null ? void 0 : b.parent, S = v || _;
        for ((b == null ? void 0 : b.type) === "compound" && i.push(tr(b.id, _.output !== void 0 ? nr(_.output, c.context, e, n.self) : void 0)); (v == null ? void 0 : v.type) === "parallel" && !d.has(v) && Ur(s, v); ) d.add(v), i.push(tr(v.id)), S = v, v = v.parent;
        if (v) continue;
        c = et(c, {
          status: "done",
          output: Tf(c, e, n, c.machine.root, S)
        });
      }
    }
    return c;
  }
  function Mf(t, e, n, r) {
    for (const s of t) {
      const i = wi(s, e);
      for (const a of s.target || []) !Xe(a) && (s.source !== a || s.source !== i || s.reenter) && (r.add(a), n.add(a)), ft(a, e, n, r);
      const o = $r(s, e);
      for (const a of o) {
        const c = Bt(a, i);
        (i == null ? void 0 : i.type) === "parallel" && c.push(i), vi(r, e, n, c, !s.source.parent && s.reenter ? void 0 : i);
      }
    }
  }
  function ft(t, e, n, r) {
    var _a5;
    if (Xe(t)) if (e[t.id]) {
      const s = e[t.id];
      for (const i of s) r.add(i), ft(i, e, n, r);
      for (const i of s) Tn(i, t.parent, r, e, n);
    } else {
      const s = yi(t);
      for (const i of s.target) r.add(i), s === ((_a5 = t.parent) == null ? void 0 : _a5.initial) && n.add(t.parent), ft(i, e, n, r);
      for (const i of s.target) Tn(i, t.parent, r, e, n);
    }
    else if (t.type === "compound") {
      const [s] = t.initial.target;
      Xe(s) || (r.add(s), n.add(s)), ft(s, e, n, r), Tn(s, t, r, e, n);
    } else if (t.type === "parallel") for (const s of ht(t).filter((i) => !Xe(i))) [
      ...r
    ].some((i) => Ve(i, s)) || (Xe(s) || (r.add(s), n.add(s)), ft(s, e, n, r));
  }
  function vi(t, e, n, r, s) {
    for (const i of r) if ((!s || Ve(i, s)) && t.add(i), i.type === "parallel") for (const o of ht(i).filter((a) => !Xe(a))) [
      ...t
    ].some((a) => Ve(a, o)) || (t.add(o), ft(o, e, n, t));
  }
  function Tn(t, e, n, r, s) {
    vi(n, r, s, Bt(t, e));
  }
  function Rf(t, e, n, r, s, i, o, a) {
    let c = t;
    const f = sr(r, s, i);
    f.sort((d, _) => _.order - d.order);
    let u;
    for (const d of f) for (const _ of Af(d)) {
      let l;
      _.history === "deep" ? l = (b) => Dr(b) && Ve(b, d) : l = (b) => b.parent === d, u ?? (u = {
        ...i
      }), u[_.id] = Array.from(s).filter(l);
    }
    for (const d of f) c = gt(c, e, n, [
      ...d.exit,
      ...d.invoke.map((_) => hi(_.id))
    ], o, void 0), s.delete(d);
    return [
      c,
      u || i
    ];
  }
  function jf(t, e) {
    return t.implementations.actions[e];
  }
  function xi(t, e, n, r, s, i) {
    const { machine: o } = t;
    let a = t;
    for (const c of r) {
      const f = typeof c == "function", u = f ? c : jf(o, typeof c == "string" ? c : c.type), d = {
        context: a.context,
        event: e,
        self: n.self,
        system: n.system
      }, _ = f || typeof c == "string" ? void 0 : "params" in c ? typeof c.params == "function" ? c.params({
        context: a.context,
        event: e
      }) : c.params : void 0;
      if (!u || !("resolve" in u)) {
        n.actionExecutor({
          type: typeof c == "string" ? c : typeof c == "object" ? c.type : c.name || "(anonymous)",
          info: d,
          params: _,
          exec: u
        });
        continue;
      }
      const l = u, [b, v, S] = l.resolve(n, a, d, _, u, s);
      a = b, "retryResolve" in l && (i == null ? void 0 : i.push([
        l,
        v
      ])), "execute" in l && n.actionExecutor({
        type: l.type,
        info: d,
        params: v,
        exec: l.execute.bind(null, n, v)
      }), S && (a = xi(a, e, n, S, s, i));
    }
    return a;
  }
  function gt(t, e, n, r, s, i) {
    const o = i ? [] : void 0, a = xi(t, e, n, r, {
      internalQueue: s,
      deferredActorIds: i
    }, o);
    return o == null ? void 0 : o.forEach(([c, f]) => {
      c.retryResolve(n, a, f);
    }), a;
  }
  function On(t, e, n, r) {
    if (e.type === Qn) throw new Error(`An event cannot have the wildcard type ('${Qn}')`);
    let s = t;
    const i = [];
    function o(f, u, d) {
      n.system._sendInspectionEvent({
        type: "@xstate.microstep",
        actorRef: n.self,
        event: u,
        snapshot: f,
        _transitions: d
      }), i.push(f);
    }
    if (e.type === er) return s = et(hs(s, e, n), {
      status: "stopped"
    }), o(s, e, []), {
      snapshot: s,
      microstates: i
    };
    let a = e;
    if (a.type !== ai) {
      const f = a, u = rf(f), d = _s(f, s);
      if (u && !d.length) return s = et(t, {
        status: "error",
        error: f.error
      }), o(s, f, []), {
        snapshot: s,
        microstates: i
      };
      s = ir(d, t, n, a, false, r), o(s, f, d);
    }
    let c = true;
    for (; s.status === "active"; ) {
      let f = c ? Df(s, a) : [];
      const u = f.length ? s : void 0;
      if (!f.length) {
        if (!r.length) break;
        a = r.shift(), f = _s(a, s);
      }
      s = ir(f, s, n, a, false, r), c = s !== u, o(s, a, f);
    }
    return s.status !== "active" && hs(s, a, n), {
      snapshot: s,
      microstates: i
    };
  }
  function hs(t, e, n) {
    return gt(t, e, n, Object.values(t.children).map((r) => hi(r)), [], void 0);
  }
  function _s(t, e) {
    return e.machine.getTransitionData(e, t);
  }
  function Df(t, e) {
    const n = /* @__PURE__ */ new Set(), r = t._nodes.filter(Dr);
    for (const s of r) e: for (const i of [
      s
    ].concat(Bt(s, void 0))) if (i.always) {
      for (const o of i.always) if (o.guard === void 0 || jr(o.guard, t.context, e, t)) {
        n.add(o);
        break e;
      }
    }
    return mi(Array.from(n), new Set(t._nodes), t.historyValue);
  }
  function Uf(t, e) {
    const n = cn(un(t, e));
    return pi(t, [
      ...n
    ]);
  }
  function Pf(t) {
    return !!t && typeof t == "object" && "machine" in t && "value" in t;
  }
  const $f = function(e) {
    return fi(e, this.value);
  }, Bf = function(e) {
    return this.tags.has(e);
  }, Ff = function(e) {
    this.machine || console.warn("state.can(...) used outside of a machine-created State object; this will always return false.");
    const n = this.machine.getTransitionData(this, e);
    return !!(n == null ? void 0 : n.length) && n.some((r) => r.target !== void 0 || r.actions.length);
  }, Lf = function() {
    const { _nodes: e, tags: n, machine: r, getMeta: s, toJSON: i, can: o, hasTag: a, matches: c, ...f } = this;
    return {
      ...f,
      tags: Array.from(n)
    };
  }, Hf = function() {
    return this._nodes.reduce((e, n) => (n.meta !== void 0 && (e[n.id] = n.meta), e), {});
  };
  function Xt(t, e) {
    return {
      status: t.status,
      output: t.output,
      error: t.error,
      machine: e,
      context: t.context,
      _nodes: t._nodes,
      value: pi(e.root, t._nodes),
      tags: new Set(t._nodes.flatMap((n) => n.tags)),
      children: t.children,
      historyValue: t.historyValue || {},
      matches: $f,
      hasTag: Bf,
      can: Ff,
      getMeta: Hf,
      toJSON: Lf
    };
  }
  function et(t, e = {}) {
    return Xt({
      ...t,
      ...e
    }, t.machine);
  }
  function Nf(t, e) {
    const { _nodes: n, tags: r, machine: s, children: i, context: o, can: a, hasTag: c, matches: f, getMeta: u, toJSON: d, ..._ } = t, l = {};
    for (const v in i) {
      const S = i[v];
      if (typeof S.src != "string" && (!e || !("__unsafeAllowInlineActors" in e))) throw new Error("An inline child actor cannot be persisted.");
      l[v] = {
        snapshot: S.getPersistedSnapshot(e),
        src: S.src,
        systemId: S._systemId,
        syncSnapshot: S._syncSnapshot
      };
    }
    return {
      ..._,
      context: Si(o),
      children: l
    };
  }
  function Si(t) {
    let e;
    for (const n in t) {
      const r = t[n];
      if (r && typeof r == "object") if ("sessionId" in r && "send" in r && "ref" in r) e ?? (e = Array.isArray(t) ? t.slice() : {
        ...t
      }), e[n] = {
        xstate$$type: Rr,
        id: r.id
      };
      else {
        const s = Si(r);
        s !== r && (e ?? (e = Array.isArray(t) ? t.slice() : {
          ...t
        }), e[n] = s);
      }
    }
    return e ?? t;
  }
  function zf(t, e, n, r, { event: s, id: i, delay: o }, { internalQueue: a }) {
    const c = e.machine.implementations.delays;
    if (typeof s == "string") throw new Error(`Only event objects may be used with raise; use raise({ type: "${s}" }) instead`);
    const f = typeof s == "function" ? s(n, r) : s;
    let u;
    if (typeof o == "string") {
      const d = c && c[o];
      u = typeof d == "function" ? d(n, r) : d;
    } else u = typeof o == "function" ? o(n, r) : o;
    return typeof u != "number" && a.push(f), [
      e,
      {
        event: f,
        id: i,
        delay: u
      },
      void 0
    ];
  }
  function Wf(t, e) {
    const { event: n, delay: r, id: s } = e;
    if (typeof r == "number") {
      t.defer(() => {
        const i = t.self;
        t.system.scheduler.schedule(i, i, n, r, s);
      });
      return;
    }
  }
  function Vf(t, e) {
    At && console.warn("Custom actions should not call `raise()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
    function n(r, s) {
      throw new Error("This isn't supposed to be called");
    }
    return n.type = "xstate.raise", n.event = t, n.id = e == null ? void 0 : e.id, n.delay = e == null ? void 0 : e.delay, n.resolve = zf, n.execute = Wf, n;
  }
  function Kf(t, { machine: e, context: n }, r, s) {
    const i = (o, a) => {
      if (typeof o == "string") {
        const c = Mr(e, o);
        if (!c) throw new Error(`Actor logic '${o}' not implemented in machine '${e.id}'`);
        const f = Ot(c, {
          id: a == null ? void 0 : a.id,
          parent: t.self,
          syncSnapshot: a == null ? void 0 : a.syncSnapshot,
          input: typeof (a == null ? void 0 : a.input) == "function" ? a.input({
            context: n,
            event: r,
            self: t.self
          }) : a == null ? void 0 : a.input,
          src: o,
          systemId: a == null ? void 0 : a.systemId
        });
        return s[f.id] = f, f;
      } else return Ot(o, {
        id: a == null ? void 0 : a.id,
        parent: t.self,
        syncSnapshot: a == null ? void 0 : a.syncSnapshot,
        input: a == null ? void 0 : a.input,
        src: o,
        systemId: a == null ? void 0 : a.systemId
      });
    };
    return (o, a) => {
      const c = i(o, a);
      return s[c.id] = c, t.defer(() => {
        c._processingStatus !== ue.Stopped && c.start();
      }), c;
    };
  }
  function Gf(t, e, n, r, { assignment: s }) {
    if (!e.context) throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
    const i = {}, o = {
      context: e.context,
      event: n.event,
      spawn: Kf(t, e, n.event, i),
      self: t.self,
      system: t.system
    };
    let a = {};
    if (typeof s == "function") a = s(o, r);
    else for (const f of Object.keys(s)) {
      const u = s[f];
      a[f] = typeof u == "function" ? u(o, r) : u;
    }
    const c = Object.assign({}, e.context, a);
    return [
      et(e, {
        context: c,
        children: Object.keys(i).length ? {
          ...e.children,
          ...i
        } : e.children
      }),
      void 0,
      void 0
    ];
  }
  function or(t) {
    At && console.warn("Custom actions should not call `assign()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
    function e(n, r) {
      throw new Error("This isn't supposed to be called");
    }
    return e.type = "xstate.assign", e.assignment = t, e.resolve = Gf, e;
  }
  function Jf(t, e) {
    const n = Pe(e);
    if (!n.includes(t.type)) {
      const r = n.length === 1 ? `type "${n[0]}"` : `one of types "${n.join('", "')}"`;
      throw new Error(`Expected event ${JSON.stringify(t)} to have ${r}`);
    }
  }
  const gs = /* @__PURE__ */ new WeakMap();
  function st(t, e, n) {
    let r = gs.get(t);
    return r ? e in r || (r[e] = n()) : (r = {
      [e]: n()
    }, gs.set(t, r)), r[e];
  }
  const qf = {}, yt = (t) => typeof t == "string" ? {
    type: t
  } : typeof t == "function" ? "resolve" in t ? {
    type: t.type
  } : {
    type: t.name
  } : t;
  class Br {
    constructor(e, n) {
      if (this.config = e, this.key = void 0, this.id = void 0, this.type = void 0, this.path = void 0, this.states = void 0, this.history = void 0, this.entry = void 0, this.exit = void 0, this.parent = void 0, this.machine = void 0, this.meta = void 0, this.output = void 0, this.order = -1, this.description = void 0, this.tags = [], this.transitions = void 0, this.always = void 0, this.parent = n._parent, this.key = n._key, this.machine = n._machine, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.id = this.config.id || [
        this.machine.id,
        ...this.path
      ].join(ii), this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.description = this.config.description, this.order = this.machine.idMap.size, this.machine.idMap.set(this.id, this), this.states = this.config.states ? fs(this.config.states, (r, s) => new Br(r, {
        _parent: this,
        _key: s,
        _machine: this.machine
      })) : qf, this.type === "compound" && !this.config.initial) throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
      this.history = this.config.history === true ? "shallow" : this.config.history || false, this.entry = Pe(this.config.entry).slice(), this.exit = Pe(this.config.exit).slice(), this.meta = this.config.meta, this.output = this.type === "final" || !this.parent ? this.config.output : void 0, this.tags = Pe(e.tags).slice();
    }
    _initialize() {
      this.transitions = mf(this), this.config.always && (this.always = at(this.config.always).map((e) => Je(this, oi, e))), Object.keys(this.states).forEach((e) => {
        this.states[e]._initialize();
      });
    }
    get definition() {
      return {
        id: this.id,
        key: this.key,
        version: this.machine.version,
        type: this.type,
        initial: this.initial ? {
          target: this.initial.target,
          source: this,
          actions: this.initial.actions.map(yt),
          eventType: null,
          reenter: false,
          toJSON: () => ({
            target: this.initial.target.map((e) => `#${e.id}`),
            source: `#${this.id}`,
            actions: this.initial.actions.map(yt),
            eventType: null
          })
        } : void 0,
        history: this.history,
        states: fs(this.states, (e) => e.definition),
        on: this.on,
        transitions: [
          ...this.transitions.values()
        ].flat().map((e) => ({
          ...e,
          actions: e.actions.map(yt)
        })),
        entry: this.entry.map(yt),
        exit: this.exit.map(yt),
        meta: this.meta,
        order: this.order || -1,
        output: this.output,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags
      };
    }
    toJSON() {
      return this.definition;
    }
    get invoke() {
      return st(this, "invoke", () => Pe(this.config.invoke).map((e, n) => {
        const { src: r, systemId: s } = e, i = e.id ?? us(this.id, n), o = typeof r == "string" ? r : `xstate.invoke.${us(this.id, n)}`;
        return {
          ...e,
          src: o,
          id: i,
          systemId: s,
          toJSON() {
            const { onDone: a, onError: c, ...f } = e;
            return {
              ...f,
              type: "xstate.invoke",
              src: o,
              id: i
            };
          }
        };
      }));
    }
    get on() {
      return st(this, "on", () => [
        ...this.transitions
      ].flatMap(([n, r]) => r.map((s) => [
        n,
        s
      ])).reduce((n, [r, s]) => (n[r] = n[r] || [], n[r].push(s), n), {}));
    }
    get after() {
      return st(this, "delayedTransitions", () => bf(this));
    }
    get initial() {
      return st(this, "initial", () => wf(this, this.config.initial));
    }
    next(e, n) {
      const r = n.type, s = [];
      let i;
      const o = st(this, `candidates-${r}`, () => yf(this, r));
      for (const a of o) {
        const { guard: c } = a, f = e.context;
        let u = false;
        try {
          u = !c || jr(c, f, n, e);
        } catch (d) {
          const _ = typeof c == "string" ? c : typeof c == "object" ? c.type : void 0;
          throw new Error(`Unable to evaluate guard ${_ ? `'${_}' ` : ""}in transition for event '${r}' in state node '${this.id}':
${d.message}`);
        }
        if (u) {
          s.push(...a.actions), i = a;
          break;
        }
      }
      return i ? [
        i
      ] : void 0;
    }
    get events() {
      return st(this, "events", () => {
        const { states: e } = this, n = new Set(this.ownEvents);
        if (e) for (const r of Object.keys(e)) {
          const s = e[r];
          if (s.states) for (const i of s.events) n.add(`${i}`);
        }
        return Array.from(n);
      });
    }
    get ownEvents() {
      const e = new Set([
        ...this.transitions.keys()
      ].filter((n) => this.transitions.get(n).some((r) => !(!r.target && !r.actions.length && !r.reenter))));
      return Array.from(e);
    }
  }
  const Yf = "#";
  class Fr {
    constructor(e, n) {
      this.config = e, this.version = void 0, this.schemas = void 0, this.implementations = void 0, this.__xstatenode = true, this.idMap = /* @__PURE__ */ new Map(), this.root = void 0, this.id = void 0, this.states = void 0, this.events = void 0, this.id = e.id || "(machine)", this.implementations = {
        actors: (n == null ? void 0 : n.actors) ?? {},
        actions: (n == null ? void 0 : n.actions) ?? {},
        delays: (n == null ? void 0 : n.delays) ?? {},
        guards: (n == null ? void 0 : n.guards) ?? {}
      }, this.version = this.config.version, this.schemas = this.config.schemas, this.transition = this.transition.bind(this), this.getInitialSnapshot = this.getInitialSnapshot.bind(this), this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this), this.restoreSnapshot = this.restoreSnapshot.bind(this), this.start = this.start.bind(this), this.root = new Br(e, {
        _key: this.id,
        _machine: this
      }), this.root._initialize(), this.states = this.root.states, this.events = this.root.events, !("output" in this.root) && Object.values(this.states).some((r) => r.type === "final" && "output" in r) && console.warn("Missing `machine.output` declaration (top-level final state with output detected)");
    }
    provide(e) {
      const { actions: n, guards: r, actors: s, delays: i } = this.implementations;
      return new Fr(this.config, {
        actions: {
          ...n,
          ...e.actions
        },
        guards: {
          ...r,
          ...e.guards
        },
        actors: {
          ...s,
          ...e.actors
        },
        delays: {
          ...i,
          ...e.delays
        }
      });
    }
    resolveState(e) {
      const n = Uf(this.root, e.value), r = cn(un(this.root, n));
      return Xt({
        _nodes: [
          ...r
        ],
        context: e.context || {},
        children: {},
        status: Ur(r, this.root) ? "done" : e.status || "active",
        output: e.output,
        error: e.error,
        historyValue: e.historyValue
      }, this);
    }
    transition(e, n, r) {
      return On(e, n, r, []).snapshot;
    }
    microstep(e, n, r) {
      return On(e, n, r, []).microstates;
    }
    getTransitionData(e, n) {
      return Pr(this.root, e.value, e, n) || [];
    }
    getPreInitialState(e, n, r) {
      const { context: s } = this.config, i = Xt({
        context: typeof s != "function" && s ? s : {},
        _nodes: [
          this.root
        ],
        children: {},
        status: "active"
      }, this);
      return typeof s == "function" ? gt(i, n, e, [
        or(({ spawn: a, event: c, self: f }) => s({
          spawn: a,
          input: c.input,
          self: f
        }))
      ], r, void 0) : i;
    }
    getInitialSnapshot(e, n) {
      const r = ci(n), s = [], i = this.getPreInitialState(e, r, s), o = ir([
        {
          target: [
            ...bi(this.root)
          ],
          source: this.root,
          reenter: true,
          actions: [],
          eventType: null,
          toJSON: null
        }
      ], i, e, r, true, s), { snapshot: a } = On(o, r, e, s);
      return a;
    }
    start(e) {
      Object.values(e.children).forEach((n) => {
        n.getSnapshot().status === "active" && n.start();
      });
    }
    getStateNodeById(e) {
      const n = Or(e), r = n.slice(1), s = vn(n[0]) ? n[0].slice(Yf.length) : n[0], i = this.idMap.get(s);
      if (!i) throw new Error(`Child state node '#${s}' does not exist on machine '${this.id}'`);
      return fn(i, r);
    }
    get definition() {
      return this.root.definition;
    }
    toJSON() {
      return this.definition;
    }
    getPersistedSnapshot(e, n) {
      return Nf(e, n);
    }
    restoreSnapshot(e, n) {
      const r = {}, s = e.children;
      Object.keys(s).forEach((c) => {
        const f = s[c], u = f.snapshot, d = f.src, _ = typeof d == "string" ? Mr(this, d) : d;
        if (!_) return;
        const l = Ot(_, {
          id: c,
          parent: n.self,
          syncSnapshot: f.syncSnapshot,
          snapshot: u,
          src: d,
          systemId: f.systemId
        });
        r[c] = l;
      });
      const i = Xt({
        ...e,
        children: r,
        _nodes: Array.from(cn(un(this.root, e.value)))
      }, this), o = /* @__PURE__ */ new Set();
      function a(c, f) {
        if (!o.has(c)) {
          o.add(c);
          for (const u in c) {
            const d = c[u];
            if (d && typeof d == "object") {
              if ("xstate$$type" in d && d.xstate$$type === Rr) {
                c[u] = f[d.id];
                continue;
              }
              a(d, f);
            }
          }
        }
      }
      return a(i.context, r), i;
    }
  }
  function Xf(t, e) {
    return new Fr(t, e);
  }
  function Zf({ schemas: t, actors: e, actions: n, guards: r, delays: s }) {
    return {
      createMachine: (i) => Xf({
        ...i,
        schemas: t
      }, {
        actors: e,
        actions: n,
        guards: r,
        delays: s
      })
    };
  }
  const Qf = {
    timeout: 1 / 0
  };
  function eu(t, e, n) {
    const r = {
      ...Qf,
      ...n
    };
    return new Promise((s, i) => {
      const { signal: o } = r;
      if (o == null ? void 0 : o.aborted) {
        i(o.reason);
        return;
      }
      let a = false;
      r.timeout < 0 && console.error("`timeout` passed to `waitFor` is negative and it will reject its internal promise immediately.");
      const c = r.timeout === 1 / 0 ? void 0 : setTimeout(() => {
        f(), i(new Error(`Timeout of ${r.timeout} ms exceeded`));
      }, r.timeout), f = () => {
        clearTimeout(c), a = true, _ == null ? void 0 : _.unsubscribe(), d && o.removeEventListener("abort", d);
      };
      function u(l) {
        e(l) && (f(), s(l));
      }
      let d, _;
      u(t.getSnapshot()), !a && (o && (d = () => {
        f(), i(o.reason);
      }, o.addEventListener("abort", d)), _ = t.subscribe({
        next: u,
        error: (l) => {
          f(), i(l);
        },
        complete: () => {
          f(), i(new Error("Actor terminated without satisfying predicate"));
        }
      }), a && _.unsubscribe());
    });
  }
  var We = {}, rt = {}, Ke = {};
  Object.defineProperty(Ke, "__esModule", {
    value: true
  });
  Ke.anumber = ar;
  Ke.abytes = ki;
  Ke.ahash = nu;
  Ke.aexists = ru;
  Ke.aoutput = su;
  function ar(t) {
    if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
  }
  function tu(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
  }
  function ki(t, ...e) {
    if (!tu(t)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
  }
  function nu(t) {
    if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
    ar(t.outputLen), ar(t.blockLen);
  }
  function ru(t, e = true) {
    if (t.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t.finished) throw new Error("Hash#digest() has already been called");
  }
  function su(t, e) {
    ki(t);
    const n = e.outputLen;
    if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
  }
  var Lr = {}, xn = {};
  Object.defineProperty(xn, "__esModule", {
    value: true
  });
  xn.crypto = void 0;
  xn.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  (function(t) {
    Object.defineProperty(t, "__esModule", {
      value: true
    }), t.Hash = t.nextTick = t.byteSwapIfBE = t.isLE = void 0, t.isBytes = r, t.u8 = s, t.u32 = i, t.createView = o, t.rotr = a, t.rotl = c, t.byteSwap = f, t.byteSwap32 = u, t.bytesToHex = _, t.hexToBytes = v, t.asyncLoop = j, t.utf8ToBytes = D, t.toBytes = E, t.concatBytes = L, t.checkOpts = $, t.wrapConstructor = J, t.wrapConstructorWithOpts = W, t.wrapXOFConstructorWithOpts = Y, t.randomBytes = Z;
    const e = xn, n = Ke;
    function r(I) {
      return I instanceof Uint8Array || ArrayBuffer.isView(I) && I.constructor.name === "Uint8Array";
    }
    function s(I) {
      return new Uint8Array(I.buffer, I.byteOffset, I.byteLength);
    }
    function i(I) {
      return new Uint32Array(I.buffer, I.byteOffset, Math.floor(I.byteLength / 4));
    }
    function o(I) {
      return new DataView(I.buffer, I.byteOffset, I.byteLength);
    }
    function a(I, P) {
      return I << 32 - P | I >>> P;
    }
    function c(I, P) {
      return I << P | I >>> 32 - P >>> 0;
    }
    t.isLE = new Uint8Array(new Uint32Array([
      287454020
    ]).buffer)[0] === 68;
    function f(I) {
      return I << 24 & 4278190080 | I << 8 & 16711680 | I >>> 8 & 65280 | I >>> 24 & 255;
    }
    t.byteSwapIfBE = t.isLE ? (I) => I : (I) => f(I);
    function u(I) {
      for (let P = 0; P < I.length; P++) I[P] = f(I[P]);
    }
    const d = Array.from({
      length: 256
    }, (I, P) => P.toString(16).padStart(2, "0"));
    function _(I) {
      (0, n.abytes)(I);
      let P = "";
      for (let p = 0; p < I.length; p++) P += d[I[p]];
      return P;
    }
    const l = {
      _0: 48,
      _9: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function b(I) {
      if (I >= l._0 && I <= l._9) return I - l._0;
      if (I >= l.A && I <= l.F) return I - (l.A - 10);
      if (I >= l.a && I <= l.f) return I - (l.a - 10);
    }
    function v(I) {
      if (typeof I != "string") throw new Error("hex string expected, got " + typeof I);
      const P = I.length, p = P / 2;
      if (P % 2) throw new Error("hex string expected, got unpadded hex of length " + P);
      const M = new Uint8Array(p);
      for (let k = 0, C = 0; k < p; k++, C += 2) {
        const T = b(I.charCodeAt(C)), B = b(I.charCodeAt(C + 1));
        if (T === void 0 || B === void 0) {
          const F = I[C] + I[C + 1];
          throw new Error('hex string expected, got non-hex character "' + F + '" at index ' + C);
        }
        M[k] = T * 16 + B;
      }
      return M;
    }
    const S = async () => {
    };
    t.nextTick = S;
    async function j(I, P, p) {
      let M = Date.now();
      for (let k = 0; k < I; k++) {
        p(k);
        const C = Date.now() - M;
        C >= 0 && C < P || (await (0, t.nextTick)(), M += C);
      }
    }
    function D(I) {
      if (typeof I != "string") throw new Error("utf8ToBytes expected string, got " + typeof I);
      return new Uint8Array(new TextEncoder().encode(I));
    }
    function E(I) {
      return typeof I == "string" && (I = D(I)), (0, n.abytes)(I), I;
    }
    function L(...I) {
      let P = 0;
      for (let M = 0; M < I.length; M++) {
        const k = I[M];
        (0, n.abytes)(k), P += k.length;
      }
      const p = new Uint8Array(P);
      for (let M = 0, k = 0; M < I.length; M++) {
        const C = I[M];
        p.set(C, k), k += C.length;
      }
      return p;
    }
    class H {
      clone() {
        return this._cloneInto();
      }
    }
    t.Hash = H;
    function $(I, P) {
      if (P !== void 0 && {}.toString.call(P) !== "[object Object]") throw new Error("Options should be object or undefined");
      return Object.assign(I, P);
    }
    function J(I) {
      const P = (M) => I().update(E(M)).digest(), p = I();
      return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = () => I(), P;
    }
    function W(I) {
      const P = (M, k) => I(k).update(E(M)).digest(), p = I({});
      return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = (M) => I(M), P;
    }
    function Y(I) {
      const P = (M, k) => I(k).update(E(M)).digest(), p = I({});
      return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = (M) => I(M), P;
    }
    function Z(I = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function") return e.crypto.getRandomValues(new Uint8Array(I));
      if (e.crypto && typeof e.crypto.randomBytes == "function") return e.crypto.randomBytes(I);
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(Lr);
  Object.defineProperty(rt, "__esModule", {
    value: true
  });
  rt.HashMD = void 0;
  rt.setBigUint64 = Ai;
  rt.Chi = iu;
  rt.Maj = ou;
  const Mn = Ke, bt = Lr;
  function Ai(t, e, n, r) {
    if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
    const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), c = r ? 4 : 0, f = r ? 0 : 4;
    t.setUint32(e + c, o, r), t.setUint32(e + f, a, r);
  }
  function iu(t, e, n) {
    return t & e ^ ~t & n;
  }
  function ou(t, e, n) {
    return t & e ^ t & n ^ e & n;
  }
  class au extends bt.Hash {
    constructor(e, n, r, s) {
      super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = (0, bt.createView)(this.buffer);
    }
    update(e) {
      (0, Mn.aexists)(this);
      const { view: n, buffer: r, blockLen: s } = this;
      e = (0, bt.toBytes)(e);
      const i = e.length;
      for (let o = 0; o < i; ) {
        const a = Math.min(s - this.pos, i - o);
        if (a === s) {
          const c = (0, bt.createView)(e);
          for (; s <= i - o; o += s) this.process(c, o);
          continue;
        }
        r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
      }
      return this.length += e.length, this.roundClean(), this;
    }
    digestInto(e) {
      (0, Mn.aexists)(this), (0, Mn.aoutput)(e, this), this.finished = true;
      const { buffer: n, view: r, blockLen: s, isLE: i } = this;
      let { pos: o } = this;
      n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
      for (let d = o; d < s; d++) n[d] = 0;
      Ai(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
      const a = (0, bt.createView)(e), c = this.outputLen;
      if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
      const f = c / 4, u = this.get();
      if (f > u.length) throw new Error("_sha2: outputLen bigger than state");
      for (let d = 0; d < f; d++) a.setUint32(4 * d, u[d], i);
    }
    digest() {
      const { buffer: e, outputLen: n } = this;
      this.digestInto(e);
      const r = e.slice(0, n);
      return this.destroy(), r;
    }
    _cloneInto(e) {
      e || (e = new this.constructor()), e.set(...this.get());
      const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: a } = this;
      return e.length = s, e.pos = a, e.finished = i, e.destroyed = o, s % n && e.buffer.set(r), e;
    }
  }
  rt.HashMD = au;
  Object.defineProperty(We, "__esModule", {
    value: true
  });
  We.sha224 = We.sha256 = We.SHA256 = void 0;
  const Rn = rt, ge = Lr, cu = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]), Fe = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]), Le = new Uint32Array(64);
  class Hr extends Rn.HashMD {
    constructor() {
      super(64, 32, 8, false), this.A = Fe[0] | 0, this.B = Fe[1] | 0, this.C = Fe[2] | 0, this.D = Fe[3] | 0, this.E = Fe[4] | 0, this.F = Fe[5] | 0, this.G = Fe[6] | 0, this.H = Fe[7] | 0;
    }
    get() {
      const { A: e, B: n, C: r, D: s, E: i, F: o, G: a, H: c } = this;
      return [
        e,
        n,
        r,
        s,
        i,
        o,
        a,
        c
      ];
    }
    set(e, n, r, s, i, o, a, c) {
      this.A = e | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
    }
    process(e, n) {
      for (let d = 0; d < 16; d++, n += 4) Le[d] = e.getUint32(n, false);
      for (let d = 16; d < 64; d++) {
        const _ = Le[d - 15], l = Le[d - 2], b = (0, ge.rotr)(_, 7) ^ (0, ge.rotr)(_, 18) ^ _ >>> 3, v = (0, ge.rotr)(l, 17) ^ (0, ge.rotr)(l, 19) ^ l >>> 10;
        Le[d] = v + Le[d - 7] + b + Le[d - 16] | 0;
      }
      let { A: r, B: s, C: i, D: o, E: a, F: c, G: f, H: u } = this;
      for (let d = 0; d < 64; d++) {
        const _ = (0, ge.rotr)(a, 6) ^ (0, ge.rotr)(a, 11) ^ (0, ge.rotr)(a, 25), l = u + _ + (0, Rn.Chi)(a, c, f) + cu[d] + Le[d] | 0, v = ((0, ge.rotr)(r, 2) ^ (0, ge.rotr)(r, 13) ^ (0, ge.rotr)(r, 22)) + (0, Rn.Maj)(r, s, i) | 0;
        u = f, f = c, c = a, a = o + l | 0, o = i, i = s, s = r, r = l + v | 0;
      }
      r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, f = f + this.G | 0, u = u + this.H | 0, this.set(r, s, i, o, a, c, f, u);
    }
    roundClean() {
      Le.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
    }
  }
  We.SHA256 = Hr;
  class fu extends Hr {
    constructor() {
      super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
    }
  }
  We.sha256 = (0, ge.wrapConstructor)(() => new Hr());
  We.sha224 = (0, ge.wrapConstructor)(() => new fu());
  function uu(t) {
    if (t.length >= 255) throw new TypeError("Alphabet too long");
    for (var e = new Uint8Array(256), n = 0; n < e.length; n++) e[n] = 255;
    for (var r = 0; r < t.length; r++) {
      var s = t.charAt(r), i = s.charCodeAt(0);
      if (e[i] !== 255) throw new TypeError(s + " is ambiguous");
      e[i] = r;
    }
    var o = t.length, a = t.charAt(0), c = Math.log(o) / Math.log(256), f = Math.log(256) / Math.log(o);
    function u(l) {
      if (l instanceof Uint8Array || (ArrayBuffer.isView(l) ? l = new Uint8Array(l.buffer, l.byteOffset, l.byteLength) : Array.isArray(l) && (l = Uint8Array.from(l))), !(l instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
      if (l.length === 0) return "";
      for (var b = 0, v = 0, S = 0, j = l.length; S !== j && l[S] === 0; ) S++, b++;
      for (var D = (j - S) * f + 1 >>> 0, E = new Uint8Array(D); S !== j; ) {
        for (var L = l[S], H = 0, $ = D - 1; (L !== 0 || H < v) && $ !== -1; $--, H++) L += 256 * E[$] >>> 0, E[$] = L % o >>> 0, L = L / o >>> 0;
        if (L !== 0) throw new Error("Non-zero carry");
        v = H, S++;
      }
      for (var J = D - v; J !== D && E[J] === 0; ) J++;
      for (var W = a.repeat(b); J < D; ++J) W += t.charAt(E[J]);
      return W;
    }
    function d(l) {
      if (typeof l != "string") throw new TypeError("Expected String");
      if (l.length === 0) return new Uint8Array();
      for (var b = 0, v = 0, S = 0; l[b] === a; ) v++, b++;
      for (var j = (l.length - b) * c + 1 >>> 0, D = new Uint8Array(j); l[b]; ) {
        var E = l.charCodeAt(b);
        if (E > 255) return;
        var L = e[E];
        if (L === 255) return;
        for (var H = 0, $ = j - 1; (L !== 0 || H < S) && $ !== -1; $--, H++) L += o * D[$] >>> 0, D[$] = L % 256 >>> 0, L = L / 256 >>> 0;
        if (L !== 0) throw new Error("Non-zero carry");
        S = H, b++;
      }
      for (var J = j - S; J !== j && D[J] === 0; ) J++;
      for (var W = new Uint8Array(v + (j - J)), Y = v; J !== j; ) W[Y++] = D[J++];
      return W;
    }
    function _(l) {
      var b = d(l);
      if (b) return b;
      throw new Error("Non-base" + o + " character");
    }
    return {
      encode: u,
      decodeUnsafe: d,
      decode: _
    };
  }
  var du = uu;
  const lu = du, hu = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  var _u = lu(hu), jn = _u, gu = function(t) {
    function e(i) {
      var o = Uint8Array.from(i), a = t(o), c = o.length + 4, f = new Uint8Array(c);
      return f.set(o, 0), f.set(a.subarray(0, 4), o.length), jn.encode(f, c);
    }
    function n(i) {
      var o = i.slice(0, -4), a = i.slice(-4), c = t(o);
      if (!(a[0] ^ c[0] | a[1] ^ c[1] | a[2] ^ c[2] | a[3] ^ c[3])) return o;
    }
    function r(i) {
      var o = jn.decodeUnsafe(i);
      if (o) return n(o);
    }
    function s(i) {
      var o = jn.decode(i), a = n(o);
      if (!a) throw new Error("Invalid checksum");
      return a;
    }
    return {
      encode: e,
      decode: s,
      decodeUnsafe: r
    };
  }, { sha256: ps } = We, pu = gu;
  function yu(t) {
    return ps(ps(t));
  }
  var bu = pu(yu);
  const Ei = Tr(bu), Nr = "automerge:", zr = (t) => {
    const e = new RegExp(`^${Nr}(\\w+)$`), [, n] = t.match(e) || [], r = n, s = Ti(r);
    if (!s) throw new Error("Invalid document URL: " + t);
    return {
      binaryDocumentId: s,
      documentId: r
    };
  }, Wr = (t) => {
    const e = t instanceof Uint8Array || typeof t == "string" ? t : "documentId" in t ? t.documentId : void 0, n = e instanceof Uint8Array ? cr(e) : typeof e == "string" ? e : void 0;
    if (n === void 0) throw new Error("Invalid documentId: " + e);
    return Nr + n;
  }, Ii = (t) => {
    if (!t || !t.startsWith(Nr)) return false;
    const e = t;
    try {
      const { documentId: n } = zr(e);
      return Ci(n);
    } catch {
      return false;
    }
  }, Ci = (t) => {
    const e = Ti(t);
    if (e === void 0) return false;
    const n = yc(e);
    return yn(n);
  }, mu = (t) => yn(t), wu = () => {
    const t = qs(null, new Uint8Array(16));
    return Wr({
      documentId: t
    });
  }, Ti = (t) => Ei.decodeUnsafe(t), cr = (t) => Ei.encode(t), Dn = (t) => {
    if (t instanceof Uint8Array) return cr(t);
    if (Ii(t)) return zr(t).documentId;
    if (Ci(t)) return t;
    if (mu(t)) {
      console.warn("Future versions will not support UUIDs as document IDs; use Automerge URLs instead.");
      const e = bc(t);
      return cr(e);
    }
    throw new Error(`Invalid AutomergeUrl: '${t}'`);
  };
  let fr;
  try {
    fr = new TextDecoder();
  } catch {
  }
  let U, Ze, x = 0;
  const vu = 105, xu = 57342, Su = 57343, ys = 57337, bs = 6, it = {};
  let mt = 11281e4, Me = 1681e4, V = {}, te, dn, ln = 0, Mt = 0, se, ye, ne = [], ur = [], de, ae, wt, ms = {
    useRecords: false,
    mapsAsObjects: true
  }, Rt = false, Oi = 2;
  try {
    new Function("");
  } catch {
    Oi = 1 / 0;
  }
  class jt {
    constructor(e) {
      if (e && ((e.keyMap || e._keyMap) && !e.useRecords && (e.useRecords = false, e.mapsAsObjects = true), e.useRecords === false && e.mapsAsObjects === void 0 && (e.mapsAsObjects = true), e.getStructures && (e.getShared = e.getStructures), e.getShared && !e.structures && ((e.structures = []).uninitialized = true), e.keyMap)) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [n, r] of Object.entries(e.keyMap)) this.mapKey.set(r, n);
      }
      Object.assign(this, e);
    }
    decodeKey(e) {
      return this.keyMap && this.mapKey.get(e) || e;
    }
    encodeKey(e) {
      return this.keyMap && this.keyMap.hasOwnProperty(e) ? this.keyMap[e] : e;
    }
    encodeKeys(e) {
      if (!this._keyMap) return e;
      let n = /* @__PURE__ */ new Map();
      for (let [r, s] of Object.entries(e)) n.set(this._keyMap.hasOwnProperty(r) ? this._keyMap[r] : r, s);
      return n;
    }
    decodeKeys(e) {
      if (!this._keyMap || e.constructor.name != "Map") return e;
      if (!this._mapKey) {
        this._mapKey = /* @__PURE__ */ new Map();
        for (let [r, s] of Object.entries(this._keyMap)) this._mapKey.set(s, r);
      }
      let n = {};
      return e.forEach((r, s) => n[be(this._mapKey.has(s) ? this._mapKey.get(s) : s)] = r), n;
    }
    mapDecode(e, n) {
      let r = this.decode(e);
      if (this._keyMap) switch (r.constructor.name) {
        case "Array":
          return r.map((s) => this.decodeKeys(s));
      }
      return r;
    }
    decode(e, n) {
      if (U) return Di(() => (_r(), this ? this.decode(e, n) : jt.prototype.decode.call(ms, e, n)));
      Ze = n > -1 ? n : e.length, x = 0, Mt = 0, dn = null, se = null, U = e;
      try {
        ae = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
      } catch (r) {
        throw U = null, e instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (e && typeof e == "object" ? e.constructor.name : typeof e));
      }
      if (this instanceof jt) {
        if (V = this, de = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues), this.structures) return te = this.structures, Ht();
        (!te || te.length > 0) && (te = []);
      } else V = ms, (!te || te.length > 0) && (te = []), de = null;
      return Ht();
    }
    decodeMultiple(e, n) {
      let r, s = 0;
      try {
        let i = e.length;
        Rt = true;
        let o = this ? this.decode(e, i) : Gr.decode(e, i);
        if (n) {
          if (n(o) === false) return;
          for (; x < i; ) if (s = x, n(Ht()) === false) return;
        } else {
          for (r = [
            o
          ]; x < i; ) s = x, r.push(Ht());
          return r;
        }
      } catch (i) {
        throw i.lastPosition = s, i.values = r, i;
      } finally {
        Rt = false, _r();
      }
    }
  }
  function Ht() {
    try {
      let t = K();
      if (se) {
        if (x >= se.postBundlePosition) {
          let e = new Error("Unexpected bundle position");
          throw e.incomplete = true, e;
        }
        x = se.postBundlePosition, se = null;
      }
      if (x == Ze) te = null, U = null, ye && (ye = null);
      else if (x > Ze) {
        let e = new Error("Unexpected end of CBOR data");
        throw e.incomplete = true, e;
      } else if (!Rt) throw new Error("Data read, but end of buffer not reached");
      return t;
    } catch (t) {
      throw _r(), (t instanceof RangeError || t.message.startsWith("Unexpected end of buffer")) && (t.incomplete = true), t;
    }
  }
  function K() {
    let t = U[x++], e = t >> 5;
    if (t = t & 31, t > 23) switch (t) {
      case 24:
        t = U[x++];
        break;
      case 25:
        if (e == 7) return Iu();
        t = ae.getUint16(x), x += 2;
        break;
      case 26:
        if (e == 7) {
          let n = ae.getFloat32(x);
          if (V.useFloat32 > 2) {
            let r = Kr[(U[x] & 127) << 1 | U[x + 1] >> 7];
            return x += 4, (r * n + (n > 0 ? 0.5 : -0.5) >> 0) / r;
          }
          return x += 4, n;
        }
        t = ae.getUint32(x), x += 4;
        break;
      case 27:
        if (e == 7) {
          let n = ae.getFloat64(x);
          return x += 8, n;
        }
        if (e > 1) {
          if (ae.getUint32(x) > 0) throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          t = ae.getUint32(x + 4);
        } else V.int64AsNumber ? (t = ae.getUint32(x) * 4294967296, t += ae.getUint32(x + 4)) : t = ae.getBigUint64(x);
        x += 8;
        break;
      case 31:
        switch (e) {
          case 2:
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let n = [], r, s = 0;
            for (; (r = K()) != it; ) {
              if (s >= mt) throw new Error(`Array length exceeds ${mt}`);
              n[s++] = r;
            }
            return e == 4 ? n : e == 3 ? n.join("") : Buffer.concat(n);
          case 5:
            let i;
            if (V.mapsAsObjects) {
              let o = {}, a = 0;
              if (V.keyMap) for (; (i = K()) != it; ) {
                if (a++ >= Me) throw new Error(`Property count exceeds ${Me}`);
                o[be(V.decodeKey(i))] = K();
              }
              else for (; (i = K()) != it; ) {
                if (a++ >= Me) throw new Error(`Property count exceeds ${Me}`);
                o[be(i)] = K();
              }
              return o;
            } else {
              wt && (V.mapsAsObjects = true, wt = false);
              let o = /* @__PURE__ */ new Map();
              if (V.keyMap) {
                let a = 0;
                for (; (i = K()) != it; ) {
                  if (a++ >= Me) throw new Error(`Map size exceeds ${Me}`);
                  o.set(V.decodeKey(i), K());
                }
              } else {
                let a = 0;
                for (; (i = K()) != it; ) {
                  if (a++ >= Me) throw new Error(`Map size exceeds ${Me}`);
                  o.set(i, K());
                }
              }
              return o;
            }
          case 7:
            return it;
          default:
            throw new Error("Invalid major type for indefinite length " + e);
        }
      default:
        throw new Error("Unknown token " + t);
    }
    switch (e) {
      case 0:
        return t;
      case 1:
        return ~t;
      case 2:
        return Eu(t);
      case 3:
        if (Mt >= x) return dn.slice(x - ln, (x += t) - ln);
        if (Mt == 0 && Ze < 140 && t < 32) {
          let s = t < 16 ? Mi(t) : Au(t);
          if (s != null) return s;
        }
        return ku(t);
      case 4:
        if (t >= mt) throw new Error(`Array length exceeds ${mt}`);
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = K();
        return n;
      case 5:
        if (t >= Me) throw new Error(`Map size exceeds ${mt}`);
        if (V.mapsAsObjects) {
          let s = {};
          if (V.keyMap) for (let i = 0; i < t; i++) s[be(V.decodeKey(K()))] = K();
          else for (let i = 0; i < t; i++) s[be(K())] = K();
          return s;
        } else {
          wt && (V.mapsAsObjects = true, wt = false);
          let s = /* @__PURE__ */ new Map();
          if (V.keyMap) for (let i = 0; i < t; i++) s.set(V.decodeKey(K()), K());
          else for (let i = 0; i < t; i++) s.set(K(), K());
          return s;
        }
      case 6:
        if (t >= ys) {
          let s = te[t & 8191];
          if (s) return s.read || (s.read = dr(s)), s.read();
          if (t < 65536) {
            if (t == Su) {
              let i = ut(), o = K(), a = K();
              hr(o, a);
              let c = {};
              if (V.keyMap) for (let f = 2; f < i; f++) {
                let u = V.decodeKey(a[f - 2]);
                c[be(u)] = K();
              }
              else for (let f = 2; f < i; f++) {
                let u = a[f - 2];
                c[be(u)] = K();
              }
              return c;
            } else if (t == xu) {
              let i = ut(), o = K();
              for (let a = 2; a < i; a++) hr(o++, K());
              return K();
            } else if (t == ys) return ju();
            if (V.getShared && (Vr(), s = te[t & 8191], s)) return s.read || (s.read = dr(s)), s.read();
          }
        }
        let r = ne[t];
        if (r) return r.handlesRead ? r(K) : r(K());
        {
          let s = K();
          for (let i = 0; i < ur.length; i++) {
            let o = ur[i](t, s);
            if (o !== void 0) return o;
          }
          return new tt(s, t);
        }
      case 7:
        switch (t) {
          case 20:
            return false;
          case 21:
            return true;
          case 22:
            return null;
          case 23:
            return;
          case 31:
          default:
            let s = (de || Ge())[t];
            if (s !== void 0) return s;
            throw new Error("Unknown token " + t);
        }
      default:
        if (isNaN(t)) {
          let s = new Error("Unexpected end of CBOR data");
          throw s.incomplete = true, s;
        }
        throw new Error("Unknown CBOR token " + t);
    }
  }
  const ws = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
  function dr(t) {
    if (!t) throw new Error("Structure is required in record definition");
    function e() {
      let n = U[x++];
      if (n = n & 31, n > 23) switch (n) {
        case 24:
          n = U[x++];
          break;
        case 25:
          n = ae.getUint16(x), x += 2;
          break;
        case 26:
          n = ae.getUint32(x), x += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + U[x - 1]);
      }
      let r = this.compiledReader;
      for (; r; ) {
        if (r.propertyCount === n) return r(K);
        r = r.next;
      }
      if (this.slowReads++ >= Oi) {
        let i = this.length == n ? this : this.slice(0, n);
        return r = V.keyMap ? new Function("r", "return {" + i.map((o) => V.decodeKey(o)).map((o) => ws.test(o) ? be(o) + ":r()" : "[" + JSON.stringify(o) + "]:r()").join(",") + "}") : new Function("r", "return {" + i.map((o) => ws.test(o) ? be(o) + ":r()" : "[" + JSON.stringify(o) + "]:r()").join(",") + "}"), this.compiledReader && (r.next = this.compiledReader), r.propertyCount = n, this.compiledReader = r, r(K);
      }
      let s = {};
      if (V.keyMap) for (let i = 0; i < n; i++) s[be(V.decodeKey(this[i]))] = K();
      else for (let i = 0; i < n; i++) s[be(this[i])] = K();
      return s;
    }
    return t.slowReads = 0, e;
  }
  function be(t) {
    if (typeof t == "string") return t === "__proto__" ? "__proto_" : t;
    if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
    if (t == null) return t + "";
    throw new Error("Invalid property name type " + typeof t);
  }
  let ku = lr;
  function lr(t) {
    let e;
    if (t < 16 && (e = Mi(t))) return e;
    if (t > 64 && fr) return fr.decode(U.subarray(x, x += t));
    const n = x + t, r = [];
    for (e = ""; x < n; ) {
      const s = U[x++];
      if (!(s & 128)) r.push(s);
      else if ((s & 224) === 192) {
        const i = U[x++] & 63;
        r.push((s & 31) << 6 | i);
      } else if ((s & 240) === 224) {
        const i = U[x++] & 63, o = U[x++] & 63;
        r.push((s & 31) << 12 | i << 6 | o);
      } else if ((s & 248) === 240) {
        const i = U[x++] & 63, o = U[x++] & 63, a = U[x++] & 63;
        let c = (s & 7) << 18 | i << 12 | o << 6 | a;
        c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | c & 1023), r.push(c);
      } else r.push(s);
      r.length >= 4096 && (e += ie.apply(String, r), r.length = 0);
    }
    return r.length > 0 && (e += ie.apply(String, r)), e;
  }
  let ie = String.fromCharCode;
  function Au(t) {
    let e = x, n = new Array(t);
    for (let r = 0; r < t; r++) {
      const s = U[x++];
      if ((s & 128) > 0) {
        x = e;
        return;
      }
      n[r] = s;
    }
    return ie.apply(String, n);
  }
  function Mi(t) {
    if (t < 4) if (t < 2) {
      if (t === 0) return "";
      {
        let e = U[x++];
        if ((e & 128) > 1) {
          x -= 1;
          return;
        }
        return ie(e);
      }
    } else {
      let e = U[x++], n = U[x++];
      if ((e & 128) > 0 || (n & 128) > 0) {
        x -= 2;
        return;
      }
      if (t < 3) return ie(e, n);
      let r = U[x++];
      if ((r & 128) > 0) {
        x -= 3;
        return;
      }
      return ie(e, n, r);
    }
    else {
      let e = U[x++], n = U[x++], r = U[x++], s = U[x++];
      if ((e & 128) > 0 || (n & 128) > 0 || (r & 128) > 0 || (s & 128) > 0) {
        x -= 4;
        return;
      }
      if (t < 6) {
        if (t === 4) return ie(e, n, r, s);
        {
          let i = U[x++];
          if ((i & 128) > 0) {
            x -= 5;
            return;
          }
          return ie(e, n, r, s, i);
        }
      } else if (t < 8) {
        let i = U[x++], o = U[x++];
        if ((i & 128) > 0 || (o & 128) > 0) {
          x -= 6;
          return;
        }
        if (t < 7) return ie(e, n, r, s, i, o);
        let a = U[x++];
        if ((a & 128) > 0) {
          x -= 7;
          return;
        }
        return ie(e, n, r, s, i, o, a);
      } else {
        let i = U[x++], o = U[x++], a = U[x++], c = U[x++];
        if ((i & 128) > 0 || (o & 128) > 0 || (a & 128) > 0 || (c & 128) > 0) {
          x -= 8;
          return;
        }
        if (t < 10) {
          if (t === 8) return ie(e, n, r, s, i, o, a, c);
          {
            let f = U[x++];
            if ((f & 128) > 0) {
              x -= 9;
              return;
            }
            return ie(e, n, r, s, i, o, a, c, f);
          }
        } else if (t < 12) {
          let f = U[x++], u = U[x++];
          if ((f & 128) > 0 || (u & 128) > 0) {
            x -= 10;
            return;
          }
          if (t < 11) return ie(e, n, r, s, i, o, a, c, f, u);
          let d = U[x++];
          if ((d & 128) > 0) {
            x -= 11;
            return;
          }
          return ie(e, n, r, s, i, o, a, c, f, u, d);
        } else {
          let f = U[x++], u = U[x++], d = U[x++], _ = U[x++];
          if ((f & 128) > 0 || (u & 128) > 0 || (d & 128) > 0 || (_ & 128) > 0) {
            x -= 12;
            return;
          }
          if (t < 14) {
            if (t === 12) return ie(e, n, r, s, i, o, a, c, f, u, d, _);
            {
              let l = U[x++];
              if ((l & 128) > 0) {
                x -= 13;
                return;
              }
              return ie(e, n, r, s, i, o, a, c, f, u, d, _, l);
            }
          } else {
            let l = U[x++], b = U[x++];
            if ((l & 128) > 0 || (b & 128) > 0) {
              x -= 14;
              return;
            }
            if (t < 15) return ie(e, n, r, s, i, o, a, c, f, u, d, _, l, b);
            let v = U[x++];
            if ((v & 128) > 0) {
              x -= 15;
              return;
            }
            return ie(e, n, r, s, i, o, a, c, f, u, d, _, l, b, v);
          }
        }
      }
    }
  }
  function Eu(t) {
    return V.copyBuffers ? Uint8Array.prototype.slice.call(U, x, x += t) : U.subarray(x, x += t);
  }
  let Ri = new Float32Array(1), Nt = new Uint8Array(Ri.buffer, 0, 4);
  function Iu() {
    let t = U[x++], e = U[x++], n = (t & 127) >> 2;
    if (n === 31) return e || t & 3 ? NaN : t & 128 ? -1 / 0 : 1 / 0;
    if (n === 0) {
      let r = ((t & 3) << 8 | e) / 16777216;
      return t & 128 ? -r : r;
    }
    return Nt[3] = t & 128 | (n >> 1) + 56, Nt[2] = (t & 7) << 5 | e >> 3, Nt[1] = e << 5, Nt[0] = 0, Ri[0];
  }
  new Array(4096);
  class tt {
    constructor(e, n) {
      this.value = e, this.tag = n;
    }
  }
  ne[0] = (t) => new Date(t);
  ne[1] = (t) => new Date(Math.round(t * 1e3));
  ne[2] = (t) => {
    let e = BigInt(0);
    for (let n = 0, r = t.byteLength; n < r; n++) e = BigInt(t[n]) + (e << BigInt(8));
    return e;
  };
  ne[3] = (t) => BigInt(-1) - ne[2](t);
  ne[4] = (t) => +(t[1] + "e" + t[0]);
  ne[5] = (t) => t[1] * Math.exp(t[0] * Math.log(2));
  const hr = (t, e) => {
    t = t - 57344;
    let n = te[t];
    n && n.isShared && ((te.restoreStructures || (te.restoreStructures = []))[t] = n), te[t] = e, e.read = dr(e);
  };
  ne[vu] = (t) => {
    let e = t.length, n = t[1];
    hr(t[0], n);
    let r = {};
    for (let s = 2; s < e; s++) {
      let i = n[s - 2];
      r[be(i)] = t[s];
    }
    return r;
  };
  ne[14] = (t) => se ? se[0].slice(se.position0, se.position0 += t) : new tt(t, 14);
  ne[15] = (t) => se ? se[1].slice(se.position1, se.position1 += t) : new tt(t, 15);
  let Cu = {
    Error,
    RegExp
  };
  ne[27] = (t) => (Cu[t[0]] || Error)(t[1], t[2]);
  const ji = (t) => {
    if (U[x++] != 132) {
      let n = new Error("Packed values structure must be followed by a 4 element array");
      throw U.length < x && (n.incomplete = true), n;
    }
    let e = t();
    if (!e || !e.length) {
      let n = new Error("Packed values structure must be followed by a 4 element array");
      throw n.incomplete = true, n;
    }
    return de = de ? e.concat(de.slice(e.length)) : e, de.prefixes = t(), de.suffixes = t(), t();
  };
  ji.handlesRead = true;
  ne[51] = ji;
  ne[bs] = (t) => {
    if (!de) if (V.getShared) Vr();
    else return new tt(t, bs);
    if (typeof t == "number") return de[16 + (t >= 0 ? 2 * t : -2 * t - 1)];
    let e = new Error("No support for non-integer packed references yet");
    throw t === void 0 && (e.incomplete = true), e;
  };
  ne[28] = (t) => {
    ye || (ye = /* @__PURE__ */ new Map(), ye.id = 0);
    let e = ye.id++, n = x, r = U[x], s;
    r >> 5 == 4 ? s = [] : s = {};
    let i = {
      target: s
    };
    ye.set(e, i);
    let o = t();
    return i.used ? (Object.getPrototypeOf(s) !== Object.getPrototypeOf(o) && (x = n, s = o, ye.set(e, {
      target: s
    }), o = t()), Object.assign(s, o)) : (i.target = o, o);
  };
  ne[28].handlesRead = true;
  ne[29] = (t) => {
    let e = ye.get(t);
    return e.used = true, e.target;
  };
  ne[258] = (t) => new Set(t);
  (ne[259] = (t) => (V.mapsAsObjects && (V.mapsAsObjects = false, wt = true), t())).handlesRead = true;
  function ot(t, e) {
    return typeof t == "string" ? t + e : t instanceof Array ? t.concat(e) : Object.assign({}, t, e);
  }
  function Ge() {
    if (!de) if (V.getShared) Vr();
    else throw new Error("No packed values available");
    return de;
  }
  const Tu = 1399353956;
  ur.push((t, e) => {
    if (t >= 225 && t <= 255) return ot(Ge().prefixes[t - 224], e);
    if (t >= 28704 && t <= 32767) return ot(Ge().prefixes[t - 28672], e);
    if (t >= 1879052288 && t <= 2147483647) return ot(Ge().prefixes[t - 1879048192], e);
    if (t >= 216 && t <= 223) return ot(e, Ge().suffixes[t - 216]);
    if (t >= 27647 && t <= 28671) return ot(e, Ge().suffixes[t - 27639]);
    if (t >= 1811940352 && t <= 1879048191) return ot(e, Ge().suffixes[t - 1811939328]);
    if (t == Tu) return {
      packedValues: de,
      structures: te.slice(0),
      version: e
    };
    if (t == 55799) return e;
  });
  const Ou = new Uint8Array(new Uint16Array([
    1
  ]).buffer)[0] == 1, vs = [
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    typeof BigUint64Array > "u" ? {
      name: "BigUint64Array"
    } : BigUint64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    typeof BigInt64Array > "u" ? {
      name: "BigInt64Array"
    } : BigInt64Array,
    Float32Array,
    Float64Array
  ], Mu = [
    64,
    68,
    69,
    70,
    71,
    72,
    77,
    78,
    79,
    85,
    86
  ];
  for (let t = 0; t < vs.length; t++) Ru(vs[t], Mu[t]);
  function Ru(t, e) {
    let n = "get" + t.name.slice(0, -5), r;
    typeof t == "function" ? r = t.BYTES_PER_ELEMENT : t = null;
    for (let s = 0; s < 2; s++) {
      if (!s && r == 1) continue;
      let i = r == 2 ? 1 : r == 4 ? 2 : r == 8 ? 3 : 0;
      ne[s ? e : e - 4] = r == 1 || s == Ou ? (o) => {
        if (!t) throw new Error("Could not find typed array for code " + e);
        return !V.copyBuffers && (r === 1 || r === 2 && !(o.byteOffset & 1) || r === 4 && !(o.byteOffset & 3) || r === 8 && !(o.byteOffset & 7)) ? new t(o.buffer, o.byteOffset, o.byteLength >> i) : new t(Uint8Array.prototype.slice.call(o, 0).buffer);
      } : (o) => {
        if (!t) throw new Error("Could not find typed array for code " + e);
        let a = new DataView(o.buffer, o.byteOffset, o.byteLength), c = o.length >> i, f = new t(c), u = a[n];
        for (let d = 0; d < c; d++) f[d] = u.call(a, d << i, s);
        return f;
      };
    }
  }
  function ju() {
    let t = ut(), e = x + K();
    for (let r = 2; r < t; r++) {
      let s = ut();
      x += s;
    }
    let n = x;
    return x = e, se = [
      lr(ut()),
      lr(ut())
    ], se.position0 = 0, se.position1 = 0, se.postBundlePosition = x, x = n, K();
  }
  function ut() {
    let t = U[x++] & 31;
    if (t > 23) switch (t) {
      case 24:
        t = U[x++];
        break;
      case 25:
        t = ae.getUint16(x), x += 2;
        break;
      case 26:
        t = ae.getUint32(x), x += 4;
        break;
    }
    return t;
  }
  function Vr() {
    if (V.getShared) {
      let t = Di(() => (U = null, V.getShared())) || {}, e = t.structures || [];
      V.sharedVersion = t.version, de = V.sharedValues = t.packedValues, te === true ? V.structures = te = e : te.splice.apply(te, [
        0,
        e.length
      ].concat(e));
    }
  }
  function Di(t) {
    let e = Ze, n = x, r = ln, s = Mt, i = dn, o = ye, a = se, c = new Uint8Array(U.slice(0, Ze)), f = te, u = V, d = Rt, _ = t();
    return Ze = e, x = n, ln = r, Mt = s, dn = i, ye = o, se = a, U = c, Rt = d, te = f, V = u, ae = new DataView(U.buffer, U.byteOffset, U.byteLength), _;
  }
  function _r() {
    U = null, ye = null, te = null;
  }
  const Kr = new Array(147);
  for (let t = 0; t < 256; t++) Kr[t] = +("1e" + Math.floor(45.15 - t * 0.30103));
  let Gr = new jt({
    useRecords: false
  });
  const Ui = Gr.decode;
  Gr.decodeMultiple;
  let Zt;
  try {
    Zt = new TextEncoder();
  } catch {
  }
  let gr, Pi;
  const Sn = typeof globalThis == "object" && globalThis.Buffer, Ft = typeof Sn < "u", Un = Ft ? Sn.allocUnsafeSlow : Uint8Array, xs = Ft ? Sn : Uint8Array, Ss = 256, ks = Ft ? 4294967296 : 2144337920;
  let Pn, m, Q, g = 0, He, re = null;
  const Du = 61440, Uu = /[\u0080-\uFFFF]/, he = Symbol("record-id");
  class $i extends jt {
    constructor(e) {
      super(e), this.offset = 0;
      let n, r, s, i, o;
      e = e || {};
      let a = xs.prototype.utf8Write ? function(p, M, k) {
        return m.utf8Write(p, M, k);
      } : Zt && Zt.encodeInto ? function(p, M) {
        return Zt.encodeInto(p, m.subarray(M)).written;
      } : false, c = this, f = e.structures || e.saveStructures, u = e.maxSharedStructures;
      if (u == null && (u = f ? 128 : 0), u > 8190) throw new Error("Maximum maxSharedStructure is 8190");
      let d = e.sequential;
      d && (u = 0), this.structures || (this.structures = []), this.saveStructures && (this.saveShared = this.saveStructures);
      let _, l, b = e.sharedValues, v;
      if (b) {
        v = /* @__PURE__ */ Object.create(null);
        for (let p = 0, M = b.length; p < M; p++) v[b[p]] = p;
      }
      let S = [], j = 0, D = 0;
      this.mapEncode = function(p, M) {
        if (this._keyMap && !this._mapped) switch (p.constructor.name) {
          case "Array":
            p = p.map((k) => this.encodeKeys(k));
            break;
        }
        return this.encode(p, M);
      }, this.encode = function(p, M) {
        if (m || (m = new Un(8192), Q = new DataView(m.buffer, 0, 8192), g = 0), He = m.length - 10, He - g < 2048 ? (m = new Un(m.length), Q = new DataView(m.buffer, 0, m.length), He = m.length - 10, g = 0) : M === Is && (g = g + 7 & 2147483640), n = g, c.useSelfDescribedHeader && (Q.setUint32(g, 3654940416), g += 3), o = c.structuredClone ? /* @__PURE__ */ new Map() : null, c.bundleStrings && typeof p != "string" ? (re = [], re.size = 1 / 0) : re = null, r = c.structures, r) {
          if (r.uninitialized) {
            let C = c.getShared() || {};
            c.structures = r = C.structures || [], c.sharedVersion = C.version;
            let T = c.sharedValues = C.packedValues;
            if (T) {
              v = {};
              for (let B = 0, F = T.length; B < F; B++) v[T[B]] = B;
            }
          }
          let k = r.length;
          if (k > u && !d && (k = u), !r.transitions) {
            r.transitions = /* @__PURE__ */ Object.create(null);
            for (let C = 0; C < k; C++) {
              let T = r[C];
              if (!T) continue;
              let B, F = r.transitions;
              for (let N = 0, z = T.length; N < z; N++) {
                F[he] === void 0 && (F[he] = C);
                let G = T[N];
                B = F[G], B || (B = F[G] = /* @__PURE__ */ Object.create(null)), F = B;
              }
              F[he] = C | 1048576;
            }
          }
          d || (r.nextId = k);
        }
        if (s && (s = false), i = r || [], l = v, e.pack) {
          let k = /* @__PURE__ */ new Map();
          if (k.values = [], k.encoder = c, k.maxValues = e.maxPrivatePackedValues || (v ? 16 : 1 / 0), k.objectMap = v || false, k.samplingPackedValues = _, Qt(p, k), k.values.length > 0) {
            m[g++] = 216, m[g++] = 51, Ee(4);
            let C = k.values;
            E(C), Ee(0), Ee(0), l = Object.create(v || null);
            for (let T = 0, B = C.length; T < B; T++) l[C[T]] = T;
          }
        }
        Pn = M & Bn;
        try {
          if (Pn) return;
          if (E(p), re && Es(n, E), c.offset = g, o && o.idsToInsert) {
            g += o.idsToInsert.length * 2, g > He && H(g), c.offset = g;
            let k = Bu(m.subarray(n, g), o.idsToInsert);
            return o = null, k;
          }
          return M & Is ? (m.start = n, m.end = g, m) : m.subarray(n, g);
        } finally {
          if (r) {
            if (D < 10 && D++, r.length > u && (r.length = u), j > 1e4) r.transitions = null, D = 0, j = 0, S.length > 0 && (S = []);
            else if (S.length > 0 && !d) {
              for (let k = 0, C = S.length; k < C; k++) S[k][he] = void 0;
              S = [];
            }
          }
          if (s && c.saveShared) {
            c.structures.length > u && (c.structures = c.structures.slice(0, u));
            let k = m.subarray(n, g);
            return c.updateSharedData() === false ? c.encode(p) : k;
          }
          M & Fu && (g = n);
        }
      }, this.findCommonStringsToPack = () => (_ = /* @__PURE__ */ new Map(), v || (v = /* @__PURE__ */ Object.create(null)), (p) => {
        let M = p && p.threshold || 4, k = this.pack ? p.maxPrivatePackedValues || 16 : 0;
        b || (b = this.sharedValues = []);
        for (let [C, T] of _) T.count > M && (v[C] = k++, b.push(C), s = true);
        for (; this.saveShared && this.updateSharedData() === false; ) ;
        _ = null;
      });
      const E = (p) => {
        g > He && (m = H(g));
        var M = typeof p, k;
        if (M === "string") {
          if (l) {
            let F = l[p];
            if (F >= 0) {
              F < 16 ? m[g++] = F + 224 : (m[g++] = 198, F & 1 ? E(15 - F >> 1) : E(F - 16 >> 1));
              return;
            } else if (_ && !e.pack) {
              let N = _.get(p);
              N ? N.count++ : _.set(p, {
                count: 1
              });
            }
          }
          let C = p.length;
          if (re && C >= 4 && C < 1024) {
            if ((re.size += C) > Du) {
              let N, z = (re[0] ? re[0].length * 3 + re[1].length : 0) + 10;
              g + z > He && (m = H(g + z)), m[g++] = 217, m[g++] = 223, m[g++] = 249, m[g++] = re.position ? 132 : 130, m[g++] = 26, N = g - n, g += 4, re.position && Es(n, E), re = [
                "",
                ""
              ], re.size = 0, re.position = N;
            }
            let F = Uu.test(p);
            re[F ? 0 : 1] += p, m[g++] = F ? 206 : 207, E(C);
            return;
          }
          let T;
          C < 32 ? T = 1 : C < 256 ? T = 2 : C < 65536 ? T = 3 : T = 5;
          let B = C * 3;
          if (g + B > He && (m = H(g + B)), C < 64 || !a) {
            let F, N, z, G = g + T;
            for (F = 0; F < C; F++) N = p.charCodeAt(F), N < 128 ? m[G++] = N : N < 2048 ? (m[G++] = N >> 6 | 192, m[G++] = N & 63 | 128) : (N & 64512) === 55296 && ((z = p.charCodeAt(F + 1)) & 64512) === 56320 ? (N = 65536 + ((N & 1023) << 10) + (z & 1023), F++, m[G++] = N >> 18 | 240, m[G++] = N >> 12 & 63 | 128, m[G++] = N >> 6 & 63 | 128, m[G++] = N & 63 | 128) : (m[G++] = N >> 12 | 224, m[G++] = N >> 6 & 63 | 128, m[G++] = N & 63 | 128);
            k = G - g - T;
          } else k = a(p, g + T, B);
          k < 24 ? m[g++] = 96 | k : k < 256 ? (T < 2 && m.copyWithin(g + 2, g + 1, g + 1 + k), m[g++] = 120, m[g++] = k) : k < 65536 ? (T < 3 && m.copyWithin(g + 3, g + 2, g + 2 + k), m[g++] = 121, m[g++] = k >> 8, m[g++] = k & 255) : (T < 5 && m.copyWithin(g + 5, g + 3, g + 3 + k), m[g++] = 122, Q.setUint32(g, k), g += 4), g += k;
        } else if (M === "number") if (!this.alwaysUseFloat && p >>> 0 === p) p < 24 ? m[g++] = p : p < 256 ? (m[g++] = 24, m[g++] = p) : p < 65536 ? (m[g++] = 25, m[g++] = p >> 8, m[g++] = p & 255) : (m[g++] = 26, Q.setUint32(g, p), g += 4);
        else if (!this.alwaysUseFloat && p >> 0 === p) p >= -24 ? m[g++] = 31 - p : p >= -256 ? (m[g++] = 56, m[g++] = ~p) : p >= -65536 ? (m[g++] = 57, Q.setUint16(g, ~p), g += 2) : (m[g++] = 58, Q.setUint32(g, ~p), g += 4);
        else {
          let C;
          if ((C = this.useFloat32) > 0 && p < 4294967296 && p >= -2147483648) {
            m[g++] = 250, Q.setFloat32(g, p);
            let T;
            if (C < 4 || (T = p * Kr[(m[g] & 127) << 1 | m[g + 1] >> 7]) >> 0 === T) {
              g += 4;
              return;
            } else g--;
          }
          m[g++] = 251, Q.setFloat64(g, p), g += 8;
        }
        else if (M === "object") if (!p) m[g++] = 246;
        else {
          if (o) {
            let T = o.get(p);
            if (T) {
              if (m[g++] = 216, m[g++] = 29, m[g++] = 25, !T.references) {
                let B = o.idsToInsert || (o.idsToInsert = []);
                T.references = [], B.push(T);
              }
              T.references.push(g - n), g += 2;
              return;
            } else o.set(p, {
              offset: g - n
            });
          }
          let C = p.constructor;
          if (C === Object) L(p);
          else if (C === Array) {
            k = p.length, k < 24 ? m[g++] = 128 | k : Ee(k);
            for (let T = 0; T < k; T++) E(p[T]);
          } else if (C === Map) if ((this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) && (m[g++] = 217, m[g++] = 1, m[g++] = 3), k = p.size, k < 24 ? m[g++] = 160 | k : k < 256 ? (m[g++] = 184, m[g++] = k) : k < 65536 ? (m[g++] = 185, m[g++] = k >> 8, m[g++] = k & 255) : (m[g++] = 186, Q.setUint32(g, k), g += 4), c.keyMap) for (let [T, B] of p) E(c.encodeKey(T)), E(B);
          else for (let [T, B] of p) E(T), E(B);
          else {
            for (let T = 0, B = gr.length; T < B; T++) {
              let F = Pi[T];
              if (p instanceof F) {
                let N = gr[T], z = N.tag;
                z == null && (z = N.getTag && N.getTag.call(this, p)), z < 24 ? m[g++] = 192 | z : z < 256 ? (m[g++] = 216, m[g++] = z) : z < 65536 ? (m[g++] = 217, m[g++] = z >> 8, m[g++] = z & 255) : z > -1 && (m[g++] = 218, Q.setUint32(g, z), g += 4), N.encode.call(this, p, E, H);
                return;
              }
            }
            if (p[Symbol.iterator]) {
              if (Pn) {
                let T = new Error("Iterable should be serialized as iterator");
                throw T.iteratorNotHandled = true, T;
              }
              m[g++] = 159;
              for (let T of p) E(T);
              m[g++] = 255;
              return;
            }
            if (p[Symbol.asyncIterator] || $n(p)) {
              let T = new Error("Iterable/blob should be serialized as iterator");
              throw T.iteratorNotHandled = true, T;
            }
            if (this.useToJSON && p.toJSON) {
              const T = p.toJSON();
              if (T !== p) return E(T);
            }
            L(p);
          }
        }
        else if (M === "boolean") m[g++] = p ? 245 : 244;
        else if (M === "bigint") {
          if (p < BigInt(1) << BigInt(64) && p >= 0) m[g++] = 27, Q.setBigUint64(g, p);
          else if (p > -(BigInt(1) << BigInt(64)) && p < 0) m[g++] = 59, Q.setBigUint64(g, -p - BigInt(1));
          else if (this.largeBigIntToFloat) m[g++] = 251, Q.setFloat64(g, Number(p));
          else {
            p >= BigInt(0) ? m[g++] = 194 : (m[g++] = 195, p = BigInt(-1) - p);
            let C = [];
            for (; p; ) C.push(Number(p & BigInt(255))), p >>= BigInt(8);
            pr(new Uint8Array(C.reverse()), H);
            return;
          }
          g += 8;
        } else if (M === "undefined") m[g++] = 247;
        else throw new Error("Unknown type: " + M);
      }, L = this.useRecords === false ? this.variableMapSize ? (p) => {
        let M = Object.keys(p), k = Object.values(p), C = M.length;
        if (C < 24 ? m[g++] = 160 | C : C < 256 ? (m[g++] = 184, m[g++] = C) : C < 65536 ? (m[g++] = 185, m[g++] = C >> 8, m[g++] = C & 255) : (m[g++] = 186, Q.setUint32(g, C), g += 4), c.keyMap) for (let T = 0; T < C; T++) E(c.encodeKey(M[T])), E(k[T]);
        else for (let T = 0; T < C; T++) E(M[T]), E(k[T]);
      } : (p) => {
        m[g++] = 185;
        let M = g - n;
        g += 2;
        let k = 0;
        if (c.keyMap) for (let C in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(C)) && (E(c.encodeKey(C)), E(p[C]), k++);
        else for (let C in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(C)) && (E(C), E(p[C]), k++);
        m[M++ + n] = k >> 8, m[M + n] = k & 255;
      } : (p, M) => {
        let k, C = i.transitions || (i.transitions = /* @__PURE__ */ Object.create(null)), T = 0, B = 0, F, N;
        if (this.keyMap) {
          N = Object.keys(p).map((G) => this.encodeKey(G)), B = N.length;
          for (let G = 0; G < B; G++) {
            let Zr = N[G];
            k = C[Zr], k || (k = C[Zr] = /* @__PURE__ */ Object.create(null), T++), C = k;
          }
        } else for (let G in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(G)) && (k = C[G], k || (C[he] & 1048576 && (F = C[he] & 65535), k = C[G] = /* @__PURE__ */ Object.create(null), T++), C = k, B++);
        let z = C[he];
        if (z !== void 0) z &= 65535, m[g++] = 217, m[g++] = z >> 8 | 224, m[g++] = z & 255;
        else if (N || (N = C.__keys__ || (C.__keys__ = Object.keys(p))), F === void 0 ? (z = i.nextId++, z || (z = 0, i.nextId = 1), z >= Ss && (i.nextId = (z = u) + 1)) : z = F, i[z] = N, z < u) {
          m[g++] = 217, m[g++] = z >> 8 | 224, m[g++] = z & 255, C = i.transitions;
          for (let G = 0; G < B; G++) (C[he] === void 0 || C[he] & 1048576) && (C[he] = z), C = C[N[G]];
          C[he] = z | 1048576, s = true;
        } else {
          if (C[he] = z, Q.setUint32(g, 3655335680), g += 3, T && (j += D * T), S.length >= Ss - u && (S.shift()[he] = void 0), S.push(C), Ee(B + 2), E(57344 + z), E(N), M) return;
          for (let G in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(G)) && E(p[G]);
          return;
        }
        if (B < 24 ? m[g++] = 128 | B : Ee(B), !M) for (let G in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(G)) && E(p[G]);
      }, H = (p) => {
        let M;
        if (p > 16777216) {
          if (p - n > ks) throw new Error("Encoded buffer would be larger than maximum buffer size");
          M = Math.min(ks, Math.round(Math.max((p - n) * (p > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
        } else M = (Math.max(p - n << 2, m.length - 1) >> 12) + 1 << 12;
        let k = new Un(M);
        return Q = new DataView(k.buffer, 0, M), m.copy ? m.copy(k, 0, n, p) : k.set(m.slice(n, p)), g -= n, n = 0, He = k.length - 10, m = k;
      };
      let $ = 100, J = 1e3;
      this.encodeAsIterable = function(p, M) {
        return I(p, M, W);
      }, this.encodeAsAsyncIterable = function(p, M) {
        return I(p, M, P);
      };
      function* W(p, M, k) {
        let C = p.constructor;
        if (C === Object) {
          let T = c.useRecords !== false;
          T ? L(p, true) : As(Object.keys(p).length, 160);
          for (let B in p) {
            let F = p[B];
            T || E(B), F && typeof F == "object" ? M[B] ? yield* W(F, M[B]) : yield* Y(F, M, B) : E(F);
          }
        } else if (C === Array) {
          let T = p.length;
          Ee(T);
          for (let B = 0; B < T; B++) {
            let F = p[B];
            F && (typeof F == "object" || g - n > $) ? M.element ? yield* W(F, M.element) : yield* Y(F, M, "element") : E(F);
          }
        } else if (p[Symbol.iterator] && !p.buffer) {
          m[g++] = 159;
          for (let T of p) T && (typeof T == "object" || g - n > $) ? M.element ? yield* W(T, M.element) : yield* Y(T, M, "element") : E(T);
          m[g++] = 255;
        } else $n(p) ? (As(p.size, 64), yield m.subarray(n, g), yield p, Z()) : p[Symbol.asyncIterator] ? (m[g++] = 159, yield m.subarray(n, g), yield p, Z(), m[g++] = 255) : E(p);
        k && g > n ? yield m.subarray(n, g) : g - n > $ && (yield m.subarray(n, g), Z());
      }
      function* Y(p, M, k) {
        let C = g - n;
        try {
          E(p), g - n > $ && (yield m.subarray(n, g), Z());
        } catch (T) {
          if (T.iteratorNotHandled) M[k] = {}, g = n + C, yield* W.call(this, p, M[k]);
          else throw T;
        }
      }
      function Z() {
        $ = J, c.encode(null, Bn);
      }
      function I(p, M, k) {
        return M && M.chunkThreshold ? $ = J = M.chunkThreshold : $ = 100, p && typeof p == "object" ? (c.encode(null, Bn), k(p, c.iterateProperties || (c.iterateProperties = {}), true)) : [
          c.encode(p)
        ];
      }
      async function* P(p, M) {
        for (let k of W(p, M, true)) {
          let C = k.constructor;
          if (C === xs || C === Uint8Array) yield k;
          else if ($n(k)) {
            let T = k.stream().getReader(), B;
            for (; !(B = await T.read()).done; ) yield B.value;
          } else if (k[Symbol.asyncIterator]) for await (let T of k) Z(), T ? yield* P(T, M.async || (M.async = {})) : yield c.encode(T);
          else yield k;
        }
      }
    }
    useBuffer(e) {
      m = e, Q = new DataView(m.buffer, m.byteOffset, m.byteLength), g = 0;
    }
    clearSharedData() {
      this.structures && (this.structures = []), this.sharedValues && (this.sharedValues = void 0);
    }
    updateSharedData() {
      let e = this.sharedVersion || 0;
      this.sharedVersion = e + 1;
      let n = this.structures.slice(0), r = new Bi(n, this.sharedValues, this.sharedVersion), s = this.saveShared(r, (i) => (i && i.version || 0) == e);
      return s === false ? (r = this.getShared() || {}, this.structures = r.structures || [], this.sharedValues = r.packedValues, this.sharedVersion = r.version, this.structures.nextId = this.structures.length) : n.forEach((i, o) => this.structures[o] = i), s;
    }
  }
  function As(t, e) {
    t < 24 ? m[g++] = e | t : t < 256 ? (m[g++] = e | 24, m[g++] = t) : t < 65536 ? (m[g++] = e | 25, m[g++] = t >> 8, m[g++] = t & 255) : (m[g++] = e | 26, Q.setUint32(g, t), g += 4);
  }
  class Bi {
    constructor(e, n, r) {
      this.structures = e, this.packedValues = n, this.version = r;
    }
  }
  function Ee(t) {
    t < 24 ? m[g++] = 128 | t : t < 256 ? (m[g++] = 152, m[g++] = t) : t < 65536 ? (m[g++] = 153, m[g++] = t >> 8, m[g++] = t & 255) : (m[g++] = 154, Q.setUint32(g, t), g += 4);
  }
  const Pu = typeof Blob > "u" ? function() {
  } : Blob;
  function $n(t) {
    if (t instanceof Pu) return true;
    let e = t[Symbol.toStringTag];
    return e === "Blob" || e === "File";
  }
  function Qt(t, e) {
    switch (typeof t) {
      case "string":
        if (t.length > 3) {
          if (e.objectMap[t] > -1 || e.values.length >= e.maxValues) return;
          let r = e.get(t);
          if (r) ++r.count == 2 && e.values.push(t);
          else if (e.set(t, {
            count: 1
          }), e.samplingPackedValues) {
            let s = e.samplingPackedValues.get(t);
            s ? s.count++ : e.samplingPackedValues.set(t, {
              count: 1
            });
          }
        }
        break;
      case "object":
        if (t) if (t instanceof Array) for (let r = 0, s = t.length; r < s; r++) Qt(t[r], e);
        else {
          let r = !e.encoder.useRecords;
          for (var n in t) t.hasOwnProperty(n) && (r && Qt(n, e), Qt(t[n], e));
        }
        break;
      case "function":
        console.log(t);
    }
  }
  const $u = new Uint8Array(new Uint16Array([
    1
  ]).buffer)[0] == 1;
  Pi = [
    Date,
    Set,
    Error,
    RegExp,
    tt,
    ArrayBuffer,
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    typeof BigUint64Array > "u" ? function() {
    } : BigUint64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    typeof BigInt64Array > "u" ? function() {
    } : BigInt64Array,
    Float32Array,
    Float64Array,
    Bi
  ];
  gr = [
    {
      tag: 1,
      encode(t, e) {
        let n = t.getTime() / 1e3;
        (this.useTimestamp32 || t.getMilliseconds() === 0) && n >= 0 && n < 4294967296 ? (m[g++] = 26, Q.setUint32(g, n), g += 4) : (m[g++] = 251, Q.setFloat64(g, n), g += 8);
      }
    },
    {
      tag: 258,
      encode(t, e) {
        let n = Array.from(t);
        e(n);
      }
    },
    {
      tag: 27,
      encode(t, e) {
        e([
          t.name,
          t.message
        ]);
      }
    },
    {
      tag: 27,
      encode(t, e) {
        e([
          "RegExp",
          t.source,
          t.flags
        ]);
      }
    },
    {
      getTag(t) {
        return t.tag;
      },
      encode(t, e) {
        e(t.value);
      }
    },
    {
      encode(t, e, n) {
        pr(t, n);
      }
    },
    {
      getTag(t) {
        if (t.constructor === Uint8Array && (this.tagUint8Array || Ft && this.tagUint8Array !== false)) return 64;
      },
      encode(t, e, n) {
        pr(t, n);
      }
    },
    ke(68, 1),
    ke(69, 2),
    ke(70, 4),
    ke(71, 8),
    ke(72, 1),
    ke(77, 2),
    ke(78, 4),
    ke(79, 8),
    ke(85, 4),
    ke(86, 8),
    {
      encode(t, e) {
        let n = t.packedValues || [], r = t.structures || [];
        if (n.values.length > 0) {
          m[g++] = 216, m[g++] = 51, Ee(4);
          let s = n.values;
          e(s), Ee(0), Ee(0), packedObjectMap = Object.create(sharedPackedObjectMap || null);
          for (let i = 0, o = s.length; i < o; i++) packedObjectMap[s[i]] = i;
        }
        if (r) {
          Q.setUint32(g, 3655335424), g += 3;
          let s = r.slice(0);
          s.unshift(57344), s.push(new tt(t.version, 1399353956)), e(s);
        } else e(new tt(t.version, 1399353956));
      }
    }
  ];
  function ke(t, e) {
    return !$u && e > 1 && (t -= 4), {
      tag: t,
      encode: function(r, s) {
        let i = r.byteLength, o = r.byteOffset || 0, a = r.buffer || r;
        s(Ft ? Sn.from(a, o, i) : new Uint8Array(a, o, i));
      }
    };
  }
  function pr(t, e) {
    let n = t.byteLength;
    n < 24 ? m[g++] = 64 + n : n < 256 ? (m[g++] = 88, m[g++] = n) : n < 65536 ? (m[g++] = 89, m[g++] = n >> 8, m[g++] = n & 255) : (m[g++] = 90, Q.setUint32(g, n), g += 4), g + n >= m.length && e(g + n), m.set(t.buffer ? t : new Uint8Array(t), g), g += n;
  }
  function Bu(t, e) {
    let n, r = e.length * 2, s = t.length - r;
    e.sort((i, o) => i.offset > o.offset ? 1 : -1);
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      o.id = i;
      for (let a of o.references) t[a++] = i >> 8, t[a] = i & 255;
    }
    for (; n = e.pop(); ) {
      let i = n.offset;
      t.copyWithin(i + r, i, s), r -= 2;
      let o = i + r;
      t[o++] = 216, t[o++] = 28, s = i;
    }
    return t;
  }
  function Es(t, e) {
    Q.setUint32(re.position + t, g - re.position - t + 1);
    let n = re;
    re = null, e(n[0]), e(n[1]);
  }
  let Jr = new $i({
    useRecords: false
  });
  Jr.encode;
  Jr.encodeAsIterable;
  Jr.encodeAsAsyncIterable;
  const Is = 512, Fu = 1024, Bn = 2048;
  function Fi(t) {
    return new $i({
      tagUint8Array: false,
      useRecords: false
    }).encode(t);
  }
  function Lu(t) {
    return Ui(t);
  }
  const Hu = (t, e) => t.length === e.length && t.every((n, r) => n === e[r]), qr = (t, e) => Hu(t, e), Nu = async (t, e) => {
    let n;
    const r = new Promise((s, i) => {
      n = setTimeout(() => i(new zu(`withTimeout: timed out after ${e}ms`)), e);
    });
    try {
      return await Promise.race([
        t,
        r
      ]);
    } finally {
      clearTimeout(n);
    }
  };
  class zu extends Error {
    constructor(e) {
      super(e), this.name = "TimeoutError";
    }
  }
  class Wu extends pt {
    constructor(e, n = {}) {
      super();
      __privateAdd(this, _Wu_instances);
      __publicField(this, "documentId");
      __privateAdd(this, _t2);
      __privateAdd(this, _e2);
      __privateAdd(this, _n2);
      __privateAdd(this, _r2, 6e4);
      __privateAdd(this, _s2, {});
      __publicField(this, "isReady", () => this.inState([
        "ready"
      ]));
      __publicField(this, "isDeleted", () => this.inState([
        "deleted"
      ]));
      __publicField(this, "isUnavailable", () => this.inState([
        "unavailable"
      ]));
      __publicField(this, "inState", (e) => e.some((n) => __privateGet(this, _e2).getSnapshot().matches(n)));
      this.documentId = e, "timeoutDelay" in n && n.timeoutDelay && __privateSet(this, _r2, n.timeoutDelay);
      let r;
      const s = "isNew" in n && n.isNew;
      s ? (r = Fc(n.initialValue), r = Tc(r)) : r = mn(), __privateSet(this, _t2, Be(`automerge-repo:dochandle:${this.documentId.slice(0, 5)}`));
      const i = __privateGet(this, _r2), o = Zf({
        types: {
          context: {},
          events: {}
        },
        actions: {
          onUpdate: or(({ context: a, event: c }) => {
            const f = a.doc;
            Jf(c, Wt);
            const { callback: u } = c.payload;
            return {
              doc: u(f)
            };
          }),
          onDelete: or(() => (this.emit("delete", {
            handle: this
          }), {
            doc: void 0
          })),
          onUnavailable: () => {
            this.emit("unavailable", {
              handle: this
            });
          }
        }
      }).createMachine({
        initial: "idle",
        context: {
          documentId: e,
          doc: r
        },
        on: {
          UPDATE: {
            actions: "onUpdate"
          },
          DELETE: ".deleted"
        },
        states: {
          idle: {
            on: {
              CREATE: "ready",
              FIND: "loading"
            }
          },
          loading: {
            on: {
              REQUEST: "requesting",
              DOC_READY: "ready",
              AWAIT_NETWORK: "awaitingNetwork"
            },
            after: {
              [i]: "unavailable"
            }
          },
          awaitingNetwork: {
            on: {
              NETWORK_READY: "requesting"
            }
          },
          requesting: {
            on: {
              DOC_UNAVAILABLE: "unavailable",
              DOC_READY: "ready"
            },
            after: {
              [i]: "unavailable"
            }
          },
          unavailable: {
            entry: "onUnavailable",
            on: {
              DOC_READY: "ready"
            }
          },
          ready: {},
          deleted: {
            entry: "onDelete",
            type: "final"
          }
        }
      });
      __privateSet(this, _e2, Ot(o)), __privateGet(this, _e2).subscribe((a) => {
        const c = __privateGet(this, _n2), f = a.context.doc;
        __privateGet(this, _t2).call(this, `\u2192 ${a.value} %o`, f), __privateMethod(this, _Wu_instances, c_fn).call(this, c, f);
      }), __privateGet(this, _e2).start(), __privateGet(this, _e2).send(s ? {
        type: Ku
      } : {
        type: Gu
      });
    }
    get url() {
      return Wr({
        documentId: this.documentId
      });
    }
    get state() {
      return __privateGet(this, _e2).getSnapshot().value;
    }
    async whenReady(e = [
      "ready"
    ]) {
      await Nu(__privateMethod(this, _Wu_instances, o_fn).call(this, e), __privateGet(this, _r2));
    }
    async doc(e = [
      "ready",
      "unavailable"
    ]) {
      try {
        await __privateMethod(this, _Wu_instances, o_fn).call(this, e);
      } catch {
        return;
      }
      return this.isUnavailable() ? void 0 : __privateGet(this, _Wu_instances, i_get);
    }
    docSync() {
      if (this.isReady()) return __privateGet(this, _Wu_instances, i_get);
    }
    heads() {
      if (this.isReady()) return ve(__privateGet(this, _Wu_instances, i_get));
    }
    update(e) {
      __privateGet(this, _e2).send({
        type: Wt,
        payload: {
          callback: e
        }
      });
    }
    setRemoteHeads(e, n) {
      __privateGet(this, _s2)[e] = n, this.emit("remote-heads", {
        storageId: e,
        heads: n
      });
    }
    getRemoteHeads(e) {
      return __privateGet(this, _s2)[e];
    }
    change(e, n = {}) {
      if (!this.isReady()) throw new Error(`DocHandle#${this.documentId} is not ready. Check \`handle.isReady()\` before accessing the document.`);
      __privateGet(this, _e2).send({
        type: Wt,
        payload: {
          callback: (r) => Ic(r, n, e)
        }
      });
    }
    changeAt(e, n, r = {}) {
      if (!this.isReady()) throw new Error(`DocHandle#${this.documentId} is not ready. Check \`handle.isReady()\` before accessing the document.`);
      let s;
      return __privateGet(this, _e2).send({
        type: Wt,
        payload: {
          callback: (i) => {
            const o = Cc(i, e, r, n);
            return s = o.newHeads || void 0, o.newDoc;
          }
        }
      }), s;
    }
    merge(e) {
      if (!this.isReady() || !e.isReady()) throw new Error("Both handles must be ready to merge");
      const n = e.docSync();
      if (!n) throw new Error("The document to be merged in is falsy, aborting.");
      this.update((r) => Mc(r, n));
    }
    unavailable() {
      __privateGet(this, _e2).send({
        type: Qu
      });
    }
    request() {
      __privateGet(this, _Wu_instances, a_get) === "loading" && __privateGet(this, _e2).send({
        type: Ju
      });
    }
    awaitNetwork() {
      __privateGet(this, _Wu_instances, a_get) === "loading" && __privateGet(this, _e2).send({
        type: Yu
      });
    }
    networkReady() {
      __privateGet(this, _Wu_instances, a_get) === "awaitingNetwork" && __privateGet(this, _e2).send({
        type: Xu
      });
    }
    delete() {
      __privateGet(this, _e2).send({
        type: Zu
      });
    }
    broadcast(e) {
      this.emit("ephemeral-message-outbound", {
        handle: this,
        data: Fi(e)
      });
    }
  }
  _t2 = new WeakMap();
  _e2 = new WeakMap();
  _n2 = new WeakMap();
  _r2 = new WeakMap();
  _s2 = new WeakMap();
  _Wu_instances = new WeakSet();
  i_get = function() {
    var _a5;
    return (_a5 = __privateGet(this, _e2)) == null ? void 0 : _a5.getSnapshot().context.doc;
  };
  a_get = function() {
    var _a5;
    return (_a5 = __privateGet(this, _e2)) == null ? void 0 : _a5.getSnapshot().value;
  };
  o_fn = function(e) {
    const n = Array.isArray(e) ? e : [
      e
    ];
    return eu(__privateGet(this, _e2), (r) => n.some((s) => r.matches(s)), {
      timeout: __privateGet(this, _r2) * 2
    });
  };
  c_fn = function(e, n) {
    if (n && e && !qr(ve(n), ve(e))) {
      this.emit("heads-changed", {
        handle: this,
        doc: n
      });
      const s = Rc(n, ve(e), ve(n));
      s.length > 0 && this.emit("change", {
        handle: this,
        doc: n,
        patches: s,
        patchInfo: {
          before: e,
          after: n,
          source: "change"
        }
      }), this.isReady() || __privateGet(this, _e2).send({
        type: qu
      });
    }
    __privateSet(this, _n2, n);
  };
  const Vu = {
    IDLE: "idle",
    LOADING: "loading",
    AWAITING_NETWORK: "awaitingNetwork",
    REQUESTING: "requesting",
    READY: "ready",
    DELETED: "deleted",
    UNAVAILABLE: "unavailable"
  }, { IDLE: Bh, LOADING: Fh, AWAITING_NETWORK: Lh, REQUESTING: zt, READY: Fn, DELETED: Hh, UNAVAILABLE: Cs } = Vu, Ku = "CREATE", Gu = "FIND", Ju = "REQUEST", qu = "DOC_READY", Yu = "AWAIT_NETWORK", Xu = "NETWORK_READY", Wt = "UPDATE", Zu = "DELETE", Qu = "DOC_UNAVAILABLE";
  class ed extends pt {
    constructor() {
      super(...arguments);
      __privateAdd(this, _ed_instances);
      __privateAdd(this, _t3, /* @__PURE__ */ new Map());
      __privateAdd(this, _e3, /* @__PURE__ */ new Set());
      __privateAdd(this, _n3, /* @__PURE__ */ new Map());
      __privateAdd(this, _r3, /* @__PURE__ */ new Set());
      __privateAdd(this, _s3, /* @__PURE__ */ new Map());
      __privateAdd(this, _i2, Be("automerge-repo:remote-heads-subscriptions"));
    }
    subscribeToRemotes(e) {
      __privateGet(this, _i2).call(this, "subscribeToRemotes", e);
      const n = [];
      for (const r of e) __privateGet(this, _e3).has(r) || (__privateGet(this, _e3).add(r), n.push(r));
      n.length > 0 && this.emit("change-remote-subs", {
        add: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    unsubscribeFromRemotes(e) {
      __privateGet(this, _i2).call(this, "subscribeToRemotes", e);
      const n = [];
      for (const r of e) __privateGet(this, _e3).has(r) && (__privateGet(this, _e3).delete(r), __privateGet(this, _n3).has(r) || n.push(r));
      n.length > 0 && this.emit("change-remote-subs", {
        remove: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    handleControlMessage(e) {
      const n = [], r = [], s = [];
      if (__privateGet(this, _i2).call(this, "handleControlMessage", e), e.add) for (const i of e.add) {
        let o = __privateGet(this, _n3).get(i);
        (__privateGet(this, _e3).has(i) || o) && s.push(i), o || (o = /* @__PURE__ */ new Set(), __privateGet(this, _n3).set(i, o), __privateGet(this, _e3).has(i) || n.push(i)), o.add(e.senderId);
      }
      if (e.remove) for (const i of e.remove) {
        const o = __privateGet(this, _n3).get(i);
        o && (o.delete(e.senderId), o.size == 0 && !__privateGet(this, _e3).has(i) && r.push(i));
      }
      (n.length > 0 || r.length > 0) && this.emit("change-remote-subs", {
        peers: Array.from(__privateGet(this, _r3)),
        add: n,
        remove: r
      });
      for (const i of s) {
        const o = __privateGet(this, _s3).get(e.senderId);
        if (o) for (const a of o) {
          const c = __privateGet(this, _t3).get(a);
          if (!c) continue;
          const f = c.get(i);
          f && this.emit("notify-remote-heads", {
            targetId: e.senderId,
            documentId: a,
            heads: f.heads,
            timestamp: f.timestamp,
            storageId: i
          });
        }
      }
    }
    handleRemoteHeads(e) {
      __privateGet(this, _i2).call(this, "handleRemoteHeads", e);
      const n = __privateMethod(this, _ed_instances, o_fn2).call(this, e);
      for (const r of n) __privateGet(this, _e3).has(r.storageId) && this.emit("remote-heads-changed", r);
      for (const r of n) for (const s of __privateGet(this, _r3)) s !== e.senderId && this.emit("notify-remote-heads", {
        targetId: s,
        documentId: r.documentId,
        heads: r.remoteHeads,
        timestamp: r.timestamp,
        storageId: r.storageId
      });
      for (const r of n) {
        const s = __privateGet(this, _n3).get(r.storageId);
        if (s) for (const i of s) __privateMethod(this, _ed_instances, a_fn).call(this, i, r.documentId) && this.emit("notify-remote-heads", {
          targetId: i,
          documentId: r.documentId,
          heads: r.remoteHeads,
          timestamp: r.timestamp,
          storageId: r.storageId
        });
      }
    }
    handleImmediateRemoteHeadsChanged(e, n, r) {
      __privateGet(this, _i2).call(this, "handleLocalHeadsChanged", e, n, r);
      const s = __privateGet(this, _t3).get(e), i = Date.now();
      if (!s) __privateGet(this, _t3).set(e, /* @__PURE__ */ new Map([
        [
          n,
          {
            heads: r,
            timestamp: i
          }
        ]
      ]));
      else {
        const a = s.get(n);
        (!a || a.timestamp < Date.now()) && s.set(n, {
          heads: r,
          timestamp: Date.now()
        });
      }
      const o = __privateGet(this, _n3).get(n);
      if (o) for (const a of o) __privateMethod(this, _ed_instances, a_fn).call(this, a, e) && this.emit("notify-remote-heads", {
        targetId: a,
        documentId: e,
        heads: r,
        timestamp: i,
        storageId: n
      });
    }
    addGenerousPeer(e) {
      __privateGet(this, _i2).call(this, "addGenerousPeer", e), __privateGet(this, _r3).add(e), __privateGet(this, _e3).size > 0 && this.emit("change-remote-subs", {
        add: Array.from(__privateGet(this, _e3)),
        peers: [
          e
        ]
      });
      for (const [n, r] of __privateGet(this, _t3)) for (const [s, { heads: i, timestamp: o }] of r) this.emit("notify-remote-heads", {
        targetId: e,
        documentId: n,
        heads: i,
        timestamp: o,
        storageId: s
      });
    }
    removePeer(e) {
      __privateGet(this, _i2).call(this, "removePeer", e);
      const n = [];
      __privateGet(this, _r3).delete(e), __privateGet(this, _s3).delete(e);
      for (const [r, s] of __privateGet(this, _n3)) s.has(e) && (s.delete(e), s.size == 0 && (n.push(r), __privateGet(this, _n3).delete(r)));
      n.length > 0 && this.emit("change-remote-subs", {
        remove: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    subscribePeerToDoc(e, n) {
      let r = __privateGet(this, _s3).get(e);
      r || (r = /* @__PURE__ */ new Set(), __privateGet(this, _s3).set(e, r)), r.add(n);
      const s = __privateGet(this, _t3).get(n);
      if (s) for (const [i, o] of s) {
        const a = __privateGet(this, _n3).get(i);
        a && a.has(e) && this.emit("notify-remote-heads", {
          targetId: e,
          documentId: n,
          heads: o.heads,
          timestamp: o.timestamp,
          storageId: i
        });
      }
    }
  }
  _t3 = new WeakMap();
  _e3 = new WeakMap();
  _n3 = new WeakMap();
  _r3 = new WeakMap();
  _s3 = new WeakMap();
  _i2 = new WeakMap();
  _ed_instances = new WeakSet();
  a_fn = function(e, n) {
    const r = __privateGet(this, _s3).get(e);
    return r && r.has(n);
  };
  o_fn2 = function(e) {
    const n = [], { documentId: r, newHeads: s } = e;
    for (const [i, { heads: o, timestamp: a }] of Object.entries(s)) {
      if (!__privateGet(this, _e3).has(i) && !__privateGet(this, _n3).has(i)) continue;
      let c = __privateGet(this, _t3).get(r);
      c || (c = /* @__PURE__ */ new Map(), __privateGet(this, _t3).set(r, c));
      const f = c.get(i);
      f && f.timestamp >= a || (c.set(i, {
        timestamp: a,
        heads: o
      }), n.push({
        documentId: r,
        storageId: i,
        remoteHeads: o,
        timestamp: a
      }));
    }
    return n;
  };
  const yr = (t, e) => {
    let n = Date.now(), r, s;
    return function(...i) {
      r = n + e - Date.now(), clearTimeout(s), s = setTimeout(() => {
        t(...i), n = Date.now();
      }, r);
    };
  }, td = (t) => rd(t) || Hi(t) || Li(t) || nd(t) || sd(t) || id(t), nd = (t) => t.type === "doc-unavailable", Li = (t) => t.type === "request", rd = (t) => t.type === "sync", Hi = (t) => t.type === "ephemeral", sd = (t) => t.type === "remote-subscription-change", id = (t) => t.type === "remote-heads-changed", od = (t) => `${t.senderId}:${t.sessionId}`;
  class ad extends pt {
    constructor(e, n = cd(), r) {
      super();
      __publicField(this, "peerId");
      __publicField(this, "peerMetadata");
      __privateAdd(this, _t4);
      __privateAdd(this, _e4, {});
      __privateAdd(this, _n4, 0);
      __privateAdd(this, _r4, Math.random().toString(36).slice(2));
      __privateAdd(this, _s4, {});
      __privateAdd(this, _i3, 0);
      __privateAdd(this, _a2, []);
      __publicField(this, "isReady", () => __privateGet(this, _i3) === __privateGet(this, _a2).length);
      __publicField(this, "whenReady", async () => {
        if (!this.isReady()) return new Promise((e) => {
          this.once("ready", () => {
            e();
          });
        });
      });
      this.peerId = n, this.peerMetadata = r, __privateSet(this, _t4, Be(`automerge-repo:network:${this.peerId}`)), e.forEach((s) => this.addNetworkAdapter(s));
    }
    addNetworkAdapter(e) {
      __privateGet(this, _a2).push(e), e.once("ready", () => {
        __privateWrapper(this, _i3)._++, __privateGet(this, _t4).call(this, "Adapters ready: ", __privateGet(this, _i3), "/", __privateGet(this, _a2).length), __privateGet(this, _i3) === __privateGet(this, _a2).length && this.emit("ready");
      }), e.on("peer-candidate", ({ peerId: n, peerMetadata: r }) => {
        __privateGet(this, _t4).call(this, `peer candidate: ${n} `), __privateGet(this, _e4)[n] || (__privateGet(this, _e4)[n] = e), this.emit("peer", {
          peerId: n,
          peerMetadata: r
        });
      }), e.on("peer-disconnected", ({ peerId: n }) => {
        __privateGet(this, _t4).call(this, `peer disconnected: ${n} `), delete __privateGet(this, _e4)[n], this.emit("peer-disconnected", {
          peerId: n
        });
      }), e.on("message", (n) => {
        if (!td(n)) {
          __privateGet(this, _t4).call(this, `invalid message: ${JSON.stringify(n)}`);
          return;
        }
        if (__privateGet(this, _t4).call(this, `message from ${n.senderId}`), Hi(n)) {
          const r = od(n);
          (__privateGet(this, _s4)[r] === void 0 || n.count > __privateGet(this, _s4)[r]) && (__privateGet(this, _s4)[r] = n.count, this.emit("message", n));
          return;
        }
        this.emit("message", n);
      }), e.on("close", () => {
        __privateGet(this, _t4).call(this, "adapter closed"), Object.entries(__privateGet(this, _e4)).forEach(([n, r]) => {
          r === e && delete __privateGet(this, _e4)[n];
        });
      }), this.peerMetadata.then((n) => {
        e.connect(this.peerId, n);
      }).catch((n) => {
        __privateGet(this, _t4).call(this, "error connecting to network", n);
      });
    }
    send(e) {
      const n = __privateGet(this, _e4)[e.targetId];
      if (!n) {
        __privateGet(this, _t4).call(this, `Tried to send message but peer not found: ${e.targetId}`);
        return;
      }
      const s = ((i) => i.type === "ephemeral" ? "count" in i ? i : {
        ...i,
        count: ++__privateWrapper(this, _n4)._,
        sessionId: __privateGet(this, _r4),
        senderId: this.peerId
      } : {
        ...i,
        senderId: this.peerId
      })(e);
      __privateGet(this, _t4).call(this, "sending message %o", s), n.send(s);
    }
  }
  _t4 = new WeakMap();
  _e4 = new WeakMap();
  _n4 = new WeakMap();
  _r4 = new WeakMap();
  _s4 = new WeakMap();
  _i3 = new WeakMap();
  _a2 = new WeakMap();
  function cd() {
    return `user-${Math.round(Math.random() * 1e5)}`;
  }
  function Ni(t) {
    let e = 0;
    t.forEach((s) => {
      e += s.length;
    });
    const n = new Uint8Array(e);
    let r = 0;
    return t.forEach((s) => {
      n.set(s, r), r += s.length;
    }), n;
  }
  var zi = {
    exports: {}
  };
  (function(t) {
    (function(e, n) {
      var r = {};
      n(r);
      var s = r.default;
      for (var i in r) s[i] = r[i];
      t.exports = s;
    })(Hc, function(e) {
      e.__esModule = true, e.digestLength = 32, e.blockSize = 64;
      var n = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function r(_, l, b, v, S) {
        for (var j, D, E, L, H, $, J, W, Y, Z, I, P, p; S >= 64; ) {
          for (j = l[0], D = l[1], E = l[2], L = l[3], H = l[4], $ = l[5], J = l[6], W = l[7], Z = 0; Z < 16; Z++) I = v + Z * 4, _[Z] = (b[I] & 255) << 24 | (b[I + 1] & 255) << 16 | (b[I + 2] & 255) << 8 | b[I + 3] & 255;
          for (Z = 16; Z < 64; Z++) Y = _[Z - 2], P = (Y >>> 17 | Y << 15) ^ (Y >>> 19 | Y << 13) ^ Y >>> 10, Y = _[Z - 15], p = (Y >>> 7 | Y << 25) ^ (Y >>> 18 | Y << 14) ^ Y >>> 3, _[Z] = (P + _[Z - 7] | 0) + (p + _[Z - 16] | 0);
          for (Z = 0; Z < 64; Z++) P = (((H >>> 6 | H << 26) ^ (H >>> 11 | H << 21) ^ (H >>> 25 | H << 7)) + (H & $ ^ ~H & J) | 0) + (W + (n[Z] + _[Z] | 0) | 0) | 0, p = ((j >>> 2 | j << 30) ^ (j >>> 13 | j << 19) ^ (j >>> 22 | j << 10)) + (j & D ^ j & E ^ D & E) | 0, W = J, J = $, $ = H, H = L + P | 0, L = E, E = D, D = j, j = P + p | 0;
          l[0] += j, l[1] += D, l[2] += E, l[3] += L, l[4] += H, l[5] += $, l[6] += J, l[7] += W, v += 64, S -= 64;
        }
        return v;
      }
      var s = function() {
        function _() {
          this.digestLength = e.digestLength, this.blockSize = e.blockSize, this.state = new Int32Array(8), this.temp = new Int32Array(64), this.buffer = new Uint8Array(128), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this.reset();
        }
        return _.prototype.reset = function() {
          return this.state[0] = 1779033703, this.state[1] = 3144134277, this.state[2] = 1013904242, this.state[3] = 2773480762, this.state[4] = 1359893119, this.state[5] = 2600822924, this.state[6] = 528734635, this.state[7] = 1541459225, this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this;
        }, _.prototype.clean = function() {
          for (var l = 0; l < this.buffer.length; l++) this.buffer[l] = 0;
          for (var l = 0; l < this.temp.length; l++) this.temp[l] = 0;
          this.reset();
        }, _.prototype.update = function(l, b) {
          if (b === void 0 && (b = l.length), this.finished) throw new Error("SHA256: can't update because hash was finished.");
          var v = 0;
          if (this.bytesHashed += b, this.bufferLength > 0) {
            for (; this.bufferLength < 64 && b > 0; ) this.buffer[this.bufferLength++] = l[v++], b--;
            this.bufferLength === 64 && (r(this.temp, this.state, this.buffer, 0, 64), this.bufferLength = 0);
          }
          for (b >= 64 && (v = r(this.temp, this.state, l, v, b), b %= 64); b > 0; ) this.buffer[this.bufferLength++] = l[v++], b--;
          return this;
        }, _.prototype.finish = function(l) {
          if (!this.finished) {
            var b = this.bytesHashed, v = this.bufferLength, S = b / 536870912 | 0, j = b << 3, D = b % 64 < 56 ? 64 : 128;
            this.buffer[v] = 128;
            for (var E = v + 1; E < D - 8; E++) this.buffer[E] = 0;
            this.buffer[D - 8] = S >>> 24 & 255, this.buffer[D - 7] = S >>> 16 & 255, this.buffer[D - 6] = S >>> 8 & 255, this.buffer[D - 5] = S >>> 0 & 255, this.buffer[D - 4] = j >>> 24 & 255, this.buffer[D - 3] = j >>> 16 & 255, this.buffer[D - 2] = j >>> 8 & 255, this.buffer[D - 1] = j >>> 0 & 255, r(this.temp, this.state, this.buffer, 0, D), this.finished = true;
          }
          for (var E = 0; E < 8; E++) l[E * 4 + 0] = this.state[E] >>> 24 & 255, l[E * 4 + 1] = this.state[E] >>> 16 & 255, l[E * 4 + 2] = this.state[E] >>> 8 & 255, l[E * 4 + 3] = this.state[E] >>> 0 & 255;
          return this;
        }, _.prototype.digest = function() {
          var l = new Uint8Array(this.digestLength);
          return this.finish(l), l;
        }, _.prototype._saveState = function(l) {
          for (var b = 0; b < this.state.length; b++) l[b] = this.state[b];
        }, _.prototype._restoreState = function(l, b) {
          for (var v = 0; v < this.state.length; v++) this.state[v] = l[v];
          this.bytesHashed = b, this.finished = false, this.bufferLength = 0;
        }, _;
      }();
      e.Hash = s;
      var i = function() {
        function _(l) {
          this.inner = new s(), this.outer = new s(), this.blockSize = this.inner.blockSize, this.digestLength = this.inner.digestLength;
          var b = new Uint8Array(this.blockSize);
          if (l.length > this.blockSize) new s().update(l).finish(b).clean();
          else for (var v = 0; v < l.length; v++) b[v] = l[v];
          for (var v = 0; v < b.length; v++) b[v] ^= 54;
          this.inner.update(b);
          for (var v = 0; v < b.length; v++) b[v] ^= 106;
          this.outer.update(b), this.istate = new Uint32Array(8), this.ostate = new Uint32Array(8), this.inner._saveState(this.istate), this.outer._saveState(this.ostate);
          for (var v = 0; v < b.length; v++) b[v] = 0;
        }
        return _.prototype.reset = function() {
          return this.inner._restoreState(this.istate, this.inner.blockSize), this.outer._restoreState(this.ostate, this.outer.blockSize), this;
        }, _.prototype.clean = function() {
          for (var l = 0; l < this.istate.length; l++) this.ostate[l] = this.istate[l] = 0;
          this.inner.clean(), this.outer.clean();
        }, _.prototype.update = function(l) {
          return this.inner.update(l), this;
        }, _.prototype.finish = function(l) {
          return this.outer.finished ? this.outer.finish(l) : (this.inner.finish(l), this.outer.update(l, this.digestLength).finish(l)), this;
        }, _.prototype.digest = function() {
          var l = new Uint8Array(this.digestLength);
          return this.finish(l), l;
        }, _;
      }();
      e.HMAC = i;
      function o(_) {
        var l = new s().update(_), b = l.digest();
        return l.clean(), b;
      }
      e.hash = o, e.default = o;
      function a(_, l) {
        var b = new i(_).update(l), v = b.digest();
        return b.clean(), v;
      }
      e.hmac = a;
      function c(_, l, b, v) {
        var S = v[0];
        if (S === 0) throw new Error("hkdf: cannot expand more");
        l.reset(), S > 1 && l.update(_), b && l.update(b), l.update(v), l.finish(_), v[0]++;
      }
      var f = new Uint8Array(e.digestLength);
      function u(_, l, b, v) {
        l === void 0 && (l = f), v === void 0 && (v = 32);
        for (var S = new Uint8Array([
          1
        ]), j = a(l, _), D = new i(j), E = new Uint8Array(D.digestLength), L = E.length, H = new Uint8Array(v), $ = 0; $ < v; $++) L === E.length && (c(E, D, b, S), L = 0), H[$] = E[L++];
        return D.clean(), E.fill(0), S.fill(0), H;
      }
      e.hkdf = u;
      function d(_, l, b, v) {
        for (var S = new i(_), j = S.digestLength, D = new Uint8Array(4), E = new Uint8Array(j), L = new Uint8Array(j), H = new Uint8Array(v), $ = 0; $ * j < v; $++) {
          var J = $ + 1;
          D[0] = J >>> 24 & 255, D[1] = J >>> 16 & 255, D[2] = J >>> 8 & 255, D[3] = J >>> 0 & 255, S.reset(), S.update(l), S.update(D), S.finish(L);
          for (var W = 0; W < j; W++) E[W] = L[W];
          for (var W = 2; W <= b; W++) {
            S.reset(), S.update(L).finish(L);
            for (var Y = 0; Y < j; Y++) E[Y] ^= L[Y];
          }
          for (var W = 0; W < j && $ * j + W < v; W++) H[$ * j + W] = E[W];
        }
        for (var $ = 0; $ < j; $++) E[$] = L[$] = 0;
        for (var $ = 0; $ < 4; $++) D[$] = 0;
        return S.clean(), H;
      }
      e.pbkdf2 = d;
    });
  })(zi);
  var fd = zi.exports;
  function Wi(t) {
    const e = fd.hash(t);
    return dd(e);
  }
  function ud(t) {
    const e = new TextEncoder(), n = Ni(t.map((r) => e.encode(r)));
    return Wi(n);
  }
  function dd(t) {
    return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
  }
  function ld(t) {
    if (t.length < 2) return null;
    const e = t[t.length - 2];
    return e === "snapshot" || e === "incremental" ? e : null;
  }
  class hd {
    constructor(e) {
      __privateAdd(this, _hd_instances);
      __privateAdd(this, _t5);
      __privateAdd(this, _e5, /* @__PURE__ */ new Map());
      __privateAdd(this, _n5, /* @__PURE__ */ new Map());
      __privateAdd(this, _r5, false);
      __privateAdd(this, _s5, Be("automerge-repo:storage-subsystem"));
      __privateSet(this, _t5, e);
    }
    async id() {
      const e = await __privateGet(this, _t5).load([
        "storage-adapter-id"
      ]);
      let n;
      return e ? n = new TextDecoder().decode(e) : (n = qs(), await __privateGet(this, _t5).save([
        "storage-adapter-id"
      ], new TextEncoder().encode(n))), n;
    }
    async load(e, n) {
      const r = [
        e,
        n
      ];
      return await __privateGet(this, _t5).load(r);
    }
    async save(e, n, r) {
      const s = [
        e,
        n
      ];
      await __privateGet(this, _t5).save(s, r);
    }
    async remove(e, n) {
      const r = [
        e,
        n
      ];
      await __privateGet(this, _t5).remove(r);
    }
    async loadDoc(e) {
      const n = await __privateGet(this, _t5).loadRange([
        e
      ]), r = [], s = [];
      for (const a of n) {
        if (a.data === void 0) continue;
        const c = ld(a.key);
        c != null && (s.push({
          key: a.key,
          type: c,
          size: a.data.length
        }), r.push(a.data));
      }
      __privateGet(this, _n5).set(e, s);
      const i = Ni(r);
      if (i.length === 0) return null;
      const o = Qs(mn(), i);
      return __privateGet(this, _e5).set(e, ve(o)), o;
    }
    async saveDoc(e, n) {
      if (!__privateMethod(this, _hd_instances, o_fn3).call(this, e, n)) return;
      const r = __privateGet(this, _n5).get(e) ?? [];
      __privateMethod(this, _hd_instances, c_fn2).call(this, r) ? await __privateMethod(this, _hd_instances, a_fn2).call(this, e, n, r) : await __privateMethod(this, _hd_instances, i_fn).call(this, e, n), __privateGet(this, _e5).set(e, ve(n));
    }
    async removeDoc(e) {
      await __privateGet(this, _t5).removeRange([
        e,
        "snapshot"
      ]), await __privateGet(this, _t5).removeRange([
        e,
        "incremental"
      ]), await __privateGet(this, _t5).removeRange([
        e,
        "sync-state"
      ]);
    }
    async loadSyncState(e, n) {
      const r = [
        e,
        "sync-state",
        n
      ], s = await __privateGet(this, _t5).load(r);
      return s ? ni(s) : void 0;
    }
    async saveSyncState(e, n, r) {
      const s = [
        e,
        "sync-state",
        n
      ];
      await __privateGet(this, _t5).save(s, ti(r));
    }
  }
  _t5 = new WeakMap();
  _e5 = new WeakMap();
  _n5 = new WeakMap();
  _r5 = new WeakMap();
  _s5 = new WeakMap();
  _hd_instances = new WeakSet();
  i_fn = async function(e, n) {
    const r = Bc(n, __privateGet(this, _e5).get(e) ?? []);
    if (r && r.length > 0) {
      const s = [
        e,
        "incremental",
        Wi(r)
      ];
      __privateGet(this, _s5).call(this, `Saving incremental ${s} for document ${e}`), await __privateGet(this, _t5).save(s, r), __privateGet(this, _n5).has(e) || __privateGet(this, _n5).set(e, []), __privateGet(this, _n5).get(e).push({
        key: s,
        type: "incremental",
        size: r.length
      }), __privateGet(this, _e5).set(e, ve(n));
    } else return Promise.resolve();
  };
  a_fn2 = async function(e, n, r) {
    var _a5;
    __privateSet(this, _r5, true);
    const s = ei(n), i = ud(ve(n)), o = [
      e,
      "snapshot",
      i
    ], a = new Set(r.map((f) => f.key).filter((f) => f[2] !== i));
    __privateGet(this, _s5).call(this, `Saving snapshot ${o} for document ${e}`), __privateGet(this, _s5).call(this, `deleting old chunks ${Array.from(a)}`), await __privateGet(this, _t5).save(o, s);
    for (const f of a) await __privateGet(this, _t5).remove(f);
    const c = ((_a5 = __privateGet(this, _n5).get(e)) == null ? void 0 : _a5.filter((f) => !a.has(f.key))) ?? [];
    c.push({
      key: o,
      type: "snapshot",
      size: s.length
    }), __privateGet(this, _n5).set(e, c), __privateSet(this, _r5, false);
  };
  o_fn3 = function(e, n) {
    const r = __privateGet(this, _e5).get(e);
    if (!r) return true;
    const s = ve(n);
    return !qr(s, r);
  };
  c_fn2 = function(e) {
    if (__privateGet(this, _r5)) return false;
    let n = 0, r = 0;
    for (const s of e) s.type === "snapshot" ? n += s.size : r += s.size;
    return n < 1024 || r >= n;
  };
  class Vi extends pt {
  }
  class _d extends Vi {
    constructor({ handle: e, onLoadSyncState: n }) {
      super();
      __privateAdd(this, __d_instances);
      __privateAdd(this, _t6);
      __publicField(this, "syncDebounceRate", 100);
      __privateAdd(this, _e6, []);
      __privateAdd(this, _n6, {});
      __privateAdd(this, _r6, {});
      __privateAdd(this, _s6, {});
      __privateAdd(this, _i4, []);
      __privateAdd(this, _a3, false);
      __privateAdd(this, _o2);
      __privateAdd(this, _c2);
      __privateSet(this, _o2, e), __privateSet(this, _c2, n ?? (() => Promise.resolve(void 0)));
      const r = e.documentId.slice(0, 5);
      __privateSet(this, _t6, Be(`automerge-repo:docsync:${r}`)), e.on("change", yr(() => __privateMethod(this, __d_instances, g_fn).call(this), this.syncDebounceRate)), e.on("ephemeral-message-outbound", (s) => __privateMethod(this, __d_instances, p_fn).call(this, s)), (async () => (await e.doc([
        Fn,
        zt
      ]), __privateMethod(this, __d_instances, __fn).call(this)))();
    }
    get peerStates() {
      return __privateGet(this, _r6);
    }
    get documentId() {
      return __privateGet(this, _o2).documentId;
    }
    hasPeer(e) {
      return __privateGet(this, _e6).includes(e);
    }
    beginSync(e) {
      const n = e.every((s) => __privateGet(this, _r6)[s] in [
        "unavailable",
        "wants"
      ]), r = __privateGet(this, _o2).doc([
        Fn,
        zt,
        Cs
      ]).then((s) => {
        if (__privateSet(this, _a3, true), __privateMethod(this, __d_instances, f_fn).call(this), !(s === void 0 && n)) return s ?? mn();
      });
      __privateGet(this, _t6).call(this, `beginSync: ${e.join(", ")}`), e.forEach((s) => {
        __privateMethod(this, __d_instances, u_fn).call(this, s, (i) => {
          const o = ni(ti(i));
          __privateMethod(this, __d_instances, d_fn).call(this, s, o), r.then((a) => {
            a && __privateMethod(this, __d_instances, l_fn).call(this, s, a);
          }).catch((a) => {
            __privateGet(this, _t6).call(this, `Error loading doc for ${s}: ${a}`);
          });
        });
      });
    }
    endSync(e) {
      __privateGet(this, _t6).call(this, `removing peer ${e}`), __privateSet(this, _e6, __privateGet(this, _e6).filter((n) => n !== e));
    }
    receiveMessage(e) {
      switch (e.type) {
        case "sync":
        case "request":
          this.receiveSyncMessage(e);
          break;
        case "ephemeral":
          this.receiveEphemeralMessage(e);
          break;
        case "doc-unavailable":
          __privateGet(this, _r6)[e.senderId] = "unavailable", __privateMethod(this, __d_instances, f_fn).call(this);
          break;
        default:
          throw new Error(`unknown message type: ${e}`);
      }
    }
    receiveEphemeralMessage(e) {
      if (e.documentId !== __privateGet(this, _o2).documentId) throw new Error("channelId doesn't match documentId");
      const { senderId: n, data: r } = e, s = Ui(new Uint8Array(r));
      __privateGet(this, _o2).emit("ephemeral-message", {
        handle: __privateGet(this, _o2),
        senderId: n,
        message: s
      }), __privateGet(this, _e6).forEach((i) => {
        i !== n && this.emit("message", {
          ...e,
          targetId: i
        });
      });
    }
    receiveSyncMessage(e) {
      if (e.documentId !== __privateGet(this, _o2).documentId) throw new Error("channelId doesn't match documentId");
      if (!__privateGet(this, _o2).inState([
        Fn,
        zt,
        Cs
      ])) {
        __privateGet(this, _i4).push({
          message: e,
          received: /* @__PURE__ */ new Date()
        });
        return;
      }
      __privateMethod(this, __d_instances, __fn).call(this), __privateMethod(this, __d_instances, h_fn).call(this, e);
    }
  }
  _t6 = new WeakMap();
  _e6 = new WeakMap();
  _n6 = new WeakMap();
  _r6 = new WeakMap();
  _s6 = new WeakMap();
  _i4 = new WeakMap();
  _a3 = new WeakMap();
  _o2 = new WeakMap();
  _c2 = new WeakMap();
  __d_instances = new WeakSet();
  g_fn = async function() {
    __privateGet(this, _t6).call(this, "syncWithPeers");
    const e = await __privateGet(this, _o2).doc();
    e !== void 0 && __privateGet(this, _e6).forEach((n) => __privateMethod(this, __d_instances, l_fn).call(this, n, e));
  };
  p_fn = async function({ data: e }) {
    __privateGet(this, _t6).call(this, "broadcastToPeers", __privateGet(this, _e6)), __privateGet(this, _e6).forEach((n) => __privateMethod(this, __d_instances, y_fn).call(this, n, e));
  };
  y_fn = function(e, n) {
    __privateGet(this, _t6).call(this, `sendEphemeralMessage ->${e}`);
    const r = {
      type: "ephemeral",
      targetId: e,
      documentId: __privateGet(this, _o2).documentId,
      data: n
    };
    this.emit("message", r);
  };
  u_fn = function(e, n) {
    __privateMethod(this, __d_instances, b_fn).call(this, e), e in __privateGet(this, _r6) || (__privateGet(this, _r6)[e] = "unknown");
    const r = __privateGet(this, _s6)[e];
    if (r) {
      n(r);
      return;
    }
    let s = __privateGet(this, _n6)[e];
    s || (__privateGet(this, _c2).call(this, e).then((i) => {
      __privateMethod(this, __d_instances, m_fn).call(this, e, i ?? Pc());
    }).catch((i) => {
      __privateGet(this, _t6).call(this, `Error loading sync state for ${e}: ${i}`);
    }), s = __privateGet(this, _n6)[e] = []), s.push(n);
  };
  b_fn = function(e) {
    __privateGet(this, _e6).includes(e) || (__privateGet(this, _e6).push(e), this.emit("open-doc", {
      documentId: this.documentId,
      peerId: e
    }));
  };
  m_fn = function(e, n) {
    const r = __privateGet(this, _n6)[e];
    if (r) for (const s of r) s(n);
    delete __privateGet(this, _n6)[e], __privateGet(this, _s6)[e] = n;
  };
  d_fn = function(e, n) {
    __privateGet(this, _s6)[e] = n, this.emit("sync-state", {
      peerId: e,
      syncState: n,
      documentId: __privateGet(this, _o2).documentId
    });
  };
  l_fn = function(e, n) {
    __privateGet(this, _t6).call(this, `sendSyncMessage ->${e}`), __privateMethod(this, __d_instances, u_fn).call(this, e, (r) => {
      const [s, i] = Dc(n, r);
      if (i) {
        __privateMethod(this, __d_instances, d_fn).call(this, e, s);
        const o = ve(n).length === 0;
        !__privateGet(this, _o2).isReady() && o && s.sharedHeads.length === 0 && !Object.values(__privateGet(this, _r6)).includes("has") && __privateGet(this, _r6)[e] === "unknown" ? this.emit("message", {
          type: "request",
          targetId: e,
          documentId: __privateGet(this, _o2).documentId,
          data: i
        }) : this.emit("message", {
          type: "sync",
          targetId: e,
          data: i,
          documentId: __privateGet(this, _o2).documentId
        }), o || (__privateGet(this, _r6)[e] = "has");
      }
    });
  };
  h_fn = function(e) {
    Li(e) && (__privateGet(this, _r6)[e.senderId] = "wants"), __privateMethod(this, __d_instances, f_fn).call(this), $c(e.data).heads.length > 0 && (__privateGet(this, _r6)[e.senderId] = "has"), __privateMethod(this, __d_instances, u_fn).call(this, e.senderId, (n) => {
      __privateGet(this, _o2).update((r) => {
        const [s, i] = Uc(r, n, e.data);
        return __privateMethod(this, __d_instances, d_fn).call(this, e.senderId, i), __privateMethod(this, __d_instances, l_fn).call(this, e.senderId, r), s;
      }), __privateMethod(this, __d_instances, f_fn).call(this);
    });
  };
  f_fn = function() {
    __privateGet(this, _a3) && __privateGet(this, _o2).inState([
      zt
    ]) && __privateGet(this, _e6).every((e) => __privateGet(this, _r6)[e] === "unavailable" || __privateGet(this, _r6)[e] === "wants") && (__privateGet(this, _e6).filter((e) => __privateGet(this, _r6)[e] === "wants").forEach((e) => {
      const n = {
        type: "doc-unavailable",
        documentId: __privateGet(this, _o2).documentId,
        targetId: e
      };
      this.emit("message", n);
    }), __privateGet(this, _o2).unavailable());
  };
  __fn = function() {
    for (const e of __privateGet(this, _i4)) __privateMethod(this, __d_instances, h_fn).call(this, e.message);
    __privateSet(this, _i4, []);
  };
  const Ln = Be("automerge-repo:collectionsync");
  class gd extends Vi {
    constructor(e) {
      super();
      __privateAdd(this, _gd_instances);
      __publicField(this, "repo");
      __privateAdd(this, _t7, /* @__PURE__ */ new Set());
      __privateAdd(this, _e7, {});
      __privateAdd(this, _n7, {});
      this.repo = e;
    }
    async receiveMessage(e) {
      Ln(`onSyncMessage: ${e.senderId}, ${e.documentId}, ${"data" in e ? e.data.byteLength + "bytes" : ""}`);
      const n = e.documentId;
      if (!n) throw new Error("received a message with an invalid documentId");
      __privateGet(this, _n7)[n] = true;
      const r = __privateMethod(this, _gd_instances, r_fn).call(this, n);
      r.receiveMessage(e);
      const s = await __privateMethod(this, _gd_instances, i_fn2).call(this, n);
      r.beginSync(s.filter((i) => !r.hasPeer(i)));
    }
    addDocument(e) {
      if (__privateGet(this, _n7)[e]) return;
      const n = __privateMethod(this, _gd_instances, r_fn).call(this, e);
      __privateMethod(this, _gd_instances, i_fn2).call(this, e).then((r) => {
        n.beginSync(r);
      });
    }
    removeDocument(e) {
      throw new Error("not implemented");
    }
    addPeer(e) {
      if (Ln(`adding ${e} & synchronizing with them`), !__privateGet(this, _t7).has(e)) {
        __privateGet(this, _t7).add(e);
        for (const n of Object.values(__privateGet(this, _e7))) {
          const { documentId: r } = n;
          this.repo.sharePolicy(e, r).then((s) => {
            s && n.beginSync([
              e
            ]);
          });
        }
      }
    }
    removePeer(e) {
      Ln(`removing peer ${e}`), __privateGet(this, _t7).delete(e);
      for (const n of Object.values(__privateGet(this, _e7))) n.endSync(e);
    }
    get peers() {
      return Array.from(__privateGet(this, _t7));
    }
  }
  _t7 = new WeakMap();
  _e7 = new WeakMap();
  _n7 = new WeakMap();
  _gd_instances = new WeakSet();
  r_fn = function(e) {
    if (!__privateGet(this, _e7)[e]) {
      const n = this.repo.find(Wr({
        documentId: e
      }));
      __privateGet(this, _e7)[e] = __privateMethod(this, _gd_instances, s_fn).call(this, n);
    }
    return __privateGet(this, _e7)[e];
  };
  s_fn = function(e) {
    const n = new _d({
      handle: e,
      onLoadSyncState: async (r) => {
        if (!this.repo.storageSubsystem) return;
        const { storageId: s, isEphemeral: i } = this.repo.peerMetadataByPeerId[r] || {};
        if (!(!s || i)) return this.repo.storageSubsystem.loadSyncState(e.documentId, s);
      }
    });
    return n.on("message", (r) => this.emit("message", r)), n.on("open-doc", (r) => this.emit("open-doc", r)), n.on("sync-state", (r) => this.emit("sync-state", r)), n;
  };
  i_fn2 = async function(e) {
    const n = Array.from(__privateGet(this, _t7)), r = [];
    for (const s of n) await this.repo.sharePolicy(s, e) && r.push(s);
    return r;
  };
  class pd extends pt {
    constructor({ storage: e, network: n = [], peerId: r, sharePolicy: s, isEphemeral: i = e === void 0, enableRemoteHeadsGossiping: o = false } = {}) {
      super();
      __privateAdd(this, _pd_instances);
      __privateAdd(this, _t8);
      __publicField(this, "networkSubsystem");
      __publicField(this, "storageSubsystem");
      __publicField(this, "saveDebounceRate", 100);
      __privateAdd(this, _e8, {});
      __privateAdd(this, _n8);
      __publicField(this, "sharePolicy", async () => true);
      __publicField(this, "peerMetadataByPeerId", {});
      __privateAdd(this, _r7, new ed());
      __privateAdd(this, _s7, false);
      __privateAdd(this, _a4, {});
      __publicField(this, "subscribeToRemotes", (e) => {
        __privateGet(this, _s7) ? (__privateGet(this, _t8).call(this, "subscribeToRemotes", {
          remotes: e
        }), __privateGet(this, _r7).subscribeToRemotes(e)) : __privateGet(this, _t8).call(this, "WARN: subscribeToRemotes called but remote heads gossiping is not enabled");
      });
      __publicField(this, "storageId", async () => {
        if (this.storageSubsystem) return this.storageSubsystem.id();
      });
      __privateSet(this, _s7, o), __privateSet(this, _t8, Be("automerge-repo:repo")), this.sharePolicy = s ?? this.sharePolicy, this.on("document", async ({ handle: u, isNew: d }) => {
        if (a) {
          const _ = ({ handle: l, doc: b }) => {
            a.saveDoc(l.documentId, b);
          };
          if (u.on("heads-changed", yr(_, this.saveDebounceRate)), d) await a.saveDoc(u.documentId, u.docSync());
          else {
            const l = await a.loadDoc(u.documentId);
            l && u.update(() => l);
          }
        }
        u.on("unavailable", () => {
          __privateGet(this, _t8).call(this, "document unavailable", {
            documentId: u.documentId
          }), this.emit("unavailable-document", {
            documentId: u.documentId
          });
        }), this.networkSubsystem.isReady() ? u.request() : (u.awaitNetwork(), this.networkSubsystem.whenReady().then(() => {
          u.networkReady();
        }).catch((_) => {
          __privateGet(this, _t8).call(this, "error waiting for network", {
            err: _
          });
        })), __privateGet(this, _n8).addDocument(u.documentId);
      }), this.on("delete-document", ({ documentId: u }) => {
        a && a.removeDoc(u).catch((d) => {
          __privateGet(this, _t8).call(this, "error deleting document", {
            documentId: u,
            err: d
          });
        });
      }), __privateSet(this, _n8, new gd(this)), __privateGet(this, _n8).on("message", (u) => {
        __privateGet(this, _t8).call(this, `sending ${u.type} message to ${u.targetId}`), f.send(u);
      }), __privateGet(this, _s7) && __privateGet(this, _n8).on("open-doc", ({ peerId: u, documentId: d }) => {
        __privateGet(this, _r7).subscribePeerToDoc(u, d);
      });
      const a = e ? new hd(e) : void 0;
      this.storageSubsystem = a;
      const c = (async () => ({
        storageId: await (a == null ? void 0 : a.id()),
        isEphemeral: i
      }))(), f = new ad(n, r, c);
      this.networkSubsystem = f, f.on("peer", async ({ peerId: u, peerMetadata: d }) => {
        __privateGet(this, _t8).call(this, "peer connected", {
          peerId: u
        }), d && (this.peerMetadataByPeerId[u] = {
          ...d
        }), this.sharePolicy(u).then((_) => {
          _ && __privateGet(this, _s7) && __privateGet(this, _r7).addGenerousPeer(u);
        }).catch((_) => {
          console.log("error in share policy", {
            err: _
          });
        }), __privateGet(this, _n8).addPeer(u);
      }), f.on("peer-disconnected", ({ peerId: u }) => {
        __privateGet(this, _n8).removePeer(u), __privateGet(this, _r7).removePeer(u);
      }), f.on("message", async (u) => {
        __privateMethod(this, _pd_instances, i_fn3).call(this, u);
      }), __privateGet(this, _n8).on("sync-state", (u) => {
        __privateMethod(this, _pd_instances, o_fn4).call(this, u);
        const d = __privateGet(this, _e8)[u.documentId], { storageId: _ } = this.peerMetadataByPeerId[u.peerId] || {};
        if (!_) return;
        const l = d.getRemoteHeads(_);
        u.syncState.theirHeads && (!l || !qr(l, u.syncState.theirHeads)) && u.syncState.theirHeads && (d.setRemoteHeads(_, u.syncState.theirHeads), _ && __privateGet(this, _s7) && __privateGet(this, _r7).handleImmediateRemoteHeadsChanged(u.documentId, _, u.syncState.theirHeads));
      }), __privateGet(this, _s7) && (__privateGet(this, _r7).on("notify-remote-heads", (u) => {
        this.networkSubsystem.send({
          type: "remote-heads-changed",
          targetId: u.targetId,
          documentId: u.documentId,
          newHeads: {
            [u.storageId]: {
              heads: u.heads,
              timestamp: u.timestamp
            }
          }
        });
      }), __privateGet(this, _r7).on("change-remote-subs", (u) => {
        __privateGet(this, _t8).call(this, "change-remote-subs", u);
        for (const d of u.peers) this.networkSubsystem.send({
          type: "remote-subscription-change",
          targetId: d,
          add: u.add,
          remove: u.remove
        });
      }), __privateGet(this, _r7).on("remote-heads-changed", (u) => {
        __privateGet(this, _e8)[u.documentId].setRemoteHeads(u.storageId, u.remoteHeads);
      }));
    }
    get handles() {
      return __privateGet(this, _e8);
    }
    get peers() {
      return __privateGet(this, _n8).peers;
    }
    getStorageIdOfPeer(e) {
      var _a5;
      return (_a5 = this.peerMetadataByPeerId[e]) == null ? void 0 : _a5.storageId;
    }
    create(e) {
      const { documentId: n } = zr(wu()), r = __privateMethod(this, _pd_instances, c_fn3).call(this, {
        documentId: n,
        isNew: true,
        initialValue: e
      });
      return this.emit("document", {
        handle: r,
        isNew: true
      }), r;
    }
    clone(e) {
      if (!e.isReady()) throw new Error(`Cloned handle is not yet in ready state.
        (Try await handle.waitForReady() first.)`);
      const n = e.docSync();
      if (!n) throw new Error("Cloned handle doesn't have a document.");
      const r = this.create();
      return r.update(() => is(n)), r;
    }
    find(e) {
      const n = Dn(e);
      if (__privateGet(this, _e8)[n]) return __privateGet(this, _e8)[n].isUnavailable() && setTimeout(() => {
        __privateGet(this, _e8)[n].emit("unavailable", {
          handle: __privateGet(this, _e8)[n]
        });
      }), __privateGet(this, _e8)[n];
      const r = __privateMethod(this, _pd_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      });
      return this.emit("document", {
        handle: r,
        isNew: false
      }), r;
    }
    delete(e) {
      const n = Dn(e);
      __privateMethod(this, _pd_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      }).delete(), delete __privateGet(this, _e8)[n], this.emit("delete-document", {
        documentId: n
      });
    }
    async export(e) {
      const n = Dn(e), s = await __privateMethod(this, _pd_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      }).doc();
      if (s) return ei(s);
    }
    import(e) {
      const n = Lc(e), r = this.create();
      return r.update(() => is(n)), r;
    }
    async flush(e) {
      if (!this.storageSubsystem) return;
      const n = e ? e.map((r) => __privateGet(this, _e8)[r]) : Object.values(__privateGet(this, _e8));
      await Promise.all(n.map(async (r) => {
        const s = r.docSync();
        if (s) return this.storageSubsystem.saveDoc(r.documentId, s);
      }));
    }
  }
  _t8 = new WeakMap();
  _e8 = new WeakMap();
  _n8 = new WeakMap();
  _r7 = new WeakMap();
  _s7 = new WeakMap();
  _pd_instances = new WeakSet();
  i_fn3 = function(e) {
    switch (e.type) {
      case "remote-subscription-change":
        __privateGet(this, _s7) && __privateGet(this, _r7).handleControlMessage(e);
        break;
      case "remote-heads-changed":
        __privateGet(this, _s7) && __privateGet(this, _r7).handleRemoteHeads(e);
        break;
      case "sync":
      case "request":
      case "ephemeral":
      case "doc-unavailable":
        __privateGet(this, _n8).receiveMessage(e).catch((n) => {
          console.log("error receiving message", {
            err: n
          });
        });
    }
  };
  _a4 = new WeakMap();
  o_fn4 = function(e) {
    if (!this.storageSubsystem) return;
    const { storageId: n, isEphemeral: r } = this.peerMetadataByPeerId[e.peerId] || {};
    if (!n || r) return;
    let s = __privateGet(this, _a4)[n];
    s || (s = __privateGet(this, _a4)[n] = yr(({ documentId: i, syncState: o }) => {
      this.storageSubsystem.saveSyncState(i, n, o);
    }, this.saveDebounceRate)), s(e);
  };
  c_fn3 = function({ documentId: e, isNew: n, initialValue: r }) {
    if (__privateGet(this, _e8)[e]) return __privateGet(this, _e8)[e];
    if (!e) throw new Error(`Invalid documentId ${e}`);
    const s = new Wu(e, {
      isNew: n,
      initialValue: r
    });
    return __privateGet(this, _e8)[e] = s, s;
  };
  class yd extends pt {
    constructor() {
      super(...arguments);
      __publicField(this, "peerId");
      __publicField(this, "peerMetadata");
    }
  }
  const bd = "" + new URL("automerge_wasm_bg-BEjDkhWo.wasm", import.meta.url).href, md = async (t = {}, e) => {
    let n;
    if (e.startsWith("data:")) {
      const r = e.replace(/^data:.*?base64,/, "");
      let s;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") s = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const i = atob(r);
        s = new Uint8Array(i.length);
        for (let o = 0; o < i.length; o++) s[o] = i.charCodeAt(o);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(s, t);
    } else {
      const r = await fetch(e), s = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && s.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(r, t);
      else {
        const i = await r.arrayBuffer();
        n = await WebAssembly.instantiate(i, t);
      }
    }
    return n.instance.exports;
  };
  let h;
  function Ki(t) {
    h = t;
  }
  const De = new Array(128).fill(void 0);
  De.push(void 0, null, true, false);
  function R(t) {
    return De[t];
  }
  let Et = De.length;
  function wd(t) {
    t < 132 || (De[t] = Et, Et = t);
  }
  function A(t) {
    const e = R(t);
    return wd(t), e;
  }
  let me = 0, Vt = null;
  function en() {
    return (Vt === null || Vt.byteLength === 0) && (Vt = new Uint8Array(h.memory.buffer)), Vt;
  }
  const vd = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let tn = new vd("utf-8");
  const xd = typeof tn.encodeInto == "function" ? function(t, e) {
    return tn.encodeInto(t, e);
  } : function(t, e) {
    const n = tn.encode(t);
    return e.set(n), {
      read: t.length,
      written: n.length
    };
  };
  function Te(t, e, n) {
    if (n === void 0) {
      const a = tn.encode(t), c = e(a.length, 1) >>> 0;
      return en().subarray(c, c + a.length).set(a), me = a.length, c;
    }
    let r = t.length, s = e(r, 1) >>> 0;
    const i = en();
    let o = 0;
    for (; o < r; o++) {
      const a = t.charCodeAt(o);
      if (a > 127) break;
      i[s + o] = a;
    }
    if (o !== r) {
      o !== 0 && (t = t.slice(o)), s = n(s, r, r = o + t.length * 3, 1) >>> 0;
      const a = en().subarray(s + o, s + r), c = xd(t, a);
      o += c.written, s = n(s, r, o, 1) >>> 0;
    }
    return me = o, s;
  }
  function X(t) {
    return t == null;
  }
  let Kt = null;
  function y() {
    return (Kt === null || Kt.byteLength === 0) && (Kt = new Int32Array(h.memory.buffer)), Kt;
  }
  const Sd = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let Gi = new Sd("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  Gi.decode();
  function _e(t, e) {
    return t = t >>> 0, Gi.decode(en().subarray(t, t + e));
  }
  function w(t) {
    Et === De.length && De.push(De.length + 1);
    const e = Et;
    return Et = De[e], De[e] = t, e;
  }
  let Gt = null;
  function nn() {
    return (Gt === null || Gt.byteLength === 0) && (Gt = new Float64Array(h.memory.buffer)), Gt;
  }
  function br(t) {
    const e = typeof t;
    if (e == "number" || e == "boolean" || t == null) return `${t}`;
    if (e == "string") return `"${t}"`;
    if (e == "symbol") {
      const s = t.description;
      return s == null ? "Symbol" : `Symbol(${s})`;
    }
    if (e == "function") {
      const s = t.name;
      return typeof s == "string" && s.length > 0 ? `Function(${s})` : "Function";
    }
    if (Array.isArray(t)) {
      const s = t.length;
      let i = "[";
      s > 0 && (i += br(t[0]));
      for (let o = 1; o < s; o++) i += ", " + br(t[o]);
      return i += "]", i;
    }
    const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
    let r;
    if (n.length > 1) r = n[1];
    else return toString.call(t);
    if (r == "Object") try {
      return "Object(" + JSON.stringify(t) + ")";
    } catch {
      return "Object";
    }
    return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : r;
  }
  function qe(t, e) {
    if (!(t instanceof e)) throw new Error(`expected instance of ${e.name}`);
    return t.ptr;
  }
  function kd(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.create(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return Ie.__wrap(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Ad(t, e) {
    try {
      const i = h.__wbindgen_add_to_stack_pointer(-16);
      h.load(i, w(t), w(e));
      var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
      if (s) throw A(r);
      return Ie.__wrap(n);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Ed(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.encodeChange(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return A(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Id(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.decodeChange(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return A(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Cd() {
    const t = h.initSyncState();
    return we.__wrap(t);
  }
  function Td(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.importSyncState(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return we.__wrap(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Od(t) {
    qe(t, we);
    const e = h.exportSyncState(t.__wbg_ptr);
    return A(e);
  }
  function Md(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.encodeSyncMessage(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return A(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function Rd(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.decodeSyncMessage(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return A(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function jd(t) {
    qe(t, we);
    const e = h.encodeSyncState(t.__wbg_ptr);
    return A(e);
  }
  function Dd(t) {
    try {
      const s = h.__wbindgen_add_to_stack_pointer(-16);
      h.decodeSyncState(s, w(t));
      var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
      if (r) throw A(n);
      return we.__wrap(e);
    } finally {
      h.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function fe(t, e) {
    try {
      return t.apply(this, e);
    } catch (n) {
      h.__wbindgen_exn_store(w(n));
    }
  }
  const Ud = Object.freeze({
    Array: 0,
    0: "Array",
    String: 1,
    1: "String"
  }), Ts = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => h.__wbg_automerge_free(t >>> 0));
  class Ie {
    static __wrap(e) {
      e = e >>> 0;
      const n = Object.create(Ie.prototype);
      return n.__wbg_ptr = e, Ts.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Ts.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      h.__wbg_automerge_free(e);
    }
    static new(e, n) {
      try {
        const c = h.__wbindgen_add_to_stack_pointer(-16);
        var r = X(e) ? 0 : Te(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
        h.automerge_new(c, r, s, n);
        var i = y()[c / 4 + 0], o = y()[c / 4 + 1], a = y()[c / 4 + 2];
        if (a) throw A(o);
        return Ie.__wrap(i);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clone(e) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        var n = X(e) ? 0 : Te(e, h.__wbindgen_malloc, h.__wbindgen_realloc), r = me;
        h.automerge_clone(a, this.__wbg_ptr, n, r);
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return Ie.__wrap(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    fork(e, n) {
      try {
        const c = h.__wbindgen_add_to_stack_pointer(-16);
        var r = X(e) ? 0 : Te(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
        h.automerge_fork(c, this.__wbg_ptr, r, s, w(n));
        var i = y()[c / 4 + 0], o = y()[c / 4 + 1], a = y()[c / 4 + 2];
        if (a) throw A(o);
        return Ie.__wrap(i);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pendingOps() {
      const e = h.automerge_pendingOps(this.__wbg_ptr);
      return A(e);
    }
    commit(e, n) {
      var r = X(e) ? 0 : Te(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
      const i = h.automerge_commit(this.__wbg_ptr, r, s, !X(n), X(n) ? 0 : n);
      return A(i);
    }
    merge(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        qe(e, Ie), h.automerge_merge(i, this.__wbg_ptr, e.__wbg_ptr);
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    rollback() {
      return h.automerge_rollback(this.__wbg_ptr);
    }
    keys(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_keys(o, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    text(e, n) {
      let r, s;
      try {
        const d = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_text(d, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var i = y()[d / 4 + 0], o = y()[d / 4 + 1], a = y()[d / 4 + 2], c = y()[d / 4 + 3], f = i, u = o;
        if (c) throw f = 0, u = 0, A(a);
        return r = f, s = u, _e(f, u);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16), h.__wbindgen_free(r, s, 1);
      }
    }
    spans(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_spans(o, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    splice(e, n, r, s) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_splice(a, this.__wbg_ptr, w(e), n, r, w(s));
        var i = y()[a / 4 + 0], o = y()[a / 4 + 1];
        if (o) throw A(i);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateText(e, n) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_updateText(i, this.__wbg_ptr, w(e), w(n));
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        if (s) throw A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateSpans(e, n) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_updateSpans(i, this.__wbg_ptr, w(e), w(n));
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        if (s) throw A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    push(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_push(o, this.__wbg_ptr, w(e), w(n), w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pushObject(e, n) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_pushObject(a, this.__wbg_ptr, w(e), w(n));
        var r = y()[a / 4 + 0], s = y()[a / 4 + 1], i = y()[a / 4 + 2], o = y()[a / 4 + 3];
        if (o) throw A(i);
        let c;
        return r !== 0 && (c = _e(r, s).slice(), h.__wbindgen_free(r, s * 1, 1)), c;
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insert(e, n, r, s) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_insert(a, this.__wbg_ptr, w(e), n, w(r), w(s));
        var i = y()[a / 4 + 0], o = y()[a / 4 + 1];
        if (o) throw A(i);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    splitBlock(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_splitBlock(o, this.__wbg_ptr, w(e), n, w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    joinBlock(e, n) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_joinBlock(i, this.__wbg_ptr, w(e), n);
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        if (s) throw A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateBlock(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_updateBlock(o, this.__wbg_ptr, w(e), n, w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getBlock(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getBlock(a, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insertObject(e, n, r) {
      try {
        const c = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_insertObject(c, this.__wbg_ptr, w(e), n, w(r));
        var s = y()[c / 4 + 0], i = y()[c / 4 + 1], o = y()[c / 4 + 2], a = y()[c / 4 + 3];
        if (a) throw A(o);
        let f;
        return s !== 0 && (f = _e(s, i).slice(), h.__wbindgen_free(s, i * 1, 1)), f;
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    put(e, n, r, s) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_put(a, this.__wbg_ptr, w(e), w(n), w(r), w(s));
        var i = y()[a / 4 + 0], o = y()[a / 4 + 1];
        if (o) throw A(i);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    putObject(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_putObject(a, this.__wbg_ptr, w(e), w(n), w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    increment(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_increment(o, this.__wbg_ptr, w(e), w(n), w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_get(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getWithType(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getWithType(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    objInfo(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_objInfo(o, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getAll(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getAll(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    enableFreeze(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_enableFreeze(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    registerDatatype(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_registerDatatype(o, this.__wbg_ptr, w(e), w(n), w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyPatches(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_applyPatches(o, this.__wbg_ptr, w(e), w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyAndReturnPatches(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_applyAndReturnPatches(o, this.__wbg_ptr, w(e), w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    diffIncremental() {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_diffIncremental(s, this.__wbg_ptr);
        var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
        if (r) throw A(n);
        return A(e);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateDiffCursor() {
      h.automerge_updateDiffCursor(this.__wbg_ptr);
    }
    resetDiffCursor() {
      h.automerge_resetDiffCursor(this.__wbg_ptr);
    }
    diff(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_diff(o, this.__wbg_ptr, w(e), w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    isolate(e) {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_isolate(s, this.__wbg_ptr, w(e));
        var n = y()[s / 4 + 0], r = y()[s / 4 + 1];
        if (r) throw A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    integrate() {
      h.automerge_integrate(this.__wbg_ptr);
    }
    length(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_length(o, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = nn()[o / 8 + 0], s = y()[o / 4 + 2], i = y()[o / 4 + 3];
        if (i) throw A(s);
        return r;
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    delete(e, n) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_delete(i, this.__wbg_ptr, w(e), w(n));
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        if (s) throw A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    save() {
      const e = h.automerge_save(this.__wbg_ptr);
      return A(e);
    }
    saveIncremental() {
      const e = h.automerge_saveIncremental(this.__wbg_ptr);
      return A(e);
    }
    saveSince(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_saveSince(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    saveNoCompress() {
      const e = h.automerge_saveNoCompress(this.__wbg_ptr);
      return A(e);
    }
    saveAndVerify() {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_saveAndVerify(s, this.__wbg_ptr);
        var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
        if (r) throw A(n);
        return A(e);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loadIncremental(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_loadIncremental(i, this.__wbg_ptr, w(e));
        var n = nn()[i / 8 + 0], r = y()[i / 4 + 2], s = y()[i / 4 + 3];
        if (s) throw A(r);
        return n;
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyChanges(e) {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_applyChanges(s, this.__wbg_ptr, w(e));
        var n = y()[s / 4 + 0], r = y()[s / 4 + 1];
        if (r) throw A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChanges(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getChanges(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChangeByHash(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getChangeByHash(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getDecodedChangeByHash(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getDecodedChangeByHash(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChangesAdded(e) {
      qe(e, Ie);
      const n = h.automerge_getChangesAdded(this.__wbg_ptr, e.__wbg_ptr);
      return A(n);
    }
    getHeads() {
      const e = h.automerge_getHeads(this.__wbg_ptr);
      return A(e);
    }
    getActorId() {
      let e, n;
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getActorId(i, this.__wbg_ptr);
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        return e = r, n = s, _e(r, s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16), h.__wbindgen_free(e, n, 1);
      }
    }
    getLastLocalChange() {
      const e = h.automerge_getLastLocalChange(this.__wbg_ptr);
      return A(e);
    }
    dump() {
      h.automerge_dump(this.__wbg_ptr);
    }
    getMissingDeps(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getMissingDeps(i, this.__wbg_ptr, X(e) ? 0 : w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    receiveSyncMessage(e, n) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        qe(e, we), h.automerge_receiveSyncMessage(i, this.__wbg_ptr, e.__wbg_ptr, w(n));
        var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
        if (s) throw A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    generateSyncMessage(e) {
      qe(e, we);
      const n = h.automerge_generateSyncMessage(this.__wbg_ptr, e.__wbg_ptr);
      return A(n);
    }
    toJS(e) {
      try {
        const i = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_toJS(i, this.__wbg_ptr, w(e));
        var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
        if (s) throw A(r);
        return A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    materialize(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_materialize(a, this.__wbg_ptr, w(e), X(n) ? 0 : w(n), w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getCursor(e, n, r) {
      let s, i;
      try {
        const _ = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getCursor(_, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var o = y()[_ / 4 + 0], a = y()[_ / 4 + 1], c = y()[_ / 4 + 2], f = y()[_ / 4 + 3], u = o, d = a;
        if (f) throw u = 0, d = 0, A(c);
        return s = u, i = d, _e(u, d);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16), h.__wbindgen_free(s, i, 1);
      }
    }
    getCursorPosition(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_getCursorPosition(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = nn()[a / 8 + 0], i = y()[a / 4 + 2], o = y()[a / 4 + 3];
        if (o) throw A(i);
        return s;
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    emptyChange(e, n) {
      var r = X(e) ? 0 : Te(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
      const i = h.automerge_emptyChange(this.__wbg_ptr, r, s, !X(n), X(n) ? 0 : n);
      return A(i);
    }
    mark(e, n, r, s, i) {
      try {
        const c = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_mark(c, this.__wbg_ptr, w(e), w(n), w(r), w(s), w(i));
        var o = y()[c / 4 + 0], a = y()[c / 4 + 1];
        if (a) throw A(o);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    unmark(e, n, r) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_unmark(o, this.__wbg_ptr, w(e), w(n), w(r));
        var s = y()[o / 4 + 0], i = y()[o / 4 + 1];
        if (i) throw A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    marks(e, n) {
      try {
        const o = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_marks(o, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = y()[o / 4 + 0], s = y()[o / 4 + 1], i = y()[o / 4 + 2];
        if (i) throw A(s);
        return A(r);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    marksAt(e, n, r) {
      try {
        const a = h.__wbindgen_add_to_stack_pointer(-16);
        h.automerge_marksAt(a, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
        if (o) throw A(i);
        return A(s);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hasOurChanges(e) {
      qe(e, we);
      const n = h.automerge_hasOurChanges(this.__wbg_ptr, e.__wbg_ptr);
      return A(n);
    }
    topoHistoryTraversal() {
      const e = h.automerge_topoHistoryTraversal(this.__wbg_ptr);
      return A(e);
    }
    stats() {
      const e = h.automerge_stats(this.__wbg_ptr);
      return A(e);
    }
  }
  const Os = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => h.__wbg_syncstate_free(t >>> 0));
  class we {
    static __wrap(e) {
      e = e >>> 0;
      const n = Object.create(we.prototype);
      return n.__wbg_ptr = e, Os.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, Os.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      h.__wbg_syncstate_free(e);
    }
    get sharedHeads() {
      const e = h.syncstate_sharedHeads(this.__wbg_ptr);
      return A(e);
    }
    get lastSentHeads() {
      const e = h.syncstate_lastSentHeads(this.__wbg_ptr);
      return A(e);
    }
    set lastSentHeads(e) {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.syncstate_set_lastSentHeads(s, this.__wbg_ptr, w(e));
        var n = y()[s / 4 + 0], r = y()[s / 4 + 1];
        if (r) throw A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set sentHashes(e) {
      try {
        const s = h.__wbindgen_add_to_stack_pointer(-16);
        h.syncstate_set_sentHashes(s, this.__wbg_ptr, w(e));
        var n = y()[s / 4 + 0], r = y()[s / 4 + 1];
        if (r) throw A(n);
      } finally {
        h.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clone() {
      const e = h.syncstate_clone(this.__wbg_ptr);
      return we.__wrap(e);
    }
  }
  function Ji(t) {
    A(t);
  }
  function qi(t, e) {
    const n = R(e), r = typeof n == "string" ? n : void 0;
    var s = X(r) ? 0 : Te(r, h.__wbindgen_malloc, h.__wbindgen_realloc), i = me;
    y()[t / 4 + 1] = i, y()[t / 4 + 0] = s;
  }
  function Yi(t, e) {
    const n = new Error(_e(t, e));
    return w(n);
  }
  function Xi(t, e) {
    const n = _e(t, e);
    return w(n);
  }
  function Zi(t) {
    return w(t);
  }
  function Qi(t) {
    const e = R(t);
    return w(e);
  }
  function eo(t, e) {
    const n = R(e), r = typeof n == "number" ? n : void 0;
    nn()[t / 8 + 1] = X(r) ? 0 : r, y()[t / 4 + 0] = !X(r);
  }
  function to(t) {
    return R(t) === void 0;
  }
  function no(t) {
    const e = R(t);
    return typeof e == "boolean" ? e ? 1 : 0 : 2;
  }
  function ro(t) {
    return R(t) === null;
  }
  function so(t) {
    return typeof R(t) == "string";
  }
  function io(t) {
    return typeof R(t) == "function";
  }
  function oo(t) {
    const e = R(t);
    return typeof e == "object" && e !== null;
  }
  function ao(t) {
    return Array.isArray(R(t));
  }
  function co(t, e) {
    const n = R(e), r = JSON.stringify(n === void 0 ? null : n), s = Te(r, h.__wbindgen_malloc, h.__wbindgen_realloc), i = me;
    y()[t / 4 + 1] = i, y()[t / 4 + 0] = s;
  }
  function fo() {
    const t = new Error();
    return w(t);
  }
  function uo(t, e) {
    const n = R(e).stack, r = Te(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
    y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
  }
  function lo(t, e) {
    let n, r;
    try {
      n = t, r = e, console.error(_e(t, e));
    } finally {
      h.__wbindgen_free(n, r, 1);
    }
  }
  function ho(t, e) {
    return R(t) == R(e);
  }
  function _o(t, e) {
    const n = String(R(e)), r = Te(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
    y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
  }
  function go(t) {
    return w(t);
  }
  function po(t) {
    const e = BigInt.asUintN(64, t);
    return w(e);
  }
  function yo(t, e, n) {
    R(t)[A(e)] = A(n);
  }
  function bo() {
    return fe(function(t, e) {
      R(t).getRandomValues(R(e));
    }, arguments);
  }
  function mo() {
    return fe(function(t, e) {
      R(t).randomFillSync(A(e));
    }, arguments);
  }
  function wo(t) {
    const e = R(t).crypto;
    return w(e);
  }
  function vo(t) {
    const e = R(t).process;
    return w(e);
  }
  function xo(t) {
    const e = R(t).versions;
    return w(e);
  }
  function So(t) {
    const e = R(t).node;
    return w(e);
  }
  function ko() {
    return fe(function() {
      const t = module.require;
      return w(t);
    }, arguments);
  }
  function Ao(t) {
    const e = R(t).msCrypto;
    return w(e);
  }
  function Eo(t) {
    console.log(R(t));
  }
  function Io(t, e) {
    console.log(R(t), R(e));
  }
  function Co(t, e) {
    const n = R(t)[e >>> 0];
    return w(n);
  }
  function To(t) {
    return R(t).length;
  }
  function Oo() {
    const t = new Array();
    return w(t);
  }
  function Mo(t, e) {
    const n = new Function(_e(t, e));
    return w(n);
  }
  function Ro(t) {
    const e = R(t).next;
    return w(e);
  }
  function jo() {
    return fe(function(t) {
      const e = R(t).next();
      return w(e);
    }, arguments);
  }
  function Do(t) {
    return R(t).done;
  }
  function Uo(t) {
    const e = R(t).value;
    return w(e);
  }
  function Po() {
    return w(Symbol.iterator);
  }
  function $o() {
    return fe(function(t, e) {
      const n = Reflect.get(R(t), R(e));
      return w(n);
    }, arguments);
  }
  function Bo() {
    return fe(function(t, e) {
      const n = R(t).call(R(e));
      return w(n);
    }, arguments);
  }
  function Fo() {
    const t = new Object();
    return w(t);
  }
  function Lo(t) {
    return R(t).length;
  }
  function Ho(t, e, n) {
    R(t)[e >>> 0] = A(n);
  }
  function No(t) {
    const e = Array.from(R(t));
    return w(e);
  }
  function zo(t) {
    return Array.isArray(R(t));
  }
  function Wo(t, e) {
    return R(t).push(R(e));
  }
  function Vo(t, e) {
    return R(t).unshift(R(e));
  }
  function Ko(t) {
    let e;
    try {
      e = R(t) instanceof ArrayBuffer;
    } catch {
      e = false;
    }
    return e;
  }
  function Go(t, e) {
    const n = new Error(_e(t, e));
    return w(n);
  }
  function Jo() {
    return fe(function(t, e, n) {
      const r = R(t).call(R(e), R(n));
      return w(r);
    }, arguments);
  }
  function qo(t) {
    let e;
    try {
      e = R(t) instanceof Date;
    } catch {
      e = false;
    }
    return e;
  }
  function Yo(t) {
    return R(t).getTime();
  }
  function Xo(t) {
    const e = new Date(R(t));
    return w(e);
  }
  function Zo(t) {
    let e;
    try {
      e = R(t) instanceof Object;
    } catch {
      e = false;
    }
    return e;
  }
  function Qo(t, e) {
    const n = Object.assign(R(t), R(e));
    return w(n);
  }
  function ea(t, e, n) {
    const r = Object.defineProperty(R(t), R(e), R(n));
    return w(r);
  }
  function ta(t) {
    const e = Object.entries(R(t));
    return w(e);
  }
  function na(t) {
    const e = Object.freeze(R(t));
    return w(e);
  }
  function ra(t) {
    const e = Object.keys(R(t));
    return w(e);
  }
  function sa(t) {
    const e = Object.values(R(t));
    return w(e);
  }
  function ia(t, e) {
    const n = new RangeError(_e(t, e));
    return w(n);
  }
  function oa() {
    return fe(function(t, e, n) {
      const r = Reflect.apply(R(t), R(e), R(n));
      return w(r);
    }, arguments);
  }
  function aa() {
    return fe(function(t, e) {
      return Reflect.deleteProperty(R(t), R(e));
    }, arguments);
  }
  function ca() {
    return fe(function(t) {
      const e = Reflect.ownKeys(R(t));
      return w(e);
    }, arguments);
  }
  function fa() {
    return fe(function(t, e, n) {
      return Reflect.set(R(t), R(e), R(n));
    }, arguments);
  }
  function ua(t) {
    const e = R(t).buffer;
    return w(e);
  }
  function da(t, e) {
    const n = R(t).concat(R(e));
    return w(n);
  }
  function la(t, e, n) {
    const r = R(t).slice(e >>> 0, n >>> 0);
    return w(r);
  }
  function ha(t, e) {
    const n = Symbol.for(_e(t, e));
    return w(n);
  }
  function _a(t) {
    const e = R(t).toString();
    return w(e);
  }
  function ga() {
    return fe(function() {
      const t = self.self;
      return w(t);
    }, arguments);
  }
  function pa() {
    return fe(function() {
      const t = window.window;
      return w(t);
    }, arguments);
  }
  function ya() {
    return fe(function() {
      const t = globalThis.globalThis;
      return w(t);
    }, arguments);
  }
  function ba() {
    return fe(function() {
      const t = global.global;
      return w(t);
    }, arguments);
  }
  function ma(t, e, n) {
    const r = new Uint8Array(R(t), e >>> 0, n >>> 0);
    return w(r);
  }
  function wa(t) {
    const e = new Uint8Array(R(t));
    return w(e);
  }
  function va(t, e, n) {
    R(t).set(R(e), n >>> 0);
  }
  function xa(t) {
    return R(t).length;
  }
  function Sa(t) {
    let e;
    try {
      e = R(t) instanceof Uint8Array;
    } catch {
      e = false;
    }
    return e;
  }
  function ka(t) {
    const e = new Uint8Array(t >>> 0);
    return w(e);
  }
  function Aa(t, e, n) {
    const r = R(t).subarray(e >>> 0, n >>> 0);
    return w(r);
  }
  function Ea(t, e) {
    const n = br(R(e)), r = Te(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = me;
    y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
  }
  function Ia(t, e) {
    throw new Error(_e(t, e));
  }
  function Ca() {
    const t = h.memory;
    return w(t);
  }
  URL = globalThis.URL;
  const O = await md({
    "./automerge_wasm_bg.js": {
      __wbindgen_object_drop_ref: Ji,
      __wbindgen_string_get: qi,
      __wbindgen_error_new: Yi,
      __wbindgen_string_new: Xi,
      __wbindgen_number_new: Zi,
      __wbindgen_object_clone_ref: Qi,
      __wbindgen_number_get: eo,
      __wbindgen_is_undefined: to,
      __wbindgen_boolean_get: no,
      __wbindgen_is_null: ro,
      __wbindgen_is_string: so,
      __wbindgen_is_function: io,
      __wbindgen_is_object: oo,
      __wbindgen_is_array: ao,
      __wbindgen_json_serialize: co,
      __wbg_new_abda76e883ba8a5f: fo,
      __wbg_stack_658279fe44541cf6: uo,
      __wbg_error_f851667af71bcfc6: lo,
      __wbindgen_jsval_loose_eq: ho,
      __wbg_String_91fba7ded13ba54c: _o,
      __wbindgen_bigint_from_i64: go,
      __wbindgen_bigint_from_u64: po,
      __wbg_set_20cbc34131e76824: yo,
      __wbg_getRandomValues_3aa56aa6edec874c: bo,
      __wbg_randomFillSync_5c9c955aa56b6049: mo,
      __wbg_crypto_1d1f22824a6a080c: wo,
      __wbg_process_4a72847cc503995b: vo,
      __wbg_versions_f686565e586dd935: xo,
      __wbg_node_104a2ff8d6ea03a2: So,
      __wbg_require_cca90b1a94a0255b: ko,
      __wbg_msCrypto_eb05e62b530a1508: Ao,
      __wbg_log_5bb5f88f245d7762: Eo,
      __wbg_log_1746d5c75ec89963: Io,
      __wbg_get_bd8e338fbd5f5cc8: Co,
      __wbg_length_cd7af8117672b8b8: To,
      __wbg_new_16b304a2cfa7ff4a: Oo,
      __wbg_newnoargs_e258087cd0daa0ea: Mo,
      __wbg_next_40fc327bfc8770e6: Ro,
      __wbg_next_196c84450b364254: jo,
      __wbg_done_298b57d23c0fc80c: Do,
      __wbg_value_d93c65011f51a456: Uo,
      __wbg_iterator_2cee6dadfd956dfa: Po,
      __wbg_get_e3c254076557e348: $o,
      __wbg_call_27c0f87801dedf93: Bo,
      __wbg_new_72fb9a18b5ae2624: Fo,
      __wbg_length_dee433d4c85c9387: Lo,
      __wbg_set_d4638f722068f043: Ho,
      __wbg_from_89e3fc3ba5e6fb48: No,
      __wbg_isArray_2ab64d95e09ea0ae: zo,
      __wbg_push_a5b05aedc7234f9f: Wo,
      __wbg_unshift_e22df4b34bcf5070: Vo,
      __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: Ko,
      __wbg_new_28c511d9baebfa89: Go,
      __wbg_call_b3ca7c6051f9bec1: Jo,
      __wbg_instanceof_Date_f65cf97fb83fc369: qo,
      __wbg_getTime_2bc4375165f02d15: Yo,
      __wbg_new_cf3ec55744a78578: Xo,
      __wbg_instanceof_Object_71ca3c0a59266746: Zo,
      __wbg_assign_496d2d14fecafbcf: Qo,
      __wbg_defineProperty_cc00e2de8a0f5141: ea,
      __wbg_entries_95cc2c823b285a09: ta,
      __wbg_freeze_cc6bc19f75299986: na,
      __wbg_keys_91e412b4b222659f: ra,
      __wbg_values_9c75e6e2bfbdb70d: sa,
      __wbg_new_dd6a5dd7b538af21: ia,
      __wbg_apply_0a5aa603881e6d79: oa,
      __wbg_deleteProperty_13e721a56f19e842: aa,
      __wbg_ownKeys_658942b7f28d1fe9: ca,
      __wbg_set_1f9b04f170055d33: fa,
      __wbg_buffer_12d079cc21e14bdb: ua,
      __wbg_concat_3de229fe4fe90fea: da,
      __wbg_slice_52fb626ffdc8da8f: la,
      __wbg_for_27c67e2dbdce22f6: ha,
      __wbg_toString_7df3c77999517c20: _a,
      __wbg_self_ce0dbfc45cf2f5be: ga,
      __wbg_window_c6fb939a7f436783: pa,
      __wbg_globalThis_d1e6af4856ba331b: ya,
      __wbg_global_207b558942527489: ba,
      __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: ma,
      __wbg_new_63b92bc8671ed464: wa,
      __wbg_set_a47bac70306a19a7: va,
      __wbg_length_c20a40f15020d68a: xa,
      __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: Sa,
      __wbg_newwithlength_e9b4878cebadb3d3: ka,
      __wbg_subarray_a1f73cd4b5b42fe1: Aa,
      __wbindgen_debug_string: Ea,
      __wbindgen_throw: Ia,
      __wbindgen_memory: Ca
    }
  }, bd), Pd = O.memory, $d = O.__wbg_syncstate_free, Bd = O.syncstate_sharedHeads, Fd = O.syncstate_lastSentHeads, Ld = O.syncstate_set_lastSentHeads, Hd = O.syncstate_set_sentHashes, Nd = O.syncstate_clone, zd = O.__wbg_automerge_free, Wd = O.automerge_new, Vd = O.automerge_clone, Kd = O.automerge_fork, Gd = O.automerge_pendingOps, Jd = O.automerge_commit, qd = O.automerge_merge, Yd = O.automerge_rollback, Xd = O.automerge_keys, Zd = O.automerge_text, Qd = O.automerge_spans, el = O.automerge_splice, tl = O.automerge_updateText, nl = O.automerge_updateSpans, rl = O.automerge_push, sl = O.automerge_pushObject, il = O.automerge_insert, ol = O.automerge_splitBlock, al = O.automerge_joinBlock, cl = O.automerge_updateBlock, fl = O.automerge_getBlock, ul = O.automerge_insertObject, dl = O.automerge_put, ll = O.automerge_putObject, hl = O.automerge_increment, _l = O.automerge_get, gl = O.automerge_getWithType, pl = O.automerge_objInfo, yl = O.automerge_getAll, bl = O.automerge_enableFreeze, ml = O.automerge_registerDatatype, wl = O.automerge_applyPatches, vl = O.automerge_applyAndReturnPatches, xl = O.automerge_diffIncremental, Sl = O.automerge_updateDiffCursor, kl = O.automerge_resetDiffCursor, Al = O.automerge_diff, El = O.automerge_isolate, Il = O.automerge_integrate, Cl = O.automerge_length, Tl = O.automerge_delete, Ol = O.automerge_save, Ml = O.automerge_saveIncremental, Rl = O.automerge_saveSince, jl = O.automerge_saveNoCompress, Dl = O.automerge_saveAndVerify, Ul = O.automerge_loadIncremental, Pl = O.automerge_applyChanges, $l = O.automerge_getChanges, Bl = O.automerge_getChangeByHash, Fl = O.automerge_getDecodedChangeByHash, Ll = O.automerge_getChangesAdded, Hl = O.automerge_getHeads, Nl = O.automerge_getActorId, zl = O.automerge_getLastLocalChange, Wl = O.automerge_dump, Vl = O.automerge_getMissingDeps, Kl = O.automerge_receiveSyncMessage, Gl = O.automerge_generateSyncMessage, Jl = O.automerge_toJS, ql = O.automerge_materialize, Yl = O.automerge_getCursor, Xl = O.automerge_getCursorPosition, Zl = O.automerge_emptyChange, Ql = O.automerge_mark, eh = O.automerge_unmark, th = O.automerge_marks, nh = O.automerge_marksAt, rh = O.automerge_hasOurChanges, sh = O.automerge_topoHistoryTraversal, ih = O.automerge_stats, oh = O.create, ah = O.load, ch = O.encodeChange, fh = O.decodeChange, uh = O.initSyncState, dh = O.importSyncState, lh = O.exportSyncState, hh = O.encodeSyncMessage, _h = O.decodeSyncMessage, gh = O.encodeSyncState, ph = O.decodeSyncState, yh = O.__wbindgen_malloc, bh = O.__wbindgen_realloc, mh = O.__wbindgen_add_to_stack_pointer, wh = O.__wbindgen_free, vh = O.__wbindgen_exn_store, xh = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_automerge_free: zd,
    __wbg_syncstate_free: $d,
    __wbindgen_add_to_stack_pointer: mh,
    __wbindgen_exn_store: vh,
    __wbindgen_free: wh,
    __wbindgen_malloc: yh,
    __wbindgen_realloc: bh,
    automerge_applyAndReturnPatches: vl,
    automerge_applyChanges: Pl,
    automerge_applyPatches: wl,
    automerge_clone: Vd,
    automerge_commit: Jd,
    automerge_delete: Tl,
    automerge_diff: Al,
    automerge_diffIncremental: xl,
    automerge_dump: Wl,
    automerge_emptyChange: Zl,
    automerge_enableFreeze: bl,
    automerge_fork: Kd,
    automerge_generateSyncMessage: Gl,
    automerge_get: _l,
    automerge_getActorId: Nl,
    automerge_getAll: yl,
    automerge_getBlock: fl,
    automerge_getChangeByHash: Bl,
    automerge_getChanges: $l,
    automerge_getChangesAdded: Ll,
    automerge_getCursor: Yl,
    automerge_getCursorPosition: Xl,
    automerge_getDecodedChangeByHash: Fl,
    automerge_getHeads: Hl,
    automerge_getLastLocalChange: zl,
    automerge_getMissingDeps: Vl,
    automerge_getWithType: gl,
    automerge_hasOurChanges: rh,
    automerge_increment: hl,
    automerge_insert: il,
    automerge_insertObject: ul,
    automerge_integrate: Il,
    automerge_isolate: El,
    automerge_joinBlock: al,
    automerge_keys: Xd,
    automerge_length: Cl,
    automerge_loadIncremental: Ul,
    automerge_mark: Ql,
    automerge_marks: th,
    automerge_marksAt: nh,
    automerge_materialize: ql,
    automerge_merge: qd,
    automerge_new: Wd,
    automerge_objInfo: pl,
    automerge_pendingOps: Gd,
    automerge_push: rl,
    automerge_pushObject: sl,
    automerge_put: dl,
    automerge_putObject: ll,
    automerge_receiveSyncMessage: Kl,
    automerge_registerDatatype: ml,
    automerge_resetDiffCursor: kl,
    automerge_rollback: Yd,
    automerge_save: Ol,
    automerge_saveAndVerify: Dl,
    automerge_saveIncremental: Ml,
    automerge_saveNoCompress: jl,
    automerge_saveSince: Rl,
    automerge_spans: Qd,
    automerge_splice: el,
    automerge_splitBlock: ol,
    automerge_stats: ih,
    automerge_text: Zd,
    automerge_toJS: Jl,
    automerge_topoHistoryTraversal: sh,
    automerge_unmark: eh,
    automerge_updateBlock: cl,
    automerge_updateDiffCursor: Sl,
    automerge_updateSpans: nl,
    automerge_updateText: tl,
    create: oh,
    decodeChange: fh,
    decodeSyncMessage: _h,
    decodeSyncState: ph,
    encodeChange: ch,
    encodeSyncMessage: hh,
    encodeSyncState: gh,
    exportSyncState: lh,
    importSyncState: dh,
    initSyncState: uh,
    load: ah,
    memory: Pd,
    syncstate_clone: Nd,
    syncstate_lastSentHeads: Fd,
    syncstate_set_lastSentHeads: Ld,
    syncstate_set_sentHashes: Hd,
    syncstate_sharedHeads: Bd
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  Ki(xh);
  const Sh = Object.freeze(Object.defineProperty({
    __proto__: null,
    Automerge: Ie,
    SyncState: we,
    TextRepresentation: Ud,
    __wbg_String_91fba7ded13ba54c: _o,
    __wbg_apply_0a5aa603881e6d79: oa,
    __wbg_assign_496d2d14fecafbcf: Qo,
    __wbg_buffer_12d079cc21e14bdb: ua,
    __wbg_call_27c0f87801dedf93: Bo,
    __wbg_call_b3ca7c6051f9bec1: Jo,
    __wbg_concat_3de229fe4fe90fea: da,
    __wbg_crypto_1d1f22824a6a080c: wo,
    __wbg_defineProperty_cc00e2de8a0f5141: ea,
    __wbg_deleteProperty_13e721a56f19e842: aa,
    __wbg_done_298b57d23c0fc80c: Do,
    __wbg_entries_95cc2c823b285a09: ta,
    __wbg_error_f851667af71bcfc6: lo,
    __wbg_for_27c67e2dbdce22f6: ha,
    __wbg_freeze_cc6bc19f75299986: na,
    __wbg_from_89e3fc3ba5e6fb48: No,
    __wbg_getRandomValues_3aa56aa6edec874c: bo,
    __wbg_getTime_2bc4375165f02d15: Yo,
    __wbg_get_bd8e338fbd5f5cc8: Co,
    __wbg_get_e3c254076557e348: $o,
    __wbg_globalThis_d1e6af4856ba331b: ya,
    __wbg_global_207b558942527489: ba,
    __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: Ko,
    __wbg_instanceof_Date_f65cf97fb83fc369: qo,
    __wbg_instanceof_Object_71ca3c0a59266746: Zo,
    __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: Sa,
    __wbg_isArray_2ab64d95e09ea0ae: zo,
    __wbg_iterator_2cee6dadfd956dfa: Po,
    __wbg_keys_91e412b4b222659f: ra,
    __wbg_length_c20a40f15020d68a: xa,
    __wbg_length_cd7af8117672b8b8: To,
    __wbg_length_dee433d4c85c9387: Lo,
    __wbg_log_1746d5c75ec89963: Io,
    __wbg_log_5bb5f88f245d7762: Eo,
    __wbg_msCrypto_eb05e62b530a1508: Ao,
    __wbg_new_16b304a2cfa7ff4a: Oo,
    __wbg_new_28c511d9baebfa89: Go,
    __wbg_new_63b92bc8671ed464: wa,
    __wbg_new_72fb9a18b5ae2624: Fo,
    __wbg_new_abda76e883ba8a5f: fo,
    __wbg_new_cf3ec55744a78578: Xo,
    __wbg_new_dd6a5dd7b538af21: ia,
    __wbg_newnoargs_e258087cd0daa0ea: Mo,
    __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: ma,
    __wbg_newwithlength_e9b4878cebadb3d3: ka,
    __wbg_next_196c84450b364254: jo,
    __wbg_next_40fc327bfc8770e6: Ro,
    __wbg_node_104a2ff8d6ea03a2: So,
    __wbg_ownKeys_658942b7f28d1fe9: ca,
    __wbg_process_4a72847cc503995b: vo,
    __wbg_push_a5b05aedc7234f9f: Wo,
    __wbg_randomFillSync_5c9c955aa56b6049: mo,
    __wbg_require_cca90b1a94a0255b: ko,
    __wbg_self_ce0dbfc45cf2f5be: ga,
    __wbg_set_1f9b04f170055d33: fa,
    __wbg_set_20cbc34131e76824: yo,
    __wbg_set_a47bac70306a19a7: va,
    __wbg_set_d4638f722068f043: Ho,
    __wbg_set_wasm: Ki,
    __wbg_slice_52fb626ffdc8da8f: la,
    __wbg_stack_658279fe44541cf6: uo,
    __wbg_subarray_a1f73cd4b5b42fe1: Aa,
    __wbg_toString_7df3c77999517c20: _a,
    __wbg_unshift_e22df4b34bcf5070: Vo,
    __wbg_value_d93c65011f51a456: Uo,
    __wbg_values_9c75e6e2bfbdb70d: sa,
    __wbg_versions_f686565e586dd935: xo,
    __wbg_window_c6fb939a7f436783: pa,
    __wbindgen_bigint_from_i64: go,
    __wbindgen_bigint_from_u64: po,
    __wbindgen_boolean_get: no,
    __wbindgen_debug_string: Ea,
    __wbindgen_error_new: Yi,
    __wbindgen_is_array: ao,
    __wbindgen_is_function: io,
    __wbindgen_is_null: ro,
    __wbindgen_is_object: oo,
    __wbindgen_is_string: so,
    __wbindgen_is_undefined: to,
    __wbindgen_json_serialize: co,
    __wbindgen_jsval_loose_eq: ho,
    __wbindgen_memory: Ca,
    __wbindgen_number_get: eo,
    __wbindgen_number_new: Zi,
    __wbindgen_object_clone_ref: Qi,
    __wbindgen_object_drop_ref: Ji,
    __wbindgen_string_get: qi,
    __wbindgen_string_new: Xi,
    __wbindgen_throw: Ia,
    create: kd,
    decodeChange: Id,
    decodeSyncMessage: Rd,
    decodeSyncState: Dd,
    encodeChange: Ed,
    encodeSyncMessage: Md,
    encodeSyncState: jd,
    exportSyncState: Od,
    importSyncState: Td,
    initSyncState: Cd,
    load: Ad
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  xc(Sh);
  mn();
  class kh {
    constructor(e = "automerge", n = "documents") {
      __publicField(this, "database");
      __publicField(this, "store");
      __publicField(this, "dbPromise");
      this.database = e, this.store = n, this.dbPromise = this.createDatabasePromise();
    }
    createDatabasePromise() {
      return new Promise((e, n) => {
        const r = indexedDB.open(this.database, 1);
        r.onerror = () => {
          n(r.error);
        }, r.onupgradeneeded = (s) => {
          s.target.result.createObjectStore(this.store);
        }, r.onsuccess = (s) => {
          const i = s.target.result;
          e(i);
        };
      });
    }
    async load(e) {
      const r = (await this.dbPromise).transaction(this.store), i = r.objectStore(this.store).get(e);
      return new Promise((o, a) => {
        r.onerror = () => {
          a(i.error);
        }, i.onsuccess = (c) => {
          const f = c.target.result;
          f && typeof f == "object" && "binary" in f ? o(f.binary) : o(void 0);
        };
      });
    }
    async save(e, n) {
      const s = (await this.dbPromise).transaction(this.store, "readwrite");
      return s.objectStore(this.store).put({
        key: e,
        binary: n
      }, e), new Promise((o, a) => {
        s.onerror = () => {
          a(s.error);
        }, s.oncomplete = () => {
          o();
        };
      });
    }
    async remove(e) {
      const r = (await this.dbPromise).transaction(this.store, "readwrite");
      return r.objectStore(this.store).delete(e), new Promise((i, o) => {
        r.onerror = () => {
          o(r.error);
        }, r.oncomplete = () => {
          i();
        };
      });
    }
    async loadRange(e) {
      const n = await this.dbPromise, r = e, s = [
        ...e,
        "\uFFFF"
      ], i = IDBKeyRange.bound(r, s), o = n.transaction(this.store), c = o.objectStore(this.store).openCursor(i), f = [];
      return new Promise((u, d) => {
        o.onerror = () => {
          d(c.error);
        }, c.onsuccess = (_) => {
          const l = _.target.result;
          l ? (f.push({
            data: l.value.binary,
            key: l.key
          }), l.continue()) : u(f);
        };
      });
    }
    async removeRange(e) {
      const n = await this.dbPromise, r = e, s = [
        ...e,
        "\uFFFF"
      ], i = IDBKeyRange.bound(r, s), o = n.transaction(this.store, "readwrite");
      return o.objectStore(this.store).delete(i), new Promise((c, f) => {
        o.onerror = () => {
          f(o.error);
        }, o.oncomplete = () => {
          c();
        };
      });
    }
  }
  var ct = null;
  typeof WebSocket < "u" ? ct = WebSocket : typeof MozWebSocket < "u" ? ct = MozWebSocket : typeof global < "u" ? ct = global.WebSocket || global.MozWebSocket : typeof window < "u" ? ct = window.WebSocket || window.MozWebSocket : typeof self < "u" && (ct = self.WebSocket || self.MozWebSocket);
  const Hn = ct, Ah = (t) => t.type === "peer", Eh = (t) => t.type === "error", Ih = "1";
  function Ae(t, e = "Assertion failed") {
    if (t === false || t === null || t === void 0) {
      const n = new Error(Ch(e));
      throw n.stack = Th(n.stack, "assert.ts"), n;
    }
  }
  const Ch = (t) => t.split(`
`).map((e) => e.trim()).join(`
`), Th = (t = "", e) => t.split(`
`).filter((n) => !n.includes(e)).join(`
`), Oh = (t) => {
    const { buffer: e, byteOffset: n, byteLength: r } = t;
    return e.slice(n, n + r);
  };
  class Mh extends yd {
    constructor() {
      super(...arguments);
      __publicField(this, "socket");
    }
  }
  class Rh extends Mh {
    constructor(e, n = 5e3) {
      super();
      __privateAdd(this, _Rh_instances);
      __publicField(this, "url");
      __publicField(this, "retryInterval");
      __privateAdd(this, _t9, false);
      __privateAdd(this, _e9);
      __privateAdd(this, _n9, Be("automerge-repo:websocket:browser"));
      __publicField(this, "remotePeerId");
      __publicField(this, "onOpen", () => {
        __privateGet(this, _n9).call(this, "open"), clearInterval(__privateGet(this, _e9)), __privateSet(this, _e9, void 0), this.join();
      });
      __publicField(this, "onClose", () => {
        __privateGet(this, _n9).call(this, "close"), this.remotePeerId && this.emit("peer-disconnected", {
          peerId: this.remotePeerId
        }), this.retryInterval > 0 && !__privateGet(this, _e9) && setTimeout(() => (Ae(this.peerId), this.connect(this.peerId, this.peerMetadata)), this.retryInterval);
      });
      __publicField(this, "onMessage", (e) => {
        this.receiveMessage(e.data);
      });
      __publicField(this, "onError", (e) => {
        if ("error" in e && e.error.code !== "ECONNREFUSED") throw e.error;
        __privateGet(this, _n9).call(this, "Connection failed, retrying...");
      });
      this.url = e, this.retryInterval = n, __privateSet(this, _n9, __privateGet(this, _n9).extend(e));
    }
    connect(e, n) {
      !this.socket || !this.peerId ? (__privateGet(this, _n9).call(this, "connecting"), this.peerId = e, this.peerMetadata = n ?? {}) : (__privateGet(this, _n9).call(this, "reconnecting"), Ae(e === this.peerId), this.socket.removeEventListener("open", this.onOpen), this.socket.removeEventListener("close", this.onClose), this.socket.removeEventListener("message", this.onMessage), this.socket.removeEventListener("error", this.onError)), __privateGet(this, _e9) || __privateSet(this, _e9, setInterval(() => {
        this.connect(e, n);
      }, this.retryInterval)), this.socket = new Hn(this.url), this.socket.binaryType = "arraybuffer", this.socket.addEventListener("open", this.onOpen), this.socket.addEventListener("close", this.onClose), this.socket.addEventListener("message", this.onMessage), this.socket.addEventListener("error", this.onError), setTimeout(() => __privateMethod(this, _Rh_instances, r_fn2).call(this), 1e3), this.join();
    }
    join() {
      Ae(this.peerId), Ae(this.socket), this.socket.readyState === Hn.OPEN && this.send(jh(this.peerId, this.peerMetadata));
    }
    disconnect() {
      Ae(this.peerId), Ae(this.socket), this.send({
        type: "leave",
        senderId: this.peerId
      });
    }
    send(e) {
      var _a5;
      if ("data" in e && ((_a5 = e.data) == null ? void 0 : _a5.byteLength) === 0) throw new Error("Tried to send a zero-length message");
      if (Ae(this.peerId), Ae(this.socket), this.socket.readyState !== Hn.OPEN) throw new Error(`Websocket not ready (${this.socket.readyState})`);
      const n = Fi(e);
      this.socket.send(Oh(n));
    }
    peerCandidate(e, n) {
      Ae(this.socket), __privateMethod(this, _Rh_instances, r_fn2).call(this), this.remotePeerId = e, this.emit("peer-candidate", {
        peerId: e,
        peerMetadata: n
      });
    }
    receiveMessage(e) {
      const n = Lu(new Uint8Array(e));
      if (Ae(this.socket), e.byteLength === 0) throw new Error("received a zero-length message");
      if (Ah(n)) {
        const { peerMetadata: r } = n;
        __privateGet(this, _n9).call(this, `peer: ${n.senderId}`), this.peerCandidate(n.senderId, r);
      } else Eh(n) ? __privateGet(this, _n9).call(this, `error: ${n.message}`) : this.emit("message", n);
    }
  }
  _t9 = new WeakMap();
  _e9 = new WeakMap();
  _n9 = new WeakMap();
  _Rh_instances = new WeakSet();
  r_fn2 = function() {
    __privateGet(this, _t9) || (__privateSet(this, _t9, true), this.emit("ready", {
      network: this
    }));
  };
  function jh(t, e) {
    return {
      type: "join",
      senderId: t,
      peerMetadata: e,
      supportedProtocolVersions: [
        Ih
      ]
    };
  }
  Be("WebsocketServer");
  const Yr = new AudioContext({
    latencyHint: "balanced",
    sampleRate: Ma
  });
  await Yr.audioWorklet.addModule(rc);
  const Xr = new AudioWorkletNode(Yr, "looper"), Dh = await Ra(Yr, Xr), Ms = /* @__PURE__ */ new Set(), Dt = {
    shared: {
      layers: []
    },
    playhead: 0,
    masterGain: 1
  };
  await $a(Xr, Dh, Dt, Ph);
  function Ta(t) {
    Xr.port.postMessage(t);
  }
  const Rs = new pd({
    storage: new kh("automerge-demo"),
    network: [
      new Rh("wss://sync.automerge.org")
    ]
  }), Oa = await $h();
  Oa.on("change", (t) => mr(t.doc));
  function mr(t) {
    Dt.shared = t, Ta({
      command: "update layers",
      layers: Dt.shared.layers.map(Ua)
    }), Uh();
  }
  function Uh() {
    for (const t of Dt.shared.layers) {
      if (Ms.has(t.id)) continue;
      Ms.add(t.id);
      const e = new Float32Array(t.samples.buffer);
      Ta({
        command: "set layer samples",
        id: t.id,
        samples: e
      });
    }
  }
  function Ph(t) {
    Oa.change(t);
  }
  async function $h() {
    const t = document.location.hash.substring(1);
    let e;
    if (Ii(t)) console.log("loading existing doc"), e = Rs.find(t), mr(await e.doc());
    else {
      console.log("creating new doc");
      const n = Dt.shared;
      e = Rs.create(n), document.location.hash = e.url, mr(n);
    }
    return e;
  }
})();
