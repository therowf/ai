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
var convLayer_1 = require("./convLayer");
function residual(x, params) {
    var out = convLayer_1.conv(x, params.conv1);
    out = convLayer_1.convNoRelu(out, params.conv2);
    out = tf.add(out, x);
    out = tf.relu(out);
    return out;
}
exports.residual = residual;
function residualDown(x, params) {
    var out = convLayer_1.convDown(x, params.conv1);
    out = convLayer_1.convNoRelu(out, params.conv2);
    var pooled = tf.avgPool(x, 2, 2, 'valid');
    var zeros = tf.zeros(pooled.shape);
    var isPad = pooled.shape[3] !== out.shape[3];
    var isAdjustShape = pooled.shape[1] !== out.shape[1] || pooled.shape[2] !== out.shape[2];
    if (isAdjustShape) {
        var padShapeX = __spreadArrays(out.shape);
        padShapeX[1] = 1;
        var zerosW = tf.zeros(padShapeX);
        out = tf.concat([out, zerosW], 1);
        var padShapeY = __spreadArrays(out.shape);
        padShapeY[2] = 1;
        var zerosH = tf.zeros(padShapeY);
        out = tf.concat([out, zerosH], 2);
    }
    pooled = isPad ? tf.concat([pooled, zeros], 3) : pooled;
    out = tf.add(pooled, out);
    out = tf.relu(out);
    return out;
}
exports.residualDown = residualDown;
