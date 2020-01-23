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
var classes_1 = require("../classes");
var MtcnnBox = /** @class */ (function (_super) {
    __extends(MtcnnBox, _super);
    function MtcnnBox(left, top, right, bottom) {
        return _super.call(this, { left: left, top: top, right: right, bottom: bottom }, true) || this;
    }
    return MtcnnBox;
}(classes_1.Box));
exports.MtcnnBox = MtcnnBox;
