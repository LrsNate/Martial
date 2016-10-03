export default {
    selector: 'edit',
    templateUrl: 'routes/edit/edit.template.html',
    controller: ['$routeParams', '$location', 'worksDao', function ($routeParams, $location, worksDao) {
        let workId = $routeParams.workId;
        worksDao.getWork(workId).then((work) => {
            this.work = work;
            if (work.originId) {
                worksDao.getWork(work.originId).then((work) => {
                    this.originWork = work;
                    this.originReference = work.author + ': ' + work.reference;
                });
            }
        });

        this.saveWork = () => {
            worksDao.updateWork(this.work).then(() => {
                $location.path('/search');
            });
        };
    }]
};