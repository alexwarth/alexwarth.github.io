const d = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 1.5,
  lineWidth: 3.5,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgb(255,165,0)",
  instanceSideAttacherColor: "rgb(255,222,33)",
  axisColor: "rgba(255,222,33,0.125)",
  handleRadius: 5,
  closeEnough: 5,
  crosshairsSize: 15,
  fontScale: 10,
  kerning: 0.5,
  showGuideLines: !1,
  guideLineColor: "rgba(255,255,255,.125)",
  statusTimeMillis: 4e3,
  usePredictedEvents: !1,
  weight: 25,
  distanceConstraintTextScale: 0.3,
  distanceConstraintLabelPct: 0.25,
  showImplicitConstraints: !1,
  tablet: {
    buttonWidth: 100
  }
};
window.config = d;
const ye = Math.PI * 2;
function p(n, t) {
  return Math.sqrt(j(n, t));
}
function j(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function _(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const K = Object.freeze({ x: 0, y: 0 });
function Mt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function ht(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function ut(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), c = s * a - i * r, M = s * r + i * a;
  return { x: c + t.x, y: M + t.y };
}
function kt(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function zt(n, t, e) {
  return Math.sqrt(fe(n, t, e));
}
function fe(n, t, e) {
  const s = j(t, e);
  if (s == 0)
    return j(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return j(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function ge(n) {
  return 1 - Math.pow(1 - n, 5);
}
let g, h, Vt = !1;
function pe(n) {
  g = n, h = g.getContext("2d"), It(), Vt = !0;
}
function It() {
  if (g.width = innerWidth, g.height = innerHeight, devicePixelRatio !== 1) {
    const n = g.width, t = g.height;
    g.width = n * devicePixelRatio, g.height = t * devicePixelRatio, g.style.width = n + "px", g.style.height = t + "px", h.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", It);
let W = "", Ct = 0;
function y(n) {
  Vt && (W = n, Ct = Date.now());
}
function we() {
  if (h.clearRect(0, 0, g.width, g.height), h.lineWidth = d.lineWidth, h.lineCap = "round", W.length > 0) {
    h.font = "40px Monaco";
    const t = h.measureText(W).width, e = Date.now() - Ct;
    if (e > d.statusTimeMillis)
      W = "";
    else {
      const s = 1 - ge(e / d.statusTimeMillis);
      h.fillStyle = `rgba(255,222,33,${s})`, h.fillText(W, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function tt(n) {
  return n;
}
function Tt(n, t = E(), e = tt) {
  const s = e(n);
  h.fillStyle = t, h.beginPath(), h.arc(s.x, s.y, h.lineWidth * 2, 0, ye), h.fill();
}
function V(n, t, e = E(), s = tt) {
  const i = h.lineWidth;
  n.x === t.x && n.y === t.y && (h.lineWidth *= 2), h.strokeStyle = e, h.beginPath();
  const r = s(n), a = s(t);
  h.moveTo(r.x, r.y), h.lineTo(a.x, a.y), h.stroke(), h.lineWidth = i;
}
function Dt(n, t, e, s = E(), i = tt) {
  const r = i(t), a = i(e), c = i(n);
  h.beginPath(), h.strokeStyle = s;
  const M = Math.atan2(r.y - c.y, r.x - c.x), I = Math.atan2(a.y - c.y, a.x - c.x);
  h.arc(c.x, c.y, p(c, r), M, I), h.stroke();
}
function Lt(n, t, e = E(), s = tt) {
  h.fillStyle = e;
  const i = 12;
  h.font = `${i}px Major Mono Display`;
  const r = h.measureText(t).width, { x: a, y: c } = s(n);
  h.fillText(t, a - r / 2, c + i / 2);
}
function E(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= d.baseAlphaMultiplier, `rgba(255,255,255,${d.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let C = 1;
const T = { x: 0, y: 0 }, u = {
  reset() {
    C = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return C;
  },
  set scale(n) {
    C = n;
  },
  centerAt({ x: n, y: t }) {
    T.x = n, T.y = t;
  },
  get center() {
    return T;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - T.x) * C + innerWidth / 2,
      y: -(t - T.y) * C + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / C + T.x,
      y: T.y - (t - innerHeight / 2) / C
    };
  }
};
class P {
  constructor(t, e) {
    this.things = t, this.handles = e;
  }
  // override in subclasses like weight constraint
  preRelax() {
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    return this.things.every((s) => t.has(s)) && this.handles.every((s) => e.has(s));
  }
  replaceHandle(t, e) {
    for (let s = 0; s < this.handles.length; s++)
      this.handles[s], this.handles.forEach((i, r) => {
        i === t && (this.handles[r] = e);
      });
  }
}
class xt extends P {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e) {
    return new xt(e.get(this.p), this.pos);
  }
  get p() {
    return this.handles[0];
  }
  get signature() {
    return `FP(${this.p.id})`;
  }
  computeError() {
    return p(this.p, this.pos) * 100;
  }
}
class mt extends P {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new mt(e.get(this.a), e.get(this.b));
  }
  get a() {
    return this.handles[0];
  }
  get b() {
    return this.handles[1];
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `HorV(${t},${e})`;
  }
  computeError() {
    return Math.min(Math.abs(this.a.x - this.b.x), Math.abs(this.a.y - this.b.y));
  }
}
class Q extends P {
  constructor(t, e) {
    super([], [t, e]), this.distance = p(t, e);
  }
  map(t, e) {
    return new Q(e.get(this.a), e.get(this.b));
  }
  get a() {
    return this.handles[0];
  }
  get b() {
    return this.handles[1];
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `D(${t},${e})`;
  }
  computeError() {
    return this.distance - p(this.a, this.b);
  }
}
class O extends P {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new O(
      e.get(this.a1),
      e.get(this.b1),
      e.get(this.a2),
      e.get(this.b2)
    );
  }
  get a1() {
    return this.handles[0];
  }
  get b1() {
    return this.handles[1];
  }
  get a2() {
    return this.handles[2];
  }
  get b2() {
    return this.handles[3];
  }
  get signature() {
    return `E(${this.a1.id},${this.b1.id},${this.a2.id},${this.b2.id})`;
  }
  computeError() {
    return Math.abs(p(this.a1, this.b1) - p(this.a2, this.b2));
  }
}
class $ extends P {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new $(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b)
    );
  }
  get p() {
    return this.handles[0];
  }
  get a() {
    return this.handles[1];
  }
  get b() {
    return this.handles[2];
  }
  get signature() {
    return `POL(${this.p.id},${this.a.id},${this.b.id})`;
  }
  computeError() {
    return zt(this.p, this.a, this.b);
  }
}
class F extends P {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new F(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b),
      e.get(this.c)
    );
  }
  get p() {
    return this.handles[0];
  }
  get a() {
    return this.handles[1];
  }
  get b() {
    return this.handles[2];
  }
  get c() {
    return this.handles[3];
  }
  get signature() {
    return `POA(${this.p.id},${this.a.id},${this.b.id},${this.c.id})`;
  }
  computeError() {
    return p(this.p, this.c) - p(this.a, this.c);
  }
}
class et extends P {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new et(
      e.get(this.instancePoint),
      t.get(this.instance),
      this.masterPoint
    );
  }
  get instancePoint() {
    return this.handles[0];
  }
  get masterPoint() {
    return this.handles[1];
  }
  get signature() {
    return `PI(${this.instance.id},${this.masterPoint.id})`;
  }
  computeError() {
    return p(
      this.instancePoint,
      Mt(
        ht(
          ut(this.masterPoint, K, this.instance.angle),
          K,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class J extends P {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new J(t.get(this.instance), this.scale);
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class yt extends P {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new yt(e.get(this.a));
  }
  get a() {
    return this.handles[0];
  }
  get signature() {
    return `W(${this.a.id})`;
  }
  preRelax() {
    this.y0 = this.a.y;
  }
  computeError() {
    return this.y0 - d.weight - this.a.y;
  }
}
class wt {
  constructor() {
    this.constraints = [];
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((s) => s.signature === e) || this.constraints.push(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter((e) => e !== t);
  }
  clear() {
    this.constraints = [];
  }
  replaceHandle(t, e) {
    const s = this.constraints;
    this.constraints = [], s.forEach((i) => {
      i.replaceHandle(t, e), this.add(i);
    });
  }
  forEach(t) {
    this.constraints.forEach(t);
  }
  relax(t) {
    this.forEach((r) => r.preRelax());
    const e = u.scale > 0 ? 1 / u.scale : 1, s = d.minWorthwhileErrorImprovement * e;
    let i = !1;
    for (const r of t)
      i = this.relaxWithVar(r, e, s) || i;
    return i;
  }
  relaxWithVar(t, e, s) {
    const i = t.value, r = this.computeError() - s;
    t.value = i + e;
    const a = this.computeError();
    t.value = i - e;
    const c = this.computeError();
    return a < Math.min(r, c) ? (t.value = i + e, !0) : c < Math.min(r, a) ? (t.value = i - e, !0) : (t.value = i, !1);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class L {
  constructor(t) {
    this.value = t;
  }
}
const N = class N {
  constructor({ x: t, y: e }) {
    this.id = N.nextId++, this.xVar = new L(t), this.yVar = new L(e);
  }
  get x() {
    return this.xVar.value;
  }
  set x(t) {
    this.xVar.value = t;
  }
  get y() {
    return this.yVar.value;
  }
  set y(t) {
    this.yVar.value = t;
  }
  contains(t) {
    return p(t, this) <= d.closeEnough;
  }
  distanceTo(t) {
    return p(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, s = d.instanceSideAttacherColor) {
    d.debug && Lt(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), Tt(this, s, e);
  }
  forEachHandle(t) {
    t(this);
  }
  replaceHandle(t, e) {
    throw new Error("should never call replace() on Handle");
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar);
  }
  toString() {
    return `handle(id=${this.id})`;
  }
};
N.nextId = 0;
let v = N;
class z {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new v(t), this.b = new v(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= d.closeEnough;
  }
  distanceTo(t) {
    return zt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !d.showGuideLines)
      return;
    const s = this.isGuide ? d.guideLineColor : E(t.has(this) ? "bold" : "normal");
    V(this.a, this.b, s, e);
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a == t && (this.a = e), this.b == t && (this.b = e);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
class q {
  constructor(t, e, s) {
    this.a = new v(t), this.b = new v(e), this.c = new v(s);
  }
  contains(t) {
    return this.distanceTo(t) <= d.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(p(t, this.c) - p(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    Dt(
      this.c,
      this.a,
      this.b,
      E(t.has(this) ? "bold" : "normal"),
      e
    );
  }
  forEachHandle(t) {
    t(this.a), t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.a == t && (this.a = e), this.b == t && (this.b = e), this.c == t && (this.c = e);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
const Z = class Z {
  constructor(t, e, s, i, r, a) {
    this.master = t, this.transform = (c) => Mt(ht(ut(c, K, this.angle), K, this.scale), this), this.id = Z.nextId++, this.attachers = [], this.xVar = new L(e), this.yVar = new L(s), this.angleAndSizeVecX = new L(i * Math.cos(r)), this.angleAndSizeVecY = new L(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new v(this.transform(t));
    this.attachers.push(s), e.constraints.add(new et(s, this, t));
  }
  get x() {
    return this.xVar.value;
  }
  set x(t) {
    this.xVar.value = t;
  }
  get y() {
    return this.yVar.value;
  }
  set y(t) {
    this.yVar.value = t;
  }
  get size() {
    return Math.sqrt(
      Math.pow(this.angleAndSizeVecX.value, 2) + Math.pow(this.angleAndSizeVecY.value, 2)
    );
  }
  set size(t) {
    const e = this.angle;
    this.angleAndSizeVecX.value = t * Math.cos(e), this.angleAndSizeVecY.value = t * Math.sin(e);
  }
  get angle() {
    return Math.atan2(this.angleAndSizeVecY.value, this.angleAndSizeVecX.value);
  }
  set angle(t) {
    const e = this.size;
    this.angleAndSizeVecX.value = e * Math.cos(t), this.angleAndSizeVecY.value = e * Math.sin(t);
  }
  get scale() {
    return this.size / this.master.size;
  }
  set scale(t) {
    this.size = t * this.master.size;
  }
  contains(t) {
    const { topLeft: e, bottomRight: s } = this.boundingBox();
    return e.x <= t.x && t.x <= s.x && s.y <= t.y && t.y <= e.y;
  }
  boundingBox() {
    const { topLeft: t, bottomRight: e } = this.master.boundingBox(), s = [
      t,
      e,
      { x: t.x, y: e.y },
      { x: e.x, y: t.y }
    ].map(this.transform);
    return kt(s);
  }
  distanceTo(t) {
    return p(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => e(this.transform(i)), s + 1), s === 1 && this.attachers.forEach((i, r) => {
      const a = e(i);
      V(
        e(this.transform(this.master.attachers[r])),
        a,
        d.instanceSideAttacherColor
      ), Tt(a, d.instanceSideAttacherColor);
    });
  }
  forEachHandle(t) {
    this.attachers.forEach(t);
  }
  replaceHandle(t, e) {
    this.attachers = this.attachers.map((s) => s === t ? e : s);
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar), t(this.angleAndSizeVecX), t(this.angleAndSizeVecY), this.forEachHandle((e) => e.forEachVar(t));
  }
};
Z.nextId = 0;
let b = Z;
class Ht {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new wt(), this.selection = /* @__PURE__ */ new Set();
  }
  clear() {
    this.things = [], this.attachers = [], this.constraints.clear(), this.selection.clear();
  }
  isEmpty() {
    return this.things.length === 0;
  }
  relax() {
    return this.constraints.relax(this.getVars());
  }
  render(t = u.toScreenPosition, e = 0) {
    this.things.forEach((s) => {
      s instanceof b ? s.render(this.selection, t, e + 1) : s.render(this.selection, t);
    }), e === 0 && (this.attachers.forEach(
      (s) => s.render(this.selection, t, d.masterSideAttacherColor)
    ), this.constraints.forEach((s) => {
      if (s instanceof Q) {
        let i = (s.computeError() * 100).toFixed();
        i === "-0" && (i = "0"), this.drawText(
          i,
          d.distanceConstraintTextScale,
          t({
            x: s.a.x + d.distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + d.distanceConstraintLabelPct * (s.b.y - s.a.y)
          })
        );
      }
    }));
  }
  addInstance(t, { x: e, y: s }, i, r) {
    if (t === this)
      return null;
    const a = new b(t, e, s, i, r, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: r, y: a } = ht(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: r, y: a } = ut(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, s = !1) {
    const i = new z(t, e, s);
    s || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && i.contains(a) && this.constraints.add(new $(a, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, s) {
    const i = new q(t, e, s);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(new O(i.a, i.c, i.b, i.c));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && a !== i.c && i.contains(a) && this.constraints.add(new F(a, i.a, i.b, i.c));
      });
    return this.things.push(i), i;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.things)
      s.forEachHandle((i) => {
        i !== t && i.contains(t) && (this.replaceHandle(i, t), e.add(s));
      });
    for (const s of this.things)
      e.has(s) || !s.contains(t) || (s instanceof z ? (this.constraints.add(new $(t, s.a, s.b)), d.showImplicitConstraints && y("(point on line)")) : s instanceof q && (this.constraints.add(new F(t, s.a, s.b, s.c)), d.showImplicitConstraints && y("(point on arc)")));
  }
  replaceHandle(t, e) {
    this.things.forEach((s) => s.replaceHandle(t, e)), this.attachers = this.attachers.map((s) => s === t ? e : s), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    return e.size === 0 ? !1 : (this.things = this.things.filter((s) => !e.has(s)), this.selection.clear(), !0);
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new xt(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new yt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(new Q(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const s of this.selection)
      s instanceof z && (e && (this.constraints.add(new O(e.a, e.b, s.a, s.b)), t = !0), e = s);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(new mt(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  fullSize(t) {
    let e = !1;
    const s = this.thingsForOperation(t);
    for (const i of s)
      i instanceof b && (this.constraints.add(new J(i)), e = !0);
    return e;
  }
  dismember(t) {
    let e = !1;
    const s = this.thingsForOperation(t);
    for (const i of s)
      i instanceof b && (this.inline(i), e = !0);
    return e;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof z) {
        const c = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, c.a), i.set(a.b, c.b);
      } else if (a instanceof q) {
        const c = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c)
        );
        i.set(a.a, c.a), i.set(a.b, c.b), i.set(a.c, c.c);
      } else if (a instanceof b) {
        const c = this.addInstance(
          a.master,
          t.transform(a),
          // move the center to the right place
          t.scale * a.size,
          t.angle + a.angle
        );
        r.set(a, c);
      } else
        throw new Error("unsupported thing type: " + a.constructor.name);
    s.forEach((a) => {
      this.constraints.add(a.map(r, i));
    }), this.things = this.things.filter((a) => a !== t);
  }
  snap(t, e) {
    const s = this.handleAt(t, e);
    if (s) {
      t.x = s.x, t.y = s.y;
      return;
    }
    const i = new wt(), r = new v(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((c) => a.add(c));
    for (const c of this.things)
      this.selection.has(c) || !c.contains(t) || (c instanceof z ? i.add(new $(r, c.a, c.b)) : c instanceof q && i.add(new F(r, c.a, c.b, c.c)));
    for (; i.relax(a); )
      ;
    t.x = r.x, t.y = r.y;
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const c = p(t, a);
          c < s && (i = a, s = c);
        }
      });
    return i;
  }
  thingAt(t) {
    let e = 1 / 0, s = null;
    for (const i of this.things)
      if (i.contains(t)) {
        const r = i.distanceTo(t);
        r < e && (s = i, e = r);
      }
    return s;
  }
  toggleSelections(t) {
    for (const e of this.things)
      e.contains(t) && this.toggleSelected(e);
  }
  toggleSelected(t) {
    this.selection.has(t) ? this.selection.delete(t) : this.selection.add(t);
  }
  clearSelection() {
    this.selection.clear();
  }
  moveSelectionBy(t, e) {
    for (const s of this.getHandles(this.selection))
      s.x += t, s.y += e;
  }
  leave() {
    this.center(), this.selection.clear();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), s = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const r of this.getPositions())
      r.x += s, r.y += i;
  }
  boundingBox() {
    const t = [...this.getPositions()];
    for (const e of this.things)
      if (e instanceof b) {
        const s = e.boundingBox();
        t.push(s.topLeft), t.push(s.bottomRight);
      }
    return kt(t);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: s } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(s, 2));
    return Math.sqrt(t) * 2;
  }
  thingsForOperation(t) {
    const e = this.thingAt(t);
    return this.selection.size > 0 ? this.selection : e ? /* @__PURE__ */ new Set([e]) : /* @__PURE__ */ new Set();
  }
  getHandles(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of t)
      s.forEachHandle((i) => e.add(i));
    return e;
  }
  getHandle(t) {
    let e, s = 0;
    for (const i of this.things)
      i.forEachHandle((r) => {
        s++ === t && (e = r);
      });
    return e;
  }
  getPositions() {
    const t = this.getHandles(this.things);
    for (const e of this.things)
      e instanceof b && t.add(e);
    return t;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((s) => t.add(s));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const s of this.things)
      s instanceof b && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof et && s.masterPoint === e) {
        const { instance: i, instancePoint: r } = s;
        i.attachers = i.attachers.filter((a) => a !== r), this.constraints.remove(s);
      }
    });
  }
  write(t, e = 1) {
    let s = null;
    bt(t, e, (i, r, a) => {
      const c = this.addInstance(i, { x: r, y: u.center.y }, i.size * a, 0);
      this.constraints.add(new J(c, a)), s && this.replaceHandle(c.attachers[0], s.attachers[1]), s = c;
    });
  }
  drawText(t, e, s) {
    bt(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: c, y: M }) => ({
          x: c * a + r - u.center.x + s.x,
          y: -M * a + s.y
        }),
        1
      )
    );
  }
}
const be = {
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
          end: 1.6510788551694173,
          radius: 2,
          start: -1.7538223513576943
        },
        {
          center: {
            target: {},
            x: 2,
            y: 6
          },
          command: "arc",
          end: 1.6088526566614771,
          radius: 2,
          start: -1.6497448846816716
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
          end: -3.140173248422545,
          radius: 2,
          start: -0.007871078049560942
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
          end: 0,
          radius: 2,
          start: 3.04931868620317
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
          end: 1.5707963267948966,
          radius: 4,
          start: -1.5839465742972498
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
          end: 3.141592653589793,
          radius: 2,
          start: 0
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
          end: 0,
          radius: 2,
          start: 3.106747414219492
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
          end: 0.03160956695399596,
          radius: 1,
          start: -2.4475630944962603
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
          end: 3.141592653589793,
          radius: 2,
          start: 0
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
          end: 0.02388313118406498,
          radius: 2,
          start: 3.1354718854624473
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
          end: 1.5707963267948966,
          radius: 2,
          start: -1.5731239338803342
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
          end: 3.141592653589793,
          radius: 2,
          start: -0.07706266528326922
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
          end: 0,
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
          end: 1.5954287038581172,
          radius: 2,
          start: -1.5815161841573633
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
          end: -1.5508014915099348,
          radius: 2,
          start: 0.2790589122600394
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          end: 1.4038768231185412,
          radius: 2,
          start: 3.056962552531346
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
          end: 0,
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
      []
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
      []
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
            x: 2,
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
            y: 0
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
          end: 0,
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
          end: 3.141592653589793,
          radius: 2,
          start: 0
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
          end: 3.141592653589793,
          radius: 2,
          start: -0.9092114259490837
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
          end: 3.141592653589793,
          radius: 2,
          start: -1.5688446019944482
        },
        {
          center: {
            x: 2,
            y: 2
          },
          command: "arc",
          end: 1.5695966392893481,
          radius: 2,
          start: 3.141592653589793
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
          end: 2.199739485396577,
          radius: 2.5,
          start: -2.2182639782647846
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
          end: 9.1247779607692,
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
    ]
  ]
}, Se = 1, ve = {
  data: be,
  version: Se
};
function Ee(n, t, e = d.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = st(s.start, e), r = st(s.end, e);
        n.addLine(i, r);
        break;
      }
      case "arc": {
        const i = st(s.center, e), r = s.radius * e;
        n.addArc(
          St(i, s.end, r),
          St(i, s.start, r),
          i
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", s);
        break;
    }
}
const Ae = new Map(ve.data.values), nt = /* @__PURE__ */ new Map();
for (const [n, t] of Ae) {
  const e = new Ht();
  Ee(e, t, d.fontScale);
  const s = e.addLine(
    { x: -d.kerning * d.fontScale, y: 0 },
    { x: (4 + d.kerning) * d.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), nt.set(n, e);
}
function bt(n, t, e) {
  const s = (a) => t * (a === a.toUpperCase() ? 1 : 0.75), i = (a) => s(a) * d.fontScale * (4 + d.kerning * 2);
  let r = u.center.x - 0.5 * [...n].map(i).reduce((a, c) => a + c, 0);
  for (let a = 0; a < n.length; a++) {
    const c = n[a], M = s(c), I = nt.get(c.toUpperCase());
    I && e(I, r, M), r += i(c);
  }
}
function st({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function St({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let k = null;
const o = {
  get pos() {
    return k;
  },
  snapPos(n) {
    k && l.snap(k, n);
  },
  moveToScreenPos(n) {
    const t = u.fromScreenPosition(n);
    k ? (k.x = t.x, k.y = t.y) : k = t;
  },
  clearPos() {
    k = null;
  }
};
function X(n) {
  if (!o.pos) {
    n();
    return;
  }
  const t = u.toScreenPosition(o.pos);
  n(), { x: o.pos.x, y: o.pos.y } = u.fromScreenPosition(t);
}
const B = {};
for (let n = 1; n < 10; n++)
  B["" + n] = new Ht();
let l = B[1];
window.drawing = l;
function S(n) {
  return n ? B[n] ?? nt.get(n) : l;
}
function Bt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, X(() => u.reset()), y("drawing #" + n), window.drawing = l);
}
const it = [...Object.values(B), ...nt.values()];
let x = null;
function Wt() {
  if (!o.pos)
    return;
  const n = { x: o.pos.x, y: o.pos.y };
  (x == null ? void 0 : x.type) === "line" && l.addLine(x.start, n), x = {
    type: "line",
    start: n
  };
}
function $t() {
  (x == null ? void 0 : x.type) === "line" && (x = null);
}
function Ft() {
  if (o.pos && ((x == null ? void 0 : x.type) !== "arc" && (x = { type: "arc", positions: [] }), x.positions.push({ x: o.pos.x, y: o.pos.y }), x.positions.length === 3)) {
    const [n, t, e] = x.positions;
    l.addArc(t, e, n), x = null;
  }
}
function Ot() {
  (x == null ? void 0 : x.type) === "arc" && (x = null);
}
function Rt(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(B))
    s.onAttacherRemoved(n, t);
}
function Pe(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(B))
    e.onAttacherAdded(n, t);
}
function Me() {
  if (d.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function ke() {
  !x && l.isEmpty() && ze(), Ve(), l.render(), Ie(), Ce();
}
function ze() {
  const n = innerWidth / 100, t = (e, s) => V(e, s, E(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function Ve() {
  switch (x == null ? void 0 : x.type) {
    case "line":
      o.pos && V(x.start, o.pos, E(), u.toScreenPosition);
      break;
    case "arc":
      x.positions.length > 1 && o.pos && Dt(
        x.positions[0],
        x.positions[1],
        o.pos,
        E(),
        u.toScreenPosition
      );
      break;
  }
}
function Ie() {
  if (!o.pos)
    return;
  const n = u.toScreenPosition(o.pos);
  V(
    { x: n.x - d.crosshairsSize, y: n.y },
    { x: n.x + d.crosshairsSize, y: n.y },
    E("bold")
  ), V(
    { x: n.x, y: n.y - d.crosshairsSize },
    { x: n.x, y: n.y + d.crosshairsSize },
    E("bold")
  );
}
function Ce() {
  if (!d.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  V({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, d.axisColor), V({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, d.axisColor);
  const t = o.pos;
  t && Lt(u.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Yt() {
  return o.pos ? l.handleAt(o.pos) : null;
}
function ft() {
  return o.pos ? l.thingAt(o.pos) : null;
}
function vt() {
  const n = ft();
  return n instanceof z ? n : null;
}
function Xt() {
  l.isEmpty() || (y("solve"), l.relax());
}
function qt() {
  d.autoSolve = !d.autoSolve, y(`auto-solve ${d.autoSolve ? "on" : "off"}`);
}
function Ut() {
  o.pos && l.delete(o.pos) && (y("delete"), se(), l.isEmpty() && X(() => u.reset()));
}
function jt() {
  o.pos && l.fixedDistance(o.pos) && y("fixed distance");
}
function Gt() {
  return o.pos && l.fixedPoint(o.pos) ? (y("fixed point"), !0) : !1;
}
function Kt() {
  o.pos && l.weight(o.pos) && y("weight");
}
function Qt() {
  o.pos && l.horizontalOrVertical(o.pos) && y("HorV");
}
function Jt() {
  o.pos && l.fullSize(o.pos) && y("full size");
}
function Te() {
  const n = o.pos;
  n && (y("re-center"), X(() => {
    u.centerAt(n);
  }));
}
function Nt(n) {
  const t = S(n);
  !t.isEmpty() && o.pos && (y("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function Zt() {
  o.pos && l.dismember(o.pos) && (y("dismember"), se());
}
function ot(n) {
  return !!o.pos && l.rotateInstanceAt(o.pos, n);
}
function ct(n) {
  return !!o.pos && l.resizeInstanceAt(o.pos, n);
}
function dt(n) {
  n ? l.toggleSelected(n) : o.pos && l.toggleSelections(o.pos);
}
function _t(n, t) {
  l.moveSelectionBy(n, t);
}
function te() {
  l.clearSelection();
}
function ee() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (Rt(l, n), y("remove attacher")) : (Pe(l, n), y("add attacher")));
}
function De() {
  l.equalDistance() && y("equal length");
}
function Et(n) {
  X(() => u.scale = n), y("scale=" + u.scale.toFixed(1));
}
function ne(n, t) {
  X(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function se() {
  for (; Le(); )
    ;
}
function Le() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of it)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of it) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (Rt(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of it)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
let R = [], at = !1;
function He() {
  const n = R;
  return R = [], n;
}
function At(n) {
  for (const t of n)
    (!t.predicted || d.usePredictedEvents) && R.push(t);
}
function gt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (at = !0), t === "ended" && (at = !1), !(t === "moved" && !at) && R.push({
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
function Be() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", ie), R = [];
}
window.onpointerdown = (n) => gt(n, "began");
window.onpointermove = (n) => gt(n, "moved");
window.onpointerup = (n) => gt(n, "ended");
const ie = (n) => n.preventDefault();
window.addEventListener("touchstart", ie, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = At, Be(), At(n);
};
class m {
  constructor(t) {
    this.label = t, this.leftX = 0, this.topY = 0, this.scale = 0.35, this.fingerId = null, this.height = d.fontScale * 8;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + d.tablet.buttonWidth && this.topY <= e && e < this.topY + this.height;
  }
  render() {
    S().drawText(this.label, this.scale, {
      x: this.leftX + d.tablet.buttonWidth / 2,
      y: this.topY + this.height / 2 + this.scale * d.fontScale * 3
    });
  }
  get isDown() {
    return this.fingerId != null;
  }
}
const ae = new m("SOLVE"), re = [
  new m("1"),
  new m("2"),
  new m("3"),
  new m("LINE"),
  new m("MOVE"),
  new m("HORV"),
  new m("SIZE"),
  new m("DISM"),
  new m("DEL"),
  ae
], oe = [
  new m("4"),
  new m("5"),
  new m("6"),
  new m("ARC"),
  new m("EQ"),
  new m("FIX"),
  new m("weight"),
  new m("ATT"),
  new m("CLEAR"),
  new m("AUTO")
], ce = [new m("reload")], pt = [...re, ...oe, ...ce];
function We() {
}
function $e() {
  Oe(), ae.isDown && Xt();
}
function Fe() {
  rt(0, re), rt(d.tablet.buttonWidth, oe), rt(innerWidth - d.tablet.buttonWidth, ce);
  for (const n of pt)
    n.render();
}
function rt(n, t) {
  let e = 0;
  for (const s of t)
    s.leftX = n, s.topY = e * s.height, e++;
}
function Oe() {
  for (const n of He())
    switch (n.type) {
      case "pencil":
        n.phase === "began" ? Re(n.position, n.pressure) : n.phase === "moved" ? Ye(n.position, n.pressure) : n.phase === "ended" && Xe(n.position);
        break;
      case "finger":
        n.phase === "began" ? qe(n.position, n.id) : n.phase === "moved" ? je(n.position, n.id) : n.phase === "ended" && Ge(n.position, n.id);
    }
}
let G = !1, w = null, U = null;
function Re(n, t) {
  o.moveToScreenPos(n);
}
function Ye(n, t) {
  const e = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n), o.snapPos(w == null ? void 0 : w.thing);
  const s = { x: o.pos.x, y: o.pos.y };
  if (e && S().selection.size > 0) {
    const i = _(s, e);
    _t(i.x, i.y);
  }
  if (w) {
    const i = s.x - w.offset.x, r = s.y - w.offset.y;
    w.thing.moveBy(i - w.thing.x, r - w.thing.y);
  }
  !G && t > 3 && (G = !0), G && t < 1 && de();
}
function de() {
  G = !1, (w == null ? void 0 : w.thing) instanceof v && S().mergeAndAddImplicitConstraints(w.thing), w = null, te();
}
function Xe(n) {
  o.clearPos(), de(), $t(), Ot();
}
const D = /* @__PURE__ */ new Map();
function qe(n, t) {
  for (const e of pt)
    if (e.contains(n)) {
      e.fingerId = t, Ue(e);
      return;
    }
  D.set(t, n);
}
function Ue(n) {
  const t = n.label.toLowerCase();
  if ("1" <= t && t <= "9") {
    o.pos ? (Nt(n.label), Pt()) : Bt(n.label);
    return;
  }
  switch (t) {
    case "clear":
      S().clear(), u.reset();
      break;
    case "line":
      Wt();
      break;
    case "arc":
      Ft();
      break;
    case "move":
      Pt();
      break;
    case "eq":
      if (!U) {
        U = vt(), y("selected line");
        break;
      }
      const e = vt();
      e && (S().constraints.add(new O(U.a, U.b, e.a, e.b)), y("equal length"));
      break;
    case "horv":
      Qt();
      break;
    case "fix":
      Gt() || jt();
      break;
    case "size":
      Jt();
      break;
    case "weight":
      Kt();
      break;
    case "dism":
      Zt();
      break;
    case "att":
      ee();
      break;
    case "del":
      Ut();
      break;
    case "auto":
      qt();
      break;
    case "reload":
      location.reload();
      break;
  }
}
function Pt() {
  const n = Yt();
  if (n) {
    w = { thing: n, offset: { x: 0, y: 0 } };
    return;
  }
  const t = ft();
  t instanceof b ? w = { thing: t, offset: _(o.pos, t) } : t && dt(t);
}
function je(n, t) {
  if (S().isEmpty() || D.size > 2)
    return;
  const e = D.get(t);
  if (!e)
    return;
  D.set(t, n);
  const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
  if (o.pos || ne(s.x - i.x, s.y - i.y), D.size !== 2)
    return;
  let r = null;
  for (const [xe, me] of D.entries())
    if (xe !== t) {
      r = me;
      break;
    }
  if (!r)
    throw new Error("bruh?!");
  const a = u.fromScreenPosition(r), c = p(a, i), I = p(a, s) / c, he = Math.atan2(i.y - a.y, i.x - a.x), ue = Math.atan2(s.y - a.y, s.x - a.x);
  !ct(I) && !o.pos && (u.scale *= I), ot(ue - he);
}
function Ge(n, t) {
  for (const e of pt)
    e.fingerId === t && (e.fingerId = null);
  D.delete(t);
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: We,
  onFrame: $e,
  render: Fe
}, Symbol.toStringTag, { value: "Module" })), A = {};
let H = !1, Y = !1, f = null;
function Qe() {
  window.addEventListener("keydown", Ze), window.addEventListener("keyup", _e), g.addEventListener("pointerdown", tn), g.addEventListener("pointermove", en), g.addEventListener("pointerup", nn);
}
function Je() {
  A[" "] && Xt();
}
function Ne() {
}
function Ze(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Nt(t) : Bt(t);
    return;
  }
  switch (n.key) {
    case "f":
      d.flicker = !d.flicker;
      return;
    case "d":
      d.debug = !d.debug, y(`debug ${d.debug ? "on" : "off"}`);
      return;
    case "S":
      qt();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Ut();
        break;
      case "l":
        jt();
        break;
      case ".":
        Gt();
        break;
      case "W":
        Kt();
        break;
      case "e":
        De();
        break;
      case "h":
        Qt();
        break;
      case "=":
        ct(1.05) || Et(Math.min(u.scale + 0.1, 10));
        break;
      case "-":
        ct(0.95) || Et(Math.max(u.scale - 0.1, 0.1));
        break;
      case "q":
        ot(5 * Math.PI / 180);
        break;
      case "w":
        ot(-5 * Math.PI / 180);
        break;
      case "s":
        Jt();
        break;
      case "A":
        ee();
        break;
      case "c":
        Te();
        break;
      case "D":
        Zt();
        break;
    }
}
function _e(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      $t(), Y = !1, H || o.clearPos();
      break;
    case "a":
      Ot(), Y = !1, H || o.clearPos();
      break;
  }
}
function tn(n) {
  if (g.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), H = !0, A.Shift) {
    dt();
    return;
  } else if (A.Meta) {
    Wt(), Y = !0;
    return;
  } else if (A.a) {
    Ft(), Y = !0;
    return;
  }
  f = null;
  const t = Yt();
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  te();
  const e = ft();
  e instanceof b ? f = { thing: e, offset: _(o.pos, e) } : e && dt(e);
}
function en(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (H && t && !S().isEmpty() && !Y && !f && S().selection.size === 0) {
    ne(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(f == null ? void 0 : f.thing), H && t && S().selection.size > 0) {
    const s = _(e, t);
    _t(s.x, s.y);
  }
  if (f) {
    const s = e.x - f.offset.x, i = e.y - f.offset.y;
    f.thing.moveBy(s - f.thing.x, i - f.thing.y);
  }
}
function nn(n) {
  g.releasePointerCapture(n.pointerId), H = !1, A.Meta || o.clearPos(), (f == null ? void 0 : f.thing) instanceof v && S().mergeAndAddImplicitConstraints(f.thing), f = null;
}
const sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Qe,
  onFrame: Je,
  render: Ne
}, Symbol.toStringTag, { value: "Module" }));
pe(document.getElementById("canvas"));
const lt = new URLSearchParams(window.location.search).get("tablet") ? Ke : sn;
lt.init();
function le() {
  lt.onFrame(), Me(), we(), lt.render(), ke(), requestAnimationFrame(le);
}
le();
