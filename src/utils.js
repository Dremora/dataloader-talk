const id = (x) => x;

module.exports.toMap = (list, getKey, valueFn = id) => {
  const map = new Map();
  list.forEach((value) => map.set(getKey(value), valueFn(value)));
  return map;
};

module.exports.groupBy = (list, getKey) => {
  const map = new Map();
  list.forEach((item) => {
    const key = getKey(item);
    const collection = map.get(key);
    if (collection) {
      collection.push(item);
    } else {
      map.set(key, [item]);
    }
  });
  return map;
};

module.exports.onNextTick = (fn) => setTimeout(fn, 0);
