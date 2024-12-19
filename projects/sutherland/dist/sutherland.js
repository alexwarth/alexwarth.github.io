const f = {
  debug: !1,
  flicker: !1,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05,
  masterSideAttacherColor: "rgb(1,101,252)",
  instanceSideAttacherColor: "rgb(255,222,33)",
  axisColor: "rgba(255,222,33,0.125)",
  handleRadius: 5,
  closeEnough: 5
};
window.config = f;
function p(i, t) {
  return Math.sqrt(P(i, t));
}
function P(i, t) {
  return Math.pow(i.x - t.x, 2) + Math.pow(i.y - t.y, 2);
}
function Y(i, t) {
  return { x: i.x - t.x, y: i.y - t.y };
}
const H = Object.freeze({ x: 0, y: 0 });
function U({ x: i, y: t }, { x: e, y: n }) {
  return { x: i + e, y: t + n };
}
function O(i, t, e) {
  const n = i.x - t.x, s = i.y - t.y, a = e * n, c = e * s;
  return { x: a + t.x, y: c + t.y };
}
function W(i, t, e) {
  const n = i.x - t.x, s = i.y - t.y, a = Math.sin(e), c = Math.cos(e), l = n * c - s * a, T = n * a + s * c;
  return { x: l + t.x, y: T + t.y };
}
function j(i) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, s = -1 / 0;
  for (const a of i)
    t = Math.min(t, a.x), e = Math.max(e, a.x), n = Math.min(n, a.y), s = Math.max(s, a.y);
  return {
    topLeft: { x: t, y: n },
    bottomRight: { x: e, y: s }
  };
}
function Q(i, t, e) {
  return Math.sqrt(nt(i, t, e));
}
function nt(i, t, e) {
  const n = P(t, e);
  if (n == 0)
    return P(i, t);
  const s = Math.max(0, Math.min(((i.x - t.x) * (e.x - t.x) + (i.y - t.y) * (e.y - t.y)) / n, 1));
  return P(i, { x: t.x + s * (e.x - t.x), y: t.y + s * (e.y - t.y) });
}
function it(i) {
  return 1 - Math.pow(1 - i, 5);
}
const R = 4e3;
let g, u;
function st(i) {
  if (g = i, u = g.getContext("2d"), g.width = innerWidth, g.height = innerHeight, devicePixelRatio !== 1) {
    const t = g.width, e = g.height;
    g.width = t * devicePixelRatio, g.height = e * devicePixelRatio, g.style.width = t + "px", g.style.height = e + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
let I = "", G = 0;
function y(i) {
  I = i, G = Date.now();
}
function at() {
  if (u.clearRect(0, 0, g.width, g.height), u.lineWidth = 5, u.lineCap = "round", I.length > 0) {
    u.font = "40px Monaco";
    const t = u.measureText(I).width, e = Date.now() - G;
    if (e > R)
      I = "";
    else {
      const n = 1 - it(e / R);
      u.fillStyle = `rgba(255,222,33,${n})`, u.fillText(
        I,
        (innerWidth - t) / 2,
        innerHeight - 40
      );
    }
  }
}
function F(i) {
  return i;
}
function A(i, t, e = b(), n = F) {
  u.strokeStyle = e, u.beginPath();
  const s = n(i), a = n(t);
  u.moveTo(s.x, s.y), u.lineTo(a.x, a.y), u.stroke();
}
function J(i, t, e, n = b(), s = F) {
  const a = s(t), c = s(e), l = s(i);
  u.beginPath(), u.strokeStyle = n;
  const T = Math.atan2(a.y - l.y, a.x - l.x), et = Math.atan2(c.y - l.y, c.x - l.x);
  u.arc(l.x, l.y, p(l, a), T, et), u.stroke();
}
function K(i, t, e = b(), n = F) {
  u.fillStyle = e;
  const s = 12;
  u.font = `${s}px Major Mono Display`;
  const a = u.measureText(t).width, { x: c, y: l } = n(i);
  u.fillText(t, c - a / 2, l + s / 2);
}
function b(i = "normal") {
  let t, e;
  return i === "normal" ? (t = 0.35, e = 0.3) : i === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), `rgba(255, 255, 255, ${f.flicker ? Math.random() * e + t : 0.75 * e + t})`;
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
      this.handles[n], this.handles.forEach((s, a) => {
        s === t && (this.handles[a] = e);
      });
  }
}
class rt extends M {
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
    return Math.min(Math.abs(this.a.x - this.b.x), Math.abs(this.a.y - this.b.y));
  }
}
class ot extends M {
  constructor(t, e) {
    super([], [t, e]), this.distance = p(t, e);
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
class q extends M {
  constructor(t, e, n, s) {
    super([], [t, e, n, s]);
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
class D extends M {
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
class L extends M {
  constructor(t, e, n, s) {
    super([], [t, e, n, s]);
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
class N extends M {
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
    return p(
      this.instancePoint,
      U(
        O(
          W(this.masterPoint, H, this.instance.angle),
          H,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class ct extends M {
  constructor(t) {
    super([t], []), this.instance = t;
  }
  get signature() {
    return `FS(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.instance.master.size;
  }
}
class X {
  constructor() {
    this.constraints = [];
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((n) => n.signature === e) || this.constraints.push(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter((e) => e !== t);
  }
  replaceHandle(t, e) {
    const n = this.constraints;
    this.constraints = [], n.forEach((s) => {
      s.replaceHandle(t, e), this.add(s);
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
    const e = t.value, n = this.computeError() - f.minWorthwhileErrorImprovement;
    t.value = e + 1;
    const s = this.computeError();
    t.value = e - 1;
    const a = this.computeError();
    return s < Math.min(n, a) ? (t.value = e + 1, !0) : a < Math.min(n, s) ? (t.value = e - 1, !0) : (t.value = e, !1);
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
    return p(t, this) <= f.closeEnough;
  }
  distanceTo(t) {
    return p(this, t);
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, n = f.instanceSideAttacherColor) {
    f.debug && K(e(this), `(${this.x},${this.y})`), A(this, this, n, e);
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
  constructor(t, e) {
    this.a = new w(t), this.b = new w(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= f.closeEnough;
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
      b(t.has(this) ? "bold" : "normal"),
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
class B {
  constructor(t, e, n) {
    this.a = new w(t), this.b = new w(e), this.c = new w(n);
  }
  contains(t) {
    return this.distanceTo(t) <= f.closeEnough;
  }
  distanceTo(t) {
    return Math.abs(p(t, this.c) - p(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    J(
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
const $ = class $ {
  constructor(t, e, n, s, a) {
    this.master = t, this.transform = (c) => U(
      O(W(c, H, this.angle), H, this.scale),
      this
    ), this.id = $.nextId++, this.attachers = [], this.xVar = new z(e), this.yVar = new z(n), this.angleAndSizeVecX = new z(s), this.angleAndSizeVecY = new z(0), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new w(this.transform(t));
    this.attachers.push(n), e.constraints.add(
      new N(n, this, t)
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
    const { topLeft: e, bottomRight: n } = this.master.boundingBox(), s = [
      e,
      n,
      { x: e.x, y: n.y },
      { x: n.x, y: e.y }
    ].map(this.transform), { topLeft: a, bottomRight: c } = j(s);
    return a.x <= t.x && t.x <= c.x && a.y <= t.y && t.y <= c.y;
  }
  distanceTo(t) {
    return p(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((s) => e(this.transform(s)), n + 1), n === 1 && this.attachers.forEach((s, a) => {
      A(
        e(this.transform(this.master.attachers[a])),
        e(s),
        f.instanceSideAttacherColor
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
let m = $;
class ht {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new X(), this.selection = /* @__PURE__ */ new Set();
  }
  isEmpty() {
    return this.things.length === 0;
  }
  relax() {
    return this.constraints.relax(this.getVars());
  }
  render(t, e = 0) {
    this.things.forEach((n) => {
      n instanceof m ? n.render(this.selection, t, e + 1) : n.render(this.selection, t);
    }), e === 0 && this.attachers.forEach(
      (n) => n.render(this.selection, t, f.masterSideAttacherColor)
    );
  }
  addInstance(t, { x: e, y: n }, s) {
    t !== this && this.things.push(new m(t, e, n, s, this));
  }
  resizeInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof m))
      return !1;
    n.scale *= e;
    for (const s of n.attachers) {
      const { x: a, y: c } = O(s, n, e);
      s.x = a, s.y = c;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof m))
      return !1;
    n.angle += e;
    for (const s of n.attachers) {
      const { x: a, y: c } = W(s, n, e);
      s.x = a, s.y = c;
    }
    return !0;
  }
  addLine(t, e) {
    const n = new V(t, e);
    this.mergeAndAddImplicitConstraints(n.a), this.mergeAndAddImplicitConstraints(n.b);
    for (const s of this.things)
      s.forEachHandle((a) => {
        a !== n.a && a !== n.b && n.contains(a) && this.constraints.add(new D(a, n.a, n.b));
      });
    this.things.push(n);
  }
  addArc(t, e, n) {
    const s = new B(t, e, n);
    this.mergeAndAddImplicitConstraints(s.c), this.mergeAndAddImplicitConstraints(s.a), this.mergeAndAddImplicitConstraints(s.b), this.constraints.add(
      new q(s.a, s.c, s.b, s.c)
    );
    for (const a of this.things)
      a.forEachHandle((c) => {
        c !== s.a && c !== s.b && c !== s.c && s.contains(c) && this.constraints.add(
          new L(c, s.a, s.b, s.c)
        );
      });
    this.things.push(s);
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.things)
      n.forEachHandle((s) => {
        s !== t && s.contains(t) && (this.replaceHandle(s, t), e.add(n));
      });
    for (const n of this.things)
      e.has(n) || !n.contains(t) || (n instanceof V ? this.constraints.add(
        new D(t, n.a, n.b)
      ) : n instanceof B && this.constraints.add(
        new L(t, n.a, n.b, n.c)
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
    for (const n of e)
      n instanceof V && this.constraints.add(new ot(n.a, n.b));
    return this.selection.clear(), !0;
  }
  equalDistance() {
    let t = null;
    for (const e of this.selection)
      e instanceof V && (t && this.constraints.add(
        new q(t.a, t.b, e.a, e.b)
      ), t = e);
    this.selection.clear();
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    for (const n of e)
      n instanceof V && this.constraints.add(
        new rt(n.a, n.b)
      );
    return this.selection.clear(), !0;
  }
  fullSize(t) {
    const e = this.thingsForOperation(t);
    for (const n of e)
      if (n instanceof m)
        return this.constraints.add(new ct(n)), !0;
    return !1;
  }
  snap(t, e) {
    const n = this.handleAt(t, e);
    if (n) {
      t.x = n.x, t.y = n.y;
      return;
    }
    const s = new X(), a = new w(t), c = /* @__PURE__ */ new Set();
    a.forEachVar((l) => c.add(l));
    for (const l of this.things)
      this.selection.has(l) || !l.contains(t) || (l instanceof V ? s.add(
        new D(a, l.a, l.b)
      ) : l instanceof B && s.add(
        new L(a, l.a, l.b, l.c)
      ));
    for (; s.relax(c); )
      ;
    t.x = a.x, t.y = a.y;
  }
  handleAt(t, e = null) {
    let n = 1 / 0, s = null;
    for (const a of this.things)
      a.forEachHandle((c) => {
        if (c !== e && c.contains(t)) {
          const l = p(t, c);
          l < n && (s = c, n = l);
        }
      });
    return s;
  }
  thingAt(t) {
    let e = 1 / 0, n = null;
    for (const s of this.things)
      if (s.contains(t)) {
        const a = s.distanceTo(t);
        a < e && (n = s, e = a);
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
    const { topLeft: t, bottomRight: e } = this.boundingBox(), n = -(t.x + e.x) / 2, s = -(t.y + e.y) / 2;
    for (const a of this.getPositions())
      a.x += n, a.y += s;
  }
  boundingBox() {
    return j(this.getPositions());
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
      n.forEachHandle((s) => e.add(s));
    return e;
  }
  getHandle(t) {
    let e, n = 0;
    for (const s of this.things)
      s.forEachHandle((a) => {
        n++ === t && (e = a);
      });
    return e;
  }
  getPositions() {
    const t = this.getHandles(this.things);
    for (const e of this.things)
      e instanceof m && t.add(e);
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
      n instanceof m && n.master === t && n.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((n) => {
      if (n instanceof N && n.masterPoint === e) {
        const { instance: s, instancePoint: a } = n;
        s.attachers = s.attachers.filter(
          (c) => c !== a
        ), this.constraints.remove(n);
      }
    });
  }
}
st(document.getElementById("canvas"));
const r = {
  x: 1 / 0,
  y: 1 / 0,
  down: !1
}, v = {};
let h = null, x = null;
const d = {
  center: { x: 0, y: 0 },
  scale: 1,
  reset() {
    this.scale = 1, this.centerAt({ x: 0, y: 0 });
  },
  centerAt({ x: i, y: t }) {
    this.center.x = i, this.center.y = t;
  },
  setScale(i) {
    this.scale = i;
  }
};
d.reset();
function E({ x: i, y: t }) {
  return {
    x: (i - d.center.x) * d.scale + innerWidth / 2,
    y: -(t - d.center.y) * d.scale + innerHeight / 2
  };
}
function Z({ x: i, y: t }) {
  return {
    x: (i - innerWidth / 2) / d.scale + d.center.x,
    y: d.center.y - (t - innerHeight / 2) / d.scale
  };
}
const S = [];
for (let i = 0; i < 10; i++)
  S.push(new ht());
let o = S[1];
function lt(i) {
  k(() => {
    o.leave(), d.reset(), o = i, window.drawing = i;
  });
}
function _() {
  v[" "] && (y("solve"), o.relax()), dt(), requestAnimationFrame(_);
}
_();
function dt() {
  if (f.autoSolve) {
    const e = performance.now();
    for (; performance.now() - e < 20 && o.relax(); )
      ;
  }
  switch (at(), !h && o.isEmpty() ? ft() : o.render(E), h == null ? void 0 : h.type) {
    case "line":
      A(
        h.start,
        r,
        b(),
        E
      );
      break;
    case "arc":
      h.positions.length > 1 && J(
        h.positions[0],
        h.positions[1],
        r,
        b(),
        E
      );
      break;
  }
  const i = 15, t = E(r);
  if (A(
    { x: t.x - i, y: t.y },
    { x: t.x + i, y: t.y },
    b("bold")
  ), A(
    { x: t.x, y: t.y - i },
    { x: t.x, y: t.y + i },
    b("bold")
  ), f.debug) {
    const e = E({ x: 0, y: 0 });
    A(
      { x: 0, y: e.y },
      { x: innerWidth, y: e.y },
      f.axisColor
    ), A(
      { x: e.x, y: 0 },
      { x: e.x, y: innerHeight },
      f.axisColor
    ), K(
      E(r),
      `(${r.x.toFixed(0)}, ${r.y.toFixed(0)})`
    );
  }
}
function ft() {
  const i = innerWidth / 100, t = (e, n) => A(e, n, b(), E);
  t({ x: -7 * i, y: -4 * i }, { x: -7 * i, y: 4 * i }), t({ x: -3 * i, y: -4 * i }, { x: -3 * i, y: 4 * i }), t({ x: -3 * i, y: 4 * i }, { x: 2 * i, y: -4 * i }), t({ x: 2 * i, y: -4 * i }, { x: 2 * i, y: 4 * i }), t({ x: 6 * i, y: -4 * i }, { x: 6 * i, y: 4 * i }), t({ x: 6 * i, y: 1 * i }, { x: 10 * i, y: 4 * i }), t({ x: 8 * i, y: 2 * i }, { x: 10 * i, y: -4 * i });
}
window.addEventListener("keydown", (i) => {
  if (v[i.key] = !0, "Digit0" <= i.code && i.code <= "Digit9") {
    const t = parseInt(i.code.slice(5)), e = S[t];
    v.Shift ? e.isEmpty() || (y("instantiate #" + t), o.addInstance(e, r, innerHeight / 5 / d.scale)) : (y("drawing #" + t), lt(e));
    return;
  }
  switch (i.key) {
    case "Backspace":
      o.delete(r) && (mt(), y("delete"), o.isEmpty() && k(() => d.reset()));
      break;
    case "l":
      o.fixedDistance(r) && y("fixed distance");
      break;
    case "e":
      y("equal length"), o.equalDistance();
      break;
    case "h":
      o.horizontalOrVertical(r) && y("HorV");
      break;
    case "=":
      o.resizeInstanceAt(r, 1.05) || o.isEmpty() || k(() => {
        d.scale = Math.min(d.scale + 0.1, 10), y("scale=" + d.scale.toFixed(1));
      });
      break;
    case "-":
      o.resizeInstanceAt(r, 0.95) || o.isEmpty() || k(() => {
        d.scale = Math.max(d.scale - 0.1, 0.1), y("scale=" + d.scale.toFixed(1));
      });
      break;
    case "q":
      o.rotateInstanceAt(r, -5 * Math.PI / 180);
      break;
    case "w":
      o.rotateInstanceAt(r, 5 * Math.PI / 180);
      break;
    case "f":
      f.flicker = !f.flicker;
      break;
    case "S":
      f.autoSolve = !f.autoSolve, y(`auto-solve ${f.autoSolve ? "on" : "off"}`);
      break;
    case "s":
      o.fullSize(r) && y("full size");
      break;
    case "A":
      yt(r);
      break;
    case "c":
      o.isEmpty() || (y("re-center"), k(() => {
        d.centerAt(r);
      }));
      break;
    case "d":
      f.debug = !f.debug, y(`debug ${f.debug ? "on" : "off"}`);
      break;
  }
});
window.addEventListener("keyup", (i) => {
  delete v[i.key], i.key === "Meta" ? gt() : i.key === "a" ? (h == null ? void 0 : h.type) === "arc" && (h = null) : i.key === " " && y("");
});
g.addEventListener("pointerdown", (i) => {
  if (g.setPointerCapture(i.pointerId), i.preventDefault(), i.stopPropagation(), r.down = !0, v.Shift) {
    o.toggleSelections(r);
    return;
  } else if (v.Meta) {
    ut();
    return;
  } else if (v.a) {
    xt();
    return;
  }
  x = null;
  const t = o.handleAt(r);
  if (t) {
    x = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  o.clearSelection();
  const e = o.thingAt(r);
  e && (e instanceof m ? x = { thing: e, offset: Y(r, e) } : o.toggleSelected(e));
});
g.addEventListener("pointermove", (i) => {
  const t = { x: r.x, y: r.y };
  if ({ x: r.x, y: r.y } = Z({
    x: i.layerX,
    y: i.layerY
  }), r.down && !o.isEmpty() && !h && !x && o.selection.size === 0) {
    const e = r.x - t.x, n = r.y - t.y;
    k(() => {
      d.center.x -= e * d.scale, d.center.y -= n * d.scale;
    });
    return;
  }
  if (o.snap(r, x ? x.thing : null), r.down && o.selection.size > 0) {
    const e = Y(r, t);
    o.moveSelection(e.x, e.y);
  }
  if (x) {
    const e = r.x - x.offset.x, n = r.y - x.offset.y;
    x.thing.moveBy(e - x.thing.x, n - x.thing.y);
  }
});
g.addEventListener("pointerup", (i) => {
  g.releasePointerCapture(i.pointerId), r.down = !1, (x == null ? void 0 : x.thing) instanceof w && o.mergeAndAddImplicitConstraints(x.thing), x = null;
});
function ut() {
  const i = { x: r.x, y: r.y };
  (h == null ? void 0 : h.type) === "line" && o.addLine(h.start, i), h = {
    type: "line",
    start: i
  };
}
function gt() {
  h = null;
}
function xt() {
  if ((h == null ? void 0 : h.type) !== "arc" && (h = { type: "arc", positions: [] }), h.positions.push({ x: r.x, y: r.y }), h.positions.length === 3) {
    const [i, t, e] = h.positions;
    o.addArc(t, e, i), h = null;
  }
}
function k(i) {
  const t = E(r);
  i(), { x: r.x, y: r.y } = Z(t);
}
function yt(i) {
  const t = o.handleAt(i);
  t && (o.attachers.includes(t) ? (tt(o, t), y("remove attacher")) : (pt(o, t), y("add attacher")));
}
function tt(i, t) {
  const e = i.attachers.indexOf(t);
  o.attachers.splice(e, 1);
  for (const n of S)
    n.onAttacherRemoved(i, t);
}
function pt(i, t) {
  i.attachers.push(t);
  for (const e of S)
    e.onAttacherAdded(i, t);
}
function mt() {
  for (; bt(); )
    ;
}
function bt() {
  const i = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of S)
    for (const n of e.things)
      i.add(n), n.forEachHandle((s) => t.add(s));
  for (const e of S) {
    let n = !1;
    for (const s of e.attachers)
      t.has(s) || (tt(e, s), n = !0);
    if (n)
      return !0;
  }
  for (const e of S)
    e.constraints.forEach((n) => {
      n.isStillValid(i, t) || e.constraints.remove(n);
    });
  return !1;
}
