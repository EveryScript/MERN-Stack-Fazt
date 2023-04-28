import bcrypt from "bcrypt"; // https://www.npmjs.com/package/bcrypt


export function encryptPassword(pass) {
    // Encryption password (by bcrypt)
    return bcrypt.hashSync(pass, 10);
}

export function verifyPassword(pass, hash) {
    return bcrypt.compareSync(pass, hash);
}