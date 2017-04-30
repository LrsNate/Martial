import electron from 'electron'; // eslint-disable-line

import template from './changelog.template.html';

export default {
  selector: 'changelog',
  template,
  controller: class {

    openProgressBoard() { // eslint-disable-line class-methods-use-this
      electron.shell.openExternal('https://github.com/LrsNate/Martial/issues');
    }
  },
};
