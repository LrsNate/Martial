'use strict';

class WorksDao {
    constructor($q, fileHelper, sortHelper) {
        this.$q = $q;
        this.fileHelper = fileHelper;
        this.sortHelper = sortHelper;

        this.Datastore = require('nedb');
        this.init();
    }

    init() {
        this.nedb = new this.Datastore({
            filename: this.fileHelper.getFilePath('works.db'),
            autoload: true
        });
    }

    getWorks() {
        return this.$q((resolve) => {
            this.nedb.find({}, (err, docs) => {
                resolve(_.sortBy(docs, (d) => this.sortHelper.getSortKey(docs, d)));
            });
        });
    }

    getWork(workId) {
        return this.$q((resolve) => {
            this.nedb.findOne({_id: workId}, (err, doc) => {
                resolve(doc);
            });
        });
    }

    getField(fieldName) {
        return this.$q((resolve) => {
            this.nedb.find({}, (err, docs) => {
                resolve(_(docs)
                    .map(doc => doc[fieldName])
                    .sortBy(term => term ? term.toLowerCase() : null)
                    .sortedUniq()
                    .value()
                );
            });
        });
    }

    updateWork(work) {
        let id = work._id;
        return this.$q((resolve) => {
            this.nedb.update({_id: id}, work, () => {
                resolve();
            });
        });
    }
}

angular
    .module('myApp.worksDao')
    .factory('worksDao', ($q, fileHelper, sortHelper) =>
        new WorksDao($q, fileHelper, sortHelper));