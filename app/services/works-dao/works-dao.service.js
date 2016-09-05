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

            getAuthors: function () {
                return $q(function (resolve) {
                    nedb.find({}, function (err, docs) {
                        resolve(_(docs)
                            .map(doc => doc.author)
                            .sortBy(name => name.toLowerCase())
                            .sortedUniq()
                            .value()
                        );
                    });
                });
            },

            getMartialReferences: function () {
                return $q(function (resolve) {
                    nedb.find({author: 'Martial'}, function (err, docs) {
                        resolve(_(docs)
                            .map(doc => doc.reference)
                            .sortBy()
                            .value()
                        );
                    });
                });
            }
        };
    }]);