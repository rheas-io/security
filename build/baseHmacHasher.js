"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHmacHasher = void 0;
const crypto_1 = __importDefault(require("crypto"));
class BaseHmacHasher {
    /**
     * Creates a new HMAC hasher. The argument is used as the hash key. This
     * should be available in the hash config file.
     *
     * @param key
     */
    constructor({ key }) {
        this._key = key;
    }
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    async compare(value, hashedValue) {
        const hashedData = await this.createHash(value);
        return this.compareHashes(hashedData, hashedValue);
    }
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    async compareHmacHash(value, hashedValue) {
        const hashedData = await this.createHmacHash(value);
        return this.compareHashes(hashedData, hashedValue);
    }
    /**
     * @inheritdoc
     *
     * @param hashToCheck
     * @param preHashedData
     */
    compareHashes(hashToCheck, preHashedData) {
        try {
            const bufferToCheck = Buffer.from(hashToCheck);
            const bufferPreHash = Buffer.from(preHashedData);
            return crypto_1.default.timingSafeEqual(bufferToCheck, bufferPreHash);
        }
        catch (err) {
            return false;
        }
    }
}
exports.BaseHmacHasher = BaseHmacHasher;
