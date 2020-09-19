import { Md5Hasher } from './md5Hasher';
import { Sha256Hasher } from './sha256Hasher';
import { Sha512Hasher } from './sha512Hasher';
import { BcryptHasher } from './bcryptHasher';
import { KeyValue, ClassOf } from '@rheas/contracts';
import { IHashConfig } from '@rheas/contracts/configs';
import { IHashManager, IHasher } from '@rheas/contracts/security';

export class HashManager implements IHashManager {
    /**
     * Application hashing related configurations.
     *
     * @var IHashConfig
     */
    protected _config: IHashConfig;

    /**
     * The applications password hasher
     *
     * @var IHasher
     */
    protected _passwordHasher: IHasher;

    /**
     * The hashers available for use.
     *
     * @var object
     */
    protected _hashers: KeyValue<ClassOf<IHasher>> = {
        md5: Md5Hasher,
        bcrypt: BcryptHasher,
        'sha-256': Sha256Hasher,
        'sha-512': Sha512Hasher,
    };

    /**
     * Creates a hash manager. The default hasher is created for the
     * driver given in the configuration.
     *
     * @param hashConfig
     */
    constructor(hashConfig: IHashConfig) {
        this._config = hashConfig;
        this._passwordHasher = this.getNewHasher(hashConfig.driver);
    }

    /**
     * @inheritdoc
     *
     * @returns IHasher
     */
    public getPasswordHasher(): IHasher {
        return this._passwordHasher;
    }

    /**
     * @inheritdoc
     *
     * @param algo
     */
    public getNewHasher(algo: string): IHasher {
        return this.createHasher(algo);
    }

    /**
     * Creates a hasher from name, if it exists on the hasher lists.
     * Otherwise a default hasher is created and returned.
     *
     * @param name
     */
    public createHasher(name: string): IHasher {
        try {
            const hasher = this._hashers[name];

            return new hasher(this._config);
        } catch (err) {}

        // Return a default hasher, if hasher for the algo is
        // not found.
        return new Md5Hasher(this._config);
    }
}
