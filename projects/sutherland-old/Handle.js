import * as constraints from "./constraints.js";
import {Constraint, Pin} from "./constraints.js";
import {generateId} from "./helpers.js";
import Vec from "./lib/vec.js";
const _Handle = class {
  constructor(position) {
    this.id = generateId();
    this.xVariable = constraints.variable(0, {
      object: this,
      property: "x"
    });
    this.yVariable = constraints.variable(0, {
      object: this,
      property: "y"
    });
    this._canonicalHandle = this;
    this.absorbedHandles = new Set();
    _Handle.all.add(this);
  }
  static create(position, getAbsorbed = true) {
    const handle = new _Handle(position);
    if (getAbsorbed) {
      handle.getAbsorbedByNearestHandle();
    }
    return handle;
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
  remove() {
    this.canonicalInstance.breakOff(this);
    this.xVariable.remove();
    this.yVariable.remove();
    _Handle.all.delete(this);
  }
  absorb(that) {
    constraints.absorb(this, that);
  }
  getAbsorbedByNearestHandle() {
    this.getNearestHandle()?.absorb(this);
  }
  getNearestHandle() {
    let nearestHandle = null;
    let nearestDist = Infinity;
    for (const handle of _Handle.all) {
      if (handle === this || !handle.isCanonical) {
        continue;
      }
      const dist = Vec.dist(this, handle);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestHandle = handle;
      }
    }
    return nearestHandle;
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
      constraints.absorb(this, handle).remove();
    } else if (handle === this) {
      if (this.absorbedHandles.size > 0) {
        const absorbedHandles = [...this.absorbedHandles];
        const newCanonicalHandle = absorbedHandles.shift();
        constraints.absorb(this, newCanonicalHandle).remove();
        for (const absorbedHandle of absorbedHandles) {
          constraints.absorb(newCanonicalHandle, absorbedHandle);
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
        constraints.pin(h);
      } else {
        constraints.pin(h).remove();
      }
    }
  }
  render(t, dt) {
  }
  distanceToPoint(point) {
    return Vec.dist(this.position, point);
  }
  equals(that) {
    return this.xVariable.equals(that.xVariable) && this.yVariable.equals(that.yVariable);
  }
};
let Handle = _Handle;
Handle.all = new Set();
export default Handle;
