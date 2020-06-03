import { IHasher } from "@rheas/contracts/security";
import { IHashConfig } from "@rheas/contracts/configs";
export declare class BcryptHashing implements IHasher {
    /**
     * The number of rounds to be used for salt generation.
     *
     * @var number
     */
    protected _rounds: number;
    /**
     * Creates a bcrypt hasher. Salt rounds are determined from
     * the configuration file or a default value of 12 is used.
     *
     * @param param0
     */
    constructor({ bcrypt }: IHashConfig);
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
