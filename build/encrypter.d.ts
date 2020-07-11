/// <reference types="node" />
import { AnyObject } from "@rheas/contracts";
import { CipherGCMTypes } from "crypto";
import { IEncrypter } from "@rheas/contracts/security";
export declare class Encrypter implements IEncrypter {
    /**
     * Cipher key lengths
     *
     * @var object
     */
    static readonly keyLengths: {
        "aes-128-gcm": number;
        "aes-192-gcm": number;
        "aes-256-gcm": number;
    };
    /**
     * Stores the application encyption key.
     *
     * @var string
     */
    protected _key: string;
    /**
     * Caches the cipher to be used for encryption.
     *
     * @var AppCipher
     */
    protected _cipher: CipherGCMTypes;
    /**
     * Creates a new encryption handler class. All encryptions are done
     * using the key and cipher given in the app configs. Handler construction
     * throws error if key is invalid.
     *
     * @param key
     * @param cipher
     */
    constructor(key: string, cipher?: CipherGCMTypes);
    /**
     * Throws exception when key is invalid. Validation is done on the
     * length of key and cipher key length requirement.
     *
     * @throws
     */
    private validateKey;
    /**
     * Returns keylength of the given cipher. Throws an error if an invalid
     * cipher is given.
     *
     * @param cipher
     */
    static keyLength(cipher: CipherGCMTypes): number;
    /**
     * Creates an application encrypter key.
     *
     * @param cipher
     */
    static generateKey(cipher: CipherGCMTypes): Promise<string>;
    /**
     * Encrypts the given value and returns a hex response of Json encoded
     * string containing iv, value and tag
     *
     * @param value
     */
    encrypt(value: string | AnyObject): Promise<string>;
    /**
     * Decrypts the given encrypted value. Throws error if integrity fails
     * or auth tag does not match.
     *
     * @param value
     */
    decrypt(encrypted: string): string | AnyObject;
}
