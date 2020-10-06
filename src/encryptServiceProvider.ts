import { Encrypter } from './encrypter';
import { IApp } from '@rheas/contracts/core/app';
import { ServiceProvider } from '@rheas/services';
import { IAppConfig } from '@rheas/contracts/configs';
import { InstanceHandler } from '@rheas/contracts/container';

export class EncryptServiceProvider extends ServiceProvider {
    /**
     * Returns application encrypter service resolver.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return (app) => {
            const configs: IAppConfig = (app as IApp).configs().get('app');

            return new Encrypter(configs.key, configs.cipher, (app as IApp).isRunningInConsole());
        };
    }
}
