var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// constraints.js
var constraints_exports = {};
__export(constraints_exports, {
  Absorb: () => Absorb,
  Constant: () => Constant,
  Constraint: () => Constraint,
  Finger: () => Finger,
  Formula: () => Formula,
  LinearRelationship: () => LinearRelationship,
  Pin: () => Pin,
  PolarVector: () => PolarVector,
  Variable: () => Variable,
  Weight: () => Weight,
  absorb: () => absorb,
  constant: () => constant,
  equals: () => equals,
  finger: () => finger,
  formula: () => formula,
  linearRelationship: () => linearRelationship,
  pin: () => pin,
  polarVector: () => polarVector,
  solve: () => solve,
  variable: () => variable,
  weight: () => weight
});

// helpers.js
var TAU = Math.PI * 2;
function normalizeAngle(angle) {
  return (angle % TAU + TAU) % TAU;
}
var nextId = 0;
function generateId() {
  return nextId++;
}
function forDebugging(property, valueOrValueFn) {
  let value;
  if (typeof valueOrValueFn === "function") {
    const valueFn = valueOrValueFn;
    const oldValue = window[property];
    value = valueFn(oldValue);
  } else {
    value = valueOrValueFn;
  }
  window[property] = value;
}
var sets = {
  overlap(s1, s2) {
    for (const x of s1) {
      if (s2.has(x)) {
        return true;
      }
    }
    return false;
  },
  union(s1, s2) {
    return new Set([...s1, ...s2]);
  },
  map(s, fn) {
    return new Set([...s].map(fn));
  }
};

// lib/g9.js
function norm2(x) {
  return Math.sqrt(x.reduce((a, b) => a + b * b, 0));
}
function identity(n) {
  const ret = Array(n);
  for (let i = 0; i < n; i++) {
    ret[i] = Array(n);
    for (let j = 0; j < n; j++) {
      ret[i][j] = +(i == j);
    }
  }
  return ret;
}
function neg(x) {
  return x.map((a) => -a);
}
function dot(a, b) {
  if (typeof a[0] !== "number") {
    return a.map((x) => dot(x, b));
  }
  return a.reduce((x, y, i) => x + y * b[i], 0);
}
function sub(a, b) {
  if (typeof a[0] !== "number") {
    return a.map((c, i) => sub(c, b[i]));
  }
  return a.map((c, i) => c - b[i]);
}
function add(a, b) {
  if (typeof a[0] !== "number") {
    return a.map((c, i) => add(c, b[i]));
  }
  return a.map((c, i) => c + b[i]);
}
function div(a, b) {
  return a.map((c) => c.map((d) => d / b));
}
function mul(a, b) {
  if (typeof a[0] !== "number") {
    return a.map((c) => mul(c, b));
  }
  return a.map((c) => c * b);
}
function ten(a, b) {
  return a.map((c, i) => mul(b, c));
}
function gradient(f, x) {
  const dim = x.length, f1 = f(x);
  if (isNaN(f1)) {
    throw new Error("The gradient at [" + x.join(" ") + "] is NaN!");
  }
  const {max, abs, min} = Math;
  const tempX = x.slice(0), grad = Array(dim);
  for (let i = 0; i < dim; i++) {
    let delta = max(1e-6 * f1, 1e-8);
    for (let k = 0; ; k++) {
      if (k == 20) {
        throw new Error("Gradient failed at index " + i + " of [" + x.join(" ") + "]");
      }
      tempX[i] = x[i] + delta;
      const f0 = f(tempX);
      tempX[i] = x[i] - delta;
      const f2 = f(tempX);
      tempX[i] = x[i];
      if (!(isNaN(f0) || isNaN(f2))) {
        grad[i] = (f0 - f2) / (2 * delta);
        const t0 = x[i] - delta;
        const t1 = x[i];
        const t2 = x[i] + delta;
        const d1 = (f0 - f1) / delta;
        const d2 = (f1 - f2) / delta;
        const err = min(max(abs(d1 - grad[i]), abs(d2 - grad[i]), abs(d1 - d2)), delta);
        const normalize = max(abs(grad[i]), abs(f0), abs(f1), abs(f2), abs(t0), abs(t1), abs(t2), 1e-8);
        if (err / normalize < 1e-3) {
          break;
        }
      }
      delta /= 16;
    }
  }
  return grad;
}
function minimize(f, x0, maxit = 1e3, tol = 1e-8, end_on_line_search = false) {
  tol = Math.max(tol, 2e-16);
  const grad = (a) => gradient(f, a);
  x0 = x0.slice(0);
  let g0 = grad(x0);
  let f0 = f(x0);
  if (isNaN(f0)) {
    throw new Error("minimize: f(x0) is a NaN!");
  }
  const n = x0.length;
  let H1 = identity(n);
  for (var it = 0; it < maxit; it++) {
    if (!g0.every(isFinite)) {
      var msg = "Gradient has Infinity or NaN";
      break;
    }
    const step = neg(dot(H1, g0));
    if (!step.every(isFinite)) {
      var msg = "Search direction has Infinity or NaN";
      break;
    }
    const nstep = norm2(step);
    if (nstep < tol) {
      var msg = "Newton step smaller than tol";
      break;
    }
    let t = 1;
    const df0 = dot(g0, step);
    let x1 = x0;
    var s;
    for (; it < maxit && t * nstep >= tol; it++) {
      s = mul(step, t);
      x1 = add(x0, s);
      var f1 = f(x1);
      if (!(f1 - f0 >= 0.1 * t * df0 || isNaN(f1))) {
        break;
      }
      t *= 0.5;
    }
    if (t * nstep < tol && end_on_line_search) {
      var msg = "Line search step size smaller than tol";
      break;
    }
    if (it === maxit) {
      var msg = "maxit reached during line search";
      break;
    }
    const g1 = grad(x1);
    const y = sub(g1, g0);
    const ys = dot(y, s);
    const Hy = dot(H1, y);
    H1 = sub(add(H1, mul(ten(s, s), (ys + dot(y, Hy)) / (ys * ys))), div(add(ten(Hy, s), ten(s, Hy)), ys));
    x0 = x1;
    f0 = f1;
    g0 = g1;
  }
  return {
    solution: x0,
    f: f0,
    gradient: g0,
    invHessian: H1,
    iterations: it,
    message: msg
  };
}

