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

            getField: function (fieldName) {
                return $q(function (resolve) {
                    nedb.find({}, function (err, docs) {
                        resolve(_(docs)
                            .map(doc => doc[fieldName])
                            .sortBy(term => term ? term.toLowerCase() : null)
                            .sortedUniq()
                            .value()
                        );
                    });
                });
            },

            getMartialWork: function (reference) {
                return $q(function (resolve) {
                    nedb.findOne({author: 'Martial', reference: reference}, function (err, doc) {
                        resolve(doc);
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