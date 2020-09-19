import bcrypt from 'bcrypt';
import { IHasher } from '@rheas/contracts/security';
import { IHashConfig } from '@rheas/contracts/configs';

export class BcryptHasher implements IHasher {
    /**
     * The number of rounds to be used for salt generation.
     *
     * @var number
     */
    protected _rounds: number = 12;

    /**
     * Creates a bcrypt hasher. Salt rounds are determined from
     * the configuration file or a default value of 12 is used.
     *
     * @param param0
     */
    constructor({ bcrypt }: IHashConfig) {
        this._rounds = (bcrypt && bcrypt.rounds) || 12;
    }

    /**
     * @inheritdoc
     *
     * @param value
     */
    public async createHash(value: string): Promise<string> {
        return await bcrypt.hash(value, this._rounds);
    }

    /**
     * @inheritdoc
     *
     * @param value
     * @param hashedValue
     */
    public async compare(value: string, hashedValue: string): Promise<boolean> {
        return await bcrypt.compare(value, hashedValue);
    }
}
