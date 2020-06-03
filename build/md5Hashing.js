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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md5Hashing = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var baseHmacHasher_1 = require("./baseHmacHasher");
var Md5Hashing = /** @class */ (function (_super) {
    __extends(Md5Hashing, _super);
    function Md5Hashing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    Md5Hashing.prototype.createHash = function (value) {
        return crypto_js_1.default.MD5(value).toString();
    };
    /**
     * @inheritdoc
     *
     * @param value
     */
    Md5Hashing.prototype.createHmacHash = function (value) {
        return crypto_js_1.default.HmacMD5(value, this._key).toString();
    };
    return Md5Hashing;
}(baseHmacHasher_1.BaseHmacHasher));
exports.Md5Hashing = Md5Hashing;
