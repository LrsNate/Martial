import SearchBox from '../../components/search-box';
import TextDisplay from '../../components/text-display';
import SearchHelper from '../../services/search-helper';
import WorksDao from '../../services/works-dao';
import SearchComponent from './search.component';

function config($routeProvider) {
    $routeProvider.when('/search', {
        template: '<search></search>'
    });
}

export default angular.module('myApp.search', [
        SearchBox.name,
        TextDisplay.name,
        SearchHelper.name,
        WorksDao.name
    ])
    .config(config)
    .component(SearchComponent.selector, SearchComponent);

