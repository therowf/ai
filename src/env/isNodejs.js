"use strict";
exports.__esModule = true;
function isNodejs() {
    return typeof global === 'object'
        && typeof require === 'function'
        && typeof module !== 'undefined'
        // issues with gatsby.js: module.exports is undefined
        // && !!module.exports
        && typeof process !== 'undefined' && !!process.version;
}
exports.isNodejs = isNodejs;
