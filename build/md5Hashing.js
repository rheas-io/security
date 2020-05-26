"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md5Hashing = void 0;
var md5_1 = __importDefault(require("md5"));
var Md5Hashing = /** @class */ (function () {
    function Md5Hashing() {
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    Md5Hashing.prototype.createHash = function (value) {
        return md5_1.default(value);
    };
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    Md5Hashing.prototype.compare = function (value, hashedValue) {
        return md5_1.default(value) === hashedValue;
    };
    return Md5Hashing;
}());
exports.Md5Hashing = Md5Hashing;
