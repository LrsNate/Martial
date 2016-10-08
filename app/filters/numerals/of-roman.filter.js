const _ = require('lodash');

export default () => {
  const unigrams = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  const bigrams = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4 };
  const resultsCache = {};
  const has = Object.prototype.hasOwnProperty;

  return (input) => {
    if (has.call(resultsCache, input)) return resultsCache[input];

    let number = 0;
    let romanNumber = input;

    _.forOwn(bigrams, (value, key) => {
      romanNumber = romanNumber.replace(key, () => {
        number += value;
        return '';
      });
    });

    if (romanNumber === '') return number;

    _(romanNumber)
      .split('')
      .each((letter) => {
        number += unigrams[letter];
      });

    resultsCache[input] = number;
    return number;
  };
};
