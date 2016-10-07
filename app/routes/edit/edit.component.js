export default {
    selector: 'edit',
    templateUrl: 'routes/edit/edit.template.html',
    controller: class {
        constructor($routeParams, $location, worksDao) {
            this._$location = $location;
            this._worksDao = worksDao;
            const workId = $routeParams.workId;
            this.editedVice = '';

            worksDao.getWork(workId).then((work) => {
                this.work = work;
            });
        }

        static get $inject() {
            return ['$routeParams', '$location', 'worksDao'];
        }

        //noinspection JSUnusedGlobalSymbols
        saveWork() {
            this._worksDao.updateWork(this.work).then(() => {
                this._$location.path('/search');
            });
        }
    }
};