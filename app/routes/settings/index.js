import DownloadProgress from '../../components/download-progress';
import FileHelper from '../../services/file-helper';
import SettingsComponent from './settings.component';

function config($routeProvider) {
    $routeProvider.when('/settings', {
        template: '<settings></settings>'
    });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.settings', [
    FileHelper.name,
    DownloadProgress.name
])
    .config(config)
    .component(SettingsComponent.selector, SettingsComponent);
