export default {
    selector: 'changelog',
    templateUrl: 'routes/changelog/changelog.template.html',
    controller: [function () {
        const electron = require('electron');
        this.openTrelloBoard = () => {
            electron.shell.openExternal('https://trello.com/b/5loodpwW');
        };
    }]
};