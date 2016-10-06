export default {
    bindings: {
        achieved: '=',
        total: '='
    },
    templateUrl: 'components/download-progress/download-progress.template.html',
    controller: class {
        constructor($scope) {
            this.percentage = 0;
            $scope.$watch(() => this.achieved, () => {
                this.percentage = parseInt(this.achieved / this.total * 100);
            });
        }
    }
};