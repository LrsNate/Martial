import Datastore from 'nedb';

const _ = require('lodash');

export default class WorksDaoService {

  constructor($q, fileHelper, sortHelper) {
    this.$q = $q;
    this.fileHelper = fileHelper;
    this.sortHelper = sortHelper;

    this.init();
  }

  static get $inject() {
    return ['$q', 'fileHelper', 'sortHelper'];
  }

  init() {
    this.db = new Datastore({
      filename: this.fileHelper.getFilePath('works.db'),
      autoload: true,
    });
  }

  getWorks() {
    return this.$q((resolve) => {
      this.db.find({}, (err, docs) => {
        resolve(_.sortBy(docs, d => this.sortHelper.getSortKey(docs, d)));
      });
    });
  }

  getWork(workId) {
    return this.$q((resolve) => {
      this.db.findOne({ _id: workId }, (err, doc) => {
        resolve(doc);
      });
    });
  }

  getField(fieldName) {
    return this.$q((resolve) => {
      this.db.find({}, (err, docs) => {
        resolve(_(docs)
            .map(doc => doc[fieldName])
            .sortBy((term) => {
              if (term) return term.toLowerCase();
              return null;
            })
            .sortedUniq()
            .value()
        );
      });
    });
  }

  insertWork(work) {
    return this.$q((resolve) => {
      this.db.insert(work, () => {
        resolve();
      });
    });
  }

  updateWork(work) {
    const id = work._id; // eslint-disable-line no-underscore-dangle
    return this.$q((resolve) => {
      this.db.update({ _id: id }, work, () => {
        resolve();
      });
    });
  }
}
