import 'angular-utils-pagination';
import angular from 'angular';
import SearchBox from '../../components/search-box';
import TextDisplay from '../../components/text-display';
import SearchHelper from '../../services/search-helper';
import WorksDao from '../../services/works-dao';
import SearchComponent from './search.component';
import Strings from '../../filters/strings';

function config($routeProvider) {
  $routeProvider.when('/search', {
    template: '<search></search>',
  });
}
config.$inject = ['$routeProvider'];


export default angular.module('myApp.search', [
  SearchBox.name,
  TextDisplay.name,
  SearchHelper.name,
  WorksDao.name,
  Strings.name,
  'angularUtils.directives.dirPagination',
])
  .config(config)
  .component(SearchComponent.selector, SearchComponent);

