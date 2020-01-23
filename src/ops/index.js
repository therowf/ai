"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./iou"));
__export(require("./minBbox"));
__export(require("./nonMaxSuppression"));
__export(require("./normalize"));
__export(require("./padToSquare"));
__export(require("./shuffleArray"));
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
exports.sigmoid = sigmoid;
function inverseSigmoid(x) {
    return Math.log(x / (1 - x));
}
exports.inverseSigmoid = inverseSigmoid;
