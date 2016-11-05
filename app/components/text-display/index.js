import angular from 'angular';
import 'angular-ui-bootstrap';
import Strings from '../../filters/strings';
import WorksDao from '../../services/works-dao';
import TextDisplayComponent from './text-display.component';
import WorkAttributeComponent from './work-attribute.component';

export default angular.module('myApp.textDisplay', [
  'ui.bootstrap',
  WorksDao.name,
  Strings.name,
])
  .component(TextDisplayComponent.selector, TextDisplayComponent)
  .component(WorkAttributeComponent.selector, WorkAttributeComponent);
