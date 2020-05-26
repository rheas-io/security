import { Hash } from "crypto";
import { IHasher } from "@rheas/contracts/security";

export class ShaHashing implements IHasher {

    /**
     * The sha256 or sha512 driver that has to be used
     * 
     * @var HashStatic
     */
    protected _driver: Hash;

    /**
     * Creates a new sha hasher
     * 
     * @param driver 
     */
    constructor(driver: Hash) {
        this._driver = driver;
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     */
    public createHash(value: string): string {
        return this._driver.update(value).digest('base64');
    }

    /**
     * @inheritdoc
     * 
     * @param value 
     * @param hashedValue 
     */
    public compare(value: string, hashedValue: string): boolean {
        return this._driver.update(value).digest('base64') === hashedValue;
    }
}