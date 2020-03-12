/**
 * Helper function to select certain key/values from an objet
 * @param obj - source object to refine
 * @param keys - keys to include in returned object
 */
function pick(obj: { [key: string]: any }, keys: string[]) {
  return keys
    .map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
}

/**
 * Returns object with supplied keys removed
 * @param obj - source object to refine
 * @param keys - keys to remove
 */
function reject(obj: { [key: string]: any }, keys: string[]) {
  const vkeys = Object.keys(obj).filter(k => !keys.includes(k));
  return pick(obj, vkeys);
}

export { pick, reject };
