import angular from 'angular';
import WorksDao from '../../services/works-dao';
import WorkEditorComponent from './work-editor.component';

export default angular.module('myApp.workEditor', [WorksDao.name])
  .component(WorkEditorComponent.selector, WorkEditorComponent);
