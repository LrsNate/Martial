import template from './download-progress.template.html';

export default {
  bindings: {
    achieved: '<',
    total: '<',
  },
  template,
  controller: class {

    constructor($scope) {
      this.percentage = 0;
      $scope.$watch(() => this.achieved, () => {
        const ratio = this.achieved / this.total;
        this.percentage = parseInt(ratio * 100, 10);
      });
    }

    static get $inject() {
      return ['$scope'];
    }
  },
};
