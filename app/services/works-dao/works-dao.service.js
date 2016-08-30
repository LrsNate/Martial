'use strict';

angular
    .module('myApp.worksDao')
    .factory('worksDao', ['$q', function ($q) {
        var Datastore = require('nedb');
        var nedb = new Datastore({
            filename: '/Users/Nate/Downloads/works.db',
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