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
var tf = require("@tensorflow/tfjs-core");
var fullyConnectedLayer_1 = require("../common/fullyConnectedLayer");
var util_1 = require("../faceProcessor/util");
var TinyXception_1 = require("../xception/TinyXception");
var extractParams_1 = require("./extractParams");
var extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
var types_1 = require("./types");
var NeuralNetwork_1 = require("../NeuralNetwork");
var dom_1 = require("../dom");
var AgeGenderNet = /** @class */ (function (_super) {
    __extends(AgeGenderNet, _super);
    function AgeGenderNet(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyXception_1.TinyXception(2); }
        var _this = _super.call(this, 'AgeGenderNet') || this;
        _this._faceFeatureExtractor = faceFeatureExtractor;
        return _this;
    }
    Object.defineProperty(AgeGenderNet.prototype, "faceFeatureExtractor", {
        get: function () {
            return this._faceFeatureExtractor;
        },
        enumerable: true,
        configurable: true
    });
    AgeGenderNet.prototype.runNet = function (input) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error(this._name + " - load model before inference");
        }
        return tf.tidy(function () {
            var bottleneckFeatures = input instanceof dom_1.NetInput
                ? _this.faceFeatureExtractor.forwardInput(input)
                : input;
            var pooled = tf.avgPool(bottleneckFeatures, [7, 7], [2, 2], 'valid').as2D(bottleneckFeatures.shape[0], -1);
            var age = fullyConnectedLayer_1.fullyConnectedLayer(pooled, params.fc.age).as1D();
            var gender = fullyConnectedLayer_1.fullyConnectedLayer(pooled, params.fc.gender);
            return { age: age, gender: gender };
        });
    };
    AgeGenderNet.prototype.forwardInput = function (input) {
        var _this = this;
        return tf.tidy(function () {
            var _a = _this.runNet(input), age = _a.age, gender = _a.gender;
            return { age: age, gender: tf.softmax(gender) };
        });
    };
    AgeGenderNet.prototype.forward = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, dom_1.toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    AgeGenderNet.prototype.predictAgeAndGender = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var netInput, out, ages, genders, ageAndGenderTensors, predictionsByBatch;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dom_1.toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        return [4 /*yield*/, this.forwardInput(netInput)];
                    case 2:
                        out = _a.sent();
                        ages = tf.unstack(out.age);
                        genders = tf.unstack(out.gender);
                        ageAndGenderTensors = ages.map(function (ageTensor, i) { return ({
                            ageTensor: ageTensor,
                            genderTensor: genders[i]
                        }); });
                        return [4 /*yield*/, Promise.all(ageAndGenderTensors.map(function (_a) {
                                var ageTensor = _a.ageTensor, genderTensor = _a.genderTensor;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var age, probMale, isMale, gender, genderProbability;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, ageTensor.data()];
                                            case 1:
                                                age = (_b.sent())[0];
                                                return [4 /*yield*/, genderTensor.data()];
                                            case 2:
                                                probMale = (_b.sent())[0];
                                                isMale = probMale > 0.5;
                                                gender = isMale ? types_1.Gender.MALE : types_1.Gender.FEMALE;
                                                genderProbability = isMale ? probMale : (1 - probMale);
                                                ageTensor.dispose();
                                                genderTensor.dispose();
                                                return [2 /*return*/, { age: age, gender: gender, genderProbability: genderProbability }];
                                        }
                                    });
                                });
                            }))];
                    case 3:
                        predictionsByBatch = _a.sent();
                        out.age.dispose();
                        out.gender.dispose();
                        return [2 /*return*/, netInput.isBatchInput
                                ? predictionsByBatch
                                : predictionsByBatch[0]];
                }
            });
        });
    };
    AgeGenderNet.prototype.getDefaultModelName = function () {
        return 'age_gender_model';
    };
    AgeGenderNet.prototype.dispose = function (throwOnRedispose) {
        if (throwOnRedispose === void 0) { throwOnRedispose = true; }
        this.faceFeatureExtractor.dispose(throwOnRedispose);
        _super.prototype.dispose.call(this, throwOnRedispose);
    };
    AgeGenderNet.prototype.loadClassifierParams = function (weights) {
        var _a = this.extractClassifierParams(weights), params = _a.params, paramMappings = _a.paramMappings;
        this._params = params;
        this._paramMappings = paramMappings;
    };
    AgeGenderNet.prototype.extractClassifierParams = function (weights) {
        return extractParams_1.extractParams(weights);
    };
    AgeGenderNet.prototype.extractParamsFromWeigthMap = function (weightMap) {
        var _a = util_1.seperateWeightMaps(weightMap), featureExtractorMap = _a.featureExtractorMap, classifierMap = _a.classifierMap;
        this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(classifierMap);
    };
    AgeGenderNet.prototype.extractParams = function (weights) {
        var classifierWeightSize = (512 * 1 + 1) + (512 * 2 + 2);
        var featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
        var classifierWeights = weights.slice(weights.length - classifierWeightSize);
        this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
        return this.extractClassifierParams(classifierWeights);
    };
    return AgeGenderNet;
}(NeuralNetwork_1.NeuralNetwork));
exports.AgeGenderNet = AgeGenderNet;
