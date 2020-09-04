import { Encrypter } from './encrypter';
import { config } from '@rheas/support/helpers';
import { IAppConfig } from '@rheas/contracts/configs';
import { DeferredServiceProvider } from '@rheas/services';
import { InstanceHandler } from '@rheas/contracts/container';

export class EncryptServiceProvider extends DeferredServiceProvider {
    /**
     * Returns application encrypter service resolver.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return () => {
            const configs: IAppConfig = config('app');

            return new Encrypter(configs.key, configs.cipher);
        };
    }
}
