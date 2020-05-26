import { Str } from "@rheas/support";
import { Md5Hashing } from "./md5Hashing";
import { Sha256Hashing } from "./sha256Hashing";
import { Sha512Hashing } from "./sha512Hashing";
import { BcryptHashing } from "./bcryptHashing";
import { KeyValue, ClassOf, AnyObject } from "@rheas/contracts";
import { IHashManager, IHasher } from "@rheas/contracts/security";

export class HashingManager implements IHashManager {

    /**
     * @var object
     */
    protected _config: object;

    /**
     * The application hasher
     * 
     * @var IHasher
     */
    protected _hasher: IHasher;

    /**
     * The hashers available for use.
     * 
     * @var object
     */
    protected _hashers: KeyValue<ClassOf<IHasher>> = {
        'md5': Md5Hashing,
        'sha-256': Sha256Hashing,
        'sha-512': Sha512Hashing,
        'bcrypt': BcryptHashing,
    }

    /**
     * Creates a hash manager. The default hasher is created for the algorithm
     * given in the configuration.
     * 
     * @param hashConfig 
     */
    constructor(hashConfig: AnyObject) {
        const algo = hashConfig.algo;

        this._config = hashConfig;
        this._hasher = this.createHasher(algo);
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

            return new hasher();
        } catch (err) { }

        return this.createDefaultHasher();
    }

    /**
     * Creates a default hasher
     * 
     * @returns IHasher
     */
    public createDefaultHasher(): IHasher {
        return new BcryptHashing();
    }

    /**
     * Creates a pepper key for the application that can be used
     * along with salt if required.
     * 
     * @returns string
     */
    public async createPepper(): Promise<string> {
        return await Str.random();
    }

    /**
     * @inheritdoc
     * 
     * @returns IHasher
     */
    public getHasher(): IHasher {
        return this._hasher;
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public async createHash(value: string): Promise<string> {
        return await this._hasher.createHash(value);
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     * @param hashedValue 
     */
    public async compare(value: string, hashedValue: string): Promise<boolean> {
        return await this._hasher.compare(value, hashedValue);
    }
}