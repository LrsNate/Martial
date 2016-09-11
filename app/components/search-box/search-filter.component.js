'use strict';

angular
    .module('myApp.searchBox')
    .component('searchFilter', {
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

            this.isSeletableField = () => {
                return this.filter.field && this.filter.field.id === 'date_published';
            };

            this.getMatchers = () => {
                const field = this.filter.field;
                if (!field) return [];

                return _.filter(this.matchers, {type: field.type});
            };

            this.onFieldChange = () => {
                delete this.filter.matcher;
                delete this.filter.term;
                this.updateValues();
            };

            this.updateValues = () => {
                const field = this.filter.field;
                if (field.id === 'work') {
                    worksDao.getMartialReferences().then((values) => {
                        this.values = values;
                    });
                } else if (field.id) {
                    worksDao.getField(field.id).then((values) => {
                        this.values = values;
                    });
                } else {
                    this.values = [];
                }
            };
        }]
    });