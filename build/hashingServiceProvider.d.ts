import { ServiceProvider } from "@rheas/core";
import { IDeferredService } from "../../contracts/build/services";
export declare class HashingServiceProvider extends ServiceProvider implements IDeferredService {
    /**
     * Register the hashmanager on to the app.
     *
     * @inheritdoc
     */
    register(): void;
    /**
     * Defers this service registration, until it is actually needed
     * somewhere.
     *
     * @returns string
     */
    provide(): string;
}