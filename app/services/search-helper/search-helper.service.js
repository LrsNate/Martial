'use strict';

angular
    .module('myApp.searchHelper')
    .factory('searchHelper', ['$q', '$timeout', function ($q, $timeout) {
        var imitations = null;

        var matchers = {
            'author': {
                'is': function (work, term) {
                    return work.author === term;
                },
                'is_not': function (work, term) {
                    return work.author !== term;
                }
            },
            'date_published': {
                'after': function (work, term) {
                    return work.date >= parseInt(term);
                },
                'before': function (work, term) {
                    return work.date <= parseInt(term);
                }
            },
            'work': {
                'imitates': function (work, term) {
                    return true; // already filtered
                }
            }
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
                            if (filters[i].matcher.id === 'imitates') {
                                works = imitations[filters[i].term];
                            } else if (!!filters[i].term) {
                                works = _.filter(works, function (work) {
                                    return matchers[filters[i].field.id][filters[i].matcher.id](work, filters[i].term);
                                });
                            }
                        }
                        resolve(works);
                    });
                });

            },
        };
    }]);