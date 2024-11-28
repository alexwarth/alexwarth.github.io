function x(n, t) {
  return Math.sqrt(H(n, t));
}
function H(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function O(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const I = Object.freeze({ x: 0, y: 0 });
function Y({ x: n, y: t }, { x: e, y: s }) {
  return { x: n + e, y: t + s };
}
function W(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = e * s, o = e * i;
  return { x: a + t.x, y: o + t.y };
}
function Z(n, t, e) {
  const s = n.x - t.x, i = n.y - t.y, a = Math.sin(e), o = Math.cos(e), l = s * o - i * a, L = s * a + i * o;
  return { x: l + t.x, y: L + t.y };
}
function B(n) {
  let t = 1 / 0, e = -1 / 0, s = 1 / 0, i = -1 / 0;
  for (const a of n)
    t = Math.min(t, a.x), e = Math.max(e, a.x), s = Math.min(s, a.y), i = Math.max(i, a.y);
  return {
    topLeft: { x: t, y: s },
    bottomRight: { x: e, y: i }
  };
}
function j(n, t, e) {
  return Math.sqrt(_(n, t, e));
}
function _(n, t, e) {
  const s = H(t, e);
  if (s == 0)
    return H(n, t);
  const i = Math.max(0, Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / s, 1));
  return H(n, { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) });
}
let u, d;
function tt(n) {
  if (u = n, d = u.getContext("2d"), u.width = innerWidth, u.height = innerHeight, devicePixelRatio !== 1) {
    const t = u.width, e = u.height;
    u.width = t * devicePixelRatio, u.height = e * devicePixelRatio, u.style.width = t + "px", u.style.height = e + "px", d.scale(devicePixelRatio, devicePixelRatio);
  }
}
let E = "", N = 0;
function y(n) {
  E = n, N = Date.now();
}
function et() {
  if (d.clearRect(0, 0, u.width, u.height), d.lineWidth = 5, d.lineCap = "round", E.length > 0) {
    d.font = "40px Monaco";
    const t = d.measureText(E).width, e = Date.now() - N;
    e > 2e3 ? E = "" : (d.fillStyle = p(e < 500 ? "bold" : "normal"), d.fillText(E, window.innerWidth - t - 40, 40));
  }
}
function U(n) {
  return n;
}
function z(n, t, e = p(), s = U) {
  d.strokeStyle = e, d.beginPath();
  const i = s(n), a = s(t);
  d.moveTo(i.x, i.y), d.lineTo(a.x, a.y), d.stroke();
}
function G(n, t, e, s = p(), i = U) {
  const a = i(t), o = i(e), l = i(n);
  d.beginPath(), d.strokeStyle = s;
  const L = Math.atan2(a.y - l.y, a.x - l.x), Q = Math.atan2(o.y - l.y, o.x - l.x);
  d.arc(l.x, l.y, x(l, a), L, Q), d.stroke();
}
function p(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), `rgba(255, 255, 255, ${Math.random() * e + t})`;
}
class v {
  constructor(t) {
    this.handles = t;
  }
  replaceHandles(t) {
    for (let e = 0; e < this.handles.length; e++) {
      const s = this.handles[e];
      if (!t.has(s))
        continue;
      const i = t.get(this.handles[e]);
      if (i == null)
        return !1;
      this.handles[e] = i;
    }
    return !0;
  }
}
class nt extends v {
  constructor(t, e) {
    super([t, e]);
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
class st extends v {
  constructor(t, e) {
    super([t, e]), this.distance = x(t, e);
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
    return this.distance - x(this.a, this.b);
  }
}
class q extends v {
  constructor(t, e, s, i) {
    super([t, e, s, i]);
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
    return Math.abs(x(this.a1, this.b1) - x(this.a2, this.b2));
  }
}
class D extends v {
  constructor(t, e, s) {
    super([t, e, s]);
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
    return j(this.p, this.a, this.b);
  }
}
class $ extends v {
  constructor(t, e, s, i) {
    super([t, e, s, i]);
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
    return x(this.p, this.c) - x(this.a, this.c);
  }
}
class F {
  constructor() {
    this.constraints = [];
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((s) => s.signature === e) || this.constraints.push(t);
  }
  relax(t) {
    let e = !1;
    for (const s of t)
      e = this.relaxWithVar(s) || e;
    return e;
  }
  relaxWithVar(t) {
    const e = t.value, s = this.computeError() - 0.5;
    t.value = e + 1;
    const i = this.computeError();
    t.value = e - 1;
    const a = this.computeError();
    return i < Math.min(s, a) ? (t.value = e + 1, !0) : a < Math.min(s, i) ? (t.value = e - 1, !0) : (t.value = e, !1);
  }
  replaceHandles(t) {
    const e = [], s = /* @__PURE__ */ new Set();
    for (; this.constraints.length > 0; ) {
      const i = this.constraints.shift();
      if (!i.replaceHandles(t))
        continue;
      const a = i.signature;
      s.has(a) || (e.push(i), s.add(a));
    }
    this.constraints.push(...e);
  }
  computeError() {
    return this.constraints.map((t) => Math.pow(t.computeError(), 2)).reduce((t, e) => t + e, 0);
  }
}
class S {
  constructor(t) {
    this.value = t;
  }
}
const it = 5, R = it;
class b {
  constructor(t, e) {
    this.xVar = new S(t), this.yVar = new S(e), this.children = /* @__PURE__ */ new Set();
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
    return x(t, this) <= R;
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar);
  }
}
class X {
  constructor(t) {
    this.parent = t;
  }
  get x() {
    return this.parent.x;
  }
  set x(t) {
    this.parent.x = t;
  }
  get y() {
    return this.parent.y;
  }
  set y(t) {
    this.parent.y = t;
  }
  contains(t) {
    return !1;
  }
  forEachVar(t) {
  }
}
const P = class P {
  constructor({ x: t, y: e }) {
    this.id = P.nextId++, this.state = new b(t, e);
  }
  get x() {
    return this.state.x;
  }
  set x(t) {
    this.state.x = t;
  }
  get y() {
    return this.state.y;
  }
  set y(t) {
    this.state.y = t;
  }
  get primary() {
    return this.state instanceof b ? this : this.state.parent;
  }
  mergeWith(t) {
    if (!(this.state instanceof b))
      this.state.parent.mergeWith(t);
    else if (!(t.state instanceof b))
      this.mergeWith(t.state.parent);
    else if (this !== t) {
      for (const e of t.state.children)
        e.state.parent = this, this.state.children.add(e);
      t.state = new X(this), this.state.children.add(t);
    }
  }
  breakOff() {
    if (this.state instanceof X) {
      this.state.parent.state.children.delete(this);
      const t = this.state.parent;
      return this.state = new b(this.x, this.y), t;
    } else if (this.state.children.size > 0) {
      const [t] = [...this.state.children];
      t.state = new b(this.x, this.y);
      for (const e of this.state.children)
        e !== t && (t.state.children.add(e), e.state.parent = t);
      return this.state.children.clear(), t;
    } else
      return null;
  }
  contains(t) {
    return this.state.contains(t);
  }
  render(t, e) {
  }
  forEachHandle(t) {
    t(this);
  }
  forEachVar(t) {
    this.state.forEachVar(t);
  }
  toString() {
    return this.state instanceof b ? `primary(id=${this.id}, children [${[...this.state.children].map((t) => t.id).join(", ")}])` : `merged(id=${this.id}, parent=${this.state.parent.id})`;
  }
};
P.nextId = 0;
let m = P;
class A {
  constructor(t, e) {
    this.a = new m(t), this.b = new m(e);
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && j(t, this.a, this.b) <= R;
  }
  render(t, e) {
    z(this.a, this.b, p(t.has(this) ? "bold" : "normal"), e);
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
class C {
  constructor(t, e, s) {
    this.a = new m(t), this.b = new m(e), this.c = new m(s);
  }
  contains(t) {
    return Math.abs(x(t, this.c) - x(this.a, this.c)) <= R;
  }
  render(t, e) {
    G(
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
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
class M {
  constructor(t, e, s, i) {
    this.master = t, this.transform = (a) => Y(W(Z(a, I, this.angle), I, this.scale), this), this.xVar = new S(e), this.yVar = new S(s), this.angleAndSizeVecX = new S(i), this.angleAndSizeVecY = new S(0);
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
    const { topLeft: e, bottomRight: s } = this.master.boundingBox(), i = [
      e,
      s,
      { x: e.x, y: s.y },
      { x: s.x, y: e.y }
    ].map(this.transform), { topLeft: a, bottomRight: o } = B(i);
    return a.x <= t.x && t.x <= o.x && a.y <= t.y && t.y <= o.y;
  }
  render(t, e) {
    this.master.render((s) => e(this.transform(s)));
  }
  forEachHandle(t) {
  }
  forEachVar(t) {
    t(this.xVar), t(this.yVar), t(this.angleAndSizeVecX), t(this.angleAndSizeVecY);
  }
}
class at {
  constructor() {
    this.things = [], this.constraints = new F(), this.selection = /* @__PURE__ */ new Set();
  }
  isEmpty() {
    return this.things.length === 0;
  }
  relax() {
    this.constraints.relax(this.getVars());
  }
  render(t) {
    this.things.forEach((e) => {
      e.render(this.selection, t), e.forEachHandle((s) => s.render(this.selection, t));
    });
  }
  addInstance(t, { x: e, y: s }, i) {
    t !== this && this.things.push(new M(t, e, s, i));
  }
  growInstanceAt(t) {
    const e = this.thingAt(t);
    return e instanceof M ? (e.scale += 0.05, !0) : !1;
  }
  shrinkInstanceAt(t) {
    const e = this.thingAt(t);
    return e instanceof M ? (e.scale -= 0.05, !0) : !1;
  }
  rotateInstanceAt(t, e) {
    const s = this.thingAt(t);
    return s instanceof M ? (s.angle += e, !0) : !1;
  }
  addLine(t, e) {
    const s = new A(t, e);
    this.mergeAndAddImplicitConstraints(s.a), this.mergeAndAddImplicitConstraints(s.b);
    for (const i of this.things)
      i.forEachHandle((a) => {
        a = a.primary, a !== s.a.primary && a !== s.b.primary && s.contains(a) && this.constraints.add(new D(a, s.a, s.b));
      });
    this.things.push(s);
  }
  addArc(t, e, s) {
    const i = new C(t, e, s);
    this.mergeAndAddImplicitConstraints(i.c), this.mergeAndAddImplicitConstraints(i.a), this.mergeAndAddImplicitConstraints(i.b), this.constraints.add(new q(i.a, i.c, i.b, i.c));
    for (const a of this.things)
      a.forEachHandle((o) => {
        o = o.primary, o !== i.a.primary && o !== i.b.primary && o !== i.c.primary && i.contains(o) && this.constraints.add(new $(o.primary, i.a, i.b, i.c));
      });
    this.things.push(i);
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.things)
      s.forEachHandle((i) => {
        i = i.primary, i.contains(t) && (t.mergeWith(i), e.add(s));
      });
    for (const s of this.things)
      e.has(s) || !s.contains(t) || (s instanceof A ? this.constraints.add(new D(t, s.a, s.b)) : s instanceof C && this.constraints.add(new $(t, s.a, s.b, s.c)));
  }
  delete(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    const s = /* @__PURE__ */ new Map();
    for (const i of e)
      i.forEachHandle((a) => {
        if (!s.has(a)) {
          const o = a.breakOff();
          s.set(a, o);
        }
      }), this.things.splice(this.things.indexOf(i), 1);
    return this.constraints.replaceHandles(s), this.selection.clear(), !0;
  }
  fixedDistance(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    for (const s of e)
      s instanceof A && this.constraints.add(new st(s.a, s.b));
    return this.selection.clear(), !0;
  }
  equalDistance() {
    let t = null;
    for (const e of this.selection)
      e instanceof A && (t && this.constraints.add(new q(t.a, t.b, e.a, e.b)), t = e);
    this.selection.clear();
  }
  horizontalOrVertical(t) {
    const e = this.thingsForOperation(t);
    if (e.size === 0)
      return !1;
    for (const s of e)
      s instanceof A && this.constraints.add(new nt(s.a, s.b));
    return this.selection.clear(), !0;
  }
  snap(t, e) {
    const s = this.handleAt(t, e);
    if (s) {
      t.x = s.x, t.y = s.y;
      return;
    }
    const i = new F(), a = new m(t), o = /* @__PURE__ */ new Set();
    a.forEachVar((l) => o.add(l));
    for (const l of this.things)
      this.selection.has(l) || !l.contains(t) || (l instanceof A ? i.add(new D(a, l.a, l.b)) : l instanceof C && i.add(new $(a, l.a, l.b, l.c)));
    for (; i.relax(o); )
      ;
    t.x = a.x, t.y = a.y;
  }
  handleAt(t, e = null) {
    let s = 1 / 0, i = null;
    for (const a of this.things)
      a.forEachHandle((o) => {
        if (o = o.primary, o !== e && o.contains(t)) {
          const l = x(t, o);
          l < s && (i = o, s = l);
        }
      });
    return i;
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
    for (const s of this.getHandles(this.selection))
      s.x += t, s.y += e;
  }
  leave() {
    this.center(), this.selection.clear();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), s = -(t.x + e.x) / 2, i = -(t.y + e.y) / 2;
    for (const a of this.getPositions())
      a.x += s, a.y += i;
  }
  boundingBox() {
    return B(this.getPositions());
  }
  get size() {
    let t = 0;
    for (const { x: e, y: s } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(s, 2));
    return Math.sqrt(t);
  }
  thingsForOperation(t) {
    const e = this.thingAt(t);
    return this.selection.size > 0 ? this.selection : e ? /* @__PURE__ */ new Set([e]) : /* @__PURE__ */ new Set();
  }
  getHandles(t) {
    const e = /* @__PURE__ */ new Set();
    for (const s of t)
      s.forEachHandle((i) => e.add(i.primary));
    return e;
  }
  getPositions() {
    const t = this.getHandles(this.things);
    for (const e of this.things)
      e instanceof M && t.add(e);
    return t;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((s) => t.add(s));
    return t;
  }
}
tt(document.getElementById("canvas"));
const r = { x: 1 / 0, y: 1 / 0, down: !1 }, w = {};
let c = null, g = null;
const f = {
  center: { x: 0, y: 0 },
  scale: 1,
  reset() {
    this.center = { x: -window.innerWidth / 2, y: -window.innerHeight / 2 }, this.scale = 1;
  }
};
f.reset();
function V(n) {
  return O(W(n, I, f.scale), f.center);
}
function K(n) {
  return W(Y(n, f.center), I, 1 / f.scale);
}
const T = [];
for (let n = 0; n < 10; n++)
  T.push(new at());
let h = T[1];
function rt(n) {
  k(() => {
    h.leave(), f.reset(), h = n;
  });
}
function J() {
  w[" "] && (y("solve"), h.relax()), ot(), requestAnimationFrame(J);
}
J();
function ot() {
  switch (et(), !c && h.isEmpty() ? ct() : h.render(V), c == null ? void 0 : c.type) {
    case "line":
      z(c.start, r, p(), V);
      break;
    case "arc":
      c.positions.length > 1 && G(
        c.positions[0],
        c.positions[1],
        r,
        p(),
        V
      );
      break;
  }
  const n = 15, t = V(r);
  z(
    { x: t.x - n, y: t.y },
    { x: t.x + n, y: t.y },
    p("bold")
  ), z(
    { x: t.x, y: t.y - n },
    { x: t.x, y: t.y + n },
    p("bold")
  );
}
function ct() {
  const n = window.innerWidth / 100;
  t(-7 * n, 4 * n, -7 * n, -4 * n), t(-3 * n, 4 * n, -3 * n, -4 * n), t(-3 * n, -4 * n, 2 * n, 4 * n), t(2 * n, 4 * n, 2 * n, -4 * n), t(6 * n, 4 * n, 6 * n, -4 * n), t(6 * n, -1 * n, 10 * n, -4 * n), t(8 * n, -2 * n, 10 * n, 4 * n);
  function t(e, s, i, a) {
    z({ x: e, y: s }, { x: i, y: a }, p(), V);
  }
}
window.addEventListener("keydown", (n) => {
  if (w[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = parseInt(n.code.slice(5)), e = T[t];
    w.Shift ? (y("instantiate #" + t), h.addInstance(e, r, window.innerHeight / 5 / f.scale)) : (y("drawing #" + t), rt(e));
    return;
  }
  switch (n.key) {
    case "Backspace":
      h.delete(r) && y("delete");
      break;
    case "l":
      h.fixedDistance(r) && y("fixed distance");
      break;
    case "e":
      y("equal length"), h.equalDistance();
      break;
    case "h":
      h.horizontalOrVertical(r) && y("HorV");
      break;
    case "=":
      h.growInstanceAt(r) || k(() => {
        f.scale = Math.min(f.scale + 0.1, 10), y("scale=" + f.scale.toFixed(1));
      });
      break;
    case "-":
      h.shrinkInstanceAt(r) || k(() => {
        f.scale = Math.max(f.scale - 0.1, 0.1), y("scale=" + f.scale.toFixed(1));
      });
      break;
    case "q":
      h.rotateInstanceAt(r, -5 * Math.PI / 180);
      break;
    case "w":
      h.rotateInstanceAt(r, 5 * Math.PI / 180);
      break;
  }
});
window.addEventListener("keyup", (n) => {
  delete w[n.key], n.key === "Meta" ? lt() : n.key === "a" ? (c == null ? void 0 : c.type) === "arc" && (c = null) : n.key === " " && y("");
});
u.addEventListener("pointerdown", (n) => {
  if (u.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), r.down = !0, w.Shift) {
    h.toggleSelections(r);
    return;
  } else if (w.Meta) {
    ht();
    return;
  } else if (w.a) {
    dt();
    return;
  }
  g = null;
  const t = h.handleAt(r);
  if (t) {
    g = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  h.clearSelection();
  const e = h.thingAt(r);
  e && (e instanceof M ? g = { thing: e, offset: O(r, e) } : h.toggleSelected(e));
});
u.addEventListener("pointermove", (n) => {
  const t = { x: r.x, y: r.y };
  if ({ x: r.x, y: r.y } = K({
    x: n.layerX,
    y: n.layerY
  }), r.down && !c && !g && h.selection.size === 0) {
    const e = r.x - t.x, s = r.y - t.y;
    k(() => {
      f.center.x -= e * f.scale, f.center.y -= s * f.scale;
    });
    return;
  }
  if (h.snap(r, g ? g.thing : null), r.down && h.selection.size > 0) {
    const e = O(r, t);
    h.moveSelection(e.x, e.y);
  }
  g && (g.thing.x = r.x - g.offset.x, g.thing.y = r.y - g.offset.y);
});
u.addEventListener("pointerup", (n) => {
  u.releasePointerCapture(n.pointerId), r.down = !1, (g == null ? void 0 : g.thing) instanceof m && h.mergeAndAddImplicitConstraints(g.thing), g = null;
});
function ht() {
  const n = { x: r.x, y: r.y };
  (c == null ? void 0 : c.type) === "line" && h.addLine(c.start, n), c = {
    type: "line",
    start: n
  };
}
function lt() {
  c = null;
}
function dt() {
  if ((c == null ? void 0 : c.type) !== "arc" && (c = { type: "arc", positions: [] }), c.positions.push({ x: r.x, y: r.y }), c.positions.length === 3) {
    const [n, t, e] = c.positions;
    h.addArc(t, e, n), c = null;
  }
}
function k(n) {
  const t = V(r);
  n(), { x: r.x, y: r.y } = K(t);
}
