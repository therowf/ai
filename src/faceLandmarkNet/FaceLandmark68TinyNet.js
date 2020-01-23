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
var TinyFaceFeatureExtractor_1 = require("../faceFeatureExtractor/TinyFaceFeatureExtractor");
var FaceLandmark68NetBase_1 = require("./FaceLandmark68NetBase");
var FaceLandmark68TinyNet = /** @class */ (function (_super) {
    __extends(FaceLandmark68TinyNet, _super);
    function FaceLandmark68TinyNet(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyFaceFeatureExtractor_1.TinyFaceFeatureExtractor(); }
        return _super.call(this, 'FaceLandmark68TinyNet', faceFeatureExtractor) || this;
    }
    FaceLandmark68TinyNet.prototype.getDefaultModelName = function () {
        return 'face_landmark_68_tiny_model';
    };
    FaceLandmark68TinyNet.prototype.getClassifierChannelsIn = function () {
        return 128;
    };
    return FaceLandmark68TinyNet;
}(FaceLandmark68NetBase_1.FaceLandmark68NetBase));
exports.FaceLandmark68TinyNet = FaceLandmark68TinyNet;
