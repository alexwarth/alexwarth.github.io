const It = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 1.5,
  lineWidth: 3.5,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgb(255,165,0)",
  instanceSideAttacherColor: "rgb(255,222,33)",
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
  R = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(It));
  for (const [n, t] of Object.entries(It))
    Object.hasOwn(R, n) || (R[n] = t);
}
function q(n) {
  R = { ...R, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Ze() {
  R = JSON.parse(JSON.stringify(It)), localStorage.setItem("config", JSON.stringify(R));
}
function o() {
  return R;
}
Qe();
window.config = o;
const Rt = () => new URLSearchParams(window.location.search).get("tablet"), L = Math.PI * 2;
function b(n, t) {
  return Math.sqrt(ot(n, t));
}
function ot(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function K(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const dt = Object.freeze({ x: 0, y: 0 });
function Ce({ x: n, y: t }, { x: e, y: i }) {
  return { x: n + e, y: t + i };
}
function Lt(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, r = e * i, a = e * s;
  return { x: r + t.x, y: a + t.y };
}
function T(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, r = Math.sin(e), a = Math.cos(e), h = i * a - s * r, u = i * r + s * a;
  return { x: h + t.x, y: u + t.y };
}
function De(n) {
  let t = 1 / 0, e = -1 / 0, i = 1 / 0, s = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), i = Math.min(i, r.y), s = Math.max(s, r.y);
  return {
    topLeft: { x: t, y: s },
    bottomRight: { x: e, y: i }
  };
}
function We(n, t, e) {
  return Math.sqrt(tn(n, t, e));
}
function tn(n, t, e) {
  const i = ot(t, e);
  if (i == 0)
    return ot(n, t);
  const s = Math.max(0, Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / i, 1));
  return ot(n, { x: t.x + s * (e.x - t.x), y: t.y + s * (e.y - t.y) });
}
function xe(n) {
  return 1 - Math.pow(1 - n, 5);
}
let _, d;
function en(n) {
  _ = n, d = _.getContext("2d"), Te();
}
function Ct(n, t) {
  const e = d.globalAlpha;
  d.globalAlpha = n;
  try {
    t();
  } finally {
    d.globalAlpha = e;
  }
}
function Te() {
  if (_.width = innerWidth, _.height = innerHeight, devicePixelRatio !== 1) {
    const n = _.width, t = _.height;
    _.width = n * devicePixelRatio, _.height = t * devicePixelRatio, _.style.width = n + "px", _.style.height = t + "px", d.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Te);
function nn() {
  d.clearRect(0, 0, _.width, _.height), d.lineWidth = o().lineWidth, d.lineCap = "round";
}
function st(n) {
  return n;
}
function Q(n, t = k(), e = st) {
  const i = e(n);
  d.fillStyle = t, d.beginPath(), d.arc(i.x, i.y, d.lineWidth * 2, 0, L), d.fill();
}
function A(n, t, e = k(), i = st, s = 0, r = !1) {
  const a = d.lineWidth;
  n.x === t.x && n.y === t.y && (d.lineWidth *= 2), d.strokeStyle = e, d.beginPath(), r && d.setLineDash([5, 10]);
  const h = { ...i(n) }, u = { ...i(t) };
  let x = !0;
  if (s > 0)
    if (b(h, u) > 2 * s) {
      const p = Math.atan2(u.y - h.y, u.x - h.x);
      h.x += s * Math.cos(p), h.y += s * Math.sin(p), u.x -= s * Math.cos(p), u.y -= s * Math.sin(p);
    } else
      x = !1;
  x && (d.moveTo(h.x, h.y), d.lineTo(u.x, u.y)), d.stroke(), r && d.setLineDash([]), d.lineWidth = a;
}
function pe(n, t, e, i = k(), s = st) {
  n = s(n), t = s(t);
  const r = t.x - n.x, a = t.y - n.y, h = Math.atan2(a, r) + Math.PI / 2, u = Math.sin(h), x = Math.cos(h), p = Math.sqrt(r ** 2 + a ** 2) * Math.sin(e + Date.now() / 300) / 20;
  d.strokeStyle = i, d.beginPath(), d.moveTo(n.x, n.y), d.bezierCurveTo(
    n.x + r / 3 + p * x,
    n.y + a / 3 + p * u,
    t.x - r / 3 - p * x,
    t.y - a / 3 - p * u,
    t.x,
    t.y
  ), d.stroke();
}
function ct(n, t, e, i, s = k(), r = st) {
  const a = r(i === "cw" ? t : e), h = r(i === "cw" ? e : t), u = r(n), x = Math.atan2(a.y - u.y, a.x - u.x), v = Math.atan2(h.y - u.y, h.x - u.x), p = Math.abs(v - x) < 0.05, E = b(u, i === "cw" ? a : h);
  d.strokeStyle = s, d.beginPath(), d.arc(u.x, u.y, E, x, p ? x + L : v), d.stroke();
}
function ge(n, t = !0) {
  d.strokeStyle = ut(t ? "bold" : "normal"), d.beginPath(), d.arc(n.x, n.y, 10, 0, L), d.stroke();
}
function sn(n, t, e, i) {
  d.fillStyle = i, d.beginPath(), d.arc(n, t, e, 0, L), d.fill();
}
function Ve(n, t, e = k(), i = st) {
  d.fillStyle = e;
  const s = 12;
  d.font = `${s}px Major Mono Display`;
  const r = d.measureText(t).width, { x: a, y: h } = i(n);
  d.fillText(t, a - r / 2, h + s / 2);
}
function k(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o().baseAlphaMultiplier, `rgba(255,255,255,${o().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
function ut(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o().baseAlphaMultiplier, `rgba(255,255,0,${o().flicker ? 1 * e + t : 0.75 * e + t})`;
}
const ht = Rt() ? 12 : 6, we = Rt() ? 190 : 0;
class Ot {
  constructor(t) {
    this.parent = t, this.writes = /* @__PURE__ */ new WeakMap(), this.parentValueCache = new WeakRef(/* @__PURE__ */ new WeakMap()), this.children = /* @__PURE__ */ new Set(), this.numWrites = 0, this.sealed = !1, this.receivedPasteFrom = null, this.x = -100, this.y = -100, this.depth = 0, this.breadth = 0, this.rand = Math.random() * 100;
  }
  bookmark() {
    Dt = this;
  }
  pasteInto(t) {
    t.sealed && (t = t.sprout()), t.receivedPasteFrom = this, this.doInTempChild(() => {
      const e = window.drawing(), i = new window.Drawing();
      i.addInstance(e, { x: 0, y: 0 }, e.size, 0), window.dismemberAllInstances(i), i.forEachVar((s) => {
        const r = s.value;
        t.do(() => s.value = r);
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
    const t = ht * 3;
    this._render(
      20 + we,
      innerHeight - 20 - t,
      (innerWidth - 40 - we) / (bt.depth - 1),
      t
    ), B.renderCircle("yellow");
    const e = o().flicker;
    if (o().flicker = !1, o().onionSkinAlpha === 0)
      return;
    const i = window.drawing();
    let s = B.parent, r = o().onionSkinAlpha;
    for (; s; ) {
      let h = !0;
      if (s.do(() => {
        window.drawing() !== i ? h = !1 : Ct(r, () => i.render());
      }), !h)
        break;
      r *= o().onionSkinAlpha, s = s.parent;
    }
    r = o().onionSkinAlpha;
    let a = [...B.children];
    for (; a.length > 0; ) {
      const h = [];
      for (const u of a)
        u.do(() => {
          window.drawing() === i && (Ct(r, () => i.render()), h.push(...u.children));
        });
      r *= o().onionSkinAlpha, a = h;
    }
    o().flicker = e;
  }
  _render(t, e, i, s) {
    this.x = t, this.y = e;
    let r = e;
    for (const a of this.children)
      pe(this, { x: t + i, y: r }, a.rand, "rgba(100, 149, 237, .7)"), a._render(t + i, r, i, s), r -= a.breadth * s;
    this.receivedPasteFrom && pe(this, this.receivedPasteFrom, this.rand, "rgba(255, 165, 0, .7)"), this.renderCircle(this === Dt ? "rgb(255, 165, 0)" : "cornflowerblue");
  }
  renderCircle(t) {
    sn(
      this.x,
      this.y,
      ht + ht / 10 * Math.sin(Date.now() / 300 + this.rand),
      t
    );
  }
}
const bt = new Ot();
let B = bt;
const J = () => B;
window.thisWorld = J;
const ft = () => bt;
let Dt = null;
const an = () => Dt;
function ze(n) {
  let t = null, e = 1 / 0;
  const i = 3 * ht;
  s(bt), t && (B = t);
  function s(r) {
    const a = b(n, r);
    a < i && a < e && (t = r, e = a), r.children.forEach(s);
  }
}
let rn = 0;
class y {
  constructor(t) {
    this.id = rn++, this.value = t;
  }
  get value() {
    return B.get(this);
  }
  set value(t) {
    B.set(this, t);
  }
}
class C {
  constructor(...t) {
    this._first = new y(null);
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
    const e = new C();
    return this.forEach((i) => {
      t(i) && e.unshift(i);
    }), e.reversed();
  }
  map(t) {
    const e = new C();
    return this.forEach((i) => {
      e.unshift(t(i));
    }), e.reversed();
  }
  reversed() {
    const t = new C();
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
    this._value = new y(t), this._next = new y(e);
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
let F = 1;
const H = { x: 0, y: 0 }, m = {
  reset() {
    F = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return F;
  },
  set scale(n) {
    F = n;
  },
  centerAt({ x: n, y: t }) {
    H.x = n, H.y = t;
  },
  get center() {
    return H;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - H.x) * F + innerWidth / 2,
      y: -(t - H.y) * F + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / F + H.x,
      y: H.y - (t - innerHeight / 2) / F
    };
  }
}, U = new y(""), j = new y(null);
let Wt = 0;
function w(n, ...t) {
  U.value = n, j.value = t.length === 0 ? null : t.map((e) => new WeakRef(e)), Wt++;
}
let be = 0, ve = U.value, Ee = j.value, Se = 0, Re = "bottom";
function mt(n) {
  Re = n;
}
function cn() {
  const n = Date.now();
  (Wt !== be || U.value !== ve || j.value !== Ee) && (be = Wt, ve = U.value, Ee = j.value, Se = n);
  const t = n - Se;
  if (t > o().statusTimeMillis)
    return;
  const e = 40;
  d.font = `${e}px Monaco`;
  const i = d.measureText(U.value).width, s = 1 - xe(t / o().statusTimeMillis);
  if (d.fillStyle = `rgba(255,222,33,${s})`, d.fillText(
    U.value,
    (innerWidth - i) / 2,
    Re === "top" ? 1.2 * e : innerHeight - e
  ), o().highlightReferents && j.value) {
    const a = `rgba(255,222,33,${1 - xe(t / (0.5 * o().statusTimeMillis))})`;
    for (const h of j.value) {
      const u = h.deref();
      u == null || u.render(m.toScreenPosition, a, 2);
    }
  }
}
class D {
  // override in subclasses like weight constraint
  preRelax() {
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    let i = !0;
    return this.forEachThing((s) => {
      t.has(s) ? this.forEachHandle((r) => {
        e.has(r) || (i = !1);
      }) : i = !1;
    }), i;
  }
}
class Ft extends D {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  constructor(t, { x: e, y: i }) {
    super(), this._p = new y(t), this.pos = { x: e, y: i };
  }
  get signature() {
    return `FP(${this.p.id})`;
  }
  computeError() {
    return b(this.p, this.pos) * 100;
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
class Ht extends D {
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
    super(), this._a = new y(t), this._b = new y(e);
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
class yt extends D {
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
    super(), this._a = new y(t), this._b = new y(e), this.distance = b(t, e);
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `D(${t},${e})`;
  }
  computeError() {
    return this.distance - b(this.a, this.b);
  }
  map(t, e) {
    return new yt(e.get(this.a), e.get(this.b));
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
class vt extends D {
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
    super(), this._a1 = new y(t), this._b1 = new y(e), this._a2 = new y(i), this._b2 = new y(s);
  }
  get signature() {
    return `E(${this.a1.id},${this.b1.id},${this.a2.id},${this.b2.id})`;
  }
  computeError() {
    return Math.abs(b(this.a1, this.b1) - b(this.a2, this.b2));
  }
  map(t, e) {
    return new vt(
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
class Z extends D {
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
    super(), this._p = new y(t), this._a = new y(e), this._b = new y(i);
  }
  get signature() {
    return `POL(${this.p.id},${this.a.id},${this.b.id})`;
  }
  computeError() {
    return We(this.p, this.a, this.b);
  }
  map(t, e) {
    return new Z(
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
class tt extends D {
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
    super(), this._p = new y(t), this._a = new y(e), this._b = new y(i), this._c = new y(s);
  }
  get signature() {
    return `POA(${this.p.id},${this.a.id},${this.b.id},${this.c.id})`;
  }
  computeError() {
    return b(this.p, this.c) - b(this.a, this.c);
  }
  map(t, e) {
    return new tt(
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
class Et extends D {
  constructor(t, e, i) {
    super(), this.instance = e, this._instancePoint = new y(t), this._masterPoint = new y(i);
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
    return b(
      this.instancePoint,
      Ce(
        Lt(
          T(this.masterPoint, dt, this.instance.angle),
          dt,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
  map(t, e) {
    return new Et(
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
class St extends D {
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
    return new St(t.get(this.instance), this.scale);
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
class $t extends D {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  constructor(t) {
    super(), this._a = new y(t);
  }
  get signature() {
    return `W(${this.a.id})`;
  }
  preRelax() {
    this.y0 = this.a.y;
  }
  computeError() {
    return this.y0 - o().weight - this.a.y;
  }
  map(t, e) {
    return new $t(e.get(this.a));
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
    this._constraints = new y(new C());
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
    this.constraints = new C();
  }
  isEmpty() {
    return this.constraints.isEmpty();
  }
  replaceHandle(t, e) {
    const i = this.constraints;
    this.constraints = new C(), i.forEach((s) => {
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
    this.forEach((r) => r.preRelax());
    const e = m.scale > 0 ? 1 / m.scale : 1, i = o().minWorthwhileErrorImprovement * e;
    let s = !1;
    for (const r of t)
      s = this.relaxWithVar(r, e, i) || s;
    return s;
  }
  relaxWithVar(t, e, i) {
    const s = t.value, r = this.computeError() - i;
    t.value = s + e;
    const a = this.computeError();
    t.value = s - e;
    const h = this.computeError();
    return a < Math.min(r, h) ? (t.value = s + e, !0) : h < Math.min(r, a) ? (t.value = s - e, !0) : (t.value = s, !1);
  }
  computeError() {
    let t = 0;
    return this.constraints.forEach((e) => {
      t += e.computeError() ** 2;
    }), t;
  }
}
const gt = class gt {
  constructor({ x: t, y: e }) {
    this.id = gt.nextId++, this._x = new y(t), this._y = new y(e);
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
    return b(t, this) <= o().closeEnough / m.scale;
  }
  distanceTo(t) {
    return b(this, t);
  }
  moveBy(t, e) {
    this.x += t, this.y += e;
  }
  render(t, e = o().instanceSideAttacherColor) {
    o().debug && Ve(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), Q(this, e, t);
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
gt.nextId = 0;
let M = gt;
class $ {
  constructor(t, e, i) {
    this.isGuide = i, this._a = new y(new M(t)), this._b = new y(new M(e));
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
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= o().closeEnough / m.scale;
  }
  distanceTo(t) {
    return We(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !o().showGuideLines)
      return;
    const i = this.isGuide ? o().guideLineColor : e ?? k();
    A(this.a, this.b, i, t);
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
class G {
  constructor(t, e, i, s) {
    this.direction = s, this._a = new y(new M(t)), this._b = new y(b(t, e) === 0 ? this.a : new M(e)), this._c = new y(new M(i));
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
    if (this.distanceTo(t) > o().closeEnough / m.scale)
      return !1;
    const e = this.direction === "cw" ? this.a : this.b, i = this.direction === "cw" ? this.b : this.a, s = K(e, this.c), r = K(i, this.c), a = K(t, this.c), h = x(r, s), u = x(a, s);
    return 0 <= u && u <= h;
    function x(v, p) {
      const E = v.x * p.x + v.y * p.y, Pt = v.x * p.y - v.y * p.x;
      return (Math.atan2(Pt, E) + L) % L;
    }
  }
  distanceTo(t) {
    return Math.abs(b(t, this.c) - b(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    ct(this.c, this.a, this.b, this.direction, e ?? k(), t), i === 1 && o().showControlPoints && (Q(this.a, o().controlPointColor, t), Q(this.b, o().controlPointColor, t), Q(this.c, o().controlPointColor, t));
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
const wt = class wt {
  constructor(t, e, i, s, r, a) {
    this.master = t, this.transform = (h) => Ce(Lt(T(h, dt, this.angle), dt, this.scale), this), this.id = wt.nextId++, this._x = new y(e), this._y = new y(i), this._angleAndSizeVecX = new y(s * Math.cos(r)), this._angleAndSizeVecY = new y(s * Math.sin(r)), this._attachers = new y(
      t.attachers.map((h) => this.createAttacher(h, a))
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
    const i = new M(this.transform(t));
    return e.constraints.add(new Et(i, this, t)), i;
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
    return De(s);
  }
  distanceTo(t) {
    return b(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    this.master.render((s) => t(this.transform(s)), e, i), i === 1 && this.attachers.withDo(this.master.attachers, (s, r) => {
      const a = t(s);
      A(
        t(this.transform(r)),
        a,
        o().instanceSideAttacherColor
      ), Q(a, o().instanceSideAttacherColor);
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
wt.nextId = 0;
let P = wt;
class Xt {
  constructor() {
    this._things = new y(new C()), this._attachers = new y(new C()), this.constraints = new Be();
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
    this.things = new C(), this.attachers = new C(), this.constraints.clear();
  }
  isEmpty() {
    return this.things.isEmpty();
  }
  relax() {
    return this.constraints.relax(this.getRelaxableVars());
  }
  render(t = m.toScreenPosition, e, i = 0) {
    i > o().maxDepth || (this.things.forEach((s) => s.render(t, e, i + 1)), i === 0 && (this.attachers.forEach((s) => s.render(t, o().masterSideAttacherColor)), this.constraints.forEach((s) => {
      if (s instanceof yt) {
        let r = (s.computeError() * 100).toFixed();
        r === "-0" && (r = "0"), this.drawText(
          r,
          o().distanceConstraintTextScale,
          t({
            x: s.a.x + o().distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + o().distanceConstraintLabelPct * (s.b.y - s.a.y)
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
  addInstance(t, { x: e, y: i }, s, r) {
    const a = new P(t, e, i, s, r, this);
    return this.things.unshift(a), a;
  }
  resizeInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof P))
      return !1;
    i.scale *= e;
    for (const s of i.attachers) {
      const { x: r, y: a } = Lt(s, i, e);
      s.x = r, s.y = a;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof P))
      return !1;
    i.angle += e;
    for (const s of i.attachers) {
      const { x: r, y: a } = T(s, i, e);
      s.x = r, s.y = a;
    }
    return !0;
  }
  addLine(t, e, i = !1, s = !0) {
    const r = new $(t, e, i);
    !i && s && (this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b));
    for (const a of this.things)
      a.forEachHandle((h) => {
        h !== r.a && h !== r.b && r.contains(h) && this.constraints.add(new Z(h, r.a, r.b));
      });
    return this.things.unshift(r), r;
  }
  addArc(t, e, i, s, r = !0) {
    const a = new G(t, e, i, s);
    r && (this.mergeAndAddImplicitConstraints(a.c), this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b)), this.constraints.add(new vt(a.a, a.c, a.b, a.c));
    for (const h of this.things)
      h.forEachHandle((u) => {
        u !== a.a && u !== a.b && u !== a.c && a.contains(u) && this.constraints.add(new tt(u, a.a, a.b, a.c));
      });
    return this.things.unshift(a), a;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i.forEachHandle((s) => {
        s !== t && s.contains(t) && (this.replaceHandle(s, t), e.add(i));
      });
    for (const i of this.things)
      e.has(i) || !i.contains(t) || (i instanceof $ ? (this.constraints.add(new Z(t, i.a, i.b)), o().showImplicitConstraints && w("(point on line)", t, i)) : i instanceof G && (this.constraints.add(new tt(t, i.a, i.b, i.c)), o().showImplicitConstraints && w("(point on arc)", t, i)));
  }
  replaceHandle(t, e) {
    this.things.forEach((i) => i.replaceHandle(t, e)), this.attachers = this.attachers.map((i) => i === t ? e : i), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? (this.things = this.things.filter((i) => i !== e), w("delete", e), !0) : !1;
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Ft(e, t)), w("fixed point", e), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new $t(e)), w("weight", e), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new yt(e.a, e.b)), w("fixed distance", e), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new Ht(e.a, e.b)), w("HorV", e), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof P ? (this.constraints.add(new St(e)), w("full size", e), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof P ? (this.inline(e), w("dismember", e), !0) : !1;
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
    const { things: e, constraints: i } = t.master, s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof $) {
        const h = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        s.set(a.a, h.a), s.set(a.b, h.b);
      } else if (a instanceof G) {
        const h = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c),
          a.direction
        );
        s.set(a.a, h.a), s.set(a.b, h.b), s.set(a.c, h.c);
      } else if (a instanceof P) {
        const h = this.addInstance(
          a.master,
          t.transform(a),
          // move the center to the right place
          t.scale * a.size,
          t.angle + a.angle
        );
        r.set(a, h);
      } else
        throw new Error("unsupported thing type: " + a.constructor.name);
    i.forEach((a) => {
      this.constraints.add(a.map(r, s, t.transform));
    }), this.things = this.things.filter((a) => a !== t);
  }
  snap(t, e, i) {
    const s = this.handleAt(t, e);
    if (s)
      return h(s), "H";
    if (i && b(t, i) <= o().closeEnough / m.scale)
      return h(i), "H";
    let r = null;
    const a = [];
    return J().doInTempChild(() => {
      const x = new Be(), v = new M(t), p = /* @__PURE__ */ new Set();
      v.forEachRelaxableVar((E) => p.add(E));
      for (const E of this.things)
        E === e || e instanceof M && u(E, e) || !E.contains(t) || (E instanceof $ ? (x.add(new Z(v, E.a, E.b)), a.push("L")) : E instanceof G && (x.add(new tt(v, E.a, E.b, E.c)), a.push("A")));
      if (!x.isEmpty()) {
        for (; x.relax(p); )
          ;
        r = { x: v.x, y: v.y };
      }
    }), r && h(r), a.join();
    function h(x) {
      if (e) {
        const v = x.x - e.x, p = x.y - e.y;
        e.moveBy(v, p);
      }
      t.x = x.x, t.y = x.y;
    }
    function u(x, v) {
      let p = !1;
      return x.forEachHandle((E) => {
        E === v && (p = !0);
      }), p;
    }
  }
  handleAt(t, e = null) {
    let i = 1 / 0, s = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const h = b(t, a);
          h < i && (s = a, i = h);
        }
      });
    return s;
  }
  thingAt(t) {
    let e = 1 / 0, i = null;
    for (const s of this.things)
      if (s.contains(t)) {
        const r = s.distanceTo(t);
        r < e && (i = s, e = r);
      }
    return i;
  }
  leave() {
    this.center();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), i = -(t.x + e.x) / 2, s = -(t.y + e.y) / 2;
    for (const r of this.getPositions())
      r.x += i, r.y += s;
  }
  boundingBox(t = this) {
    const e = [...this.getPositions(!1)];
    for (const i of this.things)
      if (i instanceof P && i.master !== t) {
        const s = i.boundingBox(t);
        e.push(s.topLeft), e.push(s.bottomRight);
      }
    return De(e);
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
      s.forEachHandle((r) => {
        i++ === t && (e = r);
      });
    return e;
  }
  getPositions(t = !0) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i instanceof P && e.add(i), i.forEachHandle((s) => {
        (!(i instanceof G) || t || s !== i.c) && e.add(s);
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
      if (i instanceof Et && i.masterPoint === e) {
        const { instance: s, instancePoint: r } = i;
        s.attachers = s.attachers.filter((a) => a !== r), this.constraints.remove(i);
      }
    });
  }
  drawText(t, e, i) {
    Le(
      t,
      e,
      (s, r, a) => s.render(
        ({ x: h, y: u }) => ({
          x: h * a + r - m.center.x + i.x,
          y: -u * a + i.y
        }),
        void 0,
        1
      )
    );
  }
}
window.Drawing = Xt;
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
            target: {},
            x: 2,
            y: 6
          },
          command: "arc",
          start: -3.140173248422545,
          radius: 2,
          end: -0.007871078049560942
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
            target: {},
            x: 2,
            y: 2
          },
          command: "arc",
          start: 0,
          radius: 2,
          end: 3.04931868620317
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
            target: {},
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
            y: 3
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
            y: 3
          },
          start: {
            x: 2,
            y: 3
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
            target: {},
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
            x: 2,
            y: 6
          },
          command: "arc",
          start: -1.5508014915099348,
          radius: 2,
          end: 0.2790589122600394
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 1.4038768231185412,
          radius: 2,
          end: 3.056962552531346
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
            y: 0
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
            target: {},
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
            target: {},
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
            target: {},
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
            target: {},
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
            target: {},
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
            target: {},
            x: 7,
            y: 4
          },
          command: "arc",
          end: -2.389383957678425,
          radius: 6,
          start: 2.4169670760178072
        }
      ]
    ],
    [
      ")",
      [
        {
          center: {
            target: {},
            x: 0,
            y: 4
          },
          command: "arc",
          end: 0.7451162436856023,
          radius: 6,
          start: -0.7103406998312329
        }
      ]
    ],
    [
      "*",
      [
        {
          command: "line",
          end: {
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 7
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
            x: 0,
            y: 2
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
            x: 2,
            y: 1
          },
          start: {
            x: 2,
            y: 7
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
            x: 1,
            y: 0
          },
          start: {
            x: 2,
            y: 2
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
            y: 1
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
            x: 4,
            y: 8
          },
          start: {
            x: 0,
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
            target: {},
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
        }
      ]
    ],
    [
      "2",
      [
        {
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          end: -0.9092114259490837,
          radius: 2,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 0,
            y: 0
          },
          start: {
            x: 3,
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
          center: {
            x: 2,
            y: 6
          },
          command: "arc",
          start: 3.141592653589793,
          radius: 2,
          end: -1.5688446019944482
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          start: 1.5695966392893481,
          radius: 2,
          end: 3.141592653589793
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
            y: 5
          },
          start: {
            x: 0,
            y: 8
          }
        },
        {
          center: {
            target: {},
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
            target: {},
            x: 2,
            y: 2
          },
          command: "arc",
          start: 9.1247779607692,
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
            x: 3,
            y: 8
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
        }
      ]
    ],
    [
      "8",
      [
        {
          center: {
            target: {},
            x: 2,
            y: 6
          },
          command: "arc",
          end: 9.32477796076938,
          radius: 2,
          start: 3.141592653589793
        },
        {
          center: {
            target: {},
            x: 2,
            y: 2
          },
          command: "arc",
          end: 9.32477796076938,
          radius: 2,
          start: 3.141592653589793
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
          end: 9.42477796076937,
          radius: 2,
          start: 3.141592653589793
        },
        {
          command: "line",
          end: {
            x: 1,
            y: 0
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
            y: 6
          },
          command: "arc",
          end: 3.141592653589793,
          radius: 2,
          start: -1.5437654884752583
        },
        {
          command: "line",
          end: {
            x: 2,
            y: 2
          },
          start: {
            x: 2,
            y: 4
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
            y: 0
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
            target: {},
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
            target: {},
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
            target: {},
            x: 3,
            y: 5.5
          },
          command: "arc",
          end: -1.0844660924940577,
          radius: 2,
          start: -2.067404489817248
        },
        {
          center: {
            target: {},
            x: 1,
            y: 2
          },
          command: "arc",
          end: 2.0727269753613857,
          radius: 2,
          start: 1.0592589879552556
        }
      ]
    ],
    [
      "}",
      [
        {
          center: {
            target: {},
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
            target: {},
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
            target: {},
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
            target: {},
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
            target: {},
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
function un(n, t, e = o().fontScale) {
  for (const i of t)
    switch (i.command) {
      case "line": {
        const s = At(i.start, e), r = At(i.end, e);
        n.addLine(s, r, !1, !1);
        break;
      }
      case "arc": {
        const s = At(i.center, e), r = i.radius * e;
        n.addArc(
          _e(s, i.end, r),
          _e(s, i.start, r),
          s,
          0
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", i);
        break;
    }
}
const fn = new Map(dn.data.values), Bt = /* @__PURE__ */ new Map();
for (const [n, t] of fn) {
  const e = new Xt();
  un(e, t, o().fontScale);
  const i = e.addLine(
    { x: -o().kerning * o().fontScale, y: 0 },
    { x: (4 + o().kerning) * o().fontScale, y: 0 },
    !0
  );
  e.attachers.unshift(i.a), e.attachers.unshift(i.b), Bt.set(n, e);
}
function Le(n, t, e) {
  const i = (a) => t * (a === a.toUpperCase() ? 1 : 0.75), s = (a) => i(a) * o().fontScale * (4 + o().kerning * 2);
  let r = m.center.x - 0.5 * [...n].map(s).reduce((a, h) => a + h, 0);
  for (let a = 0; a < n.length; a++) {
    const h = n[a], u = i(h), x = Bt.get(h.toUpperCase());
    x && e(x, r, u), r += s(h);
  }
}
function At({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function _e({ x: n, y: t }, e, i) {
  return {
    x: n + i * Math.cos(e),
    y: t + i * Math.sin(e)
  };
}
let W = null;
const c = {
  get pos() {
    return W;
  },
  snapPos(n, t) {
    return W ? f().snap(W, n, t) : null;
  },
  moveToScreenPos(n) {
    const t = m.fromScreenPosition(n);
    W ? (W.x = t.x, W.y = t.y) : W = t, mn();
  },
  clearPos() {
    W = null;
  }
};
function at(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = m.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = m.fromScreenPosition(t);
}
const O = {};
for (let n = 1; n < 10; n++)
  O["" + n] = new Xt();
let Yt = new y(O[1]);
window.drawing = Yt;
function f(n) {
  return n ? O[n] ?? Bt.get(n) : Yt.value;
}
window.drawing = f;
function qt(n) {
  const t = f(n);
  !t || t === f() || (f().leave(), Yt.value = t, at(() => m.reset()), _t(), w("drawing #" + n));
}
const kt = [...Object.values(O), ...Bt.values()];
let l = null;
function Oe() {
  l = { type: "line" };
}
function Ut() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (l == null ? void 0 : l.type) !== "line" ? l = { type: "line", start: n } : l.start ? (f().addLine(l.start, n), l = {
    type: "line",
    start: n
  }) : l.start = n;
}
function jt() {
  (l == null ? void 0 : l.type) === "line" && (l = null);
}
function Fe() {
  l = { type: "arc", positions: [], cummRotation: 0 };
}
function Nt() {
  if (c.pos && ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [], cummRotation: 0 }), l.positions.push({ x: c.pos.x, y: c.pos.y }), l.positions.length === 3)) {
    const [n, t, e] = l.positions;
    f().addArc(t, e, n, l.cummRotation < 0 ? "cw" : "ccw"), l = null;
  }
}
function mn() {
  if (!l || l.type !== "arc" || l.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = l.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!l.prevAngle) {
    l.prevAngle = e, l.cummRotation = 0;
    return;
  }
  let i = e - l.prevAngle;
  i > Math.PI ? i -= L : i < -Math.PI && (i += L), l.cummRotation += i, l.prevAngle = e;
}
function Jt() {
  (l == null ? void 0 : l.type) === "arc" && (l = null);
}
function He(n, t) {
  f().attachers.removeAll((e) => e === t);
  for (const e of Object.values(O))
    e.onAttacherRemoved(n, t);
}
function yn(n, t) {
  n.attachers.unshift(t);
  for (const e of Object.values(O))
    e.onAttacherAdded(n, t);
}
function $e() {
  if (o().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && f().relax(); )
      ;
  }
}
function Tt() {
  !l && f().isEmpty() && xn(), pn(), f().render(), gn(), cn(), wn();
}
function xn() {
  const n = innerWidth / 100, t = (e, i) => A(e, i, k(), m.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function pn() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      c.pos && l.start && A(l.start, c.pos, k(), m.toScreenPosition);
      break;
    case "arc":
      for (const n of l.positions)
        ge(m.toScreenPosition(n), !1);
      if (c.pos && (ge(m.toScreenPosition(c.pos)), l.positions.length >= 1 && A(
        l.positions[0],
        l.positions.length === 2 ? T(
          l.positions[1],
          l.positions[0],
          l.cummRotation
        ) : c.pos,
        ut("normal"),
        m.toScreenPosition,
        10,
        !0
      )), l.positions.length === 1 && c.pos) {
        const n = b(c.pos, l.positions[0]), t = 1.5 * Math.PI / Math.sqrt(n / 2), e = Math.asin(10 / n);
        ct(
          l.positions[0],
          T(c.pos, l.positions[0], e),
          T(c.pos, l.positions[0], t),
          "ccw",
          k(),
          m.toScreenPosition
        ), ct(
          l.positions[0],
          T(c.pos, l.positions[0], -e),
          T(c.pos, l.positions[0], -t),
          "cw",
          k(),
          m.toScreenPosition
        );
      }
      l.positions.length === 2 && (A(
        l.positions[0],
        l.positions[1],
        ut("normal"),
        m.toScreenPosition,
        10,
        !0
      ), c.pos && l.cummRotation !== void 0 && Math.abs(l.cummRotation) > 0.05 && ct(
        l.positions[0],
        l.positions[1],
        c.pos,
        l.cummRotation < 0 ? "cw" : "ccw",
        k(),
        m.toScreenPosition
      ));
      break;
  }
}
function gn() {
  if (!c.pos || (l == null ? void 0 : l.type) === "arc")
    return;
  const n = m.toScreenPosition(c.pos), t = 0.5, e = ut;
  A(
    { x: n.x - o().crosshairsSize, y: n.y },
    { x: n.x - o().crosshairsSize * t, y: n.y },
    e("bold")
  ), A(
    { x: n.x + o().crosshairsSize, y: n.y },
    { x: n.x + o().crosshairsSize * t, y: n.y },
    e("bold")
  ), A(
    { x: n.x, y: n.y - o().crosshairsSize },
    { x: n.x, y: n.y - o().crosshairsSize * t },
    e("bold")
  ), A(
    { x: n.x, y: n.y + o().crosshairsSize },
    { x: n.x, y: n.y + o().crosshairsSize * t },
    e("bold")
  );
}
function wn() {
  if (!o().debug)
    return;
  const n = m.toScreenPosition({ x: 0, y: 0 });
  A({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, o().axisColor), A({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, o().axisColor);
  const t = c.pos;
  t && Ve(m.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Gt() {
  return c.pos ? f().handleAt(c.pos) : null;
}
function rt() {
  return c.pos ? f().thingAt(c.pos) : null;
}
function Vt() {
  const n = rt();
  return n instanceof $ ? n : null;
}
function Xe() {
  const n = rt();
  return n instanceof P ? n : null;
}
function Kt() {
  f().isEmpty() || (w("solve"), f().relax());
}
function Qt() {
  o().autoSolve = !o().autoSolve, w(`auto-solve ${o().autoSolve ? "on" : "off"}`);
}
function Zt() {
  c.pos && f().delete(c.pos) && (ue(), f().isEmpty() && at(() => m.reset()));
}
function te() {
  return !!c.pos && f().fixedDistance(c.pos);
}
function ee() {
  return !!c.pos && f().fixedPoint(c.pos);
}
function ne() {
  return !!c.pos && f().weight(c.pos);
}
function ie() {
  return !!c.pos && f().horizontalOrVertical(c.pos);
}
function se() {
  return !!c.pos && f().fullSize(c.pos);
}
function Ye() {
  const n = c.pos;
  n && (w("re-center"), at(() => {
    m.centerAt(n);
  }));
}
function ae(n) {
  const t = f(n);
  if (!t.isEmpty() && c.pos && !t.contains(f())) {
    const e = f().addInstance(t, c.pos, 0.5 * t.size / m.scale, 0);
    w("instantiate #" + n, e);
  }
}
function re() {
  c.pos && f().dismember(c.pos) && ue();
}
function qe(n) {
  n.dismemberAllInstances(), ue();
}
window.dismemberAllInstances = qe;
function xt(n) {
  return !!c.pos && f().rotateInstanceAt(c.pos, n);
}
function pt(n) {
  return !!c.pos && f().resizeInstanceAt(c.pos, n);
}
function oe() {
  if (!c.pos)
    return;
  const n = f().handleAt(c.pos);
  n && (f().attachers.includes(n) ? (He(f(), n), w("remove attacher")) : (yn(f(), n), w("add attacher")));
}
let X = null;
function ce() {
  if (!X) {
    (X = Vt()) && w("equal length", X);
    return;
  }
  const n = Vt();
  n && (f().constraints.add(
    new vt(X.a, X.b, n.a, n.b)
  ), w("equal length", X, n));
}
function _t() {
  X = null;
}
function zt(n) {
  at(() => m.scale = n), w("scale=" + m.scale.toFixed(1));
}
function he(n, t) {
  at(() => {
    m.center.x -= n, m.center.y -= t;
  });
}
function le() {
  J().bookmark();
}
function de() {
  const n = an();
  n && (w("paste"), n.pasteInto(J()));
}
function ue() {
  for (; bn(); )
    ;
}
function bn() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of kt)
    for (const i of e.things)
      n.add(i), i.forEachHandle((s) => t.add(s));
  for (const e of kt) {
    let i = !1;
    for (const s of e.attachers)
      t.has(s) || (He(e, s), i = !0);
    if (i)
      return !0;
  }
  for (const e of kt)
    e.constraints.forEach((i) => {
      i.isStillValid(n, t) || e.constraints.remove(i);
    });
  return !1;
}
const vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copy: le,
  del: Zt,
  dismember: re,
  dismemberAllInstances: qe,
  drawing: f,
  drawings: O,
  endArc: Jt,
  endEqualLength: _t,
  endLines: jt,
  fixedDistance: te,
  fixedPoint: ee,
  fullSize: se,
  handle: Gt,
  horizontalOrVertical: ie,
  instance: Xe,
  instantiate: ae,
  line: Vt,
  moreArc: Nt,
  moreEqualLength: ce,
  moreLines: Ut,
  onFrame: $e,
  panBy: he,
  paste: de,
  pen: c,
  reCenter: Ye,
  render: Tt,
  rotateInstanceBy: xt,
  scaleInstanceBy: pt,
  setScale: zt,
  solve: Kt,
  startArc: Fe,
  startLines: Oe,
  switchToDrawing: qt,
  thing: rt,
  toggleAttacher: oe,
  toggleAutoSolve: Qt,
  weight: ne
}, Symbol.toStringTag, { value: "Module" }));
var Ie;
const En = (Ie = window.webkit) == null ? void 0 : Ie.messageHandlers, Sn = window.webkit != null;
function Pe(n, t = n) {
  Sn && En[n].postMessage(t);
}
let et = [], Mt = !1;
function Bn() {
  const n = et;
  return et = [], n;
}
function Ae(n) {
  for (const t of n)
    (!t.predicted || o().usePredictedEvents) && et.push(t);
}
function fe(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (Mt = !0), t === "ended" && (Mt = !1), !(t === "moved" && !Mt) && et.push({
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
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", Ue), et = [];
}
window.onpointerdown = (n) => fe(n, "began");
window.onpointermove = (n) => fe(n, "moved");
window.onpointerup = (n) => fe(n, "ended");
const Ue = (n) => n.preventDefault();
window.addEventListener("touchstart", Ue, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Ae, _n(), Ae(n);
};
const ke = 0.75, me = () => o().fontScale * 8;
function V(n, t, e, i = 0.35) {
  f().drawText(n, i, {
    x: t + o().tabletButtonWidth / 2,
    y: e + me() / 2 + i * o().fontScale * 3
  });
}
class g {
  constructor(t, e) {
    this.label = t, this.highlightPred = e, this.topY = 0, this.leftX = 0, this.lastDownTime = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + o().tabletButtonWidth && this.topY <= e && e < this.topY + me();
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
function Y(n) {
  return new g(n, () => f() === O[n]);
}
function Mn(n) {
  return "1" <= n.label && n.label <= "9";
}
const Ne = new class extends je {
  constructor() {
    super(), this.lineButton = new g("LINE"), this.moveButton = new g("MOVE"), this.horvButton = new g("HORV"), this.sizeButton = new g("SIZE"), this.dismemberButton = new g("DISM"), this.deleteButton = new g("DEL"), this.solveButton = new g("SOLVE", () => o().autoSolve), this.arcButton = new g("ARC"), this.eqButton = new g("EQ"), this.fixButton = new g("FIX"), this.weightButton = new g("weight"), this.attacherButton = new g("ATT"), this.clearButton = new g("CLEAR"), this.timeButton = new g("TIME"), this.configButton = new g("config"), this.reloadButton = new g("reload"), this.col1 = [
      Y("1"),
      Y("2"),
      Y("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      Y("4"),
      Y("5"),
      Y("6"),
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
    o().lefty ? (this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * o().tabletButtonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(o().tabletButtonWidth, this.col2), this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col3));
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
    ze(n), o().onionSkinAlpha = Math.min(t, 4) / 4 * 0.9;
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof M && f().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && ce();
  }
  onButtonDown(n) {
    if (Mn(n)) {
      c.pos ? (ae(n.label), this.move()) : qt(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        f().clear(), m.reset();
        break;
      case this.lineButton:
        Ut();
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
        re();
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
        ft().updateRenderingInfo(), mt("top"), this.oldAutoSolveSetting = o().autoSolve, o().autoSolve = !1;
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
        _t();
        break;
      case this.timeButton:
        mt("bottom"), o().autoSolve = this.oldAutoSolveSetting;
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
    if (f().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const i = m.fromScreenPosition(n), s = m.fromScreenPosition(e);
    if (c.pos || he(i.x - s.x, i.y - s.y), this.fingerScreenPositions.size !== 2)
      return;
    let r = null;
    for (const [E, Pt] of this.fingerScreenPositions.entries())
      if (E !== t) {
        r = Pt;
        break;
      }
    if (!r)
      throw new Error("bruh?!");
    const a = m.fromScreenPosition(r), h = b(a, s), x = b(a, i) / h, v = Math.atan2(s.y - a.y, s.x - a.x), p = Math.atan2(i.y - a.y, i.x - a.x);
    Xe() && !this.drag && this.move(), !pt(x) && !c.pos && (m.scale *= x), xt(p - v);
  }
  move() {
    const n = Gt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = rt();
    t && (this.drag = { thing: t, offset: K(c.pos, t) });
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
    super.render(), this.timeButton.isDown && ft().render();
  }
}(), Je = new class extends je {
  constructor() {
    super(), this.leftyButton = new g("lefty"), this.lineWidthButton = new g("lwidth"), this.alphaButton = new g("opacity"), this.flickerButton = new g("flicker"), this.ctrlPtsButton = new g("ctrl pts"), this.defaultsButton = new g("defaults"), this.backButton = new g("back"), this.col1 = [
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
      o().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * o().tabletButtonWidth,
      this.leftyButton.topY
    ), V(
      o().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * o().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * ke
    ), V(
      o().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * o().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * ke
    ), V(
      o().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * o().tabletButtonWidth,
      this.flickerButton.topY
    ), V(
      o().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * o().tabletButtonWidth,
      this.ctrlPtsButton.topY
    );
  }
  layOutButtons() {
    this.layOutButtonColumn(innerWidth / 2 - o().tabletButtonWidth / 2, this.col1), o().lefty ? this.layOutButtonColumn(0, this.col2) : this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col2);
  }
  onFrame() {
  }
  onButtonDown(n) {
    switch (n) {
      case this.defaultsButton:
        Ze(), w("restored defaults!");
        break;
      case this.leftyButton:
        q({ lefty: !o().lefty });
        break;
      case this.flickerButton:
        q({ flicker: !o().flicker });
        break;
      case this.ctrlPtsButton:
        q({ showControlPoints: !o().showControlPoints });
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
        Math.min(o().lineWidth + (n.x - innerWidth / 2) / innerWidth * 2, 10)
      );
      q({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(o().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      q({ baseAlphaMultiplier: e });
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
  const e = f(), i = [];
  return Le(n, t, (s, r, a) => {
    const h = e.addInstance(s, { x: r, y: m.center.y }, s.size * a, 0);
    e.constraints.add(new St(h, a));
    const u = i.at(-1);
    u && e.replaceHandle(h.attachers[0], u.attachers[1]), i.push(h);
  }), i;
}
function Dn(n, t = 1) {
  const e = Ge(n, t);
  for (const i of e) {
    const s = m.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    i.x = s.x, i.x = s.y;
  }
}
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: Dn,
  write: Ge
}, Symbol.toStringTag, { value: "Module" })), I = {};
let nt = !1, it = !1, S = null;
function Tn() {
  window.addEventListener("keydown", Rn), window.addEventListener("keyup", Ln), _.addEventListener("pointerdown", On), _.addEventListener("pointermove", Fn), _.addEventListener("pointerup", Hn);
}
let N = !1, Me;
function Vn() {
  I.t ? N || (N = !0, ft().updateRenderingInfo(), document.getElementById("canvas").style.cursor = "pointer", mt("top"), Me = o().autoSolve, o().autoSolve = !1) : N && (N = !1, document.getElementById("canvas").style.cursor = "none", mt("bottom"), o().autoSolve = Me), I[" "] && Kt();
}
function zn() {
  N && ft().render();
}
function Rn(n) {
  if (!I[n.key]) {
    if (I[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
      const t = n.code.slice(5);
      I.Shift ? ae(t) : qt(t);
      return;
    }
    switch (n.key) {
      case "a":
        Fe();
        break;
      case "Meta":
        Oe();
        break;
      case "f":
        q({ flicker: !o().flicker });
        return;
      case "d":
        o().debug = !o().debug, w(`debug ${o().debug ? "on" : "off"}`);
        return;
      case "S":
        Qt();
        return;
      case "p":
        de();
        return;
    }
    if (!f().isEmpty())
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
          pt(1.05) || zt(Math.min(m.scale + 0.1, 10));
          break;
        case "-":
          pt(0.95) || zt(Math.max(m.scale - 0.1, 0.1));
          break;
        case "q":
          xt(5 * Math.PI / 180);
          break;
        case "w":
          xt(-5 * Math.PI / 180);
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
          re();
          break;
        case "C":
          le();
          break;
      }
  }
}
function Ln(n) {
  if (I[n.key])
    switch (delete I[n.key], n.key) {
      case "Meta":
        jt(), it = !1, nt || c.clearPos();
        break;
      case "a":
        Jt(), it = !1, nt || c.clearPos();
        break;
      case "e":
        _t();
        break;
    }
}
function On(n) {
  if (_.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), nt = !0, I.Meta) {
    Ut(), it = !0;
    return;
  } else if (I.a) {
    Nt(), it = !0;
    return;
  } else if (I.e) {
    ce();
    return;
  }
  S = null;
  const t = Gt();
  if (t) {
    S = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = rt();
  e && (S = { thing: e, offset: K(c.pos, e) });
}
function Fn(n) {
  if (N) {
    ze(n);
    return;
  }
  if (n.metaKey || delete I.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), nt && t && !f().isEmpty() && !it && !S) {
    he(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(S == null ? void 0 : S.thing), S) {
    const e = c.pos.x - S.offset.x, i = c.pos.y - S.offset.y;
    S.thing.moveBy(e - S.thing.x, i - S.thing.y);
  }
}
function Hn(n) {
  _.releasePointerCapture(n.pointerId), nt = !1, I.Meta || c.clearPos(), (S == null ? void 0 : S.thing) instanceof M && f().mergeAndAddImplicitConstraints(S.thing), S = null;
}
const $n = () => !1, Xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Tn,
  isInConfigScreen: $n,
  onFrame: Vn,
  render: zn
}, Symbol.toStringTag, { value: "Module" }));
en(document.getElementById("canvas"));
const lt = Rt() ? Cn : Xn;
lt.init();
function Ke() {
  const n = J();
  n.seal(), lt.onFrame(), $e(), nn(), lt.render(), lt.isInConfigScreen() ? Ct(0.25, () => Tt()) : Tt();
  const t = J();
  t !== n && !t.hasWrites() && (n.disown(t), n.goInto()), requestAnimationFrame(Ke);
}
Ke();
window.app = vn;
window.demos = Wn;
