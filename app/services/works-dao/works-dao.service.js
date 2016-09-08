'use strict';

angular
    .module('myApp.worksDao')
    .factory('worksDao', ['$q', 'fileHelper', function ($q, fileHelper) {
        var Datastore = require('nedb');
        var nedb = new Datastore({
            filename: fileHelper.getFilePath('works.db'),
            autoload: true
        });

        var getField = function (fieldName) {
            return $q(function (resolve) {
                nedb.find({}, function (err, docs) {
                    resolve(_(docs)
                        .map(doc => doc[fieldName])
                        .sortBy(term => term.toLowerCase())
                        .sortedUniq()
                        .value()
                    );
                });
            });
        };

        return {
            getWorks: function () {
                return $q(function (resolve) {
                    nedb.find({}, function (err, docs) {
                        resolve(docs);
                    });
                });
            },

            getAuthors: () => getField('author'),

            getMeters: () => getField('meter'),

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