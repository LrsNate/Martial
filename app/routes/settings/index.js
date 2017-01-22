import angular from 'angular';
import DatabaseHelper from '../../services/database-helper';
import DownloadProgress from '../../components/download-progress';
import SettingsComponent from './settings.component';

function config($routeProvider) {
  $routeProvider.when('/settings', {
    template: '<settings></settings>',
  });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.settings', [
  DatabaseHelper.name,
  DownloadProgress.name,
])
  .config(config)
  .component(SettingsComponent.selector, SettingsComponent);
