// import { SessionCipher, MessageType } from '@privacyresearch/libsignal-protocol-typescript';

// async function encryptMessage(sessionCipher: SessionCipher, message: string): Promise<string> {
//     const plaintext = new TextEncoder().encode(message);
//     const ciphertextMessage: MessageType = await sessionCipher.encrypt(plaintext);
//     if (!ciphertextMessage.body) {
//         throw new Error('Encryption failed: No body in the ciphertext message.');
//     }
//     const ciphertext = Buffer.from(ciphertextMessage.body, 'binary').toString('base64');
//     return ciphertext;
// }

// async function decryptMessage(sessionCipher: SessionCipher, encryptedMessage: string, type: MessageType): Promise<string> {
//     const ciphertext = Buffer.from(encryptedMessage, 'base64').toString('binary');
//     let plaintext: ArrayBuffer;

//     if (type.type === 3) { // Assuming PREKEY_BUNDLE corresponds to type 3
//         plaintext = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext, 'binary');
//     } else {
//         plaintext = await sessionCipher.decryptWhisperMessage(ciphertext, 'binary');
//     }

//     return new TextDecoder().decode(plaintext);
// }

// export { encryptMessage, decryptMessage };
