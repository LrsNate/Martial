const _ = require('lodash');

export default class SearchHelperService {

  constructor($q, $timeout) {
    this.$q = $q;
    this.$timeout = $timeout;

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
          return work._id === term.id ||
            work.originId === term.id;
        },
      },
      list: {
        contains(work, field, term) {
          return _.includes(work[field], term.id);
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

        const words = phraseFilter.split(/\s+/);
        works = _.filter(works, work => _.every(words,
            word => SearchHelperService.filterByWord(work, word)));
        resolve(works);
      });
    });
  }

  static filterByWord(work, word) {
    return _.some(work, (value) => {
      if (_.isObject(value) && SearchHelperService.filterByWord(value, word)) {
        return true;
      } else if (!_.isString(value)) {
        return false;
      }
      return value.includes(word);
    });
  }
}
