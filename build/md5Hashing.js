"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Md5Hashing = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const baseHmacHasher_1 = require("./baseHmacHasher");
class Md5Hashing extends baseHmacHasher_1.BaseHmacHasher {
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHash(value) {
        return crypto_js_1.default.MD5(value).toString();
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHmacHash(value) {
        return crypto_js_1.default.HmacMD5(value, this._key).toString();
    }
}
exports.Md5Hashing = Md5Hashing;
