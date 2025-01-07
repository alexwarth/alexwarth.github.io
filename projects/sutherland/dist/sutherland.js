const o = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 2,
  lineWidth: 3,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgb(1,101,252)",
  instanceSideAttacherColor: "rgb(255,222,33)",
  axisColor: "rgba(255,222,33,0.125)",
  handleRadius: 5,
  closeEnough: 5,
  crosshairsSize: 15,
  fontScale: 10,
  kerning: 0.5,
  guideLineColor: "rgba(255,255,255,.125)",
  statusTimeMillis: 4e3,
  usePredictedEvents: !1,
  weight: 25,
  distanceConstraintTextScale: 0.3,
  distanceConstraintLabelPct: 0.25,
  showImplicitConstraints: !1,
  tablet: {
    buttonWidth: 100,
    showButtonLines: !1
  }
};
window.config = o;
function g(s, t) {
  return Math.sqrt(D(s, t));
}
function D(s, t) {
  return Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2);
}
function ct(s, t) {
  return { x: s.x - t.x, y: s.y - t.y };
}
const W = Object.freeze({ x: 0, y: 0 });
function dt({ x: s, y: t }, { x: e, y: n }) {
  return { x: s + e, y: t + n };
}
function J(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, r = e * n, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function K(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, r = Math.sin(e), a = Math.cos(e), d = n * a - i * r, k = n * r + i * a;
  return { x: d + t.x, y: k + t.y };
}
function lt(s) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, i = -1 / 0;
  for (const r of s)
    t = Math.min(t, r.x), e = Math.max(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: n }
  };
}
function ht(s, t, e) {
  return Math.sqrt(kt(s, t, e));
}
function kt(s, t, e) {
  const n = D(t, e);
  if (n == 0)
    return D(s, t);
  const i = Math.max(
    0,
    Math.min(((s.x - t.x) * (e.x - t.x) + (s.y - t.y) * (e.y - t.y)) / n, 1)
  );
  return D(s, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function It(s) {
  return 1 - Math.pow(1 - s, 5);
}
let f, x, yt = !1;
function Lt(s) {
  f = s, x = f.getContext("2d"), xt(), yt = !0;
}
function xt() {
  if (f.width = innerWidth, f.height = innerHeight, devicePixelRatio !== 1) {
    const s = f.width, t = f.height;
    f.width = s * devicePixelRatio, f.height = t * devicePixelRatio, f.style.width = s + "px", f.style.height = t + "px", x.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", xt);
let I = "", mt = 0;
function m(s) {
  yt && (I = s, mt = Date.now());
}
function Ct() {
  if (x.clearRect(0, 0, f.width, f.height), x.lineWidth = o.lineWidth, x.lineCap = "round", I.length > 0) {
    x.font = "40px Monaco";
    const t = x.measureText(I).width, e = Date.now() - mt;
    if (e > o.statusTimeMillis)
      I = "";
    else {
      const n = 1 - It(e / o.statusTimeMillis);
      x.fillStyle = `rgba(255,222,33,${n})`, x.fillText(
        I,
        (innerWidth - t) / 2,
        innerHeight - 40
      );
    }
  }
}
function N(s) {
  return s;
}
function w(s, t, e = E(), n = N) {
  x.strokeStyle = e, x.beginPath();
  const i = n(s), r = n(t);
  x.moveTo(i.x, i.y), x.lineTo(r.x, r.y), x.stroke();
}
function ut(s, t, e, n = E(), i = N) {
  const r = i(t), a = i(e), d = i(s);
  x.beginPath(), x.strokeStyle = n;
  const k = Math.atan2(r.y - d.y, r.x - d.x), T = Math.atan2(a.y - d.y, a.x - d.x);
  x.arc(d.x, d.y, g(d, r), k, T), x.stroke();
}
function ft(s, t, e = E(), n = N) {
  x.fillStyle = e;
  const i = 12;
  x.font = `${i}px Major Mono Display`;
  const r = x.measureText(t).width, { x: a, y: d } = n(s);
  x.fillText(t, a - r / 2, d + i / 2);
}
function E(s = "normal") {
  let t, e;
  return s === "normal" ? (t = 0.35, e = 0.3) : s === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o.baseAlphaMultiplier, `rgba(255,255,255,${o.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
class S {
  constructor(t, e) {
    this.things = t, this.handles = e;
  }
  // override in subclasses like weight constraint
  preRelax() {
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    return this.things.every((n) => t.has(n)) && this.handles.every((n) => e.has(n));
  }
  replaceHandle(t, e) {
    for (let n = 0; n < this.handles.length; n++)
      this.handles[n], this.handles.forEach((i, r) => {
        i === t && (this.handles[r] = e);
      });
  }
}
class Z extends S {
  constructor(t, { x: e, y: n }) {
    super([], [t]), this.pos = { x: e, y: n };
  }
  map(t, e) {
    return new Z(e.get(this.p), this.pos);
  }
  get p() {
    return this.handles[0];
  }
  get signature() {
    return `FP(${this.p.id})`;
  }
  computeError() {
    return g(this.p, this.pos) * 100;
  }
}
class _ extends S {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new _(
      e.get(this.a),
      e.get(this.b)
    );
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
    return Math.min(
      Math.abs(this.a.x - this.b.x),
      Math.abs(this.a.y - this.b.y)
    );
  }
}
class Y extends S {
  constructor(t, e) {
    super([], [t, e]), this.distance = g(t, e);
  }
  map(t, e) {
    return new Y(
      e.get(this.a),
      e.get(this.b)
    );
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
    return this.distance - g(this.a, this.b);
  }
}
class R extends S {
  constructor(t, e, n, i) {
    super([], [t, e, n, i]);
  }
  map(t, e) {
    return new R(
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
    return Math.abs(g(this.a1, this.b1) - g(this.a2, this.b2));
  }
}
class L extends S {
  constructor(t, e, n) {
    super([], [t, e, n]);
  }
  map(t, e) {
    return new L(
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
    return ht(this.p, this.a, this.b);
  }
}
class C extends S {
  constructor(t, e, n, i) {
    super([], [t, e, n, i]);
  }
  map(t, e) {
    return new C(
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
    return g(this.p, this.c) - g(this.a, this.c);
  }
}
class q extends S {
  constructor(t, e, n) {
    super([e], [t, n]), this.instance = e;
  }
  map(t, e) {
    return new q(
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
    return g(
      this.instancePoint,
      dt(
        J(
          K(this.masterPoint, W, this.instance.angle),
          W,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class X extends S {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new X(
      t.get(this.instance),
      this.scale
    );
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class tt extends S {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new tt(e.get(this.a));
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
    return this.y0 - o.weight - this.a.y;
  }
}
class st {
  constructor() {
    this.constraints = [];
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((n) => n.signature === e) || this.constraints.push(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter(
      (e) => e !== t
    );
  }
  clear() {
    this.constraints = [];
  }
  replaceHandle(t, e) {
    const n = this.constraints;
    this.constraints = [], n.forEach((i) => {
      i.replaceHandle(t, e), this.add(i);
    });
  }
  forEach(t) {
    this.constraints.forEach(t);
  }
  relax(t) {
    this.forEach((n) => n.preRelax());
    let e = !1;
    for (const n of t)
      e = this.relaxWithVar(n) || e;
    return e;
  }
  relaxWithVar(t) {
    const e = t.value, n = this.computeError() - o.minWorthwhileErrorImprovement;
    t.value = e + 1;
    const i = this.computeError();
    t.value = e - 1;
    const r = this.computeError();
    return i < Math.min(n, r) ? (t.value = e + 1, !0) : r < Math.min(n, i) ? (t.value = e - 1, !0) : (t.value = e, !1);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class V {
  constructor(t) {
    this.value = t;
  }
}
const F = class F {
  constructor({ x: t, y: e }) {
    this.id = F.nextId++, this.xVar = new V(t), this.yVar = new V(e);
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
    return g(t, this) <= o.closeEnough;
  }
  distanceTo(t) {
    return g(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, n = o.instanceSideAttacherColor) {
    o.debug && ft(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), w(this, this, n, e);
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
F.nextId = 0;
let b = F;
class z {
  constructor(t, e, n) {
    this.isGuide = n, this.a = new b(t), this.b = new b(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= o.closeEnough;
  }
  distanceTo(t) {
    return ht(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    w(
      this.a,
      this.b,
      this.isGuide ? o.guideLineColor : E(t.has(this) ? "bold" : "normal"),
      e
    );
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
class $ {
  constructor(t, e, n) {
    this.a = new b(t), this.b = new b(e), this.c = new b(n);
  }
  contains(t) {
    return this.distanceTo(t) <= o.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(g(t, this.c) - g(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    ut(
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
const O = class O {
  constructor(t, e, n, i, r, a) {
    this.master = t, this.transform = (d) => dt(
      J(K(d, W, this.angle), W, this.scale),
      this
    ), this.id = O.nextId++, this.attachers = [], this.xVar = new V(e), this.yVar = new V(n), this.angleAndSizeVecX = new V(i * Math.cos(r)), this.angleAndSizeVecY = new V(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new b(this.transform(t));
    this.attachers.push(n), e.constraints.add(
      new q(n, this, t)
    );
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
    const { topLeft: e, bottomRight: n } = this.boundingBox();
    return e.x <= t.x && t.x <= n.x && n.y <= t.y && t.y <= e.y;
  }
  boundingBox() {
    const { topLeft: t, bottomRight: e } = this.master.boundingBox(), n = [
      t,
      e,
      { x: t.x, y: e.y },
      { x: e.x, y: t.y }
    ].map(this.transform);
    return lt(n);
  }
  distanceTo(t) {
    return g(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((i) => e(this.transform(i)), n + 1), n === 1 && this.attachers.forEach((i, r) => {
      w(
        e(this.transform(this.master.attachers[r])),
        e(i),
        o.instanceSideAttacherColor
      );
    });
  }
  forEachHandle(t) {
    this.attachers.forEach(t);
  }
  replaceHandle(t, e) {
    this.attachers = this.attachers.map((n) => n === t ? e : n);
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar), t(this.angleAndSizeVecX), t(this.angleAndSizeVecY), this.forEachHandle((e) => e.forEachVar(t));
  }
};
O.nextId = 0;
let p = O;
class gt {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new st(), this.selection = /* @__PURE__ */ new Set();
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
  render(t, e = 0) {
    this.things.forEach((n) => {
      n instanceof p ? n.render(this.selection, t, e + 1) : n.render(this.selection, t);
    }), e === 0 && this.attachers.forEach(
      (n) => n.render(this.selection, t, o.masterSideAttacherColor)
    );
  }
  addInstance(t, { x: e, y: n }, i, r) {
    if (t === this)
      return null;
    const a = new p(t, e, n, i, r, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof p))
      return !1;
    n.scale *= e;
    for (const i of n.attachers) {
      const { x: r, y: a } = J(i, n, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof p))
      return !1;
    n.angle += e;
    for (const i of n.attachers) {
      const { x: r, y: a } = K(i, n, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, n = !1) {
    const i = new z(t, e, n);
    n || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && i.contains(a) && this.constraints.add(new L(a, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, n) {
    const i = new $(t, e, n);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(
      new R(i.a, i.c, i.b, i.c)
    );
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && a !== i.c && i.contains(a) && this.constraints.add(
          new C(a, i.a, i.b, i.c)
        );
      });
    return this.things.push(i), i;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.things)
      n.forEachHandle((i) => {
        i !== t && i.contains(t) && (this.replaceHandle(i, t), e.add(n));
      });
    for (const n of this.things)
      e.has(n) || !n.contains(t) || (n instanceof z ? (this.constraints.add(
        new L(t, n.a, n.b)
      ), o.showImplicitConstraints && m("(point on line)")) : n instanceof $ && (this.constraints.add(
        new C(t, n.a, n.b, n.c)
      ), o.showImplicitConstraints && m("(point on arc)")));
  }
  replaceHandle(t, e) {
    this.things.forEach((n) => n.replaceHandle(t, e)), this.attachers = this.attachers.map((n) => n === t ? e : n), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    return e.size === 0 ? !1 : (this.things = this.things.filter((n) => !e.has(n)), this.selection.clear(), m("delete"), !0);
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Z(e, t)), m("fixed point"), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new tt(e)), m("weight"), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(new Y(i.a, i.b)), m("fixed distance"), n = !0);
    return this.selection.clear(), n;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const n of this.selection)
      n instanceof z && (e && (this.constraints.add(
        new R(e.a, e.b, n.a, n.b)
      ), m("equal length"), t = !0), e = n);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(
        new _(i.a, i.b)
      ), m("HorV"), n = !0);
    return this.selection.clear(), n;
  }
  fullSize(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.constraints.add(new X(i)), m("full size"), e = !0);
    return e;
  }
  dismember(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.inline(i), m("dismember"), e = !0);
    return e;
  }
  inline(t) {
    const { things: e, constraints: n } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof z) {
        const d = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, d.a), i.set(a.b, d.b);
      } else if (a instanceof $) {
        const d = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c)
        );
        i.set(a.a, d.a), i.set(a.b, d.b), i.set(a.c, d.c);
      } else if (a instanceof p) {
        const d = this.addInstance(
          a.master,
          t.transform(a),
          // move the center to the right place
          t.scale * a.size,
          t.angle + a.angle
        );
        r.set(a, d);
      } else
        throw new Error("unsupported thing type: " + a.constructor.name);
    n.forEach((a) => {
      this.constraints.add(a.map(r, i));
    }), this.things = this.things.filter((a) => a !== t);
  }
  snap(t, e) {
    const n = this.handleAt(t, e);
    if (n) {
      t.x = n.x, t.y = n.y;
      return;
    }
    const i = new st(), r = new b(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((d) => a.add(d));
    for (const d of this.things)
      this.selection.has(d) || !d.contains(t) || (d instanceof z ? i.add(
        new L(r, d.a, d.b)
      ) : d instanceof $ && i.add(
        new C(r, d.a, d.b, d.c)
      ));
    for (; i.relax(a); )
      ;
    t.x = r.x, t.y = r.y;
  }
  handleAt(t, e = null) {
    let n = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const d = g(t, a);
          d < n && (i = a, n = d);
        }
      });
    return i;
  }
  thingAt(t) {
    let e = 1 / 0, n = null;
    for (const i of this.things)
      if (i.contains(t)) {
        const r = i.distanceTo(t);
        r < e && (n = i, e = r);
      }
    return n;
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
  moveSelection(t, e) {
    for (const n of this.getHandles(this.selection))
      n.x += t, n.y += e;
  }
  leave() {
    this.center(), this.selection.clear();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), n = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const r of this.getPositions())
      r.x += n, r.y += i;
  }
  boundingBox() {
    const t = [...this.getPositions()];
    for (const e of this.things)
      if (e instanceof p) {
        const n = e.boundingBox();
        t.push(n.topLeft), t.push(n.bottomRight);
      }
    return lt(t);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: n } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(n, 2));
    return Math.sqrt(t) * 2;
  }
  thingsForOperation(t) {
    const e = this.thingAt(t);
    return this.selection.size > 0 ? this.selection : e ? /* @__PURE__ */ new Set([e]) : /* @__PURE__ */ new Set();
  }
  getHandles(t) {
    const e = /* @__PURE__ */ new Set();
    for (const n of t)
      n.forEachHandle((i) => e.add(i));
    return e;
  }
  getHandle(t) {
    let e, n = 0;
    for (const i of this.things)
      i.forEachHandle((r) => {
        n++ === t && (e = r);
      });
    return e;
  }
  getPositions() {
    const t = this.getHandles(this.things);
    for (const e of this.things)
      e instanceof p && t.add(e);
    return t;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((n) => t.add(n));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const n of this.things)
      n instanceof p && n.master === t && n.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((n) => {
      if (n instanceof q && n.masterPoint === e) {
        const { instance: i, instancePoint: r } = n;
        i.attachers = i.attachers.filter(
          (a) => a !== r
        ), this.constraints.remove(n);
      }
    });
  }
}
const Ht = {
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
}, Tt = 1, $t = {
  data: Ht,
  version: Tt
};
function pt(s, t, e = o.fontScale) {
  for (const n of t)
    switch (n.command) {
      case "line": {
        const i = G(n.start, e), r = G(n.end, e);
        s.addLine(i, r);
        break;
      }
      case "arc": {
        const i = G(n.center, e), r = n.radius * e;
        s.addArc(
          it(i, n.end, r),
          it(i, n.start, r),
          i
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", n);
        break;
    }
}
const wt = new Map(
  $t.data.values
), U = /* @__PURE__ */ new Map();
for (const [s, t] of wt) {
  const e = new gt();
  pt(e, t, o.fontScale);
  const n = e.addLine(
    { x: -o.kerning * o.fontScale, y: 0 },
    { x: (4 + o.kerning) * o.fontScale, y: 0 },
    !0
  );
  e.attachers.push(n.a, n.b), U.set(s, e);
}
function G({ x: s, y: t }, e) {
  return { x: s * e, y: t * e };
}
function it({ x: s, y: t }, e, n) {
  return {
    x: s + n * Math.cos(e),
    y: t + n * Math.sin(e)
  };
}
let H = [], Q = !1;
function Dt() {
  const s = H;
  return H = [], s;
}
function at(s) {
  for (const t of s)
    (!t.predicted || o.usePredictedEvents) && H.push(t);
}
function et(s, t) {
  const e = s.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (Q = !0), t === "ended" && (Q = !1), !(t === "moved" && !Q) && H.push({
    id: s.pointerId,
    type: e,
    phase: t,
    predicted: !1,
    position: { x: s.clientX, y: s.clientY },
    pressure: s.pointerType == "mouse" ? 1 : s.pressure * 5,
    altitude: 0,
    azimuth: 0,
    rollAngle: 0,
    radius: 0,
    timestamp: performance.now()
  });
}
function Bt() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", bt), H = [];
}
window.onpointerdown = (s) => et(s, "began");
window.onpointermove = (s) => et(s, "moved");
window.onpointerup = (s) => et(s, "ended");
const bt = (s) => s.preventDefault();
window.addEventListener("touchstart", bt, { passive: !1 });
window.wrapperEvents = (s) => {
  window.wrapperEvents = at, Bt(), at(s);
};
const Wt = new URLSearchParams(window.location.search).get("tablet");
Lt(document.getElementById("canvas"));
const rt = [
  { label: "1", scale: 0.5, y1: 0, y2: 0 },
  { label: "2", scale: 0.5, y1: 0, y2: 0 },
  { label: "3", scale: 0.5, y1: 0, y2: 0 },
  { label: "4", scale: 0.5, y1: 0, y2: 0 },
  { label: "arc", scale: 0.5, y1: 0, y2: 0 },
  { label: "eq", scale: 0.5, y1: 0, y2: 0 },
  { label: "del", scale: 0.5, y1: 0, y2: 0 },
  { label: "solve", scale: 0.4, y1: 0, y2: 0 }
];
let B = !0, j = !1;
const l = {
  x: 1 / 0,
  y: 1 / 0,
  down: !1
}, A = {};
let h = null, u = null;
const y = {
  center: { x: 0, y: 0 },
  scale: 1,
  reset() {
    this.scale = 1, this.centerAt({ x: 0, y: 0 });
  },
  centerAt({ x: s, y: t }) {
    this.center.x = s, this.center.y = t;
  },
  setScale(s) {
    this.scale = s;
  }
};
y.reset();
function v({ x: s, y: t }) {
  return {
    x: (s - y.center.x) * y.scale + innerWidth / 2,
    y: -(t - y.center.y) * y.scale + innerHeight / 2
  };
}
function Et({ x: s, y: t }) {
  return {
    x: (s - innerWidth / 2) / y.scale + y.center.x,
    y: y.center.y - (t - innerHeight / 2) / y.scale
  };
}
const M = [];
for (let s = 0; s < 10; s++)
  M.push(new gt());
let c;
function nt(s) {
  P(() => {
    c == null || c.leave(), y.reset(), c = s, window.drawing = s;
  });
}
nt(M[1]);
function vt() {
  if (Rt(), o.autoSolve) {
    const s = performance.now();
    for (; performance.now() - s < 20 && c.relax(); )
      ;
  } else
    A[" "] && !c.isEmpty() && (m("solve"), c.relax());
  Yt(), requestAnimationFrame(vt);
}
vt();
function Rt() {
  for (const s of Dt())
    s.type === "pencil" ? (St(s.position), !j && s.pressure >= 3 ? (j = !0, Ft()) : s.pressure < 3 && (j = !1), s.pressure >= 0.01 ? B = !0 : B && s.pressure < 0.01 && (B = !1, Ot())) : s.type === "finger" && s.phase === "began" && m(`finger down at (${s.position.x}, ${s.position.y})`);
}
function Ft() {
  At();
}
function Ot() {
  Mt();
}
function Yt() {
  Ct(), !h && c.isEmpty() ? Ut() : (c.render(v), Xt()), Gt(), B && Qt(), qt(), jt();
}
function qt() {
  if (!Wt)
    return;
  o.tablet.showButtonLines && w(
    { x: o.tablet.buttonWidth, y: 0 },
    { x: o.tablet.buttonWidth, y: innerHeight }
  );
  const s = rt.length;
  rt.forEach((t, e) => {
    t.y1 = e * innerHeight / s, t.y2 = t.y1 + innerHeight / s, o.tablet.showButtonLines && w(
      { x: 0, y: t.y2 },
      { x: o.tablet.buttonWidth, y: t.y2 }
    ), Vt(t.label, t.scale, {
      x: o.tablet.buttonWidth / 2,
      y: (t.y1 + t.y2) / 2 + t.scale * o.fontScale * 3
    });
  });
}
function Xt() {
  c.constraints.forEach((s) => {
    if (s instanceof Y) {
      let t = (s.computeError() * 100).toFixed(0);
      t === "-0" && (t = "0"), Vt(
        t,
        o.distanceConstraintTextScale,
        v({
          x: s.a.x + o.distanceConstraintLabelPct * (s.b.x - s.a.x),
          y: s.a.y + o.distanceConstraintLabelPct * (s.b.y - s.a.y)
        })
      );
    }
  });
}
function Ut() {
  const s = innerWidth / 100, t = (e, n) => w(e, n, E(), v);
  t({ x: -7 * s, y: -4 * s }, { x: -7 * s, y: 4 * s }), t({ x: -3 * s, y: -4 * s }, { x: -3 * s, y: 4 * s }), t({ x: -3 * s, y: 4 * s }, { x: 2 * s, y: -4 * s }), t({ x: 2 * s, y: -4 * s }, { x: 2 * s, y: 4 * s }), t({ x: 6 * s, y: -4 * s }, { x: 6 * s, y: 4 * s }), t({ x: 6 * s, y: 1 * s }, { x: 10 * s, y: 4 * s }), t({ x: 8 * s, y: 2.4 * s }, { x: 10 * s, y: -4 * s });
}
function Gt() {
  switch (h == null ? void 0 : h.type) {
    case "line":
      w(
        h.start,
        l,
        E(),
        v
      );
      break;
    case "arc":
      h.positions.length > 1 && ut(
        h.positions[0],
        h.positions[1],
        l,
        E(),
        v
      );
      break;
  }
}
function Qt() {
  const s = v(l);
  w(
    { x: s.x - o.crosshairsSize, y: s.y },
    { x: s.x + o.crosshairsSize, y: s.y },
    E("bold")
  ), w(
    { x: s.x, y: s.y - o.crosshairsSize },
    { x: s.x, y: s.y + o.crosshairsSize },
    E("bold")
  );
}
function jt() {
  if (o.debug) {
    const s = v({ x: 0, y: 0 });
    w(
      { x: 0, y: s.y },
      { x: innerWidth, y: s.y },
      o.axisColor
    ), w(
      { x: s.x, y: 0 },
      { x: s.x, y: innerHeight },
      o.axisColor
    ), ft(
      v(l),
      `(${l.x.toFixed(0)}, ${l.y.toFixed(0)})`
    );
  }
}
window.addEventListener("keydown", (s) => {
  if (A[s.key] = !0, "Digit0" <= s.code && s.code <= "Digit9") {
    const t = parseInt(s.code.slice(5)), e = M[t];
    e === c || (A.Shift ? e.isEmpty() || (m("instantiate #" + t), c.addInstance(e, l, 0.5 * e.size / y.scale, 0)) : (m("drawing #" + t), nt(e)));
    return;
  }
  switch (s.key) {
    case "f":
      o.flicker = !o.flicker;
      return;
    case "d":
      o.debug = !o.debug, m(`debug ${o.debug ? "on" : "off"}`);
      return;
    case "S":
      o.autoSolve = !o.autoSolve, m(`auto-solve ${o.autoSolve ? "on" : "off"}`);
      return;
  }
  if (!c.isEmpty())
    switch (s.key) {
      case "Backspace":
        c.delete(l) && (ot(), c.isEmpty() && P(() => y.reset()));
        break;
      case "l":
        c.fixedDistance(l);
        break;
      case ".":
        c.fixedPoint(l);
        break;
      case "W":
        c.weight(l);
        break;
      case "e":
        c.equalDistance();
        break;
      case "h":
        c.horizontalOrVertical(l);
        break;
      case "=":
        c.resizeInstanceAt(l, 1.05) || P(() => {
          y.scale = Math.min(y.scale + 0.1, 10), m("scale=" + y.scale.toFixed(1));
        });
        break;
      case "-":
        c.resizeInstanceAt(l, 0.95) || P(() => {
          y.scale = Math.max(y.scale - 0.1, 0.1), m("scale=" + y.scale.toFixed(1));
        });
        break;
      case "q":
        c.rotateInstanceAt(l, 5 * Math.PI / 180);
        break;
      case "w":
        c.rotateInstanceAt(l, -5 * Math.PI / 180);
        break;
      case "s":
        c.fullSize(l);
        break;
      case "A":
        Kt(l);
        break;
      case "c":
        m("re-center"), P(() => {
          y.centerAt(l);
        });
        break;
      case "D":
        c.dismember(l) && ot();
        break;
    }
});
window.addEventListener("keyup", (s) => {
  switch (delete A[s.key], s.key) {
    case "Meta":
      Mt();
      break;
    case "a":
      (h == null ? void 0 : h.type) === "arc" && (h = null);
      break;
  }
});
f.addEventListener("pointerdown", (s) => {
  if (f.setPointerCapture(s.pointerId), s.preventDefault(), s.stopPropagation(), l.down = !0, A.Shift) {
    c.toggleSelections(l);
    return;
  } else if (A.Meta) {
    At();
    return;
  } else if (A.a) {
    Jt();
    return;
  }
  u = null;
  const t = c.handleAt(l);
  if (t) {
    u = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  c.clearSelection();
  const e = c.thingAt(l);
  e instanceof p ? u = { thing: e, offset: ct(l, e) } : e && c.toggleSelected(e);
});
f.addEventListener("pointermove", (s) => {
  s.metaKey || delete A.Meta, (s.pointerType === "pen" || s.pointerType === "mouse") && St({ x: s.layerX, y: s.layerY });
});
function St(s) {
  const t = { x: l.x, y: l.y };
  if ({ x: l.x, y: l.y } = Et(s), l.down && !c.isEmpty() && !h && !u && c.selection.size === 0) {
    const e = l.x - t.x, n = l.y - t.y;
    P(() => {
      y.center.x -= e, y.center.y -= n;
    });
    return;
  }
  if (c.snap(l, u ? u.thing : null), l.down && c.selection.size > 0) {
    const e = ct(l, t);
    c.moveSelection(e.x, e.y);
  }
  if (u) {
    const e = l.x - u.offset.x, n = l.y - u.offset.y;
    u.thing.moveBy(e - u.thing.x, n - u.thing.y);
  }
}
f.addEventListener("pointerup", (s) => {
  f.releasePointerCapture(s.pointerId), l.down = !1, (u == null ? void 0 : u.thing) instanceof b && c.mergeAndAddImplicitConstraints(u.thing), u = null;
});
function At() {
  const s = { x: l.x, y: l.y };
  (h == null ? void 0 : h.type) === "line" && c.addLine(h.start, s), h = {
    type: "line",
    start: s
  };
}
function Mt() {
  h = null;
}
function Jt() {
  if ((h == null ? void 0 : h.type) !== "arc" && (h = { type: "arc", positions: [] }), h.positions.push({ x: l.x, y: l.y }), h.positions.length === 3) {
    const [s, t, e] = h.positions;
    c.addArc(t, e, s), h = null;
  }
}
function P(s) {
  const t = v(l);
  s(), { x: l.x, y: l.y } = Et(t);
}
function Kt(s) {
  const t = c.handleAt(s);
  t && (c.attachers.includes(t) ? (zt(c, t), m("remove attacher")) : (Nt(c, t), m("add attacher")));
}
function zt(s, t) {
  const e = s.attachers.indexOf(t);
  c.attachers.splice(e, 1);
  for (const n of M)
    n.onAttacherRemoved(s, t);
}
function Nt(s, t) {
  s.attachers.push(t);
  for (const e of M)
    e.onAttacherAdded(s, t);
}
function ot() {
  for (; Zt(); )
    ;
}
function Zt() {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of [...M, ...U.values()])
    for (const n of e.things)
      s.add(n), n.forEachHandle((i) => t.add(i));
  for (const e of M) {
    let n = !1;
    for (const i of e.attachers)
      t.has(i) || (zt(e, i), n = !0);
    if (n)
      return !0;
  }
  for (const e of M)
    e.constraints.forEach((n) => {
      n.isStillValid(s, t) || e.constraints.remove(n);
    });
  return !1;
}
function _t(s) {
  const t = wt.get(s);
  t && pt(c, t);
}
function te(s, t = 1) {
  let e = null;
  Pt(s, t, (n, i, r) => {
    const a = c.addInstance(
      n,
      { x: i, y: y.center.y },
      n.size * r,
      0
    );
    c.constraints.add(new X(a, r)), e && c.replaceHandle(a.attachers[0], e.attachers[1]), e = a;
  });
}
function Vt(s, t, e) {
  Pt(
    s,
    t,
    (n, i, r) => n.render(
      ({ x: a, y: d }) => ({
        x: a * r + i - y.center.x + e.x,
        y: -d * r + e.y
      }),
      1
    )
  );
}
function Pt(s, t, e) {
  const n = (a) => t * (a === a.toLowerCase() ? 0.75 : 1), i = (a) => n(a) * o.fontScale * (4 + o.kerning * 2);
  let r = y.center.x - 0.5 * [...s].map(i).reduce((a, d) => a + d, 0);
  for (let a = 0; a < s.length; a++) {
    const d = s[a], k = n(d), T = U.get(d.toUpperCase());
    T && e(T, r, k), r += i(d);
  }
}
window.addLetter = _t;
window.letterDrawings = U;
window.switchToDrawing = nt;
window.write = te;
