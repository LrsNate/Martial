var _ = require('lodash');

export default class SearchHelperService {

    constructor($q, $timeout) {
        this._$q = $q;
        this._$timeout = $timeout;

        //noinspection JSUnusedLocalSymbols
        this._matchers = {
            string: {
                is(work, field, term) {
                    return work[field] === term.id;
                },
                is_not(work, field, term) {
                    return work[field] !== term.id;
                }
            },
            date: {
                after(work, field, term) {
                    return work[field] >= parseInt(term.id);
                },
                before(work, field, term) {
                    return work[field] <= parseInt(term.id);
                }
            },
            work: {
                imitates(work, field, term) {
                    return work._id === term.id || work.originId === term.id;
                }
            }
        };
    }

    static get $inject() {
        return ['$q', '$timeout'];
    }

    applyFilters(filters, fullWorks) {
        return this._$q((resolve) => {
            this._$timeout(() => {
                let works = fullWorks;
                _.each(filters, (filter) => {
                    if (!filter.term || !filter.matcher) {
                        return;
                    }
                    works = _.filter(works, (work) => {
                        const filterFunction = this._matchers[filter.field.type][filter.matcher.id];
                        return filterFunction(work, filter.field.id, filter.term);
                    });
                });

                resolve(works);
            });
        });
    }
}