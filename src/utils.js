module.exports.orderByKeys = (list, keys, getKey) => {
  const map = new Map();
  list.forEach((value) => map.set(getKey(value), value));
  return keys.map((key) => map.get(key));
};

module.exports.orderAndGroupByKeys = (list, keys, getKey) => {
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

  return keys.map((key) => map.get(key) || []);
};

module.exports.onNextTick = (fn) => setTimeout(fn, 0);
