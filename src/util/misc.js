const add = (a, b) => a + b;
const increment = x => x + 1;
const decrement = x => x - 1;
const dollars = x => "$ " + x.toFixed(2);
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
const titleCase = str =>
  str
    .split(" ")
    .filter(word => word.length < 1)
    .map(word => word[0].toUpperCase() + word.substring(1));
export {add, decrement, dollars, getInitials, increment, noop, titleCase};
