export default {
  selector: 'settings',
  templateUrl: 'routes/settings/settings.template.html',
  controller: class {

    constructor(fileHelper, worksDao, $scope) {
      this.fileHelper = fileHelper;
      this.worksDao = worksDao;
      this.$scope = $scope;
      this.downloadProgress = { inProgress: false, achieved: 0, total: 0 };
      this.downloadStatus = '';
    }

    static get $inject() {
      return ['fileHelper', 'worksDao', '$scope'];
    }

    downloadDatabase() {
      this.fileHelper.downloadWorksDatabase((achieved, total) => {
        this.downloadStatus = 'Téléchargement en cours...';
        this.downloadProgress.inProgress = true;
        this.downloadProgress.achieved = achieved;
        this.downloadProgress.total = total;
        this.$scope.$digest();
      }).then(() => {
        this.downloadProgress.inProgress = false;
        this.downloadStatus = 'Téléchargement terminé.';
        this.worksDao.init();
      }, () => {
        this.downloadProgress.inProgress = false;
        this.downloadStatus = 'Échec du téléchargement.';
      });
    }
  },
};
