const c = {
  debug: !1,
  flicker: !0,
  baseAlphaMultiplier: 1.5,
  lineWidth: 3.5,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgb(255,165,0)",
  instanceSideAttacherColor: "rgb(255,222,33)",
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
  tablet: {
    buttonWidth: 100,
    lefty: !1
  }
};
window.config = c;
const xe = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(q(n, t));
}
function q(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Ut(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const j = Object.freeze({ x: 0, y: 0 });
function Xt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function lt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function ht(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), d = s * a - i * r, f = s * r + i * a;
  return { x: d + t.x, y: f + t.y };
}
function qt(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function jt(n, t, e) {
  return Math.sqrt(fe(n, t, e));
}
function fe(n, t, e) {
  const s = q(t, e);
  if (s == 0)
    return q(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return q(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function ge(n) {
  return 1 - Math.pow(1 - n, 5);
}
let p, h, Gt = !1;
function pe(n) {
  p = n, h = p.getContext("2d"), Kt(), Gt = !0;
}
function Kt() {
  if (p.width = innerWidth, p.height = innerHeight, devicePixelRatio !== 1) {
    const n = p.width, t = p.height;
    p.width = n * devicePixelRatio, p.height = t * devicePixelRatio, p.style.width = n + "px", p.style.height = t + "px", h.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Kt);
let T = "", _t = 0;
function x(n) {
  Gt && (T = n, _t = Date.now());
}
function we() {
  if (h.clearRect(0, 0, p.width, p.height), h.lineWidth = c.lineWidth, h.lineCap = "round", T.length > 0) {
    h.font = "40px Monaco";
    const t = h.measureText(T).width, e = Date.now() - _t;
    if (e > c.statusTimeMillis)
      T = "";
    else {
      const s = 1 - ge(e / c.statusTimeMillis);
      h.fillStyle = `rgba(255,222,33,${s})`, h.fillText(T, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function Z(n) {
  return n;
}
function Qt(n, t = P(), e = Z) {
  const s = e(n);
  h.fillStyle = t, h.beginPath(), h.arc(s.x, s.y, h.lineWidth * 2, 0, xe), h.fill();
}
function k(n, t, e = P(), s = Z) {
  const i = h.lineWidth;
  n.x === t.x && n.y === t.y && (h.lineWidth *= 2), h.strokeStyle = e, h.beginPath();
  const r = s(n), a = s(t);
  h.moveTo(r.x, r.y), h.lineTo(a.x, a.y), h.stroke(), h.lineWidth = i;
}
function Jt(n, t, e, s = P(), i = Z) {
  const r = i(t), a = i(e), d = i(n);
  h.beginPath(), h.strokeStyle = s;
  const f = Math.atan2(r.y - d.y, r.x - d.x), B = Math.atan2(a.y - d.y, a.x - d.x);
  h.arc(d.x, d.y, w(d, r), f, B), h.stroke();
}
function Nt(n, t, e = P(), s = Z) {
  h.fillStyle = e;
  const i = 12;
  h.font = `${i}px Major Mono Display`;
  const r = h.measureText(t).width, { x: a, y: d } = s(n);
  h.fillText(t, a - r / 2, d + i / 2);
}
function P(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= c.baseAlphaMultiplier, `rgba(255,255,255,${c.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let C = 1;
const I = { x: 0, y: 0 }, u = {
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
    I.x = n, I.y = t;
  },
  get center() {
    return I;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - I.x) * C + innerWidth / 2,
      y: -(t - I.y) * C + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / C + I.x,
      y: I.y - (t - innerHeight / 2) / C
    };
  }
};
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
    return this.things.every((s) => t.has(s)) && this.handles.every((s) => e.has(s));
  }
  replaceHandle(t, e) {
    for (let s = 0; s < this.handles.length; s++)
      this.handles[s], this.handles.forEach((i, r) => {
        i === t && (this.handles[r] = e);
      });
  }
}
class ut extends A {
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
    return w(this.p, this.pos) * 100;
  }
}
class mt extends A {
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
class G extends A {
  constructor(t, e) {
    super([], [t, e]), this.distance = w(t, e);
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
    return this.distance - w(this.a, this.b);
  }
}
class tt extends A {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new tt(
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
    return Math.abs(w(this.a1, this.b1) - w(this.a2, this.b2));
  }
}
class H extends A {
  constructor(t, e, s) {
    super([], [t, e, s]);
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
    return jt(this.p, this.a, this.b);
  }
}
class O extends A {
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
    return w(this.p, this.c) - w(this.a, this.c);
  }
}
class et extends A {
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
    return w(
      this.instancePoint,
      Xt(
        lt(
          ht(this.masterPoint, j, this.instance.angle),
          j,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class K extends A {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new K(t.get(this.instance), this.scale);
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class yt extends A {
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
class Wt {
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
  isEmpty() {
    return this.constraints.length === 0;
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
    const e = u.scale > 0 ? 1 / u.scale : 1, s = c.minWorthwhileErrorImprovement * e;
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
    const d = this.computeError();
    return a < Math.min(r, d) ? (t.value = i + e, !0) : d < Math.min(r, a) ? (t.value = i - e, !0) : (t.value = i, !1);
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
const J = class J {
  constructor({ x: t, y: e }) {
    this.id = J.nextId++, this.xVar = new z(t), this.yVar = new z(e);
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
    return w(t, this) <= c.closeEnough;
  }
  distanceTo(t) {
    return w(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = c.instanceSideAttacherColor) {
    c.debug && Nt(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), Qt(this, e, t);
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
class V {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new v(t), this.b = new v(e);
  }
  get x() {
    return (this.a.x + this.b.x) / 2;
  }
  get y() {
    return (this.a.y + this.b.y) / 2;
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= c.closeEnough;
  }
  distanceTo(t) {
    return jt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    if (this.isGuide && !c.showGuideLines)
      return;
    const e = this.isGuide ? c.guideLineColor : P();
    k(this.a, this.b, e, t);
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
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    return this.distanceTo(t) <= c.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(w(t, this.c) - w(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    Jt(this.c, this.a, this.b, P(), t);
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
    this.master = t, this.transform = (d) => Xt(lt(ht(d, j, this.angle), j, this.scale), this), this.id = N.nextId++, this.attachers = [], this.xVar = new z(e), this.yVar = new z(s), this.angleAndSizeVecX = new z(i * Math.cos(r)), this.angleAndSizeVecY = new z(i * Math.sin(r)), this.addAttachers(t, a);
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
    return qt(s);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e = 0) {
    this.master.render((s) => t(this.transform(s)), e + 1), e === 1 && this.attachers.forEach((s, i) => {
      const r = t(s);
      k(
        t(this.transform(this.master.attachers[i])),
        r,
        c.instanceSideAttacherColor
      ), Qt(r, c.instanceSideAttacherColor);
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
class Zt {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Wt();
  }
  clear() {
    this.things = [], this.attachers = [], this.constraints.clear();
  }
  isEmpty() {
    return this.things.length === 0;
  }
  relax() {
    return this.constraints.relax(this.getVars());
  }
  render(t = u.toScreenPosition, e = 0) {
    this.things.forEach((s) => {
      s instanceof b ? s.render(t, e + 1) : s.render(t);
    }), e === 0 && (this.attachers.forEach((s) => s.render(t, c.masterSideAttacherColor)), this.constraints.forEach((s) => {
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
    const a = new b(t, e, s, i, r, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: r, y: a } = lt(i, s, e);
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
      const { x: r, y: a } = ht(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const r = new V(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b));
    for (const a of this.things)
      a.forEachHandle((d) => {
        d !== r.a && d !== r.b && r.contains(d) && this.constraints.add(new H(d, r.a, r.b));
      });
    return this.things.push(r), r;
  }
  addArc(t, e, s, i = !0) {
    const r = new X(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new tt(r.a, r.c, r.b, r.c));
    for (const a of this.things)
      a.forEachHandle((d) => {
        d !== r.a && d !== r.b && d !== r.c && r.contains(d) && this.constraints.add(new O(d, r.a, r.b, r.c));
      });
    return this.things.push(r), r;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.things)
      s.forEachHandle((i) => {
        i !== t && i.contains(t) && (this.replaceHandle(i, t), e.add(s));
      });
    for (const s of this.things)
      e.has(s) || !s.contains(t) || (s instanceof V ? (this.constraints.add(new H(t, s.a, s.b)), c.showImplicitConstraints && x("(point on line)")) : s instanceof X && (this.constraints.add(new O(t, s.a, s.b, s.c)), c.showImplicitConstraints && x("(point on arc)")));
  }
  replaceHandle(t, e) {
    this.things.forEach((s) => s.replaceHandle(t, e)), this.attachers = this.attachers.map((s) => s === t ? e : s), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? (this.things = this.things.filter((s) => s !== e), !0) : !1;
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
    const e = this.thingAt(t);
    return e instanceof V ? (this.constraints.add(new G(e.a, e.b)), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof V ? (this.constraints.add(new mt(e.a, e.b)), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof b ? (this.constraints.add(new K(e)), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof b ? (this.inline(e), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof V) {
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
    if (s)
      return t.x = s.x, t.y = s.y, "H";
    const i = new Wt(), r = new v(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((f) => a.add(f));
    const d = [];
    for (const f of this.things)
      f === e || !f.contains(t) || (f instanceof V ? (i.add(new H(r, f.a, f.b)), d.push("L")) : f instanceof X && (i.add(new O(r, f.a, f.b, f.c)), d.push("A")));
    if (i.isEmpty())
      return null;
    for (; i.relax(a); )
      ;
    return t.x = r.x, t.y = r.y, d.join();
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const d = w(t, a);
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
  leave() {
    this.center();
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
    return qt(t);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: s } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(s, 2));
    return Math.sqrt(t) * 2;
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
    Ht(t, e, (i, r, a) => {
      const d = this.addInstance(i, { x: r, y: u.center.y }, i.size * a, 0);
      this.constraints.add(new K(d, a)), s && this.replaceHandle(d.attachers[0], s.attachers[1]), s = d;
    });
  }
  drawText(t, e, s) {
    Ht(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: d, y: f }) => ({
          x: d * a + r - u.center.x + s.x,
          y: -f * a + s.y
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
}, ve = 1, Se = {
  data: be,
  version: ve
};
function Pe(n, t, e = c.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = it(s.start, e), r = it(s.end, e);
        n.addLine(i, r, !1, !1);
        break;
      }
      case "arc": {
        const i = it(s.center, e), r = s.radius * e;
        n.addArc(
          Ot(i, s.end, r),
          Ot(i, s.start, r),
          i,
          !1
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", s);
        break;
    }
}
const Ee = new Map(Se.data.values), nt = /* @__PURE__ */ new Map();
for (const [n, t] of Ee) {
  const e = new Zt();
  Pe(e, t, c.fontScale);
  const s = e.addLine(
    { x: -c.kerning * c.fontScale, y: 0 },
    { x: (4 + c.kerning) * c.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), nt.set(n, e);
}
function Ht(n, t, e) {
  const s = (a) => t * (a === a.toUpperCase() ? 1 : 0.75), i = (a) => s(a) * c.fontScale * (4 + c.kerning * 2);
  let r = u.center.x - 0.5 * [...n].map(i).reduce((a, d) => a + d, 0);
  for (let a = 0; a < n.length; a++) {
    const d = n[a], f = s(d), B = nt.get(d.toUpperCase());
    B && e(B, r, f), r += i(d);
  }
}
function it({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Ot({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let M = null;
const o = {
  get pos() {
    return M;
  },
  snapPos(n) {
    return M ? l.snap(M, n) : null;
  },
  moveToScreenPos(n) {
    const t = u.fromScreenPosition(n);
    M ? (M.x = t.x, M.y = t.y) : M = t;
  },
  clearPos() {
    M = null;
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
const L = {};
for (let n = 1; n < 10; n++)
  L["" + n] = new Zt();
let l = L[1];
window.drawing = l;
function S(n) {
  return n ? L[n] ?? nt.get(n) : l;
}
function xt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, Y(() => u.reset()), st(), x("drawing #" + n));
}
const rt = [...Object.values(L), ...nt.values()];
let m = null;
function ft() {
  if (!o.pos)
    return;
  const n = { x: o.pos.x, y: o.pos.y };
  (m == null ? void 0 : m.type) === "line" && l.addLine(m.start, n), m = {
    type: "line",
    start: n
  };
}
function gt() {
  (m == null ? void 0 : m.type) === "line" && (m = null);
}
function pt() {
  if (o.pos && ((m == null ? void 0 : m.type) !== "arc" && (m = { type: "arc", positions: [] }), m.positions.push({ x: o.pos.x, y: o.pos.y }), m.positions.length === 3)) {
    const [n, t, e] = m.positions;
    l.addArc(t, e, n), m = null;
  }
}
function wt() {
  (m == null ? void 0 : m.type) === "arc" && (m = null);
}
function te(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(L))
    s.onAttacherRemoved(n, t);
}
function Ae(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(L))
    e.onAttacherAdded(n, t);
}
function ee() {
  if (c.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function ne() {
  !m && l.isEmpty() && Me(), ke(), l.render(), Be(), Ce();
}
function Me() {
  const n = innerWidth / 100, t = (e, s) => k(e, s, P(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function ke() {
  switch (m == null ? void 0 : m.type) {
    case "line":
      o.pos && k(m.start, o.pos, P(), u.toScreenPosition);
      break;
    case "arc":
      m.positions.length > 1 && o.pos && Jt(
        m.positions[0],
        m.positions[1],
        o.pos,
        P(),
        u.toScreenPosition
      );
      break;
  }
}
function Be() {
  if (!o.pos)
    return;
  const n = u.toScreenPosition(o.pos);
  k(
    { x: n.x - c.crosshairsSize, y: n.y },
    { x: n.x + c.crosshairsSize, y: n.y },
    P("bold")
  ), k(
    { x: n.x, y: n.y - c.crosshairsSize },
    { x: n.x, y: n.y + c.crosshairsSize },
    P("bold")
  );
}
function Ce() {
  if (!c.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  k({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, c.axisColor), k({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, c.axisColor);
  const t = o.pos;
  t && Nt(u.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function bt() {
  return o.pos ? l.handleAt(o.pos) : null;
}
function U() {
  return o.pos ? l.thingAt(o.pos) : null;
}
function ot() {
  const n = U();
  return n instanceof V ? n : null;
}
function se() {
  const n = U();
  return n instanceof b ? n : null;
}
function vt() {
  l.isEmpty() || (x("solve"), l.relax());
}
function St() {
  c.autoSolve = !c.autoSolve, x(`auto-solve ${c.autoSolve ? "on" : "off"}`);
}
function Pt() {
  o.pos && l.delete(o.pos) && (x("delete"), re(), l.isEmpty() && Y(() => u.reset()));
}
function Et() {
  o.pos && l.fixedDistance(o.pos) && x("fixed distance");
}
function At() {
  return o.pos && l.fixedPoint(o.pos) ? (x("fixed point"), !0) : !1;
}
function Mt() {
  o.pos && l.weight(o.pos) && x("weight");
}
function kt() {
  o.pos && l.horizontalOrVertical(o.pos) && x("HorV");
}
function Bt() {
  o.pos && l.fullSize(o.pos) && x("full size");
}
function ie() {
  const n = o.pos;
  n && (x("re-center"), Y(() => {
    u.centerAt(n);
  }));
}
function Ct(n) {
  const t = S(n);
  !t.isEmpty() && o.pos && (x("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function It() {
  o.pos && l.dismember(o.pos) && (x("dismember"), re());
}
function _(n) {
  return !!o.pos && l.rotateInstanceAt(o.pos, n);
}
function Q(n) {
  return !!o.pos && l.resizeInstanceAt(o.pos, n);
}
function Vt() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (te(l, n), x("remove attacher")) : (Ae(l, n), x("add attacher")));
}
let W = null;
function zt() {
  if (!W) {
    (W = ot()) && x("equal length");
    return;
  }
  const n = ot();
  n && (S().constraints.add(
    new tt(W.a, W.b, n.a, n.b)
  ), x("equal length"));
}
function st() {
  W = null;
}
function ct(n) {
  Y(() => u.scale = n), x("scale=" + u.scale.toFixed(1));
}
function Dt(n, t) {
  Y(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function re() {
  for (; Ie(); )
    ;
}
function Ie() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of rt)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of rt) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (te(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of rt)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Pt,
  dismember: It,
  drawing: S,
  endArc: wt,
  endEqualLength: st,
  endLines: gt,
  fixedDistance: Et,
  fixedPoint: At,
  fullSize: Bt,
  handle: bt,
  horizontalOrVertical: kt,
  instance: se,
  instantiate: Ct,
  line: ot,
  moreArc: pt,
  moreEqualLength: zt,
  moreLines: ft,
  onFrame: ee,
  panBy: Dt,
  pen: o,
  reCenter: ie,
  render: ne,
  rotateInstanceBy: _,
  scaleInstanceBy: Q,
  setScale: ct,
  solve: vt,
  switchToDrawing: xt,
  thing: U,
  toggleAttacher: Vt,
  toggleAutoSolve: St,
  weight: Mt
}, Symbol.toStringTag, { value: "Module" }));
var Yt;
const $t = (Yt = window.webkit) == null ? void 0 : Yt.messageHandlers, ze = window.webkit != null;
function Ft(n, t = n) {
  ze && (x($t[n]), $t[n].postMessage(t));
}
let $ = [], at = !1;
function De() {
  const n = $;
  return $ = [], n;
}
function Rt(n) {
  for (const t of n)
    (!t.predicted || c.usePredictedEvents) && $.push(t);
}
function Lt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (at = !0), t === "ended" && (at = !1), !(t === "moved" && !at) && $.push({
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
function Le() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", ae), $ = [];
}
window.onpointerdown = (n) => Lt(n, "began");
window.onpointermove = (n) => Lt(n, "moved");
window.onpointerup = (n) => Lt(n, "ended");
const ae = (n) => n.preventDefault();
window.addEventListener("touchstart", ae, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Rt, Le(), Rt(n);
};
const Tt = () => c.fontScale * 8;
function oe(n, t, e, s = 0.35) {
  S().drawText(n, s, {
    x: t + c.tablet.buttonWidth / 2,
    y: e + Tt() / 2 + s * c.fontScale * 3
  });
}
class y {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + c.tablet.buttonWidth && this.topY <= e && e < this.topY + Tt();
  }
  render() {
    oe(this.label, this.leftX, this.topY);
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class ce {
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
    for (const s of this.buttons)
      if (s.contains(t)) {
        s.fingerId = e, this.onButtonDown(s);
        return;
      }
    this.fingerScreenPositions.set(e, t);
  }
  onFingerMove(t, e) {
    this.fingerScreenPositions.set(e, t);
  }
  onFingerUp(t, e) {
    for (const s of this.buttons)
      s.fingerId === e && (this.onButtonUp(s), s.fingerId = null);
    this.fingerScreenPositions.delete(e);
  }
  processEvents() {
    for (const t of De())
      switch (t.type) {
        case "pencil":
          t.phase === "began" ? this.onPencilDown(t.position, t.pressure) : t.phase === "moved" ? this.onPencilMove(t.position, t.pressure) : t.phase === "ended" && this.onPencilUp(t.position);
          break;
        case "finger":
          t.phase === "began" ? this.onFingerDown(t.position, t.id) : t.phase === "moved" ? this.onFingerMove(t.position, t.id) : t.phase === "ended" && this.onFingerUp(t.position, t.id);
      }
  }
  layOutButtonColumn(t, e) {
    let s = 0;
    for (const i of e)
      i.leftX = t, i.topY = s * Tt(), s++;
  }
}
let D;
function Te() {
  D = de;
}
function We() {
  D.processEvents(), D.onFrame();
}
function He() {
  D.render();
}
const de = new class extends ce {
  constructor() {
    super(), this.moveButton = new y("MOVE"), this.solveButton = new y("SOLVE"), this.eqButton = new y("EQ"), this.col1 = [
      new y("1"),
      new y("2"),
      new y("3"),
      new y("LINE"),
      this.moveButton,
      new y("HORV"),
      new y("SIZE"),
      new y("DISM"),
      new y("DEL"),
      this.solveButton
    ], this.col2 = [
      new y("4"),
      new y("5"),
      new y("6"),
      new y("ARC"),
      this.eqButton,
      new y("FIX"),
      new y("weight"),
      new y("ATT"),
      new y("CLEAR"),
      new y("AUTO")
    ], this.col3 = [new y("config"), new y("reload")], this.pencilClickInProgress = !1, this.drag = null, this.lastSnap = null, this.buttons.push(...this.col1, ...this.col2, ...this.col3);
  }
  onFrame() {
    this.solveButton.isDown && vt();
  }
  layOutButtons() {
    c.tablet.lefty ? (this.layOutButtonColumn(innerWidth - c.tablet.buttonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * c.tablet.buttonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(c.tablet.buttonWidth, this.col2), this.layOutButtonColumn(innerWidth - c.tablet.buttonWidth, this.col3));
  }
  onPencilDown(n, t) {
    o.moveToScreenPos(n), this.moveButton.isDown && this.move(), this.prepareHaptics();
  }
  onPencilMove(n, t) {
    o.moveToScreenPos(n), this.snap();
    const e = { x: o.pos.x, y: o.pos.y };
    if (this.drag) {
      const s = e.x - this.drag.offset.x, i = e.y - this.drag.offset.y;
      this.drag.thing.moveBy(s - this.drag.thing.x, i - this.drag.thing.y);
    }
    !this.pencilClickInProgress && t > 3 && (this.pencilClickInProgress = !0, this.onPencilClick()), this.pencilClickInProgress && t < 1 && this.endDragEtc();
  }
  onPencilUp(n) {
    o.clearPos(), this.endDragEtc(), gt(), wt();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof v && S().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && zt();
  }
  onButtonDown(n) {
    const t = n.label.toLowerCase();
    if ("1" <= t && t <= "9") {
      o.pos ? (Ct(n.label), this.move()) : xt(n.label);
      return;
    }
    switch (t) {
      case "clear":
        S().clear(), u.reset();
        break;
      case "line":
        ft();
        break;
      case "arc":
        pt();
        break;
      case "move":
        this.move();
        break;
      case "horv":
        kt();
        break;
      case "fix":
        At() || Et();
        break;
      case "size":
        Bt();
        break;
      case "weight":
        Mt();
        break;
      case "dism":
        It();
        break;
      case "att":
        Vt();
        break;
      case "del":
        Pt();
        break;
      case "auto":
        St();
        break;
      case "reload":
        location.reload();
        break;
      case "config":
        D = Oe;
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && st();
  }
  onFingerMove(n, t) {
    if (S().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
    if (o.pos || Dt(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let r = null;
    for (const [me, ye] of this.fingerScreenPositions.entries())
      if (me !== t) {
        r = ye;
        break;
      }
    if (!r)
      throw new Error("bruh?!");
    const a = u.fromScreenPosition(r), d = w(a, i), B = w(a, s) / d, he = Math.atan2(i.y - a.y, i.x - a.x), ue = Math.atan2(s.y - a.y, s.x - a.x);
    se() && !this.drag && this.move(), !Q(B) && !o.pos && (u.scale *= B), _(ue - he);
  }
  move() {
    const n = bt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = U();
    t && (this.drag = { thing: t, offset: Ut(o.pos, t) });
  }
  snap() {
    var t;
    const n = o.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Ft("prepareHaptics");
  }
  hapticBump() {
    Ft("hapticImpact");
  }
}(), Oe = new class extends ce {
  constructor() {
    super(), this.leftyButton = new y("lefty"), this.col1 = [this.leftyButton], this.col2 = [new y("back")], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    super.render(), oe(
      c.tablet.lefty ? "on" : "off",
      this.leftyButton.leftX + c.tablet.buttonWidth,
      this.leftyButton.topY
    );
  }
  layOutButtons() {
    this.layOutButtonColumn(innerWidth / 2 - c.tablet.buttonWidth / 2, this.col1), c.tablet.lefty ? this.layOutButtonColumn(0, this.col2) : this.layOutButtonColumn(innerWidth - c.tablet.buttonWidth, this.col2);
  }
  onFrame() {
  }
  onButtonDown(n) {
    switch (n.label.toLowerCase()) {
      case "back":
        D = de;
        break;
      case "lefty":
        c.tablet.lefty = !c.tablet.lefty;
        break;
    }
  }
  onButtonUp(n) {
  }
}(), $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Te,
  onFrame: We,
  render: He
}, Symbol.toStringTag, { value: "Module" })), E = {};
let F = !1, R = !1, g = null;
function Fe() {
  window.addEventListener("keydown", Ue), window.addEventListener("keyup", Xe), p.addEventListener("pointerdown", qe), p.addEventListener("pointermove", je), p.addEventListener("pointerup", Ge);
}
function Re() {
  E[" "] && vt();
}
function Ye() {
}
function Ue(n) {
  if (E[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    E.Shift ? Ct(t) : xt(t);
    return;
  }
  switch (n.key) {
    case "f":
      c.flicker = !c.flicker;
      return;
    case "d":
      c.debug = !c.debug, x(`debug ${c.debug ? "on" : "off"}`);
      return;
    case "S":
      St();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Pt();
        break;
      case "l":
        Et();
        break;
      case ".":
        At();
        break;
      case "W":
        Mt();
        break;
      case "h":
        kt();
        break;
      case "=":
        Q(1.05) || ct(Math.min(u.scale + 0.1, 10));
        break;
      case "-":
        Q(0.95) || ct(Math.max(u.scale - 0.1, 0.1));
        break;
      case "q":
        _(5 * Math.PI / 180);
        break;
      case "w":
        _(-5 * Math.PI / 180);
        break;
      case "s":
        Bt();
        break;
      case "A":
        Vt();
        break;
      case "c":
        ie();
        break;
      case "D":
        It();
        break;
    }
}
function Xe(n) {
  switch (delete E[n.key], n.key) {
    case "Meta":
      gt(), R = !1, F || o.clearPos();
      break;
    case "a":
      wt(), R = !1, F || o.clearPos();
      break;
    case "e":
      st();
      break;
  }
}
function qe(n) {
  if (p.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), F = !0, E.Meta) {
    ft(), R = !0;
    return;
  } else if (E.a) {
    pt(), R = !0;
    return;
  } else if (E.e) {
    zt();
    return;
  }
  g = null;
  const t = bt();
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = U();
  e && (g = { thing: e, offset: Ut(o.pos, e) });
}
function je(n) {
  if (n.metaKey || delete E.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (F && t && !S().isEmpty() && !R && !g) {
    Dt(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(g == null ? void 0 : g.thing), g) {
    const s = e.x - g.offset.x, i = e.y - g.offset.y;
    g.thing.moveBy(s - g.thing.x, i - g.thing.y);
  }
}
function Ge(n) {
  p.releasePointerCapture(n.pointerId), F = !1, E.Meta || o.clearPos(), (g == null ? void 0 : g.thing) instanceof v && S().mergeAndAddImplicitConstraints(g.thing), g = null;
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Fe,
  onFrame: Re,
  render: Ye
}, Symbol.toStringTag, { value: "Module" }));
pe(document.getElementById("canvas"));
const dt = new URLSearchParams(window.location.search).get("tablet") ? $e : Ke;
dt.init();
function le() {
  dt.onFrame(), ee(), we(), dt.render(), ne(), requestAnimationFrame(le);
}
le();
window.app = Ve;
