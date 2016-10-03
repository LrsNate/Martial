export default {
    templateUrl: 'components/search-box/search-filter.template.html',
    bindings: {
        filter: '=',
        onUpdate: '&',
        onDelete: '&',
    },
    controller: ['searchFieldsDao', 'worksDao', function (searchFieldsDao, worksDao) {
        this.fields = searchFieldsDao.fields;

        this.matchers = searchFieldsDao.matchers;

        this.values = [];

        this.getMatchers = () => {
            const field = this.filter.field;
            if (!field) return [];

            return _.filter(this.matchers, {type: field.type});
        };

        this.onFieldChange = () => {
            delete this.filter.term;
            this.filter.matcher = this.filter.field.defaultMatcher;
            this.updateValues();
            this.onUpdate();
        };

        this.updateValues = () => {
            const field = this.filter.field;
            if (field.id === 'work') {
                worksDao.getWorks().then((works) => {
                    this.values = _.map(works, (work) => {
                        return {name: work.author + ': ' + work.reference, id: work._id};
                    });
                });
            } else if (field.id) {
                worksDao.getField(field.id).then((values) => {
                    this.values = _.map(values, (v) => {
                        return {name: v, id: v};
                    });
                });
            } else {
                this.values = [];
            }
        };
    }]
};