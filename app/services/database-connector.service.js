'use strict';

var low = require('lowdb');

angular
    .module('myApp.databaseConnector')
    .factory('databaseConnector', [function () {
        return {
            db: low('/Users/Nate/Downloads/works.json'),
            getWorks: function () {
                return this.db.get('works').value();
            }
        };
    }]);