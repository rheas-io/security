import { IHasher } from "@rheas/contracts/security";
export declare class Md5Hashing implements IHasher {
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
     * @param hashedValue
     */
    compare(value: string, hashedValue: string): boolean;
}
