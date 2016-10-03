import FileHelper from '../../services/file-helper';
import DownloadProgress from '../../components/download-progress';
import BootComponent from './boot.component';

function config($routeProvider) {
    $routeProvider.when('/boot', {
        template: '<boot></boot>'
    });
}

export default angular.module('myApp.boot', [FileHelper.name, DownloadProgress.name])
    .config(config)
    .component('boot', BootComponent);
