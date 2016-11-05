import electron from 'electron'; // eslint-disable-line

export default {
  selector: 'changelog',
  templateUrl: 'routes/changelog/changelog.template.html',
  controller: class {

    openProgressBoard() { // eslint-disable-line class-methods-use-this
      electron.shell.openExternal('https://github.com/LrsNate/Martial/projects/1');
    }
  },
};
