export function objMap(obj, f) {
  return Object.keys(obj).reduce((acc, _) => ({
    [_]: f(_, obj[_]),
    ...acc }), {});
};

export function objFind(obj, p) {
  return Object.keys(obj).find(key => p(key, obj[key]));
}
