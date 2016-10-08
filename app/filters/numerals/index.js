import angular from 'angular';
import OfRomanFilter from './of-roman.filter';
import ToBytesFilter from './to-bytes.filter';

export default angular.module('myApp.numerals', [])
  .filter('ofRoman', OfRomanFilter)
  .filter('toBytes', ToBytesFilter);
