import { config } from '@rheas/support/helpers';
import { HashingManager } from './hashingManager';
import { IHashConfig } from '@rheas/contracts/configs';
import { DeferredServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';

export class HashingServiceProvider extends DeferredServiceProvider {
    /**
     * Returns application hashing manager resolver.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return () => {
            const hashingConfig: IHashConfig = config('hashing');

            return new HashingManager(hashingConfig);
        };
    }
}
