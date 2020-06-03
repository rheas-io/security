import { BaseHmacHasher } from "./baseHmacHasher";
export declare class Md5Hashing extends BaseHmacHasher {
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHash(value: string): string;
    /**
     * @inheritdoc
     *
     * @param value
     */
    createHmacHash(value: string): string | Promise<string>;
}
