import template from './boot.template.html';

export default {
  selector: 'boot',
  template,
  controller: class {

    constructor($location, $scope, $timeout, databaseHelper, fileHelper) {
      this.isReady = false;
      this.showProgress = false;
      this.hasErrored = false;
      this.messages = ['Vérification de la base de données...'];
      this.downloadProgress = { achieved: 0, total: 0 };
      this.$location = $location;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.databaseHelper = databaseHelper;
      this.fileHelper = fileHelper;

      fileHelper.ensureFolderPathExists().then((message) => {
        this.messages.push(message);
        this.ensureDatabaseExists();
      });
    }

    static get $inject() {
      return ['$location', '$scope', '$timeout', 'databaseHelper', 'fileHelper'];
    }


    ensureDatabaseExists() {
      this.fileHelper.fileExists('works.db').then((exists) => {
        if (exists) {
          this.messages.push('Une base de données existe déjà.');
          this.isReady = true;
          this.$location.path('/search');
        } else {
          this.downloadDatabase();
        }
      });
    }

    downloadDatabase() {
      this.messages.push('Aucune base de données n\'a pu être trouvée. Téléchargement en cours...');
      this.showProgress = true;
      this.messages.push('Recherche de la dernière mise à jour de la base de données...');
      this.databaseHelper.getLatestVersion().then((version) => {
        this.messages.push(`Dernière version en date : ${version.id}`);
        this.messages.push('Téléchargement en cours...');
        this.databaseHelper.downloadVersion(version.id, (achieved, total) => {
          this.downloadProgress.inProgress = true;
          this.downloadProgress.showProgress = true;
          this.downloadProgress.achieved = achieved;
          this.downloadProgress.total = total;
          this.$scope.$digest();
        }).then(() => {
          this.messages.push('Téléchargement terminé.');
          this.isReady = true;
          this.start();
        }, () => {
          this.showProgress = false;
          this.messages.push('Échec du téléchargement.');
          this.hasErrored = true;
        });
      });
    }

    start() {
      this.messages.push('Démarrage de l\'application dans 3 secondes...');
      this.$timeout(() => this.$location.path('/search'), 3000);
    }
  },
};
