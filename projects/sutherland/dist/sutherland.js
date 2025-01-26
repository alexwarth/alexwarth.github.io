const ht = {
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
  highlightReferents: !0,
  recursion: !1,
  maxDepth: 10,
  tabletButtonWidth: 100,
  lefty: !1
};
let k;
function ge() {
  k = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(ht));
  for (const [n, t] of Object.entries(ht))
    Object.hasOwn(k, n) || (k[n] = t);
}
function L(n) {
  k = { ...k, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function pe() {
  k = JSON.parse(JSON.stringify(ht)), localStorage.setItem("config", JSON.stringify(k));
}
function o() {
  return k;
}
ge();
window.config = o;
const we = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(N(n, t));
}
function N(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Jt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const _ = Object.freeze({ x: 0, y: 0 });
function Nt({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function ft(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function yt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), d = s * a - i * r, x = s * r + i * a;
  return { x: d + t.x, y: x + t.y };
}
function _t(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function Gt(n, t, e) {
  return Math.sqrt(be(n, t, e));
}
function be(n, t, e) {
  const s = N(t, e);
  if (s == 0)
    return N(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return N(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function Se(n) {
  return 1 - Math.pow(1 - n, 5);
}
let p, u;
function Be(n) {
  p = n, u = p.getContext("2d"), Kt();
}
function Kt() {
  if (p.width = innerWidth, p.height = innerHeight, devicePixelRatio !== 1) {
    const n = p.width, t = p.height;
    p.width = n * devicePixelRatio, p.height = t * devicePixelRatio, p.style.width = n + "px", p.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Kt);
function ve() {
  u.clearRect(0, 0, p.width, p.height), u.lineWidth = o().lineWidth, u.lineCap = "round";
}
function nt(n) {
  return n;
}
function Qt(n, t = v(), e = nt) {
  const s = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(s.x, s.y, u.lineWidth * 2, 0, we), u.fill();
}
function I(n, t, e = v(), s = nt) {
  const i = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const r = s(n), a = s(t);
  u.moveTo(r.x, r.y), u.lineTo(a.x, a.y), u.stroke(), u.lineWidth = i;
}
function Zt(n, t, e, s = v(), i = nt) {
  const r = i(t), a = i(e), d = i(n);
  u.beginPath(), u.strokeStyle = s;
  const x = Math.atan2(r.y - d.y, r.x - d.x), C = Math.atan2(a.y - d.y, a.x - d.x);
  u.arc(d.x, d.y, w(d, r), x, C), u.stroke();
}
function te(n, t, e = v(), s = nt) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const r = u.measureText(t).width, { x: a, y: d } = s(n);
  u.fillText(t, a - r / 2, d + i / 2);
}
function v(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o().baseAlphaMultiplier, `rgba(255,255,255,${o().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let W = 1;
const V = { x: 0, y: 0 }, h = {
  reset() {
    W = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return W;
  },
  set scale(n) {
    W = n;
  },
  centerAt({ x: n, y: t }) {
    V.x = n, V.y = t;
  },
  get center() {
    return V;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - V.x) * W + innerWidth / 2,
      y: -(t - V.y) * W + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / W + V.x,
      y: V.y - (t - innerHeight / 2) / W
    };
  }
};
let M = null, ee = 0;
function y(n) {
  M = typeof n == "string" ? { message: n } : n, ee = Date.now();
}
function Pe() {
  if (M === null)
    return;
  const n = Date.now() - ee;
  if (n > o().statusTimeMillis) {
    M = null;
    return;
  }
  const e = `rgba(255,222,33,${1 - Se(n / o().statusTimeMillis)})`;
  if (M.message) {
    u.font = "40px Monaco";
    const i = u.measureText(M.message).width;
    u.fillStyle = e, u.fillText(M.message, (innerWidth - i) / 2, innerHeight - 40);
  }
  if (o().highlightReferents && M.referents)
    for (const s of M.referents)
      s.render(h.toScreenPosition, e);
}
class E {
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
class xt extends E {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e, s) {
    return new xt(e.get(this.p), s(this.pos));
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
class gt extends E {
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
class G extends E {
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
class st extends E {
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
class F extends E {
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
    return Gt(this.p, this.a, this.b);
  }
}
class R extends E {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new R(
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
class it extends E {
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
      Nt(
        ft(
          yt(this.masterPoint, _, this.instance.angle),
          _,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class K extends E {
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
class pt extends E {
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
    return this.y0 - o().weight - this.a.y;
  }
}
class Ft {
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
    const e = h.scale > 0 ? 1 / h.scale : 1, s = o().minWorthwhileErrorImprovement * e;
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
class O {
  constructor(t) {
    this.value = t;
  }
}
const tt = class tt {
  constructor({ x: t, y: e }) {
    this.id = tt.nextId++, this.xVar = new O(t), this.yVar = new O(e);
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
    return w(t, this) <= o().closeEnough / h.scale;
  }
  distanceTo(t) {
    return w(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = o().instanceSideAttacherColor) {
    o().debug && te(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), Qt(this, e, t);
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
let B = tt;
class z {
  constructor(t, e, s) {
    this.isGuide = s, this.a = new B(t), this.b = new B(e);
  }
  get x() {
    return (this.a.x + this.b.x) / 2;
  }
  get y() {
    return (this.a.y + this.b.y) / 2;
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= o().closeEnough / h.scale;
  }
  distanceTo(t) {
    return Gt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !o().showGuideLines)
      return;
    const s = this.isGuide ? o().guideLineColor : e ?? v();
    I(this.a, this.b, s, t);
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
class J {
  constructor(t, e, s) {
    this.a = new B(t), this.b = new B(e), this.c = new B(s);
  }
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    return this.distanceTo(t) <= o().closeEnough / h.scale;
  }
  distanceTo(t) {
    return Math.abs(w(t, this.c) - w(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    Zt(this.c, this.a, this.b, e ?? v(), t);
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
  constructor(t, e, s, i, r, a) {
    this.master = t, this.transform = (d) => Nt(ft(yt(d, _, this.angle), _, this.scale), this), this.id = et.nextId++, this.attachers = [], this.xVar = new O(e), this.yVar = new O(s), this.angleAndSizeVecX = new O(i * Math.cos(r)), this.angleAndSizeVecY = new O(i * Math.sin(r)), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new B(this.transform(t));
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
  boundingBox(t = this.master) {
    const { topLeft: e, bottomRight: s } = this.master.boundingBox(t), i = [
      e,
      s,
      { x: e.x, y: s.y },
      { x: s.x, y: e.y }
    ].map(this.transform);
    return _t(i);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e, s = 0) {
    this.master.render((i) => t(this.transform(i)), e, s), s === 1 && this.attachers.forEach((i, r) => {
      const a = t(i);
      I(
        t(this.transform(this.master.attachers[r])),
        a,
        o().instanceSideAttacherColor
      ), Qt(a, o().instanceSideAttacherColor);
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
class ne {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Ft();
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
  render(t = h.toScreenPosition, e, s = 0) {
    s > o().maxDepth || (this.things.forEach((i) => {
      i instanceof b ? i.render(t, e, s + 1) : i.render(t, e);
    }), s === 0 && (this.attachers.forEach((i) => i.render(t, o().masterSideAttacherColor)), this.constraints.forEach((i) => {
      if (i instanceof G) {
        let r = (i.computeError() * 100).toFixed();
        r === "-0" && (r = "0"), this.drawText(
          r,
          o().distanceConstraintTextScale,
          t({
            x: i.a.x + o().distanceConstraintLabelPct * (i.b.x - i.a.x),
            y: i.a.y + o().distanceConstraintLabelPct * (i.b.y - i.a.y)
          })
        );
      }
    })));
  }
  contains(t) {
    if (this === t)
      return !0;
    for (const e of this.things)
      if (e instanceof b && e.master.contains(t))
        return !0;
    return !1;
  }
  addInstance(t, { x: e, y: s }, i, r) {
    const a = new b(t, e, s, i, r, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const s = this.thingAt(t);
    if (!(s instanceof b))
      return !1;
    s.scale *= e;
    for (const i of s.attachers) {
      const { x: r, y: a } = ft(i, s, e);
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
      const { x: r, y: a } = yt(i, s, e);
      i.x = r, i.y = a;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const r = new z(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b));
    for (const a of this.things)
      a.forEachHandle((d) => {
        d !== r.a && d !== r.b && r.contains(d) && this.constraints.add(new F(d, r.a, r.b));
      });
    return this.things.push(r), r;
  }
  addArc(t, e, s, i = !0) {
    const r = new J(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new st(r.a, r.c, r.b, r.c));
    for (const a of this.things)
      a.forEachHandle((d) => {
        d !== r.a && d !== r.b && d !== r.c && r.contains(d) && this.constraints.add(new R(d, r.a, r.b, r.c));
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
      e.has(s) || !s.contains(t) || (s instanceof z ? (this.constraints.add(new F(t, s.a, s.b)), o().showImplicitConstraints && y({ message: "(point on line)", referents: /* @__PURE__ */ new Set([t, s]) })) : s instanceof J && (this.constraints.add(new R(t, s.a, s.b, s.c)), o().showImplicitConstraints && y({ message: "(point on arc)", referents: /* @__PURE__ */ new Set([t, s]) })));
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
    return e ? (this.constraints.add(new xt(e, t)), y({ message: "fixed point", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new pt(e)), y({ message: "weight", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof z ? (this.constraints.add(new G(e.a, e.b)), y({ message: "fixed distance", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof z ? (this.constraints.add(new gt(e.a, e.b)), y({ message: "HorV", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof b ? (this.constraints.add(new K(e)), y({ message: "full size", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof b ? (this.inline(e), y({ message: "dismember", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const a of e)
      if (a instanceof z) {
        const d = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, d.a), i.set(a.b, d.b);
      } else if (a instanceof J) {
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
      this.constraints.add(a.map(r, i, t.transform));
    }), this.things = this.things.filter((a) => a !== t);
  }
  snap(t, e) {
    const s = this.handleAt(t, e);
    if (s)
      return t.x = s.x, t.y = s.y, "H";
    const i = new Ft(), r = new B(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((x) => a.add(x));
    const d = [];
    for (const x of this.things)
      x === e || !x.contains(t) || (x instanceof z ? (i.add(new F(r, x.a, x.b)), d.push("L")) : x instanceof J && (i.add(new R(r, x.a, x.b, x.c)), d.push("A")));
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
  boundingBox(t = this) {
    const e = [...this.getPositions()];
    for (const s of this.things)
      if (s instanceof b && s.master !== t) {
        const i = s.boundingBox(t);
        e.push(i.topLeft), e.push(i.bottomRight);
      }
    return _t(e);
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
      if (s instanceof it && s.masterPoint === e) {
        const { instance: i, instancePoint: r } = s;
        i.attachers = i.attachers.filter((a) => a !== r), this.constraints.remove(s);
      }
    });
  }
  write(t, e = 1) {
    let s = null;
    Rt(t, e, (i, r, a) => {
      const d = this.addInstance(i, { x: r, y: h.center.y }, i.size * a, 0);
      this.constraints.add(new K(d, a)), s && this.replaceHandle(d.attachers[0], s.attachers[1]), s = d;
    });
  }
  drawText(t, e, s) {
    Rt(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: d, y: x }) => ({
          x: d * a + r - h.center.x + s.x,
          y: -x * a + s.y
        }),
        void 0,
        1
      )
    );
  }
}
const Ee = {
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
}, Ae = 1, Me = {
  data: Ee,
  version: Ae
};
function ke(n, t, e = o().fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = ot(s.start, e), r = ot(s.end, e);
        n.addLine(i, r, !1, !1);
        break;
      }
      case "arc": {
        const i = ot(s.center, e), r = s.radius * e;
        n.addArc(
          Yt(i, s.end, r),
          Yt(i, s.start, r),
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
const Ie = new Map(Me.data.values), rt = /* @__PURE__ */ new Map();
for (const [n, t] of Ie) {
  const e = new ne();
  ke(e, t, o().fontScale);
  const s = e.addLine(
    { x: -o().kerning * o().fontScale, y: 0 },
    { x: (4 + o().kerning) * o().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), rt.set(n, e);
}
function Rt(n, t, e) {
  const s = (a) => t * (a === a.toUpperCase() ? 1 : 0.75), i = (a) => s(a) * o().fontScale * (4 + o().kerning * 2);
  let r = h.center.x - 0.5 * [...n].map(i).reduce((a, d) => a + d, 0);
  for (let a = 0; a < n.length; a++) {
    const d = n[a], x = s(d), C = rt.get(d.toUpperCase());
    C && e(C, r, x), r += i(d);
  }
}
function ot({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Yt({ x: n, y: t }, e, s) {
  return {
    x: n + s * Math.cos(e),
    y: t + s * Math.sin(e)
  };
}
let A = null;
const c = {
  get pos() {
    return A;
  },
  snapPos(n) {
    return A ? l.snap(A, n) : null;
  },
  moveToScreenPos(n) {
    const t = h.fromScreenPosition(n);
    A ? (A.x = t.x, A.y = t.y) : A = t;
  },
  clearPos() {
    A = null;
  }
};
function q(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = h.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = h.fromScreenPosition(t);
}
const $ = {};
for (let n = 1; n < 10; n++)
  $["" + n] = new ne();
let l = $[1];
window.drawing = l;
function S(n) {
  return n ? $[n] ?? rt.get(n) : l;
}
function wt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, q(() => h.reset()), at(), y("drawing #" + n));
}
const ct = [...Object.values($), ...rt.values()];
let f = null;
function bt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (f == null ? void 0 : f.type) === "line" && l.addLine(f.start, n), f = {
    type: "line",
    start: n
  };
}
function St() {
  (f == null ? void 0 : f.type) === "line" && (f = null);
}
function Bt() {
  if (c.pos && ((f == null ? void 0 : f.type) !== "arc" && (f = { type: "arc", positions: [] }), f.positions.push({ x: c.pos.x, y: c.pos.y }), f.positions.length === 3)) {
    const [n, t, e] = f.positions;
    l.addArc(t, e, n), f = null;
  }
}
function vt() {
  (f == null ? void 0 : f.type) === "arc" && (f = null);
}
function se(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values($))
    s.onAttacherRemoved(n, t);
}
function Ce(n, t) {
  n.attachers.push(t);
  for (const e of Object.values($))
    e.onAttacherAdded(n, t);
}
function ie() {
  if (o().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function re() {
  !f && l.isEmpty() && We(), Ve(), l.render(), ze(), Pe(), De();
}
function We() {
  const n = innerWidth / 100, t = (e, s) => I(e, s, v(), h.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function Ve() {
  switch (f == null ? void 0 : f.type) {
    case "line":
      c.pos && I(f.start, c.pos, v(), h.toScreenPosition);
      break;
    case "arc":
      f.positions.length > 1 && c.pos && Zt(
        f.positions[0],
        f.positions[1],
        c.pos,
        v(),
        h.toScreenPosition
      );
      break;
  }
}
function ze() {
  if (!c.pos)
    return;
  const n = h.toScreenPosition(c.pos);
  I(
    { x: n.x - o().crosshairsSize, y: n.y },
    { x: n.x + o().crosshairsSize, y: n.y },
    v("bold")
  ), I(
    { x: n.x, y: n.y - o().crosshairsSize },
    { x: n.x, y: n.y + o().crosshairsSize },
    v("bold")
  );
}
function De() {
  if (!o().debug)
    return;
  const n = h.toScreenPosition({ x: 0, y: 0 });
  I({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, o().axisColor), I({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, o().axisColor);
  const t = c.pos;
  t && te(h.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Pt() {
  return c.pos ? l.handleAt(c.pos) : null;
}
function j() {
  return c.pos ? l.thingAt(c.pos) : null;
}
function lt() {
  const n = j();
  return n instanceof z ? n : null;
}
function ae() {
  const n = j();
  return n instanceof b ? n : null;
}
function Et() {
  l.isEmpty() || (y("solve"), l.relax());
}
function At() {
  o().autoSolve = !o().autoSolve, y(`auto-solve ${o().autoSolve ? "on" : "off"}`);
}
function Mt() {
  c.pos && l.delete(c.pos) && (ce(), l.isEmpty() && q(() => h.reset()));
}
function kt() {
  return !!c.pos && l.fixedDistance(c.pos);
}
function It() {
  return !!c.pos && l.fixedPoint(c.pos);
}
function Ct() {
  return !!c.pos && l.weight(c.pos);
}
function Wt() {
  return !!c.pos && l.horizontalOrVertical(c.pos);
}
function Vt() {
  return !!c.pos && l.fullSize(c.pos);
}
function oe() {
  const n = c.pos;
  n && (y("re-center"), q(() => {
    h.centerAt(n);
  }));
}
function zt(n) {
  const t = S(n);
  if (!t.isEmpty() && c.pos && (o().recursion || !t.contains(S()))) {
    const e = l.addInstance(t, c.pos, 0.5 * t.size / h.scale, 0);
    y({ message: "instantiate #" + n, referents: /* @__PURE__ */ new Set([e]) });
  }
}
function Dt() {
  c.pos && l.dismember(c.pos) && ce();
}
function Q(n) {
  return !!c.pos && l.rotateInstanceAt(c.pos, n);
}
function Z(n) {
  return !!c.pos && l.resizeInstanceAt(c.pos, n);
}
function Lt() {
  if (!c.pos)
    return;
  const n = l.handleAt(c.pos);
  n && (l.attachers.includes(n) ? (se(l, n), y("remove attacher")) : (Ce(l, n), y("add attacher")));
}
let D = null;
function Tt() {
  if (!D) {
    (D = lt()) && y({ message: "equal length", referents: /* @__PURE__ */ new Set([D]) });
    return;
  }
  const n = lt();
  n && (S().constraints.add(
    new st(D.a, D.b, n.a, n.b)
  ), y({ message: "equal length", referents: /* @__PURE__ */ new Set([D, n]) }));
}
function at() {
  D = null;
}
function ut(n) {
  q(() => h.scale = n), y("scale=" + h.scale.toFixed(1));
}
function Ot(n, t) {
  q(() => {
    h.center.x -= n, h.center.y -= t;
  });
}
function ce() {
  for (; Le(); )
    ;
}
function Le() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of ct)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of ct) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (se(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of ct)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Mt,
  dismember: Dt,
  drawing: S,
  endArc: vt,
  endEqualLength: at,
  endLines: St,
  fixedDistance: kt,
  fixedPoint: It,
  fullSize: Vt,
  handle: Pt,
  horizontalOrVertical: Wt,
  instance: ae,
  instantiate: zt,
  line: lt,
  moreArc: Bt,
  moreEqualLength: Tt,
  moreLines: bt,
  onFrame: ie,
  panBy: Ot,
  pen: c,
  reCenter: oe,
  render: re,
  rotateInstanceBy: Q,
  scaleInstanceBy: Z,
  setScale: ut,
  solve: Et,
  switchToDrawing: wt,
  thing: j,
  toggleAttacher: Lt,
  toggleAutoSolve: At,
  weight: Ct
}, Symbol.toStringTag, { value: "Module" }));
var jt;
const Oe = (jt = window.webkit) == null ? void 0 : jt.messageHandlers, He = window.webkit != null;
function Xt(n, t = n) {
  He && Oe[n].postMessage(t);
}
let Y = [], dt = !1;
function $e() {
  const n = Y;
  return Y = [], n;
}
function Ut(n) {
  for (const t of n)
    (!t.predicted || o().usePredictedEvents) && Y.push(t);
}
function Ht(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (dt = !0), t === "ended" && (dt = !1), !(t === "moved" && !dt) && Y.push({
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
function Fe() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", de), Y = [];
}
window.onpointerdown = (n) => Ht(n, "began");
window.onpointermove = (n) => Ht(n, "moved");
window.onpointerup = (n) => Ht(n, "ended");
const de = (n) => n.preventDefault();
window.addEventListener("touchstart", de, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Ut, Fe(), Ut(n);
};
const qt = 0.75, $t = () => o().fontScale * 8;
function T(n, t, e, s = 0.35) {
  S().drawText(n, s, {
    x: t + o().tabletButtonWidth / 2,
    y: e + $t() / 2 + s * o().fontScale * 3
  });
}
class m {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + o().tabletButtonWidth && this.topY <= e && e < this.topY + $t();
  }
  render() {
    T(this.label, this.leftX, this.topY);
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class he {
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
    for (const t of $e())
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
      i.leftX = t, i.topY = s * $t(), s++;
  }
}
let H;
function Re() {
  H = le;
}
function Ye() {
  H.processEvents(), H.onFrame();
}
function Xe() {
  H.render();
}
const le = new class extends he {
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
    this.solveButton.isDown && Et();
  }
  layOutButtons() {
    o().lefty ? (this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * o().tabletButtonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(o().tabletButtonWidth, this.col2), this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col3));
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
    c.clearPos(), this.endDragEtc(), St(), vt();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof B && S().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && Tt();
  }
  onButtonDown(n) {
    if ("1" <= n.label && n.label <= "9") {
      c.pos ? (zt(n.label), this.move()) : wt(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        S().clear(), h.reset();
        break;
      case this.lineButton:
        bt();
        break;
      case this.arcButton:
        Bt();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Wt();
        break;
      case this.fixButton:
        It() || kt();
        break;
      case this.sizeButton:
        Vt();
        break;
      case this.weightButton:
        Ct();
        break;
      case this.dismemberButton:
        Dt();
        break;
      case this.attacherButton:
        Lt();
        break;
      case this.deleteButton:
        Mt();
        break;
      case this.autoSolveButton:
        At();
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        H = Ue;
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && at();
  }
  onFingerMove(n, t) {
    if (S().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = h.fromScreenPosition(n), i = h.fromScreenPosition(e);
    if (c.pos || Ot(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let r = null;
    for (const [ye, xe] of this.fingerScreenPositions.entries())
      if (ye !== t) {
        r = xe;
        break;
      }
    if (!r)
      throw new Error("bruh?!");
    const a = h.fromScreenPosition(r), d = w(a, i), C = w(a, s) / d, me = Math.atan2(i.y - a.y, i.x - a.x), fe = Math.atan2(s.y - a.y, s.x - a.x);
    ae() && !this.drag && this.move(), !Z(C) && !c.pos && (h.scale *= C), Q(fe - me);
  }
  move() {
    const n = Pt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = j();
    t && (this.drag = { thing: t, offset: Jt(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Xt("prepareHaptics");
  }
  hapticBump() {
    Xt("hapticImpact");
  }
}(), Ue = new class extends he {
  constructor() {
    super(), this.leftyButton = new m("lefty"), this.lineWidthButton = new m("lwidth"), this.alphaButton = new m("opacity"), this.flickerButton = new m("flicker"), this.recursionButton = new m("schachman"), this.defaultsButton = new m("defaults"), this.backButton = new m("back"), this.col1 = [
      this.leftyButton,
      this.lineWidthButton,
      this.alphaButton,
      this.flickerButton,
      this.recursionButton,
      this.defaultsButton
    ], this.col2 = [this.backButton], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    super.render(), T(
      o().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * o().tabletButtonWidth,
      this.leftyButton.topY
    ), T(
      o().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * o().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * qt
    ), T(
      o().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * o().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * qt
    ), T(
      o().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * o().tabletButtonWidth,
      this.flickerButton.topY
    ), T(
      o().recursion ? "on" : "off",
      this.recursionButton.leftX + 2 * o().tabletButtonWidth,
      this.recursionButton.topY
    );
  }
  layOutButtons() {
    this.layOutButtonColumn(innerWidth / 2 - o().tabletButtonWidth / 2, this.col1), o().lefty ? this.layOutButtonColumn(0, this.col2) : this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col2);
  }
  onFrame() {
  }
  onButtonDown(n) {
    switch (n) {
      case this.defaultsButton:
        pe(), y("restored defaults!");
        break;
      case this.leftyButton:
        L({ lefty: !o().lefty });
        break;
      case this.flickerButton:
        L({ flicker: !o().flicker });
        break;
      case this.recursionButton:
        L({ recursion: !o().recursion }), y(o().recursion ? "use at your own risk!" : "phew");
        break;
      case this.backButton:
        H = le;
        break;
    }
  }
  onButtonUp(n) {
  }
  onFingerMove(n, t) {
    if (super.onFingerMove(n, t), t === this.lineWidthButton.fingerId) {
      const e = Math.max(
        1,
        Math.min(o().lineWidth + (n.x - innerWidth / 2) / innerWidth * 2, 10)
      );
      L({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(o().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      L({ baseAlphaMultiplier: e });
    }
  }
}(), qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Re,
  onFrame: Ye,
  render: Xe
}, Symbol.toStringTag, { value: "Module" })), P = {};
let X = !1, U = !1, g = null;
function je() {
  window.addEventListener("keydown", _e), window.addEventListener("keyup", Ge), p.addEventListener("pointerdown", Ke), p.addEventListener("pointermove", Qe), p.addEventListener("pointerup", Ze);
}
function Je() {
  P[" "] && Et();
}
function Ne() {
}
function _e(n) {
  if (P[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    P.Shift ? zt(t) : wt(t);
    return;
  }
  switch (n.key) {
    case "f":
      L({ flicker: !o().flicker });
      return;
    case "d":
      o().debug = !o().debug, y(`debug ${o().debug ? "on" : "off"}`);
      return;
    case "S":
      At();
      return;
  }
  if (!S().isEmpty())
    switch (n.key) {
      case "Backspace":
        Mt();
        break;
      case ".":
        It() || kt();
        break;
      case "W":
        Ct();
        break;
      case "h":
        Wt();
        break;
      case "=":
        Z(1.05) || ut(Math.min(h.scale + 0.1, 10));
        break;
      case "-":
        Z(0.95) || ut(Math.max(h.scale - 0.1, 0.1));
        break;
      case "q":
        Q(5 * Math.PI / 180);
        break;
      case "w":
        Q(-5 * Math.PI / 180);
        break;
      case "s":
        Vt();
        break;
      case "A":
        Lt();
        break;
      case "c":
        oe();
        break;
      case "D":
        Dt();
        break;
    }
}
function Ge(n) {
  switch (delete P[n.key], n.key) {
    case "Meta":
      St(), U = !1, X || c.clearPos();
      break;
    case "a":
      vt(), U = !1, X || c.clearPos();
      break;
    case "e":
      at();
      break;
  }
}
function Ke(n) {
  if (p.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), X = !0, P.Meta) {
    bt(), U = !0;
    return;
  } else if (P.a) {
    Bt(), U = !0;
    return;
  } else if (P.e) {
    Tt();
    return;
  }
  g = null;
  const t = Pt();
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = j();
  e && (g = { thing: e, offset: Jt(c.pos, e) });
}
function Qe(n) {
  if (n.metaKey || delete P.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  c.moveToScreenPos(n);
  const e = { x: c.pos.x, y: c.pos.y };
  if (X && t && !S().isEmpty() && !U && !g) {
    Ot(e.x - t.x, e.y - t.y);
    return;
  }
  if (c.snapPos(g == null ? void 0 : g.thing), g) {
    const s = e.x - g.offset.x, i = e.y - g.offset.y;
    g.thing.moveBy(s - g.thing.x, i - g.thing.y);
  }
}
function Ze(n) {
  p.releasePointerCapture(n.pointerId), X = !1, P.Meta || c.clearPos(), (g == null ? void 0 : g.thing) instanceof B && S().mergeAndAddImplicitConstraints(g.thing), g = null;
}
const tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: je,
  onFrame: Je,
  render: Ne
}, Symbol.toStringTag, { value: "Module" }));
Be(document.getElementById("canvas"));
const mt = new URLSearchParams(window.location.search).get("tablet") ? qe : tn;
mt.init();
function ue() {
  mt.onFrame(), ie(), ve(), mt.render(), re(), requestAnimationFrame(ue);
}
ue();
window.app = Te;
