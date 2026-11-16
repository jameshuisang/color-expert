// Bounded scalar/linear-RGB diagnostics, not a renderer or spectral solver.
// PBRT 4ed Point_Lights and Diffuse_Reflection. No clipping/tone mapping.
const finite = (x) => typeof x === 'number' && Number.isFinite(x);
function nonnegative(x, name) {
  if (!finite(x) || x < 0) throw new Error(`${name} must be finite and nonnegative`);
}
function channels(v, name) {
  if (!Array.isArray(v) || v.length !== 3) throw new Error(`${name} must have three channels`);
  for (let i=0;i<3;i++) nonnegative(v[i], name);
}
export function pointIrradiance({intensity, distance, cosine, visible=true}) {
  nonnegative(intensity, 'intensity');
  if (!finite(distance) || distance <= 0) throw new Error('distance must be positive');
  if (!finite(cosine) || cosine < -1 || cosine > 1) throw new Error('cosine must be in [-1,1]');
  if (typeof visible !== 'boolean') throw new Error('visible must be boolean');
  const distanceSquared = distance ** 2;
  if (!finite(distanceSquared) || distanceSquared === 0) throw new Error('distance outside supported numerical range');
  const value = visible ? intensity * Math.max(0, cosine) / distanceSquared : 0;
  if (!finite(value)) throw new Error('numerical range exceeded');
  return value; // If I is W/sr and distance m, E is W/m². Vacuum, ideal point source.
}
// Reflectance and irradiance must share a declared linear RGB basis.
// Restricted nonnegative RGB approximation, not all wide-gamut coordinates.
export function lambertianRGB({reflectance, irradiance}) {
  channels(reflectance, 'reflectance'); channels(irradiance, 'irradiance');
  if (reflectance.some(v => v > 1)) throw new Error('reflectance must be <= 1');
  return reflectance.map((r,i) => r * irradiance[i] / Math.PI);
}
export function exposeLinear(values, stops) {
  channels(values, 'linear values');
  if (!finite(stops)) throw new Error('stops must be finite');
  const result=values.map(v=>v*2**stops);
  if (!result.every(finite)) throw new Error('numerical range exceeded');
  return result; // May exceed 1; display encoding and tone mapping are separate.
}
