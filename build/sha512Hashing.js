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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha512Hashing = void 0;
var sha_js_1 = require("sha.js");
var shaHashing_1 = require("./shaHashing");
var Sha512Hashing = /** @class */ (function (_super) {
    __extends(Sha512Hashing, _super);
    /**
     * Creates a new sha-512 hasher
     */
    function Sha512Hashing() {
        return _super.call(this, new sha_js_1.sha512()) || this;
    }
    return Sha512Hashing;
}(shaHashing_1.ShaHashing));
exports.Sha512Hashing = Sha512Hashing;
