import { IApp } from "@rheas/contracts/core";
import { ServiceProvider } from "@rheas/core";
import { HashingManager } from "./hashingManager";
import { IDeferredService } from "../../contracts/build/services";

export class HashingServiceProvider extends ServiceProvider implements IDeferredService {

    /**
     * Register the hashmanager on to the app.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton('hash', (app) => {
            const hashingConfig = (<IApp>app).config('hashing');

            return new HashingManager(hashingConfig);
        });
    }

    /**
     * Defers this service registration, until it is actually needed
     * somewhere.
     * 
     * @returns string
     */
    public provide(): string {
        return "hash";
    }

}