const h = {
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
  distanceConstraintLabelPct: 0.25
};
window.config = h;
function g(s, t) {
  return Math.sqrt(D(s, t));
}
function D(s, t) {
  return Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2);
}
function ot(s, t) {
  return { x: s.x - t.x, y: s.y - t.y };
}
const W = Object.freeze({ x: 0, y: 0 });
function ct({ x: s, y: t }, { x: e, y: n }) {
  return { x: s + e, y: t + n };
}
function J(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, r = e * n, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function K(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, r = Math.sin(e), a = Math.cos(e), c = n * a - i * r, k = n * r + i * a;
  return { x: c + t.x, y: k + t.y };
}
function dt(s) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, i = -1 / 0;
  for (const r of s)
    t = Math.min(t, r.x), e = Math.max(e, r.x), n = Math.min(n, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: n }
  };
}
function ht(s, t, e) {
  return Math.sqrt(Mt(s, t, e));
}
function Mt(s, t, e) {
  const n = D(t, e);
  if (n == 0)
    return D(s, t);
  const i = Math.max(
    0,
    Math.min(((s.x - t.x) * (e.x - t.x) + (s.y - t.y) * (e.y - t.y)) / n, 1)
  );
  return D(s, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function Vt(s) {
  return 1 - Math.pow(1 - s, 5);
}
let u, m;
function zt(s) {
  if (u = s, m = u.getContext("2d"), u.width = innerWidth, u.height = innerHeight, devicePixelRatio !== 1) {
    const t = u.width, e = u.height;
    u.width = t * devicePixelRatio, u.height = e * devicePixelRatio, u.style.width = t + "px", u.style.height = e + "px", m.scale(devicePixelRatio, devicePixelRatio);
  }
}
let I = "", lt = 0;
function y(s) {
  I = s, lt = Date.now();
}
function Pt() {
  if (m.clearRect(0, 0, u.width, u.height), m.lineWidth = h.lineWidth, m.lineCap = "round", I.length > 0) {
    m.font = "40px Monaco";
    const t = m.measureText(I).width, e = Date.now() - lt;
    if (e > h.statusTimeMillis)
      I = "";
    else {
      const n = 1 - Vt(e / h.statusTimeMillis);
      m.fillStyle = `rgba(255,222,33,${n})`, m.fillText(
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
function E(s, t, e = b(), n = N) {
  m.strokeStyle = e, m.beginPath();
  const i = n(s), r = n(t);
  m.moveTo(i.x, i.y), m.lineTo(r.x, r.y), m.stroke();
}
function xt(s, t, e, n = b(), i = N) {
  const r = i(t), a = i(e), c = i(s);
  m.beginPath(), m.strokeStyle = n;
  const k = Math.atan2(r.y - c.y, r.x - c.x), T = Math.atan2(a.y - c.y, a.x - c.x);
  m.arc(c.x, c.y, g(c, r), k, T), m.stroke();
}
function mt(s, t, e = b(), n = N) {
  m.fillStyle = e;
  const i = 12;
  m.font = `${i}px Major Mono Display`;
  const r = m.measureText(t).width, { x: a, y: c } = n(s);
  m.fillText(t, a - r / 2, c + i / 2);
}
function b(s = "normal") {
  let t, e;
  return s === "normal" ? (t = 0.35, e = 0.3) : s === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= h.baseAlphaMultiplier, `rgba(255,255,255,${h.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
class A {
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
class Z extends A {
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
class _ extends A {
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
class Y extends A {
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
class R extends A {
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
class H extends A {
  constructor(t, e, n) {
    super([], [t, e, n]);
  }
  map(t, e) {
    return new H(
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
class L extends A {
  constructor(t, e, n, i) {
    super([], [t, e, n, i]);
  }
  map(t, e) {
    return new L(
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
class X extends A {
  constructor(t, e, n) {
    super([e], [t, n]), this.instance = e;
  }
  map(t, e) {
    return new X(
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
      ct(
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
class q extends A {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new q(
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
class tt extends A {
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
    return this.y0 - h.weight - this.a.y;
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
    const e = t.value, n = this.computeError() - h.minWorthwhileErrorImprovement;
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
class z {
  constructor(t) {
    this.value = t;
  }
}
const F = class F {
  constructor({ x: t, y: e }) {
    this.id = F.nextId++, this.xVar = new z(t), this.yVar = new z(e);
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
    return g(t, this) <= h.closeEnough;
  }
  distanceTo(t) {
    return g(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, n = h.instanceSideAttacherColor) {
    h.debug && mt(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), E(this, this, n, e);
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
let w = F;
class V {
  constructor(t, e, n) {
    this.isGuide = n, this.a = new w(t), this.b = new w(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= h.closeEnough;
  }
  distanceTo(t) {
    return ht(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    E(
      this.a,
      this.b,
      this.isGuide ? h.guideLineColor : b(t.has(this) ? "bold" : "normal"),
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
    this.a = new w(t), this.b = new w(e), this.c = new w(n);
  }
  contains(t) {
    return this.distanceTo(t) <= h.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(g(t, this.c) - g(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    xt(
      this.c,
      this.a,
      this.b,
      b(t.has(this) ? "bold" : "normal"),
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
    this.master = t, this.transform = (c) => ct(
      J(K(c, W, this.angle), W, this.scale),
      this
    ), this.id = O.nextId++, this.attachers = [], this.xVar = new z(e), this.yVar = new z(n), this.angleAndSizeVecX = new z(i * Math.cos(r)), this.angleAndSizeVecY = new z(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new w(this.transform(t));
    this.attachers.push(n), e.constraints.add(
      new X(n, this, t)
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
    return dt(n);
  }
  distanceTo(t) {
    return g(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((i) => e(this.transform(i)), n + 1), n === 1 && this.attachers.forEach((i, r) => {
      E(
        e(this.transform(this.master.attachers[r])),
        e(i),
        h.instanceSideAttacherColor
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
class yt {
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
      (n) => n.render(this.selection, t, h.masterSideAttacherColor)
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
    const i = new V(t, e, n);
    n || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && i.contains(a) && this.constraints.add(new H(a, i.a, i.b));
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
          new L(a, i.a, i.b, i.c)
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
      e.has(n) || !n.contains(t) || (n instanceof V ? this.constraints.add(
        new H(t, n.a, n.b)
      ) : n instanceof $ && this.constraints.add(
        new L(t, n.a, n.b, n.c)
      ));
  }
  replaceHandle(t, e) {
    this.things.forEach((n) => n.replaceHandle(t, e)), this.attachers = this.attachers.map((n) => n === t ? e : n), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    return e.size === 0 ? !1 : (this.things = this.things.filter((n) => !e.has(n)), this.selection.clear(), !0);
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Z(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new tt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof V && (this.constraints.add(new Y(i.a, i.b)), n = !0);
    return this.selection.clear(), n;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const n of this.selection)
      n instanceof V && (e && (this.constraints.add(
        new R(e.a, e.b, n.a, n.b)
      ), t = !0), e = n);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof V && (this.constraints.add(
        new _(i.a, i.b)
      ), n = !0);
    return this.selection.clear(), n;
  }
  fullSize(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.constraints.add(new q(i)), e = !0);
    return e;
  }
  dismember(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.inline(i), e = !0);
    return e;
  }
  inline(t) {
    const { things: e, constraints: n } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof V) {
        const c = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, c.a), i.set(a.b, c.b);
      } else if (a instanceof $) {
        const c = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c)
        );
        i.set(a.a, c.a), i.set(a.b, c.b), i.set(a.c, c.c);
      } else if (a instanceof p) {
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
    const i = new st(), r = new w(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((c) => a.add(c));
    for (const c of this.things)
      this.selection.has(c) || !c.contains(t) || (c instanceof V ? i.add(
        new H(r, c.a, c.b)
      ) : c instanceof $ && i.add(
        new L(r, c.a, c.b, c.c)
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
          const c = g(t, a);
          c < n && (i = a, n = c);
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
    return dt(t);
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
      if (n instanceof X && n.masterPoint === e) {
        const { instance: i, instancePoint: r } = n;
        i.attachers = i.attachers.filter(
          (a) => a !== r
        ), this.constraints.remove(n);
      }
    });
  }
}
const kt = {
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
}, It = 1, Ht = {
  data: kt,
  version: It
};
function ut(s, t, e = h.fontScale) {
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
const ft = new Map(
  Ht.data.values
), U = /* @__PURE__ */ new Map();
for (const [s, t] of ft) {
  const e = new yt();
  ut(e, t, h.fontScale);
  const n = e.addLine(
    { x: -h.kerning * h.fontScale, y: 0 },
    { x: (4 + h.kerning) * h.fontScale, y: 0 },
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
let C = [], Q = !1;
function Lt() {
  const s = C;
  return C = [], s;
}
function at(s) {
  for (const t of s)
    (!t.predicted || h.usePredictedEvents) && C.push(t);
}
function et(s, t) {
  const e = s.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (Q = !0), t === "ended" && (Q = !1), !(t === "moved" && !Q) && C.push({
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
function Ct() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", gt), C = [];
}
window.onpointerdown = (s) => et(s, "began");
window.onpointermove = (s) => et(s, "moved");
window.onpointerup = (s) => et(s, "ended");
const gt = (s) => s.preventDefault();
window.addEventListener("touchstart", gt, { passive: !1 });
window.wrapperEvents = (s) => {
  window.wrapperEvents = at, Ct(), at(s);
};
zt(document.getElementById("canvas"));
let B = !0, j = !1;
const d = {
  x: 1 / 0,
  y: 1 / 0,
  down: !1
}, S = {};
let l = null, f = null;
const x = {
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
x.reset();
function v({ x: s, y: t }) {
  return {
    x: (s - x.center.x) * x.scale + innerWidth / 2,
    y: -(t - x.center.y) * x.scale + innerHeight / 2
  };
}
function pt({ x: s, y: t }) {
  return {
    x: (s - innerWidth / 2) / x.scale + x.center.x,
    y: x.center.y - (t - innerHeight / 2) / x.scale
  };
}
const M = [];
for (let s = 0; s < 10; s++)
  M.push(new yt());
let o;
function nt(s) {
  P(() => {
    o == null || o.leave(), x.reset(), o = s, window.drawing = s;
  });
}
nt(M[1]);
function wt() {
  if (Tt(), h.autoSolve) {
    const s = performance.now();
    for (; performance.now() - s < 20 && o.relax(); )
      ;
  } else
    S[" "] && !o.isEmpty() && (y("solve"), o.relax());
  Bt(), requestAnimationFrame(wt);
}
wt();
function Tt() {
  for (const s of Lt())
    s.type === "pencil" && (bt(s.position), !j && s.pressure >= 3 ? (j = !0, $t()) : s.pressure < 3 && (j = !1), s.pressure >= 0.01 ? B = !0 : B && s.pressure < 0.01 && (B = !1, Dt()));
}
function $t() {
  Et();
}
function Dt() {
  vt();
}
function Bt() {
  Pt(), !l && o.isEmpty() ? Rt() : (o.render(v), Wt()), Ft(), B && Ot(), Yt();
}
function Wt() {
  o.constraints.forEach((s) => {
    if (s instanceof Y) {
      let t = (s.computeError() * 100).toFixed(0);
      t === "-0" && (t = "0"), Jt(
        t,
        h.distanceConstraintTextScale,
        v({
          x: s.a.x + h.distanceConstraintLabelPct * (s.b.x - s.a.x),
          y: s.a.y + h.distanceConstraintLabelPct * (s.b.y - s.a.y)
        })
      );
    }
  });
}
function Rt() {
  const s = innerWidth / 100, t = (e, n) => E(e, n, b(), v);
  t({ x: -7 * s, y: -4 * s }, { x: -7 * s, y: 4 * s }), t({ x: -3 * s, y: -4 * s }, { x: -3 * s, y: 4 * s }), t({ x: -3 * s, y: 4 * s }, { x: 2 * s, y: -4 * s }), t({ x: 2 * s, y: -4 * s }, { x: 2 * s, y: 4 * s }), t({ x: 6 * s, y: -4 * s }, { x: 6 * s, y: 4 * s }), t({ x: 6 * s, y: 1 * s }, { x: 10 * s, y: 4 * s }), t({ x: 8 * s, y: 2.4 * s }, { x: 10 * s, y: -4 * s });
}
function Ft() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      E(
        l.start,
        d,
        b(),
        v
      );
      break;
    case "arc":
      l.positions.length > 1 && xt(
        l.positions[0],
        l.positions[1],
        d,
        b(),
        v
      );
      break;
  }
}
function Ot() {
  const s = v(d);
  E(
    { x: s.x - h.crosshairsSize, y: s.y },
    { x: s.x + h.crosshairsSize, y: s.y },
    b("bold")
  ), E(
    { x: s.x, y: s.y - h.crosshairsSize },
    { x: s.x, y: s.y + h.crosshairsSize },
    b("bold")
  );
}
function Yt() {
  if (h.debug) {
    const s = v({ x: 0, y: 0 });
    E(
      { x: 0, y: s.y },
      { x: innerWidth, y: s.y },
      h.axisColor
    ), E(
      { x: s.x, y: 0 },
      { x: s.x, y: innerHeight },
      h.axisColor
    ), mt(
      v(d),
      `(${d.x.toFixed(0)}, ${d.y.toFixed(0)})`
    );
  }
}
window.addEventListener("keydown", (s) => {
  if (S[s.key] = !0, "Digit0" <= s.code && s.code <= "Digit9") {
    const t = parseInt(s.code.slice(5)), e = M[t];
    e === o || (S.Shift ? e.isEmpty() || (y("instantiate #" + t), o.addInstance(e, d, 0.5 * e.size / x.scale, 0)) : (y("drawing #" + t), nt(e)));
    return;
  }
  switch (s.key) {
    case "f":
      h.flicker = !h.flicker;
      return;
    case "d":
      h.debug = !h.debug, y(`debug ${h.debug ? "on" : "off"}`);
      return;
    case "S":
      h.autoSolve = !h.autoSolve, y(`auto-solve ${h.autoSolve ? "on" : "off"}`);
      return;
  }
  if (!o.isEmpty())
    switch (s.key) {
      case "Backspace":
        o.delete(d) && (rt(), y("delete"), o.isEmpty() && P(() => x.reset()));
        break;
      case "l":
        o.fixedDistance(d) && y("fixed distance");
        break;
      case ".":
        o.fixedPoint(d) && y("fixed point");
        break;
      case "W":
        o.weight(d) && y("weight");
        break;
      case "e":
        o.equalDistance() && y("equal length");
        break;
      case "h":
        o.horizontalOrVertical(d) && y("HorV");
        break;
      case "=":
        o.resizeInstanceAt(d, 1.05) || P(() => {
          x.scale = Math.min(x.scale + 0.1, 10), y("scale=" + x.scale.toFixed(1));
        });
        break;
      case "-":
        o.resizeInstanceAt(d, 0.95) || P(() => {
          x.scale = Math.max(x.scale - 0.1, 0.1), y("scale=" + x.scale.toFixed(1));
        });
        break;
      case "q":
        o.rotateInstanceAt(d, 5 * Math.PI / 180);
        break;
      case "w":
        o.rotateInstanceAt(d, -5 * Math.PI / 180);
        break;
      case "s":
        o.fullSize(d) && y("full size");
        break;
      case "A":
        qt(d);
        break;
      case "c":
        y("re-center"), P(() => {
          x.centerAt(d);
        });
        break;
      case "D":
        o.dismember(d) && (rt(), y("dismember"));
        break;
    }
});
window.addEventListener("keyup", (s) => {
  switch (delete S[s.key], s.key) {
    case "Meta":
      vt();
      break;
    case "a":
      (l == null ? void 0 : l.type) === "arc" && (l = null);
      break;
  }
});
u.addEventListener("pointerdown", (s) => {
  if (u.setPointerCapture(s.pointerId), s.preventDefault(), s.stopPropagation(), d.down = !0, S.Shift) {
    o.toggleSelections(d);
    return;
  } else if (S.Meta) {
    Et();
    return;
  } else if (S.a) {
    Xt();
    return;
  }
  f = null;
  const t = o.handleAt(d);
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  o.clearSelection();
  const e = o.thingAt(d);
  e instanceof p ? f = { thing: e, offset: ot(d, e) } : e && o.toggleSelected(e);
});
u.addEventListener("pointermove", (s) => {
  s.metaKey || delete S.Meta, bt({ x: s.layerX, y: s.layerY });
});
function bt(s) {
  const t = { x: d.x, y: d.y };
  if ({ x: d.x, y: d.y } = pt(s), d.down && !o.isEmpty() && !l && !f && o.selection.size === 0) {
    const e = d.x - t.x, n = d.y - t.y;
    P(() => {
      x.center.x -= e, x.center.y -= n;
    });
    return;
  }
  if (o.snap(d, f ? f.thing : null), d.down && o.selection.size > 0) {
    const e = ot(d, t);
    o.moveSelection(e.x, e.y);
  }
  if (f) {
    const e = d.x - f.offset.x, n = d.y - f.offset.y;
    f.thing.moveBy(e - f.thing.x, n - f.thing.y);
  }
}
u.addEventListener("pointerup", (s) => {
  u.releasePointerCapture(s.pointerId), d.down = !1, (f == null ? void 0 : f.thing) instanceof w && o.mergeAndAddImplicitConstraints(f.thing), f = null;
});
function Et() {
  const s = { x: d.x, y: d.y };
  (l == null ? void 0 : l.type) === "line" && o.addLine(l.start, s), l = {
    type: "line",
    start: s
  };
}
function vt() {
  l = null;
}
function Xt() {
  if ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [] }), l.positions.push({ x: d.x, y: d.y }), l.positions.length === 3) {
    const [s, t, e] = l.positions;
    o.addArc(t, e, s), l = null;
  }
}
function P(s) {
  const t = v(d);
  s(), { x: d.x, y: d.y } = pt(t);
}
function qt(s) {
  const t = o.handleAt(s);
  t && (o.attachers.includes(t) ? (At(o, t), y("remove attacher")) : (Ut(o, t), y("add attacher")));
}
function At(s, t) {
  const e = s.attachers.indexOf(t);
  o.attachers.splice(e, 1);
  for (const n of M)
    n.onAttacherRemoved(s, t);
}
function Ut(s, t) {
  s.attachers.push(t);
  for (const e of M)
    e.onAttacherAdded(s, t);
}
function rt() {
  for (; Gt(); )
    ;
}
function Gt() {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of [...M, ...U.values()])
    for (const n of e.things)
      s.add(n), n.forEachHandle((i) => t.add(i));
  for (const e of M) {
    let n = !1;
    for (const i of e.attachers)
      t.has(i) || (At(e, i), n = !0);
    if (n)
      return !0;
  }
  for (const e of M)
    e.constraints.forEach((n) => {
      n.isStillValid(s, t) || e.constraints.remove(n);
    });
  return !1;
}
function Qt(s) {
  const t = ft.get(s);
  t && ut(o, t);
}
function jt(s, t = 1) {
  let e = null;
  St(s, t, (n, i, r) => {
    const a = o.addInstance(
      n,
      { x: i, y: x.center.y },
      n.size * r,
      0
    );
    o.constraints.add(new q(a, r)), e && o.replaceHandle(a.attachers[0], e.attachers[1]), e = a;
  });
}
function Jt(s, t, e) {
  St(
    s,
    t,
    (n, i, r) => n.render(
      ({ x: a, y: c }) => ({
        x: a * r + i - x.center.x + e.x,
        y: -c * r + e.y
      }),
      1
    )
  );
}
function St(s, t, e) {
  const n = (a) => t * (a === a.toLowerCase() ? 0.75 : 1), i = (a) => n(a) * h.fontScale * (4 + h.kerning * 2);
  let r = x.center.x - 0.5 * [...s].map(i).reduce((a, c) => a + c, 0);
  for (let a = 0; a < s.length; a++) {
    const c = s[a], k = n(c), T = U.get(c.toUpperCase());
    T && e(T, r, k), r += i(c);
  }
}
window.addLetter = Qt;
window.letterDrawings = U;
window.switchToDrawing = nt;
window.write = jt;
