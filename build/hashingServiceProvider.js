"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingServiceProvider = void 0;
const helpers_1 = require("@rheas/support/helpers");
const hashingManager_1 = require("./hashingManager");
const services_1 = require("@rheas/services");
class HashingServiceProvider extends services_1.DeferredServiceProvider {
    /**
     * Register the hashmanager on to the app container.
     *
     * @inheritdoc
     */
    register() {
        this.container.singleton(this.name, app => {
            const hashingConfig = helpers_1.config('hashing');
            return new hashingManager_1.HashingManager(hashingConfig);
        });
    }
}
exports.HashingServiceProvider = HashingServiceProvider;
