export default () => (input, maxLength) => {
  if (!input) return '';
  const newlineIndex = input.indexOf('\n');
  if (newlineIndex < 0 || newlineIndex > maxLength) {
    return `${input.substring(0, maxLength)}...`;
  }
  return input.substring(0, newlineIndex);
};