// lib/vec.js
var isZero = (v) => Number.EPSILON > Math.abs(v);
var roundTo = (input, precision) => {
  const p = 1 / precision;
  return Math.round(input * p) / p;
};
var Vec = (x = 0, y = 0) => ({x, y});
var vec_default = Vec;
Vec.clone = (v) => Vec(v.x, v.y);
Vec.fromRectXY = (r) => Vec(r.x, r.y);
Vec.fromRectWH = (r) => Vec(r.w, r.h);
Vec.fromRectRB = (r) => Vec(r.x + r.w, r.y + r.h);
Vec.of = (s) => Vec(s, s);
Vec.random = (scale = 1) => Vec.Smul(scale, Vec.complement(Vec.Smul(2, Vec(Math.random(), Math.random()))));
Vec.toA = (v) => [v.x, v.y];
Vec.polar = (angle, length) => Vec(length * Math.cos(angle), length * Math.sin(angle));
Vec.x = Object.freeze(Vec(1));
Vec.y = Object.freeze(Vec(0, 1));
Vec.zero = Object.freeze(Vec());
Vec.map = (f, v) => Vec(f(v.x), f(v.y));
Vec.map2 = (f, a, b) => Vec(f(a.x, b.x), f(a.y, b.y));
Vec.reduce = (f, v) => f(v.x, v.y);
Vec.cross = (a, b) => a.x * b.y - a.y * b.x;
Vec.project = (a, b) => Vec.mulS(b, Vec.dot(a, b) / Vec.len2(b));
Vec.reject = (a, b) => Vec.sub(a, Vec.project(a, b));
Vec.scalarProjection = (p, a, b) => {
  const ap = Vec.sub(p, a);
  const ab = Vec.normalize(Vec.sub(b, a));
  const f = Vec.mulS(ab, Vec.dot(ap, ab));
  return Vec.add(a, f);
};
Vec.add = (a, b) => Vec(a.x + b.x, a.y + b.y);
Vec.div = (a, b) => Vec(a.x / b.x, a.y / b.y);
Vec.mul = (a, b) => Vec(a.x * b.x, a.y * b.y);
Vec.sub = (a, b) => Vec(a.x - b.x, a.y - b.y);
Vec.addS = (v, s) => Vec.add(v, Vec.of(s));
Vec.divS = (v, s) => Vec.div(v, Vec.of(s));
Vec.mulS = (v, s) => Vec.mul(v, Vec.of(s));
Vec.subS = (v, s) => Vec.sub(v, Vec.of(s));
Vec.Sadd = (s, v) => Vec.add(Vec.of(s), v);
Vec.Sdiv = (s, v) => Vec.div(Vec.of(s), v);
Vec.Smul = (s, v) => Vec.mul(Vec.of(s), v);
Vec.Ssub = (s, v) => Vec.sub(Vec.of(s), v);
Vec.dist = (a, b) => Vec.len(Vec.sub(a, b));
Vec.dist2 = (a, b) => Vec.len2(Vec.sub(a, b));
Vec.dot = (a, b) => a.x * b.x + a.y * b.y;
Vec.equal = (a, b) => isZero(Vec.dist2(a, b));
Vec.len2 = (v) => Vec.dot(v, v);
Vec.len = (v) => Math.sqrt(Vec.dot(v, v));
Vec.ceil = (v) => Vec.map(Math.ceil, v);
Vec.floor = (v) => Vec.map(Math.floor, v);
Vec.round = (v) => Vec.map(Math.round, v);
Vec.roundTo = (v, s) => Vec.map2(roundTo, v, Vec.of(s));
Vec.complement = (v) => Vec.Ssub(1, v);
Vec.half = (v) => Vec.divS(v, 2);
Vec.normalize = (v) => Vec.divS(v, Vec.len(v));
Vec.recip = (v) => Vec.Sdiv(1, v);
Vec.renormalize = (v, length) => Vec.Smul(length, Vec.normalize(v));
Vec.avg = (a, b) => Vec.half(Vec.add(a, b));
Vec.lerp = (a, b, t) => Vec.add(a, Vec.Smul(t, Vec.sub(b, a)));
Vec.max = (a, b) => Vec.map2(Math.max, a, b);
Vec.min = (a, b) => Vec.map2(Math.min, a, b);
Vec.abs = (v) => Vec.map(Math.abs, v);
Vec.invert = (v) => Vec(-v.x, -v.y);
Vec.invertX = (v) => Vec(-v.x, v.y);
Vec.invertY = (v) => Vec(v.x, -v.y);
Vec.rotate90CW = (v) => Vec(v.y, -v.x);
Vec.rotate90CCW = (v) => Vec(-v.y, v.x);
Vec.rotate = (v, angle) => Vec(v.x * Math.cos(angle) - v.y * Math.sin(angle), v.x * Math.sin(angle) + v.y * Math.cos(angle));
Vec.rotateAround = (vector, point, angle) => {
  const translatedVector = Vec.sub(vector, point);
  const rotatedVector = Vec.rotate(translatedVector, angle);
  return Vec.add(rotatedVector, point);
};
Vec.angle = (v) => Math.atan2(v.y, v.x);
Vec.angleBetween = (a, b) => {
  const dotProduct = Vec.dot(a, b);
  const magnitudeA = Vec.len(a);
  const magnitudeB = Vec.len(b);
  const angleInRadians = Math.acos(dotProduct / (magnitudeA * magnitudeB));
  return angleInRadians;
};
Vec.angleBetweenClockwise = (a, b) => {
  const dP = Vec.dot(a, b);
  const cP = Vec.cross(a, b);
  const angleInRadians = Math.atan2(cP, dP);
  return angleInRadians;
};
Vec.update = (dest, src) => {
  dest.x = src.x;
  dest.y = src.y;
};

