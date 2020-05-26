import { sha512 } from "sha.js";
import { ShaHashing } from "./shaHashing";

export class Sha512Hashing extends ShaHashing {
    /**
     * Creates a new sha-512 hasher
     */
    constructor() {
        super(new sha512());
    }
}