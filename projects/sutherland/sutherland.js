const Mt = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 1.5,
  lineWidth: 3.5,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgba(255,165,0,0)",
  instanceSideAttacherColor: "rgba(255,222,33,0)",
  showControlPoints: !0,
  controlPointColor: "rgba(255,222,33,.2)",
  axisColor: "rgba(255,222,33,0.125)",
  handleRadius: 7,
  closeEnough: 7,
  crosshairsSize: 15,
  fontScale: 10,
  kerning: 0.75,
  showGuideLines: !1,
  guideLineColor: "rgba(255,255,255,.125)",
  statusTimeMillis: 4e3,
  usePredictedEvents: !1,
  weight: 25,
  distanceConstraintTextScale: 0.3,
  distanceConstraintLabelPct: 0.25,
  showImplicitConstraints: !1,
  highlightReferents: !0,
  maxDepth: 10,
  tabletButtonWidth: 100,
  lefty: !1,
  onionSkinAlpha: 0
};
let R;
function Qe() {
  R = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(Mt));
  for (const [n, t] of Object.entries(Mt))
    Object.hasOwn(R, n) || (R[n] = t);
}
function X(n) {
  R = { ...R, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Ze() {
  R = JSON.parse(JSON.stringify(Mt)), localStorage.setItem("config", JSON.stringify(R));
}
function a() {
  return R;
}
Qe();
window.config = a;
const zt = () => new URLSearchParams(window.location.search).get("tablet"), Y = Math.PI * 2;
function E(n, t) {
  return Math.sqrt(ht(n, t));
}
function ht(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Z(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const ft = Object.freeze({ x: 0, y: 0 });
function Ce({ x: n, y: t }, { x: e, y: i }) {
  return { x: n + e, y: t + i };
}
function Rt(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, o = e * i, r = e * s;
  return { x: o + t.x, y: r + t.y };
}
function Lt(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, o = Math.sin(e), r = Math.cos(e), h = i * r - s * o, m = i * o + s * r;
  return { x: h + t.x, y: m + t.y };
}
function We(n) {
  let t = 1 / 0, e = -1 / 0, i = 1 / 0, s = -1 / 0;
  for (const o of n)
    t = Math.min(t, o.x), e = Math.max(e, o.x), i = Math.min(i, o.y), s = Math.max(s, o.y);
  return {
    topLeft: { x: t, y: s },
    bottomRight: { x: e, y: i }
  };
}
function De(n, t, e) {
  return Math.sqrt(tn(n, t, e));
}
function tn(n, t, e) {
  const i = ht(t, e);
  if (i == 0)
    return ht(n, t);
  const s = Math.max(0, Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / i, 1));
  return ht(n, { x: t.x + s * (e.x - t.x), y: t.y + s * (e.y - t.y) });
}
function pe(n) {
  return 1 - Math.pow(1 - n, 5);
}
let _, u;
function en(n) {
  _ = n, u = _.getContext("2d"), Te();
}
function It(n, t) {
  const e = u.globalAlpha;
  u.globalAlpha = n;
  try {
    t();
  } finally {
    u.globalAlpha = e;
  }
}
function Te() {
  if (_.width = innerWidth, _.height = innerHeight, devicePixelRatio !== 1) {
    const n = _.width, t = _.height;
    _.width = n * devicePixelRatio, _.height = t * devicePixelRatio, _.style.width = n + "px", _.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Te);
function nn() {
  u.clearRect(0, 0, _.width, _.height), u.lineWidth = a().lineWidth, u.lineCap = "round";
}
function rt(n) {
  return n;
}
function J(n, t = k(), e = rt) {
  const i = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(i.x, i.y, u.lineWidth * 2, 0, Y), u.fill();
}
function L(n, t, e = k(), i = rt) {
  const s = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const o = i(n), r = i(t);
  u.moveTo(o.x, o.y), u.lineTo(r.x, r.y), u.stroke(), u.lineWidth = s;
}
function ge(n, t, e, i = k(), s = rt) {
  n = s(n), t = s(t);
  const o = t.x - n.x, r = t.y - n.y, h = Math.atan2(r, o) + Math.PI / 2, m = Math.sin(h), x = Math.cos(h), w = Math.sqrt(o ** 2 + r ** 2) * Math.sin(e + Date.now() / 300) / 20;
  u.strokeStyle = i, u.beginPath(), u.moveTo(n.x, n.y), u.bezierCurveTo(
    n.x + o / 3 + w * x,
    n.y + r / 3 + w * m,
    t.x - o / 3 - w * x,
    t.y - r / 3 - w * m,
    t.x,
    t.y
  ), u.stroke();
}
function Ve(n, t, e, i, s = k(), o = rt) {
  const r = o(i === "cw" ? t : e), h = o(i === "cw" ? e : t), m = o(n), x = Math.atan2(r.y - m.y, r.x - m.x), b = Math.atan2(h.y - m.y, h.x - m.x), w = Math.abs(b - x) < 0.05, v = E(m, i === "cw" ? r : h);
  u.strokeStyle = s, u.beginPath(), u.arc(m.x, m.y, v, x, w ? x + Y : b), u.stroke();
}
function sn(n, t, e, i) {
  u.fillStyle = i, u.beginPath(), u.arc(n, t, e, 0, Y), u.fill();
}
function ze(n, t, e = k(), i = rt) {
  u.fillStyle = e;
  const s = 12;
  u.font = `${s}px Major Mono Display`;
  const o = u.measureText(t).width, { x: r, y: h } = i(n);
  u.fillText(t, r - o / 2, h + s / 2);
}
function k(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= a().baseAlphaMultiplier, `rgba(255,255,255,${a().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
const lt = zt() ? 12 : 6, we = zt() ? 190 : 0;
class Ot {
  constructor(t) {
    this.parent = t, this.writes = /* @__PURE__ */ new WeakMap(), this.parentValueCache = new WeakRef(/* @__PURE__ */ new WeakMap()), this.children = /* @__PURE__ */ new Set(), this.numWrites = 0, this.sealed = !1, this.receivedPasteFrom = null, this.x = -100, this.y = -100, this.depth = 0, this.breadth = 0, this.rand = Math.random() * 100;
  }
  bookmark() {
    Ct = this;
  }
  pasteInto(t) {
    t.sealed && (t = t.sprout()), t.receivedPasteFrom = this, this.doInTempChild(() => {
      const e = window.drawing(), i = new window.Drawing();
      i.addInstance(e, { x: 0, y: 0 }, e.size, 0), window.dismemberAllInstances(i), i.forEachVar((s) => {
        const o = s.value;
        t.do(() => s.value = o);
      });
      for (const s of i.things)
        t.do(() => window.drawing().things.unshift(s));
      i.constraints.forEach((s) => {
        t.do(() => window.drawing().constraints.add(s));
      });
    }), t.goInto();
  }
  set(t, e) {
    var i;
    e === this.get(t) || (this.sealed ? (B = this.sprout(), B.set(t, e)) : this.writes.has(t) ? e === ((i = this.parent) == null ? void 0 : i.get(t)) ? (this.writes.delete(t), this.numWrites--) : this.writes.set(t, e) : (this.writes.set(t, e), this.numWrites++));
  }
  get(t) {
    var s;
    if (this.writes.has(t))
      return this.writes.get(t);
    let e = this.parentValueCache.deref();
    if (e != null && e.has(t))
      return this.parentValueCache.deref().get(t);
    const i = (s = this.parent) == null ? void 0 : s.get(t);
    return e || (e = /* @__PURE__ */ new WeakMap(), this.parentValueCache = new WeakRef(e)), e.set(t, i), i;
  }
  sprout() {
    const t = new Ot(this);
    return this.children.add(t), t;
  }
  disown(t) {
    this.children.delete(t);
  }
  goInto() {
    B = this;
  }
  do(t) {
    const e = B;
    B = this;
    try {
      t();
    } finally {
      B = e;
    }
  }
  doInTempChild(t) {
    let e = B;
    B = this.sprout();
    try {
      t();
    } finally {
      this.children.delete(B), B = e;
    }
  }
  hasWrites() {
    return this.numWrites > 0;
  }
  seal() {
    this.sealed = !0;
  }
  updateRenderingInfo() {
    this.children.size === 0 ? (this.depth = 1, this.breadth = 1) : ([...this.children].forEach((t) => t.updateRenderingInfo()), this.breadth = [...this.children].map((t) => t.breadth).reduce((t, e) => t + e, 0), this.depth = 1 + [...this.children].map((t) => t.depth).reduce((t, e) => Math.max(t, e), 0));
  }
  render() {
    const t = lt * 3;
    this._render(
      20 + we,
      innerHeight - 20 - t,
      (innerWidth - 40 - we) / (vt.depth - 1),
      t
    ), B.renderCircle("yellow");
    const e = a().flicker;
    if (a().flicker = !1, a().onionSkinAlpha === 0)
      return;
    const i = window.drawing();
    let s = B.parent, o = a().onionSkinAlpha;
    for (; s; ) {
      let h = !0;
      if (s.do(() => {
        window.drawing() !== i ? h = !1 : It(o, () => i.render());
      }), !h)
        break;
      o *= a().onionSkinAlpha, s = s.parent;
    }
    o = a().onionSkinAlpha;
    let r = [...B.children];
    for (; r.length > 0; ) {
      const h = [];
      for (const m of r)
        m.do(() => {
          window.drawing() === i && (It(o, () => i.render()), h.push(...m.children));
        });
      o *= a().onionSkinAlpha, r = h;
    }
    a().flicker = e;
  }
  _render(t, e, i, s) {
    this.x = t, this.y = e;
    let o = e;
    for (const r of this.children)
      ge(this, { x: t + i, y: o }, r.rand, "rgba(100, 149, 237, .7)"), r._render(t + i, o, i, s), o -= r.breadth * s;
    this.receivedPasteFrom && ge(this, this.receivedPasteFrom, this.rand, "rgba(255, 165, 0, .7)"), this.renderCircle(this === Ct ? "rgb(255, 165, 0)" : "cornflowerblue");
  }
  renderCircle(t) {
    sn(
      this.x,
      this.y,
      lt + lt / 10 * Math.sin(Date.now() / 300 + this.rand),
      t
    );
  }
}
const vt = new Ot();
let B = vt;
const G = () => B;
window.thisWorld = G;
const mt = () => vt;
let Ct = null;
const rn = () => Ct;
function Re(n) {
  let t = null, e = 1 / 0;
  const i = 3 * lt;
  s(vt), t && (B = t);
  function s(o) {
    const r = E(n, o);
    r < i && r < e && (t = o, e = r), o.children.forEach(s);
  }
}
let an = 0;
class f {
  constructor(t) {
    this.id = an++, this.value = t;
  }
  get value() {
    return B.get(this);
  }
  set value(t) {
    B.set(this, t);
  }
}
class I {
  constructor(...t) {
    this._first = new f(null);
    for (let e = t.length - 1; e >= 0; e--)
      this.unshift(t[e]);
  }
  get first() {
    return this._first.value;
  }
  set first(t) {
    this._first.value = t;
  }
  clear() {
    this.first = null;
  }
  isEmpty() {
    return this.first === null;
  }
  includes(t) {
    let e = !1;
    return this.forEach((i) => {
      i === t && (e = !0);
    }), e;
  }
  find(t) {
    let e;
    return this.forEach((i) => {
      e === void 0 && t(i) && (e = i);
    }), e;
  }
  unshift(t) {
    this.first = new on(t, this.first);
  }
  pop() {
    if (this.first == null)
      throw new Error();
    const t = this.first.value;
    return this.first = this.first.next, t;
  }
  filter(t) {
    const e = new I();
    return this.forEach((i) => {
      t(i) && e.unshift(i);
    }), e.reversed();
  }
  map(t) {
    const e = new I();
    return this.forEach((i) => {
      e.unshift(t(i));
    }), e.reversed();
  }
  reversed() {
    const t = new I();
    return this.forEach((e) => t.unshift(e)), t;
  }
  replace(t, e) {
    let i = this.first;
    for (; i; )
      i.value === t && (i.value = e), i = i.next;
  }
  removeAll(t) {
    let e = null, i = this.first;
    for (this.first = null; i; ) {
      const s = i.next;
      i.next = null, t(i.value) || (e ? e.next = i : this.first = i, e = i), i = s;
    }
  }
  forEachVar(t) {
    t(this._first);
    let e = this.first;
    for (; e; )
      e.forEachVar(t), e = e.next;
  }
  forEach(t) {
    let e = this.first;
    for (; e; )
      t(e.value), e = e.next;
  }
  withDo(t, e) {
    let i = this.first;
    if (t.forEach((s) => {
      if (!i)
        throw new Error("withDo() requires the two lists to have the same length");
      e(i.value, s), i = i.next;
    }), i)
      throw new Error("withDo() requires the two lists to have the same length");
  }
  *[Symbol.iterator]() {
    let t = this.first;
    for (; t; )
      yield t.value, t = t.next;
  }
  // every(pred: (x: T) => boolean) {
  //   for (const x of this) {
  //     if (!pred(x)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  // some(pred: (x: T) => boolean) {
  //   for (const x of this) {
  //     if (pred(x)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // reduce<S>(fn: (prev: S, next: T) => S, z: S) {
  //   let ans = z;
  //   for (const x of this) {
  //     ans = fn(ans, x);
  //   }
  //   return ans;
  // }
  toArray() {
    const t = [];
    return this.forEach((e) => t.push(e)), t;
  }
  toString() {
    return this.toArray().toString();
  }
}
class on {
  constructor(t, e) {
    this._value = new f(t), this._next = new f(e);
  }
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.value = t;
  }
  get next() {
    return this._next.value;
  }
  set next(t) {
    this._next.value = t;
  }
  forEachVar(t) {
    t(this._value), t(this._next);
  }
}
let O = 1;
const F = { x: 0, y: 0 }, y = {
  reset() {
    O = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return O;
  },
  set scale(n) {
    O = n;
  },
  centerAt({ x: n, y: t }) {
    F.x = n, F.y = t;
  },
  get center() {
    return F;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - F.x) * O + innerWidth / 2,
      y: -(t - F.y) * O + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / O + F.x,
      y: F.y - (t - innerHeight / 2) / O
    };
  }
}, q = new f(""), j = new f(null);
let Wt = 0;
function g(n, ...t) {
  q.value = n, j.value = t.length === 0 ? null : t.map((e) => new WeakRef(e)), Wt++;
}
let be = 0, ve = q.value, Ee = j.value, Se = 0, Le = "bottom";
function yt(n) {
  Le = n;
}
function cn() {
  const n = Date.now();
  (Wt !== be || q.value !== ve || j.value !== Ee) && (be = Wt, ve = q.value, Ee = j.value, Se = n);
  const t = n - Se;
  if (t > a().statusTimeMillis)
    return;
  const e = 40;
  u.font = `${e}px Monaco`;
  const i = u.measureText(q.value).width, s = 1 - pe(t / a().statusTimeMillis);
  if (u.fillStyle = `rgba(255,222,33,${s})`, u.fillText(
    q.value,
    (innerWidth - i) / 2,
    Le === "top" ? 1.2 * e : innerHeight - e
  ), a().highlightReferents && j.value) {
    const r = `rgba(255,222,33,${1 - pe(t / (0.5 * a().statusTimeMillis))})`;
    for (const h of j.value) {
      const m = h.deref();
      m == null || m.render(y.toScreenPosition, r, 2);
    }
  }
}
class W {
  // override in subclasses like weight constraint
  preRelax() {
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    let i = !0;
    return this.forEachThing((s) => {
      t.has(s) ? this.forEachHandle((o) => {
        e.has(o) || (i = !1);
      }) : i = !1;
    }), i;
  }
}
class Ft extends W {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  constructor(t, { x: e, y: i }) {
    super(), this._p = new f(t), this.pos = { x: e, y: i };
  }
  get signature() {
    return `FP(${this.p.id})`;
  }
  computeError() {
    return E(this.p, this.pos) * 100;
  }
  map(t, e, i) {
    return new Ft(e.get(this.p), i(this.pos));
  }
  forEachVar(t) {
    t(this._p);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e);
  }
}
class Ht extends W {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e) {
    super(), this._a = new f(t), this._b = new f(e);
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `HorV(${t},${e})`;
  }
  computeError() {
    return Math.min(Math.abs(this.a.x - this.b.x), Math.abs(this.a.y - this.b.y));
  }
  map(t, e) {
    return new Ht(e.get(this.a), e.get(this.b));
  }
  forEachVar(t) {
    t(this._a), t(this._b);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class xt extends W {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e) {
    super(), this._a = new f(t), this._b = new f(e), this.distance = E(t, e);
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `D(${t},${e})`;
  }
  computeError() {
    return this.distance - E(this.a, this.b);
  }
  map(t, e) {
    return new xt(e.get(this.a), e.get(this.b));
  }
  forEachVar(t) {
    t(this._a), t(this._b);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class Et extends W {
  get a1() {
    return this._a1.value;
  }
  set a1(t) {
    this._a1.value = t;
  }
  get b1() {
    return this._b1.value;
  }
  set b1(t) {
    this._b1.value = t;
  }
  get a2() {
    return this._a2.value;
  }
  set a2(t) {
    this._a2.value = t;
  }
  get b2() {
    return this._b2.value;
  }
  set b2(t) {
    this._b2.value = t;
  }
  constructor(t, e, i, s) {
    super(), this._a1 = new f(t), this._b1 = new f(e), this._a2 = new f(i), this._b2 = new f(s);
  }
  get signature() {
    return `E(${this.a1.id},${this.b1.id},${this.a2.id},${this.b2.id})`;
  }
  computeError() {
    return Math.abs(E(this.a1, this.b1) - E(this.a2, this.b2));
  }
  map(t, e) {
    return new Et(
      e.get(this.a1),
      e.get(this.b1),
      e.get(this.a2),
      e.get(this.b2)
    );
  }
  forEachVar(t) {
    t(this._a1), t(this._b1), t(this._a2), t(this._b2);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a1), t(this.b1), t(this.a2), t(this.b2);
  }
  replaceHandle(t, e) {
    this.a1 === t && (this.a1 = e), this.b1 === t && (this.b1 = e), this.a2 === t && (this.a2 = e), this.b2 === t && (this.b2 = e);
  }
}
class tt extends W {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e, i) {
    super(), this._p = new f(t), this._a = new f(e), this._b = new f(i);
  }
  get signature() {
    return `POL(${this.p.id},${this.a.id},${this.b.id})`;
  }
  computeError() {
    return De(this.p, this.a, this.b);
  }
  map(t, e) {
    return new tt(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b)
    );
  }
  forEachVar(t) {
    t(this._p), t(this._a), t(this._b);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p), t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e), this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class et extends W {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get c() {
    return this._c.value;
  }
  set c(t) {
    this._c.value = t;
  }
  constructor(t, e, i, s) {
    super(), this._p = new f(t), this._a = new f(e), this._b = new f(i), this._c = new f(s);
  }
  get signature() {
    return `POA(${this.p.id},${this.a.id},${this.b.id},${this.c.id})`;
  }
  computeError() {
    return E(this.p, this.c) - E(this.a, this.c);
  }
  map(t, e) {
    return new et(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b),
      e.get(this.c)
    );
  }
  forEachVar(t) {
    t(this._p), t(this._a), t(this._b), t(this._c);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p), t(this.a), t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e), this.a === t && (this.a = e), this.b === t && (this.b = e), this.c === t && (this.c = e);
  }
}
class St extends W {
  constructor(t, e, i) {
    super(), this.instance = e, this._instancePoint = new f(t), this._masterPoint = new f(i);
  }
  get instancePoint() {
    return this._instancePoint.value;
  }
  set instancePoint(t) {
    this._instancePoint.value = t;
  }
  get masterPoint() {
    return this._masterPoint.value;
  }
  set masterPoint(t) {
    this._masterPoint.value = t;
  }
  get signature() {
    return `PI(${this.instance.id},${this.masterPoint.id})`;
  }
  computeError() {
    return E(
      this.instancePoint,
      Ce(
        Rt(
          Lt(this.masterPoint, ft, this.instance.angle),
          ft,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
  map(t, e) {
    return new St(
      e.get(this.instancePoint),
      t.get(this.instance),
      this.masterPoint
    );
  }
  forEachVar(t) {
    t(this._instancePoint), t(this._masterPoint);
  }
  forEachThing(t) {
    t(this.instance);
  }
  forEachHandle(t) {
    t(this.instancePoint), t(this.masterPoint);
  }
  replaceHandle(t, e) {
    this.instancePoint === t && (this.instancePoint = e), this.masterPoint === t && (this.masterPoint = e);
  }
}
class $t extends W {
  constructor(t, e = 1) {
    super(), this.instance = t, this.scale = e;
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
  map(t, e) {
    return new $t(t.get(this.instance), this.scale);
  }
  forEachThing(t) {
    t(this.instance);
  }
  forEachVar(t) {
  }
  forEachHandle(t) {
  }
  replaceHandle(t, e) {
  }
}
class Xt extends W {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  constructor(t) {
    super(), this._a = new f(t);
  }
  get signature() {
    return `W(${this.a.id})`;
  }
  preRelax() {
    this.y0 = this.a.y;
  }
  computeError() {
    return this.y0 - a().weight - this.a.y;
  }
  map(t, e) {
    return new Xt(e.get(this.a));
  }
  forEachVar(t) {
    t(this._a);
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e);
  }
}
class Be {
  constructor() {
    this._constraints = new f(new I());
  }
  get constraints() {
    return this._constraints.value;
  }
  set constraints(t) {
    this._constraints.value = t;
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((i) => i.signature === e) || this.constraints.unshift(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter((e) => e !== t);
  }
  clear() {
    this.constraints = new I();
  }
  isEmpty() {
    return this.constraints.isEmpty();
  }
  replaceHandle(t, e) {
    const i = this.constraints;
    this.constraints = new I(), i.forEach((s) => {
      s.replaceHandle(t, e), this.add(s);
    });
  }
  forEach(t) {
    this.constraints.forEach(t);
  }
  forEachVar(t) {
    this.constraints.forEach((e) => e.forEachVar(t));
  }
  relax(t) {
    this.forEach((o) => o.preRelax());
    const e = y.scale > 0 ? 1 / y.scale : 1, i = a().minWorthwhileErrorImprovement * e;
    let s = !1;
    for (const o of t)
      s = this.relaxWithVar(o, e, i) || s;
    return s;
  }
  relaxWithVar(t, e, i) {
    const s = t.value, o = this.computeError() - i;
    t.value = s + e;
    const r = this.computeError();
    t.value = s - e;
    const h = this.computeError();
    return r < Math.min(o, h) ? (t.value = s + e, !0) : h < Math.min(o, r) ? (t.value = s - e, !0) : (t.value = s, !1);
  }
  computeError() {
    let t = 0;
    return this.constraints.forEach((e) => {
      t += e.computeError() ** 2;
    }), t;
  }
}
const wt = class wt {
  constructor({ x: t, y: e }) {
    this.id = wt.nextId++, this._x = new f(t), this._y = new f(e);
  }
  get x() {
    return this._x.value;
  }
  set x(t) {
    this._x.value = t;
  }
  get y() {
    return this._y.value;
  }
  set y(t) {
    this._y.value = t;
  }
  contains(t) {
    return E(t, this) <= a().closeEnough / y.scale;
  }
  distanceTo(t) {
    return E(this, t);
  }
  moveBy(t, e) {
    this.x += t, this.y += e;
  }
  render(t, e = a().instanceSideAttacherColor) {
    a().debug && ze(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), J(this, e, t);
  }
  forEachHandle(t) {
    t(this);
  }
  replaceHandle(t, e) {
    throw new Error("should never call replace() on Handle");
  }
  forEachRelaxableVar(t) {
    t(this._x), t(this._y);
  }
  forEachVar(t) {
    this.forEachRelaxableVar(t);
  }
  toString() {
    return `handle(id=${this.id})`;
  }
};
wt.nextId = 0;
let A = wt;
class H {
  constructor(t, e, i) {
    this.isGuide = i, this._a = new f(new A(t)), this._b = new f(new A(e));
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get x() {
    return (this.a.x + this.b.x) / 2;
  }
  get y() {
    return (this.a.y + this.b.y) / 2;
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= a().closeEnough / y.scale;
  }
  distanceTo(t) {
    return De(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !a().showGuideLines)
      return;
    const i = this.isGuide ? a().guideLineColor : e ?? k();
    L(this.a, this.b, i, t);
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
  forEachRelaxableVar(t) {
    this.forEachHandle((e) => e.forEachRelaxableVar(t));
  }
  forEachVar(t) {
    t(this._a), t(this._b), this.forEachRelaxableVar(t);
  }
}
class Q {
  constructor(t, e, i, s) {
    this.direction = s, this._a = new f(new A(t)), this._b = new f(E(t, e) === 0 ? this.a : new A(e)), this._c = new f(new A(i));
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get c() {
    return this._c.value;
  }
  set c(t) {
    this._c.value = t;
  }
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    if (this.distanceTo(t) > a().closeEnough / y.scale)
      return !1;
    const e = this.direction === "cw" ? this.a : this.b, i = this.direction === "cw" ? this.b : this.a, s = Z(e, this.c), o = Z(i, this.c), r = Z(t, this.c), h = x(o, s), m = x(r, s);
    return 0 <= m && m <= h;
    function x(b, w) {
      const v = b.x * w.x + b.y * w.y, _t = b.x * w.y - b.y * w.x;
      return (Math.atan2(_t, v) + Y) % Y;
    }
  }
  distanceTo(t) {
    return Math.abs(E(t, this.c) - E(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    Ve(this.c, this.a, this.b, this.direction, e ?? k(), t), i === 1 && a().showControlPoints && (J(this.a, a().controlPointColor, t), J(this.b, a().controlPointColor, t), J(this.c, a().controlPointColor, t));
  }
  forEachHandle(t) {
    t(this.a), this.a !== this.b && t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e), this.c === t && (this.c = e);
  }
  forEachRelaxableVar(t) {
    this.forEachHandle((e) => e.forEachRelaxableVar(t));
  }
  forEachVar(t) {
    t(this._a), t(this._b), t(this._c), this.forEachRelaxableVar(t);
  }
}
const bt = class bt {
  constructor(t, e, i, s, o, r) {
    this.master = t, this.transform = (h) => Ce(Rt(Lt(h, ft, this.angle), ft, this.scale), this), this.id = bt.nextId++, this._x = new f(e), this._y = new f(i), this._angleAndSizeVecX = new f(s * Math.cos(o)), this._angleAndSizeVecY = new f(s * Math.sin(o)), this._attachers = new f(
      t.attachers.map((h) => this.createAttacher(h, r))
    );
  }
  get x() {
    return this._x.value;
  }
  set x(t) {
    this._x.value = t;
  }
  get y() {
    return this._y.value;
  }
  set y(t) {
    this._y.value = t;
  }
  get attachers() {
    return this._attachers.value;
  }
  set attachers(t) {
    this._attachers.value = t;
  }
  createAttacher(t, e) {
    const i = new A(this.transform(t));
    return e.constraints.add(new St(i, this, t)), i;
  }
  addAttacher(t, e) {
    this.attachers.unshift(this.createAttacher(t, e));
  }
  get size() {
    return Math.sqrt(
      Math.pow(this._angleAndSizeVecX.value, 2) + Math.pow(this._angleAndSizeVecY.value, 2)
    );
  }
  set size(t) {
    const e = this.angle;
    this._angleAndSizeVecX.value = t * Math.cos(e), this._angleAndSizeVecY.value = t * Math.sin(e);
  }
  get angle() {
    return Math.atan2(this._angleAndSizeVecY.value, this._angleAndSizeVecX.value);
  }
  set angle(t) {
    const e = this.size;
    this._angleAndSizeVecX.value = e * Math.cos(t), this._angleAndSizeVecY.value = e * Math.sin(t);
  }
  get scale() {
    return this.size / this.master.size;
  }
  set scale(t) {
    this.size = t * this.master.size;
  }
  contains(t) {
    const { topLeft: e, bottomRight: i } = this.boundingBox();
    return e.x <= t.x && t.x <= i.x && i.y <= t.y && t.y <= e.y;
  }
  boundingBox(t = this.master) {
    const { topLeft: e, bottomRight: i } = this.master.boundingBox(t), s = [
      e,
      i,
      { x: e.x, y: i.y },
      { x: i.x, y: e.y }
    ].map(this.transform);
    return We(s);
  }
  distanceTo(t) {
    return E(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    this.master.render((s) => t(this.transform(s)), e, i), i === 1 && this.attachers.withDo(this.master.attachers, (s, o) => {
      const r = t(s);
      L(
        t(this.transform(o)),
        r,
        a().instanceSideAttacherColor
      ), J(r, a().instanceSideAttacherColor);
    });
  }
  forEachHandle(t) {
    this.attachers.forEach(t);
  }
  replaceHandle(t, e) {
    this.attachers = this.attachers.map((i) => i === t ? e : i);
  }
  forEachRelaxableVar(t) {
    t(this._x), t(this._y), t(this._angleAndSizeVecX), t(this._angleAndSizeVecY), this.forEachHandle((e) => e.forEachRelaxableVar(t));
  }
  forEachVar(t) {
    t(this._attachers), this.attachers.forEachVar(t), this.forEachRelaxableVar(t);
  }
};
bt.nextId = 0;
let P = bt;
class Yt {
  constructor() {
    this._things = new f(new I()), this._attachers = new f(new I()), this.constraints = new Be();
  }
  get things() {
    return this._things.value;
  }
  set things(t) {
    this._things.value = t;
  }
  get attachers() {
    return this._attachers.value;
  }
  set attachers(t) {
    this._attachers.value = t;
  }
  clear() {
    this.things = new I(), this.attachers = new I(), this.constraints.clear();
  }
  isEmpty() {
    return this.things.isEmpty();
  }
  relax() {
    return this.constraints.relax(this.getRelaxableVars());
  }
  render(t = y.toScreenPosition, e, i = 0) {
    i > a().maxDepth || (this.things.forEach((s) => s.render(t, e, i + 1)), i === 0 && (this.attachers.forEach((s) => s.render(t, a().masterSideAttacherColor)), this.constraints.forEach((s) => {
      if (s instanceof xt) {
        let o = (s.computeError() * 100).toFixed();
        o === "-0" && (o = "0"), this.drawText(
          o,
          a().distanceConstraintTextScale,
          t({
            x: s.a.x + a().distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + a().distanceConstraintLabelPct * (s.b.y - s.a.y)
          })
        );
      }
    })));
  }
  contains(t) {
    if (this === t)
      return !0;
    for (const e of this.things)
      if (e instanceof P && e.master.contains(t))
        return !0;
    return !1;
  }
  addInstance(t, { x: e, y: i }, s, o) {
    const r = new P(t, e, i, s, o, this);
    return this.things.unshift(r), r;
  }
  resizeInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof P))
      return !1;
    i.scale *= e;
    for (const s of i.attachers) {
      const { x: o, y: r } = Rt(s, i, e);
      s.x = o, s.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof P))
      return !1;
    i.angle += e;
    for (const s of i.attachers) {
      const { x: o, y: r } = Lt(s, i, e);
      s.x = o, s.y = r;
    }
    return !0;
  }
  addLine(t, e, i = !1, s = !0) {
    const o = new H(t, e, i);
    !i && s && (this.mergeAndAddImplicitConstraints(o.a), this.mergeAndAddImplicitConstraints(o.b));
    for (const r of this.things)
      r.forEachHandle((h) => {
        h !== o.a && h !== o.b && o.contains(h) && this.constraints.add(new tt(h, o.a, o.b));
      });
    return this.things.unshift(o), o;
  }
  addArc(t, e, i, s, o = !0) {
    const r = new Q(t, e, i, s);
    o && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new Et(r.a, r.c, r.b, r.c));
    for (const h of this.things)
      h.forEachHandle((m) => {
        m !== r.a && m !== r.b && m !== r.c && r.contains(m) && this.constraints.add(new et(m, r.a, r.b, r.c));
      });
    return this.things.unshift(r), r;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i.forEachHandle((s) => {
        s !== t && s.contains(t) && (this.replaceHandle(s, t), e.add(i));
      });
    for (const i of this.things)
      e.has(i) || !i.contains(t) || (i instanceof H ? (this.constraints.add(new tt(t, i.a, i.b)), a().showImplicitConstraints && g("(point on line)", t, i)) : i instanceof Q && (this.constraints.add(new et(t, i.a, i.b, i.c)), a().showImplicitConstraints && g("(point on arc)", t, i)));
  }
  replaceHandle(t, e) {
    this.things.forEach((i) => i.replaceHandle(t, e)), this.attachers = this.attachers.map((i) => i === t ? e : i), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? this.deleteThing(e) : !1;
  }
  deleteThing(t) {
    return this.things = this.things.filter((e) => e !== t), g("delete", t), !0;
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Ft(e, t)), g("fixed point", e), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Xt(e)), g("weight", e), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof H ? (this.constraints.add(new xt(e.a, e.b)), g("fixed distance", e), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof H ? (this.constraints.add(new Ht(e.a, e.b)), g("HorV", e), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof P ? (this.constraints.add(new $t(e)), g("full size", e), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof P ? (this.inline(e), g("dismember", e), !0) : !1;
  }
  dismemberAllInstances() {
    for (; ; ) {
      let t = !1;
      for (const e of this.things)
        e instanceof P && (t = !0, this.inline(e));
      if (!t)
        break;
    }
  }
  inline(t) {
    const { things: e, constraints: i } = t.master, s = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof H) {
        const h = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        s.set(r.a, h.a), s.set(r.b, h.b);
      } else if (r instanceof Q) {
        const h = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c),
          r.direction
        );
        s.set(r.a, h.a), s.set(r.b, h.b), s.set(r.c, h.c);
      } else if (r instanceof P) {
        const h = this.addInstance(
          r.master,
          t.transform(r),
          // move the center to the right place
          t.scale * r.size,
          t.angle + r.angle
        );
        o.set(r, h);
      } else
        throw new Error("unsupported thing type: " + r.constructor.name);
    i.forEach((r) => {
      this.constraints.add(r.map(o, s, t.transform));
    }), this.things = this.things.filter((r) => r !== t);
  }
  snap(t, e, i) {
    const s = this.handleAt(t, e);
    if (s)
      return h(s), "H";
    if (i && E(t, i) <= a().closeEnough / y.scale)
      return h(i), "H";
    let o = null;
    const r = [];
    return G().doInTempChild(() => {
      const x = new Be(), b = new A(t), w = /* @__PURE__ */ new Set();
      b.forEachRelaxableVar((v) => w.add(v));
      for (const v of this.things)
        v === e || e instanceof A && m(v, e) || !v.contains(t) || (v instanceof H ? (x.add(new tt(b, v.a, v.b)), r.push("L")) : v instanceof Q && (x.add(new et(b, v.a, v.b, v.c)), r.push("A")));
      if (!x.isEmpty()) {
        for (; x.relax(w); )
          ;
        o = { x: b.x, y: b.y };
      }
    }), o && h(o), r.join();
    function h(x) {
      if (e) {
        const b = x.x - e.x, w = x.y - e.y;
        e.moveBy(b, w);
      }
      t.x = x.x, t.y = x.y;
    }
    function m(x, b) {
      let w = !1;
      return x.forEachHandle((v) => {
        v === b && (w = !0);
      }), w;
    }
  }
  handleAt(t, e = null) {
    let i = 1 / 0, s = null;
    for (const o of this.things)
      o.forEachHandle((r) => {
        if (r !== e && r.contains(t)) {
          const h = E(t, r);
          h < i && (s = r, i = h);
        }
      });
    return s;
  }
  thingAt(t) {
    let e = 1 / 0, i = null;
    for (const s of this.things)
      if (s.contains(t)) {
        const o = s.distanceTo(t);
        o < e && (i = s, e = o);
      }
    return i;
  }
  leave() {
    this.center();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), i = -(t.x + e.x) / 2, s = -(t.y + e.y) / 2;
    for (const o of this.getPositions())
      o.x += i, o.y += s;
  }
  boundingBox(t = this) {
    const e = [...this.getPositions(!1)];
    for (const i of this.things)
      if (i instanceof P && i.master !== t) {
        const s = i.boundingBox(t);
        e.push(s.topLeft), e.push(s.bottomRight);
      }
    return We(e);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: i } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(i, 2));
    return Math.sqrt(t) * 2;
  }
  getHandle(t) {
    let e, i = 0;
    for (const s of this.things)
      s.forEachHandle((o) => {
        i++ === t && (e = o);
      });
    return e;
  }
  getPositions(t = !0) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i instanceof P && e.add(i), i.forEachHandle((s) => {
        (!(i instanceof Q) || t || s !== i.c) && e.add(s);
      });
    return e;
  }
  forEachVar(t) {
    this.constraints.forEachVar(t), t(this._things), this.things.forEachVar(t), this.things.forEach((e) => e.forEachVar(t)), t(this._attachers), this.attachers.forEachVar(t), this.attachers.forEach((e) => e.forEachVar(t));
  }
  getRelaxableVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachRelaxableVar((i) => t.add(i));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const i of this.things)
      i instanceof P && i.master === t && i.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((i) => {
      if (i instanceof St && i.masterPoint === e) {
        const { instance: s, instancePoint: o } = i;
        s.attachers = s.attachers.filter((r) => r !== o), this.constraints.remove(i);
      }
    });
  }
  drawText(t, e, i) {
    Oe(
      t,
      e,
      (s, o, r) => s.render(
        ({ x: h, y: m }) => ({
          x: h * r + o - y.center.x + i.x,
          y: -m * r + i.y
        }),
        void 0,
        1
      )
    );
  }
}
window.Drawing = Yt;
const hn = {
  __map: !0,
  values: [
    [
      " ",
      []
    ],
    [
      "A",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 2,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 4
          },
          start: {
            x: 1,
            y: 4
          }
        }
      ]
    ],
    [
      "B",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 1.6510788551694173,
          radius: 2,
          end: -1.7538223513576943
        },
        {
          center: {
            target: {},
            x: 2,
            y: 6
          },
          command: "arc",
          start: 1.6088526566614771,
          radius: 2,
          end: -1.6497448846816716
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        }
      ]
    ],
    [
      "C",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: -3.14159265359,
          radius: 2,
          end: 0.39269908169
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: -0.39269908169,
          radius: 2,
          end: 3.14159265359
        }
      ]
    ],
    [
      "D",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          center: {
            x: 0,
            y: 4
          },
          command: "arc",
          start: 1.5707963267948966,
          radius: 4,
          end: -1.5839465742972498
        }
      ]
    ],
    [
      "E",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        }
      ]
    ],
    [
      "F",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        }
      ]
    ],
    [
      "G",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: 0.39269908169
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.106747414219492
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 4
          },
          start: {
            x: 4,
            y: 2
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 4
          },
          start: {
            x: 2,
            y: 4
          }
        }
      ]
    ],
    [
      "H",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        }
      ]
    ],
    [
      "I",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "J",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 8
          }
        },
        {
          center: {
            x: 1,
            y: 1
          },
          command: "arc",
          start: 0.03160956695399596,
          radius: 1,
          end: -2.4475630944962603
        }
      ]
    ],
    [
      "K",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 3
          },
          start: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 1,
            y: 4
          }
        }
      ]
    ],
    [
      "L",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        }
      ]
    ],
    [
      "M",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 2,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        }
      ]
    ],
    [
      "N",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 4,
            y: 0
          }
        }
      ]
    ],
    [
      "O",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: 0
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0.02388313118406498,
          radius: 2,
          end: 3.1354718854624473
        }
      ]
    ],
    [
      "P",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        },
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 1.5707963267948966,
          radius: 2,
          end: -1.5731239338803342
        }
      ]
    ],
    [
      "Q",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: -0.07706266528326922
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 2
          },
          start: {
            x: 4,
            y: 0
          }
        }
      ]
    ],
    [
      "R",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        },
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 1.5954287038581172,
          radius: 2,
          end: -1.5815161841573633
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 2,
            y: 4
          }
        }
      ]
    ],
    [
      "S",
      [
        {
          center: {
            x: 1.75,
            y: 6.5
          },
          command: "arc",
          end: 0.39269908169,
          radius: 1.5,
          start: 4.71238898038
        },
        {
          center: {
            x: 1.75,
            y: 2.5
          },
          command: "arc",
          end: 3.9269908169872414,
          radius: 2.5,
          start: 1.57079632679
        }
      ]
    ],
    [
      "T",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "U",
      [
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 8
          }
        }
      ]
    ],
    [
      "V",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        }
      ]
    ],
    [
      "W",
      [
        {
          command: "line",
          end: {
            x: 1,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 1,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 0
          },
          start: {
            x: 2,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 3,
            y: 0
          }
        }
      ]
    ],
    [
      "X",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        }
      ]
    ],
    [
      "Y",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 4
          },
          start: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 4
          }
        }
      ]
    ],
    [
      "Z",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        }
      ]
    ],
    [
      "!",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 0.5
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 2
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      '"',
      [
        {
          command: "line",
          end: {
            x: 1,
            y: 7
          },
          start: {
            x: 1,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 7
          },
          start: {
            x: 3,
            y: 8
          }
        }
      ]
    ],
    [
      "#",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 6
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 0,
            y: 2
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 0
          },
          start: {
            x: 1,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 0
          },
          start: {
            x: 3,
            y: 8
          }
        }
      ]
    ],
    [
      "$",
      [
        {
          center: {
            x: 2,
            y: 5
          },
          command: "arc",
          end: -3.1366587024285186,
          radius: 2,
          start: -0.04184657174182395
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 3
          },
          start: {
            x: 0,
            y: 5
          }
        },
        {
          center: {
            x: 2,
            y: 2.5
          },
          command: "arc",
          end: 0.08025313177817016,
          radius: 2,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "%",
      [
        {
          center: {
            x: 0.5,
            y: 7
          },
          command: "arc",
          end: 9.42477796076938,
          radius: 0.5,
          start: 3.141592653589793
        },
        {
          center: {
            x: 3.5,
            y: 1.5
          },
          command: "arc",
          end: 9.42477796076938,
          radius: 0.5,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        }
      ]
    ],
    [
      "&",
      [
        {
          center: {
            x: 1.5,
            y: 6.5
          },
          command: "arc",
          end: -2.96546310296655,
          radius: 1.5,
          start: -0.1892621108591278
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 3,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          end: -0.03964869547672394,
          radius: 2,
          start: 2.9308261024851006
        }
      ]
    ],
    [
      "'",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 7
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "(",
      [
        {
          center: {
            x: 7,
            y: 4
          },
          command: "arc",
          start: -2.389383957678425,
          radius: 6,
          end: 2.4169670760178072
        }
      ]
    ],
    [
      ")",
      [
        {
          center: {
            x: -3,
            y: 4
          },
          command: "arc",
          start: 0.7451162436856023,
          radius: 6,
          end: -0.7103406998312329
        }
      ]
    ],
    [
      "*",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 3
          },
          start: {
            x: 0,
            y: 3
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 5
          }
        },
        {
          command: "line",
          end: {
            x: 3.5,
            y: 4.5
          },
          start: {
            x: 0.5,
            y: 1.5
          }
        },
        {
          command: "line",
          end: {
            x: 3.5,
            y: 1.5
          },
          start: {
            x: 0.5,
            y: 4.5
          }
        }
      ]
    ],
    [
      "+",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 3
          },
          start: {
            x: 0,
            y: 3
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 5
          }
        }
      ]
    ],
    [
      ",",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 0.25,
            y: 0.5
          }
        }
      ]
    ],
    [
      "-",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 3
          },
          start: {
            x: 0,
            y: 3
          }
        }
      ]
    ],
    [
      ".",
      [
        {
          command: "line",
          end: {
            x: 1,
            y: 0
          },
          start: {
            x: 1,
            y: 0.5
          }
        }
      ]
    ],
    [
      "/",
      [
        {
          command: "line",
          end: {
            x: 3,
            y: 8
          },
          start: {
            x: 1,
            y: 0
          }
        }
      ]
    ],
    [
      "0",
      [
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: 0
        }
      ]
    ],
    [
      "1",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 2,
            y: 0
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 7
          },
          start: {
            x: 2,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 0
          },
          start: {
            x: 1,
            y: 0
          }
        }
      ]
    ],
    [
      "2",
      [
        {
          center: {
            x: 2,
            y: 5.845
          },
          command: "arc",
          end: -1.27079632679,
          radius: 2.2,
          start: 2.74889357189
        },
        {
          center: {
            x: 4,
            y: 0
          },
          command: "arc",
          end: 1.87079632679,
          radius: 4,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        }
      ]
    ],
    [
      "3",
      [
        {
          command: "line",
          start: {
            x: 0,
            y: 8
          },
          end: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          start: {
            x: 1.5,
            y: 5
          },
          end: {
            x: 4,
            y: 8
          }
        },
        {
          center: {
            x: 2,
            y: 2.5
          },
          command: "arc",
          start: 1.76714586764,
          radius: 2.5,
          end: 4.141592653589793
        }
      ]
    ],
    [
      "4",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 3
          },
          start: {
            x: 3,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 3
          },
          start: {
            x: 0,
            y: 3
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 0
          },
          start: {
            x: 3,
            y: 8
          }
        }
      ]
    ],
    [
      "5",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 4.5
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          center: {
            x: 1.5,
            y: 2.5
          },
          command: "arc",
          start: 2.199739485396577,
          radius: 2.5,
          end: -2.2182639782647846
        }
      ]
    ],
    [
      "6",
      [
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: 3.141592653589793
        },
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          end: 0.52359877559,
          radius: 2,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        }
      ]
    ],
    [
      "7",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 1.5,
            y: 4.5
          },
          start: {
            x: 3.5,
            y: 4.5
          }
        }
      ]
    ],
    [
      "8",
      [
        {
          center: {
            x: 2,
            y: 6.5
          },
          command: "arc",
          start: 9.32477796076938,
          radius: 1.5,
          end: 3.141592653589793
        },
        {
          center: {
            x: 2,
            y: 2.5
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2.5,
          end: 3.141592653589793
        }
      ]
    ],
    [
      "9",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          end: 3.141592653589793,
          radius: 2,
          start: 3.141592653589793
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.66519142919
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 6
          }
        }
      ]
    ],
    [
      ":",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 6
          },
          start: {
            x: 2,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 1
          }
        }
      ]
    ],
    [
      ";",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 7
          },
          start: {
            x: 2,
            y: 7
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 0
          },
          start: {
            x: 2,
            y: 1
          }
        }
      ]
    ],
    [
      "<",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 4
          },
          start: {
            x: 4,
            y: 7
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 4
          },
          start: {
            x: 4,
            y: 1
          }
        }
      ]
    ],
    [
      "=",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 6
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 0,
            y: 2
          }
        }
      ]
    ],
    [
      ">",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 4
          },
          start: {
            x: 0,
            y: 7
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 1
          },
          start: {
            x: 4,
            y: 4
          }
        }
      ]
    ],
    [
      "?",
      [
        {
          center: {
            x: 2,
            y: 5.95
          },
          command: "arc",
          start: 2.748893571891069,
          radius: 2,
          end: -1
        },
        {
          center: {
            x: 4,
            y: 2.5
          },
          command: "arc",
          end: 2.05,
          radius: 2,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 2
          },
          start: {
            x: 2,
            y: 2.5
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 0.5
          }
        }
      ]
    ],
    [
      "[",
      [
        {
          command: "line",
          end: {
            x: 0,
            y: 8
          },
          start: {
            x: 2,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        }
      ]
    ],
    [
      "\\",
      [
        {
          command: "line",
          end: {
            x: 1,
            y: 8
          },
          start: {
            x: 3,
            y: 0
          }
        }
      ]
    ],
    [
      "]",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 8
          },
          start: {
            x: 2,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 4,
            y: 8
          }
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 4,
            y: 0
          }
        }
      ]
    ],
    [
      "^",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 8
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 6
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "_",
      [
        {
          command: "line",
          end: {
            x: 4,
            y: 0
          },
          start: {
            x: 0,
            y: 0
          }
        }
      ]
    ],
    [
      "`",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 7
          },
          start: {
            x: 1,
            y: 8
          }
        }
      ]
    ],
    [
      "{",
      [
        {
          center: {
            x: 1.5,
            y: 7.5
          },
          command: "arc",
          end: -2.8811037157273245,
          radius: 0.5,
          start: 1.573577609130262
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 4
          },
          start: {
            x: 0,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 7
          },
          start: {
            x: 1,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 1
          },
          start: {
            x: 1,
            y: 4
          }
        },
        {
          center: {
            x: 1.5,
            y: 0.5
          },
          command: "arc",
          end: -1.5434563603514777,
          radius: 0.5,
          start: 2.7861596501951564
        }
      ]
    ],
    [
      "|",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 0
          },
          start: {
            x: 2,
            y: 8
          }
        }
      ]
    ],
    [
      "~",
      [
        {
          center: {
            x: 3,
            y: 5.5
          },
          command: "arc",
          start: -1.0844660924940577,
          radius: 2,
          end: -2.067404489817248
        },
        {
          center: {
            x: 1,
            y: 2
          },
          command: "arc",
          start: 2.0727269753613857,
          radius: 2,
          end: 1.0592589879552556
        }
      ]
    ],
    [
      "}",
      [
        {
          center: {
            x: 2.5,
            y: 7.5
          },
          command: "arc",
          end: 1.6145838336785494,
          radius: 0.5,
          start: -0.3418203011951844
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 4
          },
          start: {
            x: 3,
            y: 7
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 4
          },
          start: {
            x: 3,
            y: 4
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 1
          },
          start: {
            x: 3,
            y: 4
          }
        },
        {
          center: {
            x: 2.5,
            y: 0.5
          },
          command: "arc",
          end: 0.4872333250305029,
          radius: 0.5,
          start: -1.6401397832768658
        }
      ]
    ],
    [
      "@",
      [
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          end: -1.421558202809281,
          radius: 2,
          start: 3.138375202071531
        },
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          end: 3.074467789762171,
          radius: 2,
          start: 0.030610164662059118
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 2
          },
          start: {
            x: 0,
            y: 6
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 4,
            y: 6
          }
        },
        {
          center: {
            x: 2,
            y: 5
          },
          command: "arc",
          end: 3.095767958286409,
          radius: 1,
          start: 0.08633071054357554
        },
        {
          center: {
            x: 2,
            y: 3
          },
          command: "arc",
          end: 0,
          radius: 1,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 3
          },
          start: {
            x: 1,
            y: 5
          }
        },
        {
          command: "line",
          end: {
            x: 3,
            y: 3
          },
          start: {
            x: 3,
            y: 5
          }
        },
        {
          command: "line",
          end: {
            x: 4,
            y: 2
          },
          start: {
            x: 2,
            y: 2
          }
        }
      ]
    ]
  ]
}, ln = 1, dn = {
  data: hn,
  version: ln
};
function un(n, t, e = a().fontScale) {
  for (const i of t)
    switch (i.command) {
      case "line": {
        const s = Pt(i.start, e), o = Pt(i.end, e);
        n.addLine(s, o, !1, !1);
        break;
      }
      case "arc": {
        const s = Pt(i.center, e), o = i.radius * e;
        n.addArc(
          _e(s, i.end, o),
          _e(s, i.start, o),
          s,
          "ccw",
          !1
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", i);
        break;
    }
}
const fn = new Map(dn.data.values), K = /* @__PURE__ */ new Map();
for (const [n, t] of fn) {
  const e = new Yt();
  un(e, t, a().fontScale), e.addLine(
    { x: -a().kerning * a().fontScale, y: 8 * a().fontScale },
    { x: (4 + a().kerning) * a().fontScale, y: 8 * a().fontScale },
    !0,
    !1
  ), e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    !0,
    !1
  ), e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: -a().kerning * a().fontScale, y: 8 * a().fontScale },
    !0,
    !1
  ), e.addLine(
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 8 * a().fontScale },
    !0,
    !1
  ), K.set(n, e), e.leave();
}
function Oe(n, t, e) {
  const i = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), s = (r) => i(r) * a().fontScale * (4 + a().kerning * 2);
  let o = y.center.x - 0.5 * [...n].map(s).reduce((r, h) => r + h, 0);
  for (let r = 0; r < n.length; r++) {
    const h = n[r], m = i(h), x = K.get(h.toUpperCase());
    x && e(x, o, m), o += s(h);
  }
}
function Pt({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function _e({ x: n, y: t }, e, i) {
  return {
    x: n + i * Math.cos(e),
    y: t + i * Math.sin(e)
  };
}
let T = null;
const c = {
  get pos() {
    return T;
  },
  snapPos(n, t) {
    return T ? l().snap(T, n, t) : null;
  },
  moveToScreenPos(n) {
    const t = y.fromScreenPosition(n);
    T ? (T.x = t.x, T.y = t.y) : T = t, mn();
  },
  clearPos() {
    T = null;
  }
};
function at(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = y.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = y.fromScreenPosition(t);
}
const D = {};
for (let n = 1; n < 10; n++)
  D["" + n] = new Yt();
let Ut = new f(D[1]);
window.drawing = Ut;
function l(n) {
  return n ? D[n] ?? K.get(n) : Ut.value;
}
window.drawing = l;
function Fe(n) {
  for (const [t, e] of Object.entries(D))
    if (e === n)
      return t;
  for (const [t, e] of K.entries())
    if (e === n)
      return t;
  return null;
}
function ot(n) {
  const t = l(n);
  !t || t === l() || (l().leave(), Ut.value = t, at(() => y.reset()), Bt(), g("drawing #" + n));
}
const At = [...Object.values(D), ...K.values()];
let d = null;
function qt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (d == null ? void 0 : d.type) === "line" && l().addLine(d.start, n), d = {
    type: "line",
    start: n
  };
}
function jt() {
  (d == null ? void 0 : d.type) === "line" && (d = null);
}
function Nt() {
  if (c.pos && ((d == null ? void 0 : d.type) !== "arc" && (d = { type: "arc", positions: [], cummRotation: 0 }), d.positions.push({ x: c.pos.x, y: c.pos.y }), d.positions.length === 3)) {
    const [n, t, e] = d.positions;
    l().addArc(t, e, n, d.cummRotation < 0 ? "cw" : "ccw"), d = null;
  }
}
function mn() {
  if (!d || d.type !== "arc" || d.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = d.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!d.prevAngle) {
    d.prevAngle = e, d.cummRotation = 0;
    return;
  }
  let i = e - d.prevAngle;
  i > Math.PI ? i -= Y : i < -Math.PI && (i += Y), d.cummRotation += i, d.prevAngle = e;
}
function Jt() {
  (d == null ? void 0 : d.type) === "arc" && (d = null);
}
function He(n, t) {
  l().attachers.removeAll((e) => e === t);
  for (const e of Object.values(D))
    e.onAttacherRemoved(n, t);
}
function yn(n, t) {
  n.attachers.unshift(t);
  for (const e of Object.values(D))
    e.onAttacherAdded(n, t);
}
function $e() {
  if (a().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l().relax(); )
      ;
  }
}
function Dt() {
  !d && l().isEmpty() && xn(), pn(), l().render(), gn(), cn(), wn();
}
function xn() {
  const n = innerWidth / 100, t = (e, i) => L(e, i, k(), y.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function pn() {
  switch (d == null ? void 0 : d.type) {
    case "line":
      c.pos && L(d.start, c.pos, k(), y.toScreenPosition);
      break;
    case "arc":
      if (a().showControlPoints)
        for (const n of d.positions)
          J(n, a().controlPointColor, y.toScreenPosition);
      d.positions.length == 2 && c.pos && d.cummRotation !== void 0 && Math.abs(d.cummRotation) > 0.05 && Ve(
        d.positions[0],
        d.positions[1],
        c.pos,
        d.cummRotation < 0 ? "cw" : "ccw",
        k(),
        y.toScreenPosition
      );
      break;
  }
}
function gn() {
  if (!c.pos)
    return;
  const n = y.toScreenPosition(c.pos);
  L(
    { x: n.x - a().crosshairsSize, y: n.y },
    { x: n.x + a().crosshairsSize, y: n.y },
    k("bold")
  ), L(
    { x: n.x, y: n.y - a().crosshairsSize },
    { x: n.x, y: n.y + a().crosshairsSize },
    k("bold")
  );
}
function wn() {
  if (!a().debug)
    return;
  const n = y.toScreenPosition({ x: 0, y: 0 });
  L({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, a().axisColor), L({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, a().axisColor);
  const t = c.pos;
  t && ze(y.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Gt() {
  return c.pos ? l().handleAt(c.pos) : null;
}
function ct() {
  return c.pos ? l().thingAt(c.pos) : null;
}
function Tt() {
  const n = ct();
  return n instanceof H ? n : null;
}
function Xe() {
  const n = ct();
  return n instanceof P ? n : null;
}
function Kt() {
  l().isEmpty() || (g("solve"), l().relax());
}
function Qt() {
  a().autoSolve = !a().autoSolve, g(`auto-solve ${a().autoSolve ? "on" : "off"}`);
}
function Zt() {
  c.pos && l().delete(c.pos) && (ue(), l().isEmpty() && at(() => y.reset()));
}
function te() {
  return !!c.pos && l().fixedDistance(c.pos);
}
function ee() {
  return !!c.pos && l().fixedPoint(c.pos);
}
function ne() {
  return !!c.pos && l().weight(c.pos);
}
function ie() {
  return !!c.pos && l().horizontalOrVertical(c.pos);
}
function se() {
  return !!c.pos && l().fullSize(c.pos);
}
function Ye() {
  const n = c.pos;
  n && (g("re-center"), at(() => {
    y.centerAt(n);
  }));
}
function re(n) {
  const t = l(n);
  if (!t.isEmpty() && c.pos && !t.contains(l())) {
    const e = l().addInstance(t, c.pos, 0.5 * t.size / y.scale, 0);
    g("instantiate #" + n, e);
  }
}
function ae() {
  c.pos && l().dismember(c.pos) && ue();
}
function Ue(n) {
  n.dismemberAllInstances(), ue();
}
window.dismemberAllInstances = Ue;
function pt(n) {
  return !!c.pos && l().rotateInstanceAt(c.pos, n);
}
function gt(n) {
  return !!c.pos && l().resizeInstanceAt(c.pos, n);
}
function oe() {
  if (!c.pos)
    return;
  const n = l().handleAt(c.pos);
  n && (l().attachers.includes(n) ? (He(l(), n), g("remove attacher")) : (yn(l(), n), g("add attacher")));
}
let $ = null;
function ce() {
  if (!$) {
    ($ = Tt()) && g("equal length", $);
    return;
  }
  const n = Tt();
  n && (l().constraints.add(
    new Et($.a, $.b, n.a, n.b)
  ), g("equal length", $, n));
}
function Bt() {
  $ = null;
}
function Vt(n) {
  at(() => y.scale = n), g("scale=" + y.scale.toFixed(1));
}
function he(n, t) {
  at(() => {
    y.center.x -= n, y.center.y -= t;
  });
}
function le() {
  G().bookmark();
}
function de() {
  const n = rn();
  n && (g("paste"), n.pasteInto(G()));
}
function ue() {
  for (; bn(); )
    ;
}
function bn() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of At)
    for (const i of e.things)
      n.add(i), i.forEachHandle((s) => t.add(s));
  for (const e of At) {
    let i = !1;
    for (const s of e.attachers)
      t.has(s) || (He(e, s), i = !0);
    if (i)
      return !0;
  }
  for (const e of At)
    e.constraints.forEach((i) => {
      i.isStillValid(n, t) || e.constraints.remove(i);
    });
  return !1;
}
const vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copy: le,
  del: Zt,
  dismember: ae,
  dismemberAllInstances: Ue,
  drawing: l,
  drawingId: Fe,
  drawings: D,
  endArc: Jt,
  endEqualLength: Bt,
  endLines: jt,
  fixedDistance: te,
  fixedPoint: ee,
  fullSize: se,
  handle: Gt,
  horizontalOrVertical: ie,
  instance: Xe,
  instantiate: re,
  line: Tt,
  moreArc: Nt,
  moreEqualLength: ce,
  moreLines: qt,
  onFrame: $e,
  panBy: he,
  paste: de,
  pen: c,
  reCenter: Ye,
  render: Dt,
  rotateInstanceBy: pt,
  scaleInstanceBy: gt,
  setScale: Vt,
  solve: Kt,
  switchToDrawing: ot,
  thing: ct,
  toggleAttacher: oe,
  toggleAutoSolve: Qt,
  weight: ne
}, Symbol.toStringTag, { value: "Module" }));
var Ie;
const En = (Ie = window.webkit) == null ? void 0 : Ie.messageHandlers, Sn = window.webkit != null;
function Pe(n, t = n) {
  Sn && En[n].postMessage(t);
}
let nt = [], kt = !1;
function Bn() {
  const n = nt;
  return nt = [], n;
}
function Ae(n) {
  for (const t of n)
    (!t.predicted || a().usePredictedEvents) && nt.push(t);
}
function fe(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (kt = !0), t === "ended" && (kt = !1), !(t === "moved" && !kt) && nt.push({
    id: n.pointerId,
    type: e,
    phase: t,
    predicted: !1,
    position: { x: n.clientX, y: n.clientY },
    pressure: n.pointerType == "mouse" ? 1 : n.pressure * 5,
    altitude: 0,
    azimuth: 0,
    rollAngle: 0,
    radius: 0,
    timestamp: performance.now()
  });
}
function _n() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", qe), nt = [];
}
window.onpointerdown = (n) => fe(n, "began");
window.onpointermove = (n) => fe(n, "moved");
window.onpointerup = (n) => fe(n, "ended");
const qe = (n) => n.preventDefault();
window.addEventListener("touchstart", qe, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Ae, _n(), Ae(n);
};
const ke = 0.75, me = () => a().fontScale * 8;
function V(n, t, e, i = 0.35) {
  l().drawText(n, i, {
    x: t + a().tabletButtonWidth / 2,
    y: e + me() / 2 + i * a().fontScale * 3
  });
}
class p {
  constructor(t, e) {
    this.label = t, this.highlightPred = e, this.topY = 0, this.leftX = 0, this.lastDownTime = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + a().tabletButtonWidth && this.topY <= e && e < this.topY + me();
  }
  render() {
    V(this.label, this.leftX, this.topY), (this.isDown || this.highlightPred && this.highlightPred()) && (V(this.label, this.leftX, this.topY), V(this.label, this.leftX, this.topY));
  }
  get isDown() {
    return this.fingerId != null;
  }
  clearState() {
    this.fingerId = null;
  }
}
class je {
  constructor() {
    this.buttons = [], this.fingerScreenPositions = /* @__PURE__ */ new Map();
  }
  render() {
    this.layOutButtons(), this.renderButtons();
  }
  renderButtons() {
    for (const t of this.buttons)
      t.render();
  }
  onPencilDown(t, e) {
  }
  onPencilMove(t, e) {
  }
  onPencilUp(t) {
  }
  onFingerDown(t, e) {
    for (const i of this.buttons)
      if (i.contains(t)) {
        i.fingerId = e, this.onButtonDown(i), i.lastDownTime = Date.now();
        return;
      }
    this.fingerScreenPositions.set(e, t);
  }
  onFingerMove(t, e) {
    this.fingerScreenPositions.set(e, t);
  }
  onFingerUp(t, e) {
    for (const i of this.buttons)
      i.fingerId === e && (this.onButtonUp(i), i.fingerId = null);
    this.fingerScreenPositions.delete(e);
  }
  processEvents() {
    for (const t of Bn())
      switch (t.type) {
        case "pencil":
          t.phase === "began" ? this.onPencilDown(t.position, t.pressure) : t.phase === "moved" ? this.onPencilMove(t.position, t.pressure) : t.phase === "ended" && this.onPencilUp(t.position);
          break;
        case "finger":
          t.phase === "began" ? this.onFingerDown(t.position, t.id) : t.phase === "moved" ? this.onFingerMove(t.position, t.id) : t.phase === "ended" && this.onFingerUp(t.position, t.id);
      }
  }
  layOutButtonColumn(t, e) {
    let i = 0;
    for (const s of e)
      s.leftX = t, s.topY = i * me(), i++;
  }
  clearButtonState() {
    this.buttons.forEach((t) => t.clearState());
  }
}
let z;
function ye(n) {
  z == null || z.clearButtonState(), z = n;
}
function Pn() {
  ye(Ne);
}
function An() {
  z.processEvents(), z.onFrame();
}
function kn() {
  z.render();
}
function U(n) {
  return new p(n, () => l() === D[n]);
}
function Mn(n) {
  return "1" <= n.label && n.label <= "9";
}
const Ne = new class extends je {
  constructor() {
    super(), this.lineButton = new p("LINE"), this.moveButton = new p("MOVE"), this.horvButton = new p("HORV"), this.sizeButton = new p("SIZE"), this.dismemberButton = new p("DISM"), this.deleteButton = new p("DEL"), this.solveButton = new p("SOLVE", () => a().autoSolve), this.arcButton = new p("ARC"), this.eqButton = new p("EQ"), this.fixButton = new p("FIX"), this.weightButton = new p("weight"), this.attacherButton = new p("ATT"), this.clearButton = new p("CLEAR"), this.timeButton = new p("TIME"), this.configButton = new p("config"), this.reloadButton = new p("reload"), this.col1 = [
      U("1"),
      U("2"),
      U("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      U("4"),
      U("5"),
      U("6"),
      this.arcButton,
      this.eqButton,
      this.fixButton,
      this.weightButton,
      this.attacherButton,
      this.clearButton,
      this.timeButton
    ], this.col3 = [this.configButton, this.reloadButton], this.pencilClickInProgress = !1, this.drag = null, this.lastSnap = null, this.buttons.push(...this.col1, ...this.col2, ...this.col3);
  }
  onFrame() {
    !this.timeButton.isDown && this.solveButton.isDown && Kt();
  }
  layOutButtons() {
    a().lefty ? (this.layOutButtonColumn(innerWidth - a().tabletButtonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * a().tabletButtonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(a().tabletButtonWidth, this.col2), this.layOutButtonColumn(innerWidth - a().tabletButtonWidth, this.col3));
  }
  onPencilDown(n, t) {
    if (this.timeButton.isDown) {
      this.timeTravelTo(n, t);
      return;
    }
    c.moveToScreenPos(n), this.moveButton.isDown && this.move(), this.prepareHaptics();
  }
  onPencilMove(n, t) {
    if (this.timeButton.isDown) {
      this.timeTravelTo(n, t);
      return;
    }
    c.moveToScreenPos(n), this.snap();
    const e = { x: c.pos.x, y: c.pos.y };
    if (this.drag) {
      const i = e.x - this.drag.offset.x, s = e.y - this.drag.offset.y;
      this.drag.thing.moveBy(i - this.drag.thing.x, s - this.drag.thing.y);
    }
    !this.pencilClickInProgress && t > 3 && (this.pencilClickInProgress = !0, this.onPencilClick()), this.pencilClickInProgress && t < 1 && this.endDragEtc();
  }
  onPencilUp(n) {
    this.timeButton.isDown || (c.clearPos(), this.endDragEtc(), jt(), Jt());
  }
  timeTravelTo(n, t = 0) {
    Re(n), a().onionSkinAlpha = Math.min(t, 4) / 4 * 0.9;
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof A && l().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && ce();
  }
  onButtonDown(n) {
    if (Mn(n)) {
      c.pos ? (re(n.label), this.move()) : ot(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        l().clear(), y.reset();
        break;
      case this.lineButton:
        qt();
        break;
      case this.arcButton:
        Nt();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        ie();
        break;
      case this.fixButton:
        ee() || te();
        break;
      case this.sizeButton:
        se();
        break;
      case this.weightButton:
        ne();
        break;
      case this.dismemberButton:
        ae();
        break;
      case this.attacherButton:
        oe();
        break;
      case this.deleteButton:
        Zt();
        break;
      case this.solveButton:
        Date.now() - n.lastDownTime < 200 && Qt();
        break;
      case this.timeButton:
        mt().updateRenderingInfo(), yt("top"), this.oldAutoSolveSetting = a().autoSolve, a().autoSolve = !1;
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        ye(Je);
        break;
    }
  }
  onButtonUp(n) {
    switch (n) {
      case this.eqButton:
        Bt();
        break;
      case this.timeButton:
        yt("bottom"), a().autoSolve = this.oldAutoSolveSetting;
        break;
    }
  }
  onFingerDown(n, t) {
    super.onFingerDown(n, t), this.fingerScreenPositions.size === 4 && c.pos ? le() : this.fingerScreenPositions.size === 4 ? de() : this.timeButton.isDown && t !== this.timeButton.fingerId && this.timeTravelTo(n);
  }
  onFingerUp(n, t) {
    this.timeButton.isDown && t !== this.timeButton.fingerId && this.timeTravelTo(n), super.onFingerUp(n, t);
  }
  onFingerMove(n, t) {
    if (this.timeButton.isDown) {
      t !== this.timeButton.fingerId && this.timeTravelTo(n);
      return;
    }
    if (l().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const i = y.fromScreenPosition(n), s = y.fromScreenPosition(e);
    if (c.pos || he(i.x - s.x, i.y - s.y), this.fingerScreenPositions.size !== 2)
      return;
    let o = null;
    for (const [v, _t] of this.fingerScreenPositions.entries())
      if (v !== t) {
        o = _t;
        break;
      }
    if (!o)
      throw new Error("bruh?!");
    const r = y.fromScreenPosition(o), h = E(r, s), x = E(r, i) / h, b = Math.atan2(s.y - r.y, s.x - r.x), w = Math.atan2(i.y - r.y, i.x - r.x);
    Xe() && !this.drag && this.move(), !gt(x) && !c.pos && (y.scale *= x), pt(w - b);
  }
  move() {
    const n = Gt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = ct();
    t && (this.drag = { thing: t, offset: Z(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Pe("prepareHaptics");
  }
  hapticBump() {
    Pe("hapticImpact");
  }
  render() {
    super.render(), this.timeButton.isDown && mt().render();
  }
}(), Je = new class extends je {
  constructor() {
    super(), this.leftyButton = new p("lefty"), this.lineWidthButton = new p("lwidth"), this.alphaButton = new p("opacity"), this.flickerButton = new p("flicker"), this.ctrlPtsButton = new p("ctrl pts"), this.defaultsButton = new p("defaults"), this.backButton = new p("back"), this.col1 = [
      this.leftyButton,
      this.lineWidthButton,
      this.alphaButton,
      this.flickerButton,
      this.ctrlPtsButton,
      this.defaultsButton
    ], this.col2 = [this.backButton], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    super.render(), V(
      a().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * a().tabletButtonWidth,
      this.leftyButton.topY
    ), V(
      a().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * a().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * ke
    ), V(
      a().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * a().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * ke
    ), V(
      a().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * a().tabletButtonWidth,
      this.flickerButton.topY
    ), V(
      a().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * a().tabletButtonWidth,
      this.ctrlPtsButton.topY
    );
  }
  layOutButtons() {
    this.layOutButtonColumn(innerWidth / 2 - a().tabletButtonWidth / 2, this.col1), a().lefty ? this.layOutButtonColumn(0, this.col2) : this.layOutButtonColumn(innerWidth - a().tabletButtonWidth, this.col2);
  }
  onFrame() {
  }
  onButtonDown(n) {
    switch (n) {
      case this.defaultsButton:
        Ze(), g("restored defaults!");
        break;
      case this.leftyButton:
        X({ lefty: !a().lefty });
        break;
      case this.flickerButton:
        X({ flicker: !a().flicker });
        break;
      case this.ctrlPtsButton:
        X({ showControlPoints: !a().showControlPoints });
        break;
      case this.backButton:
        ye(Ne);
        break;
    }
  }
  onButtonUp(n) {
  }
  onFingerMove(n, t) {
    if (super.onFingerMove(n, t), t === this.lineWidthButton.fingerId) {
      const e = Math.max(
        1,
        Math.min(a().lineWidth + (n.x - innerWidth / 2) / innerWidth * 2, 10)
      );
      X({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(a().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      X({ baseAlphaMultiplier: e });
    }
  }
}(), In = () => z === Je, Cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Pn,
  isInConfigScreen: In,
  onFrame: An,
  render: kn
}, Symbol.toStringTag, { value: "Module" }));
function Ge(n, t = 1) {
  const e = l(), i = [];
  return Oe(n, t, (s, o, r) => {
    const h = e.addInstance(s, { x: o, y: y.center.y }, s.size * r, 0), m = i.at(-1);
    m && e.replaceHandle(h.attachers[0], m.attachers[1]), i.push(h);
  }), i;
}
function Wn(n, t = 1) {
  const e = Ge(n, t);
  for (const i of e) {
    const s = y.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    i.x = s.x, i.x = s.y;
  }
}
const Dn = ot, Tn = X, Vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  switchToDrawing: Dn,
  updateConfig: Tn,
  wanderingLetters: Wn,
  write: Ge
}, Symbol.toStringTag, { value: "Module" })), C = {};
let it = !1, st = !1, S = null;
function zn() {
  window.addEventListener("keydown", On), window.addEventListener("keyup", Fn), _.addEventListener("pointerdown", Hn), _.addEventListener("pointermove", $n), _.addEventListener("pointerup", Xn);
}
let N = !1, Me;
function Rn() {
  C.t ? N || (N = !0, mt().updateRenderingInfo(), document.getElementById("canvas").style.cursor = "pointer", yt("top"), Me = a().autoSolve, a().autoSolve = !1) : N && (N = !1, document.getElementById("canvas").style.cursor = "none", yt("bottom"), a().autoSolve = Me), C[" "] && Kt();
}
function Ln() {
  N && mt().render();
}
let xe = !1;
function On(n) {
  if (xe) {
    Un(n);
    return;
  }
  if (C[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    C.Shift ? re(t) : ot(t);
    return;
  }
  switch (n.key) {
    case "f":
      X({ flicker: !a().flicker });
      return;
    case "d":
      a().debug = !a().debug, g(`debug ${a().debug ? "on" : "off"}`);
      return;
    case "S":
      Qt();
      return;
    case "p":
      de();
      return;
    case "T":
      Yn();
      return;
  }
  if (!l().isEmpty())
    switch (n.key) {
      case "Backspace":
        Zt();
        break;
      case ".":
        ee() || te();
        break;
      case "W":
        ne();
        break;
      case "h":
        ie();
        break;
      case "=":
        gt(1.05) || Vt(Math.min(y.scale + 0.1, 10));
        break;
      case "-":
        gt(0.95) || Vt(Math.max(y.scale - 0.1, 0.1));
        break;
      case "q":
        pt(5 * Math.PI / 180);
        break;
      case "w":
        pt(-5 * Math.PI / 180);
        break;
      case "s":
        se();
        break;
      case "A":
        oe();
        break;
      case "c":
        Ye();
        break;
      case "D":
        ae();
        break;
      case "C":
        le();
        break;
    }
}
function Fn(n) {
  switch (delete C[n.key], n.key) {
    case "Meta":
      jt(), st = !1, it || c.clearPos();
      break;
    case "a":
      Jt(), st = !1, it || c.clearPos();
      break;
    case "e":
      Bt();
      break;
  }
}
function Hn(n) {
  if (_.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), it = !0, C.Alt) {
    if (!c.pos)
      return;
    const i = l().thingAt(c.pos);
    if (!(i instanceof P))
      return;
    const s = Fe(i.master);
    s && ot(s);
    return;
  } else if (C.Meta) {
    qt(), st = !0;
    return;
  } else if (C.a) {
    Nt(), st = !0;
    return;
  } else if (C.e) {
    ce();
    return;
  }
  S = null;
  const t = Gt();
  if (t) {
    S = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = ct();
  e && (S = { thing: e, offset: Z(c.pos, e) });
}
function $n(n) {
  if (N) {
    Re(n);
    return;
  }
  if (n.metaKey || delete C.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), it && t && !l().isEmpty() && !st && !S) {
    he(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(S == null ? void 0 : S.thing), S) {
    const e = c.pos.x - S.offset.x, i = c.pos.y - S.offset.y;
    S.thing.moveBy(e - S.thing.x, i - S.thing.y);
  }
}
function Xn(n) {
  _.releasePointerCapture(n.pointerId), it = !1, C.Meta || c.clearPos(), (S == null ? void 0 : S.thing) instanceof A && l().mergeAndAddImplicitConstraints(S.thing), S = null;
}
let dt = null, M = [];
function Yn() {
  c.pos && (g("typing"), xe = !0, dt = { ...c.pos }, M = []);
}
function Un(n) {
  if (n.key === "Escape") {
    xe = !1, dt = null, M = [];
    return;
  }
  if (n.key === "Backspace") {
    if (M.length > 0) {
      const r = M[M.length - 1][0];
      r !== "newline" && l().deleteThing(r), M.pop();
    }
    return;
  }
  const t = M.length > 0 ? M[M.length - 1][1] : dt, e = a().fontScale * (4 + a().kerning * 2), i = a().fontScale * 14;
  if (n.key === "Enter") {
    M.push(["newline", { x: dt.x, y: t.y - i }]);
    return;
  }
  if (n.key.length !== 1)
    return;
  const s = K.get(n.key.toUpperCase());
  if (!s)
    return;
  const o = l().addInstance(s, t, s.size, 0);
  M.push([o, { x: t.x + e, y: t.y }]);
}
const qn = () => !1, jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: zn,
  isInConfigScreen: qn,
  onFrame: Rn,
  render: Ln
}, Symbol.toStringTag, { value: "Module" }));
en(document.getElementById("canvas"));
const ut = zt() ? Cn : jn;
ut.init();
function Ke() {
  const n = G();
  n.seal(), ut.onFrame(), $e(), nn(), ut.render(), ut.isInConfigScreen() ? It(0.25, () => Dt()) : Dt();
  const t = G();
  t !== n && !t.hasWrites() && (n.disown(t), n.goInto()), requestAnimationFrame(Ke);
}
Ke();
window.app = vn;
window.demos = Vn;
