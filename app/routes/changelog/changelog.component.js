import electron from 'electron'; // eslint-disable-line

export default {
  selector: 'changelog',
  templateUrl: 'routes/changelog/changelog.template.html',
  controller: class {

    static openTrelloBoard() {
      electron.shell.openExternal('https://trello.com/b/5loodpwW');
    }
  },
};
