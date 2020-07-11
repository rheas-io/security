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
var helpers_1 = require("@rheas/support/helpers");
var hashingManager_1 = require("./hashingManager");
var services_1 = require("@rheas/services");
var HashingServiceProvider = /** @class */ (function (_super) {
    __extends(HashingServiceProvider, _super);
    function HashingServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Register the hashmanager on to the app container.
     *
     * @inheritdoc
     */
    HashingServiceProvider.prototype.register = function () {
        this.container.singleton(this.name, function (app) {
            var hashingConfig = helpers_1.config('hashing');
            return new hashingManager_1.HashingManager(hashingConfig);
        });
    };
    return HashingServiceProvider;
}(services_1.DeferredServiceProvider));
exports.HashingServiceProvider = HashingServiceProvider;
