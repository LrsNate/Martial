export default {
    selector: 'edit',
    templateUrl: 'routes/edit/edit.template.html',
    controller: class {
        constructor($routeParams, $location, worksDao) {
            this._$location = $location;
            this._worksDao = worksDao;
            const workId = $routeParams.workId;

            worksDao.getWork(workId).then((work) => {
                this.work = work;
                if (work.originId) {
                    worksDao.getWork(work.originId).then((work) => {
                        this.originWork = work;
                        //noinspection JSUnusedGlobalSymbols
                        this.originReference = work.author + ': ' + work.reference;
                    });
                }
            });
        }

        //noinspection JSUnusedGlobalSymbols
        saveWork() {
            this._worksDao.updateWork(this.work).then(() => {
                this._$location.path('/search');
            });
        }
    }
};