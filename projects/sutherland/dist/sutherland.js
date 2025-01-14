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
  handleRadius: 7,
  closeEnough: 7,
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
const Se = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(j(n, t));
}
function j(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Kt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const K = Object.freeze({ x: 0, y: 0 });
function _t({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function mt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = e * s, r = e * i;
  return { x: a + t.x, y: r + t.y };
}
function yt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = Math.sin(e), r = Math.cos(e), c = s * r - i * a, M = s * a + i * r;
  return { x: c + t.x, y: M + t.y };
}
function Qt(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const a of n)
    t = Math.min(t, a.x), e = Math.max(e, a.x), s = Math.min(s, a.y), i = Math.max(i, a.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function Jt(n, t, e) {
  return Math.sqrt(Ae(n, t, e));
}
function Ae(n, t, e) {
  const s = j(t, e);
  if (s == 0)
    return j(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return j(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function Pe(n) {
  return 1 - Math.pow(1 - n, 5);
}
let g, h, Nt = !1;
function Me(n) {
  g = n, h = g.getContext("2d"), Zt(), Nt = !0;
}
function Zt() {
  if (g.width = innerWidth, g.height = innerHeight, devicePixelRatio !== 1) {
    const n = g.width, t = g.height;
    g.width = n * devicePixelRatio, g.height = t * devicePixelRatio, g.style.width = n + "px", g.style.height = t + "px", h.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Zt);
let B = "", te = 0;
function y(n) {
  Nt && (B = n, te = Date.now());
}
function ke() {
  if (h.clearRect(0, 0, g.width, g.height), h.lineWidth = d.lineWidth, h.lineCap = "round", B.length > 0) {
    h.font = "40px Monaco";
    const t = h.measureText(B).width, e = Date.now() - te;
    if (e > d.statusTimeMillis)
      B = "";
    else {
      const s = 1 - Pe(e / d.statusTimeMillis);
      h.fillStyle = `rgba(255,222,33,${s})`, h.fillText(B, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function nt(n) {
  return n;
}
function ee(n, t = E(), e = nt) {
  const s = e(n);
  h.fillStyle = t, h.beginPath(), h.arc(s.x, s.y, h.lineWidth * 2, 0, Se), h.fill();
}
function z(n, t, e = E(), s = nt) {
  const i = h.lineWidth;
  n.x === t.x && n.y === t.y && (h.lineWidth *= 2), h.strokeStyle = e, h.beginPath();
  const a = s(n), r = s(t);
  h.moveTo(a.x, a.y), h.lineTo(r.x, r.y), h.stroke(), h.lineWidth = i;
}
function ne(n, t, e, s = E(), i = nt) {
  const a = i(t), r = i(e), c = i(n);
  h.beginPath(), h.strokeStyle = s;
  const M = Math.atan2(a.y - c.y, a.x - c.x), V = Math.atan2(r.y - c.y, r.x - c.x);
  h.arc(c.x, c.y, w(c, a), M, V), h.stroke();
}
function se(n, t, e = E(), s = nt) {
  h.fillStyle = e;
  const i = 12;
  h.font = `${i}px Major Mono Display`;
  const a = h.measureText(t).width, { x: r, y: c } = s(n);
  h.fillText(t, r - a / 2, c + i / 2);
}
function E(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= d.baseAlphaMultiplier, `rgba(255,255,255,${d.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let I = 1;
const T = { x: 0, y: 0 }, u = {
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
      x: (n - T.x) * I + innerWidth / 2,
      y: -(t - T.y) * I + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / I + T.x,
      y: T.y - (t - innerHeight / 2) / I
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
      this.handles[s], this.handles.forEach((i, a) => {
        i === t && (this.handles[a] = e);
      });
  }
}
class ft extends P {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e) {
    return new ft(e.get(this.p), this.pos);
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
class gt extends P {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new gt(e.get(this.a), e.get(this.b));
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
class _ extends P {
  constructor(t, e) {
    super([], [t, e]), this.distance = w(t, e);
  }
  map(t, e) {
    return new _(e.get(this.a), e.get(this.b));
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
class st extends P {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new st(
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
    return Jt(this.p, this.a, this.b);
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
    return w(this.p, this.c) - w(this.a, this.c);
  }
}
class it extends P {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new it(
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
      _t(
        mt(
          yt(this.masterPoint, K, this.instance.angle),
          K,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class Q extends P {
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
class pt extends P {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new pt(e.get(this.a));
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
class Rt {
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
    this.forEach((a) => a.preRelax());
    const e = u.scale > 0 ? 1 / u.scale : 1, s = d.minWorthwhileErrorImprovement * e;
    let i = !1;
    for (const a of t)
      i = this.relaxWithVar(a, e, s) || i;
    return i;
  }
  relaxWithVar(t, e, s) {
    const i = t.value, a = this.computeError() - s;
    t.value = i + e;
    const r = this.computeError();
    t.value = i - e;
    const c = this.computeError();
    return r < Math.min(a, c) ? (t.value = i + e, !0) : c < Math.min(a, r) ? (t.value = i - e, !0) : (t.value = i, !1);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class D {
  constructor(t) {
    this.value = t;
  }
}
const tt = class tt {
  constructor({ x: t, y: e }) {
    this.id = tt.nextId++, this.xVar = new D(t), this.yVar = new D(e);
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
    return w(t, this) <= d.closeEnough;
  }
  distanceTo(t) {
    return w(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = d.instanceSideAttacherColor) {
    d.debug && se(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), ee(this, e, t);
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
tt.nextId = 0;
let v = tt;
class C {
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
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= d.closeEnough;
  }
  distanceTo(t) {
    return Jt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    if (this.isGuide && !d.showGuideLines)
      return;
    const e = this.isGuide ? d.guideLineColor : E();
    z(this.a, this.b, e, t);
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
class U {
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
    return this.distanceTo(t) <= d.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(w(t, this.c) - w(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    ne(this.c, this.a, this.b, E(), t);
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
const et = class et {
  constructor(t, e, s, i, a, r) {
    this.master = t, this.transform = (c) => _t(mt(yt(c, K, this.angle), K, this.scale), this), this.id = et.nextId++, this.attachers = [], this.xVar = new D(e), this.yVar = new D(s), this.angleAndSizeVecX = new D(i * Math.cos(a)), this.angleAndSizeVecY = new D(i * Math.sin(a)), this.addAttachers(t, r);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new v(this.transform(t));
    this.attachers.push(s), e.constraints.add(new it(s, this, t));
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
    return Qt(s);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e = 0) {
    this.master.render((s) => t(this.transform(s)), e + 1), e === 1 && this.attachers.forEach((s, i) => {
      const a = t(s);
      z(
        t(this.transform(this.master.attachers[i])),
        a,
        d.instanceSideAttacherColor
      ), ee(a, d.instanceSideAttacherColor);
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
et.nextId = 0;
let b = et;
class ie {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Rt();
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
    }), e === 0 && (this.attachers.forEach((s) => s.render(t, d.masterSideAttacherColor)), this.constraints.forEach((s) => {
      if (s instanceof _) {
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
  addInstance(t, { x: e, y: s }, i, a) {
    if (t === this)
      return null;
    const r = new b(t, e, s, i, a, this);
    return this.things.push(r), r;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: a, y: r } = mt(i, s, e);
      i.x = a, i.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: a, y: r } = yt(i, s, e);
      i.x = a, i.y = r;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const a = new C(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b));
    for (const r of this.things)
      r.forEachHandle((c) => {
        c !== a.a && c !== a.b && a.contains(c) && this.constraints.add(new $(c, a.a, a.b));
      });
    return this.things.push(a), a;
  }
  addArc(t, e, s, i = !0) {
    const a = new U(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(a.c), this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b)), this.constraints.add(new st(a.a, a.c, a.b, a.c));
    for (const r of this.things)
      r.forEachHandle((c) => {
        c !== a.a && c !== a.b && c !== a.c && a.contains(c) && this.constraints.add(new F(c, a.a, a.b, a.c));
      });
    return this.things.push(a), a;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.things)
      s.forEachHandle((i) => {
        i !== t && i.contains(t) && (this.replaceHandle(i, t), e.add(s));
      });
    for (const s of this.things)
      e.has(s) || !s.contains(t) || (s instanceof C ? (this.constraints.add(new $(t, s.a, s.b)), d.showImplicitConstraints && y("(point on line)")) : s instanceof U && (this.constraints.add(new F(t, s.a, s.b, s.c)), d.showImplicitConstraints && y("(point on arc)")));
  }
  replaceHandle(t, e) {
    this.things.forEach((s) => s.replaceHandle(t, e)), this.attachers = this.attachers.map((s) => s === t ? e : s), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    return e.size === 0 ? !1 : (this.things = this.things.filter((s) => !e.has(s)), !0);
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new ft(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new pt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof C && (this.constraints.add(new _(i.a, i.b)), s = !0);
    return s;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof C && (this.constraints.add(new gt(i.a, i.b)), s = !0);
    return s;
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
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof C) {
        const c = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        i.set(r.a, c.a), i.set(r.b, c.b);
      } else if (r instanceof U) {
        const c = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c)
        );
        i.set(r.a, c.a), i.set(r.b, c.b), i.set(r.c, c.c);
      } else if (r instanceof b) {
        const c = this.addInstance(
          r.master,
          t.transform(r),
          // move the center to the right place
          t.scale * r.size,
          t.angle + r.angle
        );
        a.set(r, c);
      } else
        throw new Error("unsupported thing type: " + r.constructor.name);
    s.forEach((r) => {
      this.constraints.add(r.map(a, i));
    }), this.things = this.things.filter((r) => r !== t);
  }
  snap(t, e) {
    const s = this.handleAt(t, e);
    if (s)
      return t.x = s.x, t.y = s.y, "handle";
    const i = new Rt(), a = new v(t), r = /* @__PURE__ */ new Set();
    a.forEachVar((c) => r.add(c));
    for (const c of this.things)
      c === e || !c.contains(t) || (c instanceof C ? i.add(new $(a, c.a, c.b)) : c instanceof U && i.add(new F(a, c.a, c.b, c.c)));
    if (i.isEmpty())
      return null;
    for (; i.relax(r); )
      ;
    return t.x = a.x, t.y = a.y, "constraints";
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const a of this.things)
      a.forEachHandle((r) => {
        if (r !== e && r.contains(t)) {
          const c = w(t, r);
          c < s && (i = r, s = c);
        }
      });
    return i;
  }
  thingAt(t) {
    let e = 1 / 0, s = null;
    for (const i of this.things)
      if (i.contains(t)) {
        const a = i.distanceTo(t);
        a < e && (s = i, e = a);
      }
    return s;
  }
  leave() {
    this.center();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), s = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const a of this.getPositions())
      a.x += s, a.y += i;
  }
  boundingBox() {
    const t = [...this.getPositions()];
    for (const e of this.things)
      if (e instanceof b) {
        const s = e.boundingBox();
        t.push(s.topLeft), t.push(s.bottomRight);
      }
    return Qt(t);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: s } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(s, 2));
    return Math.sqrt(t) * 2;
  }
  // TODO: simplify
  thingsForOperation(t) {
    const e = this.thingAt(t);
    return e ? /* @__PURE__ */ new Set([e]) : /* @__PURE__ */ new Set();
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
      i.forEachHandle((a) => {
        s++ === t && (e = a);
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
      if (s instanceof it && s.masterPoint === e) {
        const { instance: i, instancePoint: a } = s;
        i.attachers = i.attachers.filter((r) => r !== a), this.constraints.remove(s);
      }
    });
  }
  write(t, e = 1) {
    let s = null;
    Yt(t, e, (i, a, r) => {
      const c = this.addInstance(i, { x: a, y: u.center.y }, i.size * r, 0);
      this.constraints.add(new Q(c, r)), s && this.replaceHandle(c.attachers[0], s.attachers[1]), s = c;
    });
  }
  drawText(t, e, s) {
    Yt(
      t,
      e,
      (i, a, r) => i.render(
        ({ x: c, y: M }) => ({
          x: c * r + a - u.center.x + s.x,
          y: -M * r + s.y
        }),
        1
      )
    );
  }
}
const ze = {
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
}, Ve = 1, Ie = {
  data: ze,
  version: Ve
};
function Te(n, t, e = d.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = ot(s.start, e), a = ot(s.end, e);
        n.addLine(i, a, !1, !1);
        break;
      }
      case "arc": {
        const i = ot(s.center, e), a = s.radius * e;
        n.addArc(
          Xt(i, s.end, a),
          Xt(i, s.start, a),
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
const Ce = new Map(Ie.data.values), at = /* @__PURE__ */ new Map();
for (const [n, t] of Ce) {
  const e = new ie();
  Te(e, t, d.fontScale);
  const s = e.addLine(
    { x: -d.kerning * d.fontScale, y: 0 },
    { x: (4 + d.kerning) * d.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), at.set(n, e);
}
function Yt(n, t, e) {
  const s = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), i = (r) => s(r) * d.fontScale * (4 + d.kerning * 2);
  let a = u.center.x - 0.5 * [...n].map(i).reduce((r, c) => r + c, 0);
  for (let r = 0; r < n.length; r++) {
    const c = n[r], M = s(c), V = at.get(c.toUpperCase());
    V && e(V, a, M), a += i(c);
  }
}
function ot({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Xt({ x: n, y: t }, e, s) {
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
    return k ? l.snap(k, n) : null;
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
const H = {};
for (let n = 1; n < 10; n++)
  H["" + n] = new ie();
let l = H[1];
window.drawing = l;
function S(n) {
  return n ? H[n] ?? at.get(n) : l;
}
function wt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, X(() => u.reset()), rt(), y("drawing #" + n));
}
const ct = [...Object.values(H), ...at.values()];
let x = null;
function bt() {
  if (!o.pos)
    return;
  const n = { x: o.pos.x, y: o.pos.y };
  (x == null ? void 0 : x.type) === "line" && l.addLine(x.start, n), x = {
    type: "line",
    start: n
  };
}
function vt() {
  (x == null ? void 0 : x.type) === "line" && (x = null);
}
function Et() {
  if (o.pos && ((x == null ? void 0 : x.type) !== "arc" && (x = { type: "arc", positions: [] }), x.positions.push({ x: o.pos.x, y: o.pos.y }), x.positions.length === 3)) {
    const [n, t, e] = x.positions;
    l.addArc(t, e, n), x = null;
  }
}
function St() {
  (x == null ? void 0 : x.type) === "arc" && (x = null);
}
function ae(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(H))
    s.onAttacherRemoved(n, t);
}
function Le(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(H))
    e.onAttacherAdded(n, t);
}
function re() {
  if (d.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function oe() {
  !x && l.isEmpty() && De(), He(), l.render(), Be(), We();
}
function De() {
  const n = innerWidth / 100, t = (e, s) => z(e, s, E(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function He() {
  switch (x == null ? void 0 : x.type) {
    case "line":
      o.pos && z(x.start, o.pos, E(), u.toScreenPosition);
      break;
    case "arc":
      x.positions.length > 1 && o.pos && ne(
        x.positions[0],
        x.positions[1],
        o.pos,
        E(),
        u.toScreenPosition
      );
      break;
  }
}
function Be() {
  if (!o.pos)
    return;
  const n = u.toScreenPosition(o.pos);
  z(
    { x: n.x - d.crosshairsSize, y: n.y },
    { x: n.x + d.crosshairsSize, y: n.y },
    E("bold")
  ), z(
    { x: n.x, y: n.y - d.crosshairsSize },
    { x: n.x, y: n.y + d.crosshairsSize },
    E("bold")
  );
}
function We() {
  if (!d.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  z({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, d.axisColor), z({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, d.axisColor);
  const t = o.pos;
  t && se(u.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function At() {
  return o.pos ? l.handleAt(o.pos) : null;
}
function q() {
  return o.pos ? l.thingAt(o.pos) : null;
}
function ht() {
  const n = q();
  return n instanceof C ? n : null;
}
function ce() {
  const n = q();
  return n instanceof b ? n : null;
}
function Pt() {
  l.isEmpty() || (y("solve"), l.relax());
}
function Mt() {
  d.autoSolve = !d.autoSolve, y(`auto-solve ${d.autoSolve ? "on" : "off"}`);
}
function kt() {
  o.pos && l.delete(o.pos) && (y("delete"), le(), l.isEmpty() && X(() => u.reset()));
}
function zt() {
  o.pos && l.fixedDistance(o.pos) && y("fixed distance");
}
function Vt() {
  return o.pos && l.fixedPoint(o.pos) ? (y("fixed point"), !0) : !1;
}
function It() {
  o.pos && l.weight(o.pos) && y("weight");
}
function Tt() {
  o.pos && l.horizontalOrVertical(o.pos) && y("HorV");
}
function Ct() {
  o.pos && l.fullSize(o.pos) && y("full size");
}
function de() {
  const n = o.pos;
  n && (y("re-center"), X(() => {
    u.centerAt(n);
  }));
}
function Lt(n) {
  const t = S(n);
  !t.isEmpty() && o.pos && (y("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function Dt() {
  o.pos && l.dismember(o.pos) && (y("dismember"), le());
}
function J(n) {
  return !!o.pos && l.rotateInstanceAt(o.pos, n);
}
function N(n) {
  return !!o.pos && l.resizeInstanceAt(o.pos, n);
}
function Ht() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (ae(l, n), y("remove attacher")) : (Le(l, n), y("add attacher")));
}
let W = null;
function Bt() {
  if (!W) {
    (W = ht()) && y("equal length");
    return;
  }
  const n = ht();
  n && (S().constraints.add(
    new st(W.a, W.b, n.a, n.b)
  ), y("equal length"));
}
function rt() {
  W = null;
}
function ut(n) {
  X(() => u.scale = n), y("scale=" + u.scale.toFixed(1));
}
function Wt(n, t) {
  X(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function le() {
  for (; $e(); )
    ;
}
function $e() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of ct)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of ct) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (ae(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of ct)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: kt,
  dismember: Dt,
  drawing: S,
  endArc: St,
  endEqualLength: rt,
  endLines: vt,
  fixedDistance: zt,
  fixedPoint: Vt,
  fullSize: Ct,
  handle: At,
  horizontalOrVertical: Tt,
  instance: ce,
  instantiate: Lt,
  line: ht,
  moreArc: Et,
  moreEqualLength: Bt,
  moreLines: bt,
  onFrame: re,
  panBy: Wt,
  pen: o,
  reCenter: de,
  render: oe,
  rotateInstanceBy: J,
  scaleInstanceBy: N,
  setScale: ut,
  solve: Pt,
  switchToDrawing: wt,
  thing: q,
  toggleAttacher: Ht,
  toggleAutoSolve: Mt,
  weight: It
}, Symbol.toStringTag, { value: "Module" }));
var Gt;
const qt = (Gt = window.webkit) == null ? void 0 : Gt.messageHandlers, Oe = window.webkit != null;
function Re(n, t = n) {
  Oe && (y(qt[n]), qt[n].postMessage(t));
}
let O = [], dt = !1;
function Ye() {
  const n = O;
  return O = [], n;
}
function Ut(n) {
  for (const t of n)
    (!t.predicted || d.usePredictedEvents) && O.push(t);
}
function $t(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (dt = !0), t === "ended" && (dt = !1), !(t === "moved" && !dt) && O.push({
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
function Xe() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", he), O = [];
}
window.onpointerdown = (n) => $t(n, "began");
window.onpointermove = (n) => $t(n, "moved");
window.onpointerup = (n) => $t(n, "ended");
const he = (n) => n.preventDefault();
window.addEventListener("touchstart", he, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Ut, Xe(), Ut(n);
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
const ue = new m("MOVE"), xe = new m("SOLVE"), Ft = new m("EQ"), me = [
  new m("1"),
  new m("2"),
  new m("3"),
  new m("LINE"),
  ue,
  new m("HORV"),
  new m("SIZE"),
  new m("DISM"),
  new m("DEL"),
  xe
], ye = [
  new m("4"),
  new m("5"),
  new m("6"),
  new m("ARC"),
  Ft,
  new m("FIX"),
  new m("weight"),
  new m("ATT"),
  new m("CLEAR"),
  new m("AUTO")
], fe = [new m("reload")], Ot = [...me, ...ye, ...fe];
function qe() {
}
function Ue() {
  Ge(), xe.isDown && Pt();
}
function je() {
  lt(0, me), lt(d.tablet.buttonWidth, ye), lt(innerWidth - d.tablet.buttonWidth, fe);
  for (const n of Ot)
    n.render();
}
function lt(n, t) {
  let e = 0;
  for (const s of t)
    s.leftX = n, s.topY = e * s.height, e++;
}
function Ge() {
  for (const n of Ye())
    switch (n.type) {
      case "pencil":
        n.phase === "began" ? Ke(n.position, n.pressure) : n.phase === "moved" ? _e(n.position, n.pressure) : n.phase === "ended" && Ze(n.position);
        break;
      case "finger":
        n.phase === "began" ? tn(n.position, n.id) : n.phase === "moved" ? sn(n.position, n.id) : n.phase === "ended" && an(n.position, n.id);
    }
}
let G = !1, p = null;
function Ke(n, t) {
  o.moveToScreenPos(n), ue.isDown && Z();
}
function _e(n, t) {
  o.moveToScreenPos(n), Qe();
  const e = { x: o.pos.x, y: o.pos.y };
  if (p) {
    const s = e.x - p.offset.x, i = e.y - p.offset.y;
    p.thing.moveBy(s - p.thing.x, i - p.thing.y);
  }
  !G && t > 3 && (G = !0, Ne()), G && t < 1 && ge();
}
let jt = null;
function Qe() {
  const n = o.snapPos(p == null ? void 0 : p.thing);
  n !== jt && (jt = n, Je());
}
function Je() {
  Re("hapticImpact");
}
function ge() {
  G = !1, (p == null ? void 0 : p.thing) instanceof v && S().mergeAndAddImplicitConstraints(p.thing), p = null;
}
function Ne() {
  Ft.isDown && Bt();
}
function Ze(n) {
  o.clearPos(), ge(), vt(), St();
}
const L = /* @__PURE__ */ new Map();
function tn(n, t) {
  for (const e of Ot)
    if (e.contains(n)) {
      e.fingerId = t, en(e);
      return;
    }
  L.set(t, n);
}
function en(n) {
  const t = n.label.toLowerCase();
  if ("1" <= t && t <= "9") {
    o.pos ? (Lt(n.label), Z()) : wt(n.label);
    return;
  }
  switch (t) {
    case "clear":
      S().clear(), u.reset();
      break;
    case "line":
      bt();
      break;
    case "arc":
      Et();
      break;
    case "move":
      Z();
      break;
    case "horv":
      Tt();
      break;
    case "fix":
      Vt() || zt();
      break;
    case "size":
      Ct();
      break;
    case "weight":
      It();
      break;
    case "dism":
      Dt();
      break;
    case "att":
      Ht();
      break;
    case "del":
      kt();
      break;
    case "auto":
      Mt();
      break;
    case "reload":
      location.reload();
      break;
  }
}
function nn(n) {
  n === Ft && rt();
}
function Z() {
  const n = At();
  if (n) {
    p = { thing: n, offset: { x: 0, y: 0 } };
    return;
  }
  const t = q();
  t && (p = { thing: t, offset: Kt(o.pos, t) });
}
function sn(n, t) {
  if (S().isEmpty() || L.size > 2)
    return;
  const e = L.get(t);
  if (!e)
    return;
  L.set(t, n);
  const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
  if (o.pos || Wt(s.x - i.x, s.y - i.y), L.size !== 2)
    return;
  let a = null;
  for (const [ve, Ee] of L.entries())
    if (ve !== t) {
      a = Ee;
      break;
    }
  if (!a)
    throw new Error("bruh?!");
  const r = u.fromScreenPosition(a), c = w(r, i), V = w(r, s) / c, we = Math.atan2(i.y - r.y, i.x - r.x), be = Math.atan2(s.y - r.y, s.x - r.x);
  ce() && !p && Z(), !N(V) && !o.pos && (u.scale *= V), J(be - we);
}
function an(n, t) {
  for (const e of Ot)
    e.fingerId === t && (nn(e), e.fingerId = null);
  L.delete(t);
}
const rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: qe,
  onFrame: Ue,
  render: je
}, Symbol.toStringTag, { value: "Module" })), A = {};
let R = !1, Y = !1, f = null;
function on() {
  window.addEventListener("keydown", ln), window.addEventListener("keyup", hn), g.addEventListener("pointerdown", un), g.addEventListener("pointermove", xn), g.addEventListener("pointerup", mn);
}
function cn() {
  A[" "] && Pt();
}
function dn() {
}
function ln(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Lt(t) : wt(t);
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
      Mt();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        kt();
        break;
      case "l":
        zt();
        break;
      case ".":
        Vt();
        break;
      case "W":
        It();
        break;
      case "h":
        Tt();
        break;
      case "=":
        N(1.05) || ut(Math.min(u.scale + 0.1, 10));
        break;
      case "-":
        N(0.95) || ut(Math.max(u.scale - 0.1, 0.1));
        break;
      case "q":
        J(5 * Math.PI / 180);
        break;
      case "w":
        J(-5 * Math.PI / 180);
        break;
      case "s":
        Ct();
        break;
      case "A":
        Ht();
        break;
      case "c":
        de();
        break;
      case "D":
        Dt();
        break;
    }
}
function hn(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      vt(), Y = !1, R || o.clearPos();
      break;
    case "a":
      St(), Y = !1, R || o.clearPos();
      break;
    case "e":
      rt();
      break;
  }
}
function un(n) {
  if (g.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), R = !0, A.Meta) {
    bt(), Y = !0;
    return;
  } else if (A.a) {
    Et(), Y = !0;
    return;
  } else if (A.e) {
    Bt();
    return;
  }
  f = null;
  const t = At();
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = q();
  e && (f = { thing: e, offset: Kt(o.pos, e) });
}
function xn(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (R && t && !S().isEmpty() && !Y && !f) {
    Wt(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(f == null ? void 0 : f.thing), f) {
    const s = e.x - f.offset.x, i = e.y - f.offset.y;
    f.thing.moveBy(s - f.thing.x, i - f.thing.y);
  }
}
function mn(n) {
  g.releasePointerCapture(n.pointerId), R = !1, A.Meta || o.clearPos(), (f == null ? void 0 : f.thing) instanceof v && S().mergeAndAddImplicitConstraints(f.thing), f = null;
}
const yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: on,
  onFrame: cn,
  render: dn
}, Symbol.toStringTag, { value: "Module" }));
Me(document.getElementById("canvas"));
const xt = new URLSearchParams(window.location.search).get("tablet") ? rn : yn;
xt.init();
function pe() {
  xt.onFrame(), re(), ke(), xt.render(), oe(), requestAnimationFrame(pe);
}
pe();
window.app = Fe;
