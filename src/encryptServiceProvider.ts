import { Encryptor } from "./encryptor";
import { ServiceProvider } from "@rheas/core";
import { IDeferredService } from "../../contracts/build/services";

export class EncryptServiceProvider extends ServiceProvider implements IDeferredService {

    /**
     * Register the hashmanager on to the app.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.provide(), (app) => {
            return new Encryptor();
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