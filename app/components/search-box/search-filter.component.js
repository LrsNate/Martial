let _ = require('lodash');

export default {
    templateUrl: 'components/search-box/search-filter.template.html',
    bindings: {
        filter: '=',
        onUpdate: '&',
        onDelete: '&',
    },
    controller: class {
        constructor(searchFieldsDao, worksDao) {
            this.fields = searchFieldsDao.fields;
            this.matchers = searchFieldsDao.matchers;
            this.values = [];
            this._worksDao = worksDao;
        }

        static get $inject() {
            return ['searchFieldsDao', 'worksDao'];
        }

        //noinspection JSUnusedGlobalSymbols
        getMatchers() {
            //noinspection JSUnresolvedVariable
            const field = this.filter.field;
            if (!field) return [];

            return _.filter(this.matchers, {type: field.type});
        }

        //noinspection JSUnusedGlobalSymbols
        onFieldChange() {
            //noinspection JSUnresolvedVariable
            delete this.filter.term;
            //noinspection JSUnresolvedVariable
            this.filter.matcher = this.filter.field.defaultMatcher;
            this.updateValues();
            this.onUpdate();
        }

        updateValues() {
            //noinspection JSUnresolvedVariable
            const field = this.filter.field;
            if (field.id === 'work') {
                this._worksDao.getWorks().then((works) => {
                    this.values = _.map(works, (work) => {
                        return {name: work.author + ': ' + work.reference, id: work._id};
                    });
                });
            } else if (field.id) {
                this._worksDao.getField(field.id).then((values) => {
                    this.values = _.map(values, (v) => {
                        return {name: v, id: v};
                    });
                });
            } else {
                this.values = [];
            }
        }
    }
};