"use strict";
exports.__esModule = true;
function extendWithFaceDescriptor(sourceObj, descriptor) {
    var extension = { descriptor: descriptor };
    return Object.assign({}, sourceObj, extension);
}
exports.extendWithFaceDescriptor = extendWithFaceDescriptor;
