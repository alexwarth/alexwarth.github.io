const dt = {
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
  maxDepth: 10,
  tabletButtonWidth: 100,
  lefty: !1
};
let M;
function we() {
  M = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(dt));
  for (const [n, t] of Object.entries(dt))
    Object.hasOwn(M, n) || (M[n] = t);
}
function J(n) {
  M = { ...M, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function be() {
  M = JSON.parse(JSON.stringify(dt)), localStorage.setItem("config", JSON.stringify(M));
}
function o() {
  return M;
}
we();
window.config = o;
const Be = Math.PI * 2;
function w(n, t) {
  return Math.sqrt(N(n, t));
}
function N(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function Nt(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const _ = Object.freeze({ x: 0, y: 0 });
function _t({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function ft(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = e * s, a = e * i;
  return { x: r + t.x, y: a + t.y };
}
function yt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, r = Math.sin(e), a = Math.cos(e), h = s * a - i * r, x = s * r + i * a;
  return { x: h + t.x, y: x + t.y };
}
function Gt(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const r of n)
    t = Math.min(t, r.x), e = Math.max(e, r.x), s = Math.min(s, r.y), i = Math.max(i, r.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function Kt(n, t, e) {
  return Math.sqrt(Se(n, t, e));
}
function Se(n, t, e) {
  const s = N(t, e);
  if (s == 0)
    return N(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return N(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function ve(n) {
  return 1 - Math.pow(1 - n, 5);
}
let p, u, Qt = !1;
function Ee(n) {
  p = n, u = p.getContext("2d"), Zt(), Qt = !0;
}
function Zt() {
  if (p.width = innerWidth, p.height = innerHeight, devicePixelRatio !== 1) {
    const n = p.width, t = p.height;
    p.width = n * devicePixelRatio, p.height = t * devicePixelRatio, p.style.width = n + "px", p.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Zt);
let T = "", te = 0;
function y(n) {
  Qt && (T = n, te = Date.now());
}
function Pe() {
  if (u.clearRect(0, 0, p.width, p.height), u.lineWidth = o().lineWidth, u.lineCap = "round", T.length > 0) {
    u.font = "40px Monaco";
    const t = u.measureText(T).width, e = Date.now() - te;
    if (e > o().statusTimeMillis)
      T = "";
    else {
      const s = 1 - ve(e / o().statusTimeMillis);
      u.fillStyle = `rgba(255,222,33,${s})`, u.fillText(T, (innerWidth - t) / 2, innerHeight - 40);
    }
  }
}
function nt(n) {
  return n;
}
function ee(n, t = v(), e = nt) {
  const s = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(s.x, s.y, u.lineWidth * 2, 0, Be), u.fill();
}
function k(n, t, e = v(), s = nt) {
  const i = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const r = s(n), a = s(t);
  u.moveTo(r.x, r.y), u.lineTo(a.x, a.y), u.stroke(), u.lineWidth = i;
}
function ne(n, t, e, s = v(), i = nt) {
  const r = i(t), a = i(e), h = i(n);
  u.beginPath(), u.strokeStyle = s;
  const x = Math.atan2(r.y - h.y, r.x - h.x), I = Math.atan2(a.y - h.y, a.x - h.x);
  u.arc(h.x, h.y, w(h, r), x, I), u.stroke();
}
function se(n, t, e = v(), s = nt) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const r = u.measureText(t).width, { x: a, y: h } = s(n);
  u.fillText(t, a - r / 2, h + i / 2);
}
function v(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o().baseAlphaMultiplier, `rgba(255,255,255,${o().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let C = 1;
const V = { x: 0, y: 0 }, d = {
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
      x: (n - V.x) * C + innerWidth / 2,
      y: -(t - V.y) * C + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / C + V.x,
      y: V.y - (t - innerHeight / 2) / C
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
      this.handles[s], this.handles.forEach((i, r) => {
        i === t && (this.handles[r] = e);
      });
  }
}
class xt extends P {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e) {
    return new xt(e.get(this.p), this.pos);
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
class G extends P {
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
class F extends P {
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
    return Kt(this.p, this.a, this.b);
  }
}
class $ extends P {
  constructor(t, e, s, i) {
    super([], [t, e, s, i]);
  }
  map(t, e) {
    return new $(
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
class K extends P {
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
    return this.y0 - o().weight - this.a.y;
  }
}
class $t {
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
    const e = d.scale > 0 ? 1 / d.scale : 1, s = o().minWorthwhileErrorImprovement * e;
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
    const h = this.computeError();
    return a < Math.min(r, h) ? (t.value = i + e, !0) : h < Math.min(r, a) ? (t.value = i - e, !0) : (t.value = i, !1);
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
const tt = class tt {
  constructor({ x: t, y: e }) {
    this.id = tt.nextId++, this.xVar = new z(t), this.yVar = new z(e);
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
    return w(t, this) <= o().closeEnough / d.scale;
  }
  distanceTo(t) {
    return w(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e = o().instanceSideAttacherColor) {
    o().debug && se(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), ee(this, e, t);
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
class W {
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
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= o().closeEnough / d.scale;
  }
  distanceTo(t) {
    return Kt(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    if (this.isGuide && !o().showGuideLines)
      return;
    const e = this.isGuide ? o().guideLineColor : v();
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
class j {
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
    return this.distanceTo(t) <= o().closeEnough / d.scale;
  }
  distanceTo(t) {
    return Math.abs(w(t, this.c) - w(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t) {
    ne(this.c, this.a, this.b, v(), t);
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
    this.master = t, this.transform = (h) => _t(ft(yt(h, _, this.angle), _, this.scale), this), this.id = et.nextId++, this.attachers = [], this.xVar = new z(e), this.yVar = new z(s), this.angleAndSizeVecX = new z(i * Math.cos(r)), this.angleAndSizeVecY = new z(i * Math.sin(r)), this.addAttachers(t, a);
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
    return Gt(i);
  }
  distanceTo(t) {
    return w(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e = 0) {
    this.master.render((s) => t(this.transform(s)), e), e === 1 && this.attachers.forEach((s, i) => {
      const r = t(s);
      k(
        t(this.transform(this.master.attachers[i])),
        r,
        o().instanceSideAttacherColor
      ), ee(r, o().instanceSideAttacherColor);
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
    this.things = [], this.attachers = [], this.constraints = new $t();
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
  render(t = d.toScreenPosition, e = 0) {
    e > o().maxDepth || (this.things.forEach((s) => {
      s instanceof b ? s.render(t, e + 1) : s.render(t);
    }), e === 0 && (this.attachers.forEach((s) => s.render(t, o().masterSideAttacherColor)), this.constraints.forEach((s) => {
      if (s instanceof G) {
        let i = (s.computeError() * 100).toFixed();
        i === "-0" && (i = "0"), this.drawText(
          i,
          o().distanceConstraintTextScale,
          t({
            x: s.a.x + o().distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + o().distanceConstraintLabelPct * (s.b.y - s.a.y)
          })
        );
      }
    })));
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
    const r = new W(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b));
    for (const a of this.things)
      a.forEachHandle((h) => {
        h !== r.a && h !== r.b && r.contains(h) && this.constraints.add(new F(h, r.a, r.b));
      });
    return this.things.push(r), r;
  }
  addArc(t, e, s, i = !0) {
    const r = new j(t, e, s);
    i && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new st(r.a, r.c, r.b, r.c));
    for (const a of this.things)
      a.forEachHandle((h) => {
        h !== r.a && h !== r.b && h !== r.c && r.contains(h) && this.constraints.add(new $(h, r.a, r.b, r.c));
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
      e.has(s) || !s.contains(t) || (s instanceof W ? (this.constraints.add(new F(t, s.a, s.b)), o().showImplicitConstraints && y("(point on line)")) : s instanceof j && (this.constraints.add(new $(t, s.a, s.b, s.c)), o().showImplicitConstraints && y("(point on arc)")));
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
    return e ? (this.constraints.add(new xt(e, t)), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new pt(e)), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof W ? (this.constraints.add(new G(e.a, e.b)), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof W ? (this.constraints.add(new gt(e.a, e.b)), !0) : !1;
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
      if (a instanceof W) {
        const h = this.addLine(
          t.transform(a.a),
          t.transform(a.b),
          a.isGuide
        );
        i.set(a.a, h.a), i.set(a.b, h.b);
      } else if (a instanceof j) {
        const h = this.addArc(
          t.transform(a.a),
          t.transform(a.b),
          t.transform(a.c)
        );
        i.set(a.a, h.a), i.set(a.b, h.b), i.set(a.c, h.c);
      } else if (a instanceof b) {
        const h = this.addInstance(
          a.master,
          t.transform(a),
          // move the center to the right place
          t.scale * a.size,
          t.angle + a.angle
        );
        r.set(a, h);
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
    const i = new $t(), r = new B(t), a = /* @__PURE__ */ new Set();
    r.forEachVar((x) => a.add(x));
    const h = [];
    for (const x of this.things)
      x === e || !x.contains(t) || (x instanceof W ? (i.add(new F(r, x.a, x.b)), h.push("L")) : x instanceof j && (i.add(new $(r, x.a, x.b, x.c)), h.push("A")));
    if (i.isEmpty())
      return null;
    for (; i.relax(a); )
      ;
    return t.x = r.x, t.y = r.y, h.join();
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const r of this.things)
      r.forEachHandle((a) => {
        if (a !== e && a.contains(t)) {
          const h = w(t, a);
          h < s && (i = a, s = h);
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
    return Gt(e);
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
    Yt(t, e, (i, r, a) => {
      const h = this.addInstance(i, { x: r, y: d.center.y }, i.size * a, 0);
      this.constraints.add(new K(h, a)), s && this.replaceHandle(h.attachers[0], s.attachers[1]), s = h;
    });
  }
  drawText(t, e, s) {
    Yt(
      t,
      e,
      (i, r, a) => i.render(
        ({ x: h, y: x }) => ({
          x: h * a + r - d.center.x + s.x,
          y: -x * a + s.y
        }),
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
}, Me = 1, ke = {
  data: Ae,
  version: Me
};
function Ie(n, t, e = o().fontScale) {
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
          Rt(i, s.end, r),
          Rt(i, s.start, r),
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
const Ce = new Map(ke.data.values), rt = /* @__PURE__ */ new Map();
for (const [n, t] of Ce) {
  const e = new ie();
  Ie(e, t, o().fontScale);
  const s = e.addLine(
    { x: -o().kerning * o().fontScale, y: 0 },
    { x: (4 + o().kerning) * o().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), rt.set(n, e);
}
function Yt(n, t, e) {
  const s = (a) => t * (a === a.toUpperCase() ? 1 : 0.75), i = (a) => s(a) * o().fontScale * (4 + o().kerning * 2);
  let r = d.center.x - 0.5 * [...n].map(i).reduce((a, h) => a + h, 0);
  for (let a = 0; a < n.length; a++) {
    const h = n[a], x = s(h), I = rt.get(h.toUpperCase());
    I && e(I, r, x), r += i(h);
  }
}
function ot({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Rt({ x: n, y: t }, e, s) {
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
    const t = d.fromScreenPosition(n);
    A ? (A.x = t.x, A.y = t.y) : A = t;
  },
  clearPos() {
    A = null;
  }
};
function U(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = d.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = d.fromScreenPosition(t);
}
const L = {};
for (let n = 1; n < 10; n++)
  L["" + n] = new ie();
let l = L[1];
window.drawing = l;
function S(n) {
  return n ? L[n] ?? rt.get(n) : l;
}
function wt(n) {
  const t = S(n);
  !t || t === l || (l.leave(), l = t, U(() => d.reset()), at(), y("drawing #" + n));
}
const ct = [...Object.values(L), ...rt.values()];
let m = null;
function bt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (m == null ? void 0 : m.type) === "line" && l.addLine(m.start, n), m = {
    type: "line",
    start: n
  };
}
function Bt() {
  (m == null ? void 0 : m.type) === "line" && (m = null);
}
function St() {
  if (c.pos && ((m == null ? void 0 : m.type) !== "arc" && (m = { type: "arc", positions: [] }), m.positions.push({ x: c.pos.x, y: c.pos.y }), m.positions.length === 3)) {
    const [n, t, e] = m.positions;
    l.addArc(t, e, n), m = null;
  }
}
function vt() {
  (m == null ? void 0 : m.type) === "arc" && (m = null);
}
function re(n, t) {
  const e = n.attachers.indexOf(t);
  l.attachers.splice(e, 1);
  for (const s of Object.values(L))
    s.onAttacherRemoved(n, t);
}
function Ve(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(L))
    e.onAttacherAdded(n, t);
}
function ae() {
  if (o().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && l.relax(); )
      ;
  }
}
function oe() {
  !m && l.isEmpty() && We(), ze(), l.render(), De(), Le();
}
function We() {
  const n = innerWidth / 100, t = (e, s) => k(e, s, v(), d.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function ze() {
  switch (m == null ? void 0 : m.type) {
    case "line":
      c.pos && k(m.start, c.pos, v(), d.toScreenPosition);
      break;
    case "arc":
      m.positions.length > 1 && c.pos && ne(
        m.positions[0],
        m.positions[1],
        c.pos,
        v(),
        d.toScreenPosition
      );
      break;
  }
}
function De() {
  if (!c.pos)
    return;
  const n = d.toScreenPosition(c.pos);
  k(
    { x: n.x - o().crosshairsSize, y: n.y },
    { x: n.x + o().crosshairsSize, y: n.y },
    v("bold")
  ), k(
    { x: n.x, y: n.y - o().crosshairsSize },
    { x: n.x, y: n.y + o().crosshairsSize },
    v("bold")
  );
}
function Le() {
  if (!o().debug)
    return;
  const n = d.toScreenPosition({ x: 0, y: 0 });
  k({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, o().axisColor), k({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, o().axisColor);
  const t = c.pos;
  t && se(d.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Et() {
  return c.pos ? l.handleAt(c.pos) : null;
}
function q() {
  return c.pos ? l.thingAt(c.pos) : null;
}
function lt() {
  const n = q();
  return n instanceof W ? n : null;
}
function ce() {
  const n = q();
  return n instanceof b ? n : null;
}
function Pt() {
  l.isEmpty() || (y("solve"), l.relax());
}
function At() {
  o().autoSolve = !o().autoSolve, y(`auto-solve ${o().autoSolve ? "on" : "off"}`);
}
function Mt() {
  c.pos && l.delete(c.pos) && (y("delete"), de(), l.isEmpty() && U(() => d.reset()));
}
function kt() {
  c.pos && l.fixedDistance(c.pos) && y("fixed distance");
}
function It() {
  return c.pos && l.fixedPoint(c.pos) ? (y("fixed point"), !0) : !1;
}
function Ct() {
  c.pos && l.weight(c.pos) && y("weight");
}
function Vt() {
  c.pos && l.horizontalOrVertical(c.pos) && y("HorV");
}
function Wt() {
  c.pos && l.fullSize(c.pos) && y("full size");
}
function he() {
  const n = c.pos;
  n && (y("re-center"), U(() => {
    d.centerAt(n);
  }));
}
function zt(n) {
  const t = S(n);
  !t.isEmpty() && c.pos && (y("instantiate #" + n), l.addInstance(t, c.pos, 0.5 * t.size / d.scale, 0));
}
function Dt() {
  c.pos && l.dismember(c.pos) && (y("dismember"), de());
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
  n && (l.attachers.includes(n) ? (re(l, n), y("remove attacher")) : (Ve(l, n), y("add attacher")));
}
let O = null;
function Tt() {
  if (!O) {
    (O = lt()) && y("equal length");
    return;
  }
  const n = lt();
  n && (S().constraints.add(
    new st(O.a, O.b, n.a, n.b)
  ), y("equal length"));
}
function at() {
  O = null;
}
function ut(n) {
  U(() => d.scale = n), y("scale=" + d.scale.toFixed(1));
}
function Ot(n, t) {
  U(() => {
    d.center.x -= n, d.center.y -= t;
  });
}
function de() {
  for (; Te(); )
    ;
}
function Te() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of ct)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of ct) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (re(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of ct)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Mt,
  dismember: Dt,
  drawing: S,
  endArc: vt,
  endEqualLength: at,
  endLines: Bt,
  fixedDistance: kt,
  fixedPoint: It,
  fullSize: Wt,
  handle: Et,
  horizontalOrVertical: Vt,
  instance: ce,
  instantiate: zt,
  line: lt,
  moreArc: St,
  moreEqualLength: Tt,
  moreLines: bt,
  onFrame: ae,
  panBy: Ot,
  pen: c,
  reCenter: he,
  render: oe,
  rotateInstanceBy: Q,
  scaleInstanceBy: Z,
  setScale: ut,
  solve: Pt,
  switchToDrawing: wt,
  thing: q,
  toggleAttacher: Lt,
  toggleAutoSolve: At,
  weight: Ct
}, Symbol.toStringTag, { value: "Module" }));
var Jt;
const Xt = (Jt = window.webkit) == null ? void 0 : Jt.messageHandlers, He = window.webkit != null;
function Ut(n, t = n) {
  He && (y(Xt[n]), Xt[n].postMessage(t));
}
let Y = [], ht = !1;
function Fe() {
  const n = Y;
  return Y = [], n;
}
function qt(n) {
  for (const t of n)
    (!t.predicted || o().usePredictedEvents) && Y.push(t);
}
function Ht(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (ht = !0), t === "ended" && (ht = !1), !(t === "moved" && !ht) && Y.push({
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
function $e() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", le), Y = [];
}
window.onpointerdown = (n) => Ht(n, "began");
window.onpointermove = (n) => Ht(n, "moved");
window.onpointerup = (n) => Ht(n, "ended");
const le = (n) => n.preventDefault();
window.addEventListener("touchstart", le, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = qt, $e(), qt(n);
};
const jt = 0.75, Ft = () => o().fontScale * 8;
function H(n, t, e, s = 0.35) {
  S().drawText(n, s, {
    x: t + o().tabletButtonWidth / 2,
    y: e + Ft() / 2 + s * o().fontScale * 3
  });
}
class f {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + o().tabletButtonWidth && this.topY <= e && e < this.topY + Ft();
  }
  render() {
    H(this.label, this.leftX, this.topY);
  }
  get isDown() {
    return this.fingerId != null;
  }
}
class ue {
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
      i.leftX = t, i.topY = s * Ft(), s++;
  }
}
let D;
function Ye() {
  D = me;
}
function Re() {
  D.processEvents(), D.onFrame();
}
function Xe() {
  D.render();
}
const me = new class extends ue {
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
    this.solveButton.isDown && Pt();
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
    c.clearPos(), this.endDragEtc(), Bt(), vt();
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
        S().clear(), d.reset();
        break;
      case this.lineButton:
        bt();
        break;
      case this.arcButton:
        St();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Vt();
        break;
      case this.fixButton:
        It() || kt();
        break;
      case this.sizeButton:
        Wt();
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
        D = Ue;
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
    const s = d.fromScreenPosition(n), i = d.fromScreenPosition(e);
    if (c.pos || Ot(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let r = null;
    for (const [ge, pe] of this.fingerScreenPositions.entries())
      if (ge !== t) {
        r = pe;
        break;
      }
    if (!r)
      throw new Error("bruh?!");
    const a = d.fromScreenPosition(r), h = w(a, i), I = w(a, s) / h, ye = Math.atan2(i.y - a.y, i.x - a.x), xe = Math.atan2(s.y - a.y, s.x - a.x);
    ce() && !this.drag && this.move(), !Z(I) && !c.pos && (d.scale *= I), Q(xe - ye);
  }
  move() {
    const n = Et();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = q();
    t && (this.drag = { thing: t, offset: Nt(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Ut("prepareHaptics");
  }
  hapticBump() {
    Ut("hapticImpact");
  }
}(), Ue = new class extends ue {
  constructor() {
    super(), this.defaultsButton = new f("defaults"), this.leftyButton = new f("lefty"), this.lineWidthButton = new f("lwidth"), this.alphaButton = new f("opacity"), this.flickerButton = new f("flicker"), this.backButton = new f("back"), this.col1 = [
      this.leftyButton,
      this.lineWidthButton,
      this.alphaButton,
      this.flickerButton,
      this.defaultsButton
    ], this.col2 = [this.backButton], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    super.render(), H(
      o().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * o().tabletButtonWidth,
      this.leftyButton.topY
    ), H(
      o().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * o().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * jt
    ), H(
      o().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * o().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * jt
    ), H(
      o().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * o().tabletButtonWidth,
      this.flickerButton.topY
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
        be(), y("restored defaults!");
        break;
      case this.backButton:
        D = me;
        break;
      case this.leftyButton:
        J({ lefty: !o().lefty });
        break;
      case this.flickerButton:
        o().flicker = !o().flicker;
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
      J({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(o().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      J({ baseAlphaMultiplier: e });
    }
  }
}(), qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: Ye,
  onFrame: Re,
  render: Xe
}, Symbol.toStringTag, { value: "Module" })), E = {};
let R = !1, X = !1, g = null;
function je() {
  window.addEventListener("keydown", _e), window.addEventListener("keyup", Ge), p.addEventListener("pointerdown", Ke), p.addEventListener("pointermove", Qe), p.addEventListener("pointerup", Ze);
}
function Je() {
  E[" "] && Pt();
}
function Ne() {
}
function _e(n) {
  if (E[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    E.Shift ? zt(t) : wt(t);
    return;
  }
  switch (n.key) {
    case "f":
      J({ flicker: !o().flicker });
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
      case "l":
        kt();
        break;
      case ".":
        It();
        break;
      case "W":
        Ct();
        break;
      case "h":
        Vt();
        break;
      case "=":
        Z(1.05) || ut(Math.min(d.scale + 0.1, 10));
        break;
      case "-":
        Z(0.95) || ut(Math.max(d.scale - 0.1, 0.1));
        break;
      case "q":
        Q(5 * Math.PI / 180);
        break;
      case "w":
        Q(-5 * Math.PI / 180);
        break;
      case "s":
        Wt();
        break;
      case "A":
        Lt();
        break;
      case "c":
        he();
        break;
      case "D":
        Dt();
        break;
    }
}
function Ge(n) {
  switch (delete E[n.key], n.key) {
    case "Meta":
      Bt(), X = !1, R || c.clearPos();
      break;
    case "a":
      vt(), X = !1, R || c.clearPos();
      break;
    case "e":
      at();
      break;
  }
}
function Ke(n) {
  if (p.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), R = !0, E.Meta) {
    bt(), X = !0;
    return;
  } else if (E.a) {
    St(), X = !0;
    return;
  } else if (E.e) {
    Tt();
    return;
  }
  g = null;
  const t = Et();
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = q();
  e && (g = { thing: e, offset: Nt(c.pos, e) });
}
function Qe(n) {
  if (n.metaKey || delete E.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  c.moveToScreenPos(n);
  const e = { x: c.pos.x, y: c.pos.y };
  if (R && t && !S().isEmpty() && !X && !g) {
    Ot(e.x - t.x, e.y - t.y);
    return;
  }
  if (c.snapPos(g == null ? void 0 : g.thing), g) {
    const s = e.x - g.offset.x, i = e.y - g.offset.y;
    g.thing.moveBy(s - g.thing.x, i - g.thing.y);
  }
}
function Ze(n) {
  p.releasePointerCapture(n.pointerId), R = !1, E.Meta || c.clearPos(), (g == null ? void 0 : g.thing) instanceof B && S().mergeAndAddImplicitConstraints(g.thing), g = null;
}
const tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: je,
  onFrame: Je,
  render: Ne
}, Symbol.toStringTag, { value: "Module" }));
Ee(document.getElementById("canvas"));
const mt = new URLSearchParams(window.location.search).get("tablet") ? qe : tn;
mt.init();
function fe() {
  mt.onFrame(), ae(), Pe(), mt.render(), oe(), requestAnimationFrame(fe);
}
fe();
window.app = Oe;
