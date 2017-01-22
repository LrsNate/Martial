import angular from 'angular';
import FileHelper from '../file-helper';
import DatabaseHelperService from './database-helper.service';

export default angular.module('myApp.databaseHelper', [
  FileHelper.name,
])
  .service('databaseHelper', DatabaseHelperService);
