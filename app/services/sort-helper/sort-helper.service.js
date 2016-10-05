import {sprintf} from 'sprintf-js';
let _ = require('lodash');

export default class SortHelperService {

    constructor(ofRomanFilter) {
        this._ofRoman = ofRomanFilter;
    }

    getSortKey(docs, doc) {
        let reference = this.resolveReference(docs, doc);
        if (reference === null) return ['9999', '9999', _.lowerCase(doc.author)];

        reference = reference.split(', ');

        const numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this._ofRoman(reference[0]);
        const refCore = parseInt(reference[1]) ;
        const refPostfix = reference[1].substr(Math.log10(refCore));

        return [
            sprintf('%04d', numeralFirstReference),
            sprintf('%04d', refCore) + refPostfix,
            _.lowerCase(doc.author === 'Martial' ? 'a' : doc.author)
        ];
    }

    /**
     * @param docs
     * @param {{author: string, reference: string, originId: string}} doc
     */
    resolveReference(docs, doc) {
        if (doc.author === 'Martial') {
            return doc.reference;
        }
        else if (doc.originId) {
            let originWork = _.find(docs, (o) => doc.originId === o._id);
            if (originWork.author === 'Martial') {
                return originWork.reference;
            }
        }
        return null;
    }
}