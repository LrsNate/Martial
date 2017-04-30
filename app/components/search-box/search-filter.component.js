import _ from 'lodash';

import template from './search-filter.template.html';

export default {
  template,
  bindings: {
    filter: '=',
    onUpdate: '&',
    onDelete: '&',
  },
  controller: class {

    constructor(searchFieldsDao, worksDao) {
      this.fields = searchFieldsDao.fields;
      this.matchers = searchFieldsDao.matchers;
      this.values = [];
      this.worksDao = worksDao;
    }

    static get $inject() {
      return ['searchFieldsDao', 'worksDao'];
    }

    getMatchers() {
      const field = this.filter.field;
      if (!field) return [];

      return _.filter(this.matchers, { type: field.type });
    }

    onFieldChange() {
      delete this.filter.term;
      this.filter.matcher = this.filter.field.defaultMatcher;
      this.updateValues();
      this.onUpdate();
    }

    updateValues() {
      const field = this.filter.field;
      if (field.id === 'work') {
        this.worksDao.getWorks().then((works) => {
          this.values = _.map(works, work => ({
            name: `${work.author}: ${work.reference}`,
            id: work._id,
          }));
        });
      } else if (field.id) {
        this.worksDao.getField(field.id).then((values) => {
          this.values = _.map(values, v => ({ name: v, id: v }));
        });
      } else {
        this.values = [];
      }
    }
  },
};
