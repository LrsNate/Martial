import angular from 'angular';
import ngInfiniteScroll from 'ng-infinite-scroll';
import SearchBox from '../../components/search-box';
import WorkDisplay from '../../components/work-display';
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
  WorkDisplay.name,
  SearchHelper.name,
  WorksDao.name,
  Strings.name,
  ngInfiniteScroll,
])
  .config(config)
  .component(SearchComponent.selector, SearchComponent);

