"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHashing = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptHashing {
    /**
     * Creates a bcrypt hasher. Salt rounds are determined from
     * the configuration file or a default value of 12 is used.
     *
     * @param param0
     */
    constructor({ bcrypt }) {
        /**
         * The number of rounds to be used for salt generation.
         *
         * @var number
         */
        this._rounds = 12;
        this._rounds = (bcrypt && bcrypt.rounds) || 12;
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    async createHash(value) {
        return await bcrypt_1.default.hash(value, this._rounds);
    }
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    async compare(value, hashedValue) {
        return await bcrypt_1.default.compare(value, hashedValue);
    }
}
exports.BcryptHashing = BcryptHashing;
