// import { randomBytes, createCipheriv, createDecipheriv, publicEncrypt, privateDecrypt } from 'crypto';

// const algorithm = 'aes-256-ctr';

// function generateSymmetricKey(): Buffer {
//     return randomBytes(32);
// }

// function encryptContent(content: string, key: Buffer): string {
//     const iv = randomBytes(16);
//     const cipher = createCipheriv(algorithm, key, iv);
//     const encrypted = Buffer.concat([cipher.update(content, 'utf8'), cipher.final()]);
//     return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
// }

// function decryptContent(encryptedContent: string, key: Buffer): string {
//     const [iv, encrypted] = encryptedContent.split(':').map((part) => Buffer.from(part, 'hex'));
//     const decipher = createDecipheriv(algorithm, key, iv);
//     const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
//     return decrypted.toString('utf8');
// }

// function encryptSymmetricKey(symmetricKey: Buffer, publicKey: Buffer): Buffer {
//     return publicEncrypt(publicKey, symmetricKey);
// }

// function decryptSymmetricKey(encryptedKey: Buffer, privateKey: Buffer): Buffer {
//     return privateDecrypt(privateKey, encryptedKey);
// }

// export { generateSymmetricKey, encryptContent, decryptContent, encryptSymmetricKey, decryptSymmetricKey };
