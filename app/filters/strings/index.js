import angular from 'angular';
import IncipitFilter from './incipit.filter';

export default angular.module('myApp.strings', [])
  .filter('incipit', IncipitFilter);
