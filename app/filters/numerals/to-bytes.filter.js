export default () => {
  const sizes = ['B', 'kB', 'MB', 'GB', 'TB'];


  return (input, decimals) => {
    let size = input;
    for (let i = 0; i < sizes.length; i += 1) {
      if (size < 1024) {
        return size.toFixed(decimals) + sizes[i];
      } else if (i < sizes.length - 1) {
        size /= 1024;
      }
    }
    return `${size}TB`;
  };
};
