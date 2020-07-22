"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingManager = void 0;
const md5Hashing_1 = require("./md5Hashing");
const sha256Hashing_1 = require("./sha256Hashing");
const sha512Hashing_1 = require("./sha512Hashing");
const bcryptHashing_1 = require("./bcryptHashing");
class HashingManager {
    /**
     * Creates a hash manager. The default hasher is created for the
     * driver given in the configuration.
     *
     * @param hashConfig
     */
    constructor(hashConfig) {
        /**
         * The hashers available for use.
         *
         * @var object
         */
        this._hashers = {
            'md5': md5Hashing_1.Md5Hashing,
            'bcrypt': bcryptHashing_1.BcryptHashing,
            'sha-256': sha256Hashing_1.Sha256Hashing,
            'sha-512': sha512Hashing_1.Sha512Hashing,
        };
        this._config = hashConfig;
        this._passwordHasher = this.getNewHasher(hashConfig.driver);
    }
    /**
     * @inheritdoc
     *
     * @returns IHasher
     */
    getPasswordHasher() {
        return this._passwordHasher;
    }
    /**
     * @inheritdoc
     *
     * @param algo
     */
    getNewHasher(algo) {
        return this.createHasher(algo);
    }
    /**
     * Creates a hasher from name, if it exists on the hasher lists.
     * Otherwise a default hasher is created and returned.
     *
     * @param name
     */
    createHasher(name) {
        try {
            const hasher = this._hashers[name];
            return new hasher(this._config);
        }
        catch (err) { }
        // Return a default hasher, if hasher for the algo is 
        // not found.
        return new md5Hashing_1.Md5Hashing(this._config);
    }
}
exports.HashingManager = HashingManager;
