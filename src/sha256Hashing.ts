import { sha256 } from "sha.js";
import { ShaHashing } from "./shaHashing";

export class Sha256Hashing extends ShaHashing {
    /**
     * Creates a new sha-256 hasher
     */
    constructor() {
        super(new sha256());
    }
}