export default {
  selector: 'boot',
  templateUrl: 'routes/boot/boot.template.html',
  controller: class {

    constructor($location, $scope, $timeout, fileHelper) {
      this.isReady = false;
      this.showProgress = false;
      this.hasErrored = false;
      this.messages = ['Vérification de la base de données...'];
      this.downloadProgress = { achieved: 0, total: 0 };
      this.$location = $location;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.fileHelper = fileHelper;

      fileHelper.ensureFolderPathExists().then((message) => {
        this.messages.push(message);
        this.ensureDatabaseExists();
      });
    }

    static get $inject() {
      return ['$location', '$scope', '$timeout', 'fileHelper'];
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
      this.fileHelper.downloadWorksDatabase(
        (achieved, total) => {
          this.downloadProgress.achieved = achieved;
          this.downloadProgress.total = total;
          this.$scope.$digest();
        },
      ).then(() => {
        this.showProgress = false;
        this.messages.push('Téléchargement terminé.');
        this.isReady = true;
        this.start();
      }, () => {
        this.messages.push('Échec du téléchargement.');
        this.showProgress = false;
        this.hasErrored = true;
      });
    }

    start() {
      this.messages.push('Démarrage de l\'application dans 3 secondes...');
      this.$timeout(() => this.$location.path('/search'), 3000);
    }
  },
};
