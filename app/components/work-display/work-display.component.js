import template from './work-display.template.html';

export default {
  template,
  selector: 'workDisplay',
  bindings: {
    work: '<',
    onDelete: '&',
  },
  controller: class {

    constructor($scope, worksDao) {
      this.isCollapsed = true;
      this.referenceWork = null;
      this.worksDao = worksDao;
      this.display = 'text';
      $scope.$watch(() => this.work, () => this.init());
    }

    static get $inject() {
      return ['$scope', 'worksDao'];
    }

    init() {
      if (this.work.originId) {
        this.worksDao.getWork(this.work.originId).then((doc) => {
          this.referenceWork = doc;
        });
      } else {
        this.referenceWork = null;
      }
      this.isCollapsed = false;
      this.display = 'text';
    }

    toggleDisplay() {
      this.display = this.display === 'meta' ? 'text' : 'meta';
      return false;
    }
  },
};
