export default {
  selector: 'edit',
  templateUrl: 'routes/edit/edit.template.html',
  controller: class {

    constructor($routeParams, $location, worksDao) {
      this.$location = $location;
      this.worksDao = worksDao;
      const workId = $routeParams.workId;
      this.editedVice = '';

      worksDao.getWork(workId).then((work) => {
        this.work = work;
      });
    }

    static get $inject() {
      return ['$routeParams', '$location', 'worksDao'];
    }

    saveWork() {
      this.worksDao.updateWork(this.work).then(() => {
        this.$location.path('/search');
      });
    }
  },
};
