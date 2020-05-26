import { IHasher } from "@rheas/contracts/security";
export declare class BcryptHashing implements IHasher {
    /**
     * The number of rounds to be used for salt generation.
     *
     * @var number
     */
    protected rounds: number;
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
