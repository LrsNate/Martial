export default {
  templateUrl: 'components/text-display/text-display.template.html',
  selector: 'textDisplay',
  bindings: {
    work: '=',
    onDelete: '&',
  },
  controller: class {

    constructor($scope, worksDao) {
      this.isCollapsed = true;
      this.referencedWork = null;
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
          this.referencedWork = doc;
        });
      } else {
        this.referencedWork = null;
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
