const b = {
  flicker: !1,
  autoSolve: !1,
  minWorthwhileErrorImprovement: 0.05
};
window.config = b;
function y(i, t) {
  return Math.sqrt(C(i, t));
}
function C(i, t) {
  return Math.pow(i.x - t.x, 2) + Math.pow(i.y - t.y, 2);
}
function T(i, t) {
  return { x: i.x - t.x, y: i.y - t.y };
}
const H = Object.freeze({ x: 0, y: 0 });
function W({ x: i, y: t }, { x: e, y: n }) {
  return { x: i + e, y: t + n };
}
function I(i, t, e) {
  const n = i.x - t.x, s = i.y - t.y, a = e * n, h = e * s;
  return { x: a + t.x, y: h + t.y };
}
function F(i, t, e) {
  const n = i.x - t.x, s = i.y - t.y, a = Math.sin(e), h = Math.cos(e), l = n * h - s * a, $ = n * a + s * h;
  return { x: l + t.x, y: $ + t.y };
}
function U(i) {
  let t = 1 / 0, e = -1 / 0, n = 1 / 0, s = -1 / 0;
  for (const a of i)
    t = Math.min(t, a.x), e = Math.max(e, a.x), n = Math.min(n, a.y), s = Math.max(s, a.y);
  return {
    topLeft: { x: t, y: n },
    bottomRight: { x: e, y: s }
  };
}
function N(i, t, e) {
  return Math.sqrt(et(i, t, e));
}
function et(i, t, e) {
  const n = C(t, e);
  if (n == 0)
    return C(i, t);
  const s = Math.max(0, Math.min(((i.x - t.x) * (e.x - t.x) + (i.y - t.y) * (e.y - t.y)) / n, 1));
  return C(i, { x: t.x + s * (e.x - t.x), y: t.y + s * (e.y - t.y) });
}
let u, f;
function nt(i) {
  if (u = i, f = u.getContext("2d"), u.width = innerWidth, u.height = innerHeight, devicePixelRatio !== 1) {
    const t = u.width, e = u.height;
    u.width = t * devicePixelRatio, u.height = e * devicePixelRatio, u.style.width = t + "px", u.style.height = e + "px", f.scale(devicePixelRatio, devicePixelRatio);
  }
}
let k = "", j = 0;
function x(i) {
  k = i, j = Date.now();
}
function it() {
  if (f.clearRect(0, 0, u.width, u.height), f.lineWidth = 5, f.lineCap = "round", k.length > 0) {
    f.font = "40px Monaco";
    const t = f.measureText(k).width, e = Date.now() - j;
    e > 2e3 ? k = "" : (f.fillStyle = p(e < 500 ? "bold" : "normal"), f.fillText(k, window.innerWidth - t - 40, 40));
  }
}
function G(i) {
  return i;
}
function E(i, t, e = p(), n = G) {
  f.strokeStyle = e, f.beginPath();
  const s = n(i), a = n(t);
  f.moveTo(s.x, s.y), f.lineTo(a.x, a.y), f.stroke();
}
function J(i, t, e, n = p(), s = G) {
  const a = s(t), h = s(e), l = s(i);
  f.beginPath(), f.strokeStyle = n;
  const $ = Math.atan2(a.y - l.y, a.x - l.x), tt = Math.atan2(h.y - l.y, h.x - l.x);
  f.arc(l.x, l.y, y(l, a), $, tt), f.stroke();
}
function p(i = "normal") {
  let t, e;
  return i === "normal" ? (t = 0.35, e = 0.3) : i === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), `rgba(255, 255, 255, ${b.flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
class v {
  constructor(t, e) {
    this.things = t, this.handles = e;
  }
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
class st extends v {
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
class at extends v {
  constructor(t, e) {
    super([], [t, e]), this.distance = y(t, e);
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
    return this.distance - y(this.a, this.b);
  }
}
class X extends v {
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
    return Math.abs(y(this.a1, this.b1) - y(this.a2, this.b2));
  }
}
class O extends v {
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
    return N(this.p, this.a, this.b);
  }
}
class B extends v {
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
    return y(this.p, this.c) - y(this.a, this.c);
  }
}
class K extends v {
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
    return y(
      this.instancePoint,
      W(
        I(
          F(this.masterPoint, H, this.instance.angle),
          H,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
}
class rt extends v {
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
class Y {
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
    const e = t.value, n = this.computeError() - b.minWorthwhileErrorImprovement;
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
const Q = "rgba(255,222,33,1.25)";
class M {
  constructor(t) {
    this.value = t;
  }
}
const ot = 5, q = ot, D = class D {
  constructor({ x: t, y: e }) {
    this.id = D.nextId++, this.xVar = new M(t), this.yVar = new M(e);
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
    return y(t, this) <= q;
  }
  moveBy(t, e) {
    this.xVar.value += t, this.yVar.value += e;
  }
  render(t, e, n = !1) {
    n && E(this, this, Q, e);
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
let w = D;
class V {
  constructor(t, e) {
    this.a = new w(t), this.b = new w(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && N(t, this.a, this.b) <= q;
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    E(this.a, this.b, p(t.has(this) ? "bold" : "normal"), e);
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
class R {
  constructor(t, e, n) {
    this.a = new w(t), this.b = new w(e), this.c = new w(n);
  }
  contains(t) {
    return Math.abs(y(t, this.c) - y(this.a, this.c)) <= q;
  }
  moveBy(t, e) {
    this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e) {
    J(
      this.c,
      this.a,
      this.b,
      p(t.has(this) ? "bold" : "normal"),
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
const L = class L {
  constructor(t, e, n, s, a) {
    this.master = t, this.transform = (h) => W(I(F(h, H, this.angle), H, this.scale), this), this.id = L.nextId++, this.attachers = [], this.xVar = new M(e), this.yVar = new M(n), this.angleAndSizeVecX = new M(s), this.angleAndSizeVecY = new M(0), this.addAttachers(t, a);
  }
  addAttachers(t, e) {
    for (const n of t.attachers)
      this.addAttacher(n, e);
  }
  addAttacher(t, e) {
    const n = new w(this.transform(t));
    this.attachers.push(n), e.constraints.add(new K(n, this, t));
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
    ].map(this.transform), { topLeft: a, bottomRight: h } = U(s);
    return a.x <= t.x && t.x <= h.x && a.y <= t.y && t.y <= h.y;
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((n) => n.moveBy(t, e));
  }
  render(t, e, n = 0) {
    this.master.render((s) => e(this.transform(s)), n + 1), n === 1 && this.attachers.forEach((s, a) => {
      E(
        e(this.transform(this.master.attachers[a])),
        e(s),
        Q
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
L.nextId = 0;
let m = L;
class ht {
  constructor() {
    this.things = [], this.attachers = [], this.constraints = new Y(), this.selection = /* @__PURE__ */ new Set();
  }
  isEmpty() {
    return this.things.length === 0;
  }
  relax() {
    return this.constraints.relax(this.getVars());
  }
  render(t, e = 0) {
    this.things.forEach((n) => {
      n instanceof m ? n.render(this.selection, t, e + 1) : n.render(this.selection, t), n.forEachHandle((s) => s.render(this.selection, t));
    }), e === 0 && this.attachers.forEach((n) => n.render(this.selection, t, !0));
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
      const { x: a, y: h } = I(s, n, e);
      s.x = a, s.y = h;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const n = this.thingAt(t);
    if (!(n instanceof m))
      return !1;
    n.angle += e;
    for (const s of n.attachers) {
      const { x: a, y: h } = F(s, n, e);
      s.x = a, s.y = h;
    }
    return !0;
  }
  addLine(t, e) {
    const n = new V(t, e);
    this.mergeAndAddImplicitConstraints(n.a), this.mergeAndAddImplicitConstraints(n.b);
    for (const s of this.things)
      s.forEachHandle((a) => {
        a !== n.a && a !== n.b && n.contains(a) && this.constraints.add(new O(a, n.a, n.b));
      });
    this.things.push(n);
  }
  addArc(t, e, n) {
    const s = new R(t, e, n);
    this.mergeAndAddImplicitConstraints(s.c), this.mergeAndAddImplicitConstraints(s.a), this.mergeAndAddImplicitConstraints(s.b), this.constraints.add(new X(s.a, s.c, s.b, s.c));
    for (const a of this.things)
      a.forEachHandle((h) => {
        h !== s.a && h !== s.b && h !== s.c && s.contains(h) && this.constraints.add(new B(h, s.a, s.b, s.c));
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
      e.has(n) || !n.contains(t) || (n instanceof V ? this.constraints.add(new O(t, n.a, n.b)) : n instanceof R && this.constraints.add(new B(t, n.a, n.b, n.c)));
  }
  replaceHandle(t, e) {
    this.things.forEach((n) => n.replaceHandle(t, e)), this.constraints.replaceHandle(t, e);
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
      n instanceof V && this.constraints.add(new at(n.a, n.b));
    return this.selection.clear(), !0;
  }
  equalDistance() {
    let t = null;
    for (const e of this.selection)
      e instanceof V && (t && this.constraints.add(new X(t.a, t.b, e.a, e.b)), t = e);
    this.selection.clear();
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    for (const n of e)
      n instanceof V && this.constraints.add(new st(n.a, n.b));
    return this.selection.clear(), !0;
  }
  fullSize(t) {
    const e = this.thingsForOperation(t);
    for (const n of e)
      if (n instanceof m)
        return this.constraints.add(new rt(n)), !0;
    return !1;
  }
  snap(t, e) {
    const n = this.handleAt(t, e);
    if (n) {
      t.x = n.x, t.y = n.y;
      return;
    }
    const s = new Y(), a = new w(t), h = /* @__PURE__ */ new Set();
    a.forEachVar((l) => h.add(l));
    for (const l of this.things)
      this.selection.has(l) || !l.contains(t) || (l instanceof V ? s.add(new O(a, l.a, l.b)) : l instanceof R && s.add(new B(a, l.a, l.b, l.c)));
    for (; s.relax(h); )
      ;
    t.x = a.x, t.y = a.y;
  }
  handleAt(t, e = null) {
    let n = 1 / 0, s = null;
    for (const a of this.things)
      a.forEachHandle((h) => {
        if (h !== e && h.contains(t)) {
          const l = y(t, h);
          l < n && (s = h, n = l);
        }
      });
    return s;
  }
  thingAt(t) {
    for (const e of this.things)
      if (e.contains(t))
        return e;
    return null;
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
    return U(this.getPositions());
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
      if (n instanceof K && n.masterPoint === e) {
        const { instance: s, instancePoint: a } = n;
        s.attachers = s.attachers.filter((h) => h !== a), this.constraints.remove(n);
      }
    });
  }
}
nt(document.getElementById("canvas"));
const r = { x: 1 / 0, y: 1 / 0, down: !1 }, A = {};
let c = null, g = null;
const d = {
  center: { x: 0, y: 0 },
  scale: 1,
  reset() {
    this.center = { x: -window.innerWidth / 2, y: -window.innerHeight / 2 }, this.scale = 1;
  }
};
d.reset();
function z(i) {
  return T(I(i, H, d.scale), d.center);
}
function Z(i) {
  return I(W(i, d.center), H, 1 / d.scale);
}
const S = [];
for (let i = 0; i < 10; i++)
  S.push(new ht());
let o = S[1];
function ct(i) {
  P(() => {
    o.leave(), d.reset(), o = i, window.drawing = i;
  });
}
function _() {
  A[" "] && (x("solve"), o.relax()), lt(), requestAnimationFrame(_);
}
_();
function lt() {
  if (b.autoSolve) {
    const e = performance.now();
    for (; performance.now() - e < 20 && o.relax(); )
      ;
  }
  switch (it(), !c && o.isEmpty() ? dt() : o.render(z), c == null ? void 0 : c.type) {
    case "line":
      E(c.start, r, p(), z);
      break;
    case "arc":
      c.positions.length > 1 && J(
        c.positions[0],
        c.positions[1],
        r,
        p(),
        z
      );
      break;
  }
  const i = 15, t = z(r);
  E(
    { x: t.x - i, y: t.y },
    { x: t.x + i, y: t.y },
    p("bold")
  ), E(
    { x: t.x, y: t.y - i },
    { x: t.x, y: t.y + i },
    p("bold")
  );
}
function dt() {
  const i = window.innerWidth / 100;
  t(-7 * i, 4 * i, -7 * i, -4 * i), t(-3 * i, 4 * i, -3 * i, -4 * i), t(-3 * i, -4 * i, 2 * i, 4 * i), t(2 * i, 4 * i, 2 * i, -4 * i), t(6 * i, 4 * i, 6 * i, -4 * i), t(6 * i, -1 * i, 10 * i, -4 * i), t(8 * i, -2 * i, 10 * i, 4 * i);
  function t(e, n, s, a) {
    E({ x: e, y: n }, { x: s, y: a }, p(), z);
  }
}
window.addEventListener("keydown", (i) => {
  if (A[i.key] = !0, "Digit0" <= i.code && i.code <= "Digit9") {
    const t = parseInt(i.code.slice(5)), e = S[t];
    A.Shift ? e.isEmpty() || (x("instantiate #" + t), o.addInstance(e, r, window.innerHeight / 5 / d.scale)) : (x("drawing #" + t), ct(e));
    return;
  }
  switch (i.key) {
    case "Backspace":
      o.delete(r) && (yt(), x("delete"));
      break;
    case "l":
      o.fixedDistance(r) && x("fixed distance");
      break;
    case "e":
      x("equal length"), o.equalDistance();
      break;
    case "h":
      o.horizontalOrVertical(r) && x("HorV");
      break;
    case "=":
      o.resizeInstanceAt(r, 1.05) || o.isEmpty() || P(() => {
        d.scale = Math.min(d.scale + 0.1, 10), x("scale=" + d.scale.toFixed(1));
      });
      break;
    case "-":
      o.resizeInstanceAt(r, 0.95) || o.isEmpty() || P(() => {
        d.scale = Math.max(d.scale - 0.1, 0.1), x("scale=" + d.scale.toFixed(1));
      });
      break;
    case "c":
      x("re-center"), P(() => {
        d.center.x = r.x - window.innerWidth / 2, d.center.y = r.y - window.innerHeight / 2;
      });
      break;
    case "q":
      o.rotateInstanceAt(r, -5 * Math.PI / 180);
      break;
    case "w":
      o.rotateInstanceAt(r, 5 * Math.PI / 180);
      break;
    case "f":
      b.flicker = !b.flicker;
      break;
    case "S":
      b.autoSolve = !b.autoSolve, x(`auto-solve ${b.autoSolve ? "on" : "off"}`);
      break;
    case "s":
      o.fullSize(r) && x("full size");
      break;
    case "A":
      xt(r) && x("toggle attacher");
      break;
  }
});
window.addEventListener("keyup", (i) => {
  delete A[i.key], i.key === "Meta" ? ut() : i.key === "a" ? (c == null ? void 0 : c.type) === "arc" && (c = null) : i.key === " " && x("");
});
u.addEventListener("pointerdown", (i) => {
  if (u.setPointerCapture(i.pointerId), i.preventDefault(), i.stopPropagation(), r.down = !0, A.Shift) {
    o.toggleSelections(r);
    return;
  } else if (A.Meta) {
    ft();
    return;
  } else if (A.a) {
    gt();
    return;
  }
  g = null;
  const t = o.handleAt(r);
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  o.clearSelection();
  const e = o.thingAt(r);
  e && (e instanceof m ? g = { thing: e, offset: T(r, e) } : o.toggleSelected(e));
});
u.addEventListener("pointermove", (i) => {
  const t = { x: r.x, y: r.y };
  if ({ x: r.x, y: r.y } = Z({
    x: i.layerX,
    y: i.layerY
  }), r.down && !o.isEmpty() && !c && !g && o.selection.size === 0) {
    const e = r.x - t.x, n = r.y - t.y;
    P(() => {
      d.center.x -= e * d.scale, d.center.y -= n * d.scale;
    });
    return;
  }
  if (o.snap(r, g ? g.thing : null), r.down && o.selection.size > 0) {
    const e = T(r, t);
    o.moveSelection(e.x, e.y);
  }
  if (g) {
    const e = r.x - g.offset.x, n = r.y - g.offset.y;
    g.thing.moveBy(e - g.thing.x, n - g.thing.y);
  }
});
u.addEventListener("pointerup", (i) => {
  u.releasePointerCapture(i.pointerId), r.down = !1, (g == null ? void 0 : g.thing) instanceof w && o.mergeAndAddImplicitConstraints(g.thing), g = null;
});
function ft() {
  const i = { x: r.x, y: r.y };
  (c == null ? void 0 : c.type) === "line" && o.addLine(c.start, i), c = {
    type: "line",
    start: i
  };
}
function ut() {
  c = null;
}
function gt() {
  if ((c == null ? void 0 : c.type) !== "arc" && (c = { type: "arc", positions: [] }), c.positions.push({ x: r.x, y: r.y }), c.positions.length === 3) {
    const [i, t, e] = c.positions;
    o.addArc(t, e, i), c = null;
  }
}
function P(i) {
  const t = z(r);
  i(), { x: r.x, y: r.y } = Z(t);
}
function xt(i) {
  const t = o.handleAt(i);
  if (!t)
    return !1;
  const e = o.attachers.indexOf(t);
  if (e >= 0) {
    o.attachers.splice(e, 1);
    for (const n of S)
      n.onAttacherRemoved(o, t);
  } else {
    o.attachers.push(t);
    for (const n of S)
      n.onAttacherAdded(o, t);
  }
  return !0;
}
function yt() {
  const i = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of S)
    for (const n of e.things)
      i.add(n), n.forEachHandle((s) => t.add(s));
  for (const e of S)
    e.constraints.forEach((n) => {
      n.isStillValid(i, t) || e.constraints.remove(n);
    });
}
