export default {
    selector: 'add',
    templateUrl: 'routes/add/add.template.html',
    controller: class {
        constructor($location, worksDao) {
            this._$location = $location;
            this._worksDao = worksDao;
            this.work = {
                vices: []
            };
        }

        static get $inject() {
            return ['$location', 'worksDao'];
        }

        saveWork() {
            this._worksDao.insertWork(this.work).then(() => {
                this._$location.path('/search');
            });
        }
    }
};