import CryptoJs from 'crypto-js';
import { BaseHmacHasher } from './baseHmacHasher';

export class Md5Hashing extends BaseHmacHasher {
    /**
     * @inheritdoc
     *
     * @param value
     */
    public createHash(value: string): string {
        return CryptoJs.MD5(value).toString();
    }

    /**
     * @inheritdoc
     *
     * @param value
     */
    public createHmacHash(value: string): string | Promise<string> {
        return CryptoJs.HmacMD5(value, this._key).toString();
    }
}
