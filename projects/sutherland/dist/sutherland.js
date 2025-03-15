const At = {
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
  maxDepth: 10,
  tabletButtonWidth: 100,
  lefty: !1,
  onionSkinAlpha: 0
};
let z;
function Xe() {
  z = JSON.parse(localStorage.getItem("config") ?? JSON.stringify(At));
  for (const [n, t] of Object.entries(At))
    Object.hasOwn(z, n) || (z[n] = t);
}
function Y(n) {
  z = { ...z, ...n }, localStorage.setItem(
    "config",
    JSON.stringify({ ...JSON.parse(localStorage.getItem("config")), ...n })
  );
}
function Ye() {
  z = JSON.parse(JSON.stringify(At)), localStorage.setItem("config", JSON.stringify(z));
}
function o() {
  return z;
}
Xe();
window.config = o;
const Dt = () => new URLSearchParams(window.location.search).get("tablet"), V = Math.PI * 2;
function S(n, t) {
  return Math.sqrt(rt(n, t));
}
function rt(n, t) {
  return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2);
}
function G(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
const ct = Object.freeze({ x: 0, y: 0 });
function Se({ x: n, y: t }, { x: e, y: i }) {
  return { x: n + e, y: t + i };
}
function Tt(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, a = e * i, r = e * s;
  return { x: a + t.x, y: r + t.y };
}
function zt(n, t, e) {
  const i = n.x - t.x, s = n.y - t.y, a = Math.sin(e), r = Math.cos(e), h = i * r - s * a, m = i * a + s * r;
  return { x: h + t.x, y: m + t.y };
}
function Be(n) {
  let t = 1 / 0, e = -1 / 0, i = 1 / 0, s = -1 / 0;
  for (const a of n)
    t = Math.min(t, a.x), e = Math.max(e, a.x), i = Math.min(i, a.y), s = Math.max(s, a.y);
  return {
    topLeft: { x: t, y: s },
    bottomRight: { x: e, y: i }
  };
}
function Ee(n, t, e) {
  return Math.sqrt(qe(n, t, e));
}
function qe(n, t, e) {
  const i = rt(t, e);
  if (i == 0)
    return rt(n, t);
  const s = Math.max(0, Math.min(((n.x - t.x) * (e.x - t.x) + (n.y - t.y) * (e.y - t.y)) / i, 1));
  return rt(n, { x: t.x + s * (e.x - t.x), y: t.y + s * (e.y - t.y) });
}
function he(n) {
  return 1 - Math.pow(1 - n, 5);
}
let P, u;
function Ue(n) {
  P = n, u = P.getContext("2d"), Pe();
}
function Mt(n, t) {
  const e = u.globalAlpha;
  u.globalAlpha = n;
  try {
    t();
  } finally {
    u.globalAlpha = e;
  }
}
function Pe() {
  if (P.width = innerWidth, P.height = innerHeight, devicePixelRatio !== 1) {
    const n = P.width, t = P.height;
    P.width = n * devicePixelRatio, P.height = t * devicePixelRatio, P.style.width = n + "px", P.style.height = t + "px", u.scale(devicePixelRatio, devicePixelRatio);
  }
}
window.addEventListener("resize", Pe);
function je() {
  u.clearRect(0, 0, P.width, P.height), u.lineWidth = o().lineWidth, u.lineCap = "round";
}
function nt(n) {
  return n;
}
function N(n, t = M(), e = nt) {
  const i = e(n);
  u.fillStyle = t, u.beginPath(), u.arc(i.x, i.y, u.lineWidth * 2, 0, V), u.fill();
}
function L(n, t, e = M(), i = nt) {
  const s = u.lineWidth;
  n.x === t.x && n.y === t.y && (u.lineWidth *= 2), u.strokeStyle = e, u.beginPath();
  const a = i(n), r = i(t);
  u.moveTo(a.x, a.y), u.lineTo(r.x, r.y), u.stroke(), u.lineWidth = s;
}
function Ne(n, t, e, i = M(), s = nt) {
  n = s(n), t = s(t);
  const a = t.x - n.x, r = t.y - n.y, h = Math.atan2(r, a) + Math.PI / 2, m = Math.sin(h), x = Math.cos(h), p = Math.sqrt(a ** 2 + r ** 2) * Math.sin(e + Date.now() / 300) / 20;
  u.strokeStyle = i, u.beginPath(), u.moveTo(n.x, n.y), u.bezierCurveTo(
    n.x + a / 3 + p * x,
    n.y + r / 3 + p * m,
    t.x - a / 3 - p * x,
    t.y - r / 3 - p * m,
    t.x,
    t.y
  ), u.stroke();
}
function _e(n, t, e, i, s = M(), a = nt) {
  const r = a(i === "cw" ? t : e), h = a(i === "cw" ? e : t), m = a(n), x = Math.atan2(r.y - m.y, r.x - m.x), b = Math.atan2(h.y - m.y, h.x - m.x), p = Math.abs(b - x) < 0.05, v = S(m, i === "cw" ? r : h);
  u.strokeStyle = s, u.beginPath(), u.arc(m.x, m.y, v, x, p ? x + V : b), u.stroke();
}
function Je(n, t, e, i) {
  u.fillStyle = i, u.beginPath(), u.arc(n, t, e, 0, V), u.fill();
}
function Ae(n, t, e = M(), i = nt) {
  u.fillStyle = e;
  const s = 12;
  u.font = `${s}px Major Mono Display`;
  const a = u.measureText(t).width, { x: r, y: h } = i(n);
  u.fillText(t, r - a / 2, h + s / 2);
}
function M(n = "normal") {
  let t, e;
  return n === "normal" ? (t = 0.35, e = 0.3) : n === "light" ? (t = 0.1, e = 0.05) : (t = 0.7, e = 0.1), t *= o().baseAlphaMultiplier, `rgba(255,255,255,${o().flicker ? Math.random() * e + t : 0.75 * e + t})`;
}
const at = Dt() ? 12 : 6, le = Dt() ? 190 : 0;
class Lt {
  constructor(t) {
    this.parent = t, this.writes = /* @__PURE__ */ new WeakMap(), this.parentValueCache = new WeakRef(/* @__PURE__ */ new WeakMap()), this.children = /* @__PURE__ */ new Set(), this.numWrites = 0, this.sealed = !1, this.x = -100, this.y = -100, this.depth = 0, this.breadth = 0, this.rand = Math.random() * 100;
  }
  bookmark() {
  }
  set(t, e) {
    var i;
    e === this.get(t) || (this.sealed ? (E = this.sprout(), E.set(t, e)) : this.writes.has(t) ? e === ((i = this.parent) == null ? void 0 : i.get(t)) ? (this.writes.delete(t), this.numWrites--) : this.writes.set(t, e) : (this.writes.set(t, e), this.numWrites++));
  }
  get(t) {
    var s;
    if (this.writes.has(t))
      return this.writes.get(t);
    let e = this.parentValueCache.deref();
    if (e != null && e.has(t))
      return this.parentValueCache.deref().get(t);
    const i = (s = this.parent) == null ? void 0 : s.get(t);
    return e || (e = /* @__PURE__ */ new WeakMap(), this.parentValueCache = new WeakRef(e)), e.set(t, i), i;
  }
  sprout() {
    const t = new Lt(this);
    return this.children.add(t), t;
  }
  disown(t) {
    this.children.delete(t);
  }
  goInto() {
    E = this;
  }
  do(t) {
    const e = E;
    E = this;
    try {
      t();
    } finally {
      E = e;
    }
  }
  doInTempChild(t) {
    let e = E;
    E = this.sprout();
    try {
      t();
    } finally {
      this.children.delete(E), E = e;
    }
  }
  hasWrites() {
    return this.numWrites > 0;
  }
  seal() {
    this.sealed = !0;
  }
  updateRenderingInfo() {
    this.children.size === 0 ? (this.depth = 1, this.breadth = 1) : ([...this.children].forEach((t) => t.updateRenderingInfo()), this.breadth = [...this.children].map((t) => t.breadth).reduce((t, e) => t + e, 0), this.depth = 1 + [...this.children].map((t) => t.depth).reduce((t, e) => Math.max(t, e), 0));
  }
  render() {
    const t = at * 3;
    this._render(
      20 + le,
      innerHeight - 20 - t,
      (innerWidth - 40 - le) / (gt.depth - 1),
      t
    ), E.renderCircle("yellow");
    const e = o().flicker;
    if (o().flicker = !1, o().onionSkinAlpha === 0)
      return;
    const i = window.drawing();
    let s = E.parent, a = o().onionSkinAlpha;
    for (; s; ) {
      let h = !0;
      if (s.do(() => {
        window.drawing() !== i ? h = !1 : Mt(a, () => i.render());
      }), !h)
        break;
      a *= o().onionSkinAlpha, s = s.parent;
    }
    a = o().onionSkinAlpha;
    let r = [...E.children];
    for (; r.length > 0; ) {
      const h = [];
      for (const m of r)
        m.do(() => {
          window.drawing() === i && (Mt(a, () => i.render()), h.push(...m.children));
        });
      a *= o().onionSkinAlpha, r = h;
    }
    o().flicker = e;
  }
  _render(t, e, i, s) {
    this.x = t, this.y = e;
    let a = e;
    for (const r of this.children)
      Ne(this, { x: t + i, y: a }, r.rand, "rgba(100, 149, 237, .7)"), r._render(t + i, a, i, s), a -= r.breadth * s;
    this.renderCircle("cornflowerblue");
  }
  renderCircle(t) {
    Je(
      this.x,
      this.y,
      at + at / 10 * Math.sin(Date.now() / 300 + this.rand),
      t
    );
  }
}
const gt = new Lt();
let E = gt;
const ht = () => E;
window.thisWorld = ht;
const lt = () => gt;
function Me(n) {
  let t = null, e = 1 / 0;
  const i = 3 * at;
  s(gt), t && (E = t);
  function s(a) {
    const r = S(n, a);
    r < i && r < e && (t = a, e = r), a.children.forEach(s);
  }
}
class f {
  constructor(t) {
    this.value = t;
  }
  get value() {
    return E.get(this);
  }
  set value(t) {
    E.set(this, t);
  }
}
class k {
  constructor(...t) {
    this._first = new f(null);
    for (let e = t.length - 1; e >= 0; e--)
      this.unshift(t[e]);
  }
  get first() {
    return this._first.value;
  }
  set first(t) {
    this._first.value = t;
  }
  clear() {
    this.first = null;
  }
  isEmpty() {
    return this.first === null;
  }
  includes(t) {
    let e = !1;
    return this.forEach((i) => {
      i === t && (e = !0);
    }), e;
  }
  find(t) {
    let e;
    return this.forEach((i) => {
      e === void 0 && t(i) && (e = i);
    }), e;
  }
  unshift(t) {
    this.first = new Ge(t, this.first);
  }
  pop() {
    if (this.first == null)
      throw new Error();
    const t = this.first.value;
    return this.first = this.first.next, t;
  }
  filter(t) {
    const e = new k();
    return this.forEach((i) => {
      t(i) && e.unshift(i);
    }), e.reversed();
  }
  map(t) {
    const e = new k();
    return this.forEach((i) => {
      e.unshift(t(i));
    }), e.reversed();
  }
  reversed() {
    const t = new k();
    return this.forEach((e) => t.unshift(e)), t;
  }
  replace(t, e) {
    let i = this.first;
    for (; i; )
      i.value === t && (i.value = e), i = i.next;
  }
  removeAll(t) {
    let e = null, i = this.first;
    for (this.first = null; i; ) {
      const s = i.next;
      i.next = null, t(i.value) || (e ? e.next = i : this.first = i, e = i), i = s;
    }
  }
  forEach(t) {
    let e = this.first;
    for (; e; )
      t(e.value), e = e.next;
  }
  withDo(t, e) {
    let i = this.first;
    if (t.forEach((s) => {
      if (!i)
        throw new Error("withDo() requires the two lists to have the same length");
      e(i.value, s), i = i.next;
    }), i)
      throw new Error("withDo() requires the two lists to have the same length");
  }
  *[Symbol.iterator]() {
    let t = this.first;
    for (; t; )
      yield t.value, t = t.next;
  }
  // every(pred: (x: T) => boolean) {
  //   for (const x of this) {
  //     if (!pred(x)) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  // some(pred: (x: T) => boolean) {
  //   for (const x of this) {
  //     if (pred(x)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // reduce<S>(fn: (prev: S, next: T) => S, z: S) {
  //   let ans = z;
  //   for (const x of this) {
  //     ans = fn(ans, x);
  //   }
  //   return ans;
  // }
  toArray() {
    const t = [];
    return this.forEach((e) => t.push(e)), t;
  }
  toString() {
    return this.toArray().toString();
  }
}
class Ge {
  constructor(t, e) {
    this._value = new f(t), this._next = new f(e);
  }
  get value() {
    return this._value.value;
  }
  set value(t) {
    this._value.value = t;
  }
  get next() {
    return this._next.value;
  }
  set next(t) {
    this._next.value = t;
  }
}
let H = 1;
const R = { x: 0, y: 0 }, y = {
  reset() {
    H = 1, this.centerAt({ x: 0, y: 0 });
  },
  get scale() {
    return H;
  },
  set scale(n) {
    H = n;
  },
  centerAt({ x: n, y: t }) {
    R.x = n, R.y = t;
  },
  get center() {
    return R;
  },
  set center(n) {
    this.centerAt(n);
  },
  toScreenPosition({ x: n, y: t }) {
    return {
      x: (n - R.x) * H + innerWidth / 2,
      y: -(t - R.y) * H + innerHeight / 2
    };
  },
  fromScreenPosition({ x: n, y: t }) {
    return {
      x: (n - innerWidth / 2) / H + R.x,
      y: R.y - (t - innerHeight / 2) / H
    };
  }
}, q = new f(""), U = new f(null);
let kt = 0;
function w(n, ...t) {
  q.value = n, U.value = t.length === 0 ? null : t.map((e) => new WeakRef(e)), kt++;
}
let de = 0, ue = q.value, fe = U.value, me = 0, ke = "bottom";
function dt(n) {
  ke = n;
}
function Ke() {
  const n = Date.now();
  (kt !== de || q.value !== ue || U.value !== fe) && (de = kt, ue = q.value, fe = U.value, me = n);
  const t = n - me;
  if (t > o().statusTimeMillis)
    return;
  const e = 40;
  u.font = `${e}px Monaco`;
  const i = u.measureText(q.value).width, s = 1 - he(t / o().statusTimeMillis);
  if (u.fillStyle = `rgba(255,222,33,${s})`, u.fillText(
    q.value,
    (innerWidth - i) / 2,
    ke === "top" ? 1.2 * e : innerHeight - e
  ), o().highlightReferents && U.value) {
    const r = `rgba(255,222,33,${1 - he(t / (0.5 * o().statusTimeMillis))})`;
    for (const h of U.value) {
      const m = h.deref();
      m == null || m.render(y.toScreenPosition, r, 2);
    }
  }
}
class I {
  // override in subclasses like weight constraint
  preRelax() {
  }
  // TODO: consider returning false in certain constraint type-specific conditions
  // e.g., point-on-line(p, a, b) where p == a or p == b
  isStillValid(t, e) {
    let i = !0;
    return this.forEachThing((s) => {
      t.has(s) ? this.forEachHandle((a) => {
        e.has(a) || (i = !1);
      }) : i = !1;
    }), i;
  }
}
class Ot extends I {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  constructor(t, { x: e, y: i }) {
    super(), this._p = new f(t), this.pos = { x: e, y: i };
  }
  get signature() {
    return `FP(${this.p.id})`;
  }
  computeError() {
    return S(this.p, this.pos) * 100;
  }
  map(t, e, i) {
    return new Ot(e.get(this.p), i(this.pos));
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e);
  }
}
class Ht extends I {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e) {
    super(), this._a = new f(t), this._b = new f(e);
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `HorV(${t},${e})`;
  }
  computeError() {
    return Math.min(Math.abs(this.a.x - this.b.x), Math.abs(this.a.y - this.b.y));
  }
  map(t, e) {
    return new Ht(e.get(this.a), e.get(this.b));
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class ut extends I {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e) {
    super(), this._a = new f(t), this._b = new f(e), this.distance = S(t, e);
  }
  get signature() {
    const t = Math.min(this.a.id, this.b.id), e = Math.max(this.a.id, this.b.id);
    return `D(${t},${e})`;
  }
  computeError() {
    return this.distance - S(this.a, this.b);
  }
  map(t, e) {
    return new ut(e.get(this.a), e.get(this.b));
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class pt extends I {
  get a1() {
    return this._a1.value;
  }
  set a1(t) {
    this._a1.value = t;
  }
  get b1() {
    return this._b1.value;
  }
  set b1(t) {
    this._b1.value = t;
  }
  get a2() {
    return this._a2.value;
  }
  set a2(t) {
    this._a2.value = t;
  }
  get b2() {
    return this._b2.value;
  }
  set b2(t) {
    this._b2.value = t;
  }
  constructor(t, e, i, s) {
    super(), this._a1 = new f(t), this._b1 = new f(e), this._a2 = new f(i), this._b2 = new f(s);
  }
  get signature() {
    return `E(${this.a1.id},${this.b1.id},${this.a2.id},${this.b2.id})`;
  }
  computeError() {
    return Math.abs(S(this.a1, this.b1) - S(this.a2, this.b2));
  }
  map(t, e) {
    return new pt(
      e.get(this.a1),
      e.get(this.b1),
      e.get(this.a2),
      e.get(this.b2)
    );
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a1), t(this.b1), t(this.a2), t(this.b2);
  }
  replaceHandle(t, e) {
    this.a1 === t && (this.a1 = e), this.b1 === t && (this.b1 = e), this.a2 === t && (this.a2 = e), this.b2 === t && (this.b2 = e);
  }
}
class K extends I {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  constructor(t, e, i) {
    super(), this._p = new f(t), this._a = new f(e), this._b = new f(i);
  }
  get signature() {
    return `POL(${this.p.id},${this.a.id},${this.b.id})`;
  }
  computeError() {
    return Ee(this.p, this.a, this.b);
  }
  map(t, e) {
    return new K(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b)
    );
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p), t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e), this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
}
class Q extends I {
  get p() {
    return this._p.value;
  }
  set p(t) {
    this._p.value = t;
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get c() {
    return this._c.value;
  }
  set c(t) {
    this._c.value = t;
  }
  constructor(t, e, i, s) {
    super(), this._p = new f(t), this._a = new f(e), this._b = new f(i), this._c = new f(s);
  }
  get signature() {
    return `POA(${this.p.id},${this.a.id},${this.b.id},${this.c.id})`;
  }
  computeError() {
    return S(this.p, this.c) - S(this.a, this.c);
  }
  map(t, e) {
    return new Q(
      e.get(this.p),
      e.get(this.a),
      e.get(this.b),
      e.get(this.c)
    );
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.p), t(this.a), t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.p === t && (this.p = e), this.a === t && (this.a = e), this.b === t && (this.b = e), this.c === t && (this.c = e);
  }
}
class wt extends I {
  constructor(t, e, i) {
    super(), this.instance = e, this._instancePoint = new f(t), this._masterPoint = new f(i);
  }
  get instancePoint() {
    return this._instancePoint.value;
  }
  set instancePoint(t) {
    this._instancePoint.value = t;
  }
  get masterPoint() {
    return this._masterPoint.value;
  }
  set masterPoint(t) {
    this._masterPoint.value = t;
  }
  get signature() {
    return `PI(${this.instance.id},${this.masterPoint.id})`;
  }
  computeError() {
    return S(
      this.instancePoint,
      Se(
        Tt(
          zt(this.masterPoint, ct, this.instance.angle),
          ct,
          this.instance.scale
        ),
        this.instance
      )
    );
  }
  map(t, e) {
    return new wt(
      e.get(this.instancePoint),
      t.get(this.instance),
      this.masterPoint
    );
  }
  forEachThing(t) {
    t(this.instance);
  }
  forEachHandle(t) {
    t(this.instancePoint), t(this.masterPoint);
  }
  replaceHandle(t, e) {
    this.instancePoint === t && (this.instancePoint = e), this.masterPoint === t && (this.masterPoint = e);
  }
}
class bt extends I {
  constructor(t, e = 1) {
    super(), this.instance = t, this.scale = e;
  }
  get signature() {
    return `S(${this.instance.id})`;
  }
  computeError() {
    return this.instance.size - this.scale * this.instance.master.size;
  }
  map(t, e) {
    return new bt(t.get(this.instance), this.scale);
  }
  forEachThing(t) {
    t(this.instance);
  }
  forEachHandle(t) {
  }
  replaceHandle(t, e) {
  }
}
class Rt extends I {
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  constructor(t) {
    super(), this._a = new f(t);
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
  map(t, e) {
    return new Rt(e.get(this.a));
  }
  forEachThing(t) {
  }
  forEachHandle(t) {
    t(this.a);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e);
  }
}
class ye {
  constructor() {
    this._constraints = new f(new k());
  }
  get constraints() {
    return this._constraints.value;
  }
  set constraints(t) {
    this._constraints.value = t;
  }
  add(t) {
    const e = t.signature;
    this.constraints.find((i) => i.signature === e) || this.constraints.unshift(t);
  }
  remove(t) {
    this.constraints = this.constraints.filter((e) => e !== t);
  }
  clear() {
    this.constraints = new k();
  }
  isEmpty() {
    return this.constraints.isEmpty();
  }
  replaceHandle(t, e) {
    const i = this.constraints;
    this.constraints = new k(), i.forEach((s) => {
      s.replaceHandle(t, e), this.add(s);
    });
  }
  forEach(t) {
    this.constraints.forEach(t);
  }
  relax(t) {
    this.forEach((a) => a.preRelax());
    const e = y.scale > 0 ? 1 / y.scale : 1, i = o().minWorthwhileErrorImprovement * e;
    let s = !1;
    for (const a of t)
      s = this.relaxWithVar(a, e, i) || s;
    return s;
  }
  relaxWithVar(t, e, i) {
    const s = t.value, a = this.computeError() - i;
    t.value = s + e;
    const r = this.computeError();
    t.value = s - e;
    const h = this.computeError();
    return r < Math.min(a, h) ? (t.value = s + e, !0) : h < Math.min(a, r) ? (t.value = s - e, !0) : (t.value = s, !1);
  }
  computeError() {
    let t = 0;
    return this.constraints.forEach((e) => {
      t += e.computeError() ** 2;
    }), t;
  }
}
const yt = class yt {
  constructor({ x: t, y: e }) {
    this.id = yt.nextId++, this._x = new f(t), this._y = new f(e);
  }
  get x() {
    return this._x.value;
  }
  set x(t) {
    this._x.value = t;
  }
  get y() {
    return this._y.value;
  }
  set y(t) {
    this._y.value = t;
  }
  contains(t) {
    return S(t, this) <= o().closeEnough / y.scale;
  }
  distanceTo(t) {
    return S(this, t);
  }
  moveBy(t, e) {
    this.x += t, this.y += e;
  }
  render(t, e = o().instanceSideAttacherColor) {
    o().debug && Ae(t(this), `(${this.x.toFixed(0)},${this.y.toFixed(0)})`), N(this, e, t);
  }
  forEachHandle(t) {
    t(this);
  }
  replaceHandle(t, e) {
    throw new Error("should never call replace() on Handle");
  }
  forEachVar(t) {
    t(this._x), t(this._y);
  }
  toString() {
    return `handle(id=${this.id})`;
  }
};
yt.nextId = 0;
let A = yt;
class $ {
  constructor(t, e, i) {
    this.isGuide = i, this._a = new f(new A(t)), this._b = new f(new A(e));
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get x() {
    return (this.a.x + this.b.x) / 2;
  }
  get y() {
    return (this.a.y + this.b.y) / 2;
  }
  contains(t) {
    return !this.a.contains(t) && !this.b.contains(t) && this.distanceTo(t) <= o().closeEnough / y.scale;
  }
  distanceTo(t) {
    return Ee(t, this.a, this.b);
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e) {
    if (this.isGuide && !o().showGuideLines)
      return;
    const i = this.isGuide ? o().guideLineColor : e ?? M();
    L(this.a, this.b, i, t);
  }
  forEachHandle(t) {
    t(this.a), t(this.b);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
class J {
  constructor(t, e, i, s) {
    this.direction = s, this._a = new f(new A(t)), this._b = new f(S(t, e) === 0 ? this.a : new A(e)), this._c = new f(new A(i));
  }
  get a() {
    return this._a.value;
  }
  set a(t) {
    this._a.value = t;
  }
  get b() {
    return this._b.value;
  }
  set b(t) {
    this._b.value = t;
  }
  get c() {
    return this._c.value;
  }
  set c(t) {
    this._c.value = t;
  }
  get x() {
    return this.c.x;
  }
  get y() {
    return this.c.y;
  }
  contains(t) {
    if (this.distanceTo(t) > o().closeEnough / y.scale)
      return !1;
    const e = this.direction === "cw" ? this.a : this.b, i = this.direction === "cw" ? this.b : this.a, s = G(e, this.c), a = G(i, this.c), r = G(t, this.c), h = x(a, s), m = x(r, s);
    return 0 <= m && m <= h;
    function x(b, p) {
      const v = b.x * p.x + b.y * p.y, Bt = b.x * p.y - b.y * p.x;
      return (Math.atan2(Bt, v) + V) % V;
    }
  }
  distanceTo(t) {
    return Math.abs(S(t, this.c) - S(this.a, this.c));
  }
  moveBy(t, e) {
    this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    _e(this.c, this.a, this.b, this.direction, e ?? M(), t), i === 1 && o().showControlPoints && (N(this.a, o().controlPointColor, t), N(this.b, o().controlPointColor, t), N(this.c, o().controlPointColor, t));
  }
  forEachHandle(t) {
    t(this.a), this.a !== this.b && t(this.b), t(this.c);
  }
  replaceHandle(t, e) {
    this.a === t && (this.a = e), this.b === t && (this.b = e), this.c === t && (this.c = e);
  }
  forEachVar(t) {
    this.forEachHandle((e) => e.forEachVar(t));
  }
}
const xt = class xt {
  constructor(t, e, i, s, a, r) {
    this.master = t, this.transform = (h) => Se(Tt(zt(h, ct, this.angle), ct, this.scale), this), this.id = xt.nextId++, this._x = new f(e), this._y = new f(i), this._angleAndSizeVecX = new f(s * Math.cos(a)), this._angleAndSizeVecY = new f(s * Math.sin(a)), this._attachers = new f(
      t.attachers.map((h) => this.createAttacher(h, r))
    );
  }
  get x() {
    return this._x.value;
  }
  set x(t) {
    this._x.value = t;
  }
  get y() {
    return this._y.value;
  }
  set y(t) {
    this._y.value = t;
  }
  get attachers() {
    return this._attachers.value;
  }
  set attachers(t) {
    this._attachers.value = t;
  }
  createAttacher(t, e) {
    const i = new A(this.transform(t));
    return e.constraints.add(new wt(i, this, t)), i;
  }
  addAttacher(t, e) {
    this.attachers.unshift(this.createAttacher(t, e));
  }
  get size() {
    return Math.sqrt(
      Math.pow(this._angleAndSizeVecX.value, 2) + Math.pow(this._angleAndSizeVecY.value, 2)
    );
  }
  set size(t) {
    const e = this.angle;
    this._angleAndSizeVecX.value = t * Math.cos(e), this._angleAndSizeVecY.value = t * Math.sin(e);
  }
  get angle() {
    return Math.atan2(this._angleAndSizeVecY.value, this._angleAndSizeVecX.value);
  }
  set angle(t) {
    const e = this.size;
    this._angleAndSizeVecX.value = e * Math.cos(t), this._angleAndSizeVecY.value = e * Math.sin(t);
  }
  get scale() {
    return this.size / this.master.size;
  }
  set scale(t) {
    this.size = t * this.master.size;
  }
  contains(t) {
    const { topLeft: e, bottomRight: i } = this.boundingBox();
    return e.x <= t.x && t.x <= i.x && i.y <= t.y && t.y <= e.y;
  }
  boundingBox(t = this.master) {
    const { topLeft: e, bottomRight: i } = this.master.boundingBox(t), s = [
      e,
      i,
      { x: e.x, y: i.y },
      { x: i.x, y: e.y }
    ].map(this.transform);
    return Be(s);
  }
  distanceTo(t) {
    return S(t, this);
  }
  moveBy(t, e) {
    this.x += t, this.y += e, this.forEachHandle((i) => i.moveBy(t, e));
  }
  render(t, e, i = 0) {
    this.master.render((s) => t(this.transform(s)), e, i), i === 1 && this.attachers.withDo(this.master.attachers, (s, a) => {
      const r = t(s);
      L(
        t(this.transform(a)),
        r,
        o().instanceSideAttacherColor
      ), N(r, o().instanceSideAttacherColor);
    });
  }
  forEachHandle(t) {
    this.attachers.forEach(t);
  }
  replaceHandle(t, e) {
    this.attachers = this.attachers.map((i) => i === t ? e : i);
  }
  forEachVar(t) {
    t(this._x), t(this._y), t(this._angleAndSizeVecX), t(this._angleAndSizeVecY), this.forEachHandle((e) => e.forEachVar(t));
  }
};
xt.nextId = 0;
let _ = xt;
class Ce {
  constructor() {
    this._things = new f(new k()), this._attachers = new f(new k()), this.constraints = new ye();
  }
  get things() {
    return this._things.value;
  }
  set things(t) {
    this._things.value = t;
  }
  get attachers() {
    return this._attachers.value;
  }
  set attachers(t) {
    this._attachers.value = t;
  }
  clear() {
    this.things = new k(), this.attachers = new k(), this.constraints.clear();
  }
  isEmpty() {
    return this.things.isEmpty();
  }
  relax() {
    return this.constraints.relax(this.getVars());
  }
  render(t = y.toScreenPosition, e, i = 0) {
    i > o().maxDepth || (this.things.forEach((s) => s.render(t, e, i + 1)), i === 0 && (this.attachers.forEach((s) => s.render(t, o().masterSideAttacherColor)), this.constraints.forEach((s) => {
      if (s instanceof ut) {
        let a = (s.computeError() * 100).toFixed();
        a === "-0" && (a = "0"), this.drawText(
          a,
          o().distanceConstraintTextScale,
          t({
            x: s.a.x + o().distanceConstraintLabelPct * (s.b.x - s.a.x),
            y: s.a.y + o().distanceConstraintLabelPct * (s.b.y - s.a.y)
          })
        );
      }
    })));
  }
  contains(t) {
    if (this === t)
      return !0;
    for (const e of this.things)
      if (e instanceof _ && e.master.contains(t))
        return !0;
    return !1;
  }
  addInstance(t, { x: e, y: i }, s, a) {
    const r = new _(t, e, i, s, a, this);
    return this.things.unshift(r), r;
  }
  resizeInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof _))
      return !1;
    i.scale *= e;
    for (const s of i.attachers) {
      const { x: a, y: r } = Tt(s, i, e);
      s.x = a, s.y = r;
    }
    return !0;
  }
  rotateInstanceAt(t, e) {
    const i = this.thingAt(t);
    if (!(i instanceof _))
      return !1;
    i.angle += e;
    for (const s of i.attachers) {
      const { x: a, y: r } = zt(s, i, e);
      s.x = a, s.y = r;
    }
    return !0;
  }
  addLine(t, e, i = !1, s = !0) {
    const a = new $(t, e, i);
    !i && s && (this.mergeAndAddImplicitConstraints(a.a), this.mergeAndAddImplicitConstraints(a.b));
    for (const r of this.things)
      r.forEachHandle((h) => {
        h !== a.a && h !== a.b && a.contains(h) && this.constraints.add(new K(h, a.a, a.b));
      });
    return this.things.unshift(a), a;
  }
  addArc(t, e, i, s, a = !0) {
    const r = new J(t, e, i, s);
    a && (this.mergeAndAddImplicitConstraints(r.c), this.mergeAndAddImplicitConstraints(r.a), this.mergeAndAddImplicitConstraints(r.b)), this.constraints.add(new pt(r.a, r.c, r.b, r.c));
    for (const h of this.things)
      h.forEachHandle((m) => {
        m !== r.a && m !== r.b && m !== r.c && r.contains(m) && this.constraints.add(new Q(m, r.a, r.b, r.c));
      });
    return this.things.unshift(r), r;
  }
  mergeAndAddImplicitConstraints(t) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i.forEachHandle((s) => {
        s !== t && s.contains(t) && (this.replaceHandle(s, t), e.add(i));
      });
    for (const i of this.things)
      e.has(i) || !i.contains(t) || (i instanceof $ ? (this.constraints.add(new K(t, i.a, i.b)), o().showImplicitConstraints && w("(point on line)", t, i)) : i instanceof J && (this.constraints.add(new Q(t, i.a, i.b, i.c)), o().showImplicitConstraints && w("(point on arc)", t, i)));
  }
  replaceHandle(t, e) {
    this.things.forEach((i) => i.replaceHandle(t, e)), this.attachers = this.attachers.map((i) => i === t ? e : i), this.constraints.replaceHandle(t, e);
  }
  delete(t) {
    const e = this.thingAt(t);
    return e ? (this.things = this.things.filter((i) => i !== e), w("delete", e), !0) : !1;
  }
  fixedPoint(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Ot(e, t)), w("fixed point", e), !0) : !1;
  }
  weight(t) {
    const e = this.handleAt(t, null);
    return e ? (this.constraints.add(new Rt(e)), w("weight", e), !0) : !1;
  }
  fixedDistance(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new ut(e.a, e.b)), w("fixed distance", e), !0) : !1;
  }
  horizontalOrVertical(t) {
    const e = this.thingAt(t);
    return e instanceof $ ? (this.constraints.add(new Ht(e.a, e.b)), w("HorV", e), !0) : !1;
  }
  fullSize(t) {
    const e = this.thingAt(t);
    return e instanceof _ ? (this.constraints.add(new bt(e)), w("full size", e), !0) : !1;
  }
  dismember(t) {
    const e = this.thingAt(t);
    return e instanceof _ ? (this.inline(e), w("dismember", e), !0) : !1;
  }
  inline(t) {
    const { things: e, constraints: i } = t.master, s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const r of e)
      if (r instanceof $) {
        const h = this.addLine(
          t.transform(r.a),
          t.transform(r.b),
          r.isGuide
        );
        s.set(r.a, h.a), s.set(r.b, h.b);
      } else if (r instanceof J) {
        const h = this.addArc(
          t.transform(r.a),
          t.transform(r.b),
          t.transform(r.c),
          r.direction
        );
        s.set(r.a, h.a), s.set(r.b, h.b), s.set(r.c, h.c);
      } else if (r instanceof _) {
        const h = this.addInstance(
          r.master,
          t.transform(r),
          // move the center to the right place
          t.scale * r.size,
          t.angle + r.angle
        );
        a.set(r, h);
      } else
        throw new Error("unsupported thing type: " + r.constructor.name);
    i.forEach((r) => {
      this.constraints.add(r.map(a, s, t.transform));
    }), this.things = this.things.filter((r) => r !== t);
  }
  snap(t, e, i) {
    const s = this.handleAt(t, e);
    if (s)
      return h(s), "H";
    if (i && S(t, i) <= o().closeEnough / y.scale)
      return h(i), "H";
    let a = null;
    const r = [];
    return ht().doInTempChild(() => {
      const x = new ye(), b = new A(t), p = /* @__PURE__ */ new Set();
      b.forEachVar((v) => p.add(v));
      for (const v of this.things)
        v === e || e instanceof A && m(v, e) || !v.contains(t) || (v instanceof $ ? (x.add(new K(b, v.a, v.b)), r.push("L")) : v instanceof J && (x.add(new Q(b, v.a, v.b, v.c)), r.push("A")));
      if (!x.isEmpty()) {
        for (; x.relax(p); )
          ;
        a = { x: b.x, y: b.y };
      }
    }), a && h(a), r.join();
    function h(x) {
      if (e) {
        const b = x.x - e.x, p = x.y - e.y;
        e.moveBy(b, p);
      }
      t.x = x.x, t.y = x.y;
    }
    function m(x, b) {
      let p = !1;
      return x.forEachHandle((v) => {
        v === b && (p = !0);
      }), p;
    }
  }
  handleAt(t, e = null) {
    let i = 1 / 0, s = null;
    for (const a of this.things)
      a.forEachHandle((r) => {
        if (r !== e && r.contains(t)) {
          const h = S(t, r);
          h < i && (s = r, i = h);
        }
      });
    return s;
  }
  thingAt(t) {
    let e = 1 / 0, i = null;
    for (const s of this.things)
      if (s.contains(t)) {
        const a = s.distanceTo(t);
        a < e && (i = s, e = a);
      }
    return i;
  }
  leave() {
    this.center();
  }
  center() {
    const { topLeft: t, bottomRight: e } = this.boundingBox(), i = -(t.x + e.x) / 2, s = -(t.y + e.y) / 2;
    for (const a of this.getPositions())
      a.x += i, a.y += s;
  }
  boundingBox(t = this) {
    const e = [...this.getPositions(!1)];
    for (const i of this.things)
      if (i instanceof _ && i.master !== t) {
        const s = i.boundingBox(t);
        e.push(s.topLeft), e.push(s.bottomRight);
      }
    return Be(e);
  }
  get size() {
    let t = 0;
    for (const { x: e, y: i } of this.getPositions())
      t = Math.max(t, Math.pow(e, 2) + Math.pow(i, 2));
    return Math.sqrt(t) * 2;
  }
  getHandle(t) {
    let e, i = 0;
    for (const s of this.things)
      s.forEachHandle((a) => {
        i++ === t && (e = a);
      });
    return e;
  }
  getPositions(t = !0) {
    const e = /* @__PURE__ */ new Set();
    for (const i of this.things)
      i instanceof _ && e.add(i), i.forEachHandle((s) => {
        (!(i instanceof J) || t || s !== i.c) && e.add(s);
      });
    return e;
  }
  getVars() {
    const t = /* @__PURE__ */ new Set();
    for (const e of this.things)
      e.forEachVar((i) => t.add(i));
    return t;
  }
  onAttacherAdded(t, e) {
    for (const i of this.things)
      i instanceof _ && i.master === t && i.addAttacher(e, this);
  }
  onAttacherRemoved(t, e) {
    this.constraints.forEach((i) => {
      if (i instanceof wt && i.masterPoint === e) {
        const { instance: s, instancePoint: a } = i;
        s.attachers = s.attachers.filter((r) => r !== a), this.constraints.remove(i);
      }
    });
  }
  drawText(t, e, i) {
    Ie(
      t,
      e,
      (s, a, r) => s.render(
        ({ x: h, y: m }) => ({
          x: h * r + a - y.center.x + i.x,
          y: -m * r + i.y
        }),
        void 0,
        1
      )
    );
  }
}
const Qe = {
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
}, Ze = 1, tn = {
  data: Qe,
  version: Ze
};
function en(n, t, e = o().fontScale) {
  for (const i of t)
    switch (i.command) {
      case "line": {
        const s = Et(i.start, e), a = Et(i.end, e);
        n.addLine(s, a, !1, !1);
        break;
      }
      case "arc": {
        const s = Et(i.center, e), a = i.radius * e;
        n.addArc(
          xe(s, i.end, a),
          xe(s, i.start, a),
          s,
          0
        );
        break;
      }
      default:
        console.log("unsupported letter-drawing command", i);
        break;
    }
}
const nn = new Map(tn.data.values), vt = /* @__PURE__ */ new Map();
for (const [n, t] of nn) {
  const e = new Ce();
  en(e, t, o().fontScale);
  const i = e.addLine(
    { x: -o().kerning * o().fontScale, y: 0 },
    { x: (4 + o().kerning) * o().fontScale, y: 0 },
    !0
  );
  e.attachers.unshift(i.a), e.attachers.unshift(i.b), vt.set(n, e);
}
function Ie(n, t, e) {
  const i = (r) => t * (r === r.toUpperCase() ? 1 : 0.75), s = (r) => i(r) * o().fontScale * (4 + o().kerning * 2);
  let a = y.center.x - 0.5 * [...n].map(s).reduce((r, h) => r + h, 0);
  for (let r = 0; r < n.length; r++) {
    const h = n[r], m = i(h), x = vt.get(h.toUpperCase());
    x && e(x, a, m), a += s(h);
  }
}
function Et({ x: n, y: t }, e) {
  return { x: n * e, y: t * e };
}
function xe({ x: n, y: t }, e, i) {
  return {
    x: n + i * Math.cos(e),
    y: t + i * Math.sin(e)
  };
}
let W = null;
const c = {
  get pos() {
    return W;
  },
  snapPos(n, t) {
    return W ? d().snap(W, n, t) : null;
  },
  moveToScreenPos(n) {
    const t = y.fromScreenPosition(n);
    W ? (W.x = t.x, W.y = t.y) : W = t, sn();
  },
  clearPos() {
    W = null;
  }
};
function it(n) {
  if (!c.pos) {
    n();
    return;
  }
  const t = y.toScreenPosition(c.pos);
  n(), { x: c.pos.x, y: c.pos.y } = y.fromScreenPosition(t);
}
const O = {};
for (let n = 1; n < 10; n++)
  O["" + n] = new Ce();
