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
const Ae = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(G(n, t));
}
function G(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function mt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const Q = Object.freeze({ x: 0, y: 0 });
function Gt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function yt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = e * s, r = e * i;
  return { x: a + t.x, y: r + t.y };
}
function ft(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = Math.sin(e), r = Math.cos(e), c = s * r - i * a, M = s * a + i * r;
  return { x: c + t.x, y: M + t.y };
}
function Kt(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const a of n)
    t = Math.min(t, a.x), e = Math.max(e, a.x), s = Math.min(s, a.y), i = Math.max(i, a.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function Qt(n, t, e) {
  return Math.sqrt(Pe(n, t, e));
}
function Pe(n, t, e) {
  const s = G(t, e);
  if (s == 0)
    return G(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return G(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function Me(n) {
  return 1 - Math.pow(1 - n, 5);
}
let g, h, _t = !1;
function ke(n) {
  g = n, h = g.getContext("2d"), Jt(), _t = !0;
}
function Jt() {
  if (g.width = innerWidth, g.height = innerHeight, devicePixelRatio !== 1) {
    const n = g.width, t = g.height;
    g.width = n * devicePixelRatio, g.height = t * devicePixelRatio, g.style.width = n + "px", g.style.height = t + "px", h.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Jt);
let W = "", Nt = 0;
function m(n) {
  _t && (W = n, Nt = Date.now());
}
function ze() {
  if (h.clearRect(0, 0, g.width, g.height), h.lineWidth = d.lineWidth, h.lineCap = "round", W.length > 0) {
    h.font = "40px Monaco";
    const t = h.measureText(W).width, e = Date.now() - Nt;
    if (e > d.statusTimeMillis)
      W = "";
    else {
      const s = 1 - Me(e / d.statusTimeMillis);
      h.fillStyle = `rgba(255,222,33,${s})`, h.fillText(W, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function st(n) {
  return n;
}
function Zt(n, t = E(), e = st) {
  const s = e(n);
  h.fillStyle = t, h.beginPath(), h.arc(s.x, s.y, h.lineWidth * 2, 0, Ae), h.fill();
}
function V(n, t, e = E(), s = st) {
  const i = h.lineWidth;
  n.x === t.x && n.y === t.y && (h.lineWidth *= 2), h.strokeStyle = e, h.beginPath();
  const a = s(n), r = s(t);
  h.moveTo(a.x, a.y), h.lineTo(r.x, r.y), h.stroke(), h.lineWidth = i;
}
function te(n, t, e, s = E(), i = st) {
  const a = i(t), r = i(e), c = i(n);
  h.beginPath(), h.strokeStyle = s;
  const M = Math.atan2(a.y - c.y, a.x - c.x), I = Math.atan2(r.y - c.y, r.x - c.x);
  h.arc(c.x, c.y, w(c, a), M, I), h.stroke();
}
function ee(n, t, e = E(), s = st) {
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
let T = 1;
const C = { x: 0, y: 0 }, u = {
  reset() {
    T = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return T;
  },
  set scale(n) {
    T = n;
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
      x: (n - C.x) * T + innerWidth / 2,
      y: -(t - C.y) * T + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / T + C.x,
      y: C.y - (t - innerHeight / 2) / T
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
class gt extends P {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e) {
    return new gt(e.get(this.p), this.pos);
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
class pt extends P {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new pt(e.get(this.a), e.get(this.b));
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
    return Qt(this.p, this.a, this.b);
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
      Gt(
        yt(
          ft(this.masterPoint, Q, this.instance.angle),
          Q,
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
class wt extends P {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new wt(e.get(this.a));
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
class Ot {
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
class L {
  constructor(t) {
    this.value = t;
  }
}
const et = class et {
  constructor({ x: t, y: e }) {
    this.id = et.nextId++, this.xVar = new L(t), this.yVar = new L(e);
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
  render(t, e, s = d.instanceSideAttacherColor) {
    d.debug && ee(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), Zt(this, s, e);
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
et.nextId = 0;
let v = et;
class z {
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
    return Qt(t, this.a, this.b);
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
  render(t, e) {
    te(
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
const nt = class nt {
  constructor(t, e, s, i, a, r) {
    this.master = t, this.transform = (c) => Gt(yt(ft(c, Q, this.angle), Q, this.scale), this), this.id = nt.nextId++, this.attachers = [], this.xVar = new L(e), this.yVar = new L(s), this.angleAndSizeVecX = new L(i * Math.cos(a)), this.angleAndSizeVecY = new L(i * Math.sin(a)), this.addAttachers(t, r);
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
    return Kt(s);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => e(this.transform(i)), s + 1), s === 1 && this.attachers.forEach((i, a) => {
      const r = e(i);
      V(
        e(this.transform(this.master.attachers[a])),
        r,
        d.instanceSideAttacherColor
      ), Zt(r, d.instanceSideAttacherColor);
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
nt.nextId = 0;
let b = nt;
class ne {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Ot(), this.selection = /* @__PURE__ */ new Set();
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
      const { x: a, y: r } = yt(i, s, e);
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
      const { x: a, y: r } = ft(i, s, e);
      i.x = a, i.y = r;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const a = new z(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b));
    for (const r of this.things)
      r.forEachHandle((c) => {
        c !== a.a && c !== a.b && a.contains(c) && this.constraints.add(new $(c, a.a, a.b));
      });
    return this.things.push(a), a;
  }
  addArc(t, e, s, i = !0) {
    const a = new U(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(a.c), this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b)), this.constraints.add(new O(a.a, a.c, a.b, a.c));
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
      e.has(s) || !s.contains(t) || (s instanceof z ? (this.constraints.add(new $(t, s.a, s.b)), d.showImplicitConstraints && m("(point on line)")) : s instanceof U && (this.constraints.add(new F(t, s.a, s.b, s.c)), d.showImplicitConstraints && m("(point on arc)")));
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
    return e ? (this.constraints.add(new gt(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new wt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let s = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(new _(i.a, i.b)), s = !0);
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
      i instanceof z && (this.constraints.add(new pt(i.a, i.b)), s = !0);
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
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof z) {
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
    const i = new Ot(), a = new v(t), r = /* @__PURE__ */ new Set();
    a.forEachVar((c) => r.add(c));
    for (const c of this.things)
      this.selection.has(c) || c === e || !c.contains(t) || (c instanceof z ? i.add(new $(a, c.a, c.b)) : c instanceof U && i.add(new F(a, c.a, c.b, c.c)));
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
    return Kt(t);
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
    Rt(t, e, (i, a, r) => {
      const c = this.addInstance(i, { x: a, y: u.center.y }, i.size * r, 0);
      this.constraints.add(new J(c, r)), s && this.replaceHandle(c.attachers[0], s.attachers[1]), s = c;
    });
  }
  drawText(t, e, s) {
    Rt(
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
const Ve = {
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
}, Ie = 1, Te = {
  data: Ve,
  version: Ie
};
function Ce(n, t, e = d.fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = rt(s.start, e), a = rt(s.end, e);
        n.addLine(i, a, !1, !1);
        break;
      }
      case "arc": {
        const i = rt(s.center, e), a = s.radius * e;
        n.addArc(
          Yt(i, s.end, a),
          Yt(i, s.start, a),
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
const De = new Map(Te.data.values), at = /* @__PURE__ */ new Map();
for (const [n, t] of De) {
  const e = new ne();
  Ce(e, t, d.fontScale);
  const s = e.addLine(
    { x: -d.kerning * d.fontScale, y: 0 },
    { x: (4 + d.kerning) * d.fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), at.set(n, e);
}
function Rt(n, t, e) {
  const s = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), i = (r) => s(r) * d.fontScale * (4 + d.kerning * 2);
  let a = u.center.x - 0.5 * [...n].map(i).reduce((r, c) => r + c, 0);
  for (let r = 0; r < n.length; r++) {
    const c = n[r], M = s(c), I = at.get(c.toUpperCase());
    I && e(I, a, M), a += i(c);
  }
}
function rt({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Yt({ x: n, y: t }, e, s) {
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
const B = {};
for (let n = 1; n < 10; n++)
  B["" + n] = new ne();
let l = B[1];
window.drawing = l;
function S(n) {
  return n ? B[n] ?? at.get(n) : l;
}
function bt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, X(() => u.reset()), m("drawing #" + n), window.drawing = l);
}
const ot = [...Object.values(B), ...at.values()];
let x = null;
function St() {
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
function At() {
  (x == null ? void 0 : x.type) === "arc" && (x = null);
}
function se(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(B))
    s.onAttacherRemoved(n, t);
}
function Le(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(B))
    e.onAttacherAdded(n, t);
}
function ie() {
  if (d.autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function ae() {
  !x && l.isEmpty() && He(), Be(), l.render(), We(), $e();
}
function He() {
  const n = innerWidth / 100, t = (e, s) => V(e, s, E(), u.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function Be() {
  switch (x == null ? void 0 : x.type) {
    case "line":
      o.pos && V(x.start, o.pos, E(), u.toScreenPosition);
      break;
    case "arc":
      x.positions.length > 1 && o.pos && te(
        x.positions[0],
        x.positions[1],
        o.pos,
        E(),
        u.toScreenPosition
      );
      break;
  }
}
function We() {
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
function $e() {
  if (!d.debug)
    return;
  const n = u.toScreenPosition({ x: 0, y: 0 });
  V({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, d.axisColor), V({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, d.axisColor);
  const t = o.pos;
  t && ee(u.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Pt() {
  return o.pos ? l.handleAt(o.pos) : null;
}
function q() {
  return o.pos ? l.thingAt(o.pos) : null;
}
function lt() {
  const n = q();
  return n instanceof z ? n : null;
}
function re() {
  const n = q();
  return n instanceof b ? n : null;
}
function Mt() {
  l.isEmpty() || (m("solve"), l.relax());
}
function kt() {
  d.autoSolve = !d.autoSolve, m(`auto-solve ${d.autoSolve ? "on" : "off"}`);
}
function zt() {
  o.pos && l.delete(o.pos) && (m("delete"), he(), l.isEmpty() && X(() => u.reset()));
}
function Vt() {
  o.pos && l.fixedDistance(o.pos) && m("fixed distance");
}
function It() {
  return o.pos && l.fixedPoint(o.pos) ? (m("fixed point"), !0) : !1;
}
function Tt() {
  o.pos && l.weight(o.pos) && m("weight");
}
function Ct() {
  o.pos && l.horizontalOrVertical(o.pos) && m("HorV");
}
function Dt() {
  o.pos && l.fullSize(o.pos) && m("full size");
}
function oe() {
  const n = o.pos;
  n && (m("re-center"), X(() => {
    u.centerAt(n);
  }));
}
function Lt(n) {
  const t = S(n);
  !t.isEmpty() && o.pos && (m("instantiate #" + n), l.addInstance(t, o.pos, 0.5 * t.size / u.scale, 0));
}
function Ht() {
  o.pos && l.dismember(o.pos) && (m("dismember"), he());
}
function N(n) {
  return !!o.pos && l.rotateInstanceAt(o.pos, n);
}
function Z(n) {
  return !!o.pos && l.resizeInstanceAt(o.pos, n);
}
function ht(n) {
  n ? l.toggleSelected(n) : o.pos && l.toggleSelections(o.pos);
}
function ce(n, t) {
  l.moveSelectionBy(n, t);
}
function de() {
  l.clearSelection();
}
function Bt() {
  if (!o.pos)
    return;
  const n = l.handleAt(o.pos);
  n && (l.attachers.includes(n) ? (se(l, n), m("remove attacher")) : (Le(l, n), m("add attacher")));
}
function le() {
  l.equalDistance() && m("equal length");
}
function ut(n) {
  X(() => u.scale = n), m("scale=" + u.scale.toFixed(1));
}
function Wt(n, t) {
  X(() => {
    u.center.x -= n, u.center.y -= t;
  });
}
function he() {
  for (; Fe(); )
    ;
}
function Fe() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of ot)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of ot) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (se(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of ot)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearSelection: de,
  del: zt,
  dismember: Ht,
  drawing: S,
  endArc: At,
  endLines: vt,
  equalLength: le,
  fixedDistance: Vt,
  fixedPoint: It,
  fullSize: Dt,
  handle: Pt,
  horizontalOrVertical: Ct,
  instance: re,
  instantiate: Lt,
  line: lt,
  moreArc: Et,
  moreLines: St,
  moveSelectionBy: ce,
  onFrame: ie,
  panBy: Wt,
  pen: o,
  reCenter: oe,
  render: ae,
  rotateInstanceBy: N,
  scaleInstanceBy: Z,
  setScale: ut,
  solve: Mt,
  switchToDrawing: bt,
  thing: q,
  toggleAttacher: Bt,
  toggleAutoSolve: kt,
  toggleSelected: ht,
  weight: Tt
}, Symbol.toStringTag, { value: "Module" }));
var jt;
const Xt = (jt = window.webkit) == null ? void 0 : jt.messageHandlers, Re = window.webkit != null;
function Ye(n, t = n) {
  Re && (m(Xt[n]), Xt[n].postMessage(t));
}
let R = [], ct = !1;
function Xe() {
  const n = R;
  return R = [], n;
}
function qt(n) {
  for (const t of n)
    (!t.predicted || d.usePredictedEvents) && R.push(t);
}
function $t(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (ct = !0), t === "ended" && (ct = !1), !(t === "moved" && !ct) && R.push({
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
function qe() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", ue), R = [];
}
window.onpointerdown = (n) => $t(n, "began");
window.onpointermove = (n) => $t(n, "moved");
window.onpointerup = (n) => $t(n, "ended");
const ue = (n) => n.preventDefault();
window.addEventListener("touchstart", ue, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = qt, qe(), qt(n);
};
class y {
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
const xe = new y("MOVE"), me = new y("SOLVE"), ye = [
  new y("1"),
  new y("2"),
  new y("3"),
  new y("LINE"),
  xe,
  new y("HORV"),
  new y("SIZE"),
  new y("DISM"),
  new y("DEL"),
  me
], fe = [
  new y("4"),
  new y("5"),
  new y("6"),
  new y("ARC"),
  new y("EQ"),
  new y("FIX"),
  new y("weight"),
  new y("ATT"),
  new y("CLEAR"),
  new y("AUTO")
], ge = [new y("reload")], Ft = [...ye, ...fe, ...ge];
function Ue() {
}
function je() {
  Ke(), me.isDown && Mt();
}
function Ge() {
  dt(0, ye), dt(d.tablet.buttonWidth, fe), dt(innerWidth - d.tablet.buttonWidth, ge);
  for (const n of Ft)
    n.render();
}
function dt(n, t) {
  let e = 0;
  for (const s of t)
    s.leftX = n, s.topY = e * s.height, e++;
}
function Ke() {
  for (const n of Xe())
    switch (n.type) {
      case "pencil":
        n.phase === "began" ? Qe(n.position, n.pressure) : n.phase === "moved" ? _e(n.position, n.pressure) : n.phase === "ended" && Ne(n.position);
        break;
      case "finger":
        n.phase === "began" ? Ze(n.position, n.id) : n.phase === "moved" ? en(n.position, n.id) : n.phase === "ended" && nn(n.position, n.id);
    }
}
let K = !1, p = null, j = null;
function Qe(n, t) {
  o.moveToScreenPos(n), xe.isDown && tt();
}
function _e(n, t) {
  o.pos && (o.pos.x, o.pos.y), o.moveToScreenPos(n), Je();
  const e = { x: o.pos.x, y: o.pos.y };
  if (p) {
    const s = e.x - p.offset.x, i = e.y - p.offset.y;
    p.thing.moveBy(s - p.thing.x, i - p.thing.y);
  }
  !K && t > 3 && (K = !0), K && t < 1 && pe();
}
let Ut = null;
function Je() {
  const n = o.snapPos(p == null ? void 0 : p.thing);
  n !== Ut && (Ut = n, Ye("hapticImpact"));
}
function pe() {
  K = !1, (p == null ? void 0 : p.thing) instanceof v && S().mergeAndAddImplicitConstraints(p.thing), p = null;
}
function Ne(n) {
  o.clearPos(), pe(), vt(), At();
}
const D = /* @__PURE__ */ new Map();
function Ze(n, t) {
  for (const e of Ft)
    if (e.contains(n)) {
      e.fingerId = t, tn(e);
      return;
    }
  D.set(t, n);
}
function tn(n) {
  const t = n.label.toLowerCase();
  if ("1" <= t && t <= "9") {
    o.pos ? (Lt(n.label), tt()) : bt(n.label);
    return;
  }
  switch (t) {
    case "clear":
      S().clear(), u.reset();
      break;
    case "line":
      St();
      break;
    case "arc":
      Et();
      break;
    case "move":
      tt();
      break;
    case "eq":
      if (!j) {
        j = lt(), m("selected line");
        break;
      }
      const e = lt();
      e && (S().constraints.add(new O(j.a, j.b, e.a, e.b)), m("equal length"));
      break;
    case "horv":
      Ct();
      break;
    case "fix":
      It() || Vt();
      break;
    case "size":
      Dt();
      break;
    case "weight":
      Tt();
      break;
    case "dism":
      Ht();
      break;
    case "att":
      Bt();
      break;
    case "del":
      zt();
      break;
    case "auto":
      kt();
      break;
    case "reload":
      location.reload();
      break;
  }
}
function tt() {
  const n = Pt();
  if (n) {
    p = { thing: n, offset: { x: 0, y: 0 } };
    return;
  }
  const t = q();
  t && (p = { thing: t, offset: mt(o.pos, t) });
}
function en(n, t) {
  if (S().isEmpty() || D.size > 2)
    return;
  const e = D.get(t);
  if (!e)
    return;
  D.set(t, n);
  const s = u.fromScreenPosition(n), i = u.fromScreenPosition(e);
  if (o.pos || Wt(s.x - i.x, s.y - i.y), D.size !== 2)
    return;
  let a = null;
  for (const [ve, Ee] of D.entries())
    if (ve !== t) {
      a = Ee;
      break;
    }
  if (!a)
    throw new Error("bruh?!");
  const r = u.fromScreenPosition(a), c = w(r, i), I = w(r, s) / c, be = Math.atan2(i.y - r.y, i.x - r.x), Se = Math.atan2(s.y - r.y, s.x - r.x);
  re() && !p && tt(), !Z(I) && !o.pos && (u.scale *= I), N(Se - be);
}
function nn(n, t) {
  for (const e of Ft)
    e.fingerId === t && (e.fingerId = null);
  D.delete(t);
}
const sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ue,
  onFrame: je,
  render: Ge
}, Symbol.toStringTag, { value: "Module" })), A = {};
let H = !1, Y = !1, f = null;
function an() {
  window.addEventListener("keydown", cn), window.addEventListener("keyup", dn), g.addEventListener("pointerdown", ln), g.addEventListener("pointermove", hn), g.addEventListener("pointerup", un);
}
function rn() {
  A[" "] && Mt();
}
function on() {
}
function cn(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Lt(t) : bt(t);
    return;
  }
  switch (n.key) {
    case "f":
      d.flicker = !d.flicker;
      return;
    case "d":
      d.debug = !d.debug, m(`debug ${d.debug ? "on" : "off"}`);
      return;
    case "S":
      kt();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        zt();
        break;
      case "l":
        Vt();
        break;
      case ".":
        It();
        break;
      case "W":
        Tt();
        break;
      case "e":
        le();
        break;
      case "h":
        Ct();
        break;
      case "=":
        Z(1.05) || ut(Math.min(u.scale + 0.1, 10));
        break;
      case "-":
        Z(0.95) || ut(Math.max(u.scale - 0.1, 0.1));
        break;
      case "q":
        N(5 * Math.PI / 180);
        break;
      case "w":
        N(-5 * Math.PI / 180);
        break;
      case "s":
        Dt();
        break;
      case "A":
        Bt();
        break;
      case "c":
        oe();
        break;
      case "D":
        Ht();
        break;
    }
}
function dn(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      vt(), Y = !1, H || o.clearPos();
      break;
    case "a":
      At(), Y = !1, H || o.clearPos();
      break;
  }
}
function ln(n) {
  if (g.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), o.moveToScreenPos(n), o.snapPos(), H = !0, A.Shift) {
    ht();
    return;
  } else if (A.Meta) {
    St(), Y = !0;
    return;
  } else if (A.a) {
    Et(), Y = !0;
    return;
  }
  f = null;
  const t = Pt();
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  de();
  const e = q();
  e instanceof b ? f = { thing: e, offset: mt(o.pos, e) } : e && ht(e);
}
function hn(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = o.pos ? { x: o.pos.x, y: o.pos.y } : null;
  o.moveToScreenPos(n);
  const e = { x: o.pos.x, y: o.pos.y };
  if (H && t && !S().isEmpty() && !Y && !f && S().selection.size === 0) {
    Wt(e.x - t.x, e.y - t.y);
    return;
  }
  if (o.snapPos(f == null ? void 0 : f.thing), H && t && S().selection.size > 0) {
    const s = mt(e, t);
    ce(s.x, s.y);
  }
  if (f) {
    const s = e.x - f.offset.x, i = e.y - f.offset.y;
    f.thing.moveBy(s - f.thing.x, i - f.thing.y);
  }
}
function un(n) {
  g.releasePointerCapture(n.pointerId), H = !1, A.Meta || o.clearPos(), (f == null ? void 0 : f.thing) instanceof v && S().mergeAndAddImplicitConstraints(f.thing), f = null;
}
const xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: an,
  onFrame: rn,
  render: on
}, Symbol.toStringTag, { value: "Module" }));
ke(document.getElementById("canvas"));
const xt = new URLSearchParams(window.location.search).get("tablet") ? sn : xn;
xt.init();
function we() {
  xt.onFrame(), ie(), ze(), xt.render(), ae(), requestAnimationFrame(we);
}
we();
window.app = Oe;
