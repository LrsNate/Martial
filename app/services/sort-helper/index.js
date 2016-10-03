import Numerals from '../../filters/numerals';
import SortHelperService from './sort-helper.service';

export default angular.module('myApp.sortHelper', [
        Numerals.name
    ])
    .service('sortHelper', SortHelperService);

