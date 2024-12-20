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
  return Math.sqrt(C(s, t));
}
function C(s, t) {
  return Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2);
}
function K(s, t) {
  return { x: s.x - t.x, y: s.y - t.y };
}
const L = Object.freeze({ x: 0, y: 0 });
function Q({ x: s, y: t }, { x: e, y: n }) {
  return { x: s + e, y: t + n };
}
function X(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, a = e * n, r = e * i;
  return { x: a + t.x, y: r + t.y };
}
function Y(s, t, e) {
  const n = s.x - t.x, i = s.y - t.y, a = Math.sin(e), r = Math.cos(e), d = n * r - i * a, V = n * a + i * r;
  return { x: d + t.x, y: V + t.y };
}
function N(s) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, i = -1 / 0;
  for (const a of s)
    t = Math.min(t, a.x), e = Math.max(e, a.x), n = Math.min(n, a.y), i = Math.max(i, a.y);
  return {
    topLeft: { x: t, y: i },
    bottomRight: { x: e, y: n }
  };
}
function Z(s, t, e) {
  return Math.sqrt(dt(s, t, e));
}
function dt(s, t, e) {
  const n = C(t, e);
  if (n == 0)
    return C(s, t);
  const i = Math.max(
    0,
    Math.min(((s.x - t.x) * (e.x - t.x) + (s.y - t.y) * (e.y - t.y)) / n, 1)
  );
  return C(s, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
function lt(s) {
  return 1 - Math.pow(1 - s, 5);
}
let y, u;
function xt(s) {
  if (y = s, u = y.getContext("2d"), y.width = innerWidth, y.height = innerHeight, devicePixelRatio !== 1) {
    const t = y.width, e = y.height;
    y.width = t * devicePixelRatio, y.height = e * devicePixelRatio, y.style.width = t + "px", y.style.height = e + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
let H = "", _ = 0;
function m(s) {
  H = s, _ = Date.now();
}
function ut() {
  if (u.clearRect(0, 0, y.width, y.height), u.lineWidth = 5, u.lineCap = "round", H.length > 0) {
    u.font = "40px Monaco";
    const t = u.measureText(H).width, e = Date.now() - _;
    if (e > h.statusTimeMillis)
      H = "";
    else {
      const n = 1 - lt(e / h.statusTimeMillis);
      u.fillStyle = `rgba(255,222,33,${n})`, u.fillText(
        H,
        (innerWidth - t) / 2,
        innerHeight - 40
      );
    }
  }
}
function q(s) {
  return s;
}
function S(s, t, e = w(), n = q) {
  u.strokeStyle = e, u.beginPath();
  const i = n(s), a = n(t);
  u.moveTo(i.x, i.y), u.lineTo(a.x, a.y), u.stroke();
}
function tt(s, t, e, n = w(), i = q) {
  const a = i(t), r = i(e), d = i(s);
  u.beginPath(), u.strokeStyle = n;
  const V = Math.atan2(a.y - d.y, a.x - d.x), I = Math.atan2(r.y - d.y, r.x - d.x);
  u.arc(d.x, d.y, g(d, a), V, I), u.stroke();
}
function et(s, t, e = w(), n = q) {
  u.fillStyle = e;
  const i = 12;
  u.font = `${i}px Major Mono Display`;
  const a = u.measureText(t).width, { x: r, y: d } = n(s);
  u.fillText(t, r - a / 2, d + i / 2);
}
function w(s = "normal") {
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
class yt extends M {
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
class ft extends M {
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
class j extends M {
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
class W extends M {
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
    return Z(this.p, this.a, this.b);
  }
}
class O extends M {
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
class nt extends M {
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
      Q(
        X(
          Y(this.masterPoint, L, this.instance.angle),
          L,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class st extends M {
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
class G {
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
class k {
  constructor(t) {
    this.value = t;
  }
}
const D = class D {
  constructor({ x: t, y: e }) {
    this.id = D.nextId++, this.xVar = new k(t), this.yVar = new k(e);
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
    h.debug && et(e(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), S(this, this, n, e);
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
D.nextId = 0;
let b = D;
class z {
  constructor(t, e, n) {
    this.isGuide = n, this.a = new b(t), this.b = new b(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= h.closeEnough;
  }
  distanceTo(t) {
    return Z(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    S(
      this.a,
      this.b,
      this.isGuide ? h.guideLineColor : w(t.has(this) ? "bold" : "normal"),
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
class F {
  constructor(t, e, n) {
    this.a = new b(t), this.b = new b(e), this.c = new b(n);
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
    tt(
      this.c,
      this.a,
      this.b,
      w(t.has(this) ? "bold" : "normal"),
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
const $ = class $ {
  constructor(t, e, n, i, a) {
    this.master = t, this.transform = (r) => Q(
      X(Y(r, L, this.angle), L, this.scale),
      this
    ), this.id = $.nextId++, this.attachers = [], this.xVar = new k(e), this.yVar = new k(n), this.angleAndSizeVecX = new k(i), this.angleAndSizeVecY = new k(0), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new b(this.transform(t));
    this.attachers.push(n), e.constraints.add(
      new nt(n, this, t)
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
    const { topLeft: e, bottomRight: n } = this.boundingBox();
    return e.x <= t.x && t.x <= n.x && n.y <= t.y && t.y <= e.y;
  }
  boundingBox() {
    const { topLeft: t, bottomRight: e } = this.master.boundingBox(), n = [
      t,
      e,
      { x: t.x, y: e.y },
      { x: e.x, y: t.y }
    ].map(this.transform);
    return N(n);
  }
  distanceTo(t) {
    return g(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((i) => e(this.transform(i)), n + 1), n === 1 && this.attachers.forEach((i, a) => {
      S(
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
$.nextId = 0;
let p = $;
class it {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new G(), this.selection = /* @__PURE__ */ new Set();
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
      const { x: a, y: r } = X(i, n, e);
      i.x = a, i.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof p))
      return !1;
    n.angle += e;
    for (const i of n.attachers) {
      const { x: a, y: r } = Y(i, n, e);
      i.x = a, i.y = r;
    }
    return !0;
  }
  addLine(t, e, n = !1) {
    const i = new z(t, e, n);
    n || (this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b));
    for (const a of this.things)
      a.forEachHandle((r) => {
        r !== i.a && r !== i.b && i.contains(r) && this.constraints.add(new W(r, i.a, i.b));
      });
    return this.things.push(i), i;
  }
  addArc(t, e, n) {
    const i = new F(t, e, n);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(
      new j(i.a, i.c, i.b, i.c)
    );
    for (const a of this.things)
      a.forEachHandle((r) => {
        r !== i.a && r !== i.b && r !== i.c && i.contains(r) && this.constraints.add(
          new O(r, i.a, i.b, i.c)
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
      e.has(n) || !n.contains(t) || (n instanceof z ? this.constraints.add(
        new W(t, n.a, n.b)
      ) : n instanceof F && this.constraints.add(
        new O(t, n.a, n.b, n.c)
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
      i instanceof z && (this.constraints.add(new ft(i.a, i.b)), n = !0);
    return this.selection.clear(), n;
  }
  equalDistance() {
    let t = !1, e = null;
    for (const n of this.selection)
      n instanceof z && (e && (this.constraints.add(
        new j(e.a, e.b, n.a, n.b)
      ), t = !0), e = n);
    return this.selection.clear(), t;
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    let n = !1;
    for (const i of e)
      i instanceof z && (this.constraints.add(
        new yt(i.a, i.b)
      ), n = !0);
    return this.selection.clear(), n;
  }
  fullSize(t) {
    let e = !1;
    const n = this.thingsForOperation(t);
    for (const i of n)
      i instanceof p && (this.constraints.add(new st(i)), e = !0);
    return e;
  }
  snap(t, e) {
    const n = this.handleAt(t, e);
    if (n) {
      t.x = n.x, t.y = n.y;
      return;
    }
    const i = new G(), a = new b(t), r = /* @__PURE__ */ new Set();
    a.forEachVar((d) => r.add(d));
    for (const d of this.things)
      this.selection.has(d) || !d.contains(t) || (d instanceof z ? i.add(
        new W(a, d.a, d.b)
      ) : d instanceof F && i.add(
        new O(a, d.a, d.b, d.c)
      ));
    for (; i.relax(r); )
      ;
    t.x = a.x, t.y = a.y;
  }
  handleAt(t, e = null) {
    let n = 1 / 0, i = null;
    for (const a of this.things)
      a.forEachHandle((r) => {
        if (r !== e && r.contains(t)) {
          const d = g(t, r);
          d < n && (i = r, n = d);
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
    const t = [...this.getPositions()];
    for (const e of this.things)
      if (e instanceof p) {
        const n = e.boundingBox();
        t.push(n.topLeft), t.push(n.bottomRight);
      }
    return N(t);
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
      if (n instanceof nt && n.masterPoint === e) {
        const { instance: i, instancePoint: a } = n;
        i.attachers = i.attachers.filter(
          (r) => r !== a
        ), this.constraints.remove(n);
      }
    });
  }
}
const mt = {
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
}, gt = 1, pt = {
  data: mt,
  version: gt
};
function at(s, t, e = h.fontScale) {
  for (const n of t)
    switch (n.command) {
      case "line": {
        const i = R(n.start, e), a = R(n.end, e);
        s.addLine(i, a);
        break;
      }
      case "arc": {
        const i = R(n.center, e), a = n.radius * e;
        s.addArc(
          J(i, n.end, a),
          J(i, n.start, a),
          i
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", n);
        break;
    }
}
const rt = new Map(
  pt.data.values
), T = /* @__PURE__ */ new Map();
for (const [s, t] of rt) {
  const e = new it();
  at(e, t, h.fontScale);
  const n = e.addLine(
    { x: -h.kerning * h.fontScale, y: 0 },
    { x: (4 + h.kerning) * h.fontScale, y: 0 },
    !0
  );
  e.attachers.push(n.a, n.b), T.set(s, e);
}
function R({ x: s, y: t }, e) {
  return { x: s * e, y: t * e };
}
function J({ x: s, y: t }, e, n) {
  return {
    x: s + n * Math.cos(e),
    y: t + n * Math.sin(e)
  };
}
xt(document.getElementById("canvas"));
const c = {
  x: 1 / 0,
  y: 1 / 0,
  down: !1
}, A = {};
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
function ot({ x: s, y: t }) {
  return {
    x: (s - innerWidth / 2) / x.scale + x.center.x,
    y: x.center.y - (t - innerHeight / 2) / x.scale
  };
}
const E = [];
for (let s = 0; s < 10; s++)
  E.push(new it());
let o;
function U(s) {
  P(() => {
    o == null || o.leave(), x.reset(), o = s, window.drawing = s;
  });
}
U(E[1]);
function ct() {
  if (h.autoSolve) {
    const s = performance.now();
    for (; performance.now() - s < 20 && o.relax(); )
      ;
  } else
    A[" "] && !o.isEmpty() && (m("solve"), o.relax());
  bt(), requestAnimationFrame(ct);
}
ct();
function bt() {
  ut(), !l && o.isEmpty() ? wt() : o.render(v), St(), At(), Et();
}
function wt() {
  const s = innerWidth / 100, t = (e, n) => S(e, n, w(), v);
  t({ x: -7 * s, y: -4 * s }, { x: -7 * s, y: 4 * s }), t({ x: -3 * s, y: -4 * s }, { x: -3 * s, y: 4 * s }), t({ x: -3 * s, y: 4 * s }, { x: 2 * s, y: -4 * s }), t({ x: 2 * s, y: -4 * s }, { x: 2 * s, y: 4 * s }), t({ x: 6 * s, y: -4 * s }, { x: 6 * s, y: 4 * s }), t({ x: 6 * s, y: 1 * s }, { x: 10 * s, y: 4 * s }), t({ x: 8 * s, y: 2 * s }, { x: 10 * s, y: -4 * s });
}
function St() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      S(
        l.start,
        c,
        w(),
        v
      );
      break;
    case "arc":
      l.positions.length > 1 && tt(
        l.positions[0],
        l.positions[1],
        c,
        w(),
        v
      );
      break;
  }
}
function At() {
  const s = v(c);
  S(
    { x: s.x - h.crosshairsSize, y: s.y },
    { x: s.x + h.crosshairsSize, y: s.y },
    w("bold")
  ), S(
    { x: s.x, y: s.y - h.crosshairsSize },
    { x: s.x, y: s.y + h.crosshairsSize },
    w("bold")
  );
}
function Et() {
  if (h.debug) {
    const s = v({ x: 0, y: 0 });
    S(
      { x: 0, y: s.y },
      { x: innerWidth, y: s.y },
      h.axisColor
    ), S(
      { x: s.x, y: 0 },
      { x: s.x, y: innerHeight },
      h.axisColor
    ), et(
      v(c),
      `(${c.x.toFixed(0)}, ${c.y.toFixed(0)})`
    );
  }
}
window.addEventListener("keydown", (s) => {
  if (A[s.key] = !0, "Digit0" <= s.code && s.code <= "Digit9") {
    const t = parseInt(s.code.slice(5)), e = E[t];
    e === o || (A.Shift ? e.isEmpty() || (m("instantiate #" + t), o.addInstance(e, c, innerHeight / 5 / x.scale)) : (m("drawing #" + t), U(e)));
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
  if (!o.isEmpty())
    switch (s.key) {
      case "Backspace":
        o.delete(c) && (Pt(), m("delete"), o.isEmpty() && P(() => x.reset()));
        break;
      case "l":
        o.fixedDistance(c) && m("fixed distance");
        break;
      case "e":
        o.equalDistance() && m("equal length");
        break;
      case "h":
        o.horizontalOrVertical(c) && m("HorV");
        break;
      case "=":
        o.resizeInstanceAt(c, 1.05) || P(() => {
          x.scale = Math.min(x.scale + 0.1, 10), m("scale=" + x.scale.toFixed(1));
        });
        break;
      case "-":
        o.resizeInstanceAt(c, 0.95) || P(() => {
          x.scale = Math.max(x.scale - 0.1, 0.1), m("scale=" + x.scale.toFixed(1));
        });
        break;
      case "q":
        o.rotateInstanceAt(c, -5 * Math.PI / 180);
        break;
      case "w":
        o.rotateInstanceAt(c, 5 * Math.PI / 180);
        break;
      case "s":
        o.fullSize(c) && m("full size");
        break;
      case "A":
        zt(c);
        break;
      case "c":
        m("re-center"), P(() => {
          x.centerAt(c);
        });
        break;
    }
});
window.addEventListener("keyup", (s) => {
  switch (delete A[s.key], s.key) {
    case "Meta":
      Mt();
      break;
    case "a":
      (l == null ? void 0 : l.type) === "arc" && (l = null);
      break;
  }
});
y.addEventListener("pointerdown", (s) => {
  if (y.setPointerCapture(s.pointerId), s.preventDefault(), s.stopPropagation(), c.down = !0, A.Shift) {
    o.toggleSelections(c);
    return;
  } else if (A.Meta) {
    vt();
    return;
  } else if (A.a) {
    Vt();
    return;
  }
  f = null;
  const t = o.handleAt(c);
  if (t) {
    f = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  o.clearSelection();
  const e = o.thingAt(c);
  e instanceof p ? f = { thing: e, offset: K(c, e) } : e && o.toggleSelected(e);
});
y.addEventListener("pointermove", (s) => {
  s.metaKey || delete A.Meta;
  const t = { x: c.x, y: c.y };
  if ({ x: c.x, y: c.y } = ot({
    x: s.layerX,
    y: s.layerY
  }), c.down && !o.isEmpty() && !l && !f && o.selection.size === 0) {
    const e = c.x - t.x, n = c.y - t.y;
    P(() => {
      x.center.x -= e, x.center.y -= n;
    });
    return;
  }
  if (o.snap(c, f ? f.thing : null), c.down && o.selection.size > 0) {
    const e = K(c, t);
    o.moveSelection(e.x, e.y);
  }
  if (f) {
    const e = c.x - f.offset.x, n = c.y - f.offset.y;
    f.thing.moveBy(e - f.thing.x, n - f.thing.y);
  }
});
y.addEventListener("pointerup", (s) => {
  y.releasePointerCapture(s.pointerId), c.down = !1, (f == null ? void 0 : f.thing) instanceof b && o.mergeAndAddImplicitConstraints(f.thing), f = null;
});
function vt() {
  const s = { x: c.x, y: c.y };
  (l == null ? void 0 : l.type) === "line" && o.addLine(l.start, s), l = {
    type: "line",
    start: s
  };
}
function Mt() {
  l = null;
}
function Vt() {
  if ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [] }), l.positions.push({ x: c.x, y: c.y }), l.positions.length === 3) {
    const [s, t, e] = l.positions;
    o.addArc(t, e, s), l = null;
  }
}
function P(s) {
  const t = v(c);
  s(), { x: c.x, y: c.y } = ot(t);
}
function zt(s) {
  const t = o.handleAt(s);
  t && (o.attachers.includes(t) ? (ht(o, t), m("remove attacher")) : (kt(o, t), m("add attacher")));
}
function ht(s, t) {
  const e = s.attachers.indexOf(t);
  o.attachers.splice(e, 1);
  for (const n of E)
    n.onAttacherRemoved(s, t);
}
function kt(s, t) {
  s.attachers.push(t);
  for (const e of E)
    e.onAttacherAdded(s, t);
}
function Pt() {
  for (; It(); )
    ;
}
function It() {
  const s = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of [...E, ...T.values()])
    for (const n of e.things)
      s.add(n), n.forEachHandle((i) => t.add(i));
  for (const e of E) {
    let n = !1;
    for (const i of e.attachers)
      t.has(i) || (ht(e, i), n = !0);
    if (n)
      return !0;
  }
  for (const e of E)
    e.constraints.forEach((n) => {
      n.isStillValid(s, t) || e.constraints.remove(n);
    });
  return !1;
}
function Ht(s) {
  const t = rt.get(s);
  t && at(o, t);
}
function Ct(s, t = 1) {
  const e = (r) => t * (r === r.toLowerCase() ? 0.75 : 1), n = (r) => e(r) * h.fontScale * (4 + h.kerning * 2);
  let i = x.center.x - 0.5 * [...s].map(n).reduce((r, d) => r + d, 0);
  const a = [];
  for (let r = 0; r < s.length; r++) {
    const d = s[r], V = e(d), I = T.get(d.toUpperCase());
    if (I) {
      const B = o.addInstance(
        I,
        { x: i, y: x.center.y },
        I.size * V
      );
      o.constraints.add(new st(B, V)), a.length > 0 && o.replaceHandle(
        B.attachers[0],
        a.at(-1).attachers[1]
      ), a.push(B);
    }
    i += n(d);
  }
}
window.addLetter = Ht;
window.letterDrawings = T;
window.switchToDrawing = U;
window.write = Ct;
