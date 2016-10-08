import angular from 'angular';
import ChangelogItems from '../../components/changelog-items';
import Changelog from './changelog.component';

function config($routeProvider) {
  $routeProvider.when('/changelog', {
    template: '<changelog></changelog>',
  });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.changelog', [ChangelogItems.name])
  .config(config)
  .component(Changelog.selector, Changelog);
