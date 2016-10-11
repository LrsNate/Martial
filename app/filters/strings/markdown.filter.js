import Remarkable from 'remarkable';

export default () => {
  const md = new Remarkable();
  return input => md.render(input);
};
