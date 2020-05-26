"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaHashing = void 0;
var ShaHashing = /** @class */ (function () {
    /**
     * Creates a new sha hasher
     *
     * @param driver
     */
    function ShaHashing(driver) {
        this._driver = driver;
    }
    /**
     * @inheritdoc
     *
     * @param value
     */
    ShaHashing.prototype.createHash = function (value) {
        return this._driver.update(value).digest('base64');
    };
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    ShaHashing.prototype.compare = function (value, hashedValue) {
        return this._driver.update(value).digest('base64') === hashedValue;
    };
    return ShaHashing;
}());
exports.ShaHashing = ShaHashing;
