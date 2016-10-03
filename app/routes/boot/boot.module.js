'use strict';

require('../../services/file-helper/file-helper.module');
require('../../components/download-progress/download-progress.module');

angular.module('myApp.boot', ['myApp.fileHelper', 'myApp.downloadProgress']);

require('./boot.component');