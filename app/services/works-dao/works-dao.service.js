'use strict';

var low = require('lowdb');

angular
    .module('myApp.worksDao')
    .factory('worksDao', [function () {
        return {
            db: low('/Users/Nate/Downloads/works.json'),
            getWorks: function () {
                return this.db.get('works').value();
            },

            getImitations: function (martialReference) {
                return this.db.get('works')
                    .filter(function (o) {
                        return o.martialReference === martialReference || o.reference === martialReference;
                    })
                    .value();
            }
        };
    }]);