// constraints.js
var _Variable = class {
  constructor(_value = 0, represents) {
    this._value = _value;
    this.id = generateId();
    this.info = {
      isCanonical: true,
      absorbedVariables: new Set()
    };
    this.isScrubbing = false;
    this.represents = represents;
    _Variable.all.add(this);
  }
  static create(value = 0, represents) {
    return new _Variable(value, represents);
  }
  remove() {
    if (!_Variable.all.has(this)) {
      return;
    }
    _Variable.all.delete(this);
    for (const constraint of Constraint.all) {
      if (constraint.variables.includes(this)) {
        constraint.remove();
      }
    }
  }
  get isCanonicalInstance() {
    return this.info.isCanonical;
  }
  get canonicalInstance() {
    return this.info.isCanonical ? this : this.info.canonicalInstance;
  }
  get offset() {
    return this.info.isCanonical ? {m: 1, b: 0} : this.info.offset;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this.info.isCanonical) {
      this._value = newValue;
      for (const that of this.info.absorbedVariables) {
        const {m, b} = that.info.offset;
        that._value = (newValue - b) / m;
      }
    } else {
      this.info.canonicalInstance.value = this.toCanonicalValue(newValue);
    }
  }
  toCanonicalValue(value) {
    if (this.info.isCanonical) {
      return value;
    }
    const {m, b} = this.info.offset;
    return m * value + b;
  }
  makeEqualTo(that, offset = {m: 1, b: 0}) {
    if (this === that) {
      return;
    } else if (!this.info.isCanonical) {
      const {m: mThat, b: bThat} = offset;
      const {m: mThis, b: bThis} = this.offset;
      this.canonicalInstance.makeEqualTo(that, {
        m: mThis * mThat,
        b: mThis * bThat + bThis
      });
      return;
    } else if (!that.info.isCanonical) {
      const {m: mThat, b: bThat} = that.offset;
      const {m, b} = offset;
      this.makeEqualTo(that.canonicalInstance, {
        m: m / mThat,
        b: b - bThat / mThat
      });
      return;
    }
    const thatLockConstraint = that.lockConstraint;
    for (const otherVariable of that.info.absorbedVariables) {
      const otherVariableInfo = otherVariable.info;
      otherVariableInfo.canonicalInstance = this;
      otherVariableInfo.offset = {
        m: offset.m * otherVariableInfo.offset.m,
        b: offset.m * otherVariableInfo.offset.b + offset.b
      };
      this.info.absorbedVariables.add(otherVariable);
    }
    that.info = {
      isCanonical: false,
      canonicalInstance: this,
      offset
    };
    this.info.absorbedVariables.add(that);
    this.value = this.value;
    if (thatLockConstraint || this.isLocked) {
      this.lock();
    } else {
      this.unlock();
    }
  }
  promoteToCanonical() {
    if (this.info.isCanonical) {
    } else {
      this.info.canonicalInstance.breakOff(this);
    }
  }
  breakOff(that) {
    if (!this.info.isCanonical) {
      throw new Error("Handle.breakOff() called on absorbed variable");
    }
    if (!this.info.absorbedVariables.has(that)) {
      throw new Error("cannot break off a variable that has not been absorbed");
    }
    this.info.absorbedVariables.delete(that);
    that.info = {isCanonical: true, absorbedVariables: new Set()};
    if (this.isLocked) {
      that.lock();
    }
    forgetClustersForSolver();
  }
  get lockConstraint() {
    for (const c of Constraint.all) {
      if (c instanceof Constant && c.variable === this.canonicalInstance) {
        return c;
      }
    }
    return null;
  }
  get isLocked() {
    return !!this.lockConstraint;
  }
  lock(value, scrub = false) {
    if (!this.info.isCanonical) {
      this.canonicalInstance.lock(value !== void 0 ? this.toCanonicalValue(value) : void 0, scrub);
      return;
    }
    if (value !== void 0) {
      this.value = value;
    }
    for (const variable2 of [this, ...this.info.absorbedVariables]) {
      constant(variable2);
      variable2.isScrubbing = scrub;
    }
  }
  unlock() {
    if (!this.info.isCanonical) {
      this.canonicalInstance.unlock();
      return;
    }
    for (const variable2 of [this, ...this.info.absorbedVariables]) {
      constant(variable2).remove();
      variable2.isScrubbing = false;
    }
  }
  toggleLock() {
    if (this.isLocked) {
      this.unlock();
    } else {
      this.lock();
    }
  }
  equals(that) {
    return this.canonicalInstance === that && this.offset.m === 1 && this.offset.b === 0 || that.canonicalInstance === this && that.offset.m === 1 && that.offset.b === 0 || this.canonicalInstance === that.canonicalInstance && this.offset.m === that.offset.m && this.offset.b === that.offset.b;
  }
  hasLinearRelationshipWith(that) {
    return this.canonicalInstance === that.canonicalInstance;
  }
};
var Variable = _Variable;
Variable.all = new Set();
var variable = Variable.create;
var LowLevelConstraint = class {
  constructor() {
    this.variables = [];
    this.ownVariables = new Set();
  }
  propagateKnowns(knowns) {
  }
};
var LLFinger = class extends LowLevelConstraint {
  constructor(constraint) {
    super();
    this.constraint = constraint;
    this.variables.push(constraint.handle.xVariable, constraint.handle.yVariable);
  }
  addTo(constraints2) {
    constraints2.push(this);
  }
  getError([x, y], knowns, freeVariables) {
    return 10 * Math.sqrt(vec_default.dist({x, y}, this.constraint.position));
  }
};
var LLDistance = class extends LowLevelConstraint {
  constructor(constraint, a, b) {
    super();
    this.a = a;
    this.b = b;
    this.variables.push(variable(vec_default.dist(a, b), {
      object: constraint,
      property: "distance"
    }), a.xVariable, a.yVariable, b.xVariable, b.yVariable);
    this.ownVariables.add(this.distance);
  }
  get distance() {
    return this.variables[0];
  }
  addTo(constraints2) {
    for (const that of constraints2) {
      if (that instanceof LLDistance && (this.a.equals(that.a) && this.b.equals(that.b) || this.a.equals(that.b) && this.b.equals(that.a))) {
        that.distance.makeEqualTo(this.distance);
        return;
      }
    }
    constraints2.push(this);
  }
  propagateKnowns(knowns) {
    if (!knowns.has(this.distance.canonicalInstance) && knowns.has(this.a.xVariable.canonicalInstance) && knowns.has(this.a.yVariable.canonicalInstance) && knowns.has(this.b.xVariable.canonicalInstance) && knowns.has(this.b.yVariable.canonicalInstance)) {
      this.distance.value = vec_default.dist(this.a, this.b);
      knowns.add(this.distance.canonicalInstance);
    }
  }
  getError([dist, ax, ay, bx, by], knowns, freeVariables) {
    const aPos = {x: ax, y: ay};
    const bPos = {x: bx, y: by};
    const currDist = vec_default.dist(aPos, bPos);
    if (freeVariables.has(this.distance.canonicalInstance)) {
      this.distance.value = currDist;
    }
    return currDist - dist;
  }
};
var LLAngle = class extends LowLevelConstraint {
  constructor(constraint, a, b) {
    super();
    this.a = a;
    this.b = b;
    this.variables.push(variable(vec_default.angle(vec_default.sub(b, a)), {
      object: constraint,
      property: "angle"
    }), a.xVariable, a.yVariable, b.xVariable, b.yVariable);
    this.ownVariables.add(this.angle);
  }
  get angle() {
    return this.variables[0];
  }
  addTo(constraints2) {
    for (const that of constraints2) {
      if (!(that instanceof LLAngle)) {
        continue;
      } else if (this.a.equals(that.a) && this.b.equals(that.b)) {
        that.angle.makeEqualTo(this.angle);
        return;
      } else if (this.a.equals(that.b) && this.b.equals(that.a)) {
        that.angle.makeEqualTo(this.angle, {m: 1, b: Math.PI});
        return;
      }
    }
    constraints2.push(this);
  }
  propagateKnowns(knowns) {
    if (!knowns.has(this.angle) && knowns.has(this.a.xVariable.canonicalInstance) && knowns.has(this.a.yVariable.canonicalInstance) && knowns.has(this.b.xVariable.canonicalInstance) && knowns.has(this.b.yVariable.canonicalInstance)) {
      this.angle.value = LLAngle.computeAngle(this.angle, this.a, this.b);
      knowns.add(this.angle.canonicalInstance);
    }
  }
  getError([angle, ax, ay, bx, by], knowns, freeVariables) {
    const aPos = {x: ax, y: ay};
    const bPos = {x: bx, y: by};
    if (freeVariables.has(this.angle.canonicalInstance)) {
      this.angle.value = LLAngle.computeAngle(this.angle, aPos, bPos);
      return 0;
    }
    const r = vec_default.dist(bPos, aPos);
    let error = Infinity;
    if (!knowns.has(this.b.xVariable.canonicalInstance) && !knowns.has(this.b.yVariable.canonicalInstance)) {
      const x = ax + r * Math.cos(angle);
      const y = ay + r * Math.sin(angle);
      error = Math.min(error, vec_default.dist(bPos, {x, y}));
    } else if (!knowns.has(this.b.xVariable.canonicalInstance)) {
      const x = ax + (by - ay) / Math.tan(angle);
      error = Math.min(error, Math.abs(x - bx));
    } else if (!knowns.has(this.b.yVariable.canonicalInstance)) {
      const y = ay + (bx - ax) * Math.tan(angle);
      error = Math.min(error, Math.abs(y - by));
    }
    if (!knowns.has(this.a.xVariable.canonicalInstance) && !knowns.has(this.a.yVariable.canonicalInstance)) {
      const x = bx + r * Math.cos(angle + Math.PI);
      const y = by + r * Math.sin(angle + Math.PI);
      error = Math.min(error, vec_default.dist(aPos, {x, y}));
    } else if (!knowns.has(this.a.xVariable.canonicalInstance)) {
      const x = bx + (ay - by) / Math.tan(angle + Math.PI);
      error = Math.min(error, Math.abs(x - ax));
    } else if (!knowns.has(this.a.yVariable.canonicalInstance)) {
      const y = by + (ax - bx) * Math.tan(angle + Math.PI);
      error = Math.min(error, Math.abs(y - ay));
    }
    if (!Number.isFinite(error)) {
      error = Math.min(vec_default.dist(bPos, {
        x: ax + r * Math.cos(angle),
        y: ay + r * Math.sin(angle)
      }), vec_default.dist(aPos, {
        x: bx + r * Math.cos(angle + Math.PI),
        y: by + r * Math.sin(angle + Math.PI)
      }));
    }
    return error;
  }
  static computeAngle(angleVar, aPos, bPos) {
    const currAngle = normalizeAngle(angleVar.value);
    const newAngle = normalizeAngle(vec_default.angle(vec_default.sub(bPos, aPos)));
    let diff = normalizeAngle(newAngle - currAngle);
    if (diff > Math.PI) {
      diff -= TAU;
    }
    return angleVar.value + diff;
  }
};
var LLFormula = class extends LowLevelConstraint {
  constructor(constraint, args, fn) {
    super();
    this.args = args;
    this.fn = fn;
    this.result = variable(this.computeResult(), {
      object: constraint,
      property: "result"
    });
    this.variables.push(...args, this.result);
    this.ownVariables.add(this.result);
  }
  addTo(constraints2) {
    constraints2.push(this);
  }
  propagateKnowns(knowns) {
    if (!knowns.has(this.result.canonicalInstance) && this.args.every((arg) => knowns.has(arg.canonicalInstance))) {
      this.result.value = this.computeResult();
      knowns.add(this.result.canonicalInstance);
    }
  }
  getError(variableValues, knowns, freeVariables) {
    const currValue = this.computeResult(variableValues);
    if (freeVariables.has(this.result.canonicalInstance)) {
      this.result.value = currValue;
    }
    return currValue - this.result.value;
  }
  computeResult(xs = this.args.map((arg) => arg.value)) {
    return this.fn(xs);
  }
};
var LLWeight = class extends LowLevelConstraint {
  constructor(constraint) {
    super();
    this.constraint = constraint;
    this.weight = variable(0, {
      object: constraint,
      property: "weight"
    });
    this.ownVariables.add(this.weight);
    this.variables.push(this.weight, constraint.handle.xVariable, constraint.handle.yVariable);
  }
  addTo(constraints2) {
    constraints2.push(this);
  }
  getError([w, hx, hy], knowns, freeVariables) {
    const {x: origX, y: origY} = this.constraint.handle;
    return vec_default.dist({
      x: hx,
      y: hy
    }, {
      x: origX,
      y: origY + w
    });
  }
};
var _Constraint = class {
  constructor() {
    this._paused = false;
    this.variables = [];
    this.lowLevelConstraints = [];
    _Constraint.all.add(this);
    forgetClustersForSolver();
  }
  get paused() {
    return this._paused;
  }
  set paused(newValue) {
    if (newValue !== this._paused) {
      this._paused = newValue;
      forgetClustersForSolver();
    }
  }
  setUpVariableRelationships() {
  }
  propagateKnowns(knowns) {
    for (const llc of this.lowLevelConstraints) {
      llc.propagateKnowns(knowns);
    }
  }
  getManipulationSet() {
    return new Set(this.variables.map((v) => v.canonicalInstance));
  }
  remove() {
    if (!_Constraint.all.has(this)) {
      return;
    }
    _Constraint.all.delete(this);
    for (const llc of this.lowLevelConstraints) {
      for (const v of llc.ownVariables) {
        v.remove();
      }
    }
    forgetClustersForSolver();
  }
};
var Constraint = _Constraint;
Constraint.all = new Set();
var _Constant = class extends Constraint {
  constructor(variable2, value) {
    super();
    this.variable = variable2;
    this.value = value;
    this.variables.push(variable2);
  }
  static create(variable2, value = variable2.value) {
    let constant2 = _Constant.memo.get(variable2);
    if (constant2) {
      constant2.value = value;
    } else {
      constant2 = new _Constant(variable2, value);
      _Constant.memo.set(variable2, constant2);
    }
    return constant2;
  }
  propagateKnowns(knowns) {
    if (!knowns.has(this.variable.canonicalInstance)) {
      this.variable.value = this.value;
      knowns.add(this.variable.canonicalInstance);
    }
    super.propagateKnowns(knowns);
  }
  remove() {
    _Constant.memo.delete(this.variable);
    super.remove();
  }
};
var Constant = _Constant;
Constant.memo = new Map();
var constant = Constant.create;
var _Pin = class extends Constraint {
  constructor(handle, position) {
    super();
    this.handle = handle;
    this.position = position;
    this.variables.push(handle.xVariable, handle.yVariable);
  }
  static create(handle, position = handle) {
    let pin2 = _Pin.memo.get(handle);
    if (pin2) {
      pin2.position = position;
    } else {
      pin2 = new _Pin(handle, position);
      _Pin.memo.set(handle, pin2);
    }
    return pin2;
  }
  propagateKnowns(knowns) {
    const {xVariable: x, yVariable: y} = this.handle;
    if (!knowns.has(x.canonicalInstance) || !knowns.has(y.canonicalInstance)) {
      ({x: x.value, y: y.value} = this.position);
      knowns.add(x.canonicalInstance);
      knowns.add(y.canonicalInstance);
    }
    super.propagateKnowns(knowns);
  }
  remove() {
    _Pin.memo.delete(this.handle);
    super.remove();
  }
};
var Pin = _Pin;
Pin.memo = new Map();
var pin = Pin.create;
var _Finger = class extends Constraint {
  constructor(handle, position) {
    super();
    this.handle = handle;
    this.position = position;
    const fc = new LLFinger(this);
    this.lowLevelConstraints.push(fc);
    this.variables.push(handle.xVariable, handle.yVariable);
  }
  static create(handle, position = handle) {
    let finger2 = _Finger.memo.get(handle);
    if (finger2) {
      finger2.position = position;
    } else {
      finger2 = new _Finger(handle, position);
      _Finger.memo.set(handle, finger2);
    }
    return finger2;
  }
  remove() {
    _Finger.memo.delete(this.handle);
    super.remove();
  }
};
var Finger = _Finger;
Finger.memo = new Map();
var finger = Finger.create;
var _LinearRelationship = class extends Constraint {
  constructor(y, m, x, b) {
    super();
    this.y = y;
    this.m = m;
    this.x = x;
    this.b = b;
    this.variables.push(y, x);
  }
  static create(y, m, x, b) {
    if (m === 0) {
      throw new Error("tried to create a linear relationship w/ m = 0");
    }
    let lr = _LinearRelationship.memo.get(y)?.get(x);
    if (lr) {
      lr.m = m;
      lr.b = b;
      return lr;
    }
    lr = _LinearRelationship.memo.get(x)?.get(y);
    if (lr) {
      lr.m = 1 / m;
      lr.b = -b / m;
      return lr;
    }
    lr = new _LinearRelationship(y, m, x, b);
    if (!_LinearRelationship.memo.has(y)) {
      _LinearRelationship.memo.set(y, new Map());
    }
    _LinearRelationship.memo.get(y).set(x, lr);
    return lr;
  }
  setUpVariableRelationships() {
    this.y.makeEqualTo(this.x, {m: this.m, b: this.b});
  }
  remove() {
    const yDict = _LinearRelationship.memo.get(this.y);
    if (yDict) {
      yDict.delete(this.x);
      if (yDict.size === 0) {
        _LinearRelationship.memo.delete(this.y);
      }
    }
    const xDict = _LinearRelationship.memo.get(this.x);
    if (xDict) {
      xDict.delete(this.y);
      if (xDict.size === 0) {
        _LinearRelationship.memo.delete(this.x);
      }
    }
    super.remove();
  }
};
var LinearRelationship = _LinearRelationship;
LinearRelationship.memo = new Map();
var linearRelationship = LinearRelationship.create;
var equals = (x, y) => linearRelationship(y, 1, x, 0);
var _Absorb = class extends Constraint {
  constructor(parent, child) {
    super();
    this.parent = parent;
    this.child = child;
    this.variables.push(parent.xVariable, parent.yVariable, child.xVariable, child.yVariable);
  }
  static create(parent, child) {
    if (_Absorb.memo.has(child)) {
      _Absorb.memo.get(child).remove();
    }
    const a = new _Absorb(parent, child);
    _Absorb.memo.set(child, a);
    return a;
  }
  setUpVariableRelationships() {
    this.parent.xVariable.makeEqualTo(this.child.xVariable);
    this.parent.yVariable.makeEqualTo(this.child.yVariable);
    this.parent._absorb(this.child);
  }
  remove() {
    _Absorb.memo.delete(this.child);
    super.remove();
  }
};
var Absorb = _Absorb;
Absorb.memo = new Map();
var absorb = Absorb.create;
var _PolarVector = class extends Constraint {
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
    const dc = new LLDistance(this, a, b);
    this.lowLevelConstraints.push(dc);
    this.distance = dc.distance;
    const ac = new LLAngle(this, a, b);
    this.lowLevelConstraints.push(ac);
    this.angle = ac.angle;
    this.variables.push(a.xVariable, a.yVariable, b.xVariable, b.yVariable, this.distance, this.angle);
  }
  static create(a, b) {
    let pv = _PolarVector.memo.get(a)?.get(b);
    if (pv) {
      return pv;
    }
    pv = new _PolarVector(a, b);
    if (!_PolarVector.memo.get(a)) {
      _PolarVector.memo.set(a, new Map());
    }
    _PolarVector.memo.get(a).set(b, pv);
    return pv;
  }
  remove() {
    const aDict = _PolarVector.memo.get(this.a);
    aDict.delete(this.b);
    if (aDict.size === 0) {
      _PolarVector.memo.delete(this.a);
    }
    super.remove();
  }
};
var PolarVector = _PolarVector;
PolarVector.memo = new Map();
var polarVector = PolarVector.create;
var Formula = class extends Constraint {
  static create(args, fn) {
    return new Formula(args, fn);
  }
  constructor(args, fn) {
    super();
    const fc = new LLFormula(this, args, fn);
    this.lowLevelConstraints.push(fc);
    this.result = fc.result;
    this.variables.push(...args, this.result);
  }
};
var formula = Formula.create;
var Weight = class extends Constraint {
  constructor(handle) {
    super();
    this.handle = handle;
    const w = new LLWeight(this);
    this.lowLevelConstraints.push(w);
    this.weight = w.weight;
    this.variables.push(handle.xVariable, handle.yVariable, this.weight);
  }
  static create(handle, value) {
    const w = new Weight(handle);
    w.weight.lock(value);
    return w;
  }
};
var weight = Weight.create;
var clustersForSolver = null;
function getClustersForSolver() {
  if (clustersForSolver) {
    return clustersForSolver;
  }
  for (const handle of Handle_default.all) {
    handle._forgetAbsorbedHandles();
  }
  for (const variable2 of Variable.all) {
    variable2.info = {isCanonical: true, absorbedVariables: new Set()};
  }
  const activeConstraints = [...Constraint.all].filter((constraint) => !constraint.paused);
  for (const constraint of activeConstraints) {
    constraint.setUpVariableRelationships();
  }
  clustersForSolver = computeClusters(activeConstraints);
  forDebugging("clusters", clustersForSolver);
  return clustersForSolver;
}
function computeClusters(activeConstraints) {
  const clusters = new Set();
  for (const constraint of activeConstraints) {
    const constraints2 = [constraint];
    const lowLevelConstraints = [...constraint.lowLevelConstraints];
    let manipulationSet = constraint.getManipulationSet();
    for (const cluster of clusters) {
      if (!sets.overlap(cluster.manipulationSet, manipulationSet)) {
        continue;
      }
      constraints2.push(...cluster.constraints);
      for (const llc of cluster.lowLevelConstraints) {
        llc.addTo(lowLevelConstraints);
      }
      manipulationSet = new Set([...manipulationSet, ...cluster.manipulationSet].map((v) => v.canonicalInstance));
      clusters.delete(cluster);
    }
    clusters.add({constraints: constraints2, lowLevelConstraints, manipulationSet});
  }
  return sets.map(clusters, ({constraints: constraints2, lowLevelConstraints}) => createClusterForSolver(constraints2, lowLevelConstraints));
}
function createClusterForSolver(constraints2, lowLevelConstraints) {
  const knowns = computeKnowns(constraints2, lowLevelConstraints);
  const variables = new Set();
  for (const constraint of constraints2) {
    for (const variable2 of constraint.variables) {
      if (!knowns.has(variable2.canonicalInstance)) {
        variables.add(variable2.canonicalInstance);
      }
    }
  }
  const freeVariableCandidates = new Set();
  for (const llc of lowLevelConstraints) {
    for (const variable2 of llc.ownVariables) {
      if (!knowns.has(variable2.canonicalInstance)) {
        freeVariableCandidates.add(variable2.canonicalInstance);
      }
    }
  }
  const freeVarCandidateCounts = new Map();
  for (const llc of lowLevelConstraints) {
    for (const variable2 of llc.variables) {
      if (!freeVariableCandidates.has(variable2.canonicalInstance)) {
        continue;
      }
      const n = freeVarCandidateCounts.get(variable2.canonicalInstance) ?? 0;
      freeVarCandidateCounts.set(variable2.canonicalInstance, n + 1);
    }
  }
  const freeVariables = new Set();
  for (const [variable2, count] of freeVarCandidateCounts.entries()) {
    if (count === 1) {
      freeVariables.add(variable2.canonicalInstance);
    }
  }
  return {
    constraints: constraints2,
    lowLevelConstraints,
    variables: Array.from(variables),
    freeVariables,
    parameters: [...variables].filter((v) => v.isCanonicalInstance && !knowns.has(v) && !freeVariables.has(v))
  };
}
function forgetClustersForSolver() {
  clustersForSolver = null;
}
function solve(maxIterations = 1e3) {
  const clusters = getClustersForSolver();
  for (const cluster of clusters) {
    solveCluster(cluster, maxIterations);
  }
}
function solveCluster(cluster, maxIterations) {
  const {constraints: constraints2, lowLevelConstraints} = cluster;
  let {freeVariables, parameters} = cluster;
  if (constraints2.length === 0) {
    return;
  }
  const handleToFinger = getHandleToFingerMap(constraints2);
  for (const pv of constraints2) {
    if (!(pv instanceof PolarVector)) {
      continue;
    }
    const aFinger = handleToFinger.get(pv.a.canonicalInstance);
    const bFinger = handleToFinger.get(pv.b.canonicalInstance);
    if (aFinger && bFinger) {
      for (const k of constraints2) {
        if (!(k instanceof Constant)) {
          continue;
        }
        if (k.variable.hasLinearRelationshipWith(pv.distance)) {
          pv.distance.value = vec_default.dist(aFinger.position, bFinger.position);
          k.value = k.variable.value;
        }
        if (k.variable.hasLinearRelationshipWith(pv.angle)) {
          pv.angle.value = LLAngle.computeAngle(pv.angle, aFinger.position, bFinger.position);
          k.value = k.variable.value;
        }
      }
    }
  }
  const knowns = computeKnowns(constraints2, lowLevelConstraints);
  let gizmoHack = false;
  for (const pv of constraints2) {
    if (pv instanceof PolarVector && pv.angle.isScrubbing && freeVariables.has(pv.distance.canonicalInstance)) {
      gizmoHack = true;
      knowns.add(pv.distance.canonicalInstance);
    }
  }
  if (gizmoHack) {
    freeVariables = new Set([...freeVariables].filter((fv) => !knowns.has(fv.canonicalInstance)));
    parameters = parameters.filter((v) => !knowns.has(v));
  }
  const inputs = [];
  const paramIdx = new Map();
  for (const param of parameters) {
    if (param.isCanonicalInstance && !knowns.has(param) && !freeVariables.has(param)) {
      paramIdx.set(param, inputs.length);
      inputs.push(param.value);
    }
  }
  function computeTotalError(currState) {
    let error = 0;
    for (const llc of lowLevelConstraints) {
      const values = llc.variables.map((variable2) => {
        const {m, b} = variable2.offset;
        variable2 = variable2.canonicalInstance;
        const pi = paramIdx.get(variable2);
        return ((pi === void 0 ? variable2.value : currState[pi]) - b) / m;
      });
      error += Math.pow(llc.getError(values, knowns, freeVariables), 2);
    }
    return error;
  }
  if (inputs.length === 0) {
    computeTotalError(inputs);
    return;
  }
  let result;
  try {
    result = minimize(computeTotalError, inputs, maxIterations, 1e-3);
  } catch (e) {
    console.log("minimizeError threw", e, "while working on cluster", cluster, "with knowns", knowns);
    throw e;
  }
  forDebugging("solverResult", result);
  forDebugging("solverResultMessages", (messages) => {
    if (!messages) {
      messages = new Set();
    }
    messages.add(result.message);
    return messages;
  });
  const outputs = result.solution;
  for (const param of parameters) {
    param.value = outputs.shift();
  }
}
function computeKnowns(constraints2, lowLevelConstraints) {
  const knowns = new Set();
  while (true) {
    const oldNumKnowns = knowns.size;
    for (const constraint of constraints2) {
      constraint.propagateKnowns(knowns);
    }
    for (const llc of lowLevelConstraints) {
      llc.propagateKnowns(knowns);
    }
    if (knowns.size === oldNumKnowns) {
      break;
    }
  }
  return knowns;
}
function getHandleToFingerMap(constraints2) {
  const handleToFinger = new Map();
  for (const constraint of constraints2) {
    if (constraint instanceof Finger) {
      handleToFinger.set(constraint.handle.canonicalInstance, constraint);
    }
  }
  return handleToFinger;
}

