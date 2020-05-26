/// <reference types="node" />
import { Hash } from "crypto";
import { IHasher } from "@rheas/contracts/security";
export declare class ShaHashing implements IHasher {
    /**
     * The sha256 or sha512 driver that has to be used
     *
     * @var HashStatic
     */
    protected _driver: Hash;
    /**
     * Creates a new sha hasher
     *
     * @param driver
     */
    constructor(driver: Hash);
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
