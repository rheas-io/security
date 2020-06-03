import { BaseHmacHasher } from "./baseHmacHasher";
export declare class Sha512Hashing extends BaseHmacHasher {
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHash(value: string): string | Promise<string>;
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHmacHash(value: string): string | Promise<string>;
}
