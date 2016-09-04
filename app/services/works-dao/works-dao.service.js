'use strict';

angular
    .module('myApp.worksDao')
    .factory('worksDao', ['$q', 'fileHelper', function ($q, fileHelper) {
        var Datastore = require('nedb');
        var nedb = new Datastore({
            filename: fileHelper.getFilePath('works.db'),
            autoload: true
        });

        return {
            getWorks: function () {
                return $q(function (resolve) {
                    nedb.find({}, function (err, docs) {
                        resolve(docs);
                    });
                });
            },
        };
    }]);