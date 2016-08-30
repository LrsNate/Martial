'use strict';

angular
    .module('myApp.searchHelper')
    .factory('searchHelper', ['$q', '$timeout', function ($q, $timeout) {
        var imitations = null;

        return {
            createImitationsIndex: function (fullWorks) {
                return $q(function (resolve) {
                    if (imitations) {
                        resolve();
                    }
                    $timeout(function () {
                        imitations = {};

                        for (var i = 0; i < fullWorks.length; i++) {
                            var martialReference = fullWorks[i].martialReference || fullWorks[i].reference;
                            if (imitations.hasOwnProperty(martialReference)) {
                                imitations[martialReference].push(fullWorks[i]);
                            } else {
                                imitations[martialReference] = [fullWorks[i]];
                            }
                        }
                        resolve();
                    });
                });
            },

            applyFilters: function (filters, fullWorks) {
                return $q(function (resolve, reject) {
                    if (!imitations) {
                        console.log('reject');
                        reject();
                    }
                    $timeout(function () {
                        var works = fullWorks;
                        for (var i = 0; i < filters.length; i++) {
                            if (filters[i].matcher !== 'imitates') continue;
                            works = imitations[filters[i].term];
                        }
                        resolve(works);
                    });
                });

            },
        };
    }]);