import angular from 'angular';
import WorkEditor from '../../components/work-editor';
import WorksDao from '../../services/works-dao';
import AddComponent from './add.component';

function config($routeProvider) {
  $routeProvider.when('/add', {
    template: '<add></add>',
  });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.add', [WorkEditor.name, WorksDao.name])
  .config(config)
  .component(AddComponent.selector, AddComponent);
