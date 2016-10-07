import DownloadProgressComponent from './download-progress.component';
import Numerals from '../../filters/numerals';

export default angular.module('myApp.downloadProgress', [Numerals.name])
    .component('downloadProgress', DownloadProgressComponent);

