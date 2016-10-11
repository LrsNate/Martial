import angular from 'angular';
import IncipitFilter from './incipit.filter';
import MarkdownFilter from './markdown.filter';

export default angular.module('myApp.strings', [])
  .filter('incipit', IncipitFilter)
  .filter('markdown', MarkdownFilter);
