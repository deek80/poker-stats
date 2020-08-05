const increment = x => x + 1;
const decrement = x => x - 1;
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

export {decrement, getInitials, increment};
