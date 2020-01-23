"use strict";
exports.__esModule = true;
var env_1 = require("../env");
function resolveInput(arg) {
    if (!env_1.env.isNodejs() && typeof arg === 'string') {
        return document.getElementById(arg);
    }
    return arg;
}
exports.resolveInput = resolveInput;
