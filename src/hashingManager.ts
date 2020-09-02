import { Md5Hashing } from './md5Hashing';
import { Sha256Hashing } from './sha256Hashing';
import { Sha512Hashing } from './sha512Hashing';
import { BcryptHashing } from './bcryptHashing';
import { KeyValue, ClassOf } from '@rheas/contracts';
import { IHashConfig } from '@rheas/contracts/configs';
import { IHashManager, IHasher } from '@rheas/contracts/security';

export class HashingManager implements IHashManager {
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
        md5: Md5Hashing,
        bcrypt: BcryptHashing,
        'sha-256': Sha256Hashing,
        'sha-512': Sha512Hashing,
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
        return new Md5Hashing(this._config);
    }
}
