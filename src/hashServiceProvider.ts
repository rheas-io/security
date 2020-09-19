import { HashManager } from './hashManager';
import { IApp } from '@rheas/contracts/core/app';
import { ServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';

export class HashServiceProvider extends ServiceProvider {
    /**
     * Returns application hashing manager resolver.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return (app) => {
            const hashConfig = (app as IApp).configs().get('hashing');

            return new HashManager(hashConfig);
        };
    }
}
