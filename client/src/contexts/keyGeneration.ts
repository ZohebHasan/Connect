import { KeyHelper } from '@privacyresearch/libsignal-protocol-typescript';
import { PreKeyPairType, SignedPreKeyPairType, KeyPairType } from '@privacyresearch/libsignal-protocol-typescript';

interface Keys {
    identityKeyPair: KeyPairType;
    registrationId: number;
    preKeys: PreKeyPairType[];
    signedPreKey: SignedPreKeyPairType;
    senderKey: ArrayBuffer; // Symmetric key for profile encryption
}

const INITIAL_PRE_KEY_COUNT = 100;

export const generateKeys = async (): Promise<Keys> => {
    // Generate identity key pair
    const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
    
    // Generate registration ID
    const registrationId = KeyHelper.generateRegistrationId();
    
    // Generate pre-keys
    const preKeys = [];
    for (let i = 0; i < INITIAL_PRE_KEY_COUNT; i++) {
        preKeys.push(await KeyHelper.generatePreKey(i));
    }
    
    // Generate signed pre-key
    const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, 0);
    
    // Generate sender key (symmetric key for profile encryption)
    const senderKey = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    ).then(key => window.crypto.subtle.exportKey("raw", key));

    return {
        identityKeyPair,
        registrationId,
        preKeys,
        signedPreKey,
        senderKey,
    };
};

const exportKeyToBase64 = async (key: ArrayBuffer): Promise<string> => {
    return btoa(String.fromCharCode(...new Uint8Array(key)));
};

export const prepareKeysForServer = async (keys: Keys) => {
    const identityPublicKey = await exportKeyToBase64(keys.identityKeyPair.pubKey);
    const preKeys = await Promise.all(keys.preKeys.map(async (pk) => ({
        keyId: pk.keyId,
        publicKey: await exportKeyToBase64(pk.keyPair.pubKey)
    })));
    const signedPreKey = {
        keyId: keys.signedPreKey.keyId,
        publicKey: await exportKeyToBase64(keys.signedPreKey.keyPair.pubKey),
        signature: await exportKeyToBase64(keys.signedPreKey.signature)
    };

    return {
        identityPublicKey,
        registrationId: keys.registrationId,
        preKeys,
        signedPreKey,
        senderKey: await exportKeyToBase64(keys.senderKey)
    };
};
