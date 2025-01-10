const c = {
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
window.config = c;
function g(n, t) {
  return Math.sqrt(U(n, t));
}
function U(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function _(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const K = Object.freeze({ x: 0, y: 0 });
function St({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function dt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function lt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), d = s * a - i * r, z = s * r + i * a;
  return { x: d + t.x, y: z + t.y };
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
function Pt(n, t, e) {
  return Math.sqrt(_t(n, t, e));
}
function _t(n, t, e) {
  const s = U(t, e);
  if (s == 0)
    return U(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return U(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function te(n) {
  return 1 - Math.pow(1 - n, 5);
}
let f, x, At = !1;
function ee(n) {
  f = n, x = f.getContext("2d"), Mt(), At = !0;
}
function Mt() {
  if (f.width = innerWidth, f.height = innerHeight, devicePixelRatio !== 1) {
    const n = f.width, t = f.height;
    f.width = n * devicePixelRatio, f.height = t * devicePixelRatio, f.style.width = n + "px", f.style.height = t + "px", x.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Mt);
let F = "", zt = 0;
function y(n) {
  At && (F = n, zt = Date.now());
}
function ne() {
  if (x.clearRect(0, 0, f.width, f.height), x.lineWidth = c.lineWidth, x.lineCap = "round", F.length > 0) {
    x.font = "40px Monaco";
    const t = x.measureText(F).width, e = Date.now() - zt;
    if (e > c.statusTimeMillis)
      F = "";
    else {
      const s = 1 - te(e / c.statusTimeMillis);
      x.fillStyle = `rgba(255,222,33,${s})`, x.fillText(F, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function ht(n) {
  return n;
}
function S(n, t, e = P(), s = ht) {
  x.strokeStyle = e, x.beginPath();
  const i = s(n), r = s(t);
  x.moveTo(i.x, i.y), x.lineTo(r.x, r.y), x.stroke();
}
function kt(n, t, e, s = P(), i = ht) {
  const r = i(t), a = i(e), d = i(n);
  x.beginPath(), x.strokeStyle = s;
  const z = Math.atan2(r.y - d.y, r.x - d.x), V = Math.atan2(a.y - d.y, a.x - d.x);
  x.arc(d.x, d.y, g(d, r), z, V), x.stroke();
}
function Vt(n, t, e = P(), s = ht) {
  x.fillStyle = e;
  const i = 12;
  x.font = `${i}px Major Mono Display`;
  const r = x.measureText(t).width, { x: a, y: d } = s(n);
  x.fillText(t, a - r / 2, d + i / 2);
}
function P(n = "normal") {
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
class G extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = g(t, e);
  }
  map(t, e) {
    return new G(e.get(this.a), e.get(this.b));
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
class Q extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new Q(
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
class W extends M {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new W(
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
    return Pt(this.p, this.a, this.b);
  }
}
class O extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new O(
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
class tt extends M {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new tt(
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
      St(
        dt(
          lt(this.masterPoint, K, this.instance.angle),
          K,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class J extends M {
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
class yt extends M {
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
    return g(t, this) <= c.closeEnough;
  }
  distanceTo(t) {
    return g(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, s = c.instanceSideAttacherColor) {
    c.debug && Vt(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), S(this, this, s, e);
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
class T {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new v(t), this.b = new v(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= c.closeEnough;
  }
  distanceTo(t) {
    return Pt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    S(
      this.a,
      this.b,
      this.isGuide ? c.guideLineColor : P(t.has(this) ? "bold" : "normal"),
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
    kt(
      this.c,
      this.a,
      this.b,
      P(t.has(this) ? "bold" : "normal"),
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
    this.master = t, this.transform = (d) => St(dt(lt(d, K, this.angle), K, this.scale), this), this.id = Z.nextId++, this.attachers = [], this.xVar = new L(e), this.yVar = new L(s), this.angleAndSizeVecX = new L(i * Math.cos(r)), this.angleAndSizeVecY = new L(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new v(this.transform(t));
    this.attachers.push(s), e.constraints.add(new tt(s, this, t));
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
      S(
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
Z.nextId = 0;
let w = Z;
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
      s instanceof w ? s.render(this.selection, t, e + 1) : s.render(this.selection, t);
    }), e === 0 && (this.attachers.forEach(
      (s) => s.render(this.selection, t, c.masterSideAttacherColor)
    ), this.constraints.forEach((s) => {
      if (s instanceof G) {
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
    const a = new w(t, e, s, i, r, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof w))
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
    if (!(s instanceof w))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: r, y: a } = lt(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, s = !1) {
    const i = new T(t, e, s);
    s || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && i.contains(a) && this.constraints.add(new W(a, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, s) {
    const i = new X(t, e, s);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(new Q(i.a, i.c, i.b, i.c));
    for (const r of this.things)
      r.forEachHandle((a) => {
        a !== i.a && a !== i.b && a !== i.c && i.contains(a) && this.constraints.add(new O(a, i.a, i.b, i.c));
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
      e.has(s) || !s.contains(t) || (s instanceof T ? (this.constraints.add(new W(t, s.a, s.b)), c.showImplicitConstraints && y("(point on line)")) : s instanceof X && (this.constraints.add(new O(t, s.a, s.b, s.c)), c.showImplicitConstraints && y("(point on arc)")));
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
    return e ? (this.constraints.add(new yt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof T && (this.constraints.add(new G(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const s of this.selection)
      s instanceof T && (e && (this.constraints.add(new Q(e.a, e.b, s.a, s.b)), t = !0), e = s);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof T && (this.constraints.add(new xt(i.a, i.b)), s = !0);
    return this.selection.clear(), s;
  }
  fullSize(t) {
    let e = !1;
    const s = this.thingsForOperation(t);
    for (const i of s)
      i instanceof w && (this.constraints.add(new J(i)), e = !0);
    return e;
  }
  dismember(t) {
    let e = !1;
    const s = this.thingsForOperation(t);
    for (const i of s)
      i instanceof w && (this.inline(i), e = !0);
    return e;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof T) {
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
      } else if (a instanceof w) {
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
      this.selection.has(d) || !d.contains(t) || (d instanceof T ? i.add(new W(r, d.a, d.b)) : d instanceof X && i.add(new O(r, d.a, d.b, d.c)));
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
      if (e instanceof w) {
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
      e instanceof w && t.add(e);
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
      s instanceof w && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof tt && s.masterPoint === e) {
        const { instance: i, instancePoint: r } = s;
        i.attachers = i.attachers.filter((a) => a !== r), this.constraints.remove(s);
      }
    });
  }
  write(t, e = 1) {
    let s = null;
    pt(t, e, (i, r, a) => {
      const d = this.addInstance(i, { x: r, y: u.center.y }, i.size * a, 0);
      this.constraints.add(new J(d, a)), s && this.replaceHandle(d.attachers[0], s.attachers[1]), s = d;
    });
  }
  drawText(t, e, s) {
    pt(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: d, y: z }) => ({
          x: d * a + r - u.center.x + s.x,
          y: -z * a + s.y
        }),
        1
      )
    );
  }
}
const se = {
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
}, ie = 1, ae = {
  data: se,
  version: ie
};
function re(n, t, e = c.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = nt(s.start, e), r = nt(s.end, e);
        n.addLine(i, r);
        break;
      }
      case "arc": {
        const i = nt(s.center, e), r = s.radius * e;
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
const oe = new Map(ae.data.values), et = /* @__PURE__ */ new Map();
for (const [n, t] of oe) {
  const e = new It();
  re(e, t, c.fontScale);
  const s = e.addLine(
    { x: -c.kerning * c.fontScale, y: 0 },
    { x: (4 + c.kerning) * c.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), et.set(n, e);
}
function pt(n, t, e) {
  const s = (a) => t * (a === a.toLowerCase() ? 0.75 : 1), i = (a) => s(a) * c.fontScale * (4 + c.kerning * 2);
  let r = u.center.x - 0.5 * [...n].map(i).reduce((a, d) => a + d, 0);
  for (let a = 0; a < n.length; a++) {
    const d = n[a], z = s(d), V = et.get(d.toUpperCase());
    V && e(V, r, z), r += i(d);
  }
}
function nt({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function wt({ x: n, y: t }, e, s) {
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
function q(n) {
  if (!o.pos) {
    n();
    return;
  }
  const t = u.toScreenPosition(o.pos);
  n(), { x: o.pos.x, y: o.pos.y } = u.fromScreenPosition(t);
}
const $ = {};
for (let n = 1; n < 10; n++)
  $["" + n] = new It();
let l = $[1];
window.drawing = l;
function b(n) {
  return n ? $[n] ?? et.get(n) : l;
}
function Ct(n) {
  const t = b(n);
  !t || t === l || (l.leave(), l = t, q(() => u.reset()), y("drawing #" + n), window.drawing = l);
}
const st = [...Object.values($), ...et.values()];
let h = null;
function Tt() {
  if (!o.pos)
    return;
  const n = { x: o.pos.x, y: o.pos.y };
  (h == null ? void 0 : h.type) === "line" && l.addLine(h.start, n), h = {
    type: "line",
    start: n
  };
}
function Dt() {
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
  for (const s of Object.values($))
    s.onAttacherRemoved(n, t);
}
function ce(n, t) {
  n.attachers.push(t);
  for (const e of Object.values($))
    e.onAttacherAdded(n, t);
}
function de() {
  if (c.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function le() {
  !h && l.isEmpty() && he(), ue(), l.render(), xe(), ye();
}
function he() {
  const n = innerWidth / 100, t = (e, s) => S(e, s, P(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function ue() {
  switch (h == null ? void 0 : h.type) {
    case "line":
      o.pos && S(h.start, o.pos, P(), u.toScreenPosition);
      break;
    case "arc":
      h.positions.length > 1 && o.pos && kt(
        h.positions[0],
        h.positions[1],
        o.pos,
        P(),
        u.toScreenPosition
      );
      break;
  }
}
function xe() {
  if (!o.pos)
    return;
  const n = u.toScreenPosition(o.pos);
  S(
    { x: n.x - c.crosshairsSize, y: n.y },
    { x: n.x + c.crosshairsSize, y: n.y },
    P("bold")
  ), S(
    { x: n.x, y: n.y - c.crosshairsSize },
    { x: n.x, y: n.y + c.crosshairsSize },
    P("bold")
  );
}
function ye() {
  if (!c.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  S({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, c.axisColor), S({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, c.axisColor);
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
  l.isEmpty() || (y("solve"), l.relax());
}
function Ot() {
  o.pos && l.delete(o.pos) && (y("delete"), Ut(), l.isEmpty() && q(() => u.reset()));
}
function me() {
  o.pos && l.fixedDistance(o.pos) && y("fixed distance");
}
function fe() {
  o.pos && l.fixedPoint(o.pos) && y("fixed point");
}
function ge() {
  o.pos && l.weight(o.pos) && y("weight");
}
function Rt() {
  o.pos && l.horizontalOrVertical(o.pos) && y("HorV");
}
function pe() {
  o.pos && l.fullSize(o.pos) && y("full size");
}
function we() {
  const n = o.pos;
  n && (y("re-center"), q(() => {
    u.centerAt(n);
  }));
}
function Yt(n) {
  const t = b(n);
  !t.isEmpty() && o.pos && (y("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function be() {
  o.pos && l.dismember(o.pos) && (y("dismember"), Ut());
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
function qt(n, t) {
  l.moveSelectionBy(n, t);
}
function mt() {
  l.clearSelection();
}
function ve() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (Bt(l, n), y("remove attacher")) : (ce(l, n), y("add attacher")));
}
function Se() {
  l.equalDistance() && y("equal length");
}
function bt(n) {
  q(() => u.scale = n), y("scale=" + u.scale.toFixed(1));
}
function Xt(n, t) {
  q(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function Ut() {
  for (; Ee(); )
    ;
}
function Ee() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of st)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of st) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (Bt(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of st)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
let R = [], it = !1;
function Pe() {
  const n = R;
  return R = [], n;
}
function vt(n) {
  for (const t of n)
    (!t.predicted || c.usePredictedEvents) && R.push(t);
}
function ft(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (it = !0), t === "ended" && (it = !1), !(t === "moved" && !it) && R.push({
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
function Ae() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", jt), R = [];
}
window.onpointerdown = (n) => ft(n, "began");
window.onpointermove = (n) => ft(n, "moved");
window.onpointerup = (n) => ft(n, "ended");
const jt = (n) => n.preventDefault();
window.addEventListener("touchstart", jt, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = vt, Ae(), vt(n);
};
class E {
  constructor(t, e) {
    this.label = t, this.scale = e, this.y1 = 0, this.y2 = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return t < c.tablet.buttonWidth && this.y1 <= e && e < this.y2;
  }
  get isDown() {
    return this.fingerId != null;
  }
}
const H = /* @__PURE__ */ new Map();
function Me() {
  [
    new E("clear", 0.4),
    new E("1", 0.5),
    new E("2", 0.5),
    new E("3", 0.5),
    new E("4", 0.5),
    new E("line", 0.4),
    new E("arc", 0.5),
    new E("horv", 0.5),
    new E("del", 0.5),
    new E("solve", 0.4)
  ].forEach((n) => H.set(n.label, n));
}
function ze() {
  var n;
  Ve(), (n = H.get("solve")) != null && n.fingerId && Wt();
}
function ke() {
  c.tablet.showButtonLines && S(
    { x: c.tablet.buttonWidth, y: 0 },
    { x: c.tablet.buttonWidth, y: innerHeight }
  );
  const n = H.size;
  let t = 0;
  for (const e of H.values())
    e.y1 = t * innerHeight / n, e.y2 = e.y1 + innerHeight / n, c.tablet.showButtonLines && S({ x: 0, y: e.y2 }, { x: c.tablet.buttonWidth, y: e.y2 }), b().drawText(e.label, e.scale, {
      x: c.tablet.buttonWidth / 2,
      y: (e.y1 + e.y2) / 2 + e.scale * c.fontScale * 3
    }), t++;
}
function Ve() {
  for (const n of Pe())
    switch (n.type) {
      case "pencil":
        n.phase === "began" ? Ie(n.position, n.pressure) : n.phase === "moved" ? Ce(n.position, n.pressure) : n.phase === "ended" && De(n.position);
        break;
      case "finger":
        n.phase === "began" ? Le(n.position, n.id) : n.phase === "moved" ? Be(n.position, n.id) : n.phase === "ended" && $e(n.position, n.id);
    }
}
let j = !1, p = null;
function Ie(n, t) {
  o.moveToScreenPos(n);
}
function Ce(n, t) {
  const e = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n), o.snapPos(p == null ? void 0 : p.thing);
  const s = { x: o.pos.x, y: o.pos.y };
  if (e && b().selection.size > 0) {
    const i = _(s, e);
    qt(i.x, i.y);
  }
  if (p) {
    const i = s.x - p.offset.x, r = s.y - p.offset.y;
    p.thing.moveBy(i - p.thing.x, r - p.thing.y);
  }
  !j && t > 3 && (j = !0, Te()), j && t < 1 && Kt();
}
function Kt() {
  j = !1, (p == null ? void 0 : p.thing) instanceof v && b().mergeAndAddImplicitConstraints(p.thing), p = null, mt();
}
function Te() {
  const n = $t();
  if (n) {
    p = { thing: n, offset: { x: 0, y: 0 } };
    return;
  }
  mt();
  const t = Ft();
  t instanceof w ? p = { thing: t, offset: _(o.pos, t) } : t && ot(t);
}
function De(n) {
  o.clearPos(), Kt(), Dt(), Ht();
}
const D = /* @__PURE__ */ new Map();
function Le(n, t) {
  for (const e of H.values())
    if (e.contains(n)) {
      e.fingerId = t, He(e);
      return;
    }
  D.set(t, n);
}
function He(n) {
  switch (n.label) {
    case "clear":
      b().clear(), u.reset();
      break;
    case "1":
    case "2":
    case "3":
    case "4":
      o.pos ? Yt(n.label) : Ct(n.label);
      break;
    case "line":
      Tt();
      break;
    case "arc":
      Lt();
      break;
    case "horv":
      Rt();
      break;
    case "del":
      Ot();
      break;
  }
}
function Be(n, t) {
  if (b().isEmpty() || D.size > 2)
    return;
  const e = D.get(t);
  if (!e)
    return;
  D.set(t, n);
  const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
  if (o.pos || Xt(s.x - i.x, s.y - i.y), D.size !== 2)
    return;
  let r = null;
  for (const [Nt, Zt] of D.entries())
    if (Nt !== t) {
      r = Zt;
      break;
    }
  if (!r)
    throw new Error("bruh?!");
  const a = u.fromScreenPosition(r), d = g(a, i), V = g(a, s) / d, Qt = Math.atan2(i.y - a.y, i.x - a.x), Jt = Math.atan2(s.y - a.y, s.x - a.x);
  !rt(V) && !o.pos && (u.scale *= V), at(Jt - Qt);
}
function $e(n, t) {
  for (const e of H.values())
    e.fingerId === t && (e.fingerId = null);
  D.delete(t);
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Me,
  onFrame: ze,
  render: ke
}, Symbol.toStringTag, { value: "Module" })), A = {};
let B = !1, Y = !1, m = null;
function We() {
  window.addEventListener("keydown", Ye), window.addEventListener("keyup", qe), f.addEventListener("pointerdown", Xe), f.addEventListener("pointermove", Ue), f.addEventListener("pointerup", je);
}
function Oe() {
  A[" "] && Wt();
}
function Re() {
}
function Ye(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Yt(t) : Ct(t);
    return;
  }
  switch (n.key) {
    case "f":
      c.flicker = !c.flicker;
      return;
    case "d":
      c.debug = !c.debug, y(`debug ${c.debug ? "on" : "off"}`);
      return;
    case "S":
      c.autoSolve = !c.autoSolve, y(`auto-solve ${c.autoSolve ? "on" : "off"}`);
      return;
  }
  if (!b().isEmpty())
    switch (n.key) {
      case "Backspace":
        Ot();
        break;
      case "l":
        me();
        break;
      case ".":
        fe();
        break;
      case "W":
        ge();
        break;
      case "e":
        Se();
        break;
      case "h":
        Rt();
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
        pe();
        break;
      case "A":
        ve();
        break;
      case "c":
        we();
        break;
      case "D":
        be();
        break;
    }
}
function qe(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      Dt(), Y = !1, B || o.clearPos();
      break;
    case "a":
      Ht(), Y = !1, B || o.clearPos();
      break;
  }
}
function Xe(n) {
  if (f.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), B = !0, A.Shift) {
    ot();
    return;
  } else if (A.Meta) {
    Tt(), Y = !0;
    return;
  } else if (A.a) {
    Lt(), Y = !0;
    return;
  }
  m = null;
  const t = $t();
  if (t) {
    m = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  mt();
  const e = Ft();
  e instanceof w ? m = { thing: e, offset: _(o.pos, e) } : e && ot(e);
}
function Ue(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (B && t && !b().isEmpty() && !Y && !m && b().selection.size === 0) {
    Xt(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(m == null ? void 0 : m.thing), B && t && b().selection.size > 0) {
    const s = _(e, t);
    qt(s.x, s.y);
  }
  if (m) {
    const s = e.x - m.offset.x, i = e.y - m.offset.y;
    m.thing.moveBy(s - m.thing.x, i - m.thing.y);
  }
}
function je(n) {
  f.releasePointerCapture(n.pointerId), B = !1, A.Meta || o.clearPos(), (m == null ? void 0 : m.thing) instanceof v && b().mergeAndAddImplicitConstraints(m.thing), m = null;
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: We,
  onFrame: Oe,
  render: Re
}, Symbol.toStringTag, { value: "Module" }));
ee(document.getElementById("canvas"));
const ct = new URLSearchParams(window.location.search).get("tablet") ? Fe : Ke;
ct.init();
function Gt() {
  ct.onFrame(), de(), ne(), ct.render(), le(), requestAnimationFrame(Gt);
}
Gt();
