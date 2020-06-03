import CryptoJs from "crypto-js";
import { BaseHmacHasher } from "./baseHmacHasher";

export class Sha256Hashing extends BaseHmacHasher {

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHash(value: string): string | Promise<string> {
        return CryptoJs.SHA256(value).toString();
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHmacHash(value: string): string | Promise<string> {
        return CryptoJs.HmacSHA256(value, this._key).toString();
    }
}