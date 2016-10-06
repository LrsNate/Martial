//noinspection NpmUsedModulesInstalled
import electron from 'electron';

export default {
    selector: 'changelog',
    templateUrl: 'routes/changelog/changelog.template.html',
    controller: class {
        //noinspection JSUnusedGlobalSymbols
        openTrelloBoard() {
            electron.shell.openExternal('https://trello.com/b/5loodpwW');
        }
    }
};