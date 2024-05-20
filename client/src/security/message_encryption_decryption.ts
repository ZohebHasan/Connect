// import toArrayBuffer from "@privacyresearch/libsignal-protocol-typescript"
// import toString from "@privacyresearch/libsignal-protocol-typescript"

// async function encryptMessage(sessionCipher: any, message: string): Promise<string> {
//     const plaintext = new TextEncoder().encode(message);
//     const ciphertext = await sessionCipher.encrypt(plaintext);
//     return toString(ciphertext.body, 'base64');
// }

// async function decryptMessage(sessionCipher: any, encryptedMessage: string, type: number): Promise<string> {
//     const ciphertext = toArrayBuffer(encryptedMessage, 'base64');
//     const plaintext = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext, 'binary');
//     return new TextDecoder().decode(plaintext);
// }

// export { encryptMessage, decryptMessage };


import * as signalProtocol from '@privacyresearch/libsignal-protocol-typescript';

async function encryptMessage(sessionCipher: any, message: string): Promise<string> {
    const plaintext = new TextEncoder().encode(message);
    const ciphertext = await sessionCipher.encrypt(plaintext);
    return signalProtocol.util.toString(ciphertext.body, 'base64');
}

async function decryptMessage(sessionCipher: any, encryptedMessage: string, type: number): Promise<string> {
    const ciphertext = signalProtocol.util.toArrayBuffer(encryptedMessage, 'base64');
    const plaintext = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext, 'binary');
    return new TextDecoder().decode(plaintext);
}

export { encryptMessage, decryptMessage };
