export default {
  bindings: {
    achieved: '<',
    total: '<',
  },
  templateUrl: 'components/download-progress/download-progress.template.html',
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
