const increment = x => x + 1;
const decrement = x => x - 1;
const noop = () => {};
const getInitials = fullName => {
  const words = fullName.split(" ").filter(word => word.length > 0);
  switch (words.length) {
    case 0:
      return "?";
    case 1:
      return words[0][0];
    default:
      return words[0][0] + words[words.length - 1][0];
  }
};
const sum = list => list.reduce((a, b) => a + b, 0);
const mapValues = (obj, mapFunc) => {
  const mapped = {};
  Object.entries(obj).forEach(([k, v]) => {
    mapped[k] = mapFunc(k, v);
  });
  return mapped;
};

const numberSort = (a, b) => a - b;

export {decrement, getInitials, increment, mapValues, noop, numberSort, sum};
