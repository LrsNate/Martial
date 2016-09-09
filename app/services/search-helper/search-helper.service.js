'use strict';

angular
    .module('myApp.searchHelper')
    .factory('searchHelper', ['$q', '$timeout', function ($q, $timeout) {
        var imitations = null;

        var matchers = {
            'string': {
                'is': function (work, field, term) {
                    return work[field] === term;
                },
                'is_not': function (work, field, term) {
                    return work[field] !== term;
                }
            },
            'date': {
                'after': function (work, field, term) {
                    return work[field] >= parseInt(term);
                },
                'before': function (work, field, term) {
                    return work[field] <= parseInt(term);
                }
            },
        };

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
                        reject();
                    }
                    $timeout(function () {
                        var works = fullWorks;
                        /*jshint loopfunc: true */
                        for (var i = 0; i < filters.length; i++) {
                            if (!filters[i].term || !filters[i].matcher) {
                                continue;
                            }
                            if (filters[i].matcher.id === 'imitates') {
                                works = imitations[filters[i].term];
                            } else {
                                works = _.filter(works, function (work) {
                                    var filter = matchers[filters[i].field.type][filters[i].matcher.id];
                                    return filter(work, filters[i].field.id, filters[i].term);
                                });
                            }
                        }
                        resolve(works);
                    });
                });

            },
        };
    }]);