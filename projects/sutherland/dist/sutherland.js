const c = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 2,
  lineWidth: 3.5,
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
    buttonWidth: 100
  }
};
window.config = c;
function g(n, t) {
  return Math.sqrt(q(n, t));
}
function q(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Z(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const j = Object.freeze({ x: 0, y: 0 });
function vt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function dt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function lt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), d = s * a - i * r, k = s * r + i * a;
  return { x: d + t.x, y: k + t.y };
}
function Et(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function At(n, t, e) {
  return Math.sqrt(de(n, t, e));
}
function de(n, t, e) {
  const s = q(t, e);
  if (s == 0)
    return q(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return q(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function le(n) {
  return 1 - Math.pow(1 - n, 5);
}
let f, x, Pt = !1;
function he(n) {
  f = n, x = f.getContext("2d"), Mt(), Pt = !0;
}
function Mt() {
  if (f.width = innerWidth, f.height = innerHeight, devicePixelRatio !== 1) {
    const n = f.width, t = f.height;
    f.width = n * devicePixelRatio, f.height = t * devicePixelRatio, f.style.width = n + "px", f.style.height = t + "px", x.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Mt);
let $ = "", kt = 0;
function m(n) {
  Pt && ($ = n, kt = Date.now());
}
function ue() {
  if (x.clearRect(0, 0, f.width, f.height), x.lineWidth = c.lineWidth, x.lineCap = "round", $.length > 0) {
    x.font = "40px Monaco";
    const t = x.measureText($).width, e = Date.now() - kt;
    if (e > c.statusTimeMillis)
      $ = "";
    else {
      const s = 1 - le(e / c.statusTimeMillis);
      x.fillStyle = `rgba(255,222,33,${s})`, x.fillText($, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function ht(n) {
  return n;
}
function P(n, t, e = E(), s = ht) {
  x.strokeStyle = e, x.beginPath();
  const i = s(n), r = s(t);
  x.moveTo(i.x, i.y), x.lineTo(r.x, r.y), x.stroke();
}
function zt(n, t, e, s = E(), i = ht) {
  const r = i(t), a = i(e), d = i(n);
  x.beginPath(), x.strokeStyle = s;
  const k = Math.atan2(r.y - d.y, r.x - d.x), V = Math.atan2(a.y - d.y, a.x - d.x);
  x.arc(d.x, d.y, g(d, r), k, V), x.stroke();
}
function Vt(n, t, e = E(), s = ht) {
  x.fillStyle = e;
  const i = 12;
  x.font = `${i}px Major Mono Display`;
  const r = x.measureText(t).width, { x: a, y: d } = s(n);
  x.fillText(t, a - r / 2, d + i / 2);
}
function E(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= c.baseAlphaMultiplier, `rgba(255,255,255,${c.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let I = 1;
const C = { x: 0, y: 0 }, u = {
  reset() {
    I = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return I;
  },
  set scale(n) {
    I = n;
  },
  centerAt({ x: n, y: t }) {
    C.x = n, C.y = t;
  },
  get center() {
    return C;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - C.x) * I + innerWidth / 2,
      y: -(t - C.y) * I + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / I + C.x,
      y: C.y - (t - innerHeight / 2) / I
    };
  }
};
class M {
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
class ut extends M {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e) {
    return new ut(e.get(this.p), this.pos);
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
class xt extends M {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new xt(e.get(this.a), e.get(this.b));
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
class K extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = g(t, e);
  }
  map(t, e) {
    return new K(e.get(this.a), e.get(this.b));
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
class G extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new G(
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
class F extends M {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new F(
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
    return At(this.p, this.a, this.b);
  }
}
class W extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new W(
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
class _ extends M {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new _(
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
      vt(
        dt(
          lt(this.masterPoint, j, this.instance.angle),
          j,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class Q extends M {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new Q(t.get(this.instance), this.scale);
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class mt extends M {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new mt(e.get(this.a));
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
    return this.y0 - c.weight - this.a.y;
  }
}
class gt {
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
    this.forEach((s) => s.preRelax());
    let e = !1;
    for (const s of t)
      e = this.relaxWithVar(s) || e;
    return e;
  }
  relaxWithVar(t) {
    const e = t.value, s = this.computeError() - c.minWorthwhileErrorImprovement;
    t.value = e + 1;
    const i = this.computeError();
    t.value = e - 1;
    const r = this.computeError();
    return i < Math.min(s, r) ? (t.value = e + 1, !0) : r < Math.min(s, i) ? (t.value = e - 1, !0) : (t.value = e, !1);
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
const J = class J {
  constructor({ x: t, y: e }) {
    this.id = J.nextId++, this.xVar = new L(t), this.yVar = new L(e);
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
    return g(t, this) <= c.closeEnough;
  }
  distanceTo(t) {
    return g(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, s = c.instanceSideAttacherColor) {
    c.debug && Vt(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), P(this, this, s, e);
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
J.nextId = 0;
let v = J;
class D {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new v(t), this.b = new v(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= c.closeEnough;
  }
  distanceTo(t) {
    return At(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    P(
      this.a,
      this.b,
      this.isGuide ? c.guideLineColor : E(t.has(this) ? "bold" : "normal"),
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
class X {
  constructor(t, e, s) {
    this.a = new v(t), this.b = new v(e), this.c = new v(s);
  }
  contains(t) {
    return this.distanceTo(t) <= c.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(g(t, this.c) - g(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    zt(
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
const N = class N {
  constructor(t, e, s, i, r, a) {
    this.master = t, this.transform = (d) => vt(dt(lt(d, j, this.angle), j, this.scale), this), this.id = N.nextId++, this.attachers = [], this.xVar = new L(e), this.yVar = new L(s), this.angleAndSizeVecX = new L(i * Math.cos(r)), this.angleAndSizeVecY = new L(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new v(this.transform(t));
    this.attachers.push(s), e.constraints.add(new _(s, this, t));
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
    return Et(s);
  }
  distanceTo(t) {
    return g(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => e(this.transform(i)), s + 1), s === 1 && this.attachers.forEach((i, r) => {
      P(
        e(this.transform(this.master.attachers[r])),
        e(i),
        c.instanceSideAttacherColor
      );
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
N.nextId = 0;
let b = N;
class It {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new gt(), this.selection = /* @__PURE__ */ new Set();
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
      (s) => s.render(this.selection, t, c.masterSideAttacherColor)
    ), this.constraints.forEach((s) => {
      if (s instanceof K) {
        let i = (s.computeError() * 100).toFixed();
        i === "-0" && (i = "0"), this.drawText(
          i,
          c.distanceConstraintTextScale,
          t({
            x: s.a.x + c.distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + c.distanceConstraintLabelPct * (s.b.y - s.a.y)
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
      const { x: r, y: a } = dt(i, s, e);
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
      const { x: r, y: a } = lt(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, s = !1) {
    const i = new D(t, e, s);
    s || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && i.contains(a) && this.constraints.add(new F(a, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, s) {
    const i = new X(t, e, s);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(new G(i.a, i.c, i.b, i.c));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && a !== i.c && i.contains(a) && this.constraints.add(new W(a, i.a, i.b, i.c));
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
      e.has(s) || !s.contains(t) || (s instanceof D ? (this.constraints.add(new F(t, s.a, s.b)), c.showImplicitConstraints && m("(point on line)")) : s instanceof X && (this.constraints.add(new W(t, s.a, s.b, s.c)), c.showImplicitConstraints && m("(point on arc)")));
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
    return e ? (this.constraints.add(new ut(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new mt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof D && (this.constraints.add(new K(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const s of this.selection)
      s instanceof D && (e && (this.constraints.add(new G(e.a, e.b, s.a, s.b)), t = !0), e = s);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof D && (this.constraints.add(new xt(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  fullSize(t) {
    let e = !1;
    const s = this.thingsForOperation(t);
    for (const i of s)
      i instanceof b && (this.constraints.add(new Q(i)), e = !0);
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
      if (a instanceof D) {
        const d = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, d.a), i.set(a.b, d.b);
      } else if (a instanceof X) {
        const d = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c)
        );
        i.set(a.a, d.a), i.set(a.b, d.b), i.set(a.c, d.c);
      } else if (a instanceof b) {
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
    const i = new gt(), r = new v(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((d) => a.add(d));
    for (const d of this.things)
      this.selection.has(d) || !d.contains(t) || (d instanceof D ? i.add(new F(r, d.a, d.b)) : d instanceof X && i.add(new W(r, d.a, d.b, d.c)));
    for (; i.relax(a); )
      ;
    t.x = r.x, t.y = r.y;
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const d = g(t, a);
          d < s && (i = a, s = d);
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
    return Et(t);
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
      if (s instanceof _ && s.masterPoint === e) {
        const { instance: i, instancePoint: r } = s;
        i.attachers = i.attachers.filter((a) => a !== r), this.constraints.remove(s);
      }
    });
  }
  write(t, e = 1) {
    let s = null;
    pt(t, e, (i, r, a) => {
      const d = this.addInstance(i, { x: r, y: u.center.y }, i.size * a, 0);
      this.constraints.add(new Q(d, a)), s && this.replaceHandle(d.attachers[0], s.attachers[1]), s = d;
    });
  }
  drawText(t, e, s) {
    pt(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: d, y: k }) => ({
          x: d * a + r - u.center.x + s.x,
          y: -k * a + s.y
        }),
        1
      )
    );
  }
}
const xe = {
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
}, me = 1, ye = {
  data: xe,
  version: me
};
function fe(n, t, e = c.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = et(s.start, e), r = et(s.end, e);
        n.addLine(i, r);
        break;
      }
      case "arc": {
        const i = et(s.center, e), r = s.radius * e;
        n.addArc(
          wt(i, s.end, r),
          wt(i, s.start, r),
          i
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", s);
        break;
    }
}
const ge = new Map(ye.data.values), tt = /* @__PURE__ */ new Map();
for (const [n, t] of ge) {
  const e = new It();
  fe(e, t, c.fontScale);
  const s = e.addLine(
    { x: -c.kerning * c.fontScale, y: 0 },
    { x: (4 + c.kerning) * c.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), tt.set(n, e);
}
function pt(n, t, e) {
  const s = (a) => t * (a === a.toLowerCase() ? 0.75 : 1), i = (a) => s(a) * c.fontScale * (4 + c.kerning * 2);
  let r = u.center.x - 0.5 * [...n].map(i).reduce((a, d) => a + d, 0);
  for (let a = 0; a < n.length; a++) {
    const d = n[a], k = s(d), V = tt.get(d.toUpperCase());
    V && e(V, r, k), r += i(d);
  }
}
function et({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function wt({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let z = null;
const o = {
  get pos() {
    return z;
  },
  snapPos(n) {
    z && l.snap(z, n);
  },
  moveToScreenPos(n) {
    const t = u.fromScreenPosition(n);
    z ? (z.x = t.x, z.y = t.y) : z = t;
  },
  clearPos() {
    z = null;
  }
};
function Y(n) {
  if (!o.pos) {
    n();
    return;
  }
  const t = u.toScreenPosition(o.pos);
  n(), { x: o.pos.x, y: o.pos.y } = u.fromScreenPosition(t);
}
const B = {};
for (let n = 1; n < 10; n++)
  B["" + n] = new It();
let l = B[1];
window.drawing = l;
function S(n) {
  return n ? B[n] ?? tt.get(n) : l;
}
function Ct(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, Y(() => u.reset()), m("drawing #" + n), window.drawing = l);
}
const nt = [...Object.values(B), ...tt.values()];
let h = null;
function Dt() {
  if (!o.pos)
    return;
  const n = { x: o.pos.x, y: o.pos.y };
  (h == null ? void 0 : h.type) === "line" && l.addLine(h.start, n), h = {
    type: "line",
    start: n
  };
}
function Tt() {
  (h == null ? void 0 : h.type) === "line" && (h = null);
}
function Lt() {
  if (o.pos && ((h == null ? void 0 : h.type) !== "arc" && (h = { type: "arc", positions: [] }), h.positions.push({ x: o.pos.x, y: o.pos.y }), h.positions.length === 3)) {
    const [n, t, e] = h.positions;
    l.addArc(t, e, n), h = null;
  }
}
function Ht() {
  (h == null ? void 0 : h.type) === "arc" && (h = null);
}
function Bt(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(B))
    s.onAttacherRemoved(n, t);
}
function pe(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(B))
    e.onAttacherAdded(n, t);
}
function we() {
  if (c.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function be() {
  !h && l.isEmpty() && Se(), ve(), l.render(), Ee(), Ae();
}
function Se() {
  const n = innerWidth / 100, t = (e, s) => P(e, s, E(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function ve() {
  switch (h == null ? void 0 : h.type) {
    case "line":
      o.pos && P(h.start, o.pos, E(), u.toScreenPosition);
      break;
    case "arc":
      h.positions.length > 1 && o.pos && zt(
        h.positions[0],
        h.positions[1],
        o.pos,
        E(),
        u.toScreenPosition
      );
      break;
  }
}
function Ee() {
  if (!o.pos)
    return;
  const n = u.toScreenPosition(o.pos);
  P(
    { x: n.x - c.crosshairsSize, y: n.y },
    { x: n.x + c.crosshairsSize, y: n.y },
    E("bold")
  ), P(
    { x: n.x, y: n.y - c.crosshairsSize },
    { x: n.x, y: n.y + c.crosshairsSize },
    E("bold")
  );
}
function Ae() {
  if (!c.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  P({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, c.axisColor), P({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, c.axisColor);
  const t = o.pos;
  t && Vt(u.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function $t() {
  return o.pos ? l.handleAt(o.pos) : null;
}
function Ft() {
  return o.pos ? l.thingAt(o.pos) : null;
}
function Wt() {
  l.isEmpty() || (m("solve"), l.relax());
}
function Ot() {
  c.autoSolve = !c.autoSolve, m(`auto-solve ${c.autoSolve ? "on" : "off"}`);
}
function Rt() {
  o.pos && l.delete(o.pos) && (m("delete"), Nt(), l.isEmpty() && Y(() => u.reset()));
}
function Yt() {
  o.pos && l.fixedDistance(o.pos) && m("fixed distance");
}
function Xt() {
  return o.pos && l.fixedPoint(o.pos) ? (m("fixed point"), !0) : !1;
}
function Pe() {
  o.pos && l.weight(o.pos) && m("weight");
}
function qt() {
  o.pos && l.horizontalOrVertical(o.pos) && m("HorV");
}
function Me() {
  o.pos && l.fullSize(o.pos) && m("full size");
}
function ke() {
  const n = o.pos;
  n && (m("re-center"), Y(() => {
    u.centerAt(n);
  }));
}
function Ut(n) {
  const t = S(n);
  !t.isEmpty() && o.pos && (m("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function jt() {
  o.pos && l.dismember(o.pos) && (m("dismember"), Nt());
}
function at(n) {
  return !!o.pos && l.rotateInstanceAt(o.pos, n);
}
function rt(n) {
  return !!o.pos && l.resizeInstanceAt(o.pos, n);
}
function ot(n) {
  n ? l.toggleSelected(n) : o.pos && l.toggleSelections(o.pos);
}
function Kt(n, t) {
  l.moveSelectionBy(n, t);
}
function Gt() {
  l.clearSelection();
}
function Qt() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (Bt(l, n), m("remove attacher")) : (pe(l, n), m("add attacher")));
}
function ze() {
  l.equalDistance() && m("equal length");
}
function bt(n) {
  Y(() => u.scale = n), m("scale=" + u.scale.toFixed(1));
}
function Jt(n, t) {
  Y(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function Nt() {
  for (; Ve(); )
    ;
}
function Ve() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of nt)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of nt) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (Bt(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of nt)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
let O = [], st = !1;
function Ie() {
  const n = O;
  return O = [], n;
}
function St(n) {
  for (const t of n)
    (!t.predicted || c.usePredictedEvents) && O.push(t);
}
function yt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (st = !0), t === "ended" && (st = !1), !(t === "moved" && !st) && O.push({
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
function Ce() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", Zt), O = [];
}
window.onpointerdown = (n) => yt(n, "began");
window.onpointermove = (n) => yt(n, "moved");
window.onpointerup = (n) => yt(n, "ended");
const Zt = (n) => n.preventDefault();
window.addEventListener("touchstart", Zt, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = St, Ce(), St(n);
};
class w {
  constructor(t) {
    this.label = t, this.leftX = 0, this.topY = 0, this.scale = 0.4, this.fingerId = null, this.height = c.fontScale * 8;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + c.tablet.buttonWidth && this.topY <= e && e < this.topY + this.height;
  }
  render() {
    S().drawText(this.label, this.scale, {
      x: this.leftX + c.tablet.buttonWidth / 2,
      y: this.topY + this.height / 2 + this.scale * c.fontScale * 3
    });
  }
  get isDown() {
    return this.fingerId != null;
  }
}
const _t = new w("solve"), te = [
  new w("1"),
  new w("2"),
  new w("line"),
  new w("move"),
  new w("horv"),
  new w("dism"),
  new w("del"),
  _t
], ee = [
  new w("3"),
  new w("4"),
  new w("arc"),
  new w("eq"),
  new w("fix"),
  new w("att"),
  new w("clear"),
  new w("auto")
], ne = [], ft = [...te, ...ee, ...ne];
function De() {
}
function Te() {
  He(), _t.isDown && Wt();
}
function Le() {
  it(0, te), it(c.tablet.buttonWidth, ee), it(innerWidth - c.tablet.buttonWidth, ne);
  for (const n of ft)
    n.render();
}
function it(n, t) {
  let e = 0;
  for (const s of t)
    s.leftX = n, s.topY = e * s.height, e++;
}
function He() {
  for (const n of Ie())
    switch (n.type) {
      case "pencil":
        n.phase === "began" ? Be(n.position, n.pressure) : n.phase === "moved" ? $e(n.position, n.pressure) : n.phase === "ended" && Fe(n.position);
        break;
      case "finger":
        n.phase === "began" ? We(n.position, n.id) : n.phase === "moved" ? Re(n.position, n.id) : n.phase === "ended" && Ye(n.position, n.id);
    }
}
let U = !1, p = null;
function Be(n, t) {
  o.moveToScreenPos(n);
}
function $e(n, t) {
  const e = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n), o.snapPos(p == null ? void 0 : p.thing);
  const s = { x: o.pos.x, y: o.pos.y };
  if (e && S().selection.size > 0) {
    const i = Z(s, e);
    Kt(i.x, i.y);
  }
  if (p) {
    const i = s.x - p.offset.x, r = s.y - p.offset.y;
    p.thing.moveBy(i - p.thing.x, r - p.thing.y);
  }
  !U && t > 3 && (U = !0), U && t < 1 && se();
}
function se() {
  U = !1, (p == null ? void 0 : p.thing) instanceof v && S().mergeAndAddImplicitConstraints(p.thing), p = null, Gt();
}
function Fe(n) {
  o.clearPos(), se(), Tt(), Ht();
}
const T = /* @__PURE__ */ new Map();
function We(n, t) {
  for (const e of ft)
    if (e.contains(n)) {
      e.fingerId = t, Oe(e);
      return;
    }
  T.set(t, n);
}
function Oe(n) {
  switch (n.label) {
    case "clear":
      S().clear(), u.reset();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
      o.pos ? Ut(n.label) : Ct(n.label);
      break;
    case "line":
      Dt();
      break;
    case "arc":
      Lt();
      break;
    case "move":
      const t = $t();
      if (t) {
        p = { thing: t, offset: { x: 0, y: 0 } };
        break;
      }
      const e = Ft();
      e instanceof b ? p = { thing: e, offset: Z(o.pos, e) } : e && ot(e);
      break;
    case "horv":
      qt();
      break;
    case "fix":
      Xt() || Yt();
      break;
    case "dism":
      jt();
      break;
    case "att":
      Qt();
      break;
    case "del":
      Rt();
      break;
    case "auto":
      Ot();
      break;
  }
}
function Re(n, t) {
  if (S().isEmpty() || T.size > 2)
    return;
  const e = T.get(t);
  if (!e)
    return;
  T.set(t, n);
  const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
  if (o.pos || Jt(s.x - i.x, s.y - i.y), T.size !== 2)
    return;
  let r = null;
  for (const [oe, ce] of T.entries())
    if (oe !== t) {
      r = ce;
      break;
    }
  if (!r)
    throw new Error("bruh?!");
  const a = u.fromScreenPosition(r), d = g(a, i), V = g(a, s) / d, ae = Math.atan2(i.y - a.y, i.x - a.x), re = Math.atan2(s.y - a.y, s.x - a.x);
  !rt(V) && !o.pos && (u.scale *= V), at(re - ae);
}
function Ye(n, t) {
  for (const e of ft)
    e.fingerId === t && (e.fingerId = null);
  T.delete(t);
}
const Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: De,
  onFrame: Te,
  render: Le
}, Symbol.toStringTag, { value: "Module" })), A = {};
let H = !1, R = !1, y = null;
function qe() {
  window.addEventListener("keydown", Ke), window.addEventListener("keyup", Ge), f.addEventListener("pointerdown", Qe), f.addEventListener("pointermove", Je), f.addEventListener("pointerup", Ne);
}
function Ue() {
  A[" "] && Wt();
}
function je() {
}
function Ke(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Ut(t) : Ct(t);
    return;
  }
  switch (n.key) {
    case "f":
      c.flicker = !c.flicker;
      return;
    case "d":
      c.debug = !c.debug, m(`debug ${c.debug ? "on" : "off"}`);
      return;
    case "S":
      Ot();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Rt();
        break;
      case "l":
        Yt();
        break;
      case ".":
        Xt();
        break;
      case "W":
        Pe();
        break;
      case "e":
        ze();
        break;
      case "h":
        qt();
        break;
      case "=":
        rt(1.05) || bt(Math.min(u.scale + 0.1, 10));
        break;
      case "-":
        rt(0.95) || bt(Math.max(u.scale - 0.1, 0.1));
        break;
      case "q":
        at(5 * Math.PI / 180);
        break;
      case "w":
        at(-5 * Math.PI / 180);
        break;
      case "s":
        Me();
        break;
      case "A":
        Qt();
        break;
      case "c":
        ke();
        break;
      case "D":
        jt();
        break;
    }
}
function Ge(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      Tt(), R = !1, H || o.clearPos();
      break;
    case "a":
      Ht(), R = !1, H || o.clearPos();
      break;
  }
}
function Qe(n) {
  if (f.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), H = !0, A.Shift) {
    ot();
    return;
  } else if (A.Meta) {
    Dt(), R = !0;
    return;
  } else if (A.a) {
    Lt(), R = !0;
    return;
  }
  y = null;
  const t = $t();
  if (t) {
    y = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  Gt();
  const e = Ft();
  e instanceof b ? y = { thing: e, offset: Z(o.pos, e) } : e && ot(e);
}
function Je(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (H && t && !S().isEmpty() && !R && !y && S().selection.size === 0) {
    Jt(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(y == null ? void 0 : y.thing), H && t && S().selection.size > 0) {
    const s = Z(e, t);
    Kt(s.x, s.y);
  }
  if (y) {
    const s = e.x - y.offset.x, i = e.y - y.offset.y;
    y.thing.moveBy(s - y.thing.x, i - y.thing.y);
  }
}
function Ne(n) {
  f.releasePointerCapture(n.pointerId), H = !1, A.Meta || o.clearPos(), (y == null ? void 0 : y.thing) instanceof v && S().mergeAndAddImplicitConstraints(y.thing), y = null;
}
const Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: qe,
  onFrame: Ue,
  render: je
}, Symbol.toStringTag, { value: "Module" }));
he(document.getElementById("canvas"));
const ct = new URLSearchParams(window.location.search).get("tablet") ? Xe : Ze;
ct.init();
function ie() {
  ct.onFrame(), we(), ue(), ct.render(), be(), requestAnimationFrame(ie);
}
ie();