let $t = new f(O[1]);
window.drawing = $t;
function d(n) {
  return n ? O[n] ?? vt.get(n) : $t.value;
}
window.drawing = d;
function Ft(n) {
  const t = d(n);
  !t || t === d() || (d().leave(), $t.value = t, it(() => y.reset()), St(), w("drawing #" + n));
}
const Pt = [...Object.values(O), ...vt.values()];
let l = null;
function Vt() {
  if (!c.pos)
    return;
  const n = { x: c.pos.x, y: c.pos.y };
  (l == null ? void 0 : l.type) === "line" && d().addLine(l.start, n), l = {
    type: "line",
    start: n
  };
}
function Xt() {
  (l == null ? void 0 : l.type) === "line" && (l = null);
}
function Yt() {
  if (c.pos && ((l == null ? void 0 : l.type) !== "arc" && (l = { type: "arc", positions: [], cummRotation: 0 }), l.positions.push({ x: c.pos.x, y: c.pos.y }), l.positions.length === 3)) {
    const [n, t, e] = l.positions;
    d().addArc(t, e, n, l.cummRotation < 0 ? "cw" : "ccw"), l = null;
  }
}
function sn() {
  if (!l || l.type !== "arc" || l.positions.length !== 2 || !c.pos)
    return;
  const [n, t] = l.positions;
  c.snapPos(void 0, t);
  const e = Math.atan2(c.pos.y - n.y, c.pos.x - n.x);
  if (!l.prevAngle) {
    l.prevAngle = e, l.cummRotation = 0;
    return;
  }
  let i = e - l.prevAngle;
  i > Math.PI ? i -= V : i < -Math.PI && (i += V), l.cummRotation += i, l.prevAngle = e;
}
function qt() {
  (l == null ? void 0 : l.type) === "arc" && (l = null);
}
function We(n, t) {
  d().attachers.removeAll((e) => e === t);
  for (const e of Object.values(O))
    e.onAttacherRemoved(n, t);
}
function rn(n, t) {
  n.attachers.unshift(t);
  for (const e of Object.values(O))
    e.onAttacherAdded(n, t);
}
function De() {
  if (o().autoSolve) {
    const n = performance.now();
    for (; performance.now() - n < 20 && d().relax(); )
      ;
  }
}
function Ct() {
  !l && d().isEmpty() && an(), on(), d().render(), cn(), Ke(), hn();
}
function an() {
  const n = innerWidth / 100, t = (e, i) => L(e, i, M(), y.toScreenPosition);
  t({ x: -7 * n, y: -4 * n }, { x: -7 * n, y: 4 * n }), t({ x: -3 * n, y: -4 * n }, { x: -3 * n, y: 4 * n }), t({ x: -3 * n, y: 4 * n }, { x: 2 * n, y: -4 * n }), t({ x: 2 * n, y: -4 * n }, { x: 2 * n, y: 4 * n }), t({ x: 6 * n, y: -4 * n }, { x: 6 * n, y: 4 * n }), t({ x: 6 * n, y: 1 * n }, { x: 10 * n, y: 4 * n }), t({ x: 8 * n, y: 2.4 * n }, { x: 10 * n, y: -4 * n });
}
function on() {
  switch (l == null ? void 0 : l.type) {
    case "line":
      c.pos && L(l.start, c.pos, M(), y.toScreenPosition);
      break;
    case "arc":
      if (o().showControlPoints)
        for (const n of l.positions)
          N(n, o().controlPointColor, y.toScreenPosition);
      l.positions.length == 2 && c.pos && l.cummRotation !== void 0 && Math.abs(l.cummRotation) > 0.05 && _e(
        l.positions[0],
        l.positions[1],
        c.pos,
        l.cummRotation < 0 ? "cw" : "ccw",
        M(),
        y.toScreenPosition
      );
      break;
  }
}
function cn() {
  if (!c.pos)
    return;
  const n = y.toScreenPosition(c.pos);
  L(
    { x: n.x - o().crosshairsSize, y: n.y },
    { x: n.x + o().crosshairsSize, y: n.y },
    M("bold")
  ), L(
    { x: n.x, y: n.y - o().crosshairsSize },
    { x: n.x, y: n.y + o().crosshairsSize },
    M("bold")
  );
}
function hn() {
  if (!o().debug)
    return;
  const n = y.toScreenPosition({ x: 0, y: 0 });
  L({ x: 0, y: n.y }, { x: innerWidth, y: n.y }, o().axisColor), L({ x: n.x, y: 0 }, { x: n.x, y: innerHeight }, o().axisColor);
  const t = c.pos;
  t && Ae(y.toScreenPosition(t), `(${t.x.toFixed()}, ${t.y.toFixed()})`);
}
function Ut() {
  return c.pos ? d().handleAt(c.pos) : null;
}
function st() {
  return c.pos ? d().thingAt(c.pos) : null;
}
function It() {
  const n = st();
  return n instanceof $ ? n : null;
}
function Te() {
  const n = st();
  return n instanceof _ ? n : null;
}
function jt() {
  d().isEmpty() || (w("solve"), d().relax());
}
function Nt() {
  o().autoSolve = !o().autoSolve, w(`auto-solve ${o().autoSolve ? "on" : "off"}`);
}
function Jt() {
  c.pos && d().delete(c.pos) && (Le(), d().isEmpty() && it(() => y.reset()));
}
function Gt() {
  return !!c.pos && d().fixedDistance(c.pos);
}
function Kt() {
  return !!c.pos && d().fixedPoint(c.pos);
}
function Qt() {
  return !!c.pos && d().weight(c.pos);
}
function Zt() {
  return !!c.pos && d().horizontalOrVertical(c.pos);
}
function te() {
  return !!c.pos && d().fullSize(c.pos);
}
function ze() {
  const n = c.pos;
  n && (w("re-center"), it(() => {
    y.centerAt(n);
  }));
}
function ee(n) {
  const t = d(n);
  if (!t.isEmpty() && c.pos && !t.contains(d())) {
    const e = d().addInstance(t, c.pos, 0.5 * t.size / y.scale, 0);
    w("instantiate #" + n, e);
  }
}
function ne() {
  c.pos && d().dismember(c.pos) && Le();
}
function ft(n) {
  return !!c.pos && d().rotateInstanceAt(c.pos, n);
}
function mt(n) {
  return !!c.pos && d().resizeInstanceAt(c.pos, n);
}
function ie() {
  if (!c.pos)
    return;
  const n = d().handleAt(c.pos);
  n && (d().attachers.includes(n) ? (We(d(), n), w("remove attacher")) : (rn(d(), n), w("add attacher")));
}
let F = null;
function se() {
  if (!F) {
    (F = It()) && w("equal length", F);
    return;
  }
  const n = It();
  n && (d().constraints.add(
    new pt(F.a, F.b, n.a, n.b)
  ), w("equal length", F, n));
}
function St() {
  F = null;
}
function Wt(n) {
  it(() => y.scale = n), w("scale=" + y.scale.toFixed(1));
}
function re(n, t) {
  it(() => {
    y.center.x -= n, y.center.y -= t;
  });
}
function Le() {
  for (; ln(); )
    ;
}
function ln() {
  const n = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const e of Pt)
    for (const i of e.things)
      n.add(i), i.forEachHandle((s) => t.add(s));
  for (const e of Pt) {
    let i = !1;
    for (const s of e.attachers)
      t.has(s) || (We(e, s), i = !0);
    if (i)
      return !0;
  }
  for (const e of Pt)
    e.constraints.forEach((i) => {
      i.isStillValid(n, t) || e.constraints.remove(i);
    });
  return !1;
}
const dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  del: Jt,
  dismember: ne,
  drawing: d,
  drawings: O,
  endArc: qt,
  endEqualLength: St,
  endLines: Xt,
  fixedDistance: Gt,
  fixedPoint: Kt,
  fullSize: te,
  handle: Ut,
  horizontalOrVertical: Zt,
  instance: Te,
  instantiate: ee,
  line: It,
  moreArc: Yt,
  moreEqualLength: se,
  moreLines: Vt,
  onFrame: De,
  panBy: re,
  pen: c,
  reCenter: ze,
  render: Ct,
  rotateInstanceBy: ft,
  scaleInstanceBy: mt,
  setScale: Wt,
  solve: jt,
  switchToDrawing: Ft,
  thing: st,
  toggleAttacher: ie,
  toggleAutoSolve: Nt,
  weight: Qt
}, Symbol.toStringTag, { value: "Module" }));
var ve;
const un = (ve = window.webkit) == null ? void 0 : ve.messageHandlers, fn = window.webkit != null;
function ge(n, t = n) {
  fn && un[n].postMessage(t);
}
let Z = [], _t = !1;
function mn() {
  const n = Z;
  return Z = [], n;
}
function pe(n) {
  for (const t of n)
    (!t.predicted || o().usePredictedEvents) && Z.push(t);
}
function ae(n, t) {
  const e = n.pointerType == "touch" ? "finger" : "pencil";
  t === "began" && (_t = !0), t === "ended" && (_t = !1), !(t === "moved" && !_t) && Z.push({
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
function yn() {
  window.onpointerdown = null, window.onpointermove = null, window.onpointerup = null, window.removeEventListener("touchstart", Oe), Z = [];
}
window.onpointerdown = (n) => ae(n, "began");
window.onpointermove = (n) => ae(n, "moved");
window.onpointerup = (n) => ae(n, "ended");
const Oe = (n) => n.preventDefault();
window.addEventListener("touchstart", Oe, { passive: !1 });
window.wrapperEvents = (n) => {
  window.wrapperEvents = pe, yn(), pe(n);
};
const we = 0.75, oe = () => o().fontScale * 8;
function D(n, t, e, i = 0.35) {
  d().drawText(n, i, {
    x: t + o().tabletButtonWidth / 2,
    y: e + oe() / 2 + i * o().fontScale * 3
  });
}
class g {
  constructor(t, e) {
    this.label = t, this.highlightPred = e, this.topY = 0, this.leftX = 0, this.lastDownTime = 0, this.fingerId = null;
  }
  contains({ x: t, y: e }) {
    return this.leftX <= t && t < this.leftX + o().tabletButtonWidth && this.topY <= e && e < this.topY + oe();
  }
  render() {
    D(this.label, this.leftX, this.topY), (this.isDown || this.highlightPred && this.highlightPred()) && (D(this.label, this.leftX, this.topY), D(this.label, this.leftX, this.topY));
  }
  get isDown() {
    return this.fingerId != null;
  }
  clearState() {
    this.fingerId = null;
  }
}
class He {
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
    for (const i of this.buttons)
      if (i.contains(t)) {
        i.fingerId = e, this.onButtonDown(i), i.lastDownTime = Date.now();
        return;
      }
    this.fingerScreenPositions.set(e, t);
  }
  onFingerMove(t, e) {
    this.fingerScreenPositions.set(e, t);
  }
  onFingerUp(t, e) {
    for (const i of this.buttons)
      i.fingerId === e && (this.onButtonUp(i), i.fingerId = null);
    this.fingerScreenPositions.delete(e);
  }
  processEvents() {
    for (const t of mn())
      switch (t.type) {
        case "pencil":
          t.phase === "began" ? this.onPencilDown(t.position, t.pressure) : t.phase === "moved" ? this.onPencilMove(t.position, t.pressure) : t.phase === "ended" && this.onPencilUp(t.position);
          break;
        case "finger":
          t.phase === "began" ? this.onFingerDown(t.position, t.id) : t.phase === "moved" ? this.onFingerMove(t.position, t.id) : t.phase === "ended" && this.onFingerUp(t.position, t.id);
      }
  }
  layOutButtonColumn(t, e) {
    let i = 0;
    for (const s of e)
      s.leftX = t, s.topY = i * oe(), i++;
  }
  clearButtonState() {
    this.buttons.forEach((t) => t.clearState());
  }
}
let T;
function ce(n) {
  T == null || T.clearButtonState(), T = n;
}
function xn() {
  ce(Re);
}
function gn() {
  T.processEvents(), T.onFrame();
}
function pn() {
  T.render();
}
function X(n) {
  return new g(n, () => d() === O[n]);
}
function wn(n) {
  return "1" <= n.label && n.label <= "9";
}
const Re = new class extends He {
  constructor() {
    super(), this.lineButton = new g("LINE"), this.moveButton = new g("MOVE"), this.horvButton = new g("HORV"), this.sizeButton = new g("SIZE"), this.dismemberButton = new g("DISM"), this.deleteButton = new g("DEL"), this.solveButton = new g("SOLVE", () => o().autoSolve), this.arcButton = new g("ARC"), this.eqButton = new g("EQ"), this.fixButton = new g("FIX"), this.weightButton = new g("weight"), this.attacherButton = new g("ATT"), this.clearButton = new g("CLEAR"), this.timeButton = new g("TIME"), this.configButton = new g("config"), this.reloadButton = new g("reload"), this.col1 = [
      X("1"),
      X("2"),
      X("3"),
      this.lineButton,
      this.moveButton,
      this.horvButton,
      this.sizeButton,
      this.dismemberButton,
      this.deleteButton,
      this.solveButton
    ], this.col2 = [
      X("4"),
      X("5"),
      X("6"),
      this.arcButton,
      this.eqButton,
      this.fixButton,
      this.weightButton,
      this.attacherButton,
      this.clearButton,
      this.timeButton
    ], this.col3 = [this.configButton, this.reloadButton], this.pencilClickInProgress = !1, this.drag = null, this.lastSnap = null, this.buttons.push(...this.col1, ...this.col2, ...this.col3);
  }
  onFrame() {
    !this.timeButton.isDown && this.solveButton.isDown && jt();
  }
  layOutButtons() {
    o().lefty ? (this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col1), this.layOutButtonColumn(innerWidth - 2 * o().tabletButtonWidth, this.col2), this.layOutButtonColumn(0, this.col3)) : (this.layOutButtonColumn(0, this.col1), this.layOutButtonColumn(o().tabletButtonWidth, this.col2), this.layOutButtonColumn(innerWidth - o().tabletButtonWidth, this.col3));
  }
  onPencilDown(n, t) {
    if (this.timeButton.isDown) {
      this.timeTravelTo(n, t);
      return;
    }
    c.moveToScreenPos(n), this.moveButton.isDown && this.move(), this.prepareHaptics();
  }
  onPencilMove(n, t) {
    if (this.timeButton.isDown) {
      this.timeTravelTo(n, t);
      return;
    }
    c.moveToScreenPos(n), this.snap();
    const e = { x: c.pos.x, y: c.pos.y };
    if (this.drag) {
      const i = e.x - this.drag.offset.x, s = e.y - this.drag.offset.y;
      this.drag.thing.moveBy(i - this.drag.thing.x, s - this.drag.thing.y);
    }
    !this.pencilClickInProgress && t > 3 && (this.pencilClickInProgress = !0, this.onPencilClick()), this.pencilClickInProgress && t < 1 && this.endDragEtc();
  }
  onPencilUp(n) {
    this.timeButton.isDown || (c.clearPos(), this.endDragEtc(), Xt(), qt());
  }
  timeTravelTo(n, t = 0) {
    Me(n), o().onionSkinAlpha = Math.min(t, 4) / 4 * 0.9;
  }
  // TODO: come up w/ a better name for this method
  endDragEtc() {
    var n;
    this.pencilClickInProgress = !1, ((n = this.drag) == null ? void 0 : n.thing) instanceof A && d().mergeAndAddImplicitConstraints(this.drag.thing), this.drag = null;
  }
  onPencilClick() {
    this.eqButton.isDown && se();
  }
  onButtonDown(n) {
    if (wn(n)) {
      c.pos ? (ee(n.label), this.move()) : Ft(n.label);
      return;
    }
    switch (n) {
      case this.clearButton:
        d().clear(), y.reset();
        break;
      case this.lineButton:
        Vt();
        break;
      case this.arcButton:
        Yt();
        break;
      case this.moveButton:
        this.move();
        break;
      case this.horvButton:
        Zt();
        break;
      case this.fixButton:
        Kt() || Gt();
        break;
      case this.sizeButton:
        te();
        break;
      case this.weightButton:
        Qt();
        break;
      case this.dismemberButton:
        ne();
        break;
      case this.attacherButton:
        ie();
        break;
      case this.deleteButton:
        Jt();
        break;
      case this.solveButton:
        Date.now() - n.lastDownTime < 200 && Nt();
        break;
      case this.timeButton:
        lt().updateRenderingInfo(), dt("top"), this.oldAutoSolveSetting = o().autoSolve, o().autoSolve = !1;
        break;
      case this.reloadButton:
        location.reload();
        break;
      case this.configButton:
        ce($e);
        break;
    }
  }
  onButtonUp(n) {
    switch (n) {
      case this.eqButton:
        St();
        break;
      case this.timeButton:
        dt("bottom"), o().autoSolve = this.oldAutoSolveSetting;
        break;
    }
  }
  onFingerDown(n, t) {
    super.onFingerDown(n, t), this.timeButton.isDown && t !== this.timeButton.fingerId && this.timeTravelTo(n);
  }
  onFingerUp(n, t) {
    this.timeButton.isDown && t !== this.timeButton.fingerId && this.timeTravelTo(n), super.onFingerUp(n, t);
  }
  onFingerMove(n, t) {
    if (this.timeButton.isDown) {
      t !== this.timeButton.fingerId && this.timeTravelTo(n);
      return;
    }
    if (d().isEmpty() || this.fingerScreenPositions.size > 2)
      return;
    const e = this.fingerScreenPositions.get(t);
    if (!e)
      return;
    super.onFingerMove(n, t);
    const i = y.fromScreenPosition(n), s = y.fromScreenPosition(e);
    if (c.pos || re(i.x - s.x, i.y - s.y), this.fingerScreenPositions.size !== 2)
      return;
    let a = null;
    for (const [v, Bt] of this.fingerScreenPositions.entries())
      if (v !== t) {
        a = Bt;
        break;
      }
    if (!a)
      throw new Error("bruh?!");
    const r = y.fromScreenPosition(a), h = S(r, s), x = S(r, i) / h, b = Math.atan2(s.y - r.y, s.x - r.x), p = Math.atan2(i.y - r.y, i.x - r.x);
    Te() && !this.drag && this.move(), !mt(x) && !c.pos && (y.scale *= x), ft(p - b);
  }
  move() {
    const n = Ut();
    if (n) {
      this.drag = { thing: n, offset: { x: 0, y: 0 } };
      return;
    }
    const t = st();
    t && (this.drag = { thing: t, offset: G(c.pos, t) });
  }
  snap() {
    var t;
    const n = c.snapPos((t = this.drag) == null ? void 0 : t.thing);
    n && n !== this.lastSnap && this.hapticBump(), this.lastSnap = n;
  }
  prepareHaptics() {
    ge("prepareHaptics");
  }
  hapticBump() {
    ge("hapticImpact");
  }
  render() {
    super.render(), this.timeButton.isDown && lt().render();
  }
}(), $e = new class extends He {
  constructor() {
    super(), this.leftyButton = new g("lefty"), this.lineWidthButton = new g("lwidth"), this.alphaButton = new g("opacity"), this.flickerButton = new g("flicker"), this.ctrlPtsButton = new g("ctrl pts"), this.defaultsButton = new g("defaults"), this.backButton = new g("back"), this.col1 = [
      this.leftyButton,
      this.lineWidthButton,
      this.alphaButton,
      this.flickerButton,
      this.ctrlPtsButton,
      this.defaultsButton
    ], this.col2 = [this.backButton], this.buttons.push(...this.col1, ...this.col2);
  }
  render() {
    super.render(), D(
      o().lefty ? "on" : "off",
      this.leftyButton.leftX + 2 * o().tabletButtonWidth,
      this.leftyButton.topY
    ), D(
      o().lineWidth.toFixed(2),
      this.lineWidthButton.leftX + 2 * o().tabletButtonWidth,
      this.lineWidthButton.topY,
      0.35 * we
    ), D(
      o().baseAlphaMultiplier.toFixed(2),
      this.alphaButton.leftX + 2 * o().tabletButtonWidth,
      this.alphaButton.topY,
      0.35 * we
    ), D(
      o().flicker ? "on" : "off",
      this.flickerButton.leftX + 2 * o().tabletButtonWidth,
      this.flickerButton.topY
    ), D(
      o().showControlPoints ? "on" : "off",
      this.ctrlPtsButton.leftX + 2 * o().tabletButtonWidth,
      this.ctrlPtsButton.topY
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
        Ye(), w("restored defaults!");
        break;
      case this.leftyButton:
        Y({ lefty: !o().lefty });
        break;
      case this.flickerButton:
        Y({ flicker: !o().flicker });
        break;
      case this.ctrlPtsButton:
        Y({ showControlPoints: !o().showControlPoints });
        break;
      case this.backButton:
        ce(Re);
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
      Y({ lineWidth: e });
    } else if (t === this.alphaButton.fingerId) {
      const e = Math.max(
        0.5,
        Math.min(o().baseAlphaMultiplier + (n.x - innerWidth / 2) / innerWidth, 2.5)
      );
      Y({ baseAlphaMultiplier: e });
    }
  }
}(), bn = () => T === $e, vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: xn,
  isInConfigScreen: bn,
  onFrame: gn,
  render: pn
}, Symbol.toStringTag, { value: "Module" }));
function Fe(n, t = 1) {
  const e = d(), i = [];
  return Ie(n, t, (s, a, r) => {
    const h = e.addInstance(s, { x: a, y: y.center.y }, s.size * r, 0);
    e.constraints.add(new bt(h, r));
    const m = i.at(-1);
    m && e.replaceHandle(h.attachers[0], m.attachers[1]), i.push(h);
  }), i;
}
function Sn(n, t = 1) {
  const e = Fe(n, t);
  for (const i of e) {
    const s = y.fromScreenPosition({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight
    });
    i.x = s.x, i.x = s.y;
  }
}
const Bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wanderingLetters: Sn,
  write: Fe
}, Symbol.toStringTag, { value: "Module" })), C = {};
let tt = !1, et = !1, B = null;
function En() {
  window.addEventListener("keydown", An), window.addEventListener("keyup", Mn), P.addEventListener("pointerdown", kn), P.addEventListener("pointermove", Cn), P.addEventListener("pointerup", In);
}
let j = !1, be;
function Pn() {
  C.t ? j || (j = !0, lt().updateRenderingInfo(), document.getElementById("canvas").style.cursor = "pointer", dt("top"), be = o().autoSolve, o().autoSolve = !1) : j && (j = !1, document.getElementById("canvas").style.cursor = "none", dt("bottom"), o().autoSolve = be), C[" "] && jt();
}
function _n() {
  j && lt().render();
}
function An(n) {
  if (C[n.key] = !0, "Digit0" <= n.code && n.code <= "Digit9") {
    const t = n.code.slice(5);
    C.Shift ? ee(t) : Ft(t);
    return;
  }
  switch (n.key) {
    case "f":
      Y({ flicker: !o().flicker });
      return;
    case "d":
      o().debug = !o().debug, w(`debug ${o().debug ? "on" : "off"}`);
      return;
    case "S":
      Nt();
      return;
  }
  if (!d().isEmpty())
    switch (n.key) {
      case "Backspace":
        Jt();
        break;
      case ".":
        Kt() || Gt();
        break;
      case "W":
        Qt();
        break;
      case "h":
        Zt();
        break;
      case "=":
        mt(1.05) || Wt(Math.min(y.scale + 0.1, 10));
        break;
      case "-":
        mt(0.95) || Wt(Math.max(y.scale - 0.1, 0.1));
        break;
      case "q":
        ft(5 * Math.PI / 180);
        break;
      case "w":
        ft(-5 * Math.PI / 180);
        break;
      case "s":
        te();
        break;
      case "A":
        ie();
        break;
      case "c":
        ze();
        break;
      case "D":
        ne();
        break;
    }
}
function Mn(n) {
  switch (delete C[n.key], n.key) {
    case "Meta":
      Xt(), et = !1, tt || c.clearPos();
      break;
    case "a":
      qt(), et = !1, tt || c.clearPos();
      break;
    case "e":
      St();
      break;
  }
}
function kn(n) {
  if (P.setPointerCapture(n.pointerId), n.preventDefault(), n.stopPropagation(), c.moveToScreenPos(n), c.snapPos(), tt = !0, C.Meta) {
    Vt(), et = !0;
    return;
  } else if (C.a) {
    Yt(), et = !0;
    return;
  } else if (C.e) {
    se();
    return;
  }
  B = null;
  const t = Ut();
  if (t) {
    B = { thing: t, offset: { x: 0, y: 0 } };
    return;
  }
  const e = st();
  e && (B = { thing: e, offset: G(c.pos, e) });
}
function Cn(n) {
  if (j) {
    Me(n);
    return;
  }
  if (n.metaKey || delete C.Meta, n.pointerType === "touch")
    return;
  const t = c.pos ? { x: c.pos.x, y: c.pos.y } : null;
  if (c.moveToScreenPos(n), tt && t && !d().isEmpty() && !et && !B) {
    re(c.pos.x - t.x, c.pos.y - t.y);
    return;
  }
  if (c.snapPos(B == null ? void 0 : B.thing), B) {
    const e = c.pos.x - B.offset.x, i = c.pos.y - B.offset.y;
    B.thing.moveBy(e - B.thing.x, i - B.thing.y);
  }
}
function In(n) {
  P.releasePointerCapture(n.pointerId), tt = !1, C.Meta || c.clearPos(), (B == null ? void 0 : B.thing) instanceof A && d().mergeAndAddImplicitConstraints(B.thing), B = null;
}
const Wn = () => !1, Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: En,
  isInConfigScreen: Wn,
  onFrame: Pn,
  render: _n
}, Symbol.toStringTag, { value: "Module" }));
Ue(document.getElementById("canvas"));
const ot = Dt() ? vn : Dn;
ot.init();
function Ve() {
  const n = ht();
  n.seal(), ot.onFrame(), De(), je(), ot.render(), ot.isInConfigScreen() ? Mt(0.25, () => Ct()) : Ct();
  const t = ht();
  t !== n && !t.hasWrites() && (n.disown(t), n.goInto()), requestAnimationFrame(Ve);
}
Ve();
window.app = dn;
window.demos = Bn;
