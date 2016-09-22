'use strict';

class WorksDao {
    constructor($q, fileHelper, sprintf, ofRoman) {
        this.$q = $q;
        this.sprintf = sprintf;
        this.ofRoman = ofRoman;

        const Datastore = require('nedb');
        this.nedb = new Datastore({
            filename: fileHelper.getFilePath('works.db'),
            autoload: true
        });
    }

    getWorks() {
        return this.$q((resolve) => {
            this.nedb.find({}, (err, docs) => {
                resolve(_.sortBy(docs, (d) => {
                    let reference = (d.martialReference || d.reference).split(', ');
                    let numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this.ofRoman(reference[0]);
                    let refCore = parseInt(reference[1]) ;
                    var refPostfix = reference[1].substr(Math.log10(refCore));
                    
                    reference[0] = this.sprintf('%04d', numeralFirstReference);
                    reference[1] = this.sprintf('%04d', refCore) + refPostfix;
                    reference[2] = _.lowerCase(d.author === 'Martial' ? 'a' : d.author);
                    return reference;
                }));
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
    .factory('worksDao', ($q, fileHelper, sprintfFilter, ofRomanFilter) =>
        new WorksDao($q, fileHelper, sprintfFilter, ofRomanFilter));