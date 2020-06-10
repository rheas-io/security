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
exports.EncryptServiceProvider = void 0;
var encrypter_1 = require("./encrypter");
var core_1 = require("@rheas/core");
var EncryptServiceProvider = /** @class */ (function (_super) {
    __extends(EncryptServiceProvider, _super);
    function EncryptServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Register the hashmanager on to the app.
     *
     * @inheritdoc
     */
    EncryptServiceProvider.prototype.register = function () {
        this.container.singleton(this.serviceName(), function (app) {
            var config = app.config('app');
            return new encrypter_1.Encrypter(config.key, config.cipher);
        });
    };
    return EncryptServiceProvider;
}(core_1.DeferredServiceProvider));
exports.EncryptServiceProvider = EncryptServiceProvider;
