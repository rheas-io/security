import { Encrypter } from "./encrypter";
import { IApp } from "@rheas/contracts/core";
import { IAppConfig } from "@rheas/contracts/configs";
import { DeferredServiceProvider } from "@rheas/core";

export class EncryptServiceProvider extends DeferredServiceProvider {

    /**
     * Register the hashmanager on to the app.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.serviceName(), (app) => {
            const config: IAppConfig = (<IApp>app).config('app');

            return new Encrypter(config.key, config.cipher);
        });
    }
}