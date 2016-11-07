const _ = require('lodash');

export default class SearchHelperService {

  constructor($q, $timeout, $filter) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$filter = $filter;

    // noinspection JSUnusedLocalSymbols
    this.matchers = {
      string: {
        is(work, field, term) {
          return work[field] === term.id;
        },
        is_not(work, field, term) {
          return work[field] !== term.id;
        },
      },
      date: {
        after(work, field, term) {
          return work[field] >= parseInt(term.id, 10);
        },
        before(work, field, term) {
          return work[field] <= parseInt(term.id, 10);
        },
      },
      work: {
        imitates(work, field, term) {
          return work._id === term.id || // eslint-disable-line no-underscore-dangle
            work.originId === term.id;
        },
      },
    };
  }

  static get $inject() {
    return ['$q', '$timeout', '$filter'];
  }

  applyFilters(filters, phraseFilter, fullWorks) {
    return this.$q((resolve) => {
      this.$timeout(() => {
        let works = fullWorks;
        _.each(filters, (filter) => {
          if (!filter.term || !filter.matcher) {
            return;
          }
          works = _.filter(works, (work) => {
            const filterFunction = this.matchers[filter.field.type][filter.matcher.id];
            return filterFunction(work, filter.field.id, filter.term);
          });
        });

        works = this.$filter('filter')(works, phraseFilter);
        resolve(works);
      });
    });
  }
}
