import angular from 'angular';
import WorksDao from '../../services/works-dao';
import WorkSearchComponent from './work-search.component';


export default angular.module('myApp.workSearch', [
  WorksDao.name,
])
  .component(WorkSearchComponent.selector, WorkSearchComponent);
