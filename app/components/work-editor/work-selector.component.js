export default {
  selector: 'workSelector',
  templateUrl: 'components/work-editor/work-selector.template.html',
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
