import template from './settings.template.html';

export default {
  selector: 'settings',
  template,
  controller: class {

    constructor(databaseHelper, worksDao, $scope) {
      this.databaseHelper = databaseHelper;
      this.worksDao = worksDao;
      this.$scope = $scope;
      this.downloadProgress = { inProgress: false, showProgress: false, achieved: 0, total: 0 };
      this.downloadStatus = [];
    }

    static get $inject() {
      return ['databaseHelper', 'worksDao', '$scope'];
    }

    downloadDatabase() {
      this.downloadProgress.inProgress = false;
      this.downloadStatus = ['Recherche de la dernière mise à jour de la base de données...'];
      this.databaseHelper.getLatestVersion().then((version) => {
        this.downloadStatus.push(`Dernière version en date : ${version.id}`);
        this.downloadStatus.push('Téléchargement en cours...');
        this.databaseHelper.downloadVersion(version.id, (achieved, total) => {
          this.downloadProgress.inProgress = true;
          this.downloadProgress.showProgress = true;
          this.downloadProgress.achieved = achieved;
          this.downloadProgress.total = total;
          this.$scope.$digest();
        }).then(() => {
          this.downloadProgress.inProgress = false;
          this.downloadStatus.push('Téléchargement terminé.');
          this.worksDao.init();
        }, () => {
          this.downloadProgress.inProgress = false;
          this.downloadProgress.showProgress = false;
          this.downloadStatus.push('Échec du téléchargement.');
        });
      });
    }
  },
};
