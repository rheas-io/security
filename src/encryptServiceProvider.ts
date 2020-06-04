import { Encrypter } from "./encrypter";
import { IApp } from "@rheas/contracts/core";
import { ServiceProvider } from "@rheas/core";
import { IAppConfig } from "@rheas/contracts/configs";
import { IDeferredService } from "@rheas/contracts/services";

export class EncryptServiceProvider extends ServiceProvider implements IDeferredService {

    /**
     * Register the hashmanager on to the app.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.provide(), (app) => {
            const config: IAppConfig = (<IApp>app).config('app');

            return new Encrypter(config.key, config.cipher);
        });
    }

    /**
     * Defers this service registration, until it is actually needed
     * somewhere.
     * 
     * @returns string
     */
    public provide(): string {
        return "encrypt";
    }

}