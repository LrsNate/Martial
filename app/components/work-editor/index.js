import angular from 'angular';
import 'angular-ui-bootstrap';
import SearchBox from '../search-box';
import WorksDao from '../../services/works-dao';
import WorkEditorComponent from './work-editor.component';
import WorkSelectorComponent from './work-selector.component';

export default angular.module('myApp.workEditor', [
  SearchBox.name,
  WorksDao.name,
])
  .component(WorkEditorComponent.selector, WorkEditorComponent)
  .component(WorkSelectorComponent.selector, WorkSelectorComponent);