'use strict';

class WorksDao {
    constructor($q, fileHelper) {
        this.$q = $q;

        const Datastore = require('nedb');
        this.nedb = new Datastore({
            filename: fileHelper.getFilePath('works.db'),
            autoload: true
        });
    }

    getWorks() {
        return this.$q((resolve) => {
            this.nedb.find({}, (err, docs) => {
                resolve(docs);
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

    getMartialWork(reference) {
        return this.$q((resolve) => {
            this.nedb.findOne({author: 'Martial', reference: reference}, (err, doc) => {
                resolve(doc);
            });
        });
    }

    getMartialReferences() {
        return this.$q((resolve) => {
            this.nedb.find({author: 'Martial'}, (err, docs) => {
                resolve(_(docs)
                    .map(doc => doc.reference)
                    .sortBy()
                    .value()
                );
            });
        });
    }
}

angular
    .module('myApp.worksDao')
    .factory('worksDao', ($q, fileHelper) => new WorksDao($q, fileHelper));