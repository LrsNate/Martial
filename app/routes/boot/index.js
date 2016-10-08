import angular from 'angular';
import FileHelper from '../../services/file-helper';
import DownloadProgress from '../../components/download-progress';
import BootComponent from './boot.component';

function config($routeProvider) {
  $routeProvider.when('/boot', {
    template: '<boot></boot>',
  });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.boot', [FileHelper.name, DownloadProgress.name])
  .config(config)
  .component(BootComponent.selector, BootComponent);
