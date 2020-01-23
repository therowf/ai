"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
function normalize(x, meanRgb) {
    return tf.tidy(function () {
        var r = meanRgb[0], g = meanRgb[1], b = meanRgb[2];
        var avg_r = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), r);
        var avg_g = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), g);
        var avg_b = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), b);
        var avg_rgb = tf.concat([avg_r, avg_g, avg_b], 3);
        return tf.sub(x, avg_rgb);
    });
}
exports.normalize = normalize;
