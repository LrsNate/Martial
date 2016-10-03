import OfRomanFilter from './of-roman.filter';

export default angular.module('myApp.numerals', [])
    .filter('ofRoman', OfRomanFilter);