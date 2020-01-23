"use strict";
exports.__esModule = true;
function disposeUnusedWeightTensors(weightMap, paramMappings) {
    Object.keys(weightMap).forEach(function (path) {
        if (!paramMappings.some(function (pm) { return pm.originalPath === path; })) {
            weightMap[path].dispose();
        }
    });
}
exports.disposeUnusedWeightTensors = disposeUnusedWeightTensors;
