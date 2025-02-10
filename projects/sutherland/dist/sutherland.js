const gt = {
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
  recursion: !1,
  maxDepth: 10,
  tabletButtonWidth: 100,
  lefty: !1
};
let V;
function Be() {
  V = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(gt));
  for (const [n, t] of Object.entries(gt))
    Object.hasOwn(V, n) || (V[n] = t);
}
function T(n) {
  V = { ...V, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Se() {
  V = JSON.parse(JSON.stringify(gt)), localStorage.setItem("config", JSON.stringify(V));
}
function a() {
  return V;
}
Be();
window.config = a;
const Y = Math.PI * 2;
function p(n, t) {
  return Math.sqrt(et(n, t));
}
function et(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function te(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const nt = Object.freeze({ x: 0, y: 0 });
function ee({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function Bt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = e * s, r = e * i;
  return { x: o + t.x, y: r + t.y };
}
function St(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = Math.sin(e), r = Math.cos(e), h = s * r - i * o, y = s * o + i * r;
  return { x: h + t.x, y: y + t.y };
}
function ne(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const o of n)
    t = Math.min(t, o.x), e = Math.max(e, o.x), s = Math.min(s, o.y), i = Math.max(i, o.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function se(n, t, e) {
  return Math.sqrt(ve(n, t, e));
}
function ve(n, t, e) {
  const s = et(t, e);
  if (s == 0)
    return et(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return et(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function _t(n) {
  return 1 - Math.pow(1 - n, 5);
}
let b, u;
function Pe(n) {
  b = n, u = b.getContext("2d"), ie();
}
function ie() {
  if (b.width = innerWidth, b.height = innerHeight, devicePixelRatio !== 1) {
    const n = b.width, t = b.height;
    b.width = n * devicePixelRatio, b.height = t * devicePixelRatio, b.style.width = n + "px", b.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", ie);
function Ee() {
  u.clearRect(0, 0, b.width, b.height), u.lineWidth = a().lineWidth, u.lineCap = "round";
}
function ct(n) {
  return n;
}
function X(n, t = E(), e = ct) {
  const s = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(s.x, s.y, u.lineWidth * 2, 0, Y), u.fill();
}
function z(n, t, e = E(), s = ct) {
  const i = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const o = s(n), r = s(t);
  u.moveTo(o.x, o.y), u.lineTo(r.x, r.y), u.stroke(), u.lineWidth = i;
}
function re(n, t, e, s, i = E(), o = ct) {
  const r = o(s < 0 ? t : e), h = o(s < 0 ? e : t), y = o(n), B = Math.atan2(r.y - y.y, r.x - y.x), R = Math.atan2(h.y - y.y, h.x - y.x), x = Math.abs(R - B) < 0.05, C = p(y, s < 0 ? r : h), I = Math.floor(Math.abs(s) / Y);
  u.strokeStyle = i;
  for (let tt = 0; tt < I - (x ? 1 : 0); tt++)
    u.beginPath(), u.arc(y.x, y.y, C, B, B + Y), u.stroke();
  u.beginPath(), u.arc(y.x, y.y, C, B, x ? B + Y : R), u.stroke();
}
function oe(n, t, e = E(), s = ct) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const o = u.measureText(t).width, { x: r, y: h } = s(n);
  u.fillText(t, r - o / 2, h + i / 2);
}
function E(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= a().baseAlphaMultiplier, `rgba(255,255,255,${a().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let L = 1;
const O = { x: 0, y: 0 }, d = {
  reset() {
    L = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return L;
  },
  set scale(n) {
    L = n;
  },
  centerAt({ x: n, y: t }) {
    O.x = n, O.y = t;
  },
  get center() {
    return O;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - O.x) * L + innerWidth / 2,
      y: -(t - O.y) * L + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / L + O.x,
      y: O.y - (t - innerHeight / 2) / L
    };
  }
};
let D = null, ae = 0;
function g(n) {
  D = typeof n == "string" ? { message: n } : n, ae = Date.now();
}
function Ae() {
  if (D === null)
    return;
  const n = Date.now() - ae;
  if (n > a().statusTimeMillis) {
    D = null;
    return;
  }
  if (D.message) {
    u.font = "40px Monaco";
    const e = u.measureText(D.message).width, s = 1 - _t(n / a().statusTimeMillis);
    u.fillStyle = `rgba(255,222,33,${s})`, u.fillText(D.message, (innerWidth - e) / 2, innerHeight - 40);
  }
  if (a().highlightReferents && D.referents) {
    const e = `rgba(255,222,33,${1 - _t(n / (0.5 * a().statusTimeMillis))})`;
    for (const s of D.referents)
      s.render(d.toScreenPosition, e, 2);
  }
}
class k {
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
      this.handles[s], this.handles.forEach((i, o) => {
        i === t && (this.handles[o] = e);
      });
  }
}
class vt extends k {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e, s) {
    return new vt(e.get(this.p), s(this.pos));
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
class Pt extends k {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new Pt(e.get(this.a), e.get(this.b));
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
class st extends k {
  constructor(t, e) {
    super([], [t, e]), this.distance = p(t, e);
  }
  map(t, e) {
    return new st(e.get(this.a), e.get(this.b));
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
class ht extends k {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new ht(
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
class _ extends k {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new _(
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
    return se(this.p, this.a, this.b);
  }
}
class J extends k {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new J(
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
class lt extends k {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new lt(
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
      ee(
        Bt(
          St(this.masterPoint, nt, this.instance.angle),
          nt,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class dt extends k {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new dt(t.get(this.instance), this.scale);
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class Et extends k {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new Et(e.get(this.a));
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
    return this.y0 - a().weight - this.a.y;
  }
}
class Jt {
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
    this.forEach((o) => o.preRelax());
    const e = d.scale > 0 ? 1 / d.scale : 1, s = a().minWorthwhileErrorImprovement * e;
    let i = !1;
    for (const o of t)
      i = this.relaxWithVar(o, e, s) || i;
    return i;
  }
  relaxWithVar(t, e, s) {
    const i = t.value, o = this.computeError() - s;
    t.value = i + e;
    const r = this.computeError();
    t.value = i - e;
    const h = this.computeError();
    return r < Math.min(o, h) ? (t.value = i + e, !0) : h < Math.min(o, r) ? (t.value = i - e, !0) : (t.value = i, !1);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class F {
  constructor(t) {
    this.value = t;
  }
}
const ot = class ot {
  constructor({ x: t, y: e }) {
    this.id = ot.nextId++, this.xVar = new F(t), this.yVar = new F(e);
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
    return p(t, this) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return p(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = a().instanceSideAttacherColor) {
    a().debug && oe(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), X(this, e, t);
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
ot.nextId = 0;
let P = ot;
class H {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new P(t), this.b = new P(e);
  }
  get x() {
    return (this.a.x + this.b.x) / 2;
  }
  get y() {
    return (this.a.y + this.b.y) / 2;
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return se(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !a().showGuideLines)
      return;
    const s = this.isGuide ? a().guideLineColor : e ?? E();
    z(this.a, this.b, s, t);
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
class j {
  constructor(t, e, s, i) {
    this.a = new P(t), this.b = p(t, e) === 0 ? this.a : new P(e), this.c = new P(s), this.cummRotation = new F(i);
  }
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    return this.distanceTo(t) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return Math.abs(p(t, this.c) - p(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    re(this.c, this.a, this.b, this.cummRotation.value, e ?? E(), t), s === 1 && a().showControlPoints && (X(this.a, a().controlPointColor, t), X(this.b, a().controlPointColor, t), X(this.c, a().controlPointColor, t));
  }
  forEachHandle(t) {
    t(this.a), this.a !== this.b && t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.a == t && (this.a = e), this.b == t && (this.b = e), this.c == t && (this.c = e);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
const at = class at {
  constructor(t, e, s, i, o, r) {
    this.master = t, this.transform = (h) => ee(Bt(St(h, nt, this.angle), nt, this.scale), this), this.id = at.nextId++, this.attachers = [], this.xVar = new F(e), this.yVar = new F(s), this.angleAndSizeVecX = new F(i * Math.cos(o)), this.angleAndSizeVecY = new F(i * Math.sin(o)), this.addAttachers(t, r);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new P(this.transform(t));
    this.attachers.push(s), e.constraints.add(new lt(s, this, t));
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
  boundingBox(t = this.master) {
    const { topLeft: e, bottomRight: s } = this.master.boundingBox(t), i = [
      e,
      s,
      { x: e.x, y: s.y },
      { x: s.x, y: e.y }
    ].map(this.transform);
    return ne(i);
  }
  distanceTo(t) {
    return p(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => t(this.transform(i)), e, s), s === 1 && this.attachers.forEach((i, o) => {
      const r = t(i);
      z(
        t(this.transform(this.master.attachers[o])),
        r,
        a().instanceSideAttacherColor
      ), X(r, a().instanceSideAttacherColor);
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
at.nextId = 0;
let S = at;
class ce {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Jt();
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
  render(t = d.toScreenPosition, e, s = 0) {
    s > a().maxDepth || (this.things.forEach((i) => i.render(t, e, s + 1)), s === 0 && (this.attachers.forEach((i) => i.render(t, a().masterSideAttacherColor)), this.constraints.forEach((i) => {
      if (i instanceof st) {
        let o = (i.computeError() * 100).toFixed();
        o === "-0" && (o = "0"), this.drawText(
          o,
          a().distanceConstraintTextScale,
          t({
            x: i.a.x + a().distanceConstraintLabelPct * (i.b.x - i.a.x),
            y: i.a.y + a().distanceConstraintLabelPct * (i.b.y - i.a.y)
          })
        );
      }
    })));
  }
  contains(t) {
    if (this === t)
      return !0;
    for (const e of this.things)
      if (e instanceof S && e.master.contains(t))
        return !0;
    return !1;
  }
  addInstance(t, { x: e, y: s }, i, o) {
    const r = new S(t, e, s, i, o, this);
    return this.things.push(r), r;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof S))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: o, y: r } = Bt(i, s, e);
      i.x = o, i.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof S))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: o, y: r } = St(i, s, e);
      i.x = o, i.y = r;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const o = new H(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(o.a), this.mergeAndAddImplicitConstraints(o.b));
    for (const r of this.things)
      r.forEachHandle((h) => {
        h !== o.a && h !== o.b && o.contains(h) && this.constraints.add(new _(h, o.a, o.b));
      });
    return this.things.push(o), o;
  }
  addArc(t, e, s, i, o = !0) {
    const r = new j(t, e, s, i);
    o && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new ht(r.a, r.c, r.b, r.c));
    for (const h of this.things)
      h.forEachHandle((y) => {
        y !== r.a && y !== r.b && y !== r.c && r.contains(y) && this.constraints.add(new J(y, r.a, r.b, r.c));
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
      e.has(s) || !s.contains(t) || (s instanceof H ? (this.constraints.add(new _(t, s.a, s.b)), a().showImplicitConstraints && g({ message: "(point on line)", referents: /* @__PURE__ */ new Set([t, s]) })) : s instanceof j && (this.constraints.add(new J(t, s.a, s.b, s.c)), a().showImplicitConstraints && g({ message: "(point on arc)", referents: /* @__PURE__ */ new Set([t, s]) })));
  }
  replaceHandle(t, e) {
    this.things.forEach((s) => s.replaceHandle(t, e)), this.attachers = this.attachers.map((s) => s === t ? e : s), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? (this.things = this.things.filter((s) => s !== e), g({ message: "delete", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new vt(e, t)), g({ message: "fixed point", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Et(e)), g({ message: "weight", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof H ? (this.constraints.add(new st(e.a, e.b)), g({ message: "fixed distance", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof H ? (this.constraints.add(new Pt(e.a, e.b)), g({ message: "HorV", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof S ? (this.constraints.add(new dt(e)), g({ message: "full size", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof S ? (this.inline(e), g({ message: "dismember", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof H) {
        const h = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        i.set(r.a, h.a), i.set(r.b, h.b);
      } else if (r instanceof j) {
        const h = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c),
          r.cummRotation.value
        );
        i.set(r.a, h.a), i.set(r.b, h.b), i.set(r.c, h.c);
      } else if (r instanceof S) {
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
    s.forEach((r) => {
      this.constraints.add(r.map(o, i, t.transform));
    }), this.things = this.things.filter((r) => r !== t);
  }
  snap(t, e, s) {
    const i = this.handleAt(t, e);
    if (i)
      return B(i), "H";
    if (s && p(t, s) <= a().closeEnough / d.scale)
      return B(s), "H";
    const o = new Jt(), r = new P(t), h = /* @__PURE__ */ new Set();
    r.forEachVar((x) => h.add(x));
    const y = [];
    for (const x of this.things)
      x === e || e instanceof P && R(x, e) || !x.contains(t) || (x instanceof H ? (o.add(new _(r, x.a, x.b)), y.push("L")) : x instanceof j && (o.add(new J(r, x.a, x.b, x.c)), y.push("A")));
    if (o.isEmpty())
      return null;
    for (; o.relax(h); )
      ;
    return B(r), y.join();
    function B(x) {
      if (e) {
        const C = x.x - e.x, I = x.y - e.y;
        e.moveBy(C, I);
      }
      t.x = x.x, t.y = x.y;
    }
    function R(x, C) {
      let I = !1;
      return x.forEachHandle((tt) => {
        tt === C && (I = !0);
      }), I;
    }
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const o of this.things)
      o.forEachHandle((r) => {
        if (r !== e && r.contains(t)) {
          const h = p(t, r);
          h < s && (i = r, s = h);
        }
      });
    return i;
  }
  thingAt(t) {
    let e = 1 / 0, s = null;
    for (const i of this.things)
      if (i.contains(t)) {
        const o = i.distanceTo(t);
        o < e && (s = i, e = o);
      }
    return s;
  }
  leave() {
    this.center();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), s = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const o of this.getPositions())
      o.x += s, o.y += i;
  }
  boundingBox(t = this) {
    const e = [...this.getPositions(!1)];
    for (const s of this.things)
      if (s instanceof S && s.master !== t) {
        const i = s.boundingBox(t);
        e.push(i.topLeft), e.push(i.bottomRight);
      }
    return ne(e);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: s } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(s, 2));
    return Math.sqrt(t) * 2;
  }
  getHandle(t) {
    let e, s = 0;
    for (const i of this.things)
      i.forEachHandle((o) => {
        s++ === t && (e = o);
      });
    return e;
  }
  getPositions(t = !0) {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.things)
      s instanceof S && e.add(s), s.forEachHandle((i) => {
        (!(s instanceof j) || t || i !== s.c) && e.add(i);
      });
    return e;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((s) => t.add(s));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const s of this.things)
      s instanceof S && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof lt && s.masterPoint === e) {
        const { instance: i, instancePoint: o } = s;
        i.attachers = i.attachers.filter((r) => r !== o), this.constraints.remove(s);
      }
    });
  }
  drawText(t, e, s) {
    he(
      t,
      e,
      (i, o, r) => i.render(
        ({ x: h, y }) => ({
          x: h * r + o - d.center.x + s.x,
          y: -y * r + s.y
        }),
        void 0,
        1
      )
    );
  }
}
const Me = {
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
}, ke = 1, Ce = {
  data: Me,
  version: ke
};
function Ie(n, t, e = a().fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = ft(s.start, e), o = ft(s.end, e);
        n.addLine(i, o, !1, !1);
        break;
      }
      case "arc": {
        const i = ft(s.center, e), o = s.radius * e;
        n.addArc(
          Nt(i, s.end, o),
          Nt(i, s.start, o),
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
const We = new Map(Ce.data.values), ut = /* @__PURE__ */ new Map();
for (const [n, t] of We) {
  const e = new ce();
  Ie(e, t, a().fontScale);
  const s = e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), ut.set(n, e);
}
function he(n, t, e) {
  const s = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), i = (r) => s(r) * a().fontScale * (4 + a().kerning * 2);
  let o = d.center.x - 0.5 * [...n].map(i).reduce((r, h) => r + h, 0);
  for (let r = 0; r < n.length; r++) {
    const h = n[r], y = s(h), B = ut.get(h.toUpperCase());
    B && e(B, o, y), o += i(h);
  }
}
function ft({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Nt({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let W = null;
const c = {
  get pos() {
    return W;
  },
  snapPos(n, t) {
    return W ? m.snap(W, n, t) : null;
  },
  moveToScreenPos(n) {
    const t = d.fromScreenPosition(n);
    W ? (W.x = t.x, W.y = t.y) : W = t, De();
  },
  clearPos() {
    W = null;
  }
};
function Q(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = d.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = d.fromScreenPosition(t);
}
const q = {};
for (let n = 1; n < 10; n++)
  q["" + n] = new ce();
let m = q[1];
window.drawing = m;
function v(n) {
  return n ? q[n] ?? ut.get(n) : m;
}
function At(n) {
  const t = v(n);
  !t || t === m || (m.leave(), m = t, Q(() => d.reset()), mt(), g("drawing #" + n));
}
const yt = [...Object.values(q), ...ut.values()];
let l = null;
function Mt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (l == null ? void 0 : l.type) === "line" && m.addLine(l.start, n), l = {
    type: "line",
    start: n
  };
}
function kt() {
  (l == null ? void 0 : l.type) === "line" && (l = null);
}
function Ct() {
  if (c.pos && ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [], cummRotation: 0 }), l.positions.push({ x: c.pos.x, y: c.pos.y }), l.positions.length === 3)) {
    const [n, t, e] = l.positions;
    m.addArc(t, e, n, l.cummRotation), l = null;
  }
}
function De() {
  if (!l || l.type !== "arc" || l.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = l.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!l.prevAngle) {
    l.prevAngle = e, l.cummRotation = 0;
    return;
  }
  let s = e - l.prevAngle;
  s > Math.PI ? s -= Y : s < -Math.PI && (s += Y), l.cummRotation += s, l.prevAngle = e;
}
function It() {
  (l == null ? void 0 : l.type) === "arc" && (l = null);
}
function le(n, t) {
  const e = n.attachers.indexOf(t);
  m.attachers.splice(e, 1);
  for (const s of Object.values(q))
    s.onAttacherRemoved(n, t);
}
function Ve(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(q))
    e.onAttacherAdded(n, t);
}
function de() {
  if (a().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && m.relax(); )
      ;
  }
}
function ue() {
  !l && m.isEmpty() && ze(), Le(), m.render(), Oe(), Ae(), Te();
}
function ze() {
  const n = innerWidth / 100, t = (e, s) => z(e, s, E(), d.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function Le() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      c.pos && z(l.start, c.pos, E(), d.toScreenPosition);
      break;
    case "arc":
      if (a().showControlPoints)
        for (const n of l.positions)
          X(n, a().controlPointColor, d.toScreenPosition);
      l.positions.length == 2 && c.pos && l.cummRotation !== void 0 && Math.abs(l.cummRotation) > 0.05 && re(
        l.positions[0],
        l.positions[1],
        c.pos,
        l.cummRotation,
        E(),
        d.toScreenPosition
      );
      break;
  }
}
function Oe() {
  if (!c.pos)
    return;
  const n = d.toScreenPosition(c.pos);
  z(
    { x: n.x - a().crosshairsSize, y: n.y },
    { x: n.x + a().crosshairsSize, y: n.y },
    E("bold")
  ), z(
    { x: n.x, y: n.y - a().crosshairsSize },
    { x: n.x, y: n.y + a().crosshairsSize },
    E("bold")
  );
}
function Te() {
  if (!a().debug)
    return;
  const n = d.toScreenPosition({ x: 0, y: 0 });
  z({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, a().axisColor), z({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, a().axisColor);
  const t = c.pos;
  t && oe(d.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Wt() {
  return c.pos ? m.handleAt(c.pos) : null;
}
function Z() {
  return c.pos ? m.thingAt(c.pos) : null;
}
function pt() {
  const n = Z();
  return n instanceof H ? n : null;
}
function me() {
  const n = Z();
  return n instanceof S ? n : null;
}
function Dt() {
  m.isEmpty() || (g("solve"), m.relax());
}
function Vt() {
  a().autoSolve = !a().autoSolve, g(`auto-solve ${a().autoSolve ? "on" : "off"}`);
}
function zt() {
  c.pos && m.delete(c.pos) && (ye(), m.isEmpty() && Q(() => d.reset()));
}
function Lt() {
  return !!c.pos && m.fixedDistance(c.pos);
}
function Ot() {
  return !!c.pos && m.fixedPoint(c.pos);
}
function Tt() {
  return !!c.pos && m.weight(c.pos);
}
function Ht() {
  return !!c.pos && m.horizontalOrVertical(c.pos);
}
function $t() {
  return !!c.pos && m.fullSize(c.pos);
}
function fe() {
  const n = c.pos;
  n && (g("re-center"), Q(() => {
    d.centerAt(n);
  }));
}
function Ft(n) {
  const t = v(n);
  if (!t.isEmpty() && c.pos && (a().recursion || !t.contains(v()))) {
    const e = m.addInstance(t, c.pos, 0.5 * t.size / d.scale, 0);
    g({ message: "instantiate #" + n, referents: /* @__PURE__ */ new Set([e]) });
  }
}
function Rt() {
  c.pos && m.dismember(c.pos) && ye();
}
function it(n) {
  return !!c.pos && m.rotateInstanceAt(c.pos, n);
}
function rt(n) {
  return !!c.pos && m.resizeInstanceAt(c.pos, n);
}
function Yt() {
  if (!c.pos)
    return;
  const n = m.handleAt(c.pos);
  n && (m.attachers.includes(n) ? (le(m, n), g("remove attacher")) : (Ve(m, n), g("add attacher")));
}
let $ = null;
function Xt() {
  if (!$) {
    ($ = pt()) && g({ message: "equal length", referents: /* @__PURE__ */ new Set([$]) });
    return;
  }
  const n = pt();
  n && (v().constraints.add(
    new ht($.a, $.b, n.a, n.b)
  ), g({ message: "equal length", referents: /* @__PURE__ */ new Set([$, n]) }));
}
function mt() {
  $ = null;
}
function wt(n) {
  Q(() => d.scale = n), g("scale=" + d.scale.toFixed(1));
}
function Ut(n, t) {
  Q(() => {
    d.center.x -= n, d.center.y -= t;
  });
}
function ye() {
  for (; He(); )
    ;
}
function He() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of yt)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of yt) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (le(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of yt)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: zt,
  dismember: Rt,
  drawing: v,
  endArc: It,
  endEqualLength: mt,
  endLines: kt,
  fixedDistance: Lt,
  fixedPoint: Ot,
  fullSize: $t,
  handle: Wt,
  horizontalOrVertical: Ht,
  instance: me,
  instantiate: Ft,
  line: pt,
  moreArc: Ct,
  moreEqualLength: Xt,
  moreLines: Mt,
  onFrame: de,
  panBy: Ut,
  pen: c,
  reCenter: fe,
  render: ue,
  rotateInstanceBy: it,
  scaleInstanceBy: rt,
  setScale: wt,
  solve: Dt,
  switchToDrawing: At,
  thing: Z,
  toggleAttacher: Yt,
  toggleAutoSolve: Vt,
  weight: Tt
}, Symbol.toStringTag, { value: "Module" }));
var Zt;
const Fe = (Zt = window.webkit) == null ? void 0 : Zt.messageHandlers, Re = window.webkit != null;
function Gt(n, t = n) {
  Re && Fe[n].postMessage(t);
}
let N = [], xt = !1;
function Ye() {
  const n = N;
  return N = [], n;
}
function Kt(n) {
  for (const t of n)
    (!t.predicted || a().usePredictedEvents) && N.push(t);
}
function qt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (xt = !0), t === "ended" && (xt = !1), !(t === "moved" && !xt) && N.push({
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
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", xe), N = [];
}
window.onpointerdown = (n) => qt(n, "began");
window.onpointermove = (n) => qt(n, "moved");
window.onpointerup = (n) => qt(n, "ended");
const xe = (n) => n.preventDefault();
window.addEventListener("touchstart", xe, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Kt, Xe(), Kt(n);
};
const Qt = 0.75, jt = () => a().fontScale * 8;
function A(n, t, e, s = 0.35) {
  v().drawText(n, s, {
    x: t + a().tabletButtonWidth / 2,
    y: e + jt() / 2 + s * a().fontScale * 3
  });
}
class f {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + a().tabletButtonWidth && this.topY <= e && e < this.topY + jt();
  }
  render() {
    A(this.label, this.leftX, this.topY), this.isDown && (A(this.label, this.leftX, this.topY), A(this.label, this.leftX, this.topY));
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class ge {
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
    for (const t of Ye())
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
      i.leftX = t, i.topY = s * jt(), s++;
  }
}
let U;
function Ue() {
  U = pe;
}
function qe() {
  U.processEvents(), U.onFrame();
}
function je() {
  U.render();
}
const pe = new class extends ge {
  constructor() {
    super(), this.lineButton = new f("LINE"), this.moveButton = new f("MOVE"), this.horvButton = new f("HORV"), this.sizeButton = new f("SIZE"), this.dismemberButton = new f("DISM"), this.deleteButton = new f("DEL"), this.solveButton = new f("SOLVE"), this.arcButton = new f("ARC"), this.eqButton = new f("EQ"), this.fixButton = new f("FIX"), this.weightButton = new f("weight"), this.attacherButton = new f("ATT"), this.clearButton = new f("CLEAR"), this.autoSolveButton = new f("AUTO"), this.configButton = new f("config"), this.reloadButton = new f("reload"), this.col1 = [
      new f("1"),
      new f("2"),
      new f("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      new f("4"),
      new f("5"),
      new f("6"),
      this.arcButton,
      this.eqButton,
      this.fixButton,
      this.weightButton,
      this.attacherButton,
      this.clearButton,
      this.autoSolveButton
    ], this.col3 = [this.configButton, this.reloadButton], this.pencilClickInProgress = !1, this.drag = null, this.lastSnap = null, this.buttons.push(...this.col1, ...this.col2, ...this.col3);
  }
  onFrame() {
    this.solveButton.isDown && Dt();
  }
  layOutButtons() {
    a().lefty ? (this.layOutButtonColumn(innerWidth - a().tabletButtonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * a().tabletButtonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(a().tabletButtonWidth, this.col2), this.layOutButtonColumn(innerWidth - a().tabletButtonWidth, this.col3));
  }
  onPencilDown(n, t) {
    c.moveToScreenPos(n), this.moveButton.isDown && this.move(), this.prepareHaptics();
  }
  onPencilMove(n, t) {
    c.moveToScreenPos(n), this.snap();
    const e = { x: c.pos.x, y: c.pos.y };
    if (this.drag) {
      const s = e.x - this.drag.offset.x, i = e.y - this.drag.offset.y;
      this.drag.thing.moveBy(s - this.drag.thing.x, i - this.drag.thing.y);
    }
    !this.pencilClickInProgress && t > 3 && (this.pencilClickInProgress = !0, this.onPencilClick()), this.pencilClickInProgress && t < 1 && this.endDragEtc();
  }
  onPencilUp(n) {
    c.clearPos(), this.endDragEtc(), kt(), It();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof P && v().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && Xt();
  }
  onButtonDown(n) {
    if ("1" <= n.label && n.label <= "9") {
      c.pos ? (Ft(n.label), this.move()) : At(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        v().clear(), d.reset();
        break;
      case this.lineButton:
        Mt();
        break;
      case this.arcButton:
        Ct();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Ht();
        break;
      case this.fixButton:
        Ot() || Lt();
        break;
      case this.sizeButton:
        $t();
        break;
      case this.weightButton:
        Tt();
        break;
      case this.dismemberButton:
        Rt();
        break;
      case this.attacherButton:
        Yt();
        break;
      case this.deleteButton:
        zt();
        break;
      case this.autoSolveButton:
        Vt();
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        U = _e;
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && mt();
  }
  onFingerMove(n, t) {
    if (v().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = d.fromScreenPosition(n), i = d.fromScreenPosition(e);
    if (c.pos || Ut(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let o = null;
    for (const [C, I] of this.fingerScreenPositions.entries())
      if (C !== t) {
        o = I;
        break;
      }
    if (!o)
      throw new Error("bruh?!");
    const r = d.fromScreenPosition(o), h = p(r, i), B = p(r, s) / h, R = Math.atan2(i.y - r.y, i.x - r.x), x = Math.atan2(s.y - r.y, s.x - r.x);
    me() && !this.drag && this.move(), !rt(B) && !c.pos && (d.scale *= B), it(x - R);
  }
  move() {
    const n = Wt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = Z();
    t && (this.drag = { thing: t, offset: te(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Gt("prepareHaptics");
  }
  hapticBump() {
    Gt("hapticImpact");
  }
}(), _e = new class extends ge {
  constructor() {
    super(), this.leftyButton = new f("lefty"), this.lineWidthButton = new f("lwidth"), this.alphaButton = new f("opacity"), this.flickerButton = new f("flicker"), this.ctrlPtsButton = new f("ctrl pts"), this.recursionButton = new f("schachman"), this.defaultsButton = new f("defaults"), this.backButton = new f("back"), this.col1 = [
      this.leftyButton,
      this.lineWidthButton,
      this.alphaButton,
      this.flickerButton,
      this.ctrlPtsButton,
      this.recursionButton,
      this.defaultsButton
    ], this.col2 = [this.backButton], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    this._render(), this._render();
  }
  _render() {
    super.render(), A(
      a().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * a().tabletButtonWidth,
      this.leftyButton.topY
    ), A(
      a().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * a().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * Qt
    ), A(
      a().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * a().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * Qt
    ), A(
      a().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * a().tabletButtonWidth,
      this.flickerButton.topY
    ), A(
      a().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * a().tabletButtonWidth,
      this.ctrlPtsButton.topY
    ), A(
      a().recursion ? "on" : "off",
      this.recursionButton.leftX + 2 * a().tabletButtonWidth,
      this.recursionButton.topY
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
        Se(), g("restored defaults!");
        break;
      case this.leftyButton:
        T({ lefty: !a().lefty });
        break;
      case this.flickerButton:
        T({ flicker: !a().flicker });
        break;
      case this.ctrlPtsButton:
        T({ showControlPoints: !a().showControlPoints });
        break;
      case this.recursionButton:
        T({ recursion: !a().recursion }), g(a().recursion ? "use at your own risk!" : "phew");
        break;
      case this.backButton:
        U = pe;
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
      T({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(a().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      T({ baseAlphaMultiplier: e });
    }
  }
}(), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ue,
  onFrame: qe,
  render: je
}, Symbol.toStringTag, { value: "Module" }));
function we(n, t = 1) {
  const e = v(), s = [];
  return he(n, t, (i, o, r) => {
    const h = e.addInstance(i, { x: o, y: d.center.y }, i.size * r, 0);
    e.constraints.add(new dt(h, r));
    const y = s.at(-1);
    y && e.replaceHandle(h.attachers[0], y.attachers[1]), s.push(h);
  }), s;
}
function Ne(n, t = 1) {
  const e = we(n, t);
  for (const s of e) {
    const i = d.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    s.x = i.x, s.x = i.y;
  }
}
const Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: Ne,
  write: we
}, Symbol.toStringTag, { value: "Module" })), M = {};
let G = !1, K = !1, w = null;
function Ke() {
  window.addEventListener("keydown", tn), window.addEventListener("keyup", en), b.addEventListener("pointerdown", nn), b.addEventListener("pointermove", sn), b.addEventListener("pointerup", rn);
}
function Qe() {
  M[" "] && Dt();
}
function Ze() {
}
function tn(n) {
  if (M[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    M.Shift ? Ft(t) : At(t);
    return;
  }
  switch (n.key) {
    case "f":
      T({ flicker: !a().flicker });
      return;
    case "d":
      a().debug = !a().debug, g(`debug ${a().debug ? "on" : "off"}`);
      return;
    case "S":
      Vt();
      return;
  }
  if (!v().isEmpty())
    switch (n.key) {
      case "Backspace":
        zt();
        break;
      case ".":
        Ot() || Lt();
        break;
      case "W":
        Tt();
        break;
      case "h":
        Ht();
        break;
      case "=":
        rt(1.05) || wt(Math.min(d.scale + 0.1, 10));
        break;
      case "-":
        rt(0.95) || wt(Math.max(d.scale - 0.1, 0.1));
        break;
      case "q":
        it(5 * Math.PI / 180);
        break;
      case "w":
        it(-5 * Math.PI / 180);
        break;
      case "s":
        $t();
        break;
      case "A":
        Yt();
        break;
      case "c":
        fe();
        break;
      case "D":
        Rt();
        break;
    }
}
function en(n) {
  switch (delete M[n.key], n.key) {
    case "Meta":
      kt(), K = !1, G || c.clearPos();
      break;
    case "a":
      It(), K = !1, G || c.clearPos();
      break;
    case "e":
      mt();
      break;
  }
}
function nn(n) {
  if (b.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), G = !0, M.Meta) {
    Mt(), K = !0;
    return;
  } else if (M.a) {
    Ct(), K = !0;
    return;
  } else if (M.e) {
    Xt();
    return;
  }
  w = null;
  const t = Wt();
  if (t) {
    w = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = Z();
  e && (w = { thing: e, offset: te(c.pos, e) });
}
function sn(n) {
  if (n.metaKey || delete M.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), G && t && !v().isEmpty() && !K && !w) {
    Ut(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(w == null ? void 0 : w.thing), w) {
    const e = c.pos.x - w.offset.x, s = c.pos.y - w.offset.y;
    w.thing.moveBy(e - w.thing.x, s - w.thing.y);
  }
}
function rn(n) {
  b.releasePointerCapture(n.pointerId), G = !1, M.Meta || c.clearPos(), (w == null ? void 0 : w.thing) instanceof P && v().mergeAndAddImplicitConstraints(w.thing), w = null;
}
const on = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ke,
  onFrame: Qe,
  render: Ze
}, Symbol.toStringTag, { value: "Module" }));
Pe(document.getElementById("canvas"));
const bt = new URLSearchParams(window.location.search).get("tablet") ? Je : on;
bt.init();
function be() {
  bt.onFrame(), de(), Ee(), bt.render(), ue(), requestAnimationFrame(be);
}
be();
window.app = $e;
window.demos = Ge;
