const _ = require('lodash');

export default class SortHelperService {

  constructor(ofRomanFilter) {
    this.ofRoman = ofRomanFilter;
  }

  static get $inject() {
    return ['ofRomanFilter'];
  }

  getSortKey(docs, doc) {
    let reference = SortHelperService.resolveReference(docs, doc);
    if (reference === null) return ['9999', '9999', _.lowerCase(doc.author)];

    reference = reference.split(', ');

    const numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this.ofRoman(reference[0]);
    const refCore = parseInt(reference[1], 10);
    const refPostfix = reference[1].substr(Math.log10(refCore));

    return [
      _.padStart(numeralFirstReference, 4, '0'),
      _.padStart(refCore, 4, '0') + refPostfix,
      _.lowerCase(doc.author === 'Martial' ? 'a' : doc.author),
    ];
  }

  static resolveReference(docs, doc) {
    if (doc.author === 'Martial') {
      return doc.reference;
    }
    if (doc.originId) {
      const originWork = _.find(
        docs,
        o => doc.originId === o._id,
      );
      if (originWork.author === 'Martial') {
        return originWork.reference;
      }
    }
    return null;
  }
}
