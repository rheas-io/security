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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypter = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var support_1 = require("@rheas/support");
var crypto_1 = __importDefault(require("crypto"));
var encrypter_1 = require("@rheas/errors/encrypter");
var Encrypter = /** @class */ (function () {
    /**
     * Creates a new encryption handler class. All encryptions are done
     * using the key and cipher given in the app configs. Handler construction
     * throws error if key is invalid.
     *
     * @param key
     * @param cipher
     */
    function Encrypter(key, cipher) {
        if (cipher === void 0) { cipher = "aes-128-gcm"; }
        this._key = key;
        this._cipher = cipher;
        this.validateKey();
    }
    /**
     * Throws exception when key is invalid. Validation is done on the
     * length of key and cipher key length requirement.
     *
     * @throws
     */
    Encrypter.prototype.validateKey = function () {
        var keyLength = Buffer.from(this._key, 'hex').byteLength;
        if (Encrypter.keyLength(this._cipher) !== keyLength) {
            throw new encrypter_1.EncrypterException("Invalid application key provided.");
        }
    };
    /**
     * Returns keylength of the given cipher. Throws an error if an invalid
     * cipher is given.
     *
     * @param cipher
     */
    Encrypter.keyLength = function (cipher) {
        var keyLengths = {
            "aes-128-gcm": 16,
            "aes-192-gcm": 24,
            "aes-256-gcm": 32
        };
        if (keyLengths[cipher] === undefined) {
            throw new encrypter_1.EncrypterException("Invalid cipher. Allowed ciphers are: aes-128-gcm, aes-192-gcm and aes-256-gcm");
        }
        return keyLengths[cipher];
    };
    /**
     * Creates an application encrypter key.
     *
     * @param cipher
     */
    Encrypter.generateKey = function (cipher) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, support_1.Str.random(Encrypter.keyLength(cipher))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @inheritdoc
     *
     * @param value
     */
    Encrypter.prototype.encrypt = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var iv, encrypter, encrypted, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (typeof value !== 'string') {
                            value = JSON.stringify(value);
                        }
                        return [4 /*yield*/, support_1.Str.random(16)];
                    case 1:
                        iv = _a.sent();
                        encrypter = crypto_1.default.createCipheriv(this._cipher, Buffer.from(this._key, 'hex'), Buffer.from(iv, 'hex'));
                        encrypted = Buffer.concat([encrypter.update(value, 'utf8'), encrypter.final()]);
                        // Returns a hex encoded JSON containing iv, encrypted value as 
                        // value and auth tag as tag. All the three values are hex encoded.
                        return [2 /*return*/, crypto_js_1.default.enc.Utf8.parse(JSON.stringify({
                                iv: iv,
                                value: encrypted.toString('hex'),
                                tag: encrypter.getAuthTag().toString('hex')
                            })).toString()];
                    case 2:
                        err_1 = _a.sent();
                        throw new encrypter_1.EncrypterException("Error encrypting the data").setException(err_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritdoc
     *
     * @param value
     */
    Encrypter.prototype.decrypt = function (encrypted) {
        try {
            // Convert the hex encoded value to JSON object containing
            // the iv, value and tag.
            var _a = JSON.parse(crypto_js_1.default.enc.Hex.parse(encrypted).toString(crypto_js_1.default.enc.Utf8)), iv = _a.iv, value = _a.value, tag = _a.tag;
            var decrypter = crypto_1.default.createDecipheriv(this._cipher, Buffer.from(this._key, 'hex'), Buffer.from(iv, 'hex')).setAuthTag(Buffer.from(tag, 'hex'));
            // Decrypts the encrypted hex value and converts it into a utf8 
            // encoded human readable string.
            var decryptedValue = Buffer.concat([decrypter.update(Buffer.from(value, 'hex')), decrypter.final()]).toString('utf8');
            // Try to parse JSON string from the decryoted value or throws
            // an error if not a JSON object.
            try {
                return JSON.parse(decryptedValue);
            }
            catch (err) { }
            return decryptedValue;
        }
        // Throws a decryption error if any sort of error like Json parse
        // error or decipher creation/update error occurs. 
        //
        // Decrypter also throws exception when the data integrity check
        // fails.
        catch (err) {
            throw new encrypter_1.EncrypterException("Error decrypting the data").setException(err);
        }
    };
    return Encrypter;
}());
exports.Encrypter = Encrypter;
