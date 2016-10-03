import WorksDao from '../../services/works-dao';
import EditComponent from './edit.component';

function config($routeProvider) {
    $routeProvider.when('/edit/:workId', {
        template: '<edit></edit>'
    });
}

export default angular.module('myApp.edit', [WorksDao.name])
    .config(config)
    .component(EditComponent.selector, EditComponent);