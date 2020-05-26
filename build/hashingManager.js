"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingManager = void 0;
var support_1 = require("@rheas/support");
var md5Hashing_1 = require("./md5Hashing");
var sha256Hashing_1 = require("./sha256Hashing");
var sha512Hashing_1 = require("./sha512Hashing");
var bcryptHashing_1 = require("./bcryptHashing");
var HashingManager = /** @class */ (function () {
    /**
     * Creates a hash manager. The default hasher is created for the algorithm
     * given in the configuration.
     *
     * @param hashConfig
     */
    function HashingManager(hashConfig) {
        /**
         * The hashers available for use.
         *
         * @var object
         */
        this._hashers = {
            'md5': md5Hashing_1.Md5Hashing,
            'sha-256': sha256Hashing_1.Sha256Hashing,
            'sha-512': sha512Hashing_1.Sha512Hashing,
            'bcrypt': bcryptHashing_1.BcryptHashing,
        };
        var algo = hashConfig.algo;
        this._config = hashConfig;
        this._hasher = this.createHasher(algo);
    }
    /**
     * Creates a hasher from name, if it exists on the hasher lists.
     * Otherwise a default hasher is created and returned.
     *
     * @param name
     */
    HashingManager.prototype.createHasher = function (name) {
        try {
            var hasher = this._hashers[name];
            return new hasher();
        }
        catch (err) { }
        return this.createDefaultHasher();
    };
    /**
     * Creates a default hasher
     *
     * @returns IHasher
     */
    HashingManager.prototype.createDefaultHasher = function () {
        return new bcryptHashing_1.BcryptHashing();
    };
    /**
     * Creates a pepper key for the application that can be used
     * along with salt if required.
     *
     * @returns string
     */
    HashingManager.prototype.createPepper = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, support_1.Str.random()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @inheritdoc
     *
     * @returns IHasher
     */
    HashingManager.prototype.getHasher = function () {
        return this._hasher;
    };
    /**
     * @inheritdoc
     *
     * @param value
     */
    HashingManager.prototype.createHash = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasher.createHash(value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    HashingManager.prototype.compare = function (value, hashedValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._hasher.compare(value, hashedValue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HashingManager;
}());
exports.HashingManager = HashingManager;
