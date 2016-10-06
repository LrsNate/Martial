export default {
    selector: 'settings',
    templateUrl: 'routes/settings/settings.template.html',
    controller: class {
        constructor(fileHelper, worksDao, $scope) {
            this._fileHelper = fileHelper;
            this._worksDao = worksDao;
            this._$scope = $scope;
            this.downloadProgress = {inProgress: false, achieved: 0, total: 0};
            this.downloadStatus = '';
        }

        static get $inject() {
            return ['fileHelper', 'worksDao', '$scope'];
        }

        downloadDatabase() {
            this._fileHelper.downloadWorksDatabase((achieved, total) => {
                this.downloadStatus = 'Téléchargement en cours...';
                this.downloadProgress.inProgress = true;
                this.downloadProgress.achieved = achieved;
                this.downloadProgress.total = total;
                this._$scope.$digest();
            }).then(() => {
                this.downloadProgress.inProgress = false;
                this.downloadStatus = 'Téléchargement terminé.';
                this._worksDao.init();
            }, () => {
                this.downloadProgress.inProgress = false;
                this.downloadStatus = 'Échec du téléchargement.';
            });
        };
    }
};