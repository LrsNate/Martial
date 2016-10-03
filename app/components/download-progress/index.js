import 'angular-filter';
import DownloadProgressComponent from './download-progress.component';

export default angular.module('myApp.downloadProgress', ['angular.filter'])
    .component('downloadProgress', DownloadProgressComponent);

