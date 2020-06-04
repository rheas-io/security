/// <reference types="node" />
import { CipherGCMTypes } from "crypto";
import { IEncrypter } from "@rheas/contracts/security";
export declare class Encrypter implements IEncrypter {
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
     * @inheritdoc
     *
     * @param value
     */
    encrypt(value: string | JSON): Promise<string>;
    /**
     * @inheritdoc
     *
     * @param value
     */
    decrypt(encrypted: string): string | JSON;
}
