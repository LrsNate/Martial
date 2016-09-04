'use strict';

angular.module('myApp.fileHelper')
    .factory('fileHelper', ['$q', function ($q) {
        var fs = require('fs');
        var http = require('http');
        var osenv = require('osenv');
        var path = require('path');

        var sep = process.platform === 'win32' ? '\\' : '/';

        return {
            getDataFolderPath: function () {
                var home = osenv.home();
                return home + sep + 'Documents' + sep + 'Martial';
            },

            getFilePath: function (filename) {
                var folder = this.getDataFolderPath();
                return folder + sep + filename;
            },

            fileExists: function (filename) {
                return $q(function (resolve) {
                    fs.stat(this.getFilePath(filename), function (err) {
                        resolve(!err);
                    });
                }.bind(this));
            },

            downloadFile: function (fileUrl, progress) {
                return $q(function (resolve) {
                    var filename = path.basename(fileUrl);
                    var fileHandle = fs.createWriteStream(this.getFilePath(filename));


                    http.get(fileUrl, function (response) {
                        var total = response.headers['content-length'];
                        var achieved = 0;
                        response.pipe(fileHandle);

                        response.on('data', function (chunk) {
                            achieved += parseInt(chunk.length);
                            progress(achieved, total);
                        });

                        response.on('end', function () {
                            fileHandle.end();
                            resolve();
                        });
                    });
                }.bind(this));
            }
        };
    }]);