import template from './add.template.html';

export default {
  selector: 'add',
  template,
  controller: class {

    constructor($location, worksDao) {
      this.$location = $location;
      this.worksDao = worksDao;
      this.work = { vices: [], tags: [] };
    }

    static get $inject() {
      return ['$location', 'worksDao'];
    }

    saveWork() {
      this.worksDao.insertWork(this.work).then(() => {
        this.$location.path('/search');
      });
    }
  },
};
