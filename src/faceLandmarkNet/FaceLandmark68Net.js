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
var FaceFeatureExtractor_1 = require("../faceFeatureExtractor/FaceFeatureExtractor");
var FaceLandmark68NetBase_1 = require("./FaceLandmark68NetBase");
var FaceLandmark68Net = /** @class */ (function (_super) {
    __extends(FaceLandmark68Net, _super);
    function FaceLandmark68Net(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new FaceFeatureExtractor_1.FaceFeatureExtractor(); }
        return _super.call(this, 'FaceLandmark68Net', faceFeatureExtractor) || this;
    }
    FaceLandmark68Net.prototype.getDefaultModelName = function () {
        return 'face_landmark_68_model';
    };
    FaceLandmark68Net.prototype.getClassifierChannelsIn = function () {
        return 256;
    };
    return FaceLandmark68Net;
}(FaceLandmark68NetBase_1.FaceLandmark68NetBase));
exports.FaceLandmark68Net = FaceLandmark68Net;
