'use strict';

class SearchHelper {

    constructor($q, $timeout) {
        this.$q = $q;
        this.$timeout = $timeout;

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
            work: {
                imitates(work, field, term) {
                    return work._id === term._id || work.originId === term._id;
                }
            }
        };
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
                    works = _.filter(works, (work) => {
                        const filter = this.matchers[filters[i].field.type][filters[i].matcher.id];
                        return filter(work, filters[i].field.id, filters[i].term);
                    });
                }
                resolve(works);
            });
        });
    }
}

angular
    .module('myApp.searchHelper')
    .factory('searchHelper', ($q, $timeout) => new SearchHelper($q, $timeout));