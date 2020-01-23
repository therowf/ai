"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = require("../utils");
var LabeledBox_1 = require("./LabeledBox");
var PredictedBox = /** @class */ (function (_super) {
    __extends(PredictedBox, _super);
    function PredictedBox(box, label, score, classScore) {
        var _this = _super.call(this, box, label) || this;
        _this._score = score;
        _this._classScore = classScore;
        return _this;
    }
    PredictedBox.assertIsValidPredictedBox = function (box, callee) {
        LabeledBox_1.LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!utils_1.isValidProbablitiy(box.score)
            || !utils_1.isValidProbablitiy(box.classScore)) {
            throw new Error(callee + " - expected properties score (" + box.score + ") and (" + box.classScore + ") to be a number between [0, 1]");
        }
    };
    Object.defineProperty(PredictedBox.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PredictedBox.prototype, "classScore", {
        get: function () { return this._classScore; },
        enumerable: true,
        configurable: true
    });
    return PredictedBox;
}(LabeledBox_1.LabeledBox));
exports.PredictedBox = PredictedBox;
