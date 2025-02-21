const pt = {
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
let z;
function ve() {
  z = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(pt));
  for (const [n, t] of Object.entries(pt))
    Object.hasOwn(z, n) || (z[n] = t);
}
function H(n) {
  z = { ...z, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Pe() {
  z = JSON.parse(JSON.stringify(pt)), localStorage.setItem("config", JSON.stringify(z));
}
function a() {
  return z;
}
ve();
window.config = a;
const X = Math.PI * 2;
function p(n, t) {
  return Math.sqrt(et(n, t));
}
function et(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function ne(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const st = Object.freeze({ x: 0, y: 0 });
function se({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function Bt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = e * s, r = e * i;
  return { x: o + t.x, y: r + t.y };
}
function vt(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, o = Math.sin(e), r = Math.cos(e), l = s * r - i * o, y = s * o + i * r;
  return { x: l + t.x, y: y + t.y };
}
function ie(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const o of n)
    t = Math.min(t, o.x), e = Math.max(e, o.x), s = Math.min(s, o.y), i = Math.max(i, o.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: s }
  };
}
function re(n, t, e) {
  return Math.sqrt(Ae(n, t, e));
}
function Ae(n, t, e) {
  const s = et(t, e);
  if (s == 0)
    return et(n, t);
  const i = Math.max(
    0,
    Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1)
  );
  return et(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function Nt(n) {
  return 1 - Math.pow(1 - n, 5);
}
let b, u;
function Ee(n) {
  b = n, u = b.getContext("2d"), oe();
}
function Me(n, t) {
  const e = u.globalAlpha;
  u.globalAlpha = n;
  try {
    t();
  } finally {
    u.globalAlpha = e;
  }
}
function oe() {
  if (b.width = innerWidth, b.height = innerHeight, devicePixelRatio !== 1) {
    const n = b.width, t = b.height;
    b.width = n * devicePixelRatio, b.height = t * devicePixelRatio, b.style.width = n + "px", b.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", oe);
function ke() {
  u.clearRect(0, 0, b.width, b.height), u.lineWidth = a().lineWidth, u.lineCap = "round";
}
function lt(n) {
  return n;
}
function U(n, t = A(), e = lt) {
  const s = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(s.x, s.y, u.lineWidth * 2, 0, X), u.fill();
}
function L(n, t, e = A(), s = lt) {
  const i = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const o = s(n), r = s(t);
  u.moveTo(o.x, o.y), u.lineTo(r.x, r.y), u.stroke(), u.lineWidth = i;
}
function ae(n, t, e, s, i = A(), o = lt) {
  const r = o(s < 0 ? t : e), l = o(s < 0 ? e : t), y = o(n), S = Math.atan2(r.y - y.y, r.x - y.x), Y = Math.atan2(l.y - y.y, l.x - y.x), x = Math.abs(Y - S) < 0.05, C = p(y, s < 0 ? r : l), I = Math.floor(Math.abs(s) / X);
  u.strokeStyle = i;
  for (let tt = 0; tt < I - (x ? 1 : 0); tt++)
    u.beginPath(), u.arc(y.x, y.y, C, S, S + X), u.stroke();
  u.beginPath(), u.arc(y.x, y.y, C, S, x ? S + X : Y), u.stroke();
}
function ce(n, t, e = A(), s = lt) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const o = u.measureText(t).width, { x: r, y: l } = s(n);
  u.fillText(t, r - o / 2, l + i / 2);
}
function A(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= a().baseAlphaMultiplier, `rgba(255,255,255,${a().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
let O = 1;
const T = { x: 0, y: 0 }, d = {
  reset() {
    O = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return O;
  },
  set scale(n) {
    O = n;
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
      x: (n - T.x) * O + innerWidth / 2,
      y: -(t - T.y) * O + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / O + T.x,
      y: T.y - (t - innerHeight / 2) / O
    };
  }
};
let D = null, le = 0;
function g(n) {
  D = typeof n == "string" ? { message: n } : n, le = Date.now();
}
function Ce() {
  if (D === null)
    return;
  const n = Date.now() - le;
  if (n > a().statusTimeMillis) {
    D = null;
    return;
  }
  if (D.message) {
    u.font = "40px Monaco";
    const e = u.measureText(D.message).width, s = 1 - Nt(n / a().statusTimeMillis);
    u.fillStyle = `rgba(255,222,33,${s})`, u.fillText(D.message, (innerWidth - e) / 2, innerHeight - 40);
  }
  if (a().highlightReferents && D.referents) {
    const e = `rgba(255,222,33,${1 - Nt(n / (0.5 * a().statusTimeMillis))})`;
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
class Pt extends k {
  constructor(t, { x: e, y: s }) {
    super([], [t]), this.pos = { x: e, y: s };
  }
  map(t, e, s) {
    return new Pt(e.get(this.p), s(this.pos));
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
class At extends k {
  constructor(t, e) {
    super([], [t, e]);
  }
  map(t, e) {
    return new At(e.get(this.a), e.get(this.b));
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
class it extends k {
  constructor(t, e) {
    super([], [t, e]), this.distance = p(t, e);
  }
  map(t, e) {
    return new it(e.get(this.a), e.get(this.b));
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
    return re(this.p, this.a, this.b);
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
class dt extends k {
  constructor(t, e, s) {
    super([e], [t, s]), this.instance = e;
  }
  map(t, e) {
    return new dt(
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
      se(
        Bt(
          vt(this.masterPoint, st, this.instance.angle),
          st,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class ut extends k {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  map(t, e) {
    return new ut(t.get(this.instance), this.scale);
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
class Gt {
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
    const l = this.computeError();
    return r < Math.min(o, l) ? (t.value = i + e, !0) : l < Math.min(o, r) ? (t.value = i - e, !0) : (t.value = i, !1);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class R {
  constructor(t) {
    this.value = t;
  }
}
const at = class at {
  constructor({ x: t, y: e }) {
    this.id = at.nextId++, this.xVar = new R(t), this.yVar = new R(e);
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
    a().debug && ce(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), U(this, e, t);
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
at.nextId = 0;
let P = at;
class $ {
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
    return re(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((s) => s.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !a().showGuideLines)
      return;
    const s = this.isGuide ? a().guideLineColor : e ?? A();
    L(this.a, this.b, s, t);
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
    this.a = new P(t), this.b = p(t, e) === 0 ? this.a : new P(e), this.c = new P(s), this.cummRotation = new R(i);
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
    ae(this.c, this.a, this.b, this.cummRotation.value, e ?? A(), t), s === 1 && a().showControlPoints && (U(this.a, a().controlPointColor, t), U(this.b, a().controlPointColor, t), U(this.c, a().controlPointColor, t));
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
const ct = class ct {
  constructor(t, e, s, i, o, r) {
    this.master = t, this.transform = (l) => se(Bt(vt(l, st, this.angle), st, this.scale), this), this.id = ct.nextId++, this.attachers = [], this.xVar = new R(e), this.yVar = new R(s), this.angleAndSizeVecX = new R(i * Math.cos(o)), this.angleAndSizeVecY = new R(i * Math.sin(o)), this.addAttachers(t, r);
  }
  addAttachers(t, e) {
    for (const s of t.attachers)
      this.addAttacher(s, e);
  }
  addAttacher(t, e) {
    const s = new P(this.transform(t));
    this.attachers.push(s), e.constraints.add(new dt(s, this, t));
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
    return ie(i);
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
      L(
        t(this.transform(this.master.attachers[o])),
        r,
        a().instanceSideAttacherColor
      ), U(r, a().instanceSideAttacherColor);
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
ct.nextId = 0;
let B = ct;
class he {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Gt();
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
      if (i instanceof it) {
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
      const { x: o, y: r } = Bt(i, s, e);
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
      const { x: o, y: r } = vt(i, s, e);
      i.x = o, i.y = r;
    }
    return !0;
  }
  addLine(t, e, s = !1, i = !0) {
    const o = new $(t, e, s);
    !s && i && (this.mergeAndAddImplicitConstraints(o.a), this.mergeAndAddImplicitConstraints(o.b));
    for (const r of this.things)
      r.forEachHandle((l) => {
        l !== o.a && l !== o.b && o.contains(l) && this.constraints.add(new _(l, o.a, o.b));
      });
    return this.things.push(o), o;
  }
  addArc(t, e, s, i, o = !0) {
    const r = new j(t, e, s, i);
    o && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new ht(r.a, r.c, r.b, r.c));
    for (const l of this.things)
      l.forEachHandle((y) => {
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
      e.has(s) || !s.contains(t) || (s instanceof $ ? (this.constraints.add(new _(t, s.a, s.b)), a().showImplicitConstraints && g({ message: "(point on line)", referents: /* @__PURE__ */ new Set([t, s]) })) : s instanceof j && (this.constraints.add(new J(t, s.a, s.b, s.c)), a().showImplicitConstraints && g({ message: "(point on arc)", referents: /* @__PURE__ */ new Set([t, s]) })));
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
    return e ? (this.constraints.add(new Pt(e, t)), g({ message: "fixed point", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Et(e)), g({ message: "weight", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new it(e.a, e.b)), g({ message: "fixed distance", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new At(e.a, e.b)), g({ message: "HorV", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.constraints.add(new ut(e)), g({ message: "full size", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof B ? (this.inline(e), g({ message: "dismember", referents: /* @__PURE__ */ new Set([e]) }), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: s } = t.master, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof $) {
        const l = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        i.set(r.a, l.a), i.set(r.b, l.b);
      } else if (r instanceof j) {
        const l = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c),
          r.cummRotation.value
        );
        i.set(r.a, l.a), i.set(r.b, l.b), i.set(r.c, l.c);
      } else if (r instanceof B) {
        const l = this.addInstance(
          r.master,
          t.transform(r),
          // move the center to the right place
          t.scale * r.size,
          t.angle + r.angle
        );
        o.set(r, l);
      } else
        throw new Error("unsupported thing type: " + r.constructor.name);
    s.forEach((r) => {
      this.constraints.add(r.map(o, i, t.transform));
    }), this.things = this.things.filter((r) => r !== t);
  }
  snap(t, e, s) {
    const i = this.handleAt(t, e);
    if (i)
      return S(i), "H";
    if (s && p(t, s) <= a().closeEnough / d.scale)
      return S(s), "H";
    const o = new Gt(), r = new P(t), l = /* @__PURE__ */ new Set();
    r.forEachVar((x) => l.add(x));
    const y = [];
    for (const x of this.things)
      x === e || e instanceof P && Y(x, e) || !x.contains(t) || (x instanceof $ ? (o.add(new _(r, x.a, x.b)), y.push("L")) : x instanceof j && (o.add(new J(r, x.a, x.b, x.c)), y.push("A")));
    if (o.isEmpty())
      return null;
    for (; o.relax(l); )
      ;
    return S(r), y.join();
    function S(x) {
      if (e) {
        const C = x.x - e.x, I = x.y - e.y;
        e.moveBy(C, I);
      }
      t.x = x.x, t.y = x.y;
    }
    function Y(x, C) {
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
          const l = p(t, r);
          l < s && (i = r, s = l);
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
    return ie(e);
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
      s instanceof B && s.master === t && s.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((s) => {
      if (s instanceof dt && s.masterPoint === e) {
        const { instance: i, instancePoint: o } = s;
        i.attachers = i.attachers.filter((r) => r !== o), this.constraints.remove(s);
      }
    });
  }
  drawText(t, e, s) {
    de(
      t,
      e,
      (i, o, r) => i.render(
        ({ x: l, y }) => ({
          x: l * r + o - d.center.x + s.x,
          y: -y * r + s.y
        }),
        void 0,
        1
      )
    );
  }
}
const Ie = {
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
}, We = 1, De = {
  data: Ie,
  version: We
};
function Ve(n, t, e = a().fontScale) {
  for (const s of t)
    switch (s.command) {
      case "line": {
        const i = yt(s.start, e), o = yt(s.end, e);
        n.addLine(i, o, !1, !1);
        break;
      }
      case "arc": {
        const i = yt(s.center, e), o = s.radius * e;
        n.addArc(
          Kt(i, s.end, o),
          Kt(i, s.start, o),
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
const ze = new Map(De.data.values), mt = /* @__PURE__ */ new Map();
for (const [n, t] of ze) {
  const e = new he();
  Ve(e, t, a().fontScale);
  const s = e.addLine(
    { x: -a().kerning * a().fontScale, y: 0 },
    { x: (4 + a().kerning) * a().fontScale, y: 0 },
    !0
  );
  e.attachers.push(s.a, s.b), mt.set(n, e);
}
function de(n, t, e) {
  const s = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), i = (r) => s(r) * a().fontScale * (4 + a().kerning * 2);
  let o = d.center.x - 0.5 * [...n].map(i).reduce((r, l) => r + l, 0);
  for (let r = 0; r < n.length; r++) {
    const l = n[r], y = s(l), S = mt.get(l.toUpperCase());
    S && e(S, o, y), o += i(l);
  }
}
function yt({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function Kt({ x: n, y: t }, e, s) {
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
    W ? (W.x = t.x, W.y = t.y) : W = t, Le();
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
  q["" + n] = new he();
let m = q[1];
window.drawing = m;
function v(n) {
  return n ? q[n] ?? mt.get(n) : m;
}
function Mt(n) {
  const t = v(n);
  !t || t === m || (m.leave(), m = t, Q(() => d.reset()), ft(), g("drawing #" + n));
}
const xt = [...Object.values(q), ...mt.values()];
let h = null;
function kt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (h == null ? void 0 : h.type) === "line" && m.addLine(h.start, n), h = {
    type: "line",
    start: n
  };
}
function Ct() {
  (h == null ? void 0 : h.type) === "line" && (h = null);
}
function It() {
  if (c.pos && ((h == null ? void 0 : h.type) !== "arc" && (h = { type: "arc", positions: [], cummRotation: 0 }), h.positions.push({ x: c.pos.x, y: c.pos.y }), h.positions.length === 3)) {
    const [n, t, e] = h.positions;
    m.addArc(t, e, n, h.cummRotation), h = null;
  }
}
function Le() {
  if (!h || h.type !== "arc" || h.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = h.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!h.prevAngle) {
    h.prevAngle = e, h.cummRotation = 0;
    return;
  }
  let s = e - h.prevAngle;
  s > Math.PI ? s -= X : s < -Math.PI && (s += X), h.cummRotation += s, h.prevAngle = e;
}
function Wt() {
  (h == null ? void 0 : h.type) === "arc" && (h = null);
}
function ue(n, t) {
  const e = n.attachers.indexOf(t);
  m.attachers.splice(e, 1);
  for (const s of Object.values(q))
    s.onAttacherRemoved(n, t);
}
function Oe(n, t) {
  n.attachers.push(t);
  for (const e of Object.values(q))
    e.onAttacherAdded(n, t);
}
function me() {
  if (a().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && m.relax(); )
      ;
  }
}
function wt() {
  !h && m.isEmpty() && Te(), He(), m.render(), $e(), Ce(), Fe();
}
function Te() {
  const n = innerWidth / 100, t = (e, s) => L(e, s, A(), d.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function He() {
  switch (h == null ? void 0 : h.type) {
    case "line":
      c.pos && L(h.start, c.pos, A(), d.toScreenPosition);
      break;
    case "arc":
      if (a().showControlPoints)
        for (const n of h.positions)
          U(n, a().controlPointColor, d.toScreenPosition);
      h.positions.length == 2 && c.pos && h.cummRotation !== void 0 && Math.abs(h.cummRotation) > 0.05 && ae(
        h.positions[0],
        h.positions[1],
        c.pos,
        h.cummRotation,
        A(),
        d.toScreenPosition
      );
      break;
  }
}
function $e() {
  if (!c.pos)
    return;
  const n = d.toScreenPosition(c.pos);
  L(
    { x: n.x - a().crosshairsSize, y: n.y },
    { x: n.x + a().crosshairsSize, y: n.y },
    A("bold")
  ), L(
    { x: n.x, y: n.y - a().crosshairsSize },
    { x: n.x, y: n.y + a().crosshairsSize },
    A("bold")
  );
}
function Fe() {
  if (!a().debug)
    return;
  const n = d.toScreenPosition({ x: 0, y: 0 });
  L({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, a().axisColor), L({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, a().axisColor);
  const t = c.pos;
  t && ce(d.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Dt() {
  return c.pos ? m.handleAt(c.pos) : null;
}
function Z() {
  return c.pos ? m.thingAt(c.pos) : null;
}
function bt() {
  const n = Z();
  return n instanceof $ ? n : null;
}
function fe() {
  const n = Z();
  return n instanceof B ? n : null;
}
function Vt() {
  m.isEmpty() || (g("solve"), m.relax());
}
function zt() {
  a().autoSolve = !a().autoSolve, g(`auto-solve ${a().autoSolve ? "on" : "off"}`);
}
function Lt() {
  c.pos && m.delete(c.pos) && (xe(), m.isEmpty() && Q(() => d.reset()));
}
function Ot() {
  return !!c.pos && m.fixedDistance(c.pos);
}
function Tt() {
  return !!c.pos && m.fixedPoint(c.pos);
}
function Ht() {
  return !!c.pos && m.weight(c.pos);
}
function $t() {
  return !!c.pos && m.horizontalOrVertical(c.pos);
}
function Ft() {
  return !!c.pos && m.fullSize(c.pos);
}
function ye() {
  const n = c.pos;
  n && (g("re-center"), Q(() => {
    d.centerAt(n);
  }));
}
function Rt(n) {
  const t = v(n);
  if (!t.isEmpty() && c.pos && (a().recursion || !t.contains(v()))) {
    const e = m.addInstance(t, c.pos, 0.5 * t.size / d.scale, 0);
    g({ message: "instantiate #" + n, referents: /* @__PURE__ */ new Set([e]) });
  }
}
function Yt() {
  c.pos && m.dismember(c.pos) && xe();
}
function rt(n) {
  return !!c.pos && m.rotateInstanceAt(c.pos, n);
}
function ot(n) {
  return !!c.pos && m.resizeInstanceAt(c.pos, n);
}
function Xt() {
  if (!c.pos)
    return;
  const n = m.handleAt(c.pos);
  n && (m.attachers.includes(n) ? (ue(m, n), g("remove attacher")) : (Oe(m, n), g("add attacher")));
}
let F = null;
function Ut() {
  if (!F) {
    (F = bt()) && g({ message: "equal length", referents: /* @__PURE__ */ new Set([F]) });
    return;
  }
  const n = bt();
  n && (v().constraints.add(
    new ht(F.a, F.b, n.a, n.b)
  ), g({ message: "equal length", referents: /* @__PURE__ */ new Set([F, n]) }));
}
function ft() {
  F = null;
}
function St(n) {
  Q(() => d.scale = n), g("scale=" + d.scale.toFixed(1));
}
function qt(n, t) {
  Q(() => {
    d.center.x -= n, d.center.y -= t;
  });
}
function xe() {
  for (; Re(); )
    ;
}
function Re() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of xt)
    for (const s of e.things)
      n.add(s), s.forEachHandle((i) => t.add(i));
  for (const e of xt) {
    let s = !1;
    for (const i of e.attachers)
      t.has(i) || (ue(e, i), s = !0);
    if (s)
      return !0;
  }
  for (const e of xt)
    e.constraints.forEach((s) => {
      s.isStillValid(n, t) || e.constraints.remove(s);
    });
  return !1;
}
const Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Lt,
  dismember: Yt,
  drawing: v,
  endArc: Wt,
  endEqualLength: ft,
  endLines: Ct,
  fixedDistance: Ot,
  fixedPoint: Tt,
  fullSize: Ft,
  handle: Dt,
  horizontalOrVertical: $t,
  instance: fe,
  instantiate: Rt,
  line: bt,
  moreArc: It,
  moreEqualLength: Ut,
  moreLines: kt,
  onFrame: me,
  panBy: qt,
  pen: c,
  reCenter: ye,
  render: wt,
  rotateInstanceBy: rt,
  scaleInstanceBy: ot,
  setScale: St,
  solve: Vt,
  switchToDrawing: Mt,
  thing: Z,
  toggleAttacher: Xt,
  toggleAutoSolve: zt,
  weight: Ht
}, Symbol.toStringTag, { value: "Module" }));
var ee;
const Xe = (ee = window.webkit) == null ? void 0 : ee.messageHandlers, Ue = window.webkit != null;
function Qt(n, t = n) {
  Ue && Xe[n].postMessage(t);
}
let N = [], gt = !1;
function qe() {
  const n = N;
  return N = [], n;
}
function Zt(n) {
  for (const t of n)
    (!t.predicted || a().usePredictedEvents) && N.push(t);
}
function jt(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (gt = !0), t === "ended" && (gt = !1), !(t === "moved" && !gt) && N.push({
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
function je() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", ge), N = [];
}
window.onpointerdown = (n) => jt(n, "began");
window.onpointermove = (n) => jt(n, "moved");
window.onpointerup = (n) => jt(n, "ended");
const ge = (n) => n.preventDefault();
window.addEventListener("touchstart", ge, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = Zt, je(), Zt(n);
};
const te = 0.75, _t = () => a().fontScale * 8;
function E(n, t, e, s = 0.35) {
  v().drawText(n, s, {
    x: t + a().tabletButtonWidth / 2,
    y: e + _t() / 2 + s * a().fontScale * 3
  });
}
class f {
  constructor(t) {
    this.label = t, this.topY = 0, this.leftX = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + a().tabletButtonWidth && this.topY <= e && e < this.topY + _t();
  }
  render() {
    E(this.label, this.leftX, this.topY), this.isDown && (E(this.label, this.leftX, this.topY), E(this.label, this.leftX, this.topY));
  }
  get isDown() {
    return this.fingerId != null;
  }
  clearState() {
    this.fingerId = null;
  }
}
class pe {
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
    for (const t of qe())
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
      i.leftX = t, i.topY = s * _t(), s++;
  }
  clearButtonState() {
    this.buttons.forEach((t) => t.clearState());
  }
}
let V;
function Jt(n) {
  V == null || V.clearButtonState(), V = n;
}
function _e() {
  Jt(we);
}
function Je() {
  V.processEvents(), V.onFrame();
}
function Ne() {
  V.render();
}
const we = new class extends pe {
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
    this.solveButton.isDown && Vt();
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
    c.clearPos(), this.endDragEtc(), Ct(), Wt();
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof P && v().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && Ut();
  }
  onButtonDown(n) {
    if ("1" <= n.label && n.label <= "9") {
      c.pos ? (Rt(n.label), this.move()) : Mt(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        v().clear(), d.reset();
        break;
      case this.lineButton:
        kt();
        break;
      case this.arcButton:
        It();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        $t();
        break;
      case this.fixButton:
        Tt() || Ot();
        break;
      case this.sizeButton:
        Ft();
        break;
      case this.weightButton:
        Ht();
        break;
      case this.dismemberButton:
        Yt();
        break;
      case this.attacherButton:
        Xt();
        break;
      case this.deleteButton:
        Lt();
        break;
      case this.autoSolveButton:
        zt();
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        Jt(be);
        break;
    }
  }
  onButtonUp(n) {
    n === this.eqButton && ft();
  }
  onFingerMove(n, t) {
    if (v().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const s = d.fromScreenPosition(n), i = d.fromScreenPosition(e);
    if (c.pos || qt(s.x - i.x, s.y - i.y), this.fingerScreenPositions.size !== 2)
      return;
    let o = null;
    for (const [C, I] of this.fingerScreenPositions.entries())
      if (C !== t) {
        o = I;
        break;
      }
    if (!o)
      throw new Error("bruh?!");
    const r = d.fromScreenPosition(o), l = p(r, i), S = p(r, s) / l, Y = Math.atan2(i.y - r.y, i.x - r.x), x = Math.atan2(s.y - r.y, s.x - r.x);
    fe() && !this.drag && this.move(), !ot(S) && !c.pos && (d.scale *= S), rt(x - Y);
  }
  move() {
    const n = Dt();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = Z();
    t && (this.drag = { thing: t, offset: ne(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    Qt("prepareHaptics");
  }
  hapticBump() {
    Qt("hapticImpact");
  }
}(), be = new class extends pe {
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
    super.render(), E(
      a().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * a().tabletButtonWidth,
      this.leftyButton.topY
    ), E(
      a().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * a().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * te
    ), E(
      a().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * a().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * te
    ), E(
      a().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * a().tabletButtonWidth,
      this.flickerButton.topY
    ), E(
      a().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * a().tabletButtonWidth,
      this.ctrlPtsButton.topY
    ), E(
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
        Pe(), g("restored defaults!");
        break;
      case this.leftyButton:
        H({ lefty: !a().lefty });
        break;
      case this.flickerButton:
        H({ flicker: !a().flicker });
        break;
      case this.ctrlPtsButton:
        H({ showControlPoints: !a().showControlPoints });
        break;
      case this.recursionButton:
        H({ recursion: !a().recursion }), g(a().recursion ? "use at your own risk!" : "phew");
        break;
      case this.backButton:
        Jt(we);
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
      H({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(a().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      H({ baseAlphaMultiplier: e });
    }
  }
}(), Ge = () => V === be, Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: _e,
  isInConfigScreen: Ge,
  onFrame: Je,
  render: Ne
}, Symbol.toStringTag, { value: "Module" }));
function Se(n, t = 1) {
  const e = v(), s = [];
  return de(n, t, (i, o, r) => {
    const l = e.addInstance(i, { x: o, y: d.center.y }, i.size * r, 0);
    e.constraints.add(new ut(l, r));
    const y = s.at(-1);
    y && e.replaceHandle(l.attachers[0], y.attachers[1]), s.push(l);
  }), s;
}
function Qe(n, t = 1) {
  const e = Se(n, t);
  for (const s of e) {
    const i = d.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    s.x = i.x, s.x = i.y;
  }
}
const Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: Qe,
  write: Se
}, Symbol.toStringTag, { value: "Module" })), M = {};
let G = !1, K = !1, w = null;
function tn() {
  window.addEventListener("keydown", sn), window.addEventListener("keyup", rn), b.addEventListener("pointerdown", on), b.addEventListener("pointermove", an), b.addEventListener("pointerup", cn);
}
function en() {
  M[" "] && Vt();
}
function nn() {
}
function sn(n) {
  if (M[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    M.Shift ? Rt(t) : Mt(t);
    return;
  }
  switch (n.key) {
    case "f":
      H({ flicker: !a().flicker });
      return;
    case "d":
      a().debug = !a().debug, g(`debug ${a().debug ? "on" : "off"}`);
      return;
    case "S":
      zt();
      return;
  }
  if (!v().isEmpty())
    switch (n.key) {
      case "Backspace":
        Lt();
        break;
      case ".":
        Tt() || Ot();
        break;
      case "W":
        Ht();
        break;
      case "h":
        $t();
        break;
      case "=":
        ot(1.05) || St(Math.min(d.scale + 0.1, 10));
        break;
      case "-":
        ot(0.95) || St(Math.max(d.scale - 0.1, 0.1));
        break;
      case "q":
        rt(5 * Math.PI / 180);
        break;
      case "w":
        rt(-5 * Math.PI / 180);
        break;
      case "s":
        Ft();
        break;
      case "A":
        Xt();
        break;
      case "c":
        ye();
        break;
      case "D":
        Yt();
        break;
    }
}
function rn(n) {
  switch (delete M[n.key], n.key) {
    case "Meta":
      Ct(), K = !1, G || c.clearPos();
      break;
    case "a":
      Wt(), K = !1, G || c.clearPos();
      break;
    case "e":
      ft();
      break;
  }
}
function on(n) {
  if (b.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), G = !0, M.Meta) {
    kt(), K = !0;
    return;
  } else if (M.a) {
    It(), K = !0;
    return;
  } else if (M.e) {
    Ut();
    return;
  }
  w = null;
  const t = Dt();
  if (t) {
    w = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = Z();
  e && (w = { thing: e, offset: ne(c.pos, e) });
}
function an(n) {
  if (n.metaKey || delete M.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), G && t && !v().isEmpty() && !K && !w) {
    qt(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(w == null ? void 0 : w.thing), w) {
    const e = c.pos.x - w.offset.x, s = c.pos.y - w.offset.y;
    w.thing.moveBy(e - w.thing.x, s - w.thing.y);
  }
}
function cn(n) {
  b.releasePointerCapture(n.pointerId), G = !1, M.Meta || c.clearPos(), (w == null ? void 0 : w.thing) instanceof P && v().mergeAndAddImplicitConstraints(w.thing), w = null;
}
const ln = () => !1, hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: tn,
  isInConfigScreen: ln,
  onFrame: en,
  render: nn
}, Symbol.toStringTag, { value: "Module" }));
Ee(document.getElementById("canvas"));
const nt = new URLSearchParams(window.location.search).get("tablet") ? Ke : hn;
nt.init();
function Be() {
  nt.onFrame(), me(), ke(), nt.render(), nt.isInConfigScreen() ? Me(0.25, () => wt()) : wt(), requestAnimationFrame(Be);
}
Be();
window.app = Ye;
window.demos = Ze;
