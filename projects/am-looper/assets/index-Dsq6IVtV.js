var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var require_stdin = __commonJS({
  "<stdin>"(exports, module) {
    (async () => {
      var _t2, _e2, _n2, _r2, _s2, _yu_instances, i_get, a_get, o_fn, c_fn, _t3, _e3, _n3, _r3, _s3, _i2, _Iu_instances, a_fn, o_fn2, _t4, _e4, _n4, _r4, _s4, _i3, _a2, _t5, _e5, _n5, _r5, _s5, _Lu_instances, i_fn, a_fn2, o_fn3, c_fn2, _t6, _e6, _n6, _r6, _s6, _i4, _a3, _o2, _c2, _Hu_instances, g_fn, p_fn, y_fn, u_fn, b_fn, m_fn, d_fn, l_fn, h_fn, f_fn, __fn, _t7, _e7, _n7, _Nu_instances, r_fn, s_fn, i_fn2, _t8, _e8, _n8, _r7, _s7, _zu_instances, i_fn3, _a4, o_fn4, c_fn3, _t9, _e9, _n9, _ih_instances, r_fn2;
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
      const Cn = 128, ca = 48e3;
      async function fa(t, e) {
        const n = await ua(), r = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: n,
            autoGainControl: false,
            echoCancellation: false
          }
        });
        return t.createMediaStreamSource(r).connect(e).connect(t.destination), t.resume(), e.connect(t.destination), n;
      }
      async function ua() {
        const t = await navigator.mediaDevices.enumerateDevices();
        return new Promise((e) => {
          const n = document.getElementById("buttons");
          n.appendChild(da(document.createTextNode("Select input device:")));
          for (const r of t) {
            if (r.kind !== "audioinput") continue;
            const s = document.createElement("button");
            s.textContent = r.label, s.onclick = (i) => {
              n.textContent = "", e(r.deviceId);
            }, n.appendChild(s);
          }
        });
      }
      function da(...t) {
        const e = document.createElement("div");
        for (const n of t) e.appendChild(n);
        return e;
      }
      function la(t) {
        if (t.length === 0) return null;
        let e = t[0].lengthInFrames;
        for (let n of t) e = Math.max(e, n.lengthInFrames);
        return e;
      }
      function ha(t) {
        const e = {
          ...t
        };
        return delete e.samples, e;
      }
      function _a(t, e) {
        return Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2);
      }
      function gs() {
        let t = localStorage.getItem("ui-state");
        return t !== null ? JSON.parse(t) : {
          lastUsedDeviceId: null,
          deviceSpecificLatencyOffset: {}
        };
      }
      function ga(t) {
        localStorage.setItem("ui-state", JSON.stringify(t));
      }
      function pa(t) {
        const e = gs();
        t(e), ga(e);
      }
      let Bt, On, Ke, tn;
      function ya(t, e, n, r) {
        Bt = t, window.looper = Bt, On = e, Ke = n, tn = r, Bt.port.onmessage = (o) => ba(o.data);
        const s = gs().deviceSpecificLatencyOffset[On] ?? 20;
        Kt({
          command: "set latency offset",
          value: s
        }), window.addEventListener("keydown", wa), window.addEventListener("keyup", va), window.addEventListener("pointerdown", (o) => Sa(o.x / devicePixelRatio, o.y / devicePixelRatio, o)), window.addEventListener("pointermove", (o) => ka(o.x / devicePixelRatio, o.y / devicePixelRatio));
        function i() {
          Aa(), requestAnimationFrame(i);
        }
        i(), ws();
      }
      function Kt(t) {
        Bt.port.postMessage(t);
      }
      function ba(t) {
        switch (t.event) {
          case "playhead moved":
            Ke.playhead = t.value;
            break;
          case "finished recording":
            tn((e) => {
              e.layers.push({
                ...t.layer,
                samples: new Uint8Array(t.samples)
              });
            }), Ke.samplesAsFloats.set(t.layer.id, new Float32Array(t.samples));
            break;
          case "changed latency offset":
            Rn(`latency offset = ${t.value}`), pa((e) => {
              e.deviceSpecificLatencyOffset[On] = t.value;
            });
            break;
          default:
            console.info("worklet:", t);
        }
      }
      function ma(t, e) {
        tn((n) => {
          const r = n.layers.find((s) => s.id === t);
          r && e(r);
        });
      }
      const Oe = document.getElementById("canvas"), G = Oe.getContext("2d");
      ps();
      function ps() {
        if (Oe.width = innerWidth, Oe.height = innerHeight, devicePixelRatio !== 1) {
          const t = Oe.width, e = Oe.height;
          Oe.width = t * devicePixelRatio, Oe.height = e * devicePixelRatio, Oe.style.width = t + "px", Oe.style.height = e + "px", G.scale(devicePixelRatio, devicePixelRatio);
        }
      }
      window.addEventListener("resize", ps);
      let Tn = false;
      function wa(t) {
        switch (t.key) {
          case " ":
            Tn || (Tn = true, xa());
            break;
          case "Shift":
            ys("down");
            break;
          case "ArrowUp":
            jr(1);
            break;
          case "ArrowDown":
            jr(-1);
            break;
        }
      }
      function va(t) {
        switch (t.key) {
          case " ":
            Tn = false;
            break;
          case "Shift":
            ys("up");
            break;
        }
      }
      let Ft = false;
      function xa() {
        Ft ? (Kt({
          command: "stop recording"
        }), Ft = false, Rn("stopped recording", "#888")) : (Kt({
          command: "start recording"
        }), Ft = true, Rn("recording...", "red")), ws();
      }
      let _t = null;
      function ys(t) {
        if (t === "up") {
          _t = null;
          return;
        }
        const e = bs();
        if (e === null) {
          _t = null;
          return;
        }
        const n = Ke.shared.layers.find((r) => r.id === e);
        _t = {
          id: e,
          origGain: n == null ? void 0 : n.gain,
          origPos: {
            ...gt
          }
        };
      }
      function jr(t) {
        Kt({
          command: "change latency offset",
          by: t
        });
      }
      const gt = {
        x: 0,
        y: 0
      };
      function Sa(t, e, n) {
        const r = bs();
        r && tn((s) => {
          const i = s.layers.findIndex((o) => o.id === r);
          if (!(i < 0)) if (n.metaKey) i >= 0 && s.layers.splice(i, 1);
          else {
            const o = s.layers[i];
            o.muted = !o.muted;
          }
        });
      }
      function ka(t, e) {
        if (gt.x = t, gt.y = e, _t === null) return;
        const { id: n, origPos: r, origGain: s } = _t;
        ma(n, (i) => {
          const o = -(gt.y - r.y);
          i.gain = Math.max(0, Math.min(s + o / rr, 1));
        });
      }
      function bs() {
        let t = null, e = 1 / 0;
        for (const n of Ke.shared.layers) {
          const r = _a(gt, ms(n).gainNubbinCenterPosition);
          r <= rr / devicePixelRatio && r < e && (t = n.id, e = r);
        }
        return t;
      }
      const Dr = /* @__PURE__ */ new Map();
      function ms(t) {
        let e = Dr.get(t.id);
        if (e) return e;
        const n = new Float32Array(t.samples.buffer), r = [];
        let s = 0, i = 0;
        for (; i < n.length; ) {
          let o = 0;
          for (let a = 0; a < Cn; a++) for (let c = 0; c < t.numChannels; c++) {
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
        }, Dr.set(t.id, e), e;
      }
      function Aa() {
        G.clearRect(0, 0, innerWidth, innerHeight), Ea(), Oa(), Ia();
      }
      const lt = 32, rr = lt / 2, Ot = 100;
      function Ea() {
        const t = Ke.shared.layers, e = la(t);
        if (e === null) return;
        const n = (innerWidth - 2 * Ot) / e;
        let r = 2 * lt;
        const s = Ot, i = s + e * n;
        for (let a = 0; a < t.length; a++) {
          const c = t[a], f = ms(c), u = c.muted ? 0.25 : 1;
          let d = r;
          for (let b = 0; b < c.numFramesRecorded / e; b++) {
            let v = r, S = s + (c.frameOffset + e) % e * n;
            for (let j = 0; j < f.maxAmplitudesInChunks.length; j++) {
              S >= i && (S = s, v += lt), G.lineWidth = Cn * n, G.strokeStyle = `rgba(100, 149, 237, ${u})`, G.beginPath();
              const D = f.maxAmplitudesInChunks[j] / f.maxAmplitudeInLayer * lt / 2;
              G.moveTo(S, v - D / 2), G.lineTo(S, v + D / 2), G.stroke(), S += Cn * n;
            }
            d = v;
          }
          const _ = Ot / 2, l = (r + d) / 2;
          f.gainNubbinCenterPosition = {
            x: _ / devicePixelRatio,
            y: l / devicePixelRatio
          }, f.topY = r / devicePixelRatio, f.bottomY = d / devicePixelRatio, G.fillStyle = `rgba(100, 149, 237, ${u / 4})`, G.beginPath(), G.arc(_, l, c.gain * rr, 0, 2 * Math.PI), G.fill(), r = d + lt * 1.15;
        }
        const o = Ot + Ke.playhead * n;
        G.strokeStyle = "#999", G.lineWidth = 4, G.beginPath(), G.moveTo(o, 0), G.lineTo(o, r), G.stroke();
      }
      function ws() {
        Ca(), Pr(Ft ? {
          color: "#888",
          text: "\u25A0"
        } : {
          color: "red",
          text: "\u25CF"
        }, " space");
      }
      let Jt = "", vs = "cornflowerblue", Ur = 0;
      function Rn(t, e = "cornflowerblue", n = 3e3) {
        Jt = t, vs = e, Ur = Date.now() + n, setTimeout(() => {
          Date.now() >= Ur && (Jt = "");
        }, n);
      }
      function Ia() {
        G.font = "20px Monaco", G.fillStyle = vs;
        const t = G.measureText(Jt).width;
        G.fillText(Jt, G.canvas.width / devicePixelRatio - 40 - t, (G.canvas.height - 40) / devicePixelRatio);
      }
      const sr = [];
      function Pr(...t) {
        sr.push(t);
      }
      function Ca() {
        sr.length = 0;
      }
      function Oa() {
        G.font = "20px Monaco";
        let t = (G.canvas.height - 40) / devicePixelRatio;
        const e = 40;
        for (const n of sr) {
          let r = e;
          for (const s of n) {
            const i = typeof s == "string" ? s : s.text;
            G.fillStyle = typeof s == "string" ? "black" : s.color, G.fillText(i, r, t), r += G.measureText(i).width;
          }
          t -= 25;
        }
      }
      const Ta = "/assets/worklet-gCqhFc87.ts", $e = Symbol.for("_am_meta"), rt = Symbol.for("_am_trace"), st = Symbol.for("_am_objectId"), nn = Symbol.for("_am_isProxy"), xs = Symbol.for("_am_clearCache"), Ra = Symbol.for("_am_uint"), Ma = Symbol.for("_am_int"), ja = Symbol.for("_am_f64"), Ss = Symbol.for("_am_counter"), Da = Symbol.for("_am_text");
      class Me {
        constructor(e) {
          if (typeof e == "string") this.elems = [
            ...e
          ];
          else if (Array.isArray(e)) this.elems = e;
          else if (e === void 0) this.elems = [];
          else throw new TypeError(`Unsupported initial value for Text: ${e}`);
          Reflect.defineProperty(this, Da, {
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
          if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
          this.elems[e] = n;
        }
        insertAt(e, ...n) {
          if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
          n.every((r) => typeof r == "string") ? this.elems.splice(e, 0, ...n.join("")) : this.elems.splice(e, 0, ...n);
        }
        deleteAt(e, n = 1) {
          if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
          this.elems.splice(e, n);
        }
        map(e) {
          this.elems.map(e);
        }
        lastIndexOf(e, n) {
          this.elems.lastIndexOf(e, n);
        }
        concat(e) {
          return new Me(this.elems.concat(e.elems));
        }
        every(e) {
          return this.elems.every(e);
        }
        filter(e) {
          return new Me(this.elems.filter(e));
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
          return new Me(this.elems.slice(e, n));
        }
        some(e) {
          return this.elems.some(e);
        }
        toLocaleString() {
          this.toString();
        }
      }
      class Mn {
        constructor(e) {
          this.value = e || 0, Reflect.defineProperty(this, Ss, {
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
      class Ua extends Mn {
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
      function Pa(t, e, n, r, s) {
        return new Ua(t, e, n, r, s);
      }
      class jn {
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
      function Ae(t) {
        if (typeof t == "string" && /^[0-9]+$/.test(t) && (t = parseInt(t, 10)), typeof t != "number") return t;
        if (t < 0 || isNaN(t) || t === 1 / 0 || t === -1 / 0) throw new RangeError("A list index must be positive, but you passed " + t);
        return t;
      }
      function ge(t, e) {
        const { context: n, objectId: r, path: s, textV2: i } = t, o = n.getWithType(r, e);
        if (o === null) return;
        const a = o[0], c = o[1];
        switch (a) {
          case void 0:
            return;
          case "map":
            return At(n, c, i, [
              ...s,
              e
            ]);
          case "list":
            return sn(n, c, i, [
              ...s,
              e
            ]);
          case "text":
            return i ? n.text(c) : bt(n, c, [
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
            return Pa(c, n, s, r, e);
          default:
            throw RangeError(`datatype ${a} unimplemented`);
        }
      }
      function qt(t, e, n, r) {
        const s = typeof t;
        switch (s) {
          case "object":
            if (t == null) return [
              null,
              "null"
            ];
            if (t[Ra]) return [
              t.value,
              "uint"
            ];
            if (t[Ma]) return [
              t.value,
              "int"
            ];
            if (t[ja]) return [
              t.value,
              "f64"
            ];
            if (t[Ss]) return [
              t.value,
              "counter"
            ];
            if (t instanceof Date) return [
              t.getTime(),
              "timestamp"
            ];
            if (t instanceof jn) return [
              t.toString(),
              "str"
            ];
            if (t instanceof Me) return [
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
            throw rn(t, r) ? new RangeError("Cannot create a reference to an existing document object") : new RangeError(`Cannot assign unknown object: ${t}`);
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
              `Cannot assign undefined value at ${$r(n)}, `,
              "because `undefined` is not a valid JSON data type. ",
              "You might consider setting the property's value to `null`, ",
              "or using `delete` to remove it altogether."
            ].join(""));
          default:
            throw new RangeError([
              `Cannot assign ${s} value at ${$r(n)}. `,
              "All JSON primitive datatypes (object, array, string, number, boolean, null) ",
              `are supported in an Automerge document; ${s} values are not. `
            ].join(""));
        }
      }
      function rn(t, e) {
        var n, r;
        return t instanceof Date ? false : !!(t && ((r = (n = t[$e]) === null || n === void 0 ? void 0 : n.handle) === null || r === void 0 ? void 0 : r.__wbg_ptr) === e.__wbg_ptr);
      }
      const $a = {
        get(t, e) {
          const { context: n, objectId: r, cache: s } = t;
          return e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === st ? r : e === nn ? true : e === rt ? t.trace : e === $e ? {
            handle: n,
            textV2: t.textV2
          } : (s[e] || (s[e] = ge(t, e)), s[e]);
        },
        set(t, e, n) {
          const { context: r, objectId: s, path: i, textV2: o } = t;
          if (t.cache = {}, rn(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
          if (e === rt) return t.trace = n, true;
          if (e === xs) return true;
          const [a, c] = qt(n, o, [
            ...i,
            e
          ], r);
          switch (c) {
            case "list": {
              const f = r.putObject(s, e, []), u = sn(r, f, o, [
                ...i,
                e
              ]);
              for (let d = 0; d < a.length; d++) u[d] = a[d];
              break;
            }
            case "text": {
              if (o) Gt(a), r.putObject(s, e, a);
              else {
                or(a);
                const f = r.putObject(s, e, "");
                bt(r, f, [
                  ...i,
                  e
                ]).splice(0, 0, ...a);
              }
              break;
            }
            case "map": {
              const f = r.putObject(s, e, {}), u = At(r, f, o, [
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
      }, ks = {
        get(t, e) {
          const { context: n, objectId: r } = t;
          return e = Ae(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === st ? r : e === nn ? true : e === rt ? t.trace : e === $e ? {
            handle: n
          } : e === "length" ? n.length(r) : typeof e == "number" ? ge(t, e) : ir(t)[e];
        },
        set(t, e, n) {
          const { context: r, objectId: s, path: i, textV2: o } = t;
          if (e = Ae(e), rn(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
          if (e === xs) return true;
          if (e === rt) return t.trace = n, true;
          if (typeof e == "string") throw new RangeError("list index must be a number");
          const [a, c] = qt(n, o, [
            ...i,
            e
          ], r);
          switch (c) {
            case "list": {
              let f;
              e >= r.length(s) ? f = r.insertObject(s, e, []) : f = r.putObject(s, e, []), sn(r, f, o, [
                ...i,
                e
              ]).splice(0, 0, ...a);
              break;
            }
            case "text": {
              if (o) Gt(a), e >= r.length(s) ? r.insertObject(s, e, a) : r.putObject(s, e, a);
              else {
                let f;
                or(a), e >= r.length(s) ? f = r.insertObject(s, e, "") : f = r.putObject(s, e, ""), bt(r, f, [
                  ...i,
                  e
                ]).splice(0, 0, ...a);
              }
              break;
            }
            case "map": {
              let f;
              e >= r.length(s) ? f = r.insertObject(s, e, {}) : f = r.putObject(s, e, {});
              const u = At(r, f, o, [
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
          e = Ae(e);
          const s = n.get(r, e);
          if (s != null && s[0] == "counter") throw new TypeError("Unsupported operation: deleting a counter from a list");
          return n.delete(r, e), true;
        },
        has(t, e) {
          const { context: n, objectId: r } = t;
          return e = Ae(e), typeof e == "number" ? e < n.length(r) : e === "length";
        },
        getOwnPropertyDescriptor(t, e) {
          const { context: n, objectId: r } = t;
          return e === "length" ? {
            writable: true,
            value: n.length(r)
          } : e === st ? {
            configurable: false,
            enumerable: false,
            value: r
          } : (e = Ae(e), {
            configurable: true,
            enumerable: true,
            value: ge(t, e)
          });
        },
        getPrototypeOf(t) {
          return Object.getPrototypeOf(t);
        },
        ownKeys() {
          const t = [];
          return t.push("length"), t;
        }
      }, Ba = Object.assign({}, ks, {
        get(t, e) {
          const { context: n, objectId: r } = t;
          return e = Ae(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === st ? r : e === nn ? true : e === rt ? t.trace : e === $e ? {
            handle: n
          } : e === "length" ? n.length(r) : typeof e == "number" ? ge(t, e) : La(t)[e] || ir(t)[e];
        },
        getPrototypeOf() {
          return Object.getPrototypeOf(new Me());
        }
      });
      function At(t, e, n, r) {
        const s = {
          context: t,
          objectId: e,
          path: r || [],
          cache: {},
          textV2: n
        }, i = {};
        return Object.assign(i, s), new Proxy(i, $a);
      }
      function sn(t, e, n, r) {
        const s = {
          context: t,
          objectId: e,
          path: r || [],
          cache: {},
          textV2: n
        }, i = [];
        return Object.assign(i, s), new Proxy(i, ks);
      }
      function bt(t, e, n) {
        const r = {
          context: t,
          objectId: e,
          path: n || [],
          cache: {},
          textV2: false
        }, s = {};
        return Object.assign(s, r), new Proxy(s, Ba);
      }
      function Fa(t, e) {
        return At(t, "_root", e, []);
      }
      function ir(t) {
        const { context: e, objectId: n, path: r, textV2: s } = t;
        return {
          deleteAt(o, a) {
            return typeof a == "number" ? e.splice(n, o, a) : e.delete(n, o), this;
          },
          fill(o, a, c) {
            const [f, u] = qt(o, s, [
              ...r,
              a
            ], e), d = e.length(n);
            a = Ae(a || 0), c = Ae(c || d);
            for (let _ = a; _ < Math.min(c, d); _++) if (u === "list" || u === "map") e.putObject(n, _, f);
            else if (u === "text") if (s) Gt(f), e.putObject(n, _, f);
            else {
              or(f);
              const l = e.putObject(n, _, ""), b = bt(e, l, [
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
              if (u && (u[1] === o[st] || u[1] === o)) return f;
            }
            return -1;
          },
          insertAt(o, ...a) {
            return this.splice(o, 0, ...a), this;
          },
          pop() {
            const o = e.length(n);
            if (o == 0) return;
            const a = ge(t, o - 1);
            return e.delete(n, o - 1), a;
          },
          push(...o) {
            const a = e.length(n);
            return this.splice(a, 0, ...o), e.length(n);
          },
          shift() {
            if (e.length(n) == 0) return;
            const o = ge(t, 0);
            return e.delete(n, 0), o;
          },
          splice(o, a, ...c) {
            o = Ae(o), typeof a != "number" && (a = e.length(n) - o), a = Ae(a);
            for (const d of c) if (rn(d, e)) throw new RangeError("Cannot create a reference to an existing document object");
            const f = [];
            for (let d = 0; d < a; d++) {
              const _ = ge(t, o);
              _ !== void 0 && f.push(_), e.delete(n, o);
            }
            const u = c.map((d, _) => {
              try {
                return qt(d, s, [
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
                  sn(e, l, s, [
                    ...r,
                    o
                  ]).splice(0, 0, ...d);
                  break;
                }
                case "text": {
                  if (s) Gt(d), e.insertObject(n, o, d);
                  else {
                    const l = e.insertObject(n, o, "");
                    bt(e, l, [
                      ...r,
                      o
                    ]).splice(0, 0, ...d);
                  }
                  break;
                }
                case "map": {
                  const l = e.insertObject(n, o, {}), b = At(e, l, s, [
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
                const c = ge(t, o);
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
                const c = ge(t, o++);
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
              a = ge(t, o.length), a !== void 0 && o.push(a);
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
            let o = 0, a = ge(t, o);
            for (; a !== void 0; ) yield a, o += 1, a = ge(t, o);
          }
        };
      }
      function La(t) {
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
            i.every((o) => typeof o == "string") ? e.splice(n, s, 0, i.join("")) : ir(t).insertAt(s, ...i);
          }
        };
      }
      function or(t) {
        if (!(t instanceof Me)) throw new Error("value was not a Text instance");
      }
      function Gt(t) {
        if (typeof t != "string") throw new Error("value was not a string");
      }
      function $r(t) {
        const e = t.map((n) => {
          if (typeof n == "number") return n.toString();
          if (typeof n == "string") return n.replace(/~/g, "~0").replace(/\//g, "~1");
        });
        return t.length === 0 ? "" : "/" + e.join("/");
      }
      let Tt;
      const Ha = new Uint8Array(16);
      function Na() {
        if (!Tt && (Tt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Tt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return Tt(Ha);
      }
      const za = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      function on(t) {
        return typeof t == "string" && za.test(t);
      }
      const ie = [];
      for (let t = 0; t < 256; ++t) ie.push((t + 256).toString(16).slice(1));
      function As(t, e = 0) {
        return ie[t[e + 0]] + ie[t[e + 1]] + ie[t[e + 2]] + ie[t[e + 3]] + "-" + ie[t[e + 4]] + ie[t[e + 5]] + "-" + ie[t[e + 6]] + ie[t[e + 7]] + "-" + ie[t[e + 8]] + ie[t[e + 9]] + "-" + ie[t[e + 10]] + ie[t[e + 11]] + ie[t[e + 12]] + ie[t[e + 13]] + ie[t[e + 14]] + ie[t[e + 15]];
      }
      function Wa(t, e = 0) {
        const n = As(t, e);
        if (!on(n)) throw TypeError("Stringified UUID is invalid");
        return n;
      }
      function Va(t) {
        if (!on(t)) throw TypeError("Invalid UUID");
        let e;
        const n = new Uint8Array(16);
        return n[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24, n[1] = e >>> 16 & 255, n[2] = e >>> 8 & 255, n[3] = e & 255, n[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8, n[5] = e & 255, n[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8, n[7] = e & 255, n[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8, n[9] = e & 255, n[10] = (e = parseInt(t.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = e / 4294967296 & 255, n[12] = e >>> 24 & 255, n[13] = e >>> 16 & 255, n[14] = e >>> 8 & 255, n[15] = e & 255, n;
      }
      const Ka = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Br = {
        randomUUID: Ka
      };
      function Es(t, e, n) {
        if (Br.randomUUID && !e && !t) return Br.randomUUID();
        t = t || {};
        const r = t.random || (t.rng || Na)();
        if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
          n = n || 0;
          for (let s = 0; s < 16; ++s) e[n + s] = r[s];
          return e;
        }
        return As(r);
      }
      let Is;
      const Cs = new Array(128).fill(void 0);
      Cs.push(void 0, null, true, false);
      Cs.length;
      const hn = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
        encode: () => {
          throw Error("TextEncoder not available");
        }
      };
      hn.encodeInto;
      const Ja = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
        ignoreBOM: true,
        fatal: true
      }) : {
        decode: () => {
          throw Error("TextDecoder not available");
        }
      };
      typeof TextDecoder < "u" && Ja.decode();
      typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => Is.__wbg_automerge_free(t >>> 0));
      typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => Is.__wbg_syncstate_free(t >>> 0));
      let qa = [];
      function Ga(t) {
        for (const e in t) de[e] = t[e];
        for (const e of qa) e();
      }
      const de = {
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
      function ae(t, e = true) {
        if (typeof t != "object") throw new RangeError("must be the document root");
        const n = Reflect.get(t, $e);
        if (n === void 0 || n == null || e && Ya(t) !== "_root") throw new RangeError("must be the document root");
        return n;
      }
      function Os(t) {
        return Reflect.get(t, rt);
      }
      function Ya(t) {
        return typeof t != "object" || t === null ? null : Reflect.get(t, st);
      }
      function an(t) {
        return !!Reflect.get(t, nn);
      }
      var Xa = function(t, e) {
        var n = {};
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
        if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, r = Object.getOwnPropertySymbols(t); s < r.length; s++) e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (n[r[s]] = t[r[s]]);
        return n;
      };
      function ar(t) {
        return typeof t == "object" ? t : {
          actor: t
        };
      }
      function cr(t) {
        const e = ar(t), n = !!e.freeze, r = e.patchCallback, s = !e.enableTextV2, i = e.actor, o = de.create({
          actor: i,
          text_v1: s
        });
        o.enableFreeze(!!e.freeze);
        const a = e.enableTextV2 || false;
        return Ds(o, a), o.materialize("/", void 0, {
          handle: o,
          heads: void 0,
          freeze: n,
          patchCallback: r,
          textV2: a
        });
      }
      function Za(t, e) {
        const n = ae(t), r = n.heads, s = ar(e), i = n.handle.fork(s.actor, r);
        i.updateDiffCursor();
        const o = Xa(n, [
          "heads"
        ]);
        return o.patchCallback = s.patchCallback, i.applyPatches(t, Object.assign(Object.assign({}, o), {
          handle: i
        }));
      }
      function Qa(t, e) {
        return mt(cr(e), "from", {}, (n) => Object.assign(n, t)).newDoc;
      }
      function ec(t, e, n) {
        if (typeof e == "function") return mt(t, "change", {}, e).newDoc;
        if (typeof n == "function") return typeof e == "string" && (e = {
          message: e
        }), mt(t, "change", e, n).newDoc;
        throw RangeError("Invalid args for change");
      }
      function tc(t, e, n, r) {
        if (typeof n == "function") return mt(t, "changeAt", {}, n, e);
        if (typeof r == "function") return typeof n == "string" && (n = {
          message: n
        }), mt(t, "changeAt", n, r, e);
        throw RangeError("Invalid args for changeAt");
      }
      function Et(t, e, n, r) {
        if (n == null) return t;
        const s = ae(t), i = Object.assign(Object.assign({}, s), {
          heads: void 0
        }), { value: o, patches: a } = s.handle.applyAndReturnPatches(t, i);
        if (a.length > 0) {
          r == null ? void 0 : r(a, {
            before: t,
            after: o,
            source: e
          });
          const c = ae(o);
          c.mostRecentPatch = {
            before: ae(t).heads,
            after: c.handle.getHeads(),
            patches: a
          };
        }
        return s.heads = n, o;
      }
      function mt(t, e, n, r, s) {
        if (typeof r != "function") throw new RangeError("invalid change function");
        const i = ae(t);
        if (t === void 0 || i === void 0) throw new RangeError("must be the document root");
        if (i.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
        if (an(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
        let o = i.handle.getHeads();
        s && oc(s, o) && (s = void 0), s && (i.handle.isolate(s), o = s), "time" in n || (n.time = Math.floor(Date.now() / 1e3));
        try {
          i.heads = o;
          const a = Fa(i.handle, i.textV2);
          if (r(a), i.handle.pendingOps() === 0) return i.heads = void 0, s && i.handle.integrate(), {
            newDoc: t,
            newHeads: null
          };
          {
            const c = i.handle.commit(n.message, n.time);
            return i.handle.integrate(), {
              newDoc: Et(t, e, o, n.patchCallback || i.patchCallback),
              newHeads: c != null ? [
                c
              ] : null
            };
          }
        } catch (a) {
          throw i.heads = void 0, i.handle.rollback(), a;
        }
      }
      function nc(t, e) {
        e === void 0 && (e = {}), typeof e == "string" && (e = {
          message: e
        }), "time" in e || (e.time = Math.floor(Date.now() / 1e3));
        const n = ae(t);
        if (n.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
        if (an(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
        const r = n.handle.getHeads();
        return n.handle.emptyChange(e.message, e.time), Et(t, "emptyChange", r);
      }
      function rc(t, e) {
        const n = ar(e), r = n.actor, s = n.patchCallback, i = !n.enableTextV2, o = n.unchecked || false, a = n.allowMissingChanges || false, c = n.convertRawStringsToText || false, f = de.load(t, {
          text_v1: i,
          actor: r,
          unchecked: o,
          allowMissingDeps: a,
          convertRawStringsToText: c
        });
        f.enableFreeze(!!n.freeze);
        const u = n.enableTextV2 || false;
        return Ds(f, u), f.materialize("/", void 0, {
          handle: f,
          heads: void 0,
          patchCallback: s,
          textV2: u
        });
      }
      function Ts(t, e, n) {
        n || (n = {});
        const r = ae(t);
        if (r.heads) throw new RangeError("Attempting to change an out of date document - set at: " + Os(t));
        if (an(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
        const s = r.handle.getHeads();
        return r.handle.loadIncremental(e), Et(t, "loadIncremental", s, n.patchCallback || r.patchCallback);
      }
      function Rs(t) {
        return ae(t).handle.save();
      }
      function sc(t, e) {
        const n = ae(t);
        if (n.heads) throw new RangeError("Attempting to change an out of date document - set at: " + Os(t));
        const r = n.handle.getHeads(), s = ae(e), i = n.handle.getChangesAdded(s.handle);
        return n.handle.applyChanges(i), Et(t, "merge", r, n.patchCallback);
      }
      function ic(t, e, n) {
        Fr(e, "before"), Fr(n, "after");
        const r = ae(t);
        return r.mostRecentPatch && Dn(r.mostRecentPatch.before, e) && Dn(r.mostRecentPatch.after, n) ? r.mostRecentPatch.patches : r.handle.diff(e, n);
      }
      function oc(t, e) {
        if (t.length !== e.length) return false;
        for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return false;
        return true;
      }
      function Fr(t, e) {
        if (!Array.isArray(t)) throw new Error(`${e} must be an array`);
      }
      function Dn(t, e) {
        if (!Lr(t) || !Lr(e)) return t === e;
        const n = Object.keys(t).sort(), r = Object.keys(e).sort();
        if (n.length !== r.length) return false;
        for (let s = 0; s < n.length; s++) if (n[s] !== r[s] || !Dn(t[n[s]], e[r[s]])) return false;
        return true;
      }
      function Ms(t) {
        const e = de.importSyncState(t), n = de.encodeSyncState(e);
        return e.free(), n;
      }
      function js(t) {
        const e = de.decodeSyncState(t), n = de.exportSyncState(e);
        return e.free(), n;
      }
      function ac(t, e) {
        const n = ae(t), r = de.importSyncState(e), s = n.handle.generateSyncMessage(r);
        return [
          de.exportSyncState(r),
          s
        ];
      }
      function cc(t, e, n, r) {
        const s = de.importSyncState(e);
        r || (r = {});
        const i = ae(t);
        if (i.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
        if (an(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
        const o = i.handle.getHeads();
        i.handle.receiveSyncMessage(s, n);
        const a = de.exportSyncState(s);
        return [
          Et(t, "receiveSyncMessage", o, r.patchCallback || i.patchCallback),
          a,
          null
        ];
      }
      function fc() {
        return de.exportSyncState(de.initSyncState());
      }
      function uc(t) {
        return de.decodeSyncMessage(t);
      }
      function we(t) {
        const e = ae(t);
        return e.heads || e.handle.getHeads();
      }
      function Lr(t) {
        return typeof t == "object" && t !== null;
      }
      function dc(t, e) {
        return ae(t).handle.saveSince(e);
      }
      function Ds(t, e) {
        t.registerDatatype("counter", (n) => new Mn(n), (n) => {
          if (n instanceof Mn) return n.value;
        }), e ? t.registerDatatype("str", (n) => new jn(n), (n) => {
          if (n instanceof jn) return n.val;
        }) : t.registerDatatype("text", (n) => new Me(n), (n) => {
          if (n instanceof Me) return n.join("");
        });
      }
      function cn(t) {
        const e = fn(t);
        return e.enableTextV2 = true, cr(e);
      }
      function Hr(t, e) {
        const n = fn(e);
        return n.enableTextV2 = true, Za(t, n);
      }
      function lc(t, e) {
        const n = fn(e);
        return n.enableTextV2 = true, Qa(t, n);
      }
      function hc(t, e) {
        const n = fn(e);
        return n.enableTextV2 = true, n.patchCallback ? Ts(cr(n), t) : rc(t, n);
      }
      function fn(t) {
        return {
          actor: t
        };
      }
      var _c = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
      function fr(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
      }
      var Un = {
        exports: {}
      }, _n, Nr;
      function gc() {
        if (Nr) return _n;
        Nr = 1;
        var t = 1e3, e = t * 60, n = e * 60, r = n * 24, s = r * 7, i = r * 365.25;
        _n = function(u, d) {
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
        return _n;
      }
      function pc(t) {
        n.debug = n, n.default = n, n.coerce = c, n.disable = o, n.enable = s, n.enabled = a, n.humanize = gc(), n.destroy = f, Object.keys(t).forEach((u) => {
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
            S[0] = S[0].replace(/%([a-zA-Z%])/g, ($, q) => {
              if ($ === "%%") return "%";
              L++;
              const W = n.formatters[q];
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
      var yc = pc;
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
        t.exports = yc(e);
        const { formatters: c } = t.exports;
        c.j = function(f) {
          try {
            return JSON.stringify(f);
          } catch (u) {
            return "[UnexpectedJSONParseError]: " + u.message;
          }
        };
      })(Un, Un.exports);
      var bc = Un.exports;
      const je = fr(bc);
      var Us = {
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
      })(Us);
      var mc = Us.exports;
      const ct = fr(mc);
      function wc() {
        if (typeof globalThis < "u") return globalThis;
        if (typeof self < "u") return self;
        if (typeof window < "u") return window;
        if (typeof global < "u") return global;
        console.warn("XState could not find a global object in this environment. Please let the maintainers know and raise an issue here: https://github.com/statelyai/xstate/issues");
      }
      function vc() {
        const t = wc();
        if (t.__xstate__) return t.__xstate__;
      }
      const xc = (t) => {
        if (typeof window > "u") return;
        const e = vc();
        e && e.register(t);
      };
      class zr {
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
      const Ps = ".", Sc = "", $s = "", kc = "#", Pn = "*", Bs = "xstate.init", $n = "xstate.stop";
      function Ac(t, e) {
        return {
          type: `xstate.after.${t}.${e}`
        };
      }
      function Bn(t, e) {
        return {
          type: `xstate.done.state.${t}`,
          output: e
        };
      }
      function Ec(t, e) {
        return {
          type: `xstate.done.actor.${t}`,
          output: e,
          actorId: t
        };
      }
      function Ic(t, e) {
        return {
          type: `xstate.error.actor.${t}`,
          error: e,
          actorId: t
        };
      }
      function Fs(t) {
        return {
          type: Bs,
          input: t
        };
      }
      function Ie(t) {
        setTimeout(() => {
          throw t;
        });
      }
      const Cc = typeof Symbol == "function" && Symbol.observable || "@@observable";
      function Ls(t, e) {
        const n = Wr(t), r = Wr(e);
        return typeof r == "string" ? typeof n == "string" ? r === n : false : typeof n == "string" ? n in r : Object.keys(n).every((s) => s in r ? Ls(n[s], r[s]) : false);
      }
      function ur(t) {
        if (Ns(t)) return t;
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
      function Wr(t) {
        if (ff(t)) return t.value;
        if (typeof t != "string") return t;
        const e = ur(t);
        return Oc(e);
      }
      function Oc(t) {
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
      function Vr(t, e) {
        const n = {}, r = Object.keys(t);
        for (let s = 0; s < r.length; s++) {
          const i = r[s];
          n[i] = e(t[i], i, t, s);
        }
        return n;
      }
      function Hs(t) {
        return Ns(t) ? t : [
          t
        ];
      }
      function Re(t) {
        return t === void 0 ? [] : Hs(t);
      }
      function Fn(t, e, n, r) {
        return typeof t == "function" ? t({
          context: e,
          event: n,
          self: r
        }) : (t && typeof t == "object" && Object.values(t).some((s) => typeof s == "function") && console.warn(`Dynamically mapping values to individual properties is deprecated. Use a single function that returns the mapped object instead.
Found object containing properties whose values are possibly mapping functions: ${Object.entries(t).filter(([, s]) => typeof s == "function").map(([s, i]) => `
 - ${s}: ${i.toString().replace(/\n\s*/g, "")}`).join("")}`), t);
      }
      function Ns(t) {
        return Array.isArray(t);
      }
      function Tc(t) {
        return t.type.startsWith("xstate.error.actor");
      }
      function Qe(t) {
        return Hs(t).map((e) => typeof e > "u" || typeof e == "string" ? {
          target: e
        } : e);
      }
      function zs(t) {
        if (!(t === void 0 || t === Sc)) return Re(t);
      }
      function Ln(t, e, n) {
        var _a5, _b, _c3;
        const r = typeof t == "object", s = r ? t : void 0;
        return {
          next: (_a5 = r ? t.next : t) == null ? void 0 : _a5.bind(s),
          error: (_b = r ? t.error : e) == null ? void 0 : _b.bind(s),
          complete: (_c3 = r ? t.complete : n) == null ? void 0 : _c3.bind(s)
        };
      }
      function Kr(t, e) {
        return `${e}.${t}`;
      }
      function dr(t, e) {
        const n = e.match(/^xstate\.invoke\.(\d+)\.(.*)/);
        if (!n) return t.implementations.actors[e];
        const [, r, s] = n, o = t.getStateNodeById(s).config.invoke;
        return (Array.isArray(o) ? o[r] : o).src;
      }
      function Jr(t, e) {
        return `${t.sessionId}.${e}`;
      }
      let Rc = 0;
      function Mc(t, e) {
        const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new Set(), o = {}, { clock: a, logger: c } = e, f = {
          schedule: (_, l, b, v, S = Math.random().toString(36).slice(2)) => {
            const j = {
              source: _,
              target: l,
              event: b,
              delay: v,
              id: S,
              startedAt: Date.now()
            }, D = Jr(_, S);
            d._snapshot._scheduledEvents[D] = j;
            const E = a.setTimeout(() => {
              delete o[D], delete d._snapshot._scheduledEvents[D], d._relay(_, l, b);
            }, v);
            o[D] = E;
          },
          cancel: (_, l) => {
            const b = Jr(_, l), v = o[b];
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
          _bookId: () => `x:${Rc++}`,
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
            const l = Ln(_);
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
      let pt = false;
      const lr = 1;
      let fe = function(t) {
        return t[t.NotStarted = 0] = "NotStarted", t[t.Running = 1] = "Running", t[t.Stopped = 2] = "Stopped", t;
      }({});
      const jc = {
        clock: {
          setTimeout: (t, e) => setTimeout(t, e),
          clearTimeout: (t) => clearTimeout(t)
        },
        logger: console.log.bind(console),
        devTools: false
      };
      class Dc {
        constructor(e, n) {
          this.logic = e, this._snapshot = void 0, this.clock = void 0, this.options = void 0, this.id = void 0, this.mailbox = new zr(this._process.bind(this)), this.observers = /* @__PURE__ */ new Set(), this.eventListeners = /* @__PURE__ */ new Map(), this.logger = void 0, this._processingStatus = fe.NotStarted, this._parent = void 0, this._syncSnapshot = void 0, this.ref = void 0, this._actorScope = void 0, this._systemId = void 0, this.sessionId = void 0, this.system = void 0, this._doneEvent = void 0, this.src = void 0, this._deferred = [];
          const r = {
            ...jc,
            ...n
          }, { clock: s, logger: i, parent: o, syncSnapshot: a, id: c, systemId: f, inspect: u } = r;
          this.system = o ? o.system : Mc(this, {
            clock: s,
            logger: i
          }), u && !o && this.system.inspect(Ln(u)), this.sessionId = this.system._bookId(), this.id = c ?? this.sessionId, this.logger = (n == null ? void 0 : n.logger) ?? this.system._logger, this.clock = (n == null ? void 0 : n.clock) ?? this.system._clock, this._parent = o, this._syncSnapshot = a, this.options = r, this.src = r.src ?? e, this.ref = this, this._actorScope = {
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
                const l = pt;
                try {
                  pt = true, d.exec(d.info, d.params);
                } finally {
                  pt = l;
                }
              };
              this._processingStatus === fe.Running ? _() : this._deferred.push(_);
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
                Ie(i);
              }
              break;
            case "done":
              for (const s of this.observers) try {
                (_b = s.next) == null ? void 0 : _b.call(s, e);
              } catch (i) {
                Ie(i);
              }
              this._stopProcedure(), this._complete(), this._doneEvent = Ec(this.id, this._snapshot.output), this._parent && this.system._relay(this, this._parent, this._doneEvent);
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
          const s = Ln(e, n, r);
          if (this._processingStatus !== fe.Stopped) this.observers.add(s);
          else switch (this._snapshot.status) {
            case "done":
              try {
                (_a5 = s.complete) == null ? void 0 : _a5.call(s);
              } catch (i) {
                Ie(i);
              }
              break;
            case "error": {
              const i = this._snapshot.error;
              if (!s.error) Ie(i);
              else try {
                s.error(i);
              } catch (o) {
                Ie(o);
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
          if (this._processingStatus === fe.Running) return this;
          this._syncSnapshot && this.subscribe({
            next: (r) => {
              r.status === "active" && this.system._relay(this, this._parent, {
                type: `xstate.snapshot.${this.id}`,
                snapshot: r
              });
            },
            error: () => {
            }
          }), this.system._register(this.sessionId, this), this._systemId && this.system._set(this._systemId, this), this._processingStatus = fe.Running;
          const e = Fs(this.options.input);
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
          this.update(n, e), e.type === $n && (this._stopProcedure(), this._complete());
        }
        _stop() {
          return this._processingStatus === fe.Stopped ? this : (this.mailbox.clear(), this._processingStatus === fe.NotStarted ? (this._processingStatus = fe.Stopped, this) : (this.mailbox.enqueue({
            type: $n
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
            Ie(n);
          }
          this.observers.clear();
        }
        _reportError(e) {
          if (!this.observers.size) {
            this._parent || Ie(e);
            return;
          }
          let n = false;
          for (const r of this.observers) {
            const s = r.error;
            n || (n = !s);
            try {
              s == null ? void 0 : s(e);
            } catch (i) {
              Ie(i);
            }
          }
          this.observers.clear(), n && Ie(e);
        }
        _error(e) {
          this._stopProcedure(), this._reportError(e), this._parent && this.system._relay(this, this._parent, Ic(this.id, e));
        }
        _stopProcedure() {
          return this._processingStatus !== fe.Running ? this : (this.system.scheduler.cancelAll(this), this.mailbox.clear(), this.mailbox = new zr(this._process.bind(this)), this._processingStatus = fe.Stopped, this.system._unregister(this), this);
        }
        _send(e) {
          if (this._processingStatus === fe.Stopped) {
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
          e && (typeof e == "function" ? e : xc)(this);
        }
        toJSON() {
          return {
            xstate$$type: lr,
            id: this.id
          };
        }
        getPersistedSnapshot(e) {
          return this.logic.getPersistedSnapshot(this._snapshot, e);
        }
        [Cc]() {
          return this;
        }
        getSnapshot() {
          if (!this._snapshot) throw new Error("Snapshot can't be read while the actor initializes itself");
          return this._snapshot;
        }
      }
      function wt(t, ...[e]) {
        return new Dc(t, e);
      }
      function Uc(t, e, n, r, { sendId: s }) {
        const i = typeof s == "function" ? s(n, r) : s;
        return [
          e,
          {
            sendId: i
          },
          void 0
        ];
      }
      function Pc(t, e) {
        t.defer(() => {
          t.system.scheduler.cancel(t.self, e.sendId);
        });
      }
      function $c(t) {
        function e(n, r) {
          throw new Error("This isn't supposed to be called");
        }
        return e.type = "xstate.cancel", e.sendId = t, e.resolve = Uc, e.execute = Pc, e;
      }
      function Bc(t, e, n, r, { id: s, systemId: i, src: o, input: a, syncSnapshot: c }) {
        const f = typeof o == "string" ? dr(e.machine, o) : o, u = typeof s == "function" ? s(n) : s;
        let d, _;
        return f && (_ = typeof a == "function" ? a({
          context: e.context,
          event: n.event,
          self: t.self
        }) : a, d = wt(f, {
          id: u,
          src: o,
          parent: t.self,
          syncSnapshot: c,
          systemId: i,
          input: _
        })), d || console.warn(`Actor type '${o}' not found in machine '${t.id}'.`), [
          Je(e, {
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
      function Fc(t, { actorRef: e }) {
        e && t.defer(() => {
          e._processingStatus !== fe.Stopped && e.start();
        });
      }
      function Lc(...[t, { id: e, systemId: n, input: r, syncSnapshot: s = false } = {}]) {
        function i(o, a) {
          throw new Error("This isn't supposed to be called");
        }
        return i.type = "xstate.spawnChild", i.id = e, i.systemId = n, i.src = t, i.input = r, i.syncSnapshot = s, i.resolve = Bc, i.execute = Fc, i;
      }
      function Hc(t, e, n, r, { actorRef: s }) {
        const i = typeof s == "function" ? s(n, r) : s, o = typeof i == "string" ? e.children[i] : i;
        let a = e.children;
        return o && (a = {
          ...a
        }, delete a[o.id]), [
          Je(e, {
            children: a
          }),
          o,
          void 0
        ];
      }
      function Nc(t, e) {
        if (e) {
          if (t.system._unregister(e), e._processingStatus !== fe.Running) {
            t.stopChild(e);
            return;
          }
          t.defer(() => {
            t.stopChild(e);
          });
        }
      }
      function Ws(t) {
        function e(n, r) {
          throw new Error("This isn't supposed to be called");
        }
        return e.type = "xstate.stopChild", e.actorRef = t, e.resolve = Hc, e.execute = Nc, e;
      }
      function hr(t, e, n, r) {
        const { machine: s } = r, i = typeof t == "function", o = i ? t : s.implementations.guards[typeof t == "string" ? t : t.type];
        if (!i && !o) throw new Error(`Guard '${typeof t == "string" ? t : t.type}' is not implemented.'.`);
        if (typeof o != "function") return hr(o, e, n, r);
        const a = {
          context: e,
          event: n
        }, c = i || typeof t == "string" ? void 0 : "params" in t ? typeof t.params == "function" ? t.params({
          context: e,
          event: n
        }) : t.params : void 0;
        return "check" in o ? o.check(r, a, o) : o(a, c);
      }
      const _r = (t) => t.type === "atomic" || t.type === "final";
      function it(t) {
        return Object.values(t.states).filter((e) => e.type !== "history");
      }
      function It(t, e) {
        const n = [];
        if (e === t) return n;
        let r = t.parent;
        for (; r && r !== e; ) n.push(r), r = r.parent;
        return n;
      }
      function Yt(t) {
        const e = new Set(t), n = Ks(e);
        for (const r of e) if (r.type === "compound" && (!n.get(r) || !n.get(r).length)) qr(r).forEach((s) => e.add(s));
        else if (r.type === "parallel") {
          for (const s of it(r)) if (s.type !== "history" && !e.has(s)) {
            const i = qr(s);
            for (const o of i) e.add(o);
          }
        }
        for (const r of e) {
          let s = r.parent;
          for (; s; ) e.add(s), s = s.parent;
        }
        return e;
      }
      function Vs(t, e) {
        const n = e.get(t);
        if (!n) return {};
        if (t.type === "compound") {
          const s = n[0];
          if (s) {
            if (_r(s)) return s.key;
          } else return {};
        }
        const r = {};
        for (const s of n) r[s.key] = Vs(s, e);
        return r;
      }
      function Ks(t) {
        const e = /* @__PURE__ */ new Map();
        for (const n of t) e.has(n) || e.set(n, []), n.parent && (e.has(n.parent) || e.set(n.parent, []), e.get(n.parent).push(n));
        return e;
      }
      function Js(t, e) {
        const n = Yt(e);
        return Vs(t, Ks(n));
      }
      function gr(t, e) {
        return e.type === "compound" ? it(e).some((n) => n.type === "final" && t.has(n)) : e.type === "parallel" ? it(e).every((n) => gr(t, n)) : e.type === "final";
      }
      const un = (t) => t[0] === kc;
      function zc(t, e) {
        return t.transitions.get(e) || [
          ...t.transitions.keys()
        ].filter((r) => {
          if (r === Pn) return true;
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
      function Wc(t) {
        const e = t.config.after;
        if (!e) return [];
        const n = (s) => {
          const i = Ac(s, t.id), o = i.type;
          return t.entry.push(bf(i, {
            id: o,
            delay: s
          })), t.exit.push($c(o)), o;
        };
        return Object.keys(e).flatMap((s) => {
          const i = e[s], o = typeof i == "string" ? {
            target: i
          } : i, a = Number.isNaN(+s) ? s : +s, c = n(a);
          return Re(o).map((f) => ({
            ...f,
            event: c,
            delay: a
          }));
        }).map((s) => {
          const { delay: i } = s;
          return {
            ...Ne(t, s.event, s),
            delay: i
          };
        });
      }
      function Ne(t, e, n) {
        const r = zs(n.target), s = n.reenter ?? false, i = Jc(t, r);
        if (n.cond) throw new Error(`State "${t.id}" has declared \`cond\` for one of its transitions. This property has been renamed to \`guard\`. Please update your code.`);
        const o = {
          ...n,
          actions: Re(n.actions),
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
      function Vc(t) {
        const e = /* @__PURE__ */ new Map();
        if (t.config.on) for (const n of Object.keys(t.config.on)) {
          if (n === $s) throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
          const r = t.config.on[n];
          e.set(n, Qe(r).map((s) => Ne(t, n, s)));
        }
        if (t.config.onDone) {
          const n = `xstate.done.state.${t.id}`;
          e.set(n, Qe(t.config.onDone).map((r) => Ne(t, n, r)));
        }
        for (const n of t.invoke) {
          if (n.onDone) {
            const r = `xstate.done.actor.${n.id}`;
            e.set(r, Qe(n.onDone).map((s) => Ne(t, r, s)));
          }
          if (n.onError) {
            const r = `xstate.error.actor.${n.id}`;
            e.set(r, Qe(n.onError).map((s) => Ne(t, r, s)));
          }
          if (n.onSnapshot) {
            const r = `xstate.snapshot.${n.id}`;
            e.set(r, Qe(n.onSnapshot).map((s) => Ne(t, r, s)));
          }
        }
        for (const n of t.after) {
          let r = e.get(n.eventType);
          r || (r = [], e.set(n.eventType, r)), r.push(n);
        }
        return e;
      }
      function Kc(t, e) {
        const n = typeof e == "string" ? t.states[e] : e ? t.states[e.target] : void 0;
        if (!n && e) throw new Error(`Initial state node "${e}" not found on parent state node #${t.id}`);
        const r = {
          source: t,
          actions: !e || typeof e == "string" ? [] : Re(e.actions),
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
      function Jc(t, e) {
        if (e !== void 0) return e.map((n) => {
          if (typeof n != "string") return n;
          if (un(n)) return t.machine.getStateNodeById(n);
          const r = n[0] === Ps;
          if (r && !t.parent) return Xt(t, n.slice(1));
          const s = r ? t.key + n : n;
          if (t.parent) try {
            return Xt(t.parent, s);
          } catch (i) {
            throw new Error(`Invalid transition definition for state node '${t.id}':
${i.message}`);
          }
          else throw new Error(`Invalid target: "${n}" is not a valid target from the root node. Did you mean ".${n}"?`);
        });
      }
      function qs(t) {
        const e = zs(t.config.target);
        return e ? {
          target: e.map((n) => typeof n == "string" ? Xt(t.parent, n) : n)
        } : t.parent.initial;
      }
      function We(t) {
        return t.type === "history";
      }
      function qr(t) {
        const e = Gs(t);
        for (const n of e) for (const r of It(n, t)) e.add(r);
        return e;
      }
      function Gs(t) {
        const e = /* @__PURE__ */ new Set();
        function n(r) {
          if (!e.has(r)) {
            if (e.add(r), r.type === "compound") n(r.initial.target[0]);
            else if (r.type === "parallel") for (const s of it(r)) n(s);
          }
        }
        return n(t), e;
      }
      function ot(t, e) {
        if (un(e)) return t.machine.getStateNodeById(e);
        if (!t.states) throw new Error(`Unable to retrieve child state '${e}' from '${t.id}'; no child states exist.`);
        const n = t.states[e];
        if (!n) throw new Error(`Child state '${e}' does not exist on '${t.id}'`);
        return n;
      }
      function Xt(t, e) {
        if (typeof e == "string" && un(e)) try {
          return t.machine.getStateNodeById(e);
        } catch {
        }
        const n = ur(e).slice();
        let r = t;
        for (; n.length; ) {
          const s = n.shift();
          if (!s.length) break;
          r = ot(r, s);
        }
        return r;
      }
      function Zt(t, e) {
        if (typeof e == "string") {
          const s = t.states[e];
          if (!s) throw new Error(`State '${e}' does not exist on '${t.id}'`);
          return [
            t,
            s
          ];
        }
        const n = Object.keys(e), r = n.map((s) => ot(t, s)).filter(Boolean);
        return [
          t.machine.root,
          t
        ].concat(r, n.reduce((s, i) => {
          const o = ot(t, i);
          if (!o) return s;
          const a = Zt(o, e[i]);
          return s.concat(a);
        }, []));
      }
      function qc(t, e, n, r) {
        const i = ot(t, e).next(n, r);
        return !i || !i.length ? t.next(n, r) : i;
      }
      function Gc(t, e, n, r) {
        const s = Object.keys(e), i = ot(t, s[0]), o = pr(i, e[s[0]], n, r);
        return !o || !o.length ? t.next(n, r) : o;
      }
      function Yc(t, e, n, r) {
        const s = [];
        for (const i of Object.keys(e)) {
          const o = e[i];
          if (!o) continue;
          const a = ot(t, i), c = pr(a, o, n, r);
          c && s.push(...c);
        }
        return s.length ? s : t.next(n, r);
      }
      function pr(t, e, n, r) {
        return typeof e == "string" ? qc(t, e, n, r) : Object.keys(e).length === 1 ? Gc(t, e, n, r) : Yc(t, e, n, r);
      }
      function Xc(t) {
        return Object.keys(t.states).map((e) => t.states[e]).filter((e) => e.type === "history");
      }
      function Fe(t, e) {
        let n = t;
        for (; n.parent && n.parent !== e; ) n = n.parent;
        return n.parent === e;
      }
      function Zc(t, e) {
        const n = new Set(t), r = new Set(e);
        for (const s of n) if (r.has(s)) return true;
        for (const s of r) if (n.has(s)) return true;
        return false;
      }
      function Ys(t, e, n) {
        const r = /* @__PURE__ */ new Set();
        for (const s of t) {
          let i = false;
          const o = /* @__PURE__ */ new Set();
          for (const a of r) if (Zc(Hn([
            s
          ], e, n), Hn([
            a
          ], e, n))) if (Fe(s.source, a.source)) o.add(a);
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
      function Qc(t) {
        const [e, ...n] = t;
        for (const r of It(e, void 0)) if (n.every((s) => Fe(s, r))) return r;
      }
      function yr(t, e) {
        if (!t.target) return [];
        const n = /* @__PURE__ */ new Set();
        for (const r of t.target) if (We(r)) if (e[r.id]) for (const s of e[r.id]) n.add(s);
        else for (const s of yr(qs(r), e)) n.add(s);
        else n.add(r);
        return [
          ...n
        ];
      }
      function Xs(t, e) {
        const n = yr(t, e);
        if (!n) return;
        if (!t.reenter && n.every((s) => s === t.source || Fe(s, t.source))) return t.source;
        const r = Qc(n.concat(t.source));
        if (r) return r;
        if (!t.reenter) return t.source.machine.root;
      }
      function Hn(t, e, n) {
        var _a5;
        const r = /* @__PURE__ */ new Set();
        for (const s of t) if ((_a5 = s.target) == null ? void 0 : _a5.length) {
          const i = Xs(s, n);
          s.reenter && s.source === i && r.add(i);
          for (const o of e) Fe(o, i) && r.add(o);
        }
        return [
          ...r
        ];
      }
      function ef(t, e) {
        if (t.length !== e.size) return false;
        for (const n of t) if (!e.has(n)) return false;
        return true;
      }
      function Nn(t, e, n, r, s, i) {
        if (!t.length) return e;
        const o = new Set(e._nodes);
        let a = e.historyValue;
        const c = Ys(t, o, a);
        let f = e;
        s || ([f, a] = sf(f, r, n, c, o, a, i, n.actionExecutor)), f = at(f, r, n, c.flatMap((d) => d.actions), i, void 0), f = nf(f, r, n, c, o, i, a, s);
        const u = [
          ...o
        ];
        f.status === "done" && (f = at(f, r, n, u.sort((d, _) => _.order - d.order).flatMap((d) => d.exit), i, void 0));
        try {
          return a === e.historyValue && ef(e._nodes, o) ? f : Je(f, {
            _nodes: u,
            historyValue: a
          });
        } catch (d) {
          throw d;
        }
      }
      function tf(t, e, n, r, s) {
        if (r.output === void 0) return;
        const i = Bn(s.id, s.output !== void 0 && s.parent ? Fn(s.output, t.context, e, n.self) : void 0);
        return Fn(r.output, t.context, i, n.self);
      }
      function nf(t, e, n, r, s, i, o, a) {
        let c = t;
        const f = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
        rf(r, o, u, f), a && u.add(t.machine.root);
        const d = /* @__PURE__ */ new Set();
        for (const _ of [
          ...f
        ].sort((l, b) => l.order - b.order)) {
          s.add(_);
          const l = [];
          l.push(..._.entry);
          for (const b of _.invoke) l.push(Lc(b.src, {
            ...b,
            syncSnapshot: !!b.onSnapshot
          }));
          if (u.has(_)) {
            const b = _.initial.actions;
            l.push(...b);
          }
          if (c = at(c, e, n, l, i, _.invoke.map((b) => b.id)), _.type === "final") {
            const b = _.parent;
            let v = (b == null ? void 0 : b.type) === "parallel" ? b : b == null ? void 0 : b.parent, S = v || _;
            for ((b == null ? void 0 : b.type) === "compound" && i.push(Bn(b.id, _.output !== void 0 ? Fn(_.output, c.context, e, n.self) : void 0)); (v == null ? void 0 : v.type) === "parallel" && !d.has(v) && gr(s, v); ) d.add(v), i.push(Bn(v.id)), S = v, v = v.parent;
            if (v) continue;
            c = Je(c, {
              status: "done",
              output: tf(c, e, n, c.machine.root, S)
            });
          }
        }
        return c;
      }
      function rf(t, e, n, r) {
        for (const s of t) {
          const i = Xs(s, e);
          for (const a of s.target || []) !We(a) && (s.source !== a || s.source !== i || s.reenter) && (r.add(a), n.add(a)), tt(a, e, n, r);
          const o = yr(s, e);
          for (const a of o) {
            const c = It(a, i);
            (i == null ? void 0 : i.type) === "parallel" && c.push(i), Zs(r, e, n, c, !s.source.parent && s.reenter ? void 0 : i);
          }
        }
      }
      function tt(t, e, n, r) {
        var _a5;
        if (We(t)) if (e[t.id]) {
          const s = e[t.id];
          for (const i of s) r.add(i), tt(i, e, n, r);
          for (const i of s) gn(i, t.parent, r, e, n);
        } else {
          const s = qs(t);
          for (const i of s.target) r.add(i), s === ((_a5 = t.parent) == null ? void 0 : _a5.initial) && n.add(t.parent), tt(i, e, n, r);
          for (const i of s.target) gn(i, t.parent, r, e, n);
        }
        else if (t.type === "compound") {
          const [s] = t.initial.target;
          We(s) || (r.add(s), n.add(s)), tt(s, e, n, r), gn(s, t, r, e, n);
        } else if (t.type === "parallel") for (const s of it(t).filter((i) => !We(i))) [
          ...r
        ].some((i) => Fe(i, s)) || (We(s) || (r.add(s), n.add(s)), tt(s, e, n, r));
      }
      function Zs(t, e, n, r, s) {
        for (const i of r) if ((!s || Fe(i, s)) && t.add(i), i.type === "parallel") for (const o of it(i).filter((a) => !We(a))) [
          ...t
        ].some((a) => Fe(a, o)) || (t.add(o), tt(o, e, n, t));
      }
      function gn(t, e, n, r, s) {
        Zs(n, r, s, It(t, e));
      }
      function sf(t, e, n, r, s, i, o, a) {
        let c = t;
        const f = Hn(r, s, i);
        f.sort((d, _) => _.order - d.order);
        let u;
        for (const d of f) for (const _ of Xc(d)) {
          let l;
          _.history === "deep" ? l = (b) => _r(b) && Fe(b, d) : l = (b) => b.parent === d, u ?? (u = {
            ...i
          }), u[_.id] = Array.from(s).filter(l);
        }
        for (const d of f) c = at(c, e, n, [
          ...d.exit,
          ...d.invoke.map((_) => Ws(_.id))
        ], o, void 0), s.delete(d);
        return [
          c,
          u || i
        ];
      }
      function of(t, e) {
        return t.implementations.actions[e];
      }
      function Qs(t, e, n, r, s, i) {
        const { machine: o } = t;
        let a = t;
        for (const c of r) {
          const f = typeof c == "function", u = f ? c : of(o, typeof c == "string" ? c : c.type), d = {
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
          }), S && (a = Qs(a, e, n, S, s, i));
        }
        return a;
      }
      function at(t, e, n, r, s, i) {
        const o = i ? [] : void 0, a = Qs(t, e, n, r, {
          internalQueue: s,
          deferredActorIds: i
        }, o);
        return o == null ? void 0 : o.forEach(([c, f]) => {
          c.retryResolve(n, a, f);
        }), a;
      }
      function pn(t, e, n, r) {
        if (e.type === Pn) throw new Error(`An event cannot have the wildcard type ('${Pn}')`);
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
        if (e.type === $n) return s = Je(Gr(s, e, n), {
          status: "stopped"
        }), o(s, e, []), {
          snapshot: s,
          microstates: i
        };
        let a = e;
        if (a.type !== Bs) {
          const f = a, u = Tc(f), d = Yr(f, s);
          if (u && !d.length) return s = Je(t, {
            status: "error",
            error: f.error
          }), o(s, f, []), {
            snapshot: s,
            microstates: i
          };
          s = Nn(d, t, n, a, false, r), o(s, f, d);
        }
        let c = true;
        for (; s.status === "active"; ) {
          let f = c ? af(s, a) : [];
          const u = f.length ? s : void 0;
          if (!f.length) {
            if (!r.length) break;
            a = r.shift(), f = Yr(a, s);
          }
          s = Nn(f, s, n, a, false, r), c = s !== u, o(s, a, f);
        }
        return s.status !== "active" && Gr(s, a, n), {
          snapshot: s,
          microstates: i
        };
      }
      function Gr(t, e, n) {
        return at(t, e, n, Object.values(t.children).map((r) => Ws(r)), [], void 0);
      }
      function Yr(t, e) {
        return e.machine.getTransitionData(e, t);
      }
      function af(t, e) {
        const n = /* @__PURE__ */ new Set(), r = t._nodes.filter(_r);
        for (const s of r) e: for (const i of [
          s
        ].concat(It(s, void 0))) if (i.always) {
          for (const o of i.always) if (o.guard === void 0 || hr(o.guard, t.context, e, t)) {
            n.add(o);
            break e;
          }
        }
        return Ys(Array.from(n), new Set(t._nodes), t.historyValue);
      }
      function cf(t, e) {
        const n = Yt(Zt(t, e));
        return Js(t, [
          ...n
        ]);
      }
      function ff(t) {
        return !!t && typeof t == "object" && "machine" in t && "value" in t;
      }
      const uf = function(e) {
        return Ls(e, this.value);
      }, df = function(e) {
        return this.tags.has(e);
      }, lf = function(e) {
        this.machine || console.warn("state.can(...) used outside of a machine-created State object; this will always return false.");
        const n = this.machine.getTransitionData(this, e);
        return !!(n == null ? void 0 : n.length) && n.some((r) => r.target !== void 0 || r.actions.length);
      }, hf = function() {
        const { _nodes: e, tags: n, machine: r, getMeta: s, toJSON: i, can: o, hasTag: a, matches: c, ...f } = this;
        return {
          ...f,
          tags: Array.from(n)
        };
      }, _f = function() {
        return this._nodes.reduce((e, n) => (n.meta !== void 0 && (e[n.id] = n.meta), e), {});
      };
      function Lt(t, e) {
        return {
          status: t.status,
          output: t.output,
          error: t.error,
          machine: e,
          context: t.context,
          _nodes: t._nodes,
          value: Js(e.root, t._nodes),
          tags: new Set(t._nodes.flatMap((n) => n.tags)),
          children: t.children,
          historyValue: t.historyValue || {},
          matches: uf,
          hasTag: df,
          can: lf,
          getMeta: _f,
          toJSON: hf
        };
      }
      function Je(t, e = {}) {
        return Lt({
          ...t,
          ...e
        }, t.machine);
      }
      function gf(t, e) {
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
          context: ei(o),
          children: l
        };
      }
      function ei(t) {
        let e;
        for (const n in t) {
          const r = t[n];
          if (r && typeof r == "object") if ("sessionId" in r && "send" in r && "ref" in r) e ?? (e = Array.isArray(t) ? t.slice() : {
            ...t
          }), e[n] = {
            xstate$$type: lr,
            id: r.id
          };
          else {
            const s = ei(r);
            s !== r && (e ?? (e = Array.isArray(t) ? t.slice() : {
              ...t
            }), e[n] = s);
          }
        }
        return e ?? t;
      }
      function pf(t, e, n, r, { event: s, id: i, delay: o }, { internalQueue: a }) {
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
      function yf(t, e) {
        const { event: n, delay: r, id: s } = e;
        if (typeof r == "number") {
          t.defer(() => {
            const i = t.self;
            t.system.scheduler.schedule(i, i, n, r, s);
          });
          return;
        }
      }
      function bf(t, e) {
        pt && console.warn("Custom actions should not call `raise()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
        function n(r, s) {
          throw new Error("This isn't supposed to be called");
        }
        return n.type = "xstate.raise", n.event = t, n.id = e == null ? void 0 : e.id, n.delay = e == null ? void 0 : e.delay, n.resolve = pf, n.execute = yf, n;
      }
      function mf(t, { machine: e, context: n }, r, s) {
        const i = (o, a) => {
          if (typeof o == "string") {
            const c = dr(e, o);
            if (!c) throw new Error(`Actor logic '${o}' not implemented in machine '${e.id}'`);
            const f = wt(c, {
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
          } else return wt(o, {
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
            c._processingStatus !== fe.Stopped && c.start();
          }), c;
        };
      }
      function wf(t, e, n, r, { assignment: s }) {
        if (!e.context) throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
        const i = {}, o = {
          context: e.context,
          event: n.event,
          spawn: mf(t, e, n.event, i),
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
          Je(e, {
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
      function zn(t) {
        pt && console.warn("Custom actions should not call `assign()` directly, as it is not imperative. See https://stately.ai/docs/actions#built-in-actions for more details.");
        function e(n, r) {
          throw new Error("This isn't supposed to be called");
        }
        return e.type = "xstate.assign", e.assignment = t, e.resolve = wf, e;
      }
      function vf(t, e) {
        const n = Re(e);
        if (!n.includes(t.type)) {
          const r = n.length === 1 ? `type "${n[0]}"` : `one of types "${n.join('", "')}"`;
          throw new Error(`Expected event ${JSON.stringify(t)} to have ${r}`);
        }
      }
      const Xr = /* @__PURE__ */ new WeakMap();
      function Ye(t, e, n) {
        let r = Xr.get(t);
        return r ? e in r || (r[e] = n()) : (r = {
          [e]: n()
        }, Xr.set(t, r)), r[e];
      }
      const xf = {}, ft = (t) => typeof t == "string" ? {
        type: t
      } : typeof t == "function" ? "resolve" in t ? {
        type: t.type
      } : {
        type: t.name
      } : t;
      class br {
        constructor(e, n) {
          if (this.config = e, this.key = void 0, this.id = void 0, this.type = void 0, this.path = void 0, this.states = void 0, this.history = void 0, this.entry = void 0, this.exit = void 0, this.parent = void 0, this.machine = void 0, this.meta = void 0, this.output = void 0, this.order = -1, this.description = void 0, this.tags = [], this.transitions = void 0, this.always = void 0, this.parent = n._parent, this.key = n._key, this.machine = n._machine, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.id = this.config.id || [
            this.machine.id,
            ...this.path
          ].join(Ps), this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.description = this.config.description, this.order = this.machine.idMap.size, this.machine.idMap.set(this.id, this), this.states = this.config.states ? Vr(this.config.states, (r, s) => new br(r, {
            _parent: this,
            _key: s,
            _machine: this.machine
          })) : xf, this.type === "compound" && !this.config.initial) throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
          this.history = this.config.history === true ? "shallow" : this.config.history || false, this.entry = Re(this.config.entry).slice(), this.exit = Re(this.config.exit).slice(), this.meta = this.config.meta, this.output = this.type === "final" || !this.parent ? this.config.output : void 0, this.tags = Re(e.tags).slice();
        }
        _initialize() {
          this.transitions = Vc(this), this.config.always && (this.always = Qe(this.config.always).map((e) => Ne(this, $s, e))), Object.keys(this.states).forEach((e) => {
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
              actions: this.initial.actions.map(ft),
              eventType: null,
              reenter: false,
              toJSON: () => ({
                target: this.initial.target.map((e) => `#${e.id}`),
                source: `#${this.id}`,
                actions: this.initial.actions.map(ft),
                eventType: null
              })
            } : void 0,
            history: this.history,
            states: Vr(this.states, (e) => e.definition),
            on: this.on,
            transitions: [
              ...this.transitions.values()
            ].flat().map((e) => ({
              ...e,
              actions: e.actions.map(ft)
            })),
            entry: this.entry.map(ft),
            exit: this.exit.map(ft),
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
          return Ye(this, "invoke", () => Re(this.config.invoke).map((e, n) => {
            const { src: r, systemId: s } = e, i = e.id ?? Kr(this.id, n), o = typeof r == "string" ? r : `xstate.invoke.${Kr(this.id, n)}`;
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
          return Ye(this, "on", () => [
            ...this.transitions
          ].flatMap(([n, r]) => r.map((s) => [
            n,
            s
          ])).reduce((n, [r, s]) => (n[r] = n[r] || [], n[r].push(s), n), {}));
        }
        get after() {
          return Ye(this, "delayedTransitions", () => Wc(this));
        }
        get initial() {
          return Ye(this, "initial", () => Kc(this, this.config.initial));
        }
        next(e, n) {
          const r = n.type, s = [];
          let i;
          const o = Ye(this, `candidates-${r}`, () => zc(this, r));
          for (const a of o) {
            const { guard: c } = a, f = e.context;
            let u = false;
            try {
              u = !c || hr(c, f, n, e);
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
          return Ye(this, "events", () => {
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
      const Sf = "#";
      class mr {
        constructor(e, n) {
          this.config = e, this.version = void 0, this.schemas = void 0, this.implementations = void 0, this.__xstatenode = true, this.idMap = /* @__PURE__ */ new Map(), this.root = void 0, this.id = void 0, this.states = void 0, this.events = void 0, this.id = e.id || "(machine)", this.implementations = {
            actors: (n == null ? void 0 : n.actors) ?? {},
            actions: (n == null ? void 0 : n.actions) ?? {},
            delays: (n == null ? void 0 : n.delays) ?? {},
            guards: (n == null ? void 0 : n.guards) ?? {}
          }, this.version = this.config.version, this.schemas = this.config.schemas, this.transition = this.transition.bind(this), this.getInitialSnapshot = this.getInitialSnapshot.bind(this), this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this), this.restoreSnapshot = this.restoreSnapshot.bind(this), this.start = this.start.bind(this), this.root = new br(e, {
            _key: this.id,
            _machine: this
          }), this.root._initialize(), this.states = this.root.states, this.events = this.root.events, !("output" in this.root) && Object.values(this.states).some((r) => r.type === "final" && "output" in r) && console.warn("Missing `machine.output` declaration (top-level final state with output detected)");
        }
        provide(e) {
          const { actions: n, guards: r, actors: s, delays: i } = this.implementations;
          return new mr(this.config, {
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
          const n = cf(this.root, e.value), r = Yt(Zt(this.root, n));
          return Lt({
            _nodes: [
              ...r
            ],
            context: e.context || {},
            children: {},
            status: gr(r, this.root) ? "done" : e.status || "active",
            output: e.output,
            error: e.error,
            historyValue: e.historyValue
          }, this);
        }
        transition(e, n, r) {
          return pn(e, n, r, []).snapshot;
        }
        microstep(e, n, r) {
          return pn(e, n, r, []).microstates;
        }
        getTransitionData(e, n) {
          return pr(this.root, e.value, e, n) || [];
        }
        getPreInitialState(e, n, r) {
          const { context: s } = this.config, i = Lt({
            context: typeof s != "function" && s ? s : {},
            _nodes: [
              this.root
            ],
            children: {},
            status: "active"
          }, this);
          return typeof s == "function" ? at(i, n, e, [
            zn(({ spawn: a, event: c, self: f }) => s({
              spawn: a,
              input: c.input,
              self: f
            }))
          ], r, void 0) : i;
        }
        getInitialSnapshot(e, n) {
          const r = Fs(n), s = [], i = this.getPreInitialState(e, r, s), o = Nn([
            {
              target: [
                ...Gs(this.root)
              ],
              source: this.root,
              reenter: true,
              actions: [],
              eventType: null,
              toJSON: null
            }
          ], i, e, r, true, s), { snapshot: a } = pn(o, r, e, s);
          return a;
        }
        start(e) {
          Object.values(e.children).forEach((n) => {
            n.getSnapshot().status === "active" && n.start();
          });
        }
        getStateNodeById(e) {
          const n = ur(e), r = n.slice(1), s = un(n[0]) ? n[0].slice(Sf.length) : n[0], i = this.idMap.get(s);
          if (!i) throw new Error(`Child state node '#${s}' does not exist on machine '${this.id}'`);
          return Xt(i, r);
        }
        get definition() {
          return this.root.definition;
        }
        toJSON() {
          return this.definition;
        }
        getPersistedSnapshot(e, n) {
          return gf(e, n);
        }
        restoreSnapshot(e, n) {
          const r = {}, s = e.children;
          Object.keys(s).forEach((c) => {
            const f = s[c], u = f.snapshot, d = f.src, _ = typeof d == "string" ? dr(this, d) : d;
            if (!_) return;
            const l = wt(_, {
              id: c,
              parent: n.self,
              syncSnapshot: f.syncSnapshot,
              snapshot: u,
              src: d,
              systemId: f.systemId
            });
            r[c] = l;
          });
          const i = Lt({
            ...e,
            children: r,
            _nodes: Array.from(Yt(Zt(this.root, e.value)))
          }, this), o = /* @__PURE__ */ new Set();
          function a(c, f) {
            if (!o.has(c)) {
              o.add(c);
              for (const u in c) {
                const d = c[u];
                if (d && typeof d == "object") {
                  if ("xstate$$type" in d && d.xstate$$type === lr) {
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
      function kf(t, e) {
        return new mr(t, e);
      }
      function Af({ schemas: t, actors: e, actions: n, guards: r, delays: s }) {
        return {
          createMachine: (i) => kf({
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
      const Ef = {
        timeout: 1 / 0
      };
      function If(t, e, n) {
        const r = {
          ...Ef,
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
      var Be = {}, Ge = {}, Le = {};
      Object.defineProperty(Le, "__esModule", {
        value: true
      });
      Le.anumber = Wn;
      Le.abytes = ti;
      Le.ahash = Of;
      Le.aexists = Tf;
      Le.aoutput = Rf;
      function Wn(t) {
        if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
      }
      function Cf(t) {
        return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
      }
      function ti(t, ...e) {
        if (!Cf(t)) throw new Error("Uint8Array expected");
        if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
      }
      function Of(t) {
        if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
        Wn(t.outputLen), Wn(t.blockLen);
      }
      function Tf(t, e = true) {
        if (t.destroyed) throw new Error("Hash instance has been destroyed");
        if (e && t.finished) throw new Error("Hash#digest() has already been called");
      }
      function Rf(t, e) {
        ti(t);
        const n = e.outputLen;
        if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
      }
      var wr = {}, dn = {};
      Object.defineProperty(dn, "__esModule", {
        value: true
      });
      dn.crypto = void 0;
      dn.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
      (function(t) {
        Object.defineProperty(t, "__esModule", {
          value: true
        }), t.Hash = t.nextTick = t.byteSwapIfBE = t.isLE = void 0, t.isBytes = r, t.u8 = s, t.u32 = i, t.createView = o, t.rotr = a, t.rotl = c, t.byteSwap = f, t.byteSwap32 = u, t.bytesToHex = _, t.hexToBytes = v, t.asyncLoop = j, t.utf8ToBytes = D, t.toBytes = E, t.concatBytes = L, t.checkOpts = $, t.wrapConstructor = q, t.wrapConstructorWithOpts = W, t.wrapXOFConstructorWithOpts = Y, t.randomBytes = Z;
        const e = dn, n = Le;
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
          const R = new Uint8Array(p);
          for (let k = 0, C = 0; k < p; k++, C += 2) {
            const O = b(I.charCodeAt(C)), B = b(I.charCodeAt(C + 1));
            if (O === void 0 || B === void 0) {
              const F = I[C] + I[C + 1];
              throw new Error('hex string expected, got non-hex character "' + F + '" at index ' + C);
            }
            R[k] = O * 16 + B;
          }
          return R;
        }
        const S = async () => {
        };
        t.nextTick = S;
        async function j(I, P, p) {
          let R = Date.now();
          for (let k = 0; k < I; k++) {
            p(k);
            const C = Date.now() - R;
            C >= 0 && C < P || (await (0, t.nextTick)(), R += C);
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
          for (let R = 0; R < I.length; R++) {
            const k = I[R];
            (0, n.abytes)(k), P += k.length;
          }
          const p = new Uint8Array(P);
          for (let R = 0, k = 0; R < I.length; R++) {
            const C = I[R];
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
        function q(I) {
          const P = (R) => I().update(E(R)).digest(), p = I();
          return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = () => I(), P;
        }
        function W(I) {
          const P = (R, k) => I(k).update(E(R)).digest(), p = I({});
          return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = (R) => I(R), P;
        }
        function Y(I) {
          const P = (R, k) => I(k).update(E(R)).digest(), p = I({});
          return P.outputLen = p.outputLen, P.blockLen = p.blockLen, P.create = (R) => I(R), P;
        }
        function Z(I = 32) {
          if (e.crypto && typeof e.crypto.getRandomValues == "function") return e.crypto.getRandomValues(new Uint8Array(I));
          if (e.crypto && typeof e.crypto.randomBytes == "function") return e.crypto.randomBytes(I);
          throw new Error("crypto.getRandomValues must be defined");
        }
      })(wr);
      Object.defineProperty(Ge, "__esModule", {
        value: true
      });
      Ge.HashMD = void 0;
      Ge.setBigUint64 = ni;
      Ge.Chi = Mf;
      Ge.Maj = jf;
      const yn = Le, ut = wr;
      function ni(t, e, n, r) {
        if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
        const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), c = r ? 4 : 0, f = r ? 0 : 4;
        t.setUint32(e + c, o, r), t.setUint32(e + f, a, r);
      }
      function Mf(t, e, n) {
        return t & e ^ ~t & n;
      }
      function jf(t, e, n) {
        return t & e ^ t & n ^ e & n;
      }
      class Df extends ut.Hash {
        constructor(e, n, r, s) {
          super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = (0, ut.createView)(this.buffer);
        }
        update(e) {
          (0, yn.aexists)(this);
          const { view: n, buffer: r, blockLen: s } = this;
          e = (0, ut.toBytes)(e);
          const i = e.length;
          for (let o = 0; o < i; ) {
            const a = Math.min(s - this.pos, i - o);
            if (a === s) {
              const c = (0, ut.createView)(e);
              for (; s <= i - o; o += s) this.process(c, o);
              continue;
            }
            r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
          }
          return this.length += e.length, this.roundClean(), this;
        }
        digestInto(e) {
          (0, yn.aexists)(this), (0, yn.aoutput)(e, this), this.finished = true;
          const { buffer: n, view: r, blockLen: s, isLE: i } = this;
          let { pos: o } = this;
          n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
          for (let d = o; d < s; d++) n[d] = 0;
          ni(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
          const a = (0, ut.createView)(e), c = this.outputLen;
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
      Ge.HashMD = Df;
      Object.defineProperty(Be, "__esModule", {
        value: true
      });
      Be.sha224 = Be.sha256 = Be.SHA256 = void 0;
      const bn = Ge, _e = wr, Uf = new Uint32Array([
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
      ]), De = new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]), Ue = new Uint32Array(64);
      class vr extends bn.HashMD {
        constructor() {
          super(64, 32, 8, false), this.A = De[0] | 0, this.B = De[1] | 0, this.C = De[2] | 0, this.D = De[3] | 0, this.E = De[4] | 0, this.F = De[5] | 0, this.G = De[6] | 0, this.H = De[7] | 0;
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
          for (let d = 0; d < 16; d++, n += 4) Ue[d] = e.getUint32(n, false);
          for (let d = 16; d < 64; d++) {
            const _ = Ue[d - 15], l = Ue[d - 2], b = (0, _e.rotr)(_, 7) ^ (0, _e.rotr)(_, 18) ^ _ >>> 3, v = (0, _e.rotr)(l, 17) ^ (0, _e.rotr)(l, 19) ^ l >>> 10;
            Ue[d] = v + Ue[d - 7] + b + Ue[d - 16] | 0;
          }
          let { A: r, B: s, C: i, D: o, E: a, F: c, G: f, H: u } = this;
          for (let d = 0; d < 64; d++) {
            const _ = (0, _e.rotr)(a, 6) ^ (0, _e.rotr)(a, 11) ^ (0, _e.rotr)(a, 25), l = u + _ + (0, bn.Chi)(a, c, f) + Uf[d] + Ue[d] | 0, v = ((0, _e.rotr)(r, 2) ^ (0, _e.rotr)(r, 13) ^ (0, _e.rotr)(r, 22)) + (0, bn.Maj)(r, s, i) | 0;
            u = f, f = c, c = a, a = o + l | 0, o = i, i = s, s = r, r = l + v | 0;
          }
          r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, f = f + this.G | 0, u = u + this.H | 0, this.set(r, s, i, o, a, c, f, u);
        }
        roundClean() {
          Ue.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
        }
      }
      Be.SHA256 = vr;
      class Pf extends vr {
        constructor() {
          super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
        }
      }
      Be.sha256 = (0, _e.wrapConstructor)(() => new vr());
      Be.sha224 = (0, _e.wrapConstructor)(() => new Pf());
      function $f(t) {
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
          for (var q = D - v; q !== D && E[q] === 0; ) q++;
          for (var W = a.repeat(b); q < D; ++q) W += t.charAt(E[q]);
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
          for (var q = j - S; q !== j && D[q] === 0; ) q++;
          for (var W = new Uint8Array(v + (j - q)), Y = v; q !== j; ) W[Y++] = D[q++];
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
      var Bf = $f;
      const Ff = Bf, Lf = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      var Hf = Ff(Lf), mn = Hf, Nf = function(t) {
        function e(i) {
          var o = Uint8Array.from(i), a = t(o), c = o.length + 4, f = new Uint8Array(c);
          return f.set(o, 0), f.set(a.subarray(0, 4), o.length), mn.encode(f, c);
        }
        function n(i) {
          var o = i.slice(0, -4), a = i.slice(-4), c = t(o);
          if (!(a[0] ^ c[0] | a[1] ^ c[1] | a[2] ^ c[2] | a[3] ^ c[3])) return o;
        }
        function r(i) {
          var o = mn.decodeUnsafe(i);
          if (o) return n(o);
        }
        function s(i) {
          var o = mn.decode(i), a = n(o);
          if (!a) throw new Error("Invalid checksum");
          return a;
        }
        return {
          encode: e,
          decode: s,
          decodeUnsafe: r
        };
      }, { sha256: Zr } = Be, zf = Nf;
      function Wf(t) {
        return Zr(Zr(t));
      }
      var Vf = zf(Wf);
      const ri = fr(Vf), xr = "automerge:", Sr = (t) => {
        const e = new RegExp(`^${xr}(\\w+)$`), [, n] = t.match(e) || [], r = n, s = oi(r);
        if (!s) throw new Error("Invalid document URL: " + t);
        return {
          binaryDocumentId: s,
          documentId: r
        };
      }, kr = (t) => {
        const e = t instanceof Uint8Array || typeof t == "string" ? t : "documentId" in t ? t.documentId : void 0, n = e instanceof Uint8Array ? Vn(e) : typeof e == "string" ? e : void 0;
        if (n === void 0) throw new Error("Invalid documentId: " + e);
        return xr + n;
      }, si = (t) => {
        if (!t || !t.startsWith(xr)) return false;
        const e = t;
        try {
          const { documentId: n } = Sr(e);
          return ii(n);
        } catch {
          return false;
        }
      }, ii = (t) => {
        const e = oi(t);
        if (e === void 0) return false;
        const n = Wa(e);
        return on(n);
      }, Kf = (t) => on(t), Jf = () => {
        const t = Es(null, new Uint8Array(16));
        return kr({
          documentId: t
        });
      }, oi = (t) => ri.decodeUnsafe(t), Vn = (t) => ri.encode(t), wn = (t) => {
        if (t instanceof Uint8Array) return Vn(t);
        if (si(t)) return Sr(t).documentId;
        if (ii(t)) return t;
        if (Kf(t)) {
          console.warn("Future versions will not support UUIDs as document IDs; use Automerge URLs instead.");
          const e = Va(t);
          return Vn(e);
        }
        throw new Error(`Invalid AutomergeUrl: '${t}'`);
      };
      let Kn;
      try {
        Kn = new TextDecoder();
      } catch {
      }
      let U, Ve, x = 0;
      const qf = 105, Gf = 57342, Yf = 57343, Qr = 57337, es = 6, Xe = {};
      let dt = 11281e4, Ce = 1681e4, V = {}, ee, Qt, en = 0, vt = 0, re, pe, te = [], Jn = [], ue, oe, ht, ts = {
        useRecords: false,
        mapsAsObjects: true
      }, xt = false, ai = 2;
      try {
        new Function("");
      } catch {
        ai = 1 / 0;
      }
      class St {
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
          return e.forEach((r, s) => n[ye(this._mapKey.has(s) ? this._mapKey.get(s) : s)] = r), n;
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
          if (U) return di(() => (Xn(), this ? this.decode(e, n) : St.prototype.decode.call(ts, e, n)));
          Ve = n > -1 ? n : e.length, x = 0, vt = 0, Qt = null, re = null, U = e;
          try {
            oe = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
          } catch (r) {
            throw U = null, e instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (e && typeof e == "object" ? e.constructor.name : typeof e));
          }
          if (this instanceof St) {
            if (V = this, ue = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues), this.structures) return ee = this.structures, Rt();
            (!ee || ee.length > 0) && (ee = []);
          } else V = ts, (!ee || ee.length > 0) && (ee = []), ue = null;
          return Rt();
        }
        decodeMultiple(e, n) {
          let r, s = 0;
          try {
            let i = e.length;
            xt = true;
            let o = this ? this.decode(e, i) : Ir.decode(e, i);
            if (n) {
              if (n(o) === false) return;
              for (; x < i; ) if (s = x, n(Rt()) === false) return;
            } else {
              for (r = [
                o
              ]; x < i; ) s = x, r.push(Rt());
              return r;
            }
          } catch (i) {
            throw i.lastPosition = s, i.values = r, i;
          } finally {
            xt = false, Xn();
          }
        }
      }
      function Rt() {
        try {
          let t = K();
          if (re) {
            if (x >= re.postBundlePosition) {
              let e = new Error("Unexpected bundle position");
              throw e.incomplete = true, e;
            }
            x = re.postBundlePosition, re = null;
          }
          if (x == Ve) ee = null, U = null, pe && (pe = null);
          else if (x > Ve) {
            let e = new Error("Unexpected end of CBOR data");
            throw e.incomplete = true, e;
          } else if (!xt) throw new Error("Data read, but end of buffer not reached");
          return t;
        } catch (t) {
          throw Xn(), (t instanceof RangeError || t.message.startsWith("Unexpected end of buffer")) && (t.incomplete = true), t;
        }
      }
      function K() {
        let t = U[x++], e = t >> 5;
        if (t = t & 31, t > 23) switch (t) {
          case 24:
            t = U[x++];
            break;
          case 25:
            if (e == 7) return eu();
            t = oe.getUint16(x), x += 2;
            break;
          case 26:
            if (e == 7) {
              let n = oe.getFloat32(x);
              if (V.useFloat32 > 2) {
                let r = Er[(U[x] & 127) << 1 | U[x + 1] >> 7];
                return x += 4, (r * n + (n > 0 ? 0.5 : -0.5) >> 0) / r;
              }
              return x += 4, n;
            }
            t = oe.getUint32(x), x += 4;
            break;
          case 27:
            if (e == 7) {
              let n = oe.getFloat64(x);
              return x += 8, n;
            }
            if (e > 1) {
              if (oe.getUint32(x) > 0) throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
              t = oe.getUint32(x + 4);
            } else V.int64AsNumber ? (t = oe.getUint32(x) * 4294967296, t += oe.getUint32(x + 4)) : t = oe.getBigUint64(x);
            x += 8;
            break;
          case 31:
            switch (e) {
              case 2:
              case 3:
                throw new Error("Indefinite length not supported for byte or text strings");
              case 4:
                let n = [], r, s = 0;
                for (; (r = K()) != Xe; ) {
                  if (s >= dt) throw new Error(`Array length exceeds ${dt}`);
                  n[s++] = r;
                }
                return e == 4 ? n : e == 3 ? n.join("") : Buffer.concat(n);
              case 5:
                let i;
                if (V.mapsAsObjects) {
                  let o = {}, a = 0;
                  if (V.keyMap) for (; (i = K()) != Xe; ) {
                    if (a++ >= Ce) throw new Error(`Property count exceeds ${Ce}`);
                    o[ye(V.decodeKey(i))] = K();
                  }
                  else for (; (i = K()) != Xe; ) {
                    if (a++ >= Ce) throw new Error(`Property count exceeds ${Ce}`);
                    o[ye(i)] = K();
                  }
                  return o;
                } else {
                  ht && (V.mapsAsObjects = true, ht = false);
                  let o = /* @__PURE__ */ new Map();
                  if (V.keyMap) {
                    let a = 0;
                    for (; (i = K()) != Xe; ) {
                      if (a++ >= Ce) throw new Error(`Map size exceeds ${Ce}`);
                      o.set(V.decodeKey(i), K());
                    }
                  } else {
                    let a = 0;
                    for (; (i = K()) != Xe; ) {
                      if (a++ >= Ce) throw new Error(`Map size exceeds ${Ce}`);
                      o.set(i, K());
                    }
                  }
                  return o;
                }
              case 7:
                return Xe;
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
            return Qf(t);
          case 3:
            if (vt >= x) return Qt.slice(x - en, (x += t) - en);
            if (vt == 0 && Ve < 140 && t < 32) {
              let s = t < 16 ? ci(t) : Zf(t);
              if (s != null) return s;
            }
            return Xf(t);
          case 4:
            if (t >= dt) throw new Error(`Array length exceeds ${dt}`);
            let n = new Array(t);
            for (let s = 0; s < t; s++) n[s] = K();
            return n;
          case 5:
            if (t >= Ce) throw new Error(`Map size exceeds ${dt}`);
            if (V.mapsAsObjects) {
              let s = {};
              if (V.keyMap) for (let i = 0; i < t; i++) s[ye(V.decodeKey(K()))] = K();
              else for (let i = 0; i < t; i++) s[ye(K())] = K();
              return s;
            } else {
              ht && (V.mapsAsObjects = true, ht = false);
              let s = /* @__PURE__ */ new Map();
              if (V.keyMap) for (let i = 0; i < t; i++) s.set(V.decodeKey(K()), K());
              else for (let i = 0; i < t; i++) s.set(K(), K());
              return s;
            }
          case 6:
            if (t >= Qr) {
              let s = ee[t & 8191];
              if (s) return s.read || (s.read = qn(s)), s.read();
              if (t < 65536) {
                if (t == Yf) {
                  let i = nt(), o = K(), a = K();
                  Yn(o, a);
                  let c = {};
                  if (V.keyMap) for (let f = 2; f < i; f++) {
                    let u = V.decodeKey(a[f - 2]);
                    c[ye(u)] = K();
                  }
                  else for (let f = 2; f < i; f++) {
                    let u = a[f - 2];
                    c[ye(u)] = K();
                  }
                  return c;
                } else if (t == Gf) {
                  let i = nt(), o = K();
                  for (let a = 2; a < i; a++) Yn(o++, K());
                  return K();
                } else if (t == Qr) return ou();
                if (V.getShared && (Ar(), s = ee[t & 8191], s)) return s.read || (s.read = qn(s)), s.read();
              }
            }
            let r = te[t];
            if (r) return r.handlesRead ? r(K) : r(K());
            {
              let s = K();
              for (let i = 0; i < Jn.length; i++) {
                let o = Jn[i](t, s);
                if (o !== void 0) return o;
              }
              return new qe(s, t);
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
                let s = (ue || He())[t];
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
      const ns = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
      function qn(t) {
        if (!t) throw new Error("Structure is required in record definition");
        function e() {
          let n = U[x++];
          if (n = n & 31, n > 23) switch (n) {
            case 24:
              n = U[x++];
              break;
            case 25:
              n = oe.getUint16(x), x += 2;
              break;
            case 26:
              n = oe.getUint32(x), x += 4;
              break;
            default:
              throw new Error("Expected array header, but got " + U[x - 1]);
          }
          let r = this.compiledReader;
          for (; r; ) {
            if (r.propertyCount === n) return r(K);
            r = r.next;
          }
          if (this.slowReads++ >= ai) {
            let i = this.length == n ? this : this.slice(0, n);
            return r = V.keyMap ? new Function("r", "return {" + i.map((o) => V.decodeKey(o)).map((o) => ns.test(o) ? ye(o) + ":r()" : "[" + JSON.stringify(o) + "]:r()").join(",") + "}") : new Function("r", "return {" + i.map((o) => ns.test(o) ? ye(o) + ":r()" : "[" + JSON.stringify(o) + "]:r()").join(",") + "}"), this.compiledReader && (r.next = this.compiledReader), r.propertyCount = n, this.compiledReader = r, r(K);
          }
          let s = {};
          if (V.keyMap) for (let i = 0; i < n; i++) s[ye(V.decodeKey(this[i]))] = K();
          else for (let i = 0; i < n; i++) s[ye(this[i])] = K();
          return s;
        }
        return t.slowReads = 0, e;
      }
      function ye(t) {
        if (typeof t == "string") return t === "__proto__" ? "__proto_" : t;
        if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
        if (t == null) return t + "";
        throw new Error("Invalid property name type " + typeof t);
      }
      let Xf = Gn;
      function Gn(t) {
        let e;
        if (t < 16 && (e = ci(t))) return e;
        if (t > 64 && Kn) return Kn.decode(U.subarray(x, x += t));
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
          r.length >= 4096 && (e += se.apply(String, r), r.length = 0);
        }
        return r.length > 0 && (e += se.apply(String, r)), e;
      }
      let se = String.fromCharCode;
      function Zf(t) {
        let e = x, n = new Array(t);
        for (let r = 0; r < t; r++) {
          const s = U[x++];
          if ((s & 128) > 0) {
            x = e;
            return;
          }
          n[r] = s;
        }
        return se.apply(String, n);
      }
      function ci(t) {
        if (t < 4) if (t < 2) {
          if (t === 0) return "";
          {
            let e = U[x++];
            if ((e & 128) > 1) {
              x -= 1;
              return;
            }
            return se(e);
          }
        } else {
          let e = U[x++], n = U[x++];
          if ((e & 128) > 0 || (n & 128) > 0) {
            x -= 2;
            return;
          }
          if (t < 3) return se(e, n);
          let r = U[x++];
          if ((r & 128) > 0) {
            x -= 3;
            return;
          }
          return se(e, n, r);
        }
        else {
          let e = U[x++], n = U[x++], r = U[x++], s = U[x++];
          if ((e & 128) > 0 || (n & 128) > 0 || (r & 128) > 0 || (s & 128) > 0) {
            x -= 4;
            return;
          }
          if (t < 6) {
            if (t === 4) return se(e, n, r, s);
            {
              let i = U[x++];
              if ((i & 128) > 0) {
                x -= 5;
                return;
              }
              return se(e, n, r, s, i);
            }
          } else if (t < 8) {
            let i = U[x++], o = U[x++];
            if ((i & 128) > 0 || (o & 128) > 0) {
              x -= 6;
              return;
            }
            if (t < 7) return se(e, n, r, s, i, o);
            let a = U[x++];
            if ((a & 128) > 0) {
              x -= 7;
              return;
            }
            return se(e, n, r, s, i, o, a);
          } else {
            let i = U[x++], o = U[x++], a = U[x++], c = U[x++];
            if ((i & 128) > 0 || (o & 128) > 0 || (a & 128) > 0 || (c & 128) > 0) {
              x -= 8;
              return;
            }
            if (t < 10) {
              if (t === 8) return se(e, n, r, s, i, o, a, c);
              {
                let f = U[x++];
                if ((f & 128) > 0) {
                  x -= 9;
                  return;
                }
                return se(e, n, r, s, i, o, a, c, f);
              }
            } else if (t < 12) {
              let f = U[x++], u = U[x++];
              if ((f & 128) > 0 || (u & 128) > 0) {
                x -= 10;
                return;
              }
              if (t < 11) return se(e, n, r, s, i, o, a, c, f, u);
              let d = U[x++];
              if ((d & 128) > 0) {
                x -= 11;
                return;
              }
              return se(e, n, r, s, i, o, a, c, f, u, d);
            } else {
              let f = U[x++], u = U[x++], d = U[x++], _ = U[x++];
              if ((f & 128) > 0 || (u & 128) > 0 || (d & 128) > 0 || (_ & 128) > 0) {
                x -= 12;
                return;
              }
              if (t < 14) {
                if (t === 12) return se(e, n, r, s, i, o, a, c, f, u, d, _);
                {
                  let l = U[x++];
                  if ((l & 128) > 0) {
                    x -= 13;
                    return;
                  }
                  return se(e, n, r, s, i, o, a, c, f, u, d, _, l);
                }
              } else {
                let l = U[x++], b = U[x++];
                if ((l & 128) > 0 || (b & 128) > 0) {
                  x -= 14;
                  return;
                }
                if (t < 15) return se(e, n, r, s, i, o, a, c, f, u, d, _, l, b);
                let v = U[x++];
                if ((v & 128) > 0) {
                  x -= 15;
                  return;
                }
                return se(e, n, r, s, i, o, a, c, f, u, d, _, l, b, v);
              }
            }
          }
        }
      }
      function Qf(t) {
        return V.copyBuffers ? Uint8Array.prototype.slice.call(U, x, x += t) : U.subarray(x, x += t);
      }
      let fi = new Float32Array(1), Mt = new Uint8Array(fi.buffer, 0, 4);
      function eu() {
        let t = U[x++], e = U[x++], n = (t & 127) >> 2;
        if (n === 31) return e || t & 3 ? NaN : t & 128 ? -1 / 0 : 1 / 0;
        if (n === 0) {
          let r = ((t & 3) << 8 | e) / 16777216;
          return t & 128 ? -r : r;
        }
        return Mt[3] = t & 128 | (n >> 1) + 56, Mt[2] = (t & 7) << 5 | e >> 3, Mt[1] = e << 5, Mt[0] = 0, fi[0];
      }
      new Array(4096);
      class qe {
        constructor(e, n) {
          this.value = e, this.tag = n;
        }
      }
      te[0] = (t) => new Date(t);
      te[1] = (t) => new Date(Math.round(t * 1e3));
      te[2] = (t) => {
        let e = BigInt(0);
        for (let n = 0, r = t.byteLength; n < r; n++) e = BigInt(t[n]) + (e << BigInt(8));
        return e;
      };
      te[3] = (t) => BigInt(-1) - te[2](t);
      te[4] = (t) => +(t[1] + "e" + t[0]);
      te[5] = (t) => t[1] * Math.exp(t[0] * Math.log(2));
      const Yn = (t, e) => {
        t = t - 57344;
        let n = ee[t];
        n && n.isShared && ((ee.restoreStructures || (ee.restoreStructures = []))[t] = n), ee[t] = e, e.read = qn(e);
      };
      te[qf] = (t) => {
        let e = t.length, n = t[1];
        Yn(t[0], n);
        let r = {};
        for (let s = 2; s < e; s++) {
          let i = n[s - 2];
          r[ye(i)] = t[s];
        }
        return r;
      };
      te[14] = (t) => re ? re[0].slice(re.position0, re.position0 += t) : new qe(t, 14);
      te[15] = (t) => re ? re[1].slice(re.position1, re.position1 += t) : new qe(t, 15);
      let tu = {
        Error,
        RegExp
      };
      te[27] = (t) => (tu[t[0]] || Error)(t[1], t[2]);
      const ui = (t) => {
        if (U[x++] != 132) {
          let n = new Error("Packed values structure must be followed by a 4 element array");
          throw U.length < x && (n.incomplete = true), n;
        }
        let e = t();
        if (!e || !e.length) {
          let n = new Error("Packed values structure must be followed by a 4 element array");
          throw n.incomplete = true, n;
        }
        return ue = ue ? e.concat(ue.slice(e.length)) : e, ue.prefixes = t(), ue.suffixes = t(), t();
      };
      ui.handlesRead = true;
      te[51] = ui;
      te[es] = (t) => {
        if (!ue) if (V.getShared) Ar();
        else return new qe(t, es);
        if (typeof t == "number") return ue[16 + (t >= 0 ? 2 * t : -2 * t - 1)];
        let e = new Error("No support for non-integer packed references yet");
        throw t === void 0 && (e.incomplete = true), e;
      };
      te[28] = (t) => {
        pe || (pe = /* @__PURE__ */ new Map(), pe.id = 0);
        let e = pe.id++, n = x, r = U[x], s;
        r >> 5 == 4 ? s = [] : s = {};
        let i = {
          target: s
        };
        pe.set(e, i);
        let o = t();
        return i.used ? (Object.getPrototypeOf(s) !== Object.getPrototypeOf(o) && (x = n, s = o, pe.set(e, {
          target: s
        }), o = t()), Object.assign(s, o)) : (i.target = o, o);
      };
      te[28].handlesRead = true;
      te[29] = (t) => {
        let e = pe.get(t);
        return e.used = true, e.target;
      };
      te[258] = (t) => new Set(t);
      (te[259] = (t) => (V.mapsAsObjects && (V.mapsAsObjects = false, ht = true), t())).handlesRead = true;
      function Ze(t, e) {
        return typeof t == "string" ? t + e : t instanceof Array ? t.concat(e) : Object.assign({}, t, e);
      }
      function He() {
        if (!ue) if (V.getShared) Ar();
        else throw new Error("No packed values available");
        return ue;
      }
      const nu = 1399353956;
      Jn.push((t, e) => {
        if (t >= 225 && t <= 255) return Ze(He().prefixes[t - 224], e);
        if (t >= 28704 && t <= 32767) return Ze(He().prefixes[t - 28672], e);
        if (t >= 1879052288 && t <= 2147483647) return Ze(He().prefixes[t - 1879048192], e);
        if (t >= 216 && t <= 223) return Ze(e, He().suffixes[t - 216]);
        if (t >= 27647 && t <= 28671) return Ze(e, He().suffixes[t - 27639]);
        if (t >= 1811940352 && t <= 1879048191) return Ze(e, He().suffixes[t - 1811939328]);
        if (t == nu) return {
          packedValues: ue,
          structures: ee.slice(0),
          version: e
        };
        if (t == 55799) return e;
      });
      const ru = new Uint8Array(new Uint16Array([
        1
      ]).buffer)[0] == 1, rs = [
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
      ], su = [
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
      for (let t = 0; t < rs.length; t++) iu(rs[t], su[t]);
      function iu(t, e) {
        let n = "get" + t.name.slice(0, -5), r;
        typeof t == "function" ? r = t.BYTES_PER_ELEMENT : t = null;
        for (let s = 0; s < 2; s++) {
          if (!s && r == 1) continue;
          let i = r == 2 ? 1 : r == 4 ? 2 : r == 8 ? 3 : 0;
          te[s ? e : e - 4] = r == 1 || s == ru ? (o) => {
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
      function ou() {
        let t = nt(), e = x + K();
        for (let r = 2; r < t; r++) {
          let s = nt();
          x += s;
        }
        let n = x;
        return x = e, re = [
          Gn(nt()),
          Gn(nt())
        ], re.position0 = 0, re.position1 = 0, re.postBundlePosition = x, x = n, K();
      }
      function nt() {
        let t = U[x++] & 31;
        if (t > 23) switch (t) {
          case 24:
            t = U[x++];
            break;
          case 25:
            t = oe.getUint16(x), x += 2;
            break;
          case 26:
            t = oe.getUint32(x), x += 4;
            break;
        }
        return t;
      }
      function Ar() {
        if (V.getShared) {
          let t = di(() => (U = null, V.getShared())) || {}, e = t.structures || [];
          V.sharedVersion = t.version, ue = V.sharedValues = t.packedValues, ee === true ? V.structures = ee = e : ee.splice.apply(ee, [
            0,
            e.length
          ].concat(e));
        }
      }
      function di(t) {
        let e = Ve, n = x, r = en, s = vt, i = Qt, o = pe, a = re, c = new Uint8Array(U.slice(0, Ve)), f = ee, u = V, d = xt, _ = t();
        return Ve = e, x = n, en = r, vt = s, Qt = i, pe = o, re = a, U = c, xt = d, ee = f, V = u, oe = new DataView(U.buffer, U.byteOffset, U.byteLength), _;
      }
      function Xn() {
        U = null, pe = null, ee = null;
      }
      const Er = new Array(147);
      for (let t = 0; t < 256; t++) Er[t] = +("1e" + Math.floor(45.15 - t * 0.30103));
      let Ir = new St({
        useRecords: false
      });
      const li = Ir.decode;
      Ir.decodeMultiple;
      let Ht;
      try {
        Ht = new TextEncoder();
      } catch {
      }
      let Zn, hi;
      const ln = typeof globalThis == "object" && globalThis.Buffer, Ct = typeof ln < "u", vn = Ct ? ln.allocUnsafeSlow : Uint8Array, ss = Ct ? ln : Uint8Array, is = 256, os = Ct ? 4294967296 : 2144337920;
      let xn, m, Q, g = 0, Pe, ne = null;
      const au = 61440, cu = /[\u0080-\uFFFF]/, le = Symbol("record-id");
      class _i extends St {
        constructor(e) {
          super(e), this.offset = 0;
          let n, r, s, i, o;
          e = e || {};
          let a = ss.prototype.utf8Write ? function(p, R, k) {
            return m.utf8Write(p, R, k);
          } : Ht && Ht.encodeInto ? function(p, R) {
            return Ht.encodeInto(p, m.subarray(R)).written;
          } : false, c = this, f = e.structures || e.saveStructures, u = e.maxSharedStructures;
          if (u == null && (u = f ? 128 : 0), u > 8190) throw new Error("Maximum maxSharedStructure is 8190");
          let d = e.sequential;
          d && (u = 0), this.structures || (this.structures = []), this.saveStructures && (this.saveShared = this.saveStructures);
          let _, l, b = e.sharedValues, v;
          if (b) {
            v = /* @__PURE__ */ Object.create(null);
            for (let p = 0, R = b.length; p < R; p++) v[b[p]] = p;
          }
          let S = [], j = 0, D = 0;
          this.mapEncode = function(p, R) {
            if (this._keyMap && !this._mapped) switch (p.constructor.name) {
              case "Array":
                p = p.map((k) => this.encodeKeys(k));
                break;
            }
            return this.encode(p, R);
          }, this.encode = function(p, R) {
            if (m || (m = new vn(8192), Q = new DataView(m.buffer, 0, 8192), g = 0), Pe = m.length - 10, Pe - g < 2048 ? (m = new vn(m.length), Q = new DataView(m.buffer, 0, m.length), Pe = m.length - 10, g = 0) : R === fs && (g = g + 7 & 2147483640), n = g, c.useSelfDescribedHeader && (Q.setUint32(g, 3654940416), g += 3), o = c.structuredClone ? /* @__PURE__ */ new Map() : null, c.bundleStrings && typeof p != "string" ? (ne = [], ne.size = 1 / 0) : ne = null, r = c.structures, r) {
              if (r.uninitialized) {
                let C = c.getShared() || {};
                c.structures = r = C.structures || [], c.sharedVersion = C.version;
                let O = c.sharedValues = C.packedValues;
                if (O) {
                  v = {};
                  for (let B = 0, F = O.length; B < F; B++) v[O[B]] = B;
                }
              }
              let k = r.length;
              if (k > u && !d && (k = u), !r.transitions) {
                r.transitions = /* @__PURE__ */ Object.create(null);
                for (let C = 0; C < k; C++) {
                  let O = r[C];
                  if (!O) continue;
                  let B, F = r.transitions;
                  for (let N = 0, z = O.length; N < z; N++) {
                    F[le] === void 0 && (F[le] = C);
                    let J = O[N];
                    B = F[J], B || (B = F[J] = /* @__PURE__ */ Object.create(null)), F = B;
                  }
                  F[le] = C | 1048576;
                }
              }
              d || (r.nextId = k);
            }
            if (s && (s = false), i = r || [], l = v, e.pack) {
              let k = /* @__PURE__ */ new Map();
              if (k.values = [], k.encoder = c, k.maxValues = e.maxPrivatePackedValues || (v ? 16 : 1 / 0), k.objectMap = v || false, k.samplingPackedValues = _, Nt(p, k), k.values.length > 0) {
                m[g++] = 216, m[g++] = 51, Se(4);
                let C = k.values;
                E(C), Se(0), Se(0), l = Object.create(v || null);
                for (let O = 0, B = C.length; O < B; O++) l[C[O]] = O;
              }
            }
            xn = R & kn;
            try {
              if (xn) return;
              if (E(p), ne && cs(n, E), c.offset = g, o && o.idsToInsert) {
                g += o.idsToInsert.length * 2, g > Pe && H(g), c.offset = g;
                let k = du(m.subarray(n, g), o.idsToInsert);
                return o = null, k;
              }
              return R & fs ? (m.start = n, m.end = g, m) : m.subarray(n, g);
            } finally {
              if (r) {
                if (D < 10 && D++, r.length > u && (r.length = u), j > 1e4) r.transitions = null, D = 0, j = 0, S.length > 0 && (S = []);
                else if (S.length > 0 && !d) {
                  for (let k = 0, C = S.length; k < C; k++) S[k][le] = void 0;
                  S = [];
                }
              }
              if (s && c.saveShared) {
                c.structures.length > u && (c.structures = c.structures.slice(0, u));
                let k = m.subarray(n, g);
                return c.updateSharedData() === false ? c.encode(p) : k;
              }
              R & lu && (g = n);
            }
          }, this.findCommonStringsToPack = () => (_ = /* @__PURE__ */ new Map(), v || (v = /* @__PURE__ */ Object.create(null)), (p) => {
            let R = p && p.threshold || 4, k = this.pack ? p.maxPrivatePackedValues || 16 : 0;
            b || (b = this.sharedValues = []);
            for (let [C, O] of _) O.count > R && (v[C] = k++, b.push(C), s = true);
            for (; this.saveShared && this.updateSharedData() === false; ) ;
            _ = null;
          });
          const E = (p) => {
            g > Pe && (m = H(g));
            var R = typeof p, k;
            if (R === "string") {
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
              if (ne && C >= 4 && C < 1024) {
                if ((ne.size += C) > au) {
                  let N, z = (ne[0] ? ne[0].length * 3 + ne[1].length : 0) + 10;
                  g + z > Pe && (m = H(g + z)), m[g++] = 217, m[g++] = 223, m[g++] = 249, m[g++] = ne.position ? 132 : 130, m[g++] = 26, N = g - n, g += 4, ne.position && cs(n, E), ne = [
                    "",
                    ""
                  ], ne.size = 0, ne.position = N;
                }
                let F = cu.test(p);
                ne[F ? 0 : 1] += p, m[g++] = F ? 206 : 207, E(C);
                return;
              }
              let O;
              C < 32 ? O = 1 : C < 256 ? O = 2 : C < 65536 ? O = 3 : O = 5;
              let B = C * 3;
              if (g + B > Pe && (m = H(g + B)), C < 64 || !a) {
                let F, N, z, J = g + O;
                for (F = 0; F < C; F++) N = p.charCodeAt(F), N < 128 ? m[J++] = N : N < 2048 ? (m[J++] = N >> 6 | 192, m[J++] = N & 63 | 128) : (N & 64512) === 55296 && ((z = p.charCodeAt(F + 1)) & 64512) === 56320 ? (N = 65536 + ((N & 1023) << 10) + (z & 1023), F++, m[J++] = N >> 18 | 240, m[J++] = N >> 12 & 63 | 128, m[J++] = N >> 6 & 63 | 128, m[J++] = N & 63 | 128) : (m[J++] = N >> 12 | 224, m[J++] = N >> 6 & 63 | 128, m[J++] = N & 63 | 128);
                k = J - g - O;
              } else k = a(p, g + O, B);
              k < 24 ? m[g++] = 96 | k : k < 256 ? (O < 2 && m.copyWithin(g + 2, g + 1, g + 1 + k), m[g++] = 120, m[g++] = k) : k < 65536 ? (O < 3 && m.copyWithin(g + 3, g + 2, g + 2 + k), m[g++] = 121, m[g++] = k >> 8, m[g++] = k & 255) : (O < 5 && m.copyWithin(g + 5, g + 3, g + 3 + k), m[g++] = 122, Q.setUint32(g, k), g += 4), g += k;
            } else if (R === "number") if (!this.alwaysUseFloat && p >>> 0 === p) p < 24 ? m[g++] = p : p < 256 ? (m[g++] = 24, m[g++] = p) : p < 65536 ? (m[g++] = 25, m[g++] = p >> 8, m[g++] = p & 255) : (m[g++] = 26, Q.setUint32(g, p), g += 4);
            else if (!this.alwaysUseFloat && p >> 0 === p) p >= -24 ? m[g++] = 31 - p : p >= -256 ? (m[g++] = 56, m[g++] = ~p) : p >= -65536 ? (m[g++] = 57, Q.setUint16(g, ~p), g += 2) : (m[g++] = 58, Q.setUint32(g, ~p), g += 4);
            else {
              let C;
              if ((C = this.useFloat32) > 0 && p < 4294967296 && p >= -2147483648) {
                m[g++] = 250, Q.setFloat32(g, p);
                let O;
                if (C < 4 || (O = p * Er[(m[g] & 127) << 1 | m[g + 1] >> 7]) >> 0 === O) {
                  g += 4;
                  return;
                } else g--;
              }
              m[g++] = 251, Q.setFloat64(g, p), g += 8;
            }
            else if (R === "object") if (!p) m[g++] = 246;
            else {
              if (o) {
                let O = o.get(p);
                if (O) {
                  if (m[g++] = 216, m[g++] = 29, m[g++] = 25, !O.references) {
                    let B = o.idsToInsert || (o.idsToInsert = []);
                    O.references = [], B.push(O);
                  }
                  O.references.push(g - n), g += 2;
                  return;
                } else o.set(p, {
                  offset: g - n
                });
              }
              let C = p.constructor;
              if (C === Object) L(p);
              else if (C === Array) {
                k = p.length, k < 24 ? m[g++] = 128 | k : Se(k);
                for (let O = 0; O < k; O++) E(p[O]);
              } else if (C === Map) if ((this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) && (m[g++] = 217, m[g++] = 1, m[g++] = 3), k = p.size, k < 24 ? m[g++] = 160 | k : k < 256 ? (m[g++] = 184, m[g++] = k) : k < 65536 ? (m[g++] = 185, m[g++] = k >> 8, m[g++] = k & 255) : (m[g++] = 186, Q.setUint32(g, k), g += 4), c.keyMap) for (let [O, B] of p) E(c.encodeKey(O)), E(B);
              else for (let [O, B] of p) E(O), E(B);
              else {
                for (let O = 0, B = Zn.length; O < B; O++) {
                  let F = hi[O];
                  if (p instanceof F) {
                    let N = Zn[O], z = N.tag;
                    z == null && (z = N.getTag && N.getTag.call(this, p)), z < 24 ? m[g++] = 192 | z : z < 256 ? (m[g++] = 216, m[g++] = z) : z < 65536 ? (m[g++] = 217, m[g++] = z >> 8, m[g++] = z & 255) : z > -1 && (m[g++] = 218, Q.setUint32(g, z), g += 4), N.encode.call(this, p, E, H);
                    return;
                  }
                }
                if (p[Symbol.iterator]) {
                  if (xn) {
                    let O = new Error("Iterable should be serialized as iterator");
                    throw O.iteratorNotHandled = true, O;
                  }
                  m[g++] = 159;
                  for (let O of p) E(O);
                  m[g++] = 255;
                  return;
                }
                if (p[Symbol.asyncIterator] || Sn(p)) {
                  let O = new Error("Iterable/blob should be serialized as iterator");
                  throw O.iteratorNotHandled = true, O;
                }
                if (this.useToJSON && p.toJSON) {
                  const O = p.toJSON();
                  if (O !== p) return E(O);
                }
                L(p);
              }
            }
            else if (R === "boolean") m[g++] = p ? 245 : 244;
            else if (R === "bigint") {
              if (p < BigInt(1) << BigInt(64) && p >= 0) m[g++] = 27, Q.setBigUint64(g, p);
              else if (p > -(BigInt(1) << BigInt(64)) && p < 0) m[g++] = 59, Q.setBigUint64(g, -p - BigInt(1));
              else if (this.largeBigIntToFloat) m[g++] = 251, Q.setFloat64(g, Number(p));
              else {
                p >= BigInt(0) ? m[g++] = 194 : (m[g++] = 195, p = BigInt(-1) - p);
                let C = [];
                for (; p; ) C.push(Number(p & BigInt(255))), p >>= BigInt(8);
                Qn(new Uint8Array(C.reverse()), H);
                return;
              }
              g += 8;
            } else if (R === "undefined") m[g++] = 247;
            else throw new Error("Unknown type: " + R);
          }, L = this.useRecords === false ? this.variableMapSize ? (p) => {
            let R = Object.keys(p), k = Object.values(p), C = R.length;
            if (C < 24 ? m[g++] = 160 | C : C < 256 ? (m[g++] = 184, m[g++] = C) : C < 65536 ? (m[g++] = 185, m[g++] = C >> 8, m[g++] = C & 255) : (m[g++] = 186, Q.setUint32(g, C), g += 4), c.keyMap) for (let O = 0; O < C; O++) E(c.encodeKey(R[O])), E(k[O]);
            else for (let O = 0; O < C; O++) E(R[O]), E(k[O]);
          } : (p) => {
            m[g++] = 185;
            let R = g - n;
            g += 2;
            let k = 0;
            if (c.keyMap) for (let C in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(C)) && (E(c.encodeKey(C)), E(p[C]), k++);
            else for (let C in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(C)) && (E(C), E(p[C]), k++);
            m[R++ + n] = k >> 8, m[R + n] = k & 255;
          } : (p, R) => {
            let k, C = i.transitions || (i.transitions = /* @__PURE__ */ Object.create(null)), O = 0, B = 0, F, N;
            if (this.keyMap) {
              N = Object.keys(p).map((J) => this.encodeKey(J)), B = N.length;
              for (let J = 0; J < B; J++) {
                let Mr = N[J];
                k = C[Mr], k || (k = C[Mr] = /* @__PURE__ */ Object.create(null), O++), C = k;
              }
            } else for (let J in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(J)) && (k = C[J], k || (C[le] & 1048576 && (F = C[le] & 65535), k = C[J] = /* @__PURE__ */ Object.create(null), O++), C = k, B++);
            let z = C[le];
            if (z !== void 0) z &= 65535, m[g++] = 217, m[g++] = z >> 8 | 224, m[g++] = z & 255;
            else if (N || (N = C.__keys__ || (C.__keys__ = Object.keys(p))), F === void 0 ? (z = i.nextId++, z || (z = 0, i.nextId = 1), z >= is && (i.nextId = (z = u) + 1)) : z = F, i[z] = N, z < u) {
              m[g++] = 217, m[g++] = z >> 8 | 224, m[g++] = z & 255, C = i.transitions;
              for (let J = 0; J < B; J++) (C[le] === void 0 || C[le] & 1048576) && (C[le] = z), C = C[N[J]];
              C[le] = z | 1048576, s = true;
            } else {
              if (C[le] = z, Q.setUint32(g, 3655335680), g += 3, O && (j += D * O), S.length >= is - u && (S.shift()[le] = void 0), S.push(C), Se(B + 2), E(57344 + z), E(N), R) return;
              for (let J in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(J)) && E(p[J]);
              return;
            }
            if (B < 24 ? m[g++] = 128 | B : Se(B), !R) for (let J in p) (typeof p.hasOwnProperty != "function" || p.hasOwnProperty(J)) && E(p[J]);
          }, H = (p) => {
            let R;
            if (p > 16777216) {
              if (p - n > os) throw new Error("Encoded buffer would be larger than maximum buffer size");
              R = Math.min(os, Math.round(Math.max((p - n) * (p > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
            } else R = (Math.max(p - n << 2, m.length - 1) >> 12) + 1 << 12;
            let k = new vn(R);
            return Q = new DataView(k.buffer, 0, R), m.copy ? m.copy(k, 0, n, p) : k.set(m.slice(n, p)), g -= n, n = 0, Pe = k.length - 10, m = k;
          };
          let $ = 100, q = 1e3;
          this.encodeAsIterable = function(p, R) {
            return I(p, R, W);
          }, this.encodeAsAsyncIterable = function(p, R) {
            return I(p, R, P);
          };
          function* W(p, R, k) {
            let C = p.constructor;
            if (C === Object) {
              let O = c.useRecords !== false;
              O ? L(p, true) : as(Object.keys(p).length, 160);
              for (let B in p) {
                let F = p[B];
                O || E(B), F && typeof F == "object" ? R[B] ? yield* W(F, R[B]) : yield* Y(F, R, B) : E(F);
              }
            } else if (C === Array) {
              let O = p.length;
              Se(O);
              for (let B = 0; B < O; B++) {
                let F = p[B];
                F && (typeof F == "object" || g - n > $) ? R.element ? yield* W(F, R.element) : yield* Y(F, R, "element") : E(F);
              }
            } else if (p[Symbol.iterator] && !p.buffer) {
              m[g++] = 159;
              for (let O of p) O && (typeof O == "object" || g - n > $) ? R.element ? yield* W(O, R.element) : yield* Y(O, R, "element") : E(O);
              m[g++] = 255;
            } else Sn(p) ? (as(p.size, 64), yield m.subarray(n, g), yield p, Z()) : p[Symbol.asyncIterator] ? (m[g++] = 159, yield m.subarray(n, g), yield p, Z(), m[g++] = 255) : E(p);
            k && g > n ? yield m.subarray(n, g) : g - n > $ && (yield m.subarray(n, g), Z());
          }
          function* Y(p, R, k) {
            let C = g - n;
            try {
              E(p), g - n > $ && (yield m.subarray(n, g), Z());
            } catch (O) {
              if (O.iteratorNotHandled) R[k] = {}, g = n + C, yield* W.call(this, p, R[k]);
              else throw O;
            }
          }
          function Z() {
            $ = q, c.encode(null, kn);
          }
          function I(p, R, k) {
            return R && R.chunkThreshold ? $ = q = R.chunkThreshold : $ = 100, p && typeof p == "object" ? (c.encode(null, kn), k(p, c.iterateProperties || (c.iterateProperties = {}), true)) : [
              c.encode(p)
            ];
          }
          async function* P(p, R) {
            for (let k of W(p, R, true)) {
              let C = k.constructor;
              if (C === ss || C === Uint8Array) yield k;
              else if (Sn(k)) {
                let O = k.stream().getReader(), B;
                for (; !(B = await O.read()).done; ) yield B.value;
              } else if (k[Symbol.asyncIterator]) for await (let O of k) Z(), O ? yield* P(O, R.async || (R.async = {})) : yield c.encode(O);
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
          let n = this.structures.slice(0), r = new gi(n, this.sharedValues, this.sharedVersion), s = this.saveShared(r, (i) => (i && i.version || 0) == e);
          return s === false ? (r = this.getShared() || {}, this.structures = r.structures || [], this.sharedValues = r.packedValues, this.sharedVersion = r.version, this.structures.nextId = this.structures.length) : n.forEach((i, o) => this.structures[o] = i), s;
        }
      }
      function as(t, e) {
        t < 24 ? m[g++] = e | t : t < 256 ? (m[g++] = e | 24, m[g++] = t) : t < 65536 ? (m[g++] = e | 25, m[g++] = t >> 8, m[g++] = t & 255) : (m[g++] = e | 26, Q.setUint32(g, t), g += 4);
      }
      class gi {
        constructor(e, n, r) {
          this.structures = e, this.packedValues = n, this.version = r;
        }
      }
      function Se(t) {
        t < 24 ? m[g++] = 128 | t : t < 256 ? (m[g++] = 152, m[g++] = t) : t < 65536 ? (m[g++] = 153, m[g++] = t >> 8, m[g++] = t & 255) : (m[g++] = 154, Q.setUint32(g, t), g += 4);
      }
      const fu = typeof Blob > "u" ? function() {
      } : Blob;
      function Sn(t) {
        if (t instanceof fu) return true;
        let e = t[Symbol.toStringTag];
        return e === "Blob" || e === "File";
      }
      function Nt(t, e) {
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
            if (t) if (t instanceof Array) for (let r = 0, s = t.length; r < s; r++) Nt(t[r], e);
            else {
              let r = !e.encoder.useRecords;
              for (var n in t) t.hasOwnProperty(n) && (r && Nt(n, e), Nt(t[n], e));
            }
            break;
          case "function":
            console.log(t);
        }
      }
      const uu = new Uint8Array(new Uint16Array([
        1
      ]).buffer)[0] == 1;
      hi = [
        Date,
        Set,
        Error,
        RegExp,
        qe,
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
        gi
      ];
      Zn = [
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
            Qn(t, n);
          }
        },
        {
          getTag(t) {
            if (t.constructor === Uint8Array && (this.tagUint8Array || Ct && this.tagUint8Array !== false)) return 64;
          },
          encode(t, e, n) {
            Qn(t, n);
          }
        },
        ve(68, 1),
        ve(69, 2),
        ve(70, 4),
        ve(71, 8),
        ve(72, 1),
        ve(77, 2),
        ve(78, 4),
        ve(79, 8),
        ve(85, 4),
        ve(86, 8),
        {
          encode(t, e) {
            let n = t.packedValues || [], r = t.structures || [];
            if (n.values.length > 0) {
              m[g++] = 216, m[g++] = 51, Se(4);
              let s = n.values;
              e(s), Se(0), Se(0), packedObjectMap = Object.create(sharedPackedObjectMap || null);
              for (let i = 0, o = s.length; i < o; i++) packedObjectMap[s[i]] = i;
            }
            if (r) {
              Q.setUint32(g, 3655335424), g += 3;
              let s = r.slice(0);
              s.unshift(57344), s.push(new qe(t.version, 1399353956)), e(s);
            } else e(new qe(t.version, 1399353956));
          }
        }
      ];
      function ve(t, e) {
        return !uu && e > 1 && (t -= 4), {
          tag: t,
          encode: function(r, s) {
            let i = r.byteLength, o = r.byteOffset || 0, a = r.buffer || r;
            s(Ct ? ln.from(a, o, i) : new Uint8Array(a, o, i));
          }
        };
      }
      function Qn(t, e) {
        let n = t.byteLength;
        n < 24 ? m[g++] = 64 + n : n < 256 ? (m[g++] = 88, m[g++] = n) : n < 65536 ? (m[g++] = 89, m[g++] = n >> 8, m[g++] = n & 255) : (m[g++] = 90, Q.setUint32(g, n), g += 4), g + n >= m.length && e(g + n), m.set(t.buffer ? t : new Uint8Array(t), g), g += n;
      }
      function du(t, e) {
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
      function cs(t, e) {
        Q.setUint32(ne.position + t, g - ne.position - t + 1);
        let n = ne;
        ne = null, e(n[0]), e(n[1]);
      }
      let Cr = new _i({
        useRecords: false
      });
      Cr.encode;
      Cr.encodeAsIterable;
      Cr.encodeAsAsyncIterable;
      const fs = 512, lu = 1024, kn = 2048;
      function pi(t) {
        return new _i({
          tagUint8Array: false,
          useRecords: false
        }).encode(t);
      }
      function hu(t) {
        return li(t);
      }
      const _u = (t, e) => t.length === e.length && t.every((n, r) => n === e[r]), Or = (t, e) => _u(t, e), gu = async (t, e) => {
        let n;
        const r = new Promise((s, i) => {
          n = setTimeout(() => i(new pu(`withTimeout: timed out after ${e}ms`)), e);
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
      class pu extends Error {
        constructor(e) {
          super(e), this.name = "TimeoutError";
        }
      }
      class yu extends ct {
        constructor(e, n = {}) {
          super();
          __privateAdd(this, _yu_instances);
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
          s ? (r = lc(n.initialValue), r = nc(r)) : r = cn(), __privateSet(this, _t2, je(`automerge-repo:dochandle:${this.documentId.slice(0, 5)}`));
          const i = __privateGet(this, _r2), o = Af({
            types: {
              context: {},
              events: {}
            },
            actions: {
              onUpdate: zn(({ context: a, event: c }) => {
                const f = a.doc;
                vf(c, Dt);
                const { callback: u } = c.payload;
                return {
                  doc: u(f)
                };
              }),
              onDelete: zn(() => (this.emit("delete", {
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
          __privateSet(this, _e2, wt(o)), __privateGet(this, _e2).subscribe((a) => {
            const c = __privateGet(this, _n2), f = a.context.doc;
            __privateGet(this, _t2).call(this, `\u2192 ${a.value} %o`, f), __privateMethod(this, _yu_instances, c_fn).call(this, c, f);
          }), __privateGet(this, _e2).start(), __privateGet(this, _e2).send(s ? {
            type: mu
          } : {
            type: wu
          });
        }
        get url() {
          return kr({
            documentId: this.documentId
          });
        }
        get state() {
          return __privateGet(this, _e2).getSnapshot().value;
        }
        async whenReady(e = [
          "ready"
        ]) {
          await gu(__privateMethod(this, _yu_instances, o_fn).call(this, e), __privateGet(this, _r2));
        }
        async doc(e = [
          "ready",
          "unavailable"
        ]) {
          try {
            await __privateMethod(this, _yu_instances, o_fn).call(this, e);
          } catch {
            return;
          }
          return this.isUnavailable() ? void 0 : __privateGet(this, _yu_instances, i_get);
        }
        docSync() {
          if (this.isReady()) return __privateGet(this, _yu_instances, i_get);
        }
        heads() {
          if (this.isReady()) return we(__privateGet(this, _yu_instances, i_get));
        }
        update(e) {
          __privateGet(this, _e2).send({
            type: Dt,
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
            type: Dt,
            payload: {
              callback: (r) => ec(r, n, e)
            }
          });
        }
        changeAt(e, n, r = {}) {
          if (!this.isReady()) throw new Error(`DocHandle#${this.documentId} is not ready. Check \`handle.isReady()\` before accessing the document.`);
          let s;
          return __privateGet(this, _e2).send({
            type: Dt,
            payload: {
              callback: (i) => {
                const o = tc(i, e, r, n);
                return s = o.newHeads || void 0, o.newDoc;
              }
            }
          }), s;
        }
        merge(e) {
          if (!this.isReady() || !e.isReady()) throw new Error("Both handles must be ready to merge");
          const n = e.docSync();
          if (!n) throw new Error("The document to be merged in is falsy, aborting.");
          this.update((r) => sc(r, n));
        }
        unavailable() {
          __privateGet(this, _e2).send({
            type: Eu
          });
        }
        request() {
          __privateGet(this, _yu_instances, a_get) === "loading" && __privateGet(this, _e2).send({
            type: vu
          });
        }
        awaitNetwork() {
          __privateGet(this, _yu_instances, a_get) === "loading" && __privateGet(this, _e2).send({
            type: Su
          });
        }
        networkReady() {
          __privateGet(this, _yu_instances, a_get) === "awaitingNetwork" && __privateGet(this, _e2).send({
            type: ku
          });
        }
        delete() {
          __privateGet(this, _e2).send({
            type: Au
          });
        }
        broadcast(e) {
          this.emit("ephemeral-message-outbound", {
            handle: this,
            data: pi(e)
          });
        }
      }
      _t2 = new WeakMap();
      _e2 = new WeakMap();
      _n2 = new WeakMap();
      _r2 = new WeakMap();
      _s2 = new WeakMap();
      _yu_instances = new WeakSet();
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
        return If(__privateGet(this, _e2), (r) => n.some((s) => r.matches(s)), {
          timeout: __privateGet(this, _r2) * 2
        });
      };
      c_fn = function(e, n) {
        if (n && e && !Or(we(n), we(e))) {
          this.emit("heads-changed", {
            handle: this,
            doc: n
          });
          const s = ic(n, we(e), we(n));
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
            type: xu
          });
        }
        __privateSet(this, _n2, n);
      };
      const bu = {
        IDLE: "idle",
        LOADING: "loading",
        AWAITING_NETWORK: "awaitingNetwork",
        REQUESTING: "requesting",
        READY: "ready",
        DELETED: "deleted",
        UNAVAILABLE: "unavailable"
      }, { IDLE: dh, LOADING: lh, AWAITING_NETWORK: hh, REQUESTING: jt, READY: An, DELETED: _h, UNAVAILABLE: us } = bu, mu = "CREATE", wu = "FIND", vu = "REQUEST", xu = "DOC_READY", Su = "AWAIT_NETWORK", ku = "NETWORK_READY", Dt = "UPDATE", Au = "DELETE", Eu = "DOC_UNAVAILABLE";
      class Iu extends ct {
        constructor() {
          super(...arguments);
          __privateAdd(this, _Iu_instances);
          __privateAdd(this, _t3, /* @__PURE__ */ new Map());
          __privateAdd(this, _e3, /* @__PURE__ */ new Set());
          __privateAdd(this, _n3, /* @__PURE__ */ new Map());
          __privateAdd(this, _r3, /* @__PURE__ */ new Set());
          __privateAdd(this, _s3, /* @__PURE__ */ new Map());
          __privateAdd(this, _i2, je("automerge-repo:remote-heads-subscriptions"));
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
          const n = __privateMethod(this, _Iu_instances, o_fn2).call(this, e);
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
            if (s) for (const i of s) __privateMethod(this, _Iu_instances, a_fn).call(this, i, r.documentId) && this.emit("notify-remote-heads", {
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
          if (o) for (const a of o) __privateMethod(this, _Iu_instances, a_fn).call(this, a, e) && this.emit("notify-remote-heads", {
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
      _Iu_instances = new WeakSet();
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
      const er = (t, e) => {
        let n = Date.now(), r, s;
        return function(...i) {
          r = n + e - Date.now(), clearTimeout(s), s = setTimeout(() => {
            t(...i), n = Date.now();
          }, r);
        };
      }, Cu = (t) => Tu(t) || bi(t) || yi(t) || Ou(t) || Ru(t) || Mu(t), Ou = (t) => t.type === "doc-unavailable", yi = (t) => t.type === "request", Tu = (t) => t.type === "sync", bi = (t) => t.type === "ephemeral", Ru = (t) => t.type === "remote-subscription-change", Mu = (t) => t.type === "remote-heads-changed", ju = (t) => `${t.senderId}:${t.sessionId}`;
      class Du extends ct {
        constructor(e, n = Uu(), r) {
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
          this.peerId = n, this.peerMetadata = r, __privateSet(this, _t4, je(`automerge-repo:network:${this.peerId}`)), e.forEach((s) => this.addNetworkAdapter(s));
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
            if (!Cu(n)) {
              __privateGet(this, _t4).call(this, `invalid message: ${JSON.stringify(n)}`);
              return;
            }
            if (__privateGet(this, _t4).call(this, `message from ${n.senderId}`), bi(n)) {
              const r = ju(n);
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
      function Uu() {
        return `user-${Math.round(Math.random() * 1e5)}`;
      }
      function mi(t) {
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
      var wi = {
        exports: {}
      };
      (function(t) {
        (function(e, n) {
          var r = {};
          n(r);
          var s = r.default;
          for (var i in r) s[i] = r[i];
          t.exports = s;
        })(_c, function(e) {
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
            for (var j, D, E, L, H, $, q, W, Y, Z, I, P, p; S >= 64; ) {
              for (j = l[0], D = l[1], E = l[2], L = l[3], H = l[4], $ = l[5], q = l[6], W = l[7], Z = 0; Z < 16; Z++) I = v + Z * 4, _[Z] = (b[I] & 255) << 24 | (b[I + 1] & 255) << 16 | (b[I + 2] & 255) << 8 | b[I + 3] & 255;
              for (Z = 16; Z < 64; Z++) Y = _[Z - 2], P = (Y >>> 17 | Y << 15) ^ (Y >>> 19 | Y << 13) ^ Y >>> 10, Y = _[Z - 15], p = (Y >>> 7 | Y << 25) ^ (Y >>> 18 | Y << 14) ^ Y >>> 3, _[Z] = (P + _[Z - 7] | 0) + (p + _[Z - 16] | 0);
              for (Z = 0; Z < 64; Z++) P = (((H >>> 6 | H << 26) ^ (H >>> 11 | H << 21) ^ (H >>> 25 | H << 7)) + (H & $ ^ ~H & q) | 0) + (W + (n[Z] + _[Z] | 0) | 0) | 0, p = ((j >>> 2 | j << 30) ^ (j >>> 13 | j << 19) ^ (j >>> 22 | j << 10)) + (j & D ^ j & E ^ D & E) | 0, W = q, q = $, $ = H, H = L + P | 0, L = E, E = D, D = j, j = P + p | 0;
              l[0] += j, l[1] += D, l[2] += E, l[3] += L, l[4] += H, l[5] += $, l[6] += q, l[7] += W, v += 64, S -= 64;
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
              var q = $ + 1;
              D[0] = q >>> 24 & 255, D[1] = q >>> 16 & 255, D[2] = q >>> 8 & 255, D[3] = q >>> 0 & 255, S.reset(), S.update(l), S.update(D), S.finish(L);
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
      })(wi);
      var Pu = wi.exports;
      function vi(t) {
        const e = Pu.hash(t);
        return Bu(e);
      }
      function $u(t) {
        const e = new TextEncoder(), n = mi(t.map((r) => e.encode(r)));
        return vi(n);
      }
      function Bu(t) {
        return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
      }
      function Fu(t) {
        if (t.length < 2) return null;
        const e = t[t.length - 2];
        return e === "snapshot" || e === "incremental" ? e : null;
      }
      class Lu {
        constructor(e) {
          __privateAdd(this, _Lu_instances);
          __privateAdd(this, _t5);
          __privateAdd(this, _e5, /* @__PURE__ */ new Map());
          __privateAdd(this, _n5, /* @__PURE__ */ new Map());
          __privateAdd(this, _r5, false);
          __privateAdd(this, _s5, je("automerge-repo:storage-subsystem"));
          __privateSet(this, _t5, e);
        }
        async id() {
          const e = await __privateGet(this, _t5).load([
            "storage-adapter-id"
          ]);
          let n;
          return e ? n = new TextDecoder().decode(e) : (n = Es(), await __privateGet(this, _t5).save([
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
            const c = Fu(a.key);
            c != null && (s.push({
              key: a.key,
              type: c,
              size: a.data.length
            }), r.push(a.data));
          }
          __privateGet(this, _n5).set(e, s);
          const i = mi(r);
          if (i.length === 0) return null;
          const o = Ts(cn(), i);
          return __privateGet(this, _e5).set(e, we(o)), o;
        }
        async saveDoc(e, n) {
          if (!__privateMethod(this, _Lu_instances, o_fn3).call(this, e, n)) return;
          const r = __privateGet(this, _n5).get(e) ?? [];
          __privateMethod(this, _Lu_instances, c_fn2).call(this, r) ? await __privateMethod(this, _Lu_instances, a_fn2).call(this, e, n, r) : await __privateMethod(this, _Lu_instances, i_fn).call(this, e, n), __privateGet(this, _e5).set(e, we(n));
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
          return s ? js(s) : void 0;
        }
        async saveSyncState(e, n, r) {
          const s = [
            e,
            "sync-state",
            n
          ];
          await __privateGet(this, _t5).save(s, Ms(r));
        }
      }
      _t5 = new WeakMap();
      _e5 = new WeakMap();
      _n5 = new WeakMap();
      _r5 = new WeakMap();
      _s5 = new WeakMap();
      _Lu_instances = new WeakSet();
      i_fn = async function(e, n) {
        const r = dc(n, __privateGet(this, _e5).get(e) ?? []);
        if (r && r.length > 0) {
          const s = [
            e,
            "incremental",
            vi(r)
          ];
          __privateGet(this, _s5).call(this, `Saving incremental ${s} for document ${e}`), await __privateGet(this, _t5).save(s, r), __privateGet(this, _n5).has(e) || __privateGet(this, _n5).set(e, []), __privateGet(this, _n5).get(e).push({
            key: s,
            type: "incremental",
            size: r.length
          }), __privateGet(this, _e5).set(e, we(n));
        } else return Promise.resolve();
      };
      a_fn2 = async function(e, n, r) {
        var _a5;
        __privateSet(this, _r5, true);
        const s = Rs(n), i = $u(we(n)), o = [
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
        const s = we(n);
        return !Or(s, r);
      };
      c_fn2 = function(e) {
        if (__privateGet(this, _r5)) return false;
        let n = 0, r = 0;
        for (const s of e) s.type === "snapshot" ? n += s.size : r += s.size;
        return n < 1024 || r >= n;
      };
      class xi extends ct {
      }
      class Hu extends xi {
        constructor({ handle: e, onLoadSyncState: n }) {
          super();
          __privateAdd(this, _Hu_instances);
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
          __privateSet(this, _t6, je(`automerge-repo:docsync:${r}`)), e.on("change", er(() => __privateMethod(this, _Hu_instances, g_fn).call(this), this.syncDebounceRate)), e.on("ephemeral-message-outbound", (s) => __privateMethod(this, _Hu_instances, p_fn).call(this, s)), (async () => (await e.doc([
            An,
            jt
          ]), __privateMethod(this, _Hu_instances, __fn).call(this)))();
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
            An,
            jt,
            us
          ]).then((s) => {
            if (__privateSet(this, _a3, true), __privateMethod(this, _Hu_instances, f_fn).call(this), !(s === void 0 && n)) return s ?? cn();
          });
          __privateGet(this, _t6).call(this, `beginSync: ${e.join(", ")}`), e.forEach((s) => {
            __privateMethod(this, _Hu_instances, u_fn).call(this, s, (i) => {
              const o = js(Ms(i));
              __privateMethod(this, _Hu_instances, d_fn).call(this, s, o), r.then((a) => {
                a && __privateMethod(this, _Hu_instances, l_fn).call(this, s, a);
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
              __privateGet(this, _r6)[e.senderId] = "unavailable", __privateMethod(this, _Hu_instances, f_fn).call(this);
              break;
            default:
              throw new Error(`unknown message type: ${e}`);
          }
        }
        receiveEphemeralMessage(e) {
          if (e.documentId !== __privateGet(this, _o2).documentId) throw new Error("channelId doesn't match documentId");
          const { senderId: n, data: r } = e, s = li(new Uint8Array(r));
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
            An,
            jt,
            us
          ])) {
            __privateGet(this, _i4).push({
              message: e,
              received: /* @__PURE__ */ new Date()
            });
            return;
          }
          __privateMethod(this, _Hu_instances, __fn).call(this), __privateMethod(this, _Hu_instances, h_fn).call(this, e);
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
      _Hu_instances = new WeakSet();
      g_fn = async function() {
        __privateGet(this, _t6).call(this, "syncWithPeers");
        const e = await __privateGet(this, _o2).doc();
        e !== void 0 && __privateGet(this, _e6).forEach((n) => __privateMethod(this, _Hu_instances, l_fn).call(this, n, e));
      };
      p_fn = async function({ data: e }) {
        __privateGet(this, _t6).call(this, "broadcastToPeers", __privateGet(this, _e6)), __privateGet(this, _e6).forEach((n) => __privateMethod(this, _Hu_instances, y_fn).call(this, n, e));
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
        __privateMethod(this, _Hu_instances, b_fn).call(this, e), e in __privateGet(this, _r6) || (__privateGet(this, _r6)[e] = "unknown");
        const r = __privateGet(this, _s6)[e];
        if (r) {
          n(r);
          return;
        }
        let s = __privateGet(this, _n6)[e];
        s || (__privateGet(this, _c2).call(this, e).then((i) => {
          __privateMethod(this, _Hu_instances, m_fn).call(this, e, i ?? fc());
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
        __privateGet(this, _t6).call(this, `sendSyncMessage ->${e}`), __privateMethod(this, _Hu_instances, u_fn).call(this, e, (r) => {
          const [s, i] = ac(n, r);
          if (i) {
            __privateMethod(this, _Hu_instances, d_fn).call(this, e, s);
            const o = we(n).length === 0;
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
        yi(e) && (__privateGet(this, _r6)[e.senderId] = "wants"), __privateMethod(this, _Hu_instances, f_fn).call(this), uc(e.data).heads.length > 0 && (__privateGet(this, _r6)[e.senderId] = "has"), __privateMethod(this, _Hu_instances, u_fn).call(this, e.senderId, (n) => {
          __privateGet(this, _o2).update((r) => {
            const [s, i] = cc(r, n, e.data);
            return __privateMethod(this, _Hu_instances, d_fn).call(this, e.senderId, i), __privateMethod(this, _Hu_instances, l_fn).call(this, e.senderId, r), s;
          }), __privateMethod(this, _Hu_instances, f_fn).call(this);
        });
      };
      f_fn = function() {
        __privateGet(this, _a3) && __privateGet(this, _o2).inState([
          jt
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
        for (const e of __privateGet(this, _i4)) __privateMethod(this, _Hu_instances, h_fn).call(this, e.message);
        __privateSet(this, _i4, []);
      };
      const En = je("automerge-repo:collectionsync");
      class Nu extends xi {
        constructor(e) {
          super();
          __privateAdd(this, _Nu_instances);
          __publicField(this, "repo");
          __privateAdd(this, _t7, /* @__PURE__ */ new Set());
          __privateAdd(this, _e7, {});
          __privateAdd(this, _n7, {});
          this.repo = e;
        }
        async receiveMessage(e) {
          En(`onSyncMessage: ${e.senderId}, ${e.documentId}, ${"data" in e ? e.data.byteLength + "bytes" : ""}`);
          const n = e.documentId;
          if (!n) throw new Error("received a message with an invalid documentId");
          __privateGet(this, _n7)[n] = true;
          const r = __privateMethod(this, _Nu_instances, r_fn).call(this, n);
          r.receiveMessage(e);
          const s = await __privateMethod(this, _Nu_instances, i_fn2).call(this, n);
          r.beginSync(s.filter((i) => !r.hasPeer(i)));
        }
        addDocument(e) {
          if (__privateGet(this, _n7)[e]) return;
          const n = __privateMethod(this, _Nu_instances, r_fn).call(this, e);
          __privateMethod(this, _Nu_instances, i_fn2).call(this, e).then((r) => {
            n.beginSync(r);
          });
        }
        removeDocument(e) {
          throw new Error("not implemented");
        }
        addPeer(e) {
          if (En(`adding ${e} & synchronizing with them`), !__privateGet(this, _t7).has(e)) {
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
          En(`removing peer ${e}`), __privateGet(this, _t7).delete(e);
          for (const n of Object.values(__privateGet(this, _e7))) n.endSync(e);
        }
        get peers() {
          return Array.from(__privateGet(this, _t7));
        }
      }
      _t7 = new WeakMap();
      _e7 = new WeakMap();
      _n7 = new WeakMap();
      _Nu_instances = new WeakSet();
      r_fn = function(e) {
        if (!__privateGet(this, _e7)[e]) {
          const n = this.repo.find(kr({
            documentId: e
          }));
          __privateGet(this, _e7)[e] = __privateMethod(this, _Nu_instances, s_fn).call(this, n);
        }
        return __privateGet(this, _e7)[e];
      };
      s_fn = function(e) {
        const n = new Hu({
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
      class zu extends ct {
        constructor({ storage: e, network: n = [], peerId: r, sharePolicy: s, isEphemeral: i = e === void 0, enableRemoteHeadsGossiping: o = false } = {}) {
          super();
          __privateAdd(this, _zu_instances);
          __privateAdd(this, _t8);
          __publicField(this, "networkSubsystem");
          __publicField(this, "storageSubsystem");
          __publicField(this, "saveDebounceRate", 100);
          __privateAdd(this, _e8, {});
          __privateAdd(this, _n8);
          __publicField(this, "sharePolicy", async () => true);
          __publicField(this, "peerMetadataByPeerId", {});
          __privateAdd(this, _r7, new Iu());
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
          __privateSet(this, _s7, o), __privateSet(this, _t8, je("automerge-repo:repo")), this.sharePolicy = s ?? this.sharePolicy, this.on("document", async ({ handle: u, isNew: d }) => {
            if (a) {
              const _ = ({ handle: l, doc: b }) => {
                a.saveDoc(l.documentId, b);
              };
              if (u.on("heads-changed", er(_, this.saveDebounceRate)), d) await a.saveDoc(u.documentId, u.docSync());
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
          }), __privateSet(this, _n8, new Nu(this)), __privateGet(this, _n8).on("message", (u) => {
            __privateGet(this, _t8).call(this, `sending ${u.type} message to ${u.targetId}`), f.send(u);
          }), __privateGet(this, _s7) && __privateGet(this, _n8).on("open-doc", ({ peerId: u, documentId: d }) => {
            __privateGet(this, _r7).subscribePeerToDoc(u, d);
          });
          const a = e ? new Lu(e) : void 0;
          this.storageSubsystem = a;
          const c = (async () => ({
            storageId: await (a == null ? void 0 : a.id()),
            isEphemeral: i
          }))(), f = new Du(n, r, c);
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
            __privateMethod(this, _zu_instances, i_fn3).call(this, u);
          }), __privateGet(this, _n8).on("sync-state", (u) => {
            __privateMethod(this, _zu_instances, o_fn4).call(this, u);
            const d = __privateGet(this, _e8)[u.documentId], { storageId: _ } = this.peerMetadataByPeerId[u.peerId] || {};
            if (!_) return;
            const l = d.getRemoteHeads(_);
            u.syncState.theirHeads && (!l || !Or(l, u.syncState.theirHeads)) && u.syncState.theirHeads && (d.setRemoteHeads(_, u.syncState.theirHeads), _ && __privateGet(this, _s7) && __privateGet(this, _r7).handleImmediateRemoteHeadsChanged(u.documentId, _, u.syncState.theirHeads));
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
          const { documentId: n } = Sr(Jf()), r = __privateMethod(this, _zu_instances, c_fn3).call(this, {
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
          return r.update(() => Hr(n)), r;
        }
        find(e) {
          const n = wn(e);
          if (__privateGet(this, _e8)[n]) return __privateGet(this, _e8)[n].isUnavailable() && setTimeout(() => {
            __privateGet(this, _e8)[n].emit("unavailable", {
              handle: __privateGet(this, _e8)[n]
            });
          }), __privateGet(this, _e8)[n];
          const r = __privateMethod(this, _zu_instances, c_fn3).call(this, {
            documentId: n,
            isNew: false
          });
          return this.emit("document", {
            handle: r,
            isNew: false
          }), r;
        }
        delete(e) {
          const n = wn(e);
          __privateMethod(this, _zu_instances, c_fn3).call(this, {
            documentId: n,
            isNew: false
          }).delete(), delete __privateGet(this, _e8)[n], this.emit("delete-document", {
            documentId: n
          });
        }
        async export(e) {
          const n = wn(e), s = await __privateMethod(this, _zu_instances, c_fn3).call(this, {
            documentId: n,
            isNew: false
          }).doc();
          if (s) return Rs(s);
        }
        import(e) {
          const n = hc(e), r = this.create();
          return r.update(() => Hr(n)), r;
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
      _zu_instances = new WeakSet();
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
        s || (s = __privateGet(this, _a4)[n] = er(({ documentId: i, syncState: o }) => {
          this.storageSubsystem.saveSyncState(i, n, o);
        }, this.saveDebounceRate)), s(e);
      };
      c_fn3 = function({ documentId: e, isNew: n, initialValue: r }) {
        if (__privateGet(this, _e8)[e]) return __privateGet(this, _e8)[e];
        if (!e) throw new Error(`Invalid documentId ${e}`);
        const s = new yu(e, {
          isNew: n,
          initialValue: r
        });
        return __privateGet(this, _e8)[e] = s, s;
      };
      class Wu extends ct {
        constructor() {
          super(...arguments);
          __publicField(this, "peerId");
          __publicField(this, "peerMetadata");
        }
      }
      const Vu = "/assets/automerge_wasm_bg-BEjDkhWo.wasm", Ku = async (t = {}, e) => {
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
      function Si(t) {
        h = t;
      }
      const Te = new Array(128).fill(void 0);
      Te.push(void 0, null, true, false);
      function M(t) {
        return Te[t];
      }
      let yt = Te.length;
      function Ju(t) {
        t < 132 || (Te[t] = yt, yt = t);
      }
      function A(t) {
        const e = M(t);
        return Ju(t), e;
      }
      let be = 0, Ut = null;
      function zt() {
        return (Ut === null || Ut.byteLength === 0) && (Ut = new Uint8Array(h.memory.buffer)), Ut;
      }
      const qu = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
      let Wt = new qu("utf-8");
      const Gu = typeof Wt.encodeInto == "function" ? function(t, e) {
        return Wt.encodeInto(t, e);
      } : function(t, e) {
        const n = Wt.encode(t);
        return e.set(n), {
          read: t.length,
          written: n.length
        };
      };
      function Ee(t, e, n) {
        if (n === void 0) {
          const a = Wt.encode(t), c = e(a.length, 1) >>> 0;
          return zt().subarray(c, c + a.length).set(a), be = a.length, c;
        }
        let r = t.length, s = e(r, 1) >>> 0;
        const i = zt();
        let o = 0;
        for (; o < r; o++) {
          const a = t.charCodeAt(o);
          if (a > 127) break;
          i[s + o] = a;
        }
        if (o !== r) {
          o !== 0 && (t = t.slice(o)), s = n(s, r, r = o + t.length * 3, 1) >>> 0;
          const a = zt().subarray(s + o, s + r), c = Gu(t, a);
          o += c.written, s = n(s, r, o, 1) >>> 0;
        }
        return be = o, s;
      }
      function X(t) {
        return t == null;
      }
      let Pt = null;
      function y() {
        return (Pt === null || Pt.byteLength === 0) && (Pt = new Int32Array(h.memory.buffer)), Pt;
      }
      const Yu = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
      let ki = new Yu("utf-8", {
        ignoreBOM: true,
        fatal: true
      });
      ki.decode();
      function he(t, e) {
        return t = t >>> 0, ki.decode(zt().subarray(t, t + e));
      }
      function w(t) {
        yt === Te.length && Te.push(Te.length + 1);
        const e = yt;
        return yt = Te[e], Te[e] = t, e;
      }
      let $t = null;
      function Vt() {
        return ($t === null || $t.byteLength === 0) && ($t = new Float64Array(h.memory.buffer)), $t;
      }
      function tr(t) {
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
          s > 0 && (i += tr(t[0]));
          for (let o = 1; o < s; o++) i += ", " + tr(t[o]);
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
      function ze(t, e) {
        if (!(t instanceof e)) throw new Error(`expected instance of ${e.name}`);
        return t.ptr;
      }
      function Xu(t) {
        try {
          const s = h.__wbindgen_add_to_stack_pointer(-16);
          h.create(s, w(t));
          var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
          if (r) throw A(n);
          return ke.__wrap(e);
        } finally {
          h.__wbindgen_add_to_stack_pointer(16);
        }
      }
      function Zu(t, e) {
        try {
          const i = h.__wbindgen_add_to_stack_pointer(-16);
          h.load(i, w(t), w(e));
          var n = y()[i / 4 + 0], r = y()[i / 4 + 1], s = y()[i / 4 + 2];
          if (s) throw A(r);
          return ke.__wrap(n);
        } finally {
          h.__wbindgen_add_to_stack_pointer(16);
        }
      }
      function Qu(t) {
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
      function ed(t) {
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
      function td() {
        const t = h.initSyncState();
        return me.__wrap(t);
      }
      function nd(t) {
        try {
          const s = h.__wbindgen_add_to_stack_pointer(-16);
          h.importSyncState(s, w(t));
          var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
          if (r) throw A(n);
          return me.__wrap(e);
        } finally {
          h.__wbindgen_add_to_stack_pointer(16);
        }
      }
      function rd(t) {
        ze(t, me);
        const e = h.exportSyncState(t.__wbg_ptr);
        return A(e);
      }
      function sd(t) {
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
      function id(t) {
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
      function od(t) {
        ze(t, me);
        const e = h.encodeSyncState(t.__wbg_ptr);
        return A(e);
      }
      function ad(t) {
        try {
          const s = h.__wbindgen_add_to_stack_pointer(-16);
          h.decodeSyncState(s, w(t));
          var e = y()[s / 4 + 0], n = y()[s / 4 + 1], r = y()[s / 4 + 2];
          if (r) throw A(n);
          return me.__wrap(e);
        } finally {
          h.__wbindgen_add_to_stack_pointer(16);
        }
      }
      function ce(t, e) {
        try {
          return t.apply(this, e);
        } catch (n) {
          h.__wbindgen_exn_store(w(n));
        }
      }
      const cd = Object.freeze({
        Array: 0,
        0: "Array",
        String: 1,
        1: "String"
      }), ds = typeof FinalizationRegistry > "u" ? {
        register: () => {
        },
        unregister: () => {
        }
      } : new FinalizationRegistry((t) => h.__wbg_automerge_free(t >>> 0));
      class ke {
        static __wrap(e) {
          e = e >>> 0;
          const n = Object.create(ke.prototype);
          return n.__wbg_ptr = e, ds.register(n, n.__wbg_ptr, n), n;
        }
        __destroy_into_raw() {
          const e = this.__wbg_ptr;
          return this.__wbg_ptr = 0, ds.unregister(this), e;
        }
        free() {
          const e = this.__destroy_into_raw();
          h.__wbg_automerge_free(e);
        }
        static new(e, n) {
          try {
            const c = h.__wbindgen_add_to_stack_pointer(-16);
            var r = X(e) ? 0 : Ee(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
            h.automerge_new(c, r, s, n);
            var i = y()[c / 4 + 0], o = y()[c / 4 + 1], a = y()[c / 4 + 2];
            if (a) throw A(o);
            return ke.__wrap(i);
          } finally {
            h.__wbindgen_add_to_stack_pointer(16);
          }
        }
        clone(e) {
          try {
            const a = h.__wbindgen_add_to_stack_pointer(-16);
            var n = X(e) ? 0 : Ee(e, h.__wbindgen_malloc, h.__wbindgen_realloc), r = be;
            h.automerge_clone(a, this.__wbg_ptr, n, r);
            var s = y()[a / 4 + 0], i = y()[a / 4 + 1], o = y()[a / 4 + 2];
            if (o) throw A(i);
            return ke.__wrap(s);
          } finally {
            h.__wbindgen_add_to_stack_pointer(16);
          }
        }
        fork(e, n) {
          try {
            const c = h.__wbindgen_add_to_stack_pointer(-16);
            var r = X(e) ? 0 : Ee(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
            h.automerge_fork(c, this.__wbg_ptr, r, s, w(n));
            var i = y()[c / 4 + 0], o = y()[c / 4 + 1], a = y()[c / 4 + 2];
            if (a) throw A(o);
            return ke.__wrap(i);
          } finally {
            h.__wbindgen_add_to_stack_pointer(16);
          }
        }
        pendingOps() {
          const e = h.automerge_pendingOps(this.__wbg_ptr);
          return A(e);
        }
        commit(e, n) {
          var r = X(e) ? 0 : Ee(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
          const i = h.automerge_commit(this.__wbg_ptr, r, s, !X(n), X(n) ? 0 : n);
          return A(i);
        }
        merge(e) {
          try {
            const i = h.__wbindgen_add_to_stack_pointer(-16);
            ze(e, ke), h.automerge_merge(i, this.__wbg_ptr, e.__wbg_ptr);
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
            return r = f, s = u, he(f, u);
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
            return r !== 0 && (c = he(r, s).slice(), h.__wbindgen_free(r, s * 1, 1)), c;
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
            return s !== 0 && (f = he(s, i).slice(), h.__wbindgen_free(s, i * 1, 1)), f;
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
            var r = Vt()[o / 8 + 0], s = y()[o / 4 + 2], i = y()[o / 4 + 3];
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
            var n = Vt()[i / 8 + 0], r = y()[i / 4 + 2], s = y()[i / 4 + 3];
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
          ze(e, ke);
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
            return e = r, n = s, he(r, s);
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
            ze(e, me), h.automerge_receiveSyncMessage(i, this.__wbg_ptr, e.__wbg_ptr, w(n));
            var r = y()[i / 4 + 0], s = y()[i / 4 + 1];
            if (s) throw A(r);
          } finally {
            h.__wbindgen_add_to_stack_pointer(16);
          }
        }
        generateSyncMessage(e) {
          ze(e, me);
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
            return s = u, i = d, he(u, d);
          } finally {
            h.__wbindgen_add_to_stack_pointer(16), h.__wbindgen_free(s, i, 1);
          }
        }
        getCursorPosition(e, n, r) {
          try {
            const a = h.__wbindgen_add_to_stack_pointer(-16);
            h.automerge_getCursorPosition(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
            var s = Vt()[a / 8 + 0], i = y()[a / 4 + 2], o = y()[a / 4 + 3];
            if (o) throw A(i);
            return s;
          } finally {
            h.__wbindgen_add_to_stack_pointer(16);
          }
        }
        emptyChange(e, n) {
          var r = X(e) ? 0 : Ee(e, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
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
          ze(e, me);
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
      const ls = typeof FinalizationRegistry > "u" ? {
        register: () => {
        },
        unregister: () => {
        }
      } : new FinalizationRegistry((t) => h.__wbg_syncstate_free(t >>> 0));
      class me {
        static __wrap(e) {
          e = e >>> 0;
          const n = Object.create(me.prototype);
          return n.__wbg_ptr = e, ls.register(n, n.__wbg_ptr, n), n;
        }
        __destroy_into_raw() {
          const e = this.__wbg_ptr;
          return this.__wbg_ptr = 0, ls.unregister(this), e;
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
          return me.__wrap(e);
        }
      }
      function Ai(t) {
        A(t);
      }
      function Ei(t, e) {
        const n = M(e), r = typeof n == "string" ? n : void 0;
        var s = X(r) ? 0 : Ee(r, h.__wbindgen_malloc, h.__wbindgen_realloc), i = be;
        y()[t / 4 + 1] = i, y()[t / 4 + 0] = s;
      }
      function Ii(t, e) {
        const n = new Error(he(t, e));
        return w(n);
      }
      function Ci(t, e) {
        const n = he(t, e);
        return w(n);
      }
      function Oi(t) {
        return w(t);
      }
      function Ti(t) {
        const e = M(t);
        return w(e);
      }
      function Ri(t, e) {
        const n = M(e), r = typeof n == "number" ? n : void 0;
        Vt()[t / 8 + 1] = X(r) ? 0 : r, y()[t / 4 + 0] = !X(r);
      }
      function Mi(t) {
        return M(t) === void 0;
      }
      function ji(t) {
        const e = M(t);
        return typeof e == "boolean" ? e ? 1 : 0 : 2;
      }
      function Di(t) {
        return M(t) === null;
      }
      function Ui(t) {
        return typeof M(t) == "string";
      }
      function Pi(t) {
        return typeof M(t) == "function";
      }
      function $i(t) {
        const e = M(t);
        return typeof e == "object" && e !== null;
      }
      function Bi(t) {
        return Array.isArray(M(t));
      }
      function Fi(t, e) {
        const n = M(e), r = JSON.stringify(n === void 0 ? null : n), s = Ee(r, h.__wbindgen_malloc, h.__wbindgen_realloc), i = be;
        y()[t / 4 + 1] = i, y()[t / 4 + 0] = s;
      }
      function Li() {
        const t = new Error();
        return w(t);
      }
      function Hi(t, e) {
        const n = M(e).stack, r = Ee(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
        y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
      }
      function Ni(t, e) {
        let n, r;
        try {
          n = t, r = e, console.error(he(t, e));
        } finally {
          h.__wbindgen_free(n, r, 1);
        }
      }
      function zi(t, e) {
        return M(t) == M(e);
      }
      function Wi(t, e) {
        const n = String(M(e)), r = Ee(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
        y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
      }
      function Vi(t) {
        return w(t);
      }
      function Ki(t) {
        const e = BigInt.asUintN(64, t);
        return w(e);
      }
      function Ji(t, e, n) {
        M(t)[A(e)] = A(n);
      }
      function qi() {
        return ce(function(t, e) {
          M(t).getRandomValues(M(e));
        }, arguments);
      }
      function Gi() {
        return ce(function(t, e) {
          M(t).randomFillSync(A(e));
        }, arguments);
      }
      function Yi(t) {
        const e = M(t).crypto;
        return w(e);
      }
      function Xi(t) {
        const e = M(t).process;
        return w(e);
      }
      function Zi(t) {
        const e = M(t).versions;
        return w(e);
      }
      function Qi(t) {
        const e = M(t).node;
        return w(e);
      }
      function eo() {
        return ce(function() {
          const t = module.require;
          return w(t);
        }, arguments);
      }
      function to(t) {
        const e = M(t).msCrypto;
        return w(e);
      }
      function no(t) {
        console.log(M(t));
      }
      function ro(t, e) {
        console.log(M(t), M(e));
      }
      function so(t, e) {
        const n = M(t)[e >>> 0];
        return w(n);
      }
      function io(t) {
        return M(t).length;
      }
      function oo() {
        const t = new Array();
        return w(t);
      }
      function ao(t, e) {
        const n = new Function(he(t, e));
        return w(n);
      }
      function co(t) {
        const e = M(t).next;
        return w(e);
      }
      function fo() {
        return ce(function(t) {
          const e = M(t).next();
          return w(e);
        }, arguments);
      }
      function uo(t) {
        return M(t).done;
      }
      function lo(t) {
        const e = M(t).value;
        return w(e);
      }
      function ho() {
        return w(Symbol.iterator);
      }
      function _o() {
        return ce(function(t, e) {
          const n = Reflect.get(M(t), M(e));
          return w(n);
        }, arguments);
      }
      function go() {
        return ce(function(t, e) {
          const n = M(t).call(M(e));
          return w(n);
        }, arguments);
      }
      function po() {
        const t = new Object();
        return w(t);
      }
      function yo(t) {
        return M(t).length;
      }
      function bo(t, e, n) {
        M(t)[e >>> 0] = A(n);
      }
      function mo(t) {
        const e = Array.from(M(t));
        return w(e);
      }
      function wo(t) {
        return Array.isArray(M(t));
      }
      function vo(t, e) {
        return M(t).push(M(e));
      }
      function xo(t, e) {
        return M(t).unshift(M(e));
      }
      function So(t) {
        let e;
        try {
          e = M(t) instanceof ArrayBuffer;
        } catch {
          e = false;
        }
        return e;
      }
      function ko(t, e) {
        const n = new Error(he(t, e));
        return w(n);
      }
      function Ao() {
        return ce(function(t, e, n) {
          const r = M(t).call(M(e), M(n));
          return w(r);
        }, arguments);
      }
      function Eo(t) {
        let e;
        try {
          e = M(t) instanceof Date;
        } catch {
          e = false;
        }
        return e;
      }
      function Io(t) {
        return M(t).getTime();
      }
      function Co(t) {
        const e = new Date(M(t));
        return w(e);
      }
      function Oo(t) {
        let e;
        try {
          e = M(t) instanceof Object;
        } catch {
          e = false;
        }
        return e;
      }
      function To(t, e) {
        const n = Object.assign(M(t), M(e));
        return w(n);
      }
      function Ro(t, e, n) {
        const r = Object.defineProperty(M(t), M(e), M(n));
        return w(r);
      }
      function Mo(t) {
        const e = Object.entries(M(t));
        return w(e);
      }
      function jo(t) {
        const e = Object.freeze(M(t));
        return w(e);
      }
      function Do(t) {
        const e = Object.keys(M(t));
        return w(e);
      }
      function Uo(t) {
        const e = Object.values(M(t));
        return w(e);
      }
      function Po(t, e) {
        const n = new RangeError(he(t, e));
        return w(n);
      }
      function $o() {
        return ce(function(t, e, n) {
          const r = Reflect.apply(M(t), M(e), M(n));
          return w(r);
        }, arguments);
      }
      function Bo() {
        return ce(function(t, e) {
          return Reflect.deleteProperty(M(t), M(e));
        }, arguments);
      }
      function Fo() {
        return ce(function(t) {
          const e = Reflect.ownKeys(M(t));
          return w(e);
        }, arguments);
      }
      function Lo() {
        return ce(function(t, e, n) {
          return Reflect.set(M(t), M(e), M(n));
        }, arguments);
      }
      function Ho(t) {
        const e = M(t).buffer;
        return w(e);
      }
      function No(t, e) {
        const n = M(t).concat(M(e));
        return w(n);
      }
      function zo(t, e, n) {
        const r = M(t).slice(e >>> 0, n >>> 0);
        return w(r);
      }
      function Wo(t, e) {
        const n = Symbol.for(he(t, e));
        return w(n);
      }
      function Vo(t) {
        const e = M(t).toString();
        return w(e);
      }
      function Ko() {
        return ce(function() {
          const t = self.self;
          return w(t);
        }, arguments);
      }
      function Jo() {
        return ce(function() {
          const t = window.window;
          return w(t);
        }, arguments);
      }
      function qo() {
        return ce(function() {
          const t = globalThis.globalThis;
          return w(t);
        }, arguments);
      }
      function Go() {
        return ce(function() {
          const t = global.global;
          return w(t);
        }, arguments);
      }
      function Yo(t, e, n) {
        const r = new Uint8Array(M(t), e >>> 0, n >>> 0);
        return w(r);
      }
      function Xo(t) {
        const e = new Uint8Array(M(t));
        return w(e);
      }
      function Zo(t, e, n) {
        M(t).set(M(e), n >>> 0);
      }
      function Qo(t) {
        return M(t).length;
      }
      function ea(t) {
        let e;
        try {
          e = M(t) instanceof Uint8Array;
        } catch {
          e = false;
        }
        return e;
      }
      function ta(t) {
        const e = new Uint8Array(t >>> 0);
        return w(e);
      }
      function na(t, e, n) {
        const r = M(t).subarray(e >>> 0, n >>> 0);
        return w(r);
      }
      function ra(t, e) {
        const n = tr(M(e)), r = Ee(n, h.__wbindgen_malloc, h.__wbindgen_realloc), s = be;
        y()[t / 4 + 1] = s, y()[t / 4 + 0] = r;
      }
      function sa(t, e) {
        throw new Error(he(t, e));
      }
      function ia() {
        const t = h.memory;
        return w(t);
      }
      URL = globalThis.URL;
      const T = await Ku({
        "./automerge_wasm_bg.js": {
          __wbindgen_object_drop_ref: Ai,
          __wbindgen_string_get: Ei,
          __wbindgen_error_new: Ii,
          __wbindgen_string_new: Ci,
          __wbindgen_number_new: Oi,
          __wbindgen_object_clone_ref: Ti,
          __wbindgen_number_get: Ri,
          __wbindgen_is_undefined: Mi,
          __wbindgen_boolean_get: ji,
          __wbindgen_is_null: Di,
          __wbindgen_is_string: Ui,
          __wbindgen_is_function: Pi,
          __wbindgen_is_object: $i,
          __wbindgen_is_array: Bi,
          __wbindgen_json_serialize: Fi,
          __wbg_new_abda76e883ba8a5f: Li,
          __wbg_stack_658279fe44541cf6: Hi,
          __wbg_error_f851667af71bcfc6: Ni,
          __wbindgen_jsval_loose_eq: zi,
          __wbg_String_91fba7ded13ba54c: Wi,
          __wbindgen_bigint_from_i64: Vi,
          __wbindgen_bigint_from_u64: Ki,
          __wbg_set_20cbc34131e76824: Ji,
          __wbg_getRandomValues_3aa56aa6edec874c: qi,
          __wbg_randomFillSync_5c9c955aa56b6049: Gi,
          __wbg_crypto_1d1f22824a6a080c: Yi,
          __wbg_process_4a72847cc503995b: Xi,
          __wbg_versions_f686565e586dd935: Zi,
          __wbg_node_104a2ff8d6ea03a2: Qi,
          __wbg_require_cca90b1a94a0255b: eo,
          __wbg_msCrypto_eb05e62b530a1508: to,
          __wbg_log_5bb5f88f245d7762: no,
          __wbg_log_1746d5c75ec89963: ro,
          __wbg_get_bd8e338fbd5f5cc8: so,
          __wbg_length_cd7af8117672b8b8: io,
          __wbg_new_16b304a2cfa7ff4a: oo,
          __wbg_newnoargs_e258087cd0daa0ea: ao,
          __wbg_next_40fc327bfc8770e6: co,
          __wbg_next_196c84450b364254: fo,
          __wbg_done_298b57d23c0fc80c: uo,
          __wbg_value_d93c65011f51a456: lo,
          __wbg_iterator_2cee6dadfd956dfa: ho,
          __wbg_get_e3c254076557e348: _o,
          __wbg_call_27c0f87801dedf93: go,
          __wbg_new_72fb9a18b5ae2624: po,
          __wbg_length_dee433d4c85c9387: yo,
          __wbg_set_d4638f722068f043: bo,
          __wbg_from_89e3fc3ba5e6fb48: mo,
          __wbg_isArray_2ab64d95e09ea0ae: wo,
          __wbg_push_a5b05aedc7234f9f: vo,
          __wbg_unshift_e22df4b34bcf5070: xo,
          __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: So,
          __wbg_new_28c511d9baebfa89: ko,
          __wbg_call_b3ca7c6051f9bec1: Ao,
          __wbg_instanceof_Date_f65cf97fb83fc369: Eo,
          __wbg_getTime_2bc4375165f02d15: Io,
          __wbg_new_cf3ec55744a78578: Co,
          __wbg_instanceof_Object_71ca3c0a59266746: Oo,
          __wbg_assign_496d2d14fecafbcf: To,
          __wbg_defineProperty_cc00e2de8a0f5141: Ro,
          __wbg_entries_95cc2c823b285a09: Mo,
          __wbg_freeze_cc6bc19f75299986: jo,
          __wbg_keys_91e412b4b222659f: Do,
          __wbg_values_9c75e6e2bfbdb70d: Uo,
          __wbg_new_dd6a5dd7b538af21: Po,
          __wbg_apply_0a5aa603881e6d79: $o,
          __wbg_deleteProperty_13e721a56f19e842: Bo,
          __wbg_ownKeys_658942b7f28d1fe9: Fo,
          __wbg_set_1f9b04f170055d33: Lo,
          __wbg_buffer_12d079cc21e14bdb: Ho,
          __wbg_concat_3de229fe4fe90fea: No,
          __wbg_slice_52fb626ffdc8da8f: zo,
          __wbg_for_27c67e2dbdce22f6: Wo,
          __wbg_toString_7df3c77999517c20: Vo,
          __wbg_self_ce0dbfc45cf2f5be: Ko,
          __wbg_window_c6fb939a7f436783: Jo,
          __wbg_globalThis_d1e6af4856ba331b: qo,
          __wbg_global_207b558942527489: Go,
          __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Yo,
          __wbg_new_63b92bc8671ed464: Xo,
          __wbg_set_a47bac70306a19a7: Zo,
          __wbg_length_c20a40f15020d68a: Qo,
          __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: ea,
          __wbg_newwithlength_e9b4878cebadb3d3: ta,
          __wbg_subarray_a1f73cd4b5b42fe1: na,
          __wbindgen_debug_string: ra,
          __wbindgen_throw: sa,
          __wbindgen_memory: ia
        }
      }, Vu), fd = T.memory, ud = T.__wbg_syncstate_free, dd = T.syncstate_sharedHeads, ld = T.syncstate_lastSentHeads, hd = T.syncstate_set_lastSentHeads, _d = T.syncstate_set_sentHashes, gd = T.syncstate_clone, pd = T.__wbg_automerge_free, yd = T.automerge_new, bd = T.automerge_clone, md = T.automerge_fork, wd = T.automerge_pendingOps, vd = T.automerge_commit, xd = T.automerge_merge, Sd = T.automerge_rollback, kd = T.automerge_keys, Ad = T.automerge_text, Ed = T.automerge_spans, Id = T.automerge_splice, Cd = T.automerge_updateText, Od = T.automerge_updateSpans, Td = T.automerge_push, Rd = T.automerge_pushObject, Md = T.automerge_insert, jd = T.automerge_splitBlock, Dd = T.automerge_joinBlock, Ud = T.automerge_updateBlock, Pd = T.automerge_getBlock, $d = T.automerge_insertObject, Bd = T.automerge_put, Fd = T.automerge_putObject, Ld = T.automerge_increment, Hd = T.automerge_get, Nd = T.automerge_getWithType, zd = T.automerge_objInfo, Wd = T.automerge_getAll, Vd = T.automerge_enableFreeze, Kd = T.automerge_registerDatatype, Jd = T.automerge_applyPatches, qd = T.automerge_applyAndReturnPatches, Gd = T.automerge_diffIncremental, Yd = T.automerge_updateDiffCursor, Xd = T.automerge_resetDiffCursor, Zd = T.automerge_diff, Qd = T.automerge_isolate, el = T.automerge_integrate, tl = T.automerge_length, nl = T.automerge_delete, rl = T.automerge_save, sl = T.automerge_saveIncremental, il = T.automerge_saveSince, ol = T.automerge_saveNoCompress, al = T.automerge_saveAndVerify, cl = T.automerge_loadIncremental, fl = T.automerge_applyChanges, ul = T.automerge_getChanges, dl = T.automerge_getChangeByHash, ll = T.automerge_getDecodedChangeByHash, hl = T.automerge_getChangesAdded, _l = T.automerge_getHeads, gl = T.automerge_getActorId, pl = T.automerge_getLastLocalChange, yl = T.automerge_dump, bl = T.automerge_getMissingDeps, ml = T.automerge_receiveSyncMessage, wl = T.automerge_generateSyncMessage, vl = T.automerge_toJS, xl = T.automerge_materialize, Sl = T.automerge_getCursor, kl = T.automerge_getCursorPosition, Al = T.automerge_emptyChange, El = T.automerge_mark, Il = T.automerge_unmark, Cl = T.automerge_marks, Ol = T.automerge_marksAt, Tl = T.automerge_hasOurChanges, Rl = T.automerge_topoHistoryTraversal, Ml = T.automerge_stats, jl = T.create, Dl = T.load, Ul = T.encodeChange, Pl = T.decodeChange, $l = T.initSyncState, Bl = T.importSyncState, Fl = T.exportSyncState, Ll = T.encodeSyncMessage, Hl = T.decodeSyncMessage, Nl = T.encodeSyncState, zl = T.decodeSyncState, Wl = T.__wbindgen_malloc, Vl = T.__wbindgen_realloc, Kl = T.__wbindgen_add_to_stack_pointer, Jl = T.__wbindgen_free, ql = T.__wbindgen_exn_store, Gl = Object.freeze(Object.defineProperty({
        __proto__: null,
        __wbg_automerge_free: pd,
        __wbg_syncstate_free: ud,
        __wbindgen_add_to_stack_pointer: Kl,
        __wbindgen_exn_store: ql,
        __wbindgen_free: Jl,
        __wbindgen_malloc: Wl,
        __wbindgen_realloc: Vl,
        automerge_applyAndReturnPatches: qd,
        automerge_applyChanges: fl,
        automerge_applyPatches: Jd,
        automerge_clone: bd,
        automerge_commit: vd,
        automerge_delete: nl,
        automerge_diff: Zd,
        automerge_diffIncremental: Gd,
        automerge_dump: yl,
        automerge_emptyChange: Al,
        automerge_enableFreeze: Vd,
        automerge_fork: md,
        automerge_generateSyncMessage: wl,
        automerge_get: Hd,
        automerge_getActorId: gl,
        automerge_getAll: Wd,
        automerge_getBlock: Pd,
        automerge_getChangeByHash: dl,
        automerge_getChanges: ul,
        automerge_getChangesAdded: hl,
        automerge_getCursor: Sl,
        automerge_getCursorPosition: kl,
        automerge_getDecodedChangeByHash: ll,
        automerge_getHeads: _l,
        automerge_getLastLocalChange: pl,
        automerge_getMissingDeps: bl,
        automerge_getWithType: Nd,
        automerge_hasOurChanges: Tl,
        automerge_increment: Ld,
        automerge_insert: Md,
        automerge_insertObject: $d,
        automerge_integrate: el,
        automerge_isolate: Qd,
        automerge_joinBlock: Dd,
        automerge_keys: kd,
        automerge_length: tl,
        automerge_loadIncremental: cl,
        automerge_mark: El,
        automerge_marks: Cl,
        automerge_marksAt: Ol,
        automerge_materialize: xl,
        automerge_merge: xd,
        automerge_new: yd,
        automerge_objInfo: zd,
        automerge_pendingOps: wd,
        automerge_push: Td,
        automerge_pushObject: Rd,
        automerge_put: Bd,
        automerge_putObject: Fd,
        automerge_receiveSyncMessage: ml,
        automerge_registerDatatype: Kd,
        automerge_resetDiffCursor: Xd,
        automerge_rollback: Sd,
        automerge_save: rl,
        automerge_saveAndVerify: al,
        automerge_saveIncremental: sl,
        automerge_saveNoCompress: ol,
        automerge_saveSince: il,
        automerge_spans: Ed,
        automerge_splice: Id,
        automerge_splitBlock: jd,
        automerge_stats: Ml,
        automerge_text: Ad,
        automerge_toJS: vl,
        automerge_topoHistoryTraversal: Rl,
        automerge_unmark: Il,
        automerge_updateBlock: Ud,
        automerge_updateDiffCursor: Yd,
        automerge_updateSpans: Od,
        automerge_updateText: Cd,
        create: jl,
        decodeChange: Pl,
        decodeSyncMessage: Hl,
        decodeSyncState: zl,
        encodeChange: Ul,
        encodeSyncMessage: Ll,
        encodeSyncState: Nl,
        exportSyncState: Fl,
        importSyncState: Bl,
        initSyncState: $l,
        load: Dl,
        memory: fd,
        syncstate_clone: gd,
        syncstate_lastSentHeads: ld,
        syncstate_set_lastSentHeads: hd,
        syncstate_set_sentHashes: _d,
        syncstate_sharedHeads: dd
      }, Symbol.toStringTag, {
        value: "Module"
      }));
      Si(Gl);
      const Yl = Object.freeze(Object.defineProperty({
        __proto__: null,
        Automerge: ke,
        SyncState: me,
        TextRepresentation: cd,
        __wbg_String_91fba7ded13ba54c: Wi,
        __wbg_apply_0a5aa603881e6d79: $o,
        __wbg_assign_496d2d14fecafbcf: To,
        __wbg_buffer_12d079cc21e14bdb: Ho,
        __wbg_call_27c0f87801dedf93: go,
        __wbg_call_b3ca7c6051f9bec1: Ao,
        __wbg_concat_3de229fe4fe90fea: No,
        __wbg_crypto_1d1f22824a6a080c: Yi,
        __wbg_defineProperty_cc00e2de8a0f5141: Ro,
        __wbg_deleteProperty_13e721a56f19e842: Bo,
        __wbg_done_298b57d23c0fc80c: uo,
        __wbg_entries_95cc2c823b285a09: Mo,
        __wbg_error_f851667af71bcfc6: Ni,
        __wbg_for_27c67e2dbdce22f6: Wo,
        __wbg_freeze_cc6bc19f75299986: jo,
        __wbg_from_89e3fc3ba5e6fb48: mo,
        __wbg_getRandomValues_3aa56aa6edec874c: qi,
        __wbg_getTime_2bc4375165f02d15: Io,
        __wbg_get_bd8e338fbd5f5cc8: so,
        __wbg_get_e3c254076557e348: _o,
        __wbg_globalThis_d1e6af4856ba331b: qo,
        __wbg_global_207b558942527489: Go,
        __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: So,
        __wbg_instanceof_Date_f65cf97fb83fc369: Eo,
        __wbg_instanceof_Object_71ca3c0a59266746: Oo,
        __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: ea,
        __wbg_isArray_2ab64d95e09ea0ae: wo,
        __wbg_iterator_2cee6dadfd956dfa: ho,
        __wbg_keys_91e412b4b222659f: Do,
        __wbg_length_c20a40f15020d68a: Qo,
        __wbg_length_cd7af8117672b8b8: io,
        __wbg_length_dee433d4c85c9387: yo,
        __wbg_log_1746d5c75ec89963: ro,
        __wbg_log_5bb5f88f245d7762: no,
        __wbg_msCrypto_eb05e62b530a1508: to,
        __wbg_new_16b304a2cfa7ff4a: oo,
        __wbg_new_28c511d9baebfa89: ko,
        __wbg_new_63b92bc8671ed464: Xo,
        __wbg_new_72fb9a18b5ae2624: po,
        __wbg_new_abda76e883ba8a5f: Li,
        __wbg_new_cf3ec55744a78578: Co,
        __wbg_new_dd6a5dd7b538af21: Po,
        __wbg_newnoargs_e258087cd0daa0ea: ao,
        __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Yo,
        __wbg_newwithlength_e9b4878cebadb3d3: ta,
        __wbg_next_196c84450b364254: fo,
        __wbg_next_40fc327bfc8770e6: co,
        __wbg_node_104a2ff8d6ea03a2: Qi,
        __wbg_ownKeys_658942b7f28d1fe9: Fo,
        __wbg_process_4a72847cc503995b: Xi,
        __wbg_push_a5b05aedc7234f9f: vo,
        __wbg_randomFillSync_5c9c955aa56b6049: Gi,
        __wbg_require_cca90b1a94a0255b: eo,
        __wbg_self_ce0dbfc45cf2f5be: Ko,
        __wbg_set_1f9b04f170055d33: Lo,
        __wbg_set_20cbc34131e76824: Ji,
        __wbg_set_a47bac70306a19a7: Zo,
        __wbg_set_d4638f722068f043: bo,
        __wbg_set_wasm: Si,
        __wbg_slice_52fb626ffdc8da8f: zo,
        __wbg_stack_658279fe44541cf6: Hi,
        __wbg_subarray_a1f73cd4b5b42fe1: na,
        __wbg_toString_7df3c77999517c20: Vo,
        __wbg_unshift_e22df4b34bcf5070: xo,
        __wbg_value_d93c65011f51a456: lo,
        __wbg_values_9c75e6e2bfbdb70d: Uo,
        __wbg_versions_f686565e586dd935: Zi,
        __wbg_window_c6fb939a7f436783: Jo,
        __wbindgen_bigint_from_i64: Vi,
        __wbindgen_bigint_from_u64: Ki,
        __wbindgen_boolean_get: ji,
        __wbindgen_debug_string: ra,
        __wbindgen_error_new: Ii,
        __wbindgen_is_array: Bi,
        __wbindgen_is_function: Pi,
        __wbindgen_is_null: Di,
        __wbindgen_is_object: $i,
        __wbindgen_is_string: Ui,
        __wbindgen_is_undefined: Mi,
        __wbindgen_json_serialize: Fi,
        __wbindgen_jsval_loose_eq: zi,
        __wbindgen_memory: ia,
        __wbindgen_number_get: Ri,
        __wbindgen_number_new: Oi,
        __wbindgen_object_clone_ref: Ti,
        __wbindgen_object_drop_ref: Ai,
        __wbindgen_string_get: Ei,
        __wbindgen_string_new: Ci,
        __wbindgen_throw: sa,
        create: Xu,
        decodeChange: ed,
        decodeSyncMessage: id,
        decodeSyncState: ad,
        encodeChange: Qu,
        encodeSyncMessage: sd,
        encodeSyncState: od,
        exportSyncState: rd,
        importSyncState: nd,
        initSyncState: td,
        load: Zu
      }, Symbol.toStringTag, {
        value: "Module"
      }));
      Ga(Yl);
      cn();
      class Xl {
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
      var et = null;
      typeof WebSocket < "u" ? et = WebSocket : typeof MozWebSocket < "u" ? et = MozWebSocket : typeof global < "u" ? et = global.WebSocket || global.MozWebSocket : typeof window < "u" ? et = window.WebSocket || window.MozWebSocket : typeof self < "u" && (et = self.WebSocket || self.MozWebSocket);
      const In = et, Zl = (t) => t.type === "peer", Ql = (t) => t.type === "error", eh = "1";
      function xe(t, e = "Assertion failed") {
        if (t === false || t === null || t === void 0) {
          const n = new Error(th(e));
          throw n.stack = nh(n.stack, "assert.ts"), n;
        }
      }
      const th = (t) => t.split(`
`).map((e) => e.trim()).join(`
`), nh = (t = "", e) => t.split(`
`).filter((n) => !n.includes(e)).join(`
`), rh = (t) => {
        const { buffer: e, byteOffset: n, byteLength: r } = t;
        return e.slice(n, n + r);
      };
      class sh extends Wu {
        constructor() {
          super(...arguments);
          __publicField(this, "socket");
        }
      }
      class ih extends sh {
        constructor(e, n = 5e3) {
          super();
          __privateAdd(this, _ih_instances);
          __publicField(this, "url");
          __publicField(this, "retryInterval");
          __privateAdd(this, _t9, false);
          __privateAdd(this, _e9);
          __privateAdd(this, _n9, je("automerge-repo:websocket:browser"));
          __publicField(this, "remotePeerId");
          __publicField(this, "onOpen", () => {
            __privateGet(this, _n9).call(this, "open"), clearInterval(__privateGet(this, _e9)), __privateSet(this, _e9, void 0), this.join();
          });
          __publicField(this, "onClose", () => {
            __privateGet(this, _n9).call(this, "close"), this.remotePeerId && this.emit("peer-disconnected", {
              peerId: this.remotePeerId
            }), this.retryInterval > 0 && !__privateGet(this, _e9) && setTimeout(() => (xe(this.peerId), this.connect(this.peerId, this.peerMetadata)), this.retryInterval);
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
          !this.socket || !this.peerId ? (__privateGet(this, _n9).call(this, "connecting"), this.peerId = e, this.peerMetadata = n ?? {}) : (__privateGet(this, _n9).call(this, "reconnecting"), xe(e === this.peerId), this.socket.removeEventListener("open", this.onOpen), this.socket.removeEventListener("close", this.onClose), this.socket.removeEventListener("message", this.onMessage), this.socket.removeEventListener("error", this.onError)), __privateGet(this, _e9) || __privateSet(this, _e9, setInterval(() => {
            this.connect(e, n);
          }, this.retryInterval)), this.socket = new In(this.url), this.socket.binaryType = "arraybuffer", this.socket.addEventListener("open", this.onOpen), this.socket.addEventListener("close", this.onClose), this.socket.addEventListener("message", this.onMessage), this.socket.addEventListener("error", this.onError), setTimeout(() => __privateMethod(this, _ih_instances, r_fn2).call(this), 1e3), this.join();
        }
        join() {
          xe(this.peerId), xe(this.socket), this.socket.readyState === In.OPEN && this.send(oh(this.peerId, this.peerMetadata));
        }
        disconnect() {
          xe(this.peerId), xe(this.socket), this.send({
            type: "leave",
            senderId: this.peerId
          });
        }
        send(e) {
          var _a5;
          if ("data" in e && ((_a5 = e.data) == null ? void 0 : _a5.byteLength) === 0) throw new Error("Tried to send a zero-length message");
          if (xe(this.peerId), xe(this.socket), this.socket.readyState !== In.OPEN) throw new Error(`Websocket not ready (${this.socket.readyState})`);
          const n = pi(e);
          this.socket.send(rh(n));
        }
        peerCandidate(e, n) {
          xe(this.socket), __privateMethod(this, _ih_instances, r_fn2).call(this), this.remotePeerId = e, this.emit("peer-candidate", {
            peerId: e,
            peerMetadata: n
          });
        }
        receiveMessage(e) {
          const n = hu(new Uint8Array(e));
          if (xe(this.socket), e.byteLength === 0) throw new Error("received a zero-length message");
          if (Zl(n)) {
            const { peerMetadata: r } = n;
            __privateGet(this, _n9).call(this, `peer: ${n.senderId}`), this.peerCandidate(n.senderId, r);
          } else Ql(n) ? __privateGet(this, _n9).call(this, `error: ${n.message}`) : this.emit("message", n);
        }
      }
      _t9 = new WeakMap();
      _e9 = new WeakMap();
      _n9 = new WeakMap();
      _ih_instances = new WeakSet();
      r_fn2 = function() {
        __privateGet(this, _t9) || (__privateSet(this, _t9, true), this.emit("ready", {
          network: this
        }));
      };
      function oh(t, e) {
        return {
          type: "join",
          senderId: t,
          peerMetadata: e,
          supportedProtocolVersions: [
            eh
          ]
        };
      }
      je("WebsocketServer");
      const Tr = new AudioContext({
        latencyHint: "balanced",
        sampleRate: ca
      });
      await Tr.audioWorklet.addModule(Ta);
      const Rr = new AudioWorkletNode(Tr, "looper"), ah = await fa(Tr, Rr), hs = /* @__PURE__ */ new Set(), kt = {
        shared: {
          layers: []
        },
        samplesAsFloats: /* @__PURE__ */ new Map(),
        playhead: 0
      };
      ya(Rr, ah, kt, fh);
      function oa(t) {
        Rr.port.postMessage(t);
      }
      const _s = new zu({
        storage: new Xl("automerge-demo"),
        network: [
          new ih("wss://sync.automerge.org")
        ]
      }), aa = await uh();
      aa.on("change", (t) => nr(t.doc));
      function nr(t) {
        console.log("new state", t), kt.shared = t, oa({
          command: "update layers",
          layers: kt.shared.layers.map(ha)
        }), ch();
      }
      function ch() {
        for (const t of kt.shared.layers) {
          if (hs.has(t.id)) continue;
          hs.add(t.id);
          const e = new Float32Array(t.samples.buffer);
          oa({
            command: "set layer samples",
            id: t.id,
            samples: e
          });
        }
      }
      function fh(t) {
        aa.change(t);
      }
      async function uh() {
        const t = document.location.hash.substring(1);
        let e;
        if (si(t)) console.log("loading existing doc"), e = _s.find(t), nr(await e.doc());
        else {
          console.log("creating new doc");
          const n = kt.shared;
          e = _s.create(n), document.location.hash = e.url, nr(n);
        }
        return e;
      }
    })();
  }
});
export default require_stdin();
