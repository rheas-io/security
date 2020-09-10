import CryptoJs from 'crypto-js';
import { Str } from '@rheas/support';
import crypto, { CipherGCMTypes } from 'crypto';
import { IEncrypter } from '@rheas/contracts/security';
import { EncrypterException } from '@rheas/errors/encrypter';

interface EncryptedJson {
    iv: string;
    value: string;
    tag: string;
}

export class Encrypter implements IEncrypter {
    /**
     * Cipher key lengths
     *
     * @var object
     */
    public static readonly keyLengths = {
        'aes-128-gcm': 16,
        'aes-192-gcm': 24,
        'aes-256-gcm': 32,
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
    constructor(key: string, cipher: CipherGCMTypes = 'aes-256-gcm') {
        this._key = key;
        this._cipher = cipher;

        this.validateKey();
    }

    /**
     * Throws exception when key is invalid. Validation is done on the
     * length of key and cipher key length requirement.
     *
     * @throws
     */
    private validateKey(): void {
        const keyLength = Buffer.from(this._key, 'hex').byteLength;

        if (Encrypter.keyLength(this._cipher) !== keyLength) {
            throw new EncrypterException('Invalid application key provided.');
        }
    }

    /**
     * Returns keylength of the given cipher. Throws an error if an invalid
     * cipher is given.
     *
     * @param cipher
     */
    public static keyLength(cipher: CipherGCMTypes) {
        if (Encrypter.keyLengths[cipher] === undefined) {
            throw new EncrypterException(
                'Invalid cipher. Allowed ciphers are: aes-128-gcm, aes-192-gcm and aes-256-gcm',
            );
        }
        return Encrypter.keyLengths[cipher];
    }

    /**
     * Creates an application encrypter key.
     *
     * @param cipher
     */
    public static async generateKey(cipher: CipherGCMTypes): Promise<string> {
        return await Str.random(Encrypter.keyLength(cipher));
    }

    /**
     * Encrypts the given value and returns a hex response of Json encoded
     * string containing iv, value and tag
     *
     * @param value
     */
    public async encrypt(value: string): Promise<string> {
        try {
            // Initialization vector for AES algo always uses a 16 byte
            // key
            const iv = await Str.random(16);
            const encrypter = crypto.createCipheriv(
                this._cipher,
                Buffer.from(this._key, 'hex'),
                Buffer.from(iv, 'hex'),
            );

            const encrypted = Buffer.concat([encrypter.update(value, 'utf8'), encrypter.final()]);

            // Returns a hex encoded JSON containing iv, encrypted value as
            // value and auth tag as tag. All the three values are hex encoded.
            return CryptoJs.enc.Utf8.parse(
                JSON.stringify({
                    iv: iv,
                    value: encrypted.toString('hex'),
                    tag: encrypter.getAuthTag().toString('hex'),
                }),
            ).toString();
        } catch (err) {
            // Throws an encryption error if any sort of error like Json parse
            // error or cipher creation/ update error occurs.
            throw new EncrypterException('Error encrypting the data').setException(err);
        }
    }

    /**
     * Decrypts the given encrypted value. Throws error if integrity fails
     * or auth tag does not match.
     *
     * @param value
     */
    public decrypt(encrypted: string): string {
        try {
            // Convert the hex encoded value to JSON object containing
            // the iv, value and tag.
            const { iv, value, tag }: EncryptedJson = JSON.parse(
                CryptoJs.enc.Hex.parse(encrypted).toString(CryptoJs.enc.Utf8),
            );

            const decrypter = crypto
                .createDecipheriv(
                    this._cipher,
                    Buffer.from(this._key, 'hex'),
                    Buffer.from(iv, 'hex'),
                )
                .setAuthTag(Buffer.from(tag, 'hex'));

            // Decrypts the encrypted hex value and converts it into a utf8
            // encoded human readable string.
            const decryptedValue = Buffer.concat([
                decrypter.update(Buffer.from(value, 'hex')),
                decrypter.final(),
            ]).toString('utf8');

            return decryptedValue;
        } catch (err) {
            // Throws a decryption error if any sort of error like Json parse
            // error or decipher creation/update error occurs.
            //
            // Decrypter also throws exception when the data integrity check
            // fails.
            throw new EncrypterException('Error decrypting the data').setException(err);
        }
    }
}
