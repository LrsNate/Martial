import Datastore from 'nedb';
let _ = require('lodash');

export default class WorksDaoService {
    constructor($q, fileHelper, sortHelper) {
        this._$q = $q;
        this._fileHelper = fileHelper;
        this._sortHelper = sortHelper;

        this.init();
    }

    static get $inject() {
        return ['$q', 'fileHelper', 'sortHelper'];
    }

    init() {
        this._db = new Datastore({
            filename: this._fileHelper.getFilePath('works.db'),
            autoload: true
        });
    }

    getWorks() {
        return this._$q((resolve) => {
            this._db.find({}, (err, docs) => {
                resolve(_.sortBy(docs, (d) => this._sortHelper.getSortKey(docs, d)));
            });
        });
    }

    getWork(workId) {
        return this._$q((resolve) => {
            this._db.findOne({_id: workId}, (err, doc) => {
                resolve(doc);
            });
        });
    }

    getField(fieldName) {
        return this._$q((resolve) => {
            this._db.find({}, (err, docs) => {
                resolve(_(docs)
                    .map(doc => doc[fieldName])
                    .sortBy(term => term ? term.toLowerCase() : null)
                    .sortedUniq()
                    .value()
                );
            });
        });
    }

    insertWork(work) {
        return this._$q((resolve) => {
            this._db.insert(work, () => {
                resolve();
            });
        });
    }

    updateWork(work) {
        let id = work._id;
        return this._$q((resolve) => {
            this._db.update({_id: id}, work, () => {
                resolve();
            });
        });
    }
}