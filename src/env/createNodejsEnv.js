"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var createFileSystem_1 = require("./createFileSystem");
function createNodejsEnv() {
    var Canvas = global['Canvas'] || global['HTMLCanvasElement'];
    var Image = global['Image'] || global['HTMLImageElement'];
    var createCanvasElement = function () {
        if (Canvas) {
            return new Canvas();
        }
        throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment');
    };
    var createImageElement = function () {
        if (Image) {
            return new Image();
        }
        throw new Error('createImageElement - missing Image implementation for nodejs environment');
    };
    var fetch = global['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for nodejs environment');
    };
    var fileSystem = createFileSystem_1.createFileSystem();
    return __assign({ Canvas: Canvas || /** @class */ (function () {
            function Canvas() {
            }
            return Canvas;
        }()), CanvasRenderingContext2D: global['CanvasRenderingContext2D'] || /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()), Image: Image || /** @class */ (function () {
            function Image() {
            }
            return Image;
        }()), ImageData: global['ImageData'] || /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()), Video: global['HTMLVideoElement'] || /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()), createCanvasElement: createCanvasElement,
        createImageElement: createImageElement,
        fetch: fetch }, fileSystem);
}
exports.createNodejsEnv = createNodejsEnv;
