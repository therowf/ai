"use strict";
exports.__esModule = true;
var env_1 = require("../env");
function isMediaElement(input) {
    var _a = env_1.env.getEnv(), Image = _a.Image, Canvas = _a.Canvas, Video = _a.Video;
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
exports.isMediaElement = isMediaElement;
