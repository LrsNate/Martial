export default {
    templateUrl: 'components/navigation-bar/navigation-bar.template.html',
    controller: ['$scope', '$location', function ($scope, $location) {
        $scope.$watch(() => $location.path(), (route) => {
            let words = route.split('/');
            this.route = words[1];
        });

        this.isOtherRoute = () => {
            return this.route != 'search' &&
                this.route != 'changelog';
        };
    }]
};