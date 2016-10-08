import angular from 'angular';
import 'ui-select';
import SearchFieldsDao from '../../services/search-fields-dao';
import SearchBoxComponent from './search-box.component';
import SearchFilterComponent from './search-filter.component';
import WorksDao from '../../services/works-dao';

export default angular.module('myApp.searchBox', [
  'ui.select',
  WorksDao.name,
  SearchFieldsDao.name,
])
  .component('searchBox', SearchBoxComponent)
  .component('searchFilter', SearchFilterComponent);
