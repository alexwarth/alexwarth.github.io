const yt = {
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
function we() {
  I = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(yt));
  for (const [n, t] of Object.entries(yt))
    Object.hasOwn(I, n) || (I[n] = t);
}
function D(n) {
  I = { ...I, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function be() {
  I = JSON.parse(JSON.stringify(yt)), localStorage.setItem("config", JSON.stringify(I));
}
function a() {
  return I;
}
we();
window.config = a;
const Be = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(Q(n, t));
}
function Q(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Qt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const Z = Object.freeze({ x: 0, y: 0 });
function Zt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function wt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, o = e * i;
  return { x: r + t.x, y: o + t.y };
}
function bt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), o = Math.cos(e), h = s * o - i * r, b = s * r + i * o;
  return { x: h + t.x, y: b + t.y };
}
function te(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function ee(n, t, e) {
  return Math.sqrt(Se(n, t, e));
}
function Se(n, t, e) {
  const s = Q(t, e);
  if (s == 0)
    return Q(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return Q(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function qt(n) {
  return 1 - Math.pow(1 - n, 5);
}
let p, m;
function ve(n) {
  p = n, m = p.getContext("2d"), ne();
}
function ne() {
  if (p.width = innerWidth, p.height = innerHeight, devicePixelRatio !== 1) {
    const n = p.width, t = p.height;
    p.width = n * devicePixelRatio, p.height = t * devicePixelRatio, p.style.width = n + "px", p.style.height = t + "px", m.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", ne);
function Pe() {
  m.clearRect(0, 0, p.width, p.height), m.lineWidth = a().lineWidth, m.lineCap = "round";
}
function rt(n) {
  return n;
}
function F(n, t = P(), e = rt) {
  const s = e(n);
  m.fillStyle = t, m.beginPath(), m.arc(s.x, s.y, m.lineWidth * 2, 0, Be), m.fill();
}
function W(n, t, e = P(), s = rt) {
  const i = m.lineWidth;
  n.x === t.x && n.y === t.y && (m.lineWidth *= 2), m.strokeStyle = e, m.beginPath();
  const r = s(n), o = s(t);
  m.moveTo(r.x, r.y), m.lineTo(o.x, o.y), m.stroke(), m.lineWidth = i;
}
function se(n, t, e, s = P(), i = rt) {
  const r = i(t), o = i(e), h = i(n);
  m.beginPath(), m.strokeStyle = s;
  const b = Math.atan2(r.y - h.y, r.x - h.x), E = Math.atan2(o.y - h.y, o.x - h.x);
  m.arc(h.x, h.y, w(h, r), b, E), m.stroke();
}
function ie(n, t, e = P(), s = rt) {
  m.fillStyle = e;
  const i = 12;
  m.font = `${i}px Major Mono Display`;
  const r = m.measureText(t).width, { x: o, y: h } = s(n);
  m.fillText(t, o - r / 2, h + i / 2);
}
function P(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= a().baseAlphaMultiplier, `rgba(255,255,255,${a().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let V = 1;
const z = { x: 0, y: 0 }, d = {
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
let C = null, re = 0;
function y(n) {
  C = typeof n == "string" ? { message: n } : n, re = Date.now();
}
function Ee() {
  if (C === null)
    return;
  const n = Date.now() - re;
  if (n > a().statusTimeMillis) {
    C = null;
    return;
  }
  if (C.message) {
    m.font = "40px Monaco";
    const e = m.measureText(C.message).width, s = 1 - qt(n / a().statusTimeMillis);
    m.fillStyle = `rgba(255,222,33,${s})`, m.fillText(C.message, (innerWidth - e) / 2, innerHeight - 40);
  }
  if (a().highlightReferents && C.referents) {
    const e = `rgba(255,222,33,${1 - qt(n / (0.5 * a().statusTimeMillis))})`;
    for (const s of C.referents)
      s.render(d.toScreenPosition, e, 2);
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
      this.handles[s], this.handles.forEach((i, r) => {
        i === t && (this.handles[r] = e);
      });
  }
}
class Bt extends M {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e, s) {
    return new Bt(e.get(this.p), s(this.pos));
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
class St extends M {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new St(e.get(this.a), e.get(this.b));
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
class tt extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = w(t, e);
  }
  map(t, e) {
    return new tt(e.get(this.a), e.get(this.b));
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
class ot extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new ot(
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
class U extends M {
  constructor(t, e, s) {
    super([], [t, e, s]);
  }
  map(t, e) {
    return new U(
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
    return ee(this.p, this.a, this.b);
  }
}
class q extends M {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new q(
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
class at extends M {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new at(
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
      Zt(
        wt(
          bt(this.masterPoint, Z, this.instance.angle),
          Z,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class ct extends M {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new ct(t.get(this.instance), this.scale);
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class vt extends M {
  constructor(t) {
    super([], [t]);
  }
  map(t, e) {
    return new vt(e.get(this.a));
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
class jt {
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
    const e = d.scale > 0 ? 1 / d.scale : 1, s = a().minWorthwhileErrorImprovement * e;
    let i = !1;
    for (const r of t)
      i = this.relaxWithVar(r, e, s) || i;
    return i;
  }
  relaxWithVar(t, e, s) {
    const i = t.value, r = this.computeError() - s;
    t.value = i + e;
    const o = this.computeError();
    t.value = i - e;
    const h = this.computeError();
    return o < Math.min(r, h) ? (t.value = i + e, !0) : h < Math.min(r, o) ? (t.value = i - e, !0) : (t.value = i, !1);
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
const st = class st {
  constructor({ x: t, y: e }) {
    this.id = st.nextId++, this.xVar = new $(t), this.yVar = new $(e);
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
    return w(t, this) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return w(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = a().instanceSideAttacherColor) {
    a().debug && ie(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), F(this, e, t);
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
st.nextId = 0;
let v = st;
class L {
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
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return ee(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !a().showGuideLines)
      return;
    const s = this.isGuide ? a().guideLineColor : e ?? P();
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
class K {
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
    return this.distanceTo(t) <= a().closeEnough / d.scale;
  }
  distanceTo(t) {
    return Math.abs(w(t, this.c) - w(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    se(this.c, this.a, this.b, e ?? P(), t), s === 1 && (F(this.a, a().controlPointColor, t), F(this.b, a().controlPointColor, t), F(this.c, a().controlPointColor, t));
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
const it = class it {
  constructor(t, e, s, i, r, o) {
    this.master = t, this.transform = (h) => Zt(wt(bt(h, Z, this.angle), Z, this.scale), this), this.id = it.nextId++, this.attachers = [], this.xVar = new $(e), this.yVar = new $(s), this.angleAndSizeVecX = new $(i * Math.cos(r)), this.angleAndSizeVecY = new $(i * Math.sin(r)), this.addAttachers(t, o);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new v(this.transform(t));
    this.attachers.push(s), e.constraints.add(new at(s, this, t));
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
    return te(i);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => t(this.transform(i)), e, s), s === 1 && this.attachers.forEach((i, r) => {
      const o = t(i);
      W(
        t(this.transform(this.master.attachers[r])),
        o,
        a().instanceSideAttacherColor
      ), F(o, a().instanceSideAttacherColor);
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
it.nextId = 0;
let B = it;
class oe {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new jt();
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
      if (i instanceof tt) {
        let r = (i.computeError() * 100).toFixed();
        r === "-0" && (r = "0"), this.drawText(
          r,
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
  addInstance(t, { x: e, y: s }, i, r) {
    const o = new B(t, e, s, i, r, this);
    return this.things.push(o), o;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof B))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: r, y: o } = wt(i, s, e);
      i.x = r, i.y = o;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof B))
      return !1;
    s.angle += e;
    for (const i of s.attachers) {
      const { x: r, y: o } = bt(i, s, e);
      i.x = r, i.y = o;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const r = new L(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b));
    for (const o of this.things)
      o.forEachHandle((h) => {
        h !== r.a && h !== r.b && r.contains(h) && this.constraints.add(new U(h, r.a, r.b));
      });
    return this.things.push(r), r;
  }
  addArc(t, e, s, i = !0) {
    const r = new K(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new ot(r.a, r.c, r.b, r.c));
    for (const o of this.things)
      o.forEachHandle((h) => {
        h !== r.a && h !== r.b && h !== r.c && r.contains(h) && this.constraints.add(new q(h, r.a, r.b, r.c));
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
      e.has(s) || !s.contains(t) || (s instanceof L ? (this.constraints.add(new U(t, s.a, s.b)), a().showImplicitConstraints && y({ message: "(point on line)", referents: /* @__PURE__ */ new Set([t, s]) })) : s instanceof K && (this.constraints.add(new q(t, s.a, s.b, s.c)), a().showImplicitConstraints && y({ message: "(point on arc)", referents: /* @__PURE__ */ new Set([t, s]) })));
  }
  replaceHandle(t, e) {
    this.things.forEach((s) => s.replaceHandle(t, e)), this.attachers = this.attachers.map((s) => s === t ? e : s), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? (this.things = this.things.filter((s) => s !== e), y({ message: "delete", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Bt(e, t)), y({ message: "fixed point", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new vt(e)), y({ message: "weight", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof L ? (this.constraints.add(new tt(e.a, e.b)), y({ message: "fixed distance", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof L ? (this.constraints.add(new St(e.a, e.b)), y({ message: "HorV", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.constraints.add(new ct(e)), y({ message: "full size", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.inline(e), y({ message: "dismember", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const o of e)
      if (o instanceof L) {
        const h = this.addLine(
          t.transform(o.a),
          t.transform(o.b),
          o.isGuide
        );
        i.set(o.a, h.a), i.set(o.b, h.b);
      } else if (o instanceof K) {
        const h = this.addArc(
          t.transform(o.a),
          t.transform(o.b),
          t.transform(o.c)
        );
        i.set(o.a, h.a), i.set(o.b, h.b), i.set(o.c, h.c);
      } else if (o instanceof B) {
        const h = this.addInstance(
          o.master,
          t.transform(o),
          // move the center to the right place
          t.scale * o.size,
          t.angle + o.angle
        );
        r.set(o, h);
      } else
        throw new Error("unsupported thing type: " + o.constructor.name);
    s.forEach((o) => {
      this.constraints.add(o.map(r, i, t.transform));
    }), this.things = this.things.filter((o) => o !== t);
  }
  snap(t, e) {
    const s = this.handleAt(t, e);
    if (s)
      return b(s), "H";
    const i = new jt(), r = new v(t), o = /* @__PURE__ */ new Set();
    r.forEachVar((x) => o.add(x));
    const h = [];
    for (const x of this.things)
      x === e || e instanceof v && E(x, e) || !x.contains(t) || (x instanceof L ? (i.add(new U(r, x.a, x.b)), h.push("L")) : x instanceof K && (i.add(new q(r, x.a, x.b, x.c)), h.push("A")));
    if (i.isEmpty())
      return null;
    for (; i.relax(o); )
      ;
    return b(r), h.join();
    function b(x) {
      if (e) {
        const X = x.x - e.x, H = x.y - e.y;
        e.moveBy(X, H);
      }
      t.x = x.x, t.y = x.y;
    }
    function E(x, X) {
      let H = !1;
      return x.forEachHandle((lt) => {
        lt === X && (H = !0);
      }), H;
    }
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((o) => {
        if (o !== e && o.contains(t)) {
          const h = w(t, o);
          h < s && (i = o, s = h);
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
  boundingBox(t = this) {
    const e = [...this.getPositions()];
    for (const s of this.things)
      if (s instanceof B && s.master !== t) {
        const i = s.boundingBox(t);
        e.push(i.topLeft), e.push(i.bottomRight);
      }
    return te(e);
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
      e instanceof B && t.add(e);
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
      s instanceof B && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof at && s.masterPoint === e) {
        const { instance: i, instancePoint: r } = s;
        i.attachers = i.attachers.filter((o) => o !== r), this.constraints.remove(s);
      }
    });
  }
  drawText(t, e, s) {
    ae(
      t,
      e,
      (i, r, o) => i.render(
        ({ x: h, y: b }) => ({
          x: h * o + r - d.center.x + s.x,
          y: -b * o + s.y
        }),
        void 0,
        1
      )
    );
  }
}
const Ae = {
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
}, Me = 1, ke = {
  data: Ae,
  version: Me
};
function Ce(n, t, e = a().fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = ut(s.start, e), r = ut(s.end, e);
        n.addLine(i, r, !1, !1);
        break;
      }
      case "arc": {
        const i = ut(s.center, e), r = s.radius * e;
        n.addArc(
          _t(i, s.end, r),
          _t(i, s.start, r),
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
const Ie = new Map(ke.data.values), ht = /* @__PURE__ */ new Map();
for (const [n, t] of Ie) {
  const e = new oe();
  Ce(e, t, a().fontScale);
  const s = e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), ht.set(n, e);
}
function ae(n, t, e) {
  const s = (o) => t * (o === o.toUpperCase() ? 1 : 0.75), i = (o) => s(o) * a().fontScale * (4 + a().kerning * 2);
  let r = d.center.x - 0.5 * [...n].map(i).reduce((o, h) => o + h, 0);
  for (let o = 0; o < n.length; o++) {
    const h = n[o], b = s(h), E = ht.get(h.toUpperCase());
    E && e(E, r, b), r += i(h);
  }
}
function ut({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function _t({ x: n, y: t }, e, s) {
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
  snapPos(n) {
    return k ? l.snap(k, n) : null;
  },
  moveToScreenPos(n) {
    const t = d.fromScreenPosition(n);
    k ? (k.x = t.x, k.y = t.y) : k = t;
  },
  clearPos() {
    k = null;
  }
};
function N(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = d.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = d.fromScreenPosition(t);
}
const R = {};
for (let n = 1; n < 10; n++)
  R["" + n] = new oe();
let l = R[1];
window.drawing = l;
function S(n) {
  return n ? R[n] ?? ht.get(n) : l;
}
function Pt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, N(() => d.reset()), dt(), y("drawing #" + n));
}
const mt = [...Object.values(R), ...ht.values()];
let f = null;
function Et() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (f == null ? void 0 : f.type) === "line" && l.addLine(f.start, n), f = {
    type: "line",
    start: n
  };
}
function At() {
  (f == null ? void 0 : f.type) === "line" && (f = null);
}
function Mt() {
  if (c.pos && ((f == null ? void 0 : f.type) !== "arc" && (f = { type: "arc", positions: [] }), f.positions.push({ x: c.pos.x, y: c.pos.y }), f.positions.length === 3)) {
    const [n, t, e] = f.positions;
    l.addArc(t, e, n), f = null;
  }
}
function kt() {
  (f == null ? void 0 : f.type) === "arc" && (f = null);
}
function ce(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(R))
    s.onAttacherRemoved(n, t);
}
function We(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(R))
    e.onAttacherAdded(n, t);
}
function he() {
  if (a().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function de() {
  !f && l.isEmpty() && Ve(), ze(), l.render(), De(), Ee(), Le();
}
function Ve() {
  const n = innerWidth / 100, t = (e, s) => W(e, s, P(), d.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function ze() {
  switch (f == null ? void 0 : f.type) {
    case "line":
      c.pos && W(f.start, c.pos, P(), d.toScreenPosition);
      break;
    case "arc":
      if (a().showControlPoints)
        for (const n of f.positions)
          F(n, a().controlPointColor, d.toScreenPosition);
      f.positions.length > 1 && c.pos && se(
        f.positions[0],
        f.positions[1],
        c.pos,
        P(),
        d.toScreenPosition
      );
      break;
  }
}
function De() {
  if (!c.pos)
    return;
  const n = d.toScreenPosition(c.pos);
  W(
    { x: n.x - a().crosshairsSize, y: n.y },
    { x: n.x + a().crosshairsSize, y: n.y },
    P("bold")
  ), W(
    { x: n.x, y: n.y - a().crosshairsSize },
    { x: n.x, y: n.y + a().crosshairsSize },
    P("bold")
  );
}
function Le() {
  if (!a().debug)
    return;
  const n = d.toScreenPosition({ x: 0, y: 0 });
  W({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, a().axisColor), W({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, a().axisColor);
  const t = c.pos;
  t && ie(d.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Ct() {
  return c.pos ? l.handleAt(c.pos) : null;
}
function G() {
  return c.pos ? l.thingAt(c.pos) : null;
}
function xt() {
  const n = G();
  return n instanceof L ? n : null;
}
function le() {
  const n = G();
  return n instanceof B ? n : null;
}
function It() {
  l.isEmpty() || (y("solve"), l.relax());
}
function Wt() {
  a().autoSolve = !a().autoSolve, y(`auto-solve ${a().autoSolve ? "on" : "off"}`);
}
function Vt() {
  c.pos && l.delete(c.pos) && (me(), l.isEmpty() && N(() => d.reset()));
}
function zt() {
  return !!c.pos && l.fixedDistance(c.pos);
}
function Dt() {
  return !!c.pos && l.fixedPoint(c.pos);
}
function Lt() {
  return !!c.pos && l.weight(c.pos);
}
function Ot() {
  return !!c.pos && l.horizontalOrVertical(c.pos);
}
function Tt() {
  return !!c.pos && l.fullSize(c.pos);
}
function ue() {
  const n = c.pos;
  n && (y("re-center"), N(() => {
    d.centerAt(n);
  }));
}
function Ht(n) {
  const t = S(n);
  if (!t.isEmpty() && c.pos && (a().recursion || !t.contains(S()))) {
    const e = l.addInstance(t, c.pos, 0.5 * t.size / d.scale, 0);
    y({ message: "instantiate #" + n, referents: /* @__PURE__ */ new Set([e]) });
  }
}
function $t() {
  c.pos && l.dismember(c.pos) && me();
}
function et(n) {
  return !!c.pos && l.rotateInstanceAt(c.pos, n);
}
function nt(n) {
  return !!c.pos && l.resizeInstanceAt(c.pos, n);
}
function Ft() {
  if (!c.pos)
    return;
  const n = l.handleAt(c.pos);
  n && (l.attachers.includes(n) ? (ce(l, n), y("remove attacher")) : (We(l, n), y("add attacher")));
}
let O = null;
function Yt() {
  if (!O) {
    (O = xt()) && y({ message: "equal length", referents: /* @__PURE__ */ new Set([O]) });
    return;
  }
  const n = xt();
  n && (S().constraints.add(
    new ot(O.a, O.b, n.a, n.b)
  ), y({ message: "equal length", referents: /* @__PURE__ */ new Set([O, n]) }));
}
function dt() {
  O = null;
}
function gt(n) {
  N(() => d.scale = n), y("scale=" + d.scale.toFixed(1));
}
function Rt(n, t) {
  N(() => {
    d.center.x -= n, d.center.y -= t;
  });
}
function me() {
  for (; Oe(); )
    ;
}
function Oe() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of mt)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of mt) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (ce(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of mt)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Vt,
  dismember: $t,
  drawing: S,
  endArc: kt,
  endEqualLength: dt,
  endLines: At,
  fixedDistance: zt,
  fixedPoint: Dt,
  fullSize: Tt,
  handle: Ct,
  horizontalOrVertical: Ot,
  instance: le,
  instantiate: Ht,
  line: xt,
  moreArc: Mt,
  moreEqualLength: Yt,
  moreLines: Et,
  onFrame: he,
  panBy: Rt,
  pen: c,
  reCenter: ue,
  render: de,
  rotateInstanceBy: et,
  scaleInstanceBy: nt,
  setScale: gt,
  solve: It,
  switchToDrawing: Pt,
  thing: G,
  toggleAttacher: Ft,
  toggleAutoSolve: Wt,
  weight: Lt
}, Symbol.toStringTag, { value: "Module" }));
var Kt;
const He = (Kt = window.webkit) == null ? void 0 : Kt.messageHandlers, $e = window.webkit != null;
function Jt(n, t = n) {
  $e && He[n].postMessage(t);
}
let j = [], ft = !1;
function Fe() {
  const n = j;
  return j = [], n;
}
function Nt(n) {
  for (const t of n)
    (!t.predicted || a().usePredictedEvents) && j.push(t);
}
function Xt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (ft = !0), t === "ended" && (ft = !1), !(t === "moved" && !ft) && j.push({
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
function Ye() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", fe), j = [];
}
window.onpointerdown = (n) => Xt(n, "began");
window.onpointermove = (n) => Xt(n, "moved");
window.onpointerup = (n) => Xt(n, "ended");
const fe = (n) => n.preventDefault();
window.addEventListener("touchstart", fe, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Nt, Ye(), Nt(n);
};
const Gt = 0.75, Ut = () => a().fontScale * 8;
function T(n, t, e, s = 0.35) {
  S().drawText(n, s, {
    x: t + a().tabletButtonWidth / 2,
    y: e + Ut() / 2 + s * a().fontScale * 3
  });
}
class u {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + a().tabletButtonWidth && this.topY <= e && e < this.topY + Ut();
  }
  render() {
    T(this.label, this.leftX, this.topY);
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class ye {
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
    for (const t of Fe())
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
      i.leftX = t, i.topY = s * Ut(), s++;
  }
}
let Y;
function Re() {
  Y = xe;
}
function Xe() {
  Y.processEvents(), Y.onFrame();
}
function Ue() {
  Y.render();
}
const xe = new class extends ye {
  constructor() {
    super(), this.lineButton = new u("LINE"), this.moveButton = new u("MOVE"), this.horvButton = new u("HORV"), this.sizeButton = new u("SIZE"), this.dismemberButton = new u("DISM"), this.deleteButton = new u("DEL"), this.solveButton = new u("SOLVE"), this.arcButton = new u("ARC"), this.eqButton = new u("EQ"), this.fixButton = new u("FIX"), this.weightButton = new u("weight"), this.attacherButton = new u("ATT"), this.clearButton = new u("CLEAR"), this.autoSolveButton = new u("AUTO"), this.configButton = new u("config"), this.reloadButton = new u("reload"), this.col1 = [
      new u("1"),
      new u("2"),
      new u("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      new u("4"),
      new u("5"),
      new u("6"),
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
    this.solveButton.isDown && It();
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
    c.clearPos(), this.endDragEtc(), At(), kt();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof v && S().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && Yt();
  }
  onButtonDown(n) {
    if ("1" <= n.label && n.label <= "9") {
      c.pos ? (Ht(n.label), this.move()) : Pt(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        S().clear(), d.reset();
        break;
      case this.lineButton:
        Et();
        break;
      case this.arcButton:
        Mt();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Ot();
        break;
      case this.fixButton:
        Dt() || zt();
        break;
      case this.sizeButton:
        Tt();
        break;
      case this.weightButton:
        Lt();
        break;
      case this.dismemberButton:
        $t();
        break;
      case this.attacherButton:
        Ft();
        break;
      case this.deleteButton:
        Vt();
        break;
      case this.autoSolveButton:
        Wt();
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        Y = qe;
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && dt();
  }
  onFingerMove(n, t) {
    if (S().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = d.fromScreenPosition(n), i = d.fromScreenPosition(e);
    if (c.pos || Rt(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let r = null;
    for (const [H, lt] of this.fingerScreenPositions.entries())
      if (H !== t) {
        r = lt;
        break;
      }
    if (!r)
      throw new Error("bruh?!");
    const o = d.fromScreenPosition(r), h = w(o, i), E = w(o, s) / h, x = Math.atan2(i.y - o.y, i.x - o.x), X = Math.atan2(s.y - o.y, s.x - o.x);
    le() && !this.drag && this.move(), !nt(E) && !c.pos && (d.scale *= E), et(X - x);
  }
  move() {
    const n = Ct();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = G();
    t && (this.drag = { thing: t, offset: Qt(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Jt("prepareHaptics");
  }
  hapticBump() {
    Jt("hapticImpact");
  }
}(), qe = new class extends ye {
  constructor() {
    super(), this.leftyButton = new u("lefty"), this.lineWidthButton = new u("lwidth"), this.alphaButton = new u("opacity"), this.flickerButton = new u("flicker"), this.ctrlPtsButton = new u("ctrl pts"), this.recursionButton = new u("schachman"), this.defaultsButton = new u("defaults"), this.backButton = new u("back"), this.col1 = [
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
    super.render(), T(
      a().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * a().tabletButtonWidth,
      this.leftyButton.topY
    ), T(
      a().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * a().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * Gt
    ), T(
      a().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * a().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * Gt
    ), T(
      a().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * a().tabletButtonWidth,
      this.flickerButton.topY
    ), T(
      a().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * a().tabletButtonWidth,
      this.ctrlPtsButton.topY
    ), T(
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
        be(), y("restored defaults!");
        break;
      case this.leftyButton:
        D({ lefty: !a().lefty });
        break;
      case this.flickerButton:
        D({ flicker: !a().flicker });
        break;
      case this.ctrlPtsButton:
        D({ showControlPoints: !a().showControlPoints });
        break;
      case this.recursionButton:
        D({ recursion: !a().recursion }), y(a().recursion ? "use at your own risk!" : "phew");
        break;
      case this.backButton:
        Y = xe;
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
      D({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(a().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      D({ baseAlphaMultiplier: e });
    }
  }
}(), je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Re,
  onFrame: Xe,
  render: Ue
}, Symbol.toStringTag, { value: "Module" }));
function ge(n, t = 1) {
  const e = S(), s = [];
  return ae(n, t, (i, r, o) => {
    const h = e.addInstance(i, { x: r, y: d.center.y }, i.size * o, 0);
    e.constraints.add(new ct(h, o));
    const b = s.at(-1);
    b && e.replaceHandle(h.attachers[0], b.attachers[1]), s.push(h);
  }), s;
}
function _e(n, t = 1) {
  const e = ge(n, t);
  for (const s of e) {
    const i = d.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    s.x = i.x, s.x = i.y;
  }
}
const Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: _e,
  write: ge
}, Symbol.toStringTag, { value: "Module" })), A = {};
let _ = !1, J = !1, g = null;
function Ne() {
  window.addEventListener("keydown", Qe), window.addEventListener("keyup", Ze), p.addEventListener("pointerdown", tn), p.addEventListener("pointermove", en), p.addEventListener("pointerup", nn);
}
function Ge() {
  A[" "] && It();
}
function Ke() {
}
function Qe(n) {
  if (A[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    A.Shift ? Ht(t) : Pt(t);
    return;
  }
  switch (n.key) {
    case "f":
      D({ flicker: !a().flicker });
      return;
    case "d":
      a().debug = !a().debug, y(`debug ${a().debug ? "on" : "off"}`);
      return;
    case "S":
      Wt();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Vt();
        break;
      case ".":
        Dt() || zt();
        break;
      case "W":
        Lt();
        break;
      case "h":
        Ot();
        break;
      case "=":
        nt(1.05) || gt(Math.min(d.scale + 0.1, 10));
        break;
      case "-":
        nt(0.95) || gt(Math.max(d.scale - 0.1, 0.1));
        break;
      case "q":
        et(5 * Math.PI / 180);
        break;
      case "w":
        et(-5 * Math.PI / 180);
        break;
      case "s":
        Tt();
        break;
      case "A":
        Ft();
        break;
      case "c":
        ue();
        break;
      case "D":
        $t();
        break;
    }
}
function Ze(n) {
  switch (delete A[n.key], n.key) {
    case "Meta":
      At(), J = !1, _ || c.clearPos();
      break;
    case "a":
      kt(), J = !1, _ || c.clearPos();
      break;
    case "e":
      dt();
      break;
  }
}
function tn(n) {
  if (p.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), _ = !0, A.Meta) {
    Et(), J = !0;
    return;
  } else if (A.a) {
    Mt(), J = !0;
    return;
  } else if (A.e) {
    Yt();
    return;
  }
  g = null;
  const t = Ct();
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = G();
  e && (g = { thing: e, offset: Qt(c.pos, e) });
}
function en(n) {
  if (n.metaKey || delete A.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), _ && t && !S().isEmpty() && !J && !g) {
    Rt(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(g == null ? void 0 : g.thing), g) {
    const e = c.pos.x - g.offset.x, s = c.pos.y - g.offset.y;
    g.thing.moveBy(e - g.thing.x, s - g.thing.y);
  }
}
function nn(n) {
  p.releasePointerCapture(n.pointerId), _ = !1, A.Meta || c.clearPos(), (g == null ? void 0 : g.thing) instanceof v && S().mergeAndAddImplicitConstraints(g.thing), g = null;
}
const sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ne,
  onFrame: Ge,
  render: Ke
}, Symbol.toStringTag, { value: "Module" }));
ve(document.getElementById("canvas"));
const pt = new URLSearchParams(window.location.search).get("tablet") ? je : sn;
pt.init();
function pe() {
  pt.onFrame(), he(), Pe(), pt.render(), de(), requestAnimationFrame(pe);
}
pe();
window.app = Te;
window.demos = Je;
