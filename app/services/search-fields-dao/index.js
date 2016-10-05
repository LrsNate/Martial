import SearchFieldsDaoService from './search-fields-dao.service';

export default angular.module('myApp.searchFieldsDao', [])
    .factory('searchFieldsDao', () => SearchFieldsDaoService);