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
                    let reference = this.resolveReference(docs, d);
                    if (reference === null) return ['9999', '9999', _.lowerCase(d.author)];

                    reference = reference.split(', ');

                    let numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this.ofRoman(reference[0]);
                    let refCore = parseInt(reference[1]) ;
                    let refPostfix = reference[1].substr(Math.log10(refCore));

                    return [
                        this.sprintf('%04d', numeralFirstReference),
                        this.sprintf('%04d', refCore) + refPostfix,
                        _.lowerCase(d.author === 'Martial' ? 'a' : d.author)
                    ];
                }));
            });
        });
    }

    resolveReference(docs, doc) {
        let reference = null;
        if (doc.author === 'Martial') {
            return doc.reference;
        }
        else if (doc.originId) {
            let originWork = _.find(docs, (o) => doc.originId === o._id);
            if (originWork.author === 'Martial') {
                reference = originWork.reference;
            }
        }
        return reference;
    }

    getWork(workId) {
        return this.$q((resolve) => {
            this.nedb.findOne({_id: workId}, (err, doc) => {
                resolve(doc);
            });
        });
    }

    // generateOriginId() {
    //     return this.$q((resolve) => {
    //         let i = 0;
    //         this.nedb.find({}, (err, docs) => {
    //             _.each(docs, (doc) => {
    //                 if (doc.author === 'Martial') {
    //                     i += 1;
    //                     console.log('Skipped: ' + i);
    //                     return;
    //                 }
    //                 let martialReference = doc.martialReference;
    //                 this.nedb.findOne({author: 'Martial', reference: martialReference}, (err, martialDoc) => {
    //                     let id = martialDoc._id;
    //                     this.nedb.update({_id: doc._id}, {
    //                         $unset: {martialReference: ''},
    //                         $set: {originId: [id]}
    //                     }, () => {
    //                         i += 1;
    //                         console.log('Processed: ' + i);
    //                     });
    //                 });
    //             });
    //
    //         });
    //     });
    // }

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
    .factory('worksDao', ($q, fileHelper, sprintfFilter, ofRomanFilter) =>
        new WorksDao($q, fileHelper, sprintfFilter, ofRomanFilter));