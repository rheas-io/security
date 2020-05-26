import md5 from "md5";
import { IHasher } from "@rheas/contracts/security";

export class Md5Hashing implements IHasher {

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHash(value: string): string {
        return md5(value);
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     * @param hashedValue 
     */
    public compare(value: string, hashedValue: string): boolean {
        return md5(value) === hashedValue;
    }
}