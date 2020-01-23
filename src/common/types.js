"use strict";
exports.__esModule = true;
var SeparableConvParams = /** @class */ (function () {
    function SeparableConvParams(depthwise_filter, pointwise_filter, bias) {
        this.depthwise_filter = depthwise_filter;
        this.pointwise_filter = pointwise_filter;
        this.bias = bias;
    }
    return SeparableConvParams;
}());
exports.SeparableConvParams = SeparableConvParams;
