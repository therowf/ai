"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
var dom_1 = require("../dom");
var WithFaceLandmarks_1 = require("../factories/WithFaceLandmarks");
function extractAllFacesAndComputeResults(parentResults, input, computeResults, extractedFaces, getRectForAlignment) {
    if (getRectForAlignment === void 0) { getRectForAlignment = function (_a) {
        var alignedRect = _a.alignedRect;
        return alignedRect;
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var faceBoxes, faces, _a, _b, results;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    faceBoxes = parentResults.map(function (parentResult) {
                        return WithFaceLandmarks_1.isWithFaceLandmarks(parentResult)
                            ? getRectForAlignment(parentResult)
                            : parentResult.detection;
                    });
                    _a = extractedFaces;
                    if (_a) return [3 /*break*/, 5];
                    if (!(input instanceof tf.Tensor)) return [3 /*break*/, 2];
                    return [4 /*yield*/, dom_1.extractFaceTensors(input, faceBoxes)];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, dom_1.extractFaces(input, faceBoxes)];
                case 3:
                    _b = _c.sent();
                    _c.label = 4;
                case 4:
                    _a = (_b);
                    _c.label = 5;
                case 5:
                    faces = _a;
                    return [4 /*yield*/, computeResults(faces)];
                case 6:
                    results = _c.sent();
                    faces.forEach(function (f) { return f instanceof tf.Tensor && f.dispose(); });
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.extractAllFacesAndComputeResults = extractAllFacesAndComputeResults;
function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, extractAllFacesAndComputeResults([parentResult], input, function (faces) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, computeResult(faces[0])];
                }); }); }, extractedFaces, getRectForAlignment)];
        });
    });
}
exports.extractSingleFaceAndComputeResult = extractSingleFaceAndComputeResult;
