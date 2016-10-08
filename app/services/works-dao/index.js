import angular from 'angular';
import FileHelper from '../file-helper';
import SortHelper from '../sort-helper';
import WorksDaoService from './works-dao.service';


export default angular.module('myApp.worksDao', [
  FileHelper.name,
  SortHelper.name,
])
  .service('worksDao', WorksDaoService);
