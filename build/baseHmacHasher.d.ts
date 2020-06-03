import { IHmacHasher } from "@rheas/contracts/security";
export declare abstract class BaseHmacHasher implements IHmacHasher {
    /**
     * The key to be used along with HMAc hashing.
     *
     * @var string
     */
    protected _key: string;
    /**
     * Creates a new HMAC hasher. The argument is used as the hash key. This
     * should be available in the hash config file.
     *
     * @param key
     */
    constructor(key: string);
    /**
     * @inheritdoc
     *
     * @param value
     */
    abstract createHash(value: string): string | Promise<string>;
    /**
     * @inheritdoc
     *
     * @param value
     */
    abstract createHmacHash(value: string): string | Promise<string>;
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    compare(value: string, hashedValue: string): Promise<boolean>;
    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    compareHmacHash(value: string, hashedValue: string): Promise<boolean>;
    /**
     * @inheritdoc
     *
     * @param hashToCheck
     * @param preHashedData
     */
    compareHashes(hashToCheck: string, preHashedData: string): boolean;
}
