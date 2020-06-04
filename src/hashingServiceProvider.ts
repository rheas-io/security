import { IApp } from "@rheas/contracts/core";
import { ServiceProvider } from "@rheas/core";
import { HashingManager } from "./hashingManager";
import { IHashConfig } from "@rheas/contracts/configs";
import { IDeferredService } from "../../contracts/build/services";

export class HashingServiceProvider extends ServiceProvider implements IDeferredService {

    /**
     * Register the hashmanager on to the app container.
     * 
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.provide(), app => {
            const hashingConfig: IHashConfig = (<IApp>app).config('hashing');

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