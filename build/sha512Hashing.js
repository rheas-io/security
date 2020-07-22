"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha512Hashing = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const baseHmacHasher_1 = require("./baseHmacHasher");
class Sha512Hashing extends baseHmacHasher_1.BaseHmacHasher {
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHash(value) {
        return crypto_js_1.default.SHA512(value).toString();
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHmacHash(value) {
        return crypto_js_1.default.HmacSHA512(value, this._key).toString();
    }
}
exports.Sha512Hashing = Sha512Hashing;
