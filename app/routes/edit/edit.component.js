'use strict';

angular
    .module('myApp.edit')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/work/:workId/edit', {
            template: '<edit></edit>'
        });
    }])
    .component('edit', {
        templateUrl: 'routes/edit/edit.template.html',
        controller: ['$routeParams', 'worksDao', function ($routeParams, worksDao) {
            let workId = $routeParams.workId;
            worksDao.getWork(workId).then((work) => {
                this.work = work;
                console.log(work);
            });
        }]
    });