// Handle.js
var HANDLE_RADIUS = 5;
var _Handle = class {
  constructor({x, y}) {
    this.id = generateId();
    this.xVariable = variable(0, {
      object: this,
      property: "x"
    });
    this.yVariable = variable(0, {
      object: this,
      property: "y"
    });
    this._canonicalHandle = this;
    this.absorbedHandles = new Set();
    this.xVariable.value = x;
    this.yVariable.value = y;
    _Handle.all.add(this);
  }
  static create(position, getAbsorbed = true) {
    const handle = new _Handle(position);
    if (getAbsorbed) {
      handle.getAbsorbedByNearestHandle();
    }
    return handle;
  }
  static getNearestHandle(pos, tooFarDist = HANDLE_RADIUS + 1) {
    let nearestHandle = null;
    let nearestDist = Infinity;
    for (const handle of _Handle.all) {
      if (handle === pos || !handle.isCanonical) {
        continue;
      }
      const dist = vec_default.dist(pos, handle);
      if (dist < HANDLE_RADIUS && dist < nearestDist) {
        nearestDist = dist;
        nearestHandle = handle;
      }
    }
    return nearestHandle;
  }
  remove() {
    this.canonicalInstance.breakOff(this);
    this.xVariable.remove();
    this.yVariable.remove();
    _Handle.all.delete(this);
  }
  equals(that) {
    return this.xVariable.equals(that.xVariable) && this.yVariable.equals(that.yVariable);
  }
  get x() {
    return this.xVariable.value;
  }
  get y() {
    return this.yVariable.value;
  }
  get position() {
    return this;
  }
  set position(pos) {
    ({x: this.xVariable.value, y: this.yVariable.value} = pos);
  }
  absorb(that) {
    absorb(this, that);
  }
  getAbsorbedByNearestHandle() {
    _Handle.getNearestHandle(this)?.absorb(this);
  }
  get isCanonical() {
    return this._canonicalHandle === this;
  }
  get canonicalInstance() {
    return this._canonicalHandle;
  }
  set canonicalInstance(handle) {
    this._canonicalHandle = handle;
  }
  _absorb(that) {
    if (that === this) {
      return;
    }
    that.canonicalInstance.absorbedHandles.delete(that);
    for (const handle of that.absorbedHandles) {
      this._absorb(handle);
    }
    that.canonicalInstance = this;
    this.absorbedHandles.add(that);
  }
  _forgetAbsorbedHandles() {
    this.canonicalInstance = this;
    this.absorbedHandles.clear();
  }
  breakOff(handle) {
    if (this.absorbedHandles.has(handle)) {
      absorb(this, handle).remove();
    } else if (handle === this) {
      if (this.absorbedHandles.size > 0) {
        const absorbedHandles = [...this.absorbedHandles];
        const newCanonicalHandle = absorbedHandles.shift();
        absorb(this, newCanonicalHandle).remove();
        for (const absorbedHandle of absorbedHandles) {
          absorb(newCanonicalHandle, absorbedHandle);
        }
      }
    } else {
      throw new Error("tried to break off a handle that was not absorbed");
    }
    return handle;
  }
  get hasPin() {
    for (const constraint of Constraint.all) {
      if (constraint instanceof Pin && constraint.handle.canonicalInstance === this.canonicalInstance) {
        return true;
      }
    }
    return false;
  }
  togglePin(doPin = !this.hasPin) {
    if (!this.isCanonical) {
      return this.canonicalInstance.togglePin(doPin);
    }
    for (const h of [this, ...this.absorbedHandles]) {
      if (doPin) {
        pin(h);
      } else {
        pin(h).remove();
      }
    }
  }
  render(ctx2) {
  }
};
var Handle = _Handle;
Handle.all = new Set();
var Handle_default = Handle;

