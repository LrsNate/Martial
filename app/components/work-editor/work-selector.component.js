import template from './work-selector.template.html';

export default {
  selector: 'workSelector',
  template,
  bindings: {
    close: '&',
    dismiss: '&',
  },
  controller: class {

    constructor(worksDao, searchHelper) {
      this.worksDao = worksDao;
      this.searchHelper = searchHelper;
      this.filters = [];
      this.phraseFilter = '';

      worksDao.getWorks().then((works) => {
        this.fullWorks = works;
        this.works = works;
      });
    }

    static get $inject() {
      return ['worksDao', 'searchHelper'];
    }

    refreshFilters() {
      this.searchHelper.applyFilters(this.filters, this.fullWorks)
        .then((works) => {
          this.works = works;
        });
    }

    cancel() {
      this.dismiss();
    }

    select(work) {
      this.close({ $value: work._id }); // eslint-disable-line no-underscore-dangle
    }
  },
};
