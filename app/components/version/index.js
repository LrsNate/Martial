import angular from 'angular';
import VersionDirective from './version.directive';

export default angular.module('myApp.version', [])
  .directive('appVersion', VersionDirective);
