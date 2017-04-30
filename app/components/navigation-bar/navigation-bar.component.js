import template from './navigation-bar.template.html';

export default {
  template,
  controller: class {

    constructor($scope, $location) {
      $scope.$watch(() => $location.path(), (route) => {
        const words = route.split('/');
        this.route = words[1];
      });
    }

    static get $inject() {
      return ['$scope', '$location'];
    }

    isOtherRoute() {
      return this.route !== 'search' &&
        this.route !== 'changelog' &&
        this.route !== 'add';
    }
  },
};
