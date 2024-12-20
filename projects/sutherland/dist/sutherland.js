const h = {
  debug: !1,
  flicker: !1,
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
  statusTimeMillis: 4e3
};
window.config = h;
function g(s, t) {
  return Math.sqrt(I(s, t));
}
function I(s, t) {
  return Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2);
}
function G(s, t) {
  return { x: s.x - t.x, y: s.y - t.y };
}
const H = Object.freeze({ x: 0, y: 0 });
function J({ x: s, y: t }, { x: e, y: n }) {
  return { x: s + e, y: t + n };
}
function F(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, a = e * n, o = e * i;
  return { x: a + t.x, y: o + t.y };
}
function R(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, a = Math.sin(e), o = Math.cos(e), d = n * o - i * a, L = n * a + i * o;
  return { x: d + t.x, y: L + t.y };
}
function K(s) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, i = -1 / 0;
  for (const a of s)
    t = Math.min(t, a.x), e = Math.max(e, a.x), n = Math.min(n, a.y), i = Math.max(i, a.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: n }
  };
}
function Q(s, t, e) {
  return Math.sqrt(ht(s, t, e));
}
function ht(s, t, e) {
  const n = I(t, e);
  if (n == 0)
    return I(s, t);
  const i = Math.max(
    0,
    Math.min(((s.x - t.x) * (e.x - t.x) + (s.y - t.y) * (e.y - t.y)) / n, 1)
  );
  return I(s, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function dt(s) {
  return 1 - Math.pow(1 - s, 5);
}
let y, u;
function lt(s) {
  if (y = s, u = y.getContext("2d"), y.width = innerWidth, y.height = innerHeight, devicePixelRatio !== 1) {
    const t = y.width, e = y.height;
    y.width = t * devicePixelRatio, y.height = e * devicePixelRatio, y.style.width = t + "px", y.style.height = e + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
let P = "", N = 0;
function m(s) {
  P = s, N = Date.now();
}
function xt() {
  if (u.clearRect(0, 0, y.width, y.height), u.lineWidth = 5, u.lineCap = "round", P.length > 0) {
    u.font = "40px Monaco";
    const t = u.measureText(P).width, e = Date.now() - N;
    if (e > h.statusTimeMillis)
      P = "";
    else {
      const n = 1 - dt(e / h.statusTimeMillis);
      u.fillStyle = `rgba(255,222,33,${n})`, u.fillText(
        P,
        (innerWidth - t) / 2,
        innerHeight - 40
      );
    }
  }
}
function X(s) {
  return s;
}
function A(s, t, e = b(), n = X) {
  u.strokeStyle = e, u.beginPath();
  const i = n(s), a = n(t);
  u.moveTo(i.x, i.y), u.lineTo(a.x, a.y), u.stroke();
}
function Z(s, t, e, n = b(), i = X) {
  const a = i(t), o = i(e), d = i(s);
  u.beginPath(), u.strokeStyle = n;
  const L = Math.atan2(a.y - d.y, a.x - d.x), ct = Math.atan2(o.y - d.y, o.x - d.x);
  u.arc(d.x, d.y, g(d, a), L, ct), u.stroke();
}
function _(s, t, e = b(), n = X) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const a = u.measureText(t).width, { x: o, y: d } = n(s);
  u.fillText(t, o - a / 2, d + i / 2);
}
function b(s = "normal") {
  let t, e;
  return s === "normal" ? (t = 0.35, e = 0.3) : s === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), `rgba(255, 255, 255, ${h.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
class M {
  constructor(t, e) {
    this.things = t, this.handles = e;
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    return this.things.every((n) => t.has(n)) && this.handles.every((n) => e.has(n));
  }
  replaceHandle(t, e) {
    for (let n = 0; n < this.handles.length; n++)
      this.handles[n], this.handles.forEach((i, a) => {
        i === t && (this.handles[a] = e);
      });
  }
}
class ut extends M {
  constructor(t, e) {
    super([], [t, e]);
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
    return Math.min(
      Math.abs(this.a.x - this.b.x),
      Math.abs(this.a.y - this.b.y)
    );
  }
}
class yt extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = g(t, e);
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
class q extends M {
  constructor(t, e, n, i) {
    super([], [t, e, n, i]);
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
class T extends M {
  constructor(t, e, n) {
    super([], [t, e, n]);
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
    return Q(this.p, this.a, this.b);
  }
}
class B extends M {
  constructor(t, e, n, i) {
    super([], [t, e, n, i]);
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
  constructor(t, e, n) {
    super([e], [t, n]), this.instance = e;
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
      J(
        F(
          R(this.masterPoint, H, this.instance.angle),
          H,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class et extends M {
  constructor(t, e = 1) {
    super([t], []), this.instance = t, this.scale = e;
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
}
class U {
  constructor() {
    this.constraints = [];
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((n) => n.signature === e) || this.constraints.push(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter(
      (e) => e !== t
    );
  }
  clear() {
    this.constraints = [];
  }
  replaceHandle(t, e) {
    const n = this.constraints;
    this.constraints = [], n.forEach((i) => {
      i.replaceHandle(t, e), this.add(i);
    });
  }
  forEach(t) {
    this.constraints.forEach(t);
  }
  relax(t) {
    let e = !1;
    for (const n of t)
      e = this.relaxWithVar(n) || e;
    return e;
  }
  relaxWithVar(t) {
    const e = t.value, n = this.computeError() - h.minWorthwhileErrorImprovement;
    t.value = e + 1;
    const i = this.computeError();
    t.value = e - 1;
    const a = this.computeError();
    return i < Math.min(n, a) ? (t.value = e + 1, !0) : a < Math.min(n, i) ? (t.value = e - 1, !0) : (t.value = e, !1);
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
const C = class C {
  constructor({ x: t, y: e }) {
    this.id = C.nextId++, this.xVar = new z(t), this.yVar = new z(e);
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
    return g(t, this) <= h.closeEnough;
  }
  distanceTo(t) {
    return g(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, n = h.instanceSideAttacherColor) {
    h.debug && _(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), A(this, this, n, e);
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
C.nextId = 0;
let w = C;
class V {
  constructor(t, e, n) {
    this.isGuide = n, this.a = new w(t), this.b = new w(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= h.closeEnough;
  }
  distanceTo(t) {
    return Q(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    A(
      this.a,
      this.b,
      this.isGuide ? h.guideLineColor : b(t.has(this) ? "bold" : "normal"),
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
class W {
  constructor(t, e, n) {
    this.a = new w(t), this.b = new w(e), this.c = new w(n);
  }
  contains(t) {
    return this.distanceTo(t) <= h.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(g(t, this.c) - g(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    Z(
      this.c,
      this.a,
      this.b,
      b(t.has(this) ? "bold" : "normal"),
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
const D = class D {
  constructor(t, e, n, i, a) {
    this.master = t, this.transform = (o) => J(
      F(R(o, H, this.angle), H, this.scale),
      this
    ), this.id = D.nextId++, this.attachers = [], this.xVar = new z(e), this.yVar = new z(n), this.angleAndSizeVecX = new z(i), this.angleAndSizeVecY = new z(0), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new w(this.transform(t));
    this.attachers.push(n), e.constraints.add(
      new tt(n, this, t)
    );
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
    const { topLeft: e, bottomRight: n } = this.master.boundingBox(), i = [
      e,
      n,
      { x: e.x, y: n.y },
      { x: n.x, y: e.y }
    ].map(this.transform), { topLeft: a, bottomRight: o } = K(i);
    return a.x <= t.x && t.x <= o.x && o.y <= t.y && t.y <= a.y;
  }
  distanceTo(t) {
    return g(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((i) => e(this.transform(i)), n + 1), n === 1 && this.attachers.forEach((i, a) => {
      A(
        e(this.transform(this.master.attachers[a])),
        e(i),
        h.instanceSideAttacherColor
      );
    });
  }
  forEachHandle(t) {
    this.attachers.forEach(t);
  }
  replaceHandle(t, e) {
    this.attachers = this.attachers.map((n) => n === t ? e : n);
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar), t(this.angleAndSizeVecX), t(this.angleAndSizeVecY), this.forEachHandle((e) => e.forEachVar(t));
  }
};
D.nextId = 0;
let p = D;
class nt {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new U(), this.selection = /* @__PURE__ */ new Set();
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
  render(t, e = 0) {
    this.things.forEach((n) => {
      n instanceof p ? n.render(this.selection, t, e + 1) : n.render(this.selection, t);
    }), e === 0 && this.attachers.forEach(
      (n) => n.render(this.selection, t, h.masterSideAttacherColor)
    );
  }
  addInstance(t, { x: e, y: n }, i) {
    if (t === this)
      return null;
    const a = new p(t, e, n, i, this);
    return this.things.push(a), a;
  }
  resizeInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof p))
      return !1;
    n.scale *= e;
    for (const i of n.attachers) {
      const { x: a, y: o } = F(i, n, e);
      i.x = a, i.y = o;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof p))
      return !1;
    n.angle += e;
    for (const i of n.attachers) {
      const { x: a, y: o } = R(i, n, e);
      i.x = a, i.y = o;
    }
    return !0;
  }
  addLine(t, e, n = !1) {
    const i = new V(t, e, n);
    n || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const a of this.things)
      a.forEachHandle((o) => {
        o !== i.a && o !== i.b && i.contains(o) && this.constraints.add(new T(o, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, n) {
    const i = new W(t, e, n);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(
      new q(i.a, i.c, i.b, i.c)
    );
    for (const a of this.things)
      a.forEachHandle((o) => {
        o !== i.a && o !== i.b && o !== i.c && i.contains(o) && this.constraints.add(
          new B(o, i.a, i.b, i.c)
        );
      });
    return this.things.push(i), i;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.things)
      n.forEachHandle((i) => {
        i !== t && i.contains(t) && (this.replaceHandle(i, t), e.add(n));
      });
    for (const n of this.things)
      e.has(n) || !n.contains(t) || (n instanceof V ? this.constraints.add(
        new T(t, n.a, n.b)
      ) : n instanceof W && this.constraints.add(
        new B(t, n.a, n.b, n.c)
      ));
  }
  replaceHandle(t, e) {
    this.things.forEach((n) => n.replaceHandle(t, e)), this.attachers = this.attachers.map((n) => n === t ? e : n), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    return e.size === 0 ? !1 : (this.things = this.things.filter((n) => !e.has(n)), this.selection.clear(), !0);
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof V && (this.constraints.add(new yt(i.a, i.b)), n = !0);
    return this.selection.clear(), n;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const n of this.selection)
      n instanceof V && (e && (this.constraints.add(
        new q(e.a, e.b, n.a, n.b)
      ), t = !0), e = n);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof V && (this.constraints.add(
        new ut(i.a, i.b)
      ), n = !0);
    return this.selection.clear(), n;
  }
  fullSize(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.constraints.add(new et(i)), e = !0);
    return e;
  }
  snap(t, e) {
    const n = this.handleAt(t, e);
    if (n) {
      t.x = n.x, t.y = n.y;
      return;
    }
    const i = new U(), a = new w(t), o = /* @__PURE__ */ new Set();
    a.forEachVar((d) => o.add(d));
    for (const d of this.things)
      this.selection.has(d) || !d.contains(t) || (d instanceof V ? i.add(
        new T(a, d.a, d.b)
      ) : d instanceof W && i.add(
        new B(a, d.a, d.b, d.c)
      ));
    for (; i.relax(o); )
      ;
    t.x = a.x, t.y = a.y;
  }
  handleAt(t, e = null) {
    let n = 1 / 0, i = null;
    for (const a of this.things)
      a.forEachHandle((o) => {
        if (o !== e && o.contains(t)) {
          const d = g(t, o);
          d < n && (i = o, n = d);
        }
      });
    return i;
  }
  thingAt(t) {
    let e = 1 / 0, n = null;
    for (const i of this.things)
      if (i.contains(t)) {
        const a = i.distanceTo(t);
        a < e && (n = i, e = a);
      }
    return n;
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
  moveSelection(t, e) {
    for (const n of this.getHandles(this.selection))
      n.x += t, n.y += e;
  }
  leave() {
    this.center(), this.selection.clear();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), n = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const a of this.getPositions())
      a.x += n, a.y += i;
  }
  boundingBox() {
    return K(this.getPositions());
  }
  get size() {
    let t = 0;
    for (const { x: e, y: n } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(n, 2));
    return Math.sqrt(t) * 2;
  }
  thingsForOperation(t) {
    const e = this.thingAt(t);
    return this.selection.size > 0 ? this.selection : e ? /* @__PURE__ */ new Set([e]) : /* @__PURE__ */ new Set();
  }
  getHandles(t) {
    const e = /* @__PURE__ */ new Set();
    for (const n of t)
      n.forEachHandle((i) => e.add(i));
    return e;
  }
  getHandle(t) {
    let e, n = 0;
    for (const i of this.things)
      i.forEachHandle((a) => {
        n++ === t && (e = a);
      });
    return e;
  }
  getPositions() {
    const t = this.getHandles(this.things);
    for (const e of this.things)
      e instanceof p && t.add(e);
    return t;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((n) => t.add(n));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const n of this.things)
      n instanceof p && n.master === t && n.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((n) => {
      if (n instanceof tt && n.masterPoint === e) {
        const { instance: i, instancePoint: a } = n;
        i.attachers = i.attachers.filter(
          (o) => o !== a
        ), this.constraints.remove(n);
      }
    });
  }
}
const ft = {
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
    ]
  ]
}, mt = 1, gt = {
  data: ft,
  version: mt
};
function st(s, t, e = h.fontScale) {
  for (const n of t)
    switch (n.command) {
      case "line": {
        const i = O(n.start, e), a = O(n.end, e);
        s.addLine(i, a);
        break;
      }
      case "arc": {
        const i = O(n.center, e), a = n.radius * e;
        s.addArc(
          j(i, n.end, a),
          j(i, n.start, a),
          i
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", n);
        break;
    }
}
const it = new Map(
  gt.data.values
), $ = /* @__PURE__ */ new Map();
for (const [s, t] of it) {
  const e = new nt();
  st(e, t, h.fontScale);
  const n = e.addLine(
    { x: -h.kerning * h.fontScale, y: 0 },
    { x: (4 + h.kerning) * h.fontScale, y: 0 },
    !0
  );
  e.attachers.push(n.a, n.b), $.set(s, e);
}
function O({ x: s, y: t }, e) {
  return { x: s * e, y: t * e };
}
function j({ x: s, y: t }, e, n) {
  return {
    x: s + n * Math.cos(e),
    y: t + n * Math.sin(e)
  };
}
lt(document.getElementById("canvas"));
const c = {
  x: 1 / 0,
  y: 1 / 0,
  down: !1
}, S = {};
let l = null, f = null;
const x = {
  center: { x: 0, y: 0 },
  scale: 1,
  reset() {
    this.scale = 1, this.centerAt({ x: 0, y: 0 });
  },
  centerAt({ x: s, y: t }) {
    this.center.x = s, this.center.y = t;
  },
  setScale(s) {
    this.scale = s;
  }
};
x.reset();
function v({ x: s, y: t }) {
  return {
    x: (s - x.center.x) * x.scale + innerWidth / 2,
    y: -(t - x.center.y) * x.scale + innerHeight / 2
  };
}
function at({ x: s, y: t }) {
  return {
    x: (s - innerWidth / 2) / x.scale + x.center.x,
    y: x.center.y - (t - innerHeight / 2) / x.scale
  };
}
const E = [];
for (let s = 0; s < 10; s++)
  E.push(new nt());
let r;
function Y(s) {
  k(() => {
    r == null || r.leave(), x.reset(), r = s, window.drawing = s;
  });
}
Y(E[1]);
function rt() {
  if (h.autoSolve) {
    const s = performance.now();
    for (; performance.now() - s < 20 && r.relax(); )
      ;
  } else
    S[" "] && !r.isEmpty() && (m("solve"), r.relax());
  pt(), requestAnimationFrame(rt);
}
rt();
function pt() {
  xt(), !l && r.isEmpty() ? wt() : r.render(v), bt(), At(), St();
}
function wt() {
  const s = innerWidth / 100, t = (e, n) => A(e, n, b(), v);
  t({ x: -7 * s, y: -4 * s }, { x: -7 * s, y: 4 * s }), t({ x: -3 * s, y: -4 * s }, { x: -3 * s, y: 4 * s }), t({ x: -3 * s, y: 4 * s }, { x: 2 * s, y: -4 * s }), t({ x: 2 * s, y: -4 * s }, { x: 2 * s, y: 4 * s }), t({ x: 6 * s, y: -4 * s }, { x: 6 * s, y: 4 * s }), t({ x: 6 * s, y: 1 * s }, { x: 10 * s, y: 4 * s }), t({ x: 8 * s, y: 2 * s }, { x: 10 * s, y: -4 * s });
}
function bt() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      A(
        l.start,
        c,
        b(),
        v
      );
      break;
    case "arc":
      l.positions.length > 1 && Z(
        l.positions[0],
        l.positions[1],
        c,
        b(),
        v
      );
      break;
  }
}
function At() {
  const s = v(c);
  A(
    { x: s.x - h.crosshairsSize, y: s.y },
    { x: s.x + h.crosshairsSize, y: s.y },
    b("bold")
  ), A(
    { x: s.x, y: s.y - h.crosshairsSize },
    { x: s.x, y: s.y + h.crosshairsSize },
    b("bold")
  );
}
function St() {
  if (h.debug) {
    const s = v({ x: 0, y: 0 });
    A(
      { x: 0, y: s.y },
      { x: innerWidth, y: s.y },
      h.axisColor
    ), A(
      { x: s.x, y: 0 },
      { x: s.x, y: innerHeight },
      h.axisColor
    ), _(
      v(c),
      `(${c.x.toFixed(0)}, ${c.y.toFixed(0)})`
    );
  }
}
window.addEventListener("keydown", (s) => {
  if (S[s.key] = !0, "Digit0" <= s.code && s.code <= "Digit9") {
    const t = parseInt(s.code.slice(5)), e = E[t];
    e === r || (S.Shift ? e.isEmpty() || (m("instantiate #" + t), r.addInstance(e, c, innerHeight / 5 / x.scale)) : (m("drawing #" + t), Y(e)));
    return;
  }
  switch (s.key) {
    case "f":
      h.flicker = !h.flicker;
      return;
    case "d":
      h.debug = !h.debug, m(`debug ${h.debug ? "on" : "off"}`);
      return;
    case "S":
      h.autoSolve = !h.autoSolve, m(`auto-solve ${h.autoSolve ? "on" : "off"}`);
      return;
  }
  if (!r.isEmpty())
    switch (s.key) {
      case "Backspace":
        r.delete(c) && (kt(), m("delete"), r.isEmpty() && k(() => x.reset()));
        break;
      case "l":
        r.fixedDistance(c) && m("fixed distance");
        break;
      case "e":
        r.equalDistance() && m("equal length");
        break;
      case "h":
        r.horizontalOrVertical(c) && m("HorV");
        break;
      case "=":
        r.resizeInstanceAt(c, 1.05) || k(() => {
          x.scale = Math.min(x.scale + 0.1, 10), m("scale=" + x.scale.toFixed(1));
        });
        break;
      case "-":
        r.resizeInstanceAt(c, 0.95) || k(() => {
          x.scale = Math.max(x.scale - 0.1, 0.1), m("scale=" + x.scale.toFixed(1));
        });
        break;
      case "q":
        r.rotateInstanceAt(c, -5 * Math.PI / 180);
        break;
      case "w":
        r.rotateInstanceAt(c, 5 * Math.PI / 180);
        break;
      case "s":
        r.fullSize(c) && m("full size");
        break;
      case "A":
        Vt(c);
        break;
      case "c":
        m("re-center"), k(() => {
          x.centerAt(c);
        });
        break;
    }
});
window.addEventListener("keyup", (s) => {
  switch (delete S[s.key], s.key) {
    case "Meta":
      vt();
      break;
    case "a":
      (l == null ? void 0 : l.type) === "arc" && (l = null);
      break;
  }
});
y.addEventListener("pointerdown", (s) => {
  if (y.setPointerCapture(s.pointerId), s.preventDefault(), s.stopPropagation(), c.down = !0, S.Shift) {
    r.toggleSelections(c);
    return;
  } else if (S.Meta) {
    Et();
    return;
  } else if (S.a) {
    Mt();
    return;
  }
  f = null;
  const t = r.handleAt(c);
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  r.clearSelection();
  const e = r.thingAt(c);
  e instanceof p ? f = { thing: e, offset: G(c, e) } : e && r.toggleSelected(e);
});
y.addEventListener("pointermove", (s) => {
  s.metaKey || delete S.Meta;
  const t = { x: c.x, y: c.y };
  if ({ x: c.x, y: c.y } = at({
    x: s.layerX,
    y: s.layerY
  }), c.down && !r.isEmpty() && !l && !f && r.selection.size === 0) {
    const e = c.x - t.x, n = c.y - t.y;
    k(() => {
      x.center.x -= e, x.center.y -= n;
    });
    return;
  }
  if (r.snap(c, f ? f.thing : null), c.down && r.selection.size > 0) {
    const e = G(c, t);
    r.moveSelection(e.x, e.y);
  }
  if (f) {
    const e = c.x - f.offset.x, n = c.y - f.offset.y;
    f.thing.moveBy(e - f.thing.x, n - f.thing.y);
  }
});
y.addEventListener("pointerup", (s) => {
  y.releasePointerCapture(s.pointerId), c.down = !1, (f == null ? void 0 : f.thing) instanceof w && r.mergeAndAddImplicitConstraints(f.thing), f = null;
});
function Et() {
  const s = { x: c.x, y: c.y };
  (l == null ? void 0 : l.type) === "line" && r.addLine(l.start, s), l = {
    type: "line",
    start: s
  };
}
function vt() {
  l = null;
}
function Mt() {
  if ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [] }), l.positions.push({ x: c.x, y: c.y }), l.positions.length === 3) {
    const [s, t, e] = l.positions;
    r.addArc(t, e, s), l = null;
  }
}
function k(s) {
  const t = v(c);
  s(), { x: c.x, y: c.y } = at(t);
}
function Vt(s) {
  const t = r.handleAt(s);
  t && (r.attachers.includes(t) ? (ot(r, t), m("remove attacher")) : (zt(r, t), m("add attacher")));
}
function ot(s, t) {
  const e = s.attachers.indexOf(t);
  r.attachers.splice(e, 1);
  for (const n of E)
    n.onAttacherRemoved(s, t);
}
function zt(s, t) {
  s.attachers.push(t);
  for (const e of E)
    e.onAttacherAdded(s, t);
}
function kt() {
  for (; Pt(); )
    ;
}
function Pt() {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of [...E, ...$.values()])
    for (const n of e.things)
      s.add(n), n.forEachHandle((i) => t.add(i));
  for (const e of E) {
    let n = !1;
    for (const i of e.attachers)
      t.has(i) || (ot(e, i), n = !0);
    if (n)
      return !0;
  }
  for (const e of E)
    e.constraints.forEach((n) => {
      n.isStillValid(s, t) || e.constraints.remove(n);
    });
  return !1;
}
function It(s) {
  const t = it.get(s);
  t && st(r, t);
}
function Ht(s, t = 1) {
  const e = t * h.fontScale * (4 + h.kerning * 2);
  let n = x.center.x - 0.5 * s.length * e;
  const i = [];
  for (let a = 0; a < s.length; a++) {
    const o = $.get(s[a]);
    if (o) {
      const d = r.addInstance(
        o,
        { x: n, y: x.center.y },
        o.size * t
      );
      r.constraints.add(new et(d, t)), i.length > 0 && r.replaceHandle(
        d.attachers[0],
        i.at(-1).attachers[1]
      ), i.push(d);
    }
    n += e;
  }
}
window.addLetter = It;
window.letterDrawings = $;
window.switchToDrawing = Y;
window.write = Ht;
