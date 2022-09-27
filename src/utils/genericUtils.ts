import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

/**
 * This function is used for generating hashed value of a password
 * @param password 
 * @returns 
 */
export const getHashedPassword = (password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        if (password) {
            const salt = randomBytes(8).toString('hex');
            const hash = (await scrypt(password, salt, 32)) as Buffer;
            const result = salt + '.' + hash.toString('hex');
            resolve(result);
        } else {
            reject('Password is required');
        }
    });
};