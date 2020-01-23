"use strict";
exports.__esModule = true;
function isWithAge(obj) {
    return typeof obj['age'] === 'number';
}
exports.isWithAge = isWithAge;
function extendWithAge(sourceObj, age) {
    var extension = { age: age };
    return Object.assign({}, sourceObj, extension);
}
exports.extendWithAge = extendWithAge;
