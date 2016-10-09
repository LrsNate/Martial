import angular from 'angular';
import 'angular-ui-bootstrap';
import WorkEditor from '../../components/work-editor';
import ConfirmDeleteWork from '../../components/confirm-delete-work';
import WorksDao from '../../services/works-dao';
import EditComponent from './edit.component';

function config($routeProvider) {
  $routeProvider.when('/edit/:workId', {
    template: '<edit></edit>',
  });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.edit', [
  'ui.bootstrap',
  ConfirmDeleteWork.name,
  WorksDao.name,
  WorkEditor.name,
])
  .config(config)
  .component(EditComponent.selector, EditComponent);
