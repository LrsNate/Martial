'use strict';

class SearchHelper {

    constructor($q, $timeout) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.imitations = null;

        this.matchers = {
            string: {
                is(work, field, term) {
                    return work[field] === term;
                },
                is_not(work, field, term) {
                    return work[field] !== term;
                }
            },
            date: {
                after(work, field, term) {
                    return work[field] >= parseInt(term);
                },
                before(work, field, term) {
                    return work[field] <= parseInt(term);
                }
            },
        };
    }

    createImitationsIndex(fullWorks) {
        return this.$q((resolve) => {
            if (this.imitations) resolve();

            this.$timeout(() => {
                this.imitations = {};

                for (let i = 0; i < fullWorks.length; i++) {
                    const martialReference = fullWorks[i].martialReference || fullWorks[i].reference;
                    if (this.imitations.hasOwnProperty(martialReference)) {
                        this.imitations[martialReference].push(fullWorks[i]);
                    } else {
                        this.imitations[martialReference] = [fullWorks[i]];
                    }
                }
                resolve();
            });
        });
    }

    applyFilters(filters, fullWorks) {
        return this.$q((resolve, reject) => {
            if (!this.imitations) {
                reject();
            }
            this.$timeout(() => {
                let works = fullWorks;
                /*jshint loopfunc: true */
                for (let i = 0; i < filters.length; i++) {
                    if (!filters[i].term || !filters[i].matcher) {
                        continue;
                    }
                    if (filters[i].matcher.id === 'imitates') {
                        works = this.imitations[filters[i].term];
                    } else {
                        works = _.filter(works, (work) => {
                            const filter = this.matchers[filters[i].field.type][filters[i].matcher.id];
                            return filter(work, filters[i].field.id, filters[i].term);
                        });
                    }
                }
                resolve(works);
            });
        });
    }
}

angular
    .module('myApp.searchHelper')
    .factory('searchHelper', ($q, $timeout) => new SearchHelper($q, $timeout));