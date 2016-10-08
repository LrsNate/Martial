export default {
  selector: 'add',
  templateUrl: 'routes/add/add.template.html',
  controller: class {

    constructor($location, worksDao) {
      this.$location = $location;
      this.worksDao = worksDao;
      this.work = { vices: [] };
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
