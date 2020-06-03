import { KeyValue, ClassOf } from "@rheas/contracts";
import { IHashConfig } from "@rheas/contracts/configs";
import { IHashManager, IHasher } from "@rheas/contracts/security";
export declare class HashingManager implements IHashManager {
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
    protected _hashers: KeyValue<ClassOf<IHasher>>;
    /**
     * Creates a hash manager. The default hasher is created for the
     * driver given in the configuration.
     *
     * @param hashConfig
     */
    constructor(hashConfig: IHashConfig);
    /**
     * @inheritdoc
     *
     * @returns IHasher
     */
    getPasswordHasher(): IHasher;
    /**
     * @inheritdoc
     *
     * @param algo
     */
    getNewHasher(algo: string): IHasher;
    /**
     * Creates a hasher from name, if it exists on the hasher lists.
     * Otherwise a default hasher is created and returned.
     *
     * @param name
     */
    createHasher(name: string): IHasher;
}
