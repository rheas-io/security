import { IApp } from "@rheas/contracts/core";
import { HashingManager } from "./hashingManager";
import { DeferredServiceProvider } from "@rheas/core";
import { IHashConfig } from "@rheas/contracts/configs";

export class HashingServiceProvider extends DeferredServiceProvider {

    /**
     * Register the hashmanager on to the app container.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.serviceName(), app => {
            const hashingConfig: IHashConfig = (<IApp>app).config('hashing');

            return new HashingManager(hashingConfig);
        });
    }

}