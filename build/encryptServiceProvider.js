"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptServiceProvider = void 0;
const encrypter_1 = require("./encrypter");
const helpers_1 = require("@rheas/support/helpers");
const services_1 = require("@rheas/services");
class EncryptServiceProvider extends services_1.DeferredServiceProvider {
    /**
     * Register the hashmanager on to the app.
     *
     * @inheritdoc
     */
    register() {
        this.container.singleton(this.name, app => {
            const configs = helpers_1.config('app');
            return new encrypter_1.Encrypter(configs.key, configs.cipher);
        });
    }
}
exports.EncryptServiceProvider = EncryptServiceProvider;
