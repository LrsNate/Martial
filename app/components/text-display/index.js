import 'angular-ui-bootstrap';
import WorksDao from '../../services/works-dao';
import TextDisplayComponent from './text-display.component';

export default angular.module('myApp.textDisplay', [
        'ui.bootstrap',
        WorksDao.name
    ])
    .component('textDisplay', TextDisplayComponent);