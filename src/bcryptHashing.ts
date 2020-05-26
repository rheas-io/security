import bcrypt from "bcrypt";
import { IHasher } from "@rheas/contracts/security";

export class BcryptHashing implements IHasher {

    /**
     * The number of rounds to be used for salt generation.
     * 
     * @var number
     */
    protected rounds: number = 10;

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public async createHash(value: string): Promise<string> {
        return await bcrypt.hash(value, this.rounds);
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