'use strict';

var low = require('lowdb');

angular
    .module('myApp.databaseConnector')
    .factory('databaseConnector', [function () {
        return {
            db: low('/Users/Nate/Downloads/works.json'),
            getWorks: function () {
                return this.db.get('works').value();
            },

            getImitations: function (martialReference) {
                return this.db.get('works')
                    // FIXME?
                    .filter(function (o) {
                        return o.martialReference === martialReference || o.reference === martialReference;
                    })
                    .value();
            }
        };
    }]);