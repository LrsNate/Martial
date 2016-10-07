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
                if (work.originId) {
                    worksDao.getWork(work.originId).then((work) => {
                        this.originWork = work;
                        //noinspection JSUnusedGlobalSymbols
                        this.originReference = work.author + ': ' + work.reference;
                    });
                }
            });
        }

        static get $inject() {
            return ['$routeParams', '$location', 'worksDao'];
        }

        //noinspection JSUnusedGlobalSymbols
        addVice() {
            this.editedVice = this.editedVice.trim();
            if (!this.editedVice || !this.editedVice.length) return;
            this.work.vices.push(this.editedVice);
            this.editedVice = '';
        }

        //noinspection JSUnusedGlobalSymbols
        saveWork() {
            this._worksDao.updateWork(this.work).then(() => {
                this._$location.path('/search');
            });
        }

        //noinspection JSUnusedGlobalSymbols
        deleteVice(index) {
            this.work.vices.splice(index, 1);
        }
    }
};