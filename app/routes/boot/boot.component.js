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

            fileHelper.fileExists('works.db').then(function (exists) {
                this.exists = exists;
                if (exists) {
                    this.messages.push('Une base de données existe déjà.');
                    this.isReady = true;
                    start();
                } else {
                    downloadDatabase();
                }
            }.bind(this));

            var downloadDatabase = function () {
                this.messages.push('Aucune base de données n\'a pu être trouvée. Téléchargement en cours...');
                this.showProgress = true;
                fileHelper.downloadFile('http://lrsnate.fr/assets/resources/works.db',
                    function (achieved, total) {
                        this.achieved.percentage = parseInt(achieved / total * 100);
                        this.achieved.achieved = achieved;
                        this.achieved.total = total;
                        $scope.$digest();
                    }.bind(this)
                ).then(function () {
                    this.showProgress = false;
                    this.messages.push('Téléchargement terminé.');
                    this.isReady = true;
                }.bind(this), function () {
                    this.messages.push('Échec du téléchargement.');
                    this.showProgress = false;
                    this.hasErrored = true;
                }.bind(this));
            }.bind(this);

            var start = function () {
                this.messages.push('Démarrage de l\'application...');
                $timeout(function () {
                    $location.path('search');
                }, 4000);
            }.bind(this);
        }],
        templateUrl: 'routes/boot/boot.template.html'
    });