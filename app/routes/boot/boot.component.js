export default {
    controller: ['$location', '$scope', '$timeout', 'fileHelper', function ($location, $scope, $timeout, fileHelper) {

        this.isReady = false;
        this.showProgress = false;
        this.hasErrored = false;
        this.messages = ['Vérification de la base de données...'];
        this.downloadProgress = {achieved: 0, total: 0};

        fileHelper.ensureFolderPathExists().then((message) => {
            this.messages.push(message);
            ensureDatabaseExists();
        });

        const ensureDatabaseExists = () => {
            fileHelper.fileExists('works.db').then((exists) => {
                if (exists) {
                    this.messages.push('Une base de données existe déjà.');
                    this.isReady = true;
                    $location.path('/search');
                } else {
                    downloadDatabase();
                }
            });
        };

        const downloadDatabase = () => {
            this.messages.push('Aucune base de données n\'a pu être trouvée. Téléchargement en cours...');
            this.showProgress = true;
            fileHelper.downloadWorksDatabase(
                (achieved, total) => {
                    this.downloadProgress.achieved = achieved;
                    this.downloadProgress.total = total;
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

        const start = () => {
            this.messages.push('Démarrage de l\'application dans 3 secondes...');
            $timeout(() => $location.path('/search'), 3000);
        };
    }],
    templateUrl: 'routes/boot/boot.template.html'
};