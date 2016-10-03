export default () => {
    let packageJson = require('../../../package.json');
    return (scope, elm, attrs) => {
        elm.text(packageJson.version);
    };
};
