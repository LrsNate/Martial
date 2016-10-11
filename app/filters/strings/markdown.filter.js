import Remarkable from 'remarkable';

const _ = require('lodash');

export default () => {
  const md = new Remarkable();
  return (input) => {
    let lines = input.split('\n');
    lines = _.map(lines, s => s.replace(/^( +)/g, (match, p1) => '&nbsp;'.repeat(p1.length)));
    return md.render(lines.join('\n'));
  };
};
