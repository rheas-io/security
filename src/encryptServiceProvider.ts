import { Encrypter } from "./encrypter";
import { config } from "@rheas/support/helpers";
import { IAppConfig } from "@rheas/contracts/configs";
import { DeferredServiceProvider } from "@rheas/services";

export class EncryptServiceProvider extends DeferredServiceProvider {

    /**
     * Register the hashmanager on to the app.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.name, app => {
            const configs: IAppConfig = config('app');

            return new Encrypter(configs.key, configs.cipher);
        });
    }
}