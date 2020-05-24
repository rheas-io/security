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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingServiceProvider = void 0;
var core_1 = require("@rheas/core");
var hashingManager_1 = require("./hashingManager");
var HashingServiceProvider = /** @class */ (function (_super) {
    __extends(HashingServiceProvider, _super);
    function HashingServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Register the hashmanager on to the app.
     *
     * @inheritdoc
     */
    HashingServiceProvider.prototype.register = function () {
        this.container.singleton('hash', function (app) {
            return new hashingManager_1.HashingManager();
        });
    };
    /**
     * Defers this service registration, until it is actually needed
     * somewhere.
     *
     * @returns string
     */
    HashingServiceProvider.prototype.provide = function () {
        return "hash";
    };
    return HashingServiceProvider;
}(core_1.ServiceProvider));
exports.HashingServiceProvider = HashingServiceProvider;
