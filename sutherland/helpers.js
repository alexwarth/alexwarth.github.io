export const TAU = Math.PI * 2;
export function normalizeAngle(angle) {
  return (angle % TAU + TAU) % TAU;
}
export function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
let nextId = 0;
export function generateId() {
  return nextId++;
}
export function forDebugging(property, valueOrValueFn) {
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
export const sets = {
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
