'use strict';

class SortHelper {

    constructor(sprintfFilter, ofRomanFilter) {
        this.sprintf = sprintfFilter;
        this.ofRoman = ofRomanFilter;
    }

    getSortKey(docs, doc) {
        let reference = this.resolveReference(docs, doc);
        if (reference === null) return ['9999', '9999', _.lowerCase(doc.author)];

        reference = reference.split(', ');

        let numeralFirstReference = reference[0] === 'De Spectaculis' ? 0 : this.ofRoman(reference[0]);
        let refCore = parseInt(reference[1]) ;
        let refPostfix = reference[1].substr(Math.log10(refCore));

        return [
            this.sprintf('%04d', numeralFirstReference),
            this.sprintf('%04d', refCore) + refPostfix,
            _.lowerCase(doc.author === 'Martial' ? 'a' : doc.author)
        ];
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
}

angular.module('myApp.sortHelper')
    .service('sortHelper', SortHelper);