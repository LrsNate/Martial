'use strict';

angular
    .module('myApp.boot')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/boot', {
            template: '<boot></boot>'
        });
    }])

    .component('boot', {
        controller: ['$location', '$scope', '$timeout', 'fileHelper', function ($location, $scope, $timeout, fileHelper) {

            this.isReady = false;
            this.showProgress = false;
            this.hasErrored = false;
            this.messages = ['Vérification de la base de données...'];
            this.achieved = {percentage: 0, achieved: 0, total: 0};

            fileHelper.fileExists('works.db').then((exists) => {
                if (exists) {
                    this.messages.push('Une base de données existe déjà.');
                    this.isReady = true;
                    $location.path('/search');
                } else {
                    downloadDatabase();
                }
            });

            var downloadDatabase = () => {
                this.messages.push('Aucune base de données n\'a pu être trouvée. Téléchargement en cours...');
                this.showProgress = true;
                fileHelper.downloadFile('http://lrsnate.fr/assets/resources/works.db',
                    (achieved, total) => {
                        this.achieved.percentage = parseInt(achieved / total * 100);
                        this.achieved.achieved = achieved;
                        this.achieved.total = total;
                        $scope.$digest();
                    }
                ).then(() => {
                    this.showProgress = false;
                    this.messages.push('Téléchargement terminé.');
                    this.isReady = true;
                    start();
                }, () => {
                    this.messages.push('Échec du téléchargement.');
                    this.showProgress = false;
                    this.hasErrored = true;
                });
            };

            var start = () => {
                this.messages.push('Démarrage de l\'application dans 3 secondes...');
                $timeout(() => $location.path('/search'), 3000);
            };
        }],
        templateUrl: 'routes/boot/boot.template.html'
    });