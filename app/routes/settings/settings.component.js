'use strict';

angular.module('myApp.settings')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            template: '<settings></settings>'
        });
    }])

    .component('settings', {
        controller: ['fileHelper', 'worksDao', '$scope', function (fileHelper, worksDao, $scope) {
            this.downloadProgress = {inProgress: false, achieved: 0, total: 0};
            this.downloadStatus = '';

            this.downloadDatabase = () => {
                fileHelper.downloadWorksDatabase((achieved, total) => {
                    this.downloadStatus = 'Téléchargement en cours...';
                    this.downloadProgress.inProgress = true;
                    this.downloadProgress.achieved = achieved;
                    this.downloadProgress.total = total;
                    $scope.$digest();
                }).then(() => {
                    this.downloadProgress.inProgress = false;
                    this.downloadStatus = 'Téléchargement terminé.';
                    worksDao.init();
                }, () => {
                    this.downloadProgress.inProgress = false;
                    this.downloadStatus = 'Échec du téléchargement.';
                });
            };
        }],
        templateUrl: 'routes/settings/settings.template.html'
    });