import { KeyValue, ClassOf, AnyObject } from "@rheas/contracts";
import { IHashManager, IHasher } from "@rheas/contracts/security";
export declare class HashingManager implements IHashManager {
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
    protected _hashers: KeyValue<ClassOf<IHasher>>;
    /**
     * Creates a hash manager. The default hasher is created for the algorithm
     * given in the configuration.
     *
     * @param hashConfig
     */
    constructor(hashConfig: AnyObject);
    /**
     * Creates a hasher from name, if it exists on the hasher lists.
     * Otherwise a default hasher is created and returned.
     *
     * @param name
     */
    createHasher(name: string): IHasher;
    /**
     * Creates a default hasher
     *
     * @returns IHasher
     */
    createDefaultHasher(): IHasher;
    /**
     * Creates a pepper key for the application that can be used
     * along with salt if required.
     *
     * @returns string
     */
    createPepper(): Promise<string>;
    /**
     * @inheritdoc
     *
     * @returns IHasher
     */
    getHasher(): IHasher;
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHash(value: string): Promise<string>;
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    compare(value: string, hashedValue: string): Promise<boolean>;
}