// app.js
makeBridge();
var pinImage = new Image();
pinImage.src = "pin.png";
var pinImageLoaded = false;
pinImage.onload = () => {
  console.log("pin image loaded!");
  pinImageLoaded = true;
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
initCanvas();
function initCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  if (devicePixelRatio !== 1) {
    const oldW = canvas.width;
    const oldH = canvas.height;
    canvas.width = oldW * devicePixelRatio;
    canvas.height = oldH * devicePixelRatio;
    canvas.style.width = oldW + "px";
    canvas.style.height = oldH + "px";
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
}
var handleUnderMouse = null;
canvas.addEventListener("mousedown", (e) => {
  handleUnderMouse = Handle_default.getNearestHandle({x: e.layerX, y: e.layerY});
  if (handleUnderMouse) {
    finger(handleUnderMouse);
  }
});
canvas.addEventListener("mousemove", (e) => {
  if (handleUnderMouse) {
    const finger2 = finger(handleUnderMouse);
    finger2.position = {x: e.layerX, y: e.layerY};
  }
});
canvas.addEventListener("mouseup", (e) => {
  if (handleUnderMouse) {
    finger(handleUnderMouse).remove();
    handleUnderMouse = null;
  }
});
function render() {
  solve(25);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRotated(pinImage, 0, 29, 42);
  drawRotated(pinImage, -60, 30, 210);
  drawRotated(pinImage, 180, 658, 47);
  drawRotated(pinImage, -120, 650, 212);
  for (const c of Constraint.all) {
    renderConstraint(c);
  }
  requestAnimationFrame(render);
}
function drawRotated(image, degrees, x, y) {
  ctx.save();
  ctx.globalAlpha = Math.random() * 0.2 + 0.7;
  ctx.translate(x, y);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}
requestAnimationFrame(render);
function flickeryWhite() {
  const alpha = Math.random() * 0.3 + 0.5;
  return `rgba(255, 255, 255, ${alpha})`;
}
function renderConstraint(c) {
  if (c instanceof PolarVector) {
    ctx.strokeStyle = flickeryWhite();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(c.a.x, c.a.y);
    ctx.lineTo(c.b.x, c.b.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = flickeryWhite();
    const fontSizeInPixels = 12;
    ctx.font = `${fontSizeInPixels}px Major Mono Display`;
    const delta = (c.distance.value - vec_default.dist(c.a, c.b)) / c.distance.value * 1e4;
    let label = delta.toFixed(0);
    if (label === "-0") {
      label = "0";
    }
    while (label.length < 4) {
      label = " " + label;
    }
    const labelWidth = ctx.measureText(label).width;
    ctx.fillText(label, (c.a.x + c.b.x) / 2 - labelWidth / 2, (c.a.y + c.b.y) / 2 + fontSizeInPixels / 2);
  } else if (c instanceof Weight) {
  } else if (c instanceof Pin) {
  }
}
function makeBridge() {
  const handles = [
    {x: 37, y: 44},
    {x: 99, y: 44},
    {x: 161, y: 45},
    {x: 222, y: 45},
    {x: 283, y: 47},
    {x: 37, y: 205},
    {x: 99, y: 147},
    {x: 160, y: 109},
    {x: 221, y: 86},
    {x: 282, y: 73},
    {x: 343, y: 72},
    {x: 649, y: 44},
    {x: 587, y: 44},
    {x: 525, y: 45},
    {x: 464, y: 45},
    {x: 403, y: 47},
    {x: 649, y: 205},
    {x: 587, y: 147},
    {x: 526, y: 109},
    {x: 465, y: 86},
    {x: 404, y: 73}
  ].map((pos) => Handle_default.create(pos));
  const triangles = [
    [0, 5, 6],
    [0, 6, 1],
    [1, 6, 7],
    [1, 7, 2],
    [2, 7, 8],
    [2, 8, 3],
    [3, 8, 9],
    [3, 9, 4],
    [4, 9, 10],
    [11, 17, 16],
    [11, 12, 17],
    [12, 18, 17],
    [12, 13, 18],
    [13, 19, 18],
    [13, 14, 19],
    [14, 20, 19],
    [14, 15, 20],
    [15, 10, 20]
  ].map((indices) => indices.map((idx) => handles[idx]));
  for (const [a, b, c] of triangles) {
    polarVector(a, b).distance.lock();
    polarVector(b, c).distance.lock();
    polarVector(c, a).distance.lock();
  }
  pin(handles[0]);
  pin(handles[5]);
  pin(handles[11]);
  pin(handles[16]);
  const weightHandle = Handle_default.create({x: 343, y: 150});
  polarVector(handles[10], weightHandle).distance.lock();
  const weight2 = weight(weightHandle, 2).weight;
  window.weight = weight2;
  window.constraints = constraints_exports;
  const weightSlider = document.createElement("input");
  weightSlider.setAttribute("type", "range");
  weightSlider.min = 0;
  weightSlider.max = 5;
  weightSlider.step = 0.01;
  weightSlider.value = weight2.value;
  weightSlider.oninput = () => weight2.lock(weightSlider.value);
  weightSlider.style.position = "absolute";
  weightSlider.style.top = "2px";
  weightSlider.style.right = "30px";
  document.body.appendChild(weightSlider);
}
