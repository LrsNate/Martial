export default {
    templateUrl: 'components/navigation-bar/navigation-bar.template.html',
    controller: class {
        constructor($scope, $location) {
            $scope.$watch(() => $location.path(), (route) => {
                let words = route.split('/');
                this.route = words[1];
            });
        }

        //noinspection JSUnusedGlobalSymbols
        isOtherRoute() {
            return this.route != 'search' &&
                this.route != 'changelog';
        }
    }
};