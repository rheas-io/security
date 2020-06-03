import CryptoJs from "crypto-js";
import { BaseHmacHasher } from "./baseHmacHasher";

export class Sha512Hashing extends BaseHmacHasher {

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHash(value: string): string | Promise<string> {
        return CryptoJs.SHA512(value).toString();
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHmacHash(value: string): string | Promise<string> {
        return CryptoJs.HmacSHA512(value, this._key).toString();
    }
}