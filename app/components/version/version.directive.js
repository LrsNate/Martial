const packageJson = require('../../package.json');

export default () => (scope, elm) => {
  elm.text(packageJson.version);
};

