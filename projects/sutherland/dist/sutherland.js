const xt = {
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
let I;
function Be() {
  I = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(xt));
  for (const [n, t] of Object.entries(xt))
    Object.hasOwn(I, n) || (I[n] = t);
}
function L(n) {
  I = { ...I, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Se() {
  I = JSON.parse(JSON.stringify(xt)), localStorage.setItem("config", JSON.stringify(I));
}
function a() {
  return I;
}
Be();
window.config = a;
const tt = Math.PI * 2;
function p(n, t) {
  return Math.sqrt(Z(n, t));
}
function Z(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Zt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const et = Object.freeze({ x: 0, y: 0 });
function te({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function bt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = e * s, r = e * i;
  return { x: o + t.x, y: r + t.y };
}
function Bt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = Math.sin(e), r = Math.cos(e), h = s * r - i * o, y = s * o + i * r;
  return { x: h + t.x, y: y + t.y };
}
function ee(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const o of n)
    t = Math.min(t, o.x), e = Math.max(e, o.x), s = Math.min(s, o.y), i = Math.max(i, o.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function ne(n, t, e) {
  return Math.sqrt(ve(n, t, e));
}
function ve(n, t, e) {
  const s = Z(t, e);
  if (s == 0)
    return Z(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return Z(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function jt(n) {
  return 1 - Math.pow(1 - n, 5);
}
let b, f;
function Pe(n) {
  b = n, f = b.getContext("2d"), se();
}
function se() {
  if (b.width = innerWidth, b.height = innerHeight, devicePixelRatio !== 1) {
    const n = b.width, t = b.height;
    b.width = n * devicePixelRatio, b.height = t * devicePixelRatio, b.style.width = n + "px", b.style.height = t + "px", f.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", se);
function Ee() {
  f.clearRect(0, 0, b.width, b.height), f.lineWidth = a().lineWidth, f.lineCap = "round";
}
function at(n) {
  return n;
}
function R(n, t = E(), e = at) {
  const s = e(n);
  f.fillStyle = t, f.beginPath(), f.arc(s.x, s.y, f.lineWidth * 2, 0, tt), f.fill();
}
function W(n, t, e = E(), s = at) {
  const i = f.lineWidth;
  n.x === t.x && n.y === t.y && (f.lineWidth *= 2), f.strokeStyle = e, f.beginPath();
  const o = s(n), r = s(t);
  f.moveTo(o.x, o.y), f.lineTo(r.x, r.y), f.stroke(), f.lineWidth = i;
}
function ie(n, t, e, s, i = E(), o = at) {
  const r = o(s === "cw" ? t : e), h = o(s === "cw" ? e : t), y = o(n);
  f.beginPath(), f.strokeStyle = i;
  const v = Math.atan2(r.y - y.y, r.x - y.x), D = Math.atan2(h.y - y.y, h.x - y.x);
  f.arc(
    y.x,
    y.y,
    p(y, s === "cw" ? r : h),
    v,
    Math.abs(D - v) > 0.05 ? D : D + tt
  ), f.stroke();
}
function re(n, t, e = E(), s = at) {
  f.fillStyle = e;
  const i = 12;
  f.font = `${i}px Major Mono Display`;
  const o = f.measureText(t).width, { x: r, y: h } = s(n);
  f.fillText(t, r - o / 2, h + i / 2);
}
function E(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= a().baseAlphaMultiplier, `rgba(255,255,255,${a().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let V = 1;
const z = { x: 0, y: 0 }, l = {
  reset() {
    V = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return V;
  },
  set scale(n) {
    V = n;
  },
  centerAt({ x: n, y: t }) {
    z.x = n, z.y = t;
  },
  get center() {
    return z;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - z.x) * V + innerWidth / 2,
      y: -(t - z.y) * V + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / V + z.x,
      y: z.y - (t - innerHeight / 2) / V
    };
  }
};
let C = null, oe = 0;
function g(n) {
  C = typeof n == "string" ? { message: n } : n, oe = Date.now();
}
function Ae() {
  if (C === null)
    return;
  const n = Date.now() - oe;
  if (n > a().statusTimeMillis) {
    C = null;
    return;
  }
  if (C.message) {
    f.font = "40px Monaco";
    const e = f.measureText(C.message).width, s = 1 - jt(n / a().statusTimeMillis);
    f.fillStyle = `rgba(255,222,33,${s})`, f.fillText(C.message, (innerWidth - e) / 2, innerHeight - 40);
  }
  if (a().highlightReferents && C.referents) {
    const e = `rgba(255,222,33,${1 - jt(n / (0.5 * a().statusTimeMillis))})`;
    for (const s of C.referents)
      s.render(l.toScreenPosition, e, 2);
  }
}
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
      this.handles[s], this.handles.forEach((i, o) => {
        i === t && (this.handles[o] = e);
      });
  }
}
class St extends M {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e, s) {
    return new St(e.get(this.p), s(this.pos));
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
class vt extends M {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new vt(e.get(this.a), e.get(this.b));
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
class nt extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = p(t, e);
  }
  map(t, e) {
    return new nt(e.get(this.a), e.get(this.b));
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
class ct extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new ct(
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
class j extends M {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new j(
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
    return ne(this.p, this.a, this.b);
  }
}
class _ extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new _(
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
class ht extends M {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new ht(
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
      te(
        bt(
          Bt(this.masterPoint, et, this.instance.angle),
          et,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class dt extends M {
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
class Pt extends M {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new Pt(e.get(this.a));
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
class _t {
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
    const e = l.scale > 0 ? 1 / l.scale : 1, s = a().minWorthwhileErrorImprovement * e;
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
class $ {
  constructor(t) {
    this.value = t;
  }
}
const rt = class rt {
  constructor({ x: t, y: e }) {
    this.id = rt.nextId++, this.xVar = new $(t), this.yVar = new $(e);
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
    return p(t, this) <= a().closeEnough / l.scale;
  }
  distanceTo(t) {
    return p(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = a().instanceSideAttacherColor) {
    a().debug && re(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), R(this, e, t);
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
rt.nextId = 0;
let P = rt;
class O {
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
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= a().closeEnough / l.scale;
  }
  distanceTo(t) {
    return ne(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !a().showGuideLines)
      return;
    const s = this.isGuide ? a().guideLineColor : e ?? E();
    W(this.a, this.b, s, t);
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
  constructor(t, e, s, i) {
    this.a = new P(t), this.b = p(t, e) === 0 ? this.a : new P(e), this.c = new P(s), this.direction = new $(i);
  }
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    return this.distanceTo(t) <= a().closeEnough / l.scale;
  }
  distanceTo(t) {
    return Math.abs(p(t, this.c) - p(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    ie(this.c, this.a, this.b, this.direction.value, e ?? E(), t), s === 1 && a().showControlPoints && (R(this.a, a().controlPointColor, t), R(this.b, a().controlPointColor, t), R(this.c, a().controlPointColor, t));
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
const ot = class ot {
  constructor(t, e, s, i, o, r) {
    this.master = t, this.transform = (h) => te(bt(Bt(h, et, this.angle), et, this.scale), this), this.id = ot.nextId++, this.attachers = [], this.xVar = new $(e), this.yVar = new $(s), this.angleAndSizeVecX = new $(i * Math.cos(o)), this.angleAndSizeVecY = new $(i * Math.sin(o)), this.addAttachers(t, r);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new P(this.transform(t));
    this.attachers.push(s), e.constraints.add(new ht(s, this, t));
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
    return ee(i);
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
      W(
        t(this.transform(this.master.attachers[o])),
        r,
        a().instanceSideAttacherColor
      ), R(r, a().instanceSideAttacherColor);
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
ot.nextId = 0;
let B = ot;
class ae {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new _t();
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
  render(t = l.toScreenPosition, e, s = 0) {
    s > a().maxDepth || (this.things.forEach((i) => i.render(t, e, s + 1)), s === 0 && (this.attachers.forEach((i) => i.render(t, a().masterSideAttacherColor)), this.constraints.forEach((i) => {
      if (i instanceof nt) {
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
      if (e instanceof B && e.master.contains(t))
        return !0;
    return !1;
  }
  addInstance(t, { x: e, y: s }, i, o) {
    const r = new B(t, e, s, i, o, this);
    return this.things.push(r), r;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof B))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: o, y: r } = bt(i, s, e);
      i.x = o, i.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof B))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: o, y: r } = Bt(i, s, e);
      i.x = o, i.y = r;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const o = new O(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(o.a), this.mergeAndAddImplicitConstraints(o.b));
    for (const r of this.things)
      r.forEachHandle((h) => {
        h !== o.a && h !== o.b && o.contains(h) && this.constraints.add(new j(h, o.a, o.b));
      });
    return this.things.push(o), o;
  }
  addArc(t, e, s, i, o = !0) {
    const r = new q(t, e, s, i);
    o && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new ct(r.a, r.c, r.b, r.c));
    for (const h of this.things)
      h.forEachHandle((y) => {
        y !== r.a && y !== r.b && y !== r.c && r.contains(y) && this.constraints.add(new _(y, r.a, r.b, r.c));
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
      e.has(s) || !s.contains(t) || (s instanceof O ? (this.constraints.add(new j(t, s.a, s.b)), a().showImplicitConstraints && g({ message: "(point on line)", referents: /* @__PURE__ */ new Set([t, s]) })) : s instanceof q && (this.constraints.add(new _(t, s.a, s.b, s.c)), a().showImplicitConstraints && g({ message: "(point on arc)", referents: /* @__PURE__ */ new Set([t, s]) })));
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
    return e ? (this.constraints.add(new St(e, t)), g({ message: "fixed point", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Pt(e)), g({ message: "weight", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof O ? (this.constraints.add(new nt(e.a, e.b)), g({ message: "fixed distance", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof O ? (this.constraints.add(new vt(e.a, e.b)), g({ message: "HorV", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.constraints.add(new dt(e)), g({ message: "full size", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.inline(e), g({ message: "dismember", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof O) {
        const h = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        i.set(r.a, h.a), i.set(r.b, h.b);
      } else if (r instanceof q) {
        const h = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c),
          r.direction.value
        );
        i.set(r.a, h.a), i.set(r.b, h.b), i.set(r.c, h.c);
      } else if (r instanceof B) {
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
      return v(i), "H";
    if (s && p(t, s) <= a().closeEnough / l.scale)
      return v(s), "H";
    const o = new _t(), r = new P(t), h = /* @__PURE__ */ new Set();
    r.forEachVar((x) => h.add(x));
    const y = [];
    for (const x of this.things)
      x === e || e instanceof P && D(x, e) || !x.contains(t) || (x instanceof O ? (o.add(new j(r, x.a, x.b)), y.push("L")) : x instanceof q && (o.add(new _(r, x.a, x.b, x.c)), y.push("A")));
    if (o.isEmpty())
      return null;
    for (; o.relax(h); )
      ;
    return v(r), y.join();
    function v(x) {
      if (e) {
        const U = x.x - e.x, F = x.y - e.y;
        e.moveBy(U, F);
      }
      t.x = x.x, t.y = x.y;
    }
    function D(x, U) {
      let F = !1;
      return x.forEachHandle((be) => {
        be === U && (F = !0);
      }), F;
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
      if (s instanceof B && s.master !== t) {
        const i = s.boundingBox(t);
        e.push(i.topLeft), e.push(i.bottomRight);
      }
    return ee(e);
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
      s instanceof B && e.add(s), s.forEachHandle((i) => {
        (!(s instanceof q) || t || i !== s.c) && e.add(i);
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
      s instanceof B && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof ht && s.masterPoint === e) {
        const { instance: i, instancePoint: o } = s;
        i.attachers = i.attachers.filter((r) => r !== o), this.constraints.remove(s);
      }
    });
  }
  drawText(t, e, s) {
    ce(
      t,
      e,
      (i, o, r) => i.render(
        ({ x: h, y }) => ({
          x: h * r + o - l.center.x + s.x,
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
        const i = mt(s.start, e), o = mt(s.end, e);
        n.addLine(i, o, !1, !1);
        break;
      }
      case "arc": {
        const i = mt(s.center, e), o = s.radius * e;
        n.addArc(
          Jt(i, s.end, o),
          Jt(i, s.start, o),
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
const We = new Map(Ce.data.values), lt = /* @__PURE__ */ new Map();
for (const [n, t] of We) {
  const e = new ae();
  Ie(e, t, a().fontScale);
  const s = e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), lt.set(n, e);
}
function ce(n, t, e) {
  const s = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), i = (r) => s(r) * a().fontScale * (4 + a().kerning * 2);
  let o = l.center.x - 0.5 * [...n].map(i).reduce((r, h) => r + h, 0);
  for (let r = 0; r < n.length; r++) {
    const h = n[r], y = s(h), v = lt.get(h.toUpperCase());
    v && e(v, o, y), o += i(h);
  }
}
function mt({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Jt({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let k = null;
const c = {
  get pos() {
    return k;
  },
  snapPos(n, t) {
    return k ? u.snap(k, n, t) : null;
  },
  moveToScreenPos(n) {
    const t = l.fromScreenPosition(n);
    k ? (k.x = t.x, k.y = t.y) : k = t, De();
  },
  clearPos() {
    k = null;
  }
};
function K(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = l.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = l.fromScreenPosition(t);
}
const X = {};
for (let n = 1; n < 10; n++)
  X["" + n] = new ae();
let u = X[1];
window.drawing = u;
function S(n) {
  return n ? X[n] ?? lt.get(n) : u;
}
function Et(n) {
  const t = S(n);
  !t || t === u || (u.leave(), u = t, K(() => l.reset()), ut(), g("drawing #" + n));
}
const ft = [...Object.values(X), ...lt.values()];
let d = null;
function At() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (d == null ? void 0 : d.type) === "line" && u.addLine(d.start, n), d = {
    type: "line",
    start: n
  };
}
function Mt() {
  (d == null ? void 0 : d.type) === "line" && (d = null);
}
function kt() {
  if (c.pos && ((d == null ? void 0 : d.type) !== "arc" && (d = { type: "arc", positions: [], cummRotation: 0 }), d.positions.push({ x: c.pos.x, y: c.pos.y }), d.positions.length === 3)) {
    const [n, t, e] = d.positions;
    u.addArc(t, e, n, d.cummRotation > 0 ? "ccw" : "cw"), d = null;
  }
}
function De() {
  if (!d || d.type !== "arc" || d.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = d.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!d.prevAngle) {
    d.prevAngle = e, d.cummRotation = 0;
    return;
  }
  let s = e - d.prevAngle;
  s > Math.PI ? s -= tt : s < -Math.PI && (s += tt), d.cummRotation += s, d.prevAngle = e;
}
function Ct() {
  (d == null ? void 0 : d.type) === "arc" && (d = null);
}
function he(n, t) {
  const e = n.attachers.indexOf(t);
  u.attachers.splice(e, 1);
  for (const s of Object.values(X))
    s.onAttacherRemoved(n, t);
}
function Ve(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(X))
    e.onAttacherAdded(n, t);
}
function de() {
  if (a().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && u.relax(); )
      ;
  }
}
function le() {
  !d && u.isEmpty() && ze(), Le(), u.render(), Oe(), Ae(), Te();
}
function ze() {
  const n = innerWidth / 100, t = (e, s) => W(e, s, E(), l.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function Le() {
  switch (d == null ? void 0 : d.type) {
    case "line":
      c.pos && W(d.start, c.pos, E(), l.toScreenPosition);
      break;
    case "arc":
      if (a().showControlPoints)
        for (const n of d.positions)
          R(n, a().controlPointColor, l.toScreenPosition);
      d.positions.length == 2 && c.pos && d.cummRotation !== void 0 && Math.abs(d.cummRotation) > 0.05 && ie(
        d.positions[0],
        d.positions[1],
        c.pos,
        d.cummRotation > 0 ? "ccw" : "cw",
        E(),
        l.toScreenPosition
      );
      break;
  }
}
function Oe() {
  if (!c.pos)
    return;
  const n = l.toScreenPosition(c.pos);
  W(
    { x: n.x - a().crosshairsSize, y: n.y },
    { x: n.x + a().crosshairsSize, y: n.y },
    E("bold")
  ), W(
    { x: n.x, y: n.y - a().crosshairsSize },
    { x: n.x, y: n.y + a().crosshairsSize },
    E("bold")
  );
}
function Te() {
  if (!a().debug)
    return;
  const n = l.toScreenPosition({ x: 0, y: 0 });
  W({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, a().axisColor), W({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, a().axisColor);
  const t = c.pos;
  t && re(l.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function It() {
  return c.pos ? u.handleAt(c.pos) : null;
}
function Q() {
  return c.pos ? u.thingAt(c.pos) : null;
}
function gt() {
  const n = Q();
  return n instanceof O ? n : null;
}
function ue() {
  const n = Q();
  return n instanceof B ? n : null;
}
function Wt() {
  u.isEmpty() || (g("solve"), u.relax());
}
function Dt() {
  a().autoSolve = !a().autoSolve, g(`auto-solve ${a().autoSolve ? "on" : "off"}`);
}
function Vt() {
  c.pos && u.delete(c.pos) && (fe(), u.isEmpty() && K(() => l.reset()));
}
function zt() {
  return !!c.pos && u.fixedDistance(c.pos);
}
function Lt() {
  return !!c.pos && u.fixedPoint(c.pos);
}
function Ot() {
  return !!c.pos && u.weight(c.pos);
}
function Tt() {
  return !!c.pos && u.horizontalOrVertical(c.pos);
}
function Ht() {
  return !!c.pos && u.fullSize(c.pos);
}
function me() {
  const n = c.pos;
  n && (g("re-center"), K(() => {
    l.centerAt(n);
  }));
}
function $t(n) {
  const t = S(n);
  if (!t.isEmpty() && c.pos && (a().recursion || !t.contains(S()))) {
    const e = u.addInstance(t, c.pos, 0.5 * t.size / l.scale, 0);
    g({ message: "instantiate #" + n, referents: /* @__PURE__ */ new Set([e]) });
  }
}
function Ft() {
  c.pos && u.dismember(c.pos) && fe();
}
function st(n) {
  return !!c.pos && u.rotateInstanceAt(c.pos, n);
}
function it(n) {
  return !!c.pos && u.resizeInstanceAt(c.pos, n);
}
function Rt() {
  if (!c.pos)
    return;
  const n = u.handleAt(c.pos);
  n && (u.attachers.includes(n) ? (he(u, n), g("remove attacher")) : (Ve(u, n), g("add attacher")));
}
let T = null;
function Yt() {
  if (!T) {
    (T = gt()) && g({ message: "equal length", referents: /* @__PURE__ */ new Set([T]) });
    return;
  }
  const n = gt();
  n && (S().constraints.add(
    new ct(T.a, T.b, n.a, n.b)
  ), g({ message: "equal length", referents: /* @__PURE__ */ new Set([T, n]) }));
}
function ut() {
  T = null;
}
function pt(n) {
  K(() => l.scale = n), g("scale=" + l.scale.toFixed(1));
}
function Xt(n, t) {
  K(() => {
    l.center.x -= n, l.center.y -= t;
  });
}
function fe() {
  for (; He(); )
    ;
}
function He() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of ft)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of ft) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (he(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of ft)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Vt,
  dismember: Ft,
  drawing: S,
  endArc: Ct,
  endEqualLength: ut,
  endLines: Mt,
  fixedDistance: zt,
  fixedPoint: Lt,
  fullSize: Ht,
  handle: It,
  horizontalOrVertical: Tt,
  instance: ue,
  instantiate: $t,
  line: gt,
  moreArc: kt,
  moreEqualLength: Yt,
  moreLines: At,
  onFrame: de,
  panBy: Xt,
  pen: c,
  reCenter: me,
  render: le,
  rotateInstanceBy: st,
  scaleInstanceBy: it,
  setScale: pt,
  solve: Wt,
  switchToDrawing: Et,
  thing: Q,
  toggleAttacher: Rt,
  toggleAutoSolve: Dt,
  weight: Ot
}, Symbol.toStringTag, { value: "Module" }));
var Qt;
const Fe = (Qt = window.webkit) == null ? void 0 : Qt.messageHandlers, Re = window.webkit != null;
function Nt(n, t = n) {
  Re && Fe[n].postMessage(t);
}
let J = [], yt = !1;
function Ye() {
  const n = J;
  return J = [], n;
}
function Gt(n) {
  for (const t of n)
    (!t.predicted || a().usePredictedEvents) && J.push(t);
}
function Ut(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (yt = !0), t === "ended" && (yt = !1), !(t === "moved" && !yt) && J.push({
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
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", ye), J = [];
}
window.onpointerdown = (n) => Ut(n, "began");
window.onpointermove = (n) => Ut(n, "moved");
window.onpointerup = (n) => Ut(n, "ended");
const ye = (n) => n.preventDefault();
window.addEventListener("touchstart", ye, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Gt, Xe(), Gt(n);
};
const Kt = 0.75, qt = () => a().fontScale * 8;
function H(n, t, e, s = 0.35) {
  S().drawText(n, s, {
    x: t + a().tabletButtonWidth / 2,
    y: e + qt() / 2 + s * a().fontScale * 3
  });
}
class m {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + a().tabletButtonWidth && this.topY <= e && e < this.topY + qt();
  }
  render() {
    H(this.label, this.leftX, this.topY);
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class xe {
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
      i.leftX = t, i.topY = s * qt(), s++;
  }
}
let Y;
function Ue() {
  Y = ge;
}
function qe() {
  Y.processEvents(), Y.onFrame();
}
function je() {
  Y.render();
}
const ge = new class extends xe {
  constructor() {
    super(), this.lineButton = new m("LINE"), this.moveButton = new m("MOVE"), this.horvButton = new m("HORV"), this.sizeButton = new m("SIZE"), this.dismemberButton = new m("DISM"), this.deleteButton = new m("DEL"), this.solveButton = new m("SOLVE"), this.arcButton = new m("ARC"), this.eqButton = new m("EQ"), this.fixButton = new m("FIX"), this.weightButton = new m("weight"), this.attacherButton = new m("ATT"), this.clearButton = new m("CLEAR"), this.autoSolveButton = new m("AUTO"), this.configButton = new m("config"), this.reloadButton = new m("reload"), this.col1 = [
      new m("1"),
      new m("2"),
      new m("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      new m("4"),
      new m("5"),
      new m("6"),
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
    this.solveButton.isDown && Wt();
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
    c.clearPos(), this.endDragEtc(), Mt(), Ct();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof P && S().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && Yt();
  }
  onButtonDown(n) {
    if ("1" <= n.label && n.label <= "9") {
      c.pos ? ($t(n.label), this.move()) : Et(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        S().clear(), l.reset();
        break;
      case this.lineButton:
        At();
        break;
      case this.arcButton:
        kt();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Tt();
        break;
      case this.fixButton:
        Lt() || zt();
        break;
      case this.sizeButton:
        Ht();
        break;
      case this.weightButton:
        Ot();
        break;
      case this.dismemberButton:
        Ft();
        break;
      case this.attacherButton:
        Rt();
        break;
      case this.deleteButton:
        Vt();
        break;
      case this.autoSolveButton:
        Dt();
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        Y = _e;
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && ut();
  }
  onFingerMove(n, t) {
    if (S().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = l.fromScreenPosition(n), i = l.fromScreenPosition(e);
    if (c.pos || Xt(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let o = null;
    for (const [U, F] of this.fingerScreenPositions.entries())
      if (U !== t) {
        o = F;
        break;
      }
    if (!o)
      throw new Error("bruh?!");
    const r = l.fromScreenPosition(o), h = p(r, i), v = p(r, s) / h, D = Math.atan2(i.y - r.y, i.x - r.x), x = Math.atan2(s.y - r.y, s.x - r.x);
    ue() && !this.drag && this.move(), !it(v) && !c.pos && (l.scale *= v), st(x - D);
  }
  move() {
    const n = It();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = Q();
    t && (this.drag = { thing: t, offset: Zt(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Nt("prepareHaptics");
  }
  hapticBump() {
    Nt("hapticImpact");
  }
}(), _e = new class extends xe {
  constructor() {
    super(), this.leftyButton = new m("lefty"), this.lineWidthButton = new m("lwidth"), this.alphaButton = new m("opacity"), this.flickerButton = new m("flicker"), this.ctrlPtsButton = new m("ctrl pts"), this.recursionButton = new m("schachman"), this.defaultsButton = new m("defaults"), this.backButton = new m("back"), this.col1 = [
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
    super.render(), H(
      a().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * a().tabletButtonWidth,
      this.leftyButton.topY
    ), H(
      a().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * a().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * Kt
    ), H(
      a().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * a().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * Kt
    ), H(
      a().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * a().tabletButtonWidth,
      this.flickerButton.topY
    ), H(
      a().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * a().tabletButtonWidth,
      this.ctrlPtsButton.topY
    ), H(
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
        L({ lefty: !a().lefty });
        break;
      case this.flickerButton:
        L({ flicker: !a().flicker });
        break;
      case this.ctrlPtsButton:
        L({ showControlPoints: !a().showControlPoints });
        break;
      case this.recursionButton:
        L({ recursion: !a().recursion }), g(a().recursion ? "use at your own risk!" : "phew");
        break;
      case this.backButton:
        Y = ge;
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
      L({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(a().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      L({ baseAlphaMultiplier: e });
    }
  }
}(), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ue,
  onFrame: qe,
  render: je
}, Symbol.toStringTag, { value: "Module" }));
function pe(n, t = 1) {
  const e = S(), s = [];
  return ce(n, t, (i, o, r) => {
    const h = e.addInstance(i, { x: o, y: l.center.y }, i.size * r, 0);
    e.constraints.add(new dt(h, r));
    const y = s.at(-1);
    y && e.replaceHandle(h.attachers[0], y.attachers[1]), s.push(h);
  }), s;
}
function Ne(n, t = 1) {
  const e = pe(n, t);
  for (const s of e) {
    const i = l.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    s.x = i.x, s.x = i.y;
  }
}
const Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: Ne,
  write: pe
}, Symbol.toStringTag, { value: "Module" })), A = {};
let N = !1, G = !1, w = null;
function Ke() {
  window.addEventListener("keydown", tn), window.addEventListener("keyup", en), b.addEventListener("pointerdown", nn), b.addEventListener("pointermove", sn), b.addEventListener("pointerup", rn);
}
function Qe() {
  A[" "] && Wt();
}
function Ze() {
}
function tn(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? $t(t) : Et(t);
    return;
  }
  switch (n.key) {
    case "f":
      L({ flicker: !a().flicker });
      return;
    case "d":
      a().debug = !a().debug, g(`debug ${a().debug ? "on" : "off"}`);
      return;
    case "S":
      Dt();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Vt();
        break;
      case ".":
        Lt() || zt();
        break;
      case "W":
        Ot();
        break;
      case "h":
        Tt();
        break;
      case "=":
        it(1.05) || pt(Math.min(l.scale + 0.1, 10));
        break;
      case "-":
        it(0.95) || pt(Math.max(l.scale - 0.1, 0.1));
        break;
      case "q":
        st(5 * Math.PI / 180);
        break;
      case "w":
        st(-5 * Math.PI / 180);
        break;
      case "s":
        Ht();
        break;
      case "A":
        Rt();
        break;
      case "c":
        me();
        break;
      case "D":
        Ft();
        break;
    }
}
function en(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      Mt(), G = !1, N || c.clearPos();
      break;
    case "a":
      Ct(), G = !1, N || c.clearPos();
      break;
    case "e":
      ut();
      break;
  }
}
function nn(n) {
  if (b.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), N = !0, A.Meta) {
    At(), G = !0;
    return;
  } else if (A.a) {
    kt(), G = !0;
    return;
  } else if (A.e) {
    Yt();
    return;
  }
  w = null;
  const t = It();
  if (t) {
    w = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = Q();
  e && (w = { thing: e, offset: Zt(c.pos, e) });
}
function sn(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), N && t && !S().isEmpty() && !G && !w) {
    Xt(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(w == null ? void 0 : w.thing), w) {
    const e = c.pos.x - w.offset.x, s = c.pos.y - w.offset.y;
    w.thing.moveBy(e - w.thing.x, s - w.thing.y);
  }
}
function rn(n) {
  b.releasePointerCapture(n.pointerId), N = !1, A.Meta || c.clearPos(), (w == null ? void 0 : w.thing) instanceof P && S().mergeAndAddImplicitConstraints(w.thing), w = null;
}
const on = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ke,
  onFrame: Qe,
  render: Ze
}, Symbol.toStringTag, { value: "Module" }));
Pe(document.getElementById("canvas"));
const wt = new URLSearchParams(window.location.search).get("tablet") ? Je : on;
wt.init();
function we() {
  wt.onFrame(), de(), Ee(), wt.render(), le(), requestAnimationFrame(we);
}
we();
window.app = $e;
window.demos = Ge;
