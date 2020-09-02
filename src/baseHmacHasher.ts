import crypto from 'crypto';
import { IHashConfig } from '@rheas/contracts/configs';
import { IHmacHasher } from '@rheas/contracts/security';

export abstract class BaseHmacHasher implements IHmacHasher {
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
    constructor({ key }: IHashConfig) {
        this._key = key;
    }

    /**
     * @inheritdoc
     *
     * @param value
     */
    public abstract createHash(value: string): string | Promise<string>;

    /**
     * @inheritdoc
     *
     * @param value
     */
    public abstract createHmacHash(value: string): string | Promise<string>;

    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    public async compare(value: string, hashedValue: string): Promise<boolean> {
        const hashedData = await this.createHash(value);

        return this.compareHashes(hashedData, hashedValue);
    }

    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    public async compareHmacHash(value: string, hashedValue: string): Promise<boolean> {
        const hashedData = await this.createHmacHash(value);

        return this.compareHashes(hashedData, hashedValue);
    }

    /**
     * @inheritdoc
     *
     * @param hashToCheck
     * @param preHashedData
     */
    public compareHashes(hashToCheck: string, preHashedData: string): boolean {
        try {
            const bufferToCheck = Buffer.from(hashToCheck);
            const bufferPreHash = Buffer.from(preHashedData);

            return crypto.timingSafeEqual(bufferToCheck, bufferPreHash);
        } catch (err) {
            return false;
        }
    }
}
