export default () => {
    let unigrams = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
    let bigrams = {CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4};
    let resultsCache = {};
    return (input) => {
        if (resultsCache.hasOwnProperty(input)) return resultsCache[input];

        let number = 0;

        angular.forEach(bigrams, (value, key) => {
            input = input.replace(key, () => {
                number += value;
                return '';
            });
        });

        if (input === '') return number;

        _(input)
            .split('')
            .each((letter) => {
                number += unigrams[letter];
            });

        resultsCache[input] = number;
        return number;
    };
};