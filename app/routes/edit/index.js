import WorkEditor from '../../components/work-editor';
import WorksDao from '../../services/works-dao';
import EditComponent from './edit.component';

function config($routeProvider) {
    $routeProvider.when('/edit/:workId', {
        template: '<edit></edit>'
    });
}
config.$inject = ['$routeProvider'];

export default angular.module('myApp.edit', [WorksDao.name, WorkEditor.name])
    .config(config)
    .component(EditComponent.selector, EditComponent);