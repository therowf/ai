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
var WithAge_1 = require("../factories/WithAge");
var WithGender_1 = require("../factories/WithGender");
var ComposableTask_1 = require("./ComposableTask");
var ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
var extractFacesAndComputeResults_1 = require("./extractFacesAndComputeResults");
var nets_1 = require("./nets");
var PredictFaceExpressionsTask_1 = require("./PredictFaceExpressionsTask");
var PredictAgeAndGenderTaskBase = /** @class */ (function (_super) {
    __extends(PredictAgeAndGenderTaskBase, _super);
    function PredictAgeAndGenderTaskBase(parentTask, input, extractedFaces) {
        var _this = _super.call(this) || this;
        _this.parentTask = parentTask;
        _this.input = input;
        _this.extractedFaces = extractedFaces;
        return _this;
    }
    return PredictAgeAndGenderTaskBase;
}(ComposableTask_1.ComposableTask));
exports.PredictAgeAndGenderTaskBase = PredictAgeAndGenderTaskBase;
var PredictAllAgeAndGenderTask = /** @class */ (function (_super) {
    __extends(PredictAllAgeAndGenderTask, _super);
    function PredictAllAgeAndGenderTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllAgeAndGenderTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentResults, ageAndGenderByFace;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResults = _a.sent();
                        return [4 /*yield*/, extractFacesAndComputeResults_1.extractAllFacesAndComputeResults(parentResults, this.input, function (faces) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(faces.map(function (face) { return nets_1.nets.ageGenderNet.predictAgeAndGender(face); }))];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, this.extractedFaces)];
                    case 2:
                        ageAndGenderByFace = _a.sent();
                        return [2 /*return*/, parentResults.map(function (parentResult, i) {
                                var _a = ageAndGenderByFace[i], age = _a.age, gender = _a.gender, genderProbability = _a.genderProbability;
                                return WithAge_1.extendWithAge(WithGender_1.extendWithGender(parentResult, gender, genderProbability), age);
                            })];
                }
            });
        });
    };
    PredictAllAgeAndGenderTask.prototype.withFaceExpressions = function () {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsTask(this, this.input);
    };
    return PredictAllAgeAndGenderTask;
}(PredictAgeAndGenderTaskBase));
exports.PredictAllAgeAndGenderTask = PredictAllAgeAndGenderTask;
var PredictSingleAgeAndGenderTask = /** @class */ (function (_super) {
    __extends(PredictSingleAgeAndGenderTask, _super);
    function PredictSingleAgeAndGenderTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleAgeAndGenderTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentResult, _a, age, gender, genderProbability;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResult = _b.sent();
                        if (!parentResult) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extractFacesAndComputeResults_1.extractSingleFaceAndComputeResult(parentResult, this.input, function (face) { return nets_1.nets.ageGenderNet.predictAgeAndGender(face); }, this.extractedFaces)];
                    case 2:
                        _a = _b.sent(), age = _a.age, gender = _a.gender, genderProbability = _a.genderProbability;
                        return [2 /*return*/, WithAge_1.extendWithAge(WithGender_1.extendWithGender(parentResult, gender, genderProbability), age)];
                }
            });
        });
    };
    PredictSingleAgeAndGenderTask.prototype.withFaceExpressions = function () {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsTask(this, this.input);
    };
    return PredictSingleAgeAndGenderTask;
}(PredictAgeAndGenderTaskBase));
exports.PredictSingleAgeAndGenderTask = PredictSingleAgeAndGenderTask;
var PredictAllAgeAndGenderWithFaceAlignmentTask = /** @class */ (function (_super) {
    __extends(PredictAllAgeAndGenderWithFaceAlignmentTask, _super);
    function PredictAllAgeAndGenderWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllAgeAndGenderWithFaceAlignmentTask.prototype.withFaceExpressions = function () {
        return new PredictFaceExpressionsTask_1.PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    PredictAllAgeAndGenderWithFaceAlignmentTask.prototype.withFaceDescriptors = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return PredictAllAgeAndGenderWithFaceAlignmentTask;
}(PredictAllAgeAndGenderTask));
exports.PredictAllAgeAndGenderWithFaceAlignmentTask = PredictAllAgeAndGenderWithFaceAlignmentTask;
var PredictSingleAgeAndGenderWithFaceAlignmentTask = /** @class */ (function (_super) {
    __extends(PredictSingleAgeAndGenderWithFaceAlignmentTask, _super);
    function PredictSingleAgeAndGenderWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleAgeAndGenderWithFaceAlignmentTask.prototype.withFaceExpressions = function () {
        return new PredictFaceExpressionsTask_1.PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    PredictSingleAgeAndGenderWithFaceAlignmentTask.prototype.withFaceDescriptor = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return PredictSingleAgeAndGenderWithFaceAlignmentTask;
}(PredictSingleAgeAndGenderTask));
exports.PredictSingleAgeAndGenderWithFaceAlignmentTask = PredictSingleAgeAndGenderWithFaceAlignmentTask;
