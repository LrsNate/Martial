'use strict';

angular
    .module('myApp.searchFilter')
    .component('searchFilter', {
        templateUrl: 'components/search-filter/search-filter.template.html',
        bindings: {
            filter: '=',
            onUpdate: '&',
            onDelete: '&',
        },
        controller: ['searchFieldsDao', 'worksDao', function (searchFieldsDao, worksDao) {
            this.fields = searchFieldsDao.fields;

            this.matchers = searchFieldsDao.matchers;

            this.values = [];

            this.isSeletableField = function () {
                return this.filter.field && this.filter.field.id === 'date_published';
            };

            this.getMatchers = function () {
                var field = this.filter.field;
                if (!field) return [];

                return _.filter(this.matchers, {type: field.type});
            }.bind(this);

            this.onFieldChange = function () {
                delete this.filter.matcher;
                delete this.filter.term;
                this.updateValues();
            };

            this.updateValues = function () {
                var field = this.filter.field;
                if (field.id === 'author') {
                    worksDao.getAuthors().then(function (authors) {
                        this.values = authors;
                        console.log(this.values);
                    }.bind(this));
                } else if (field.id === 'work') {
                    worksDao.getMartialReferences().then(function (authors) {
                        this.values = authors;
                        console.log(this.values);
                    }.bind(this));
                } else {
                    this.values = [];
                    console.log(this.values);
                }
            }.bind(this);
        }]
    });