import { config } from '@rheas/support/helpers';
import { HashingManager } from './hashingManager';
import { IHashConfig } from '@rheas/contracts/configs';
import { DeferredServiceProvider } from '@rheas/services';

export class HashingServiceProvider extends DeferredServiceProvider {
    /**
     * Register the hashmanager on to the app container.
     *
     * @inheritdoc
     */
    public register() {
        this.container.singleton(this.name, (app) => {
            const hashingConfig: IHashConfig = config('hashing');

            return new HashingManager(hashingConfig);
        });
    }
}
