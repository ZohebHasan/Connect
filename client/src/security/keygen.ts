// import { KeyHelper } from '@privacyresearch/libsignal-protocol-typescript';
// import { PreKeyPairType, SignedPreKeyPairType, KeyPairType } from '@privacyresearch/libsignal-protocol-typescript';
// import { MongoClient, Db } from 'mongodb';

// interface Keys {
//     identityKeyPair: KeyPairType;
//     registrationId: number;
//     preKeys: PreKeyPairType[];
//     signedPreKey: SignedPreKeyPairType;
// }

// const PRE_KEY_THRESHOLD = 20; // Threshold for replenishing pre-keys
// const INITIAL_PRE_KEY_COUNT = 100;
// const REPLENISH_PRE_KEY_COUNT = 80; // Number of pre-keys to generate when replenishing

// const MONGODB_URI = 'your_mongodb_connection_string';
// const DATABASE_NAME = 'your_database_name';
// const COLLECTION_NAME = 'your_collection_name';

// async function generateKeys(): Promise<Keys> {
//     const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
//     const registrationId = KeyHelper.generateRegistrationId();
//     const preKeys = [];
//     for (let i = 0; i < INITIAL_PRE_KEY_COUNT; i++) {
//         preKeys.push(await KeyHelper.generatePreKey(i));
//     }
//     const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, 0);

//     return {
//         identityKeyPair,
//         registrationId,
//         preKeys,
//         signedPreKey,
//     };
// }

// async function generateAdditionalPreKeys(startId: number, count: number): Promise<PreKeyPairType[]> {
//     const preKeys = [];
//     for (let i = startId; i < startId + count; i++) {
//         preKeys.push(await KeyHelper.generatePreKey(i));
//     }
//     return preKeys;
// }

// // Function to manage pre-keys
// async function managePreKeys(currentPreKeyCount: number, lastPreKeyId: number): Promise<PreKeyPairType[]> {
//     if (currentPreKeyCount < PRE_KEY_THRESHOLD) {
//         const additionalPreKeys = await generateAdditionalPreKeys(lastPreKeyId + 1, REPLENISH_PRE_KEY_COUNT);
//         // Upload additional pre-keys to the server
//         await uploadKeysToServer(additionalPreKeys);
//         return additionalPreKeys;
//     }
//     return [];
// }

// // Function to upload keys to the server
// async function uploadKeysToServer(preKeys: PreKeyPairType[]): Promise<void> {
//     const client = new MongoClient(MONGODB_URI);

//     try {
//         await client.connect();
//         const db: Db = client.db(DATABASE_NAME);
//         const collection = db.collection(COLLECTION_NAME);

//         // Prepare the pre-keys for upload
//         const preKeysForUpload = preKeys.map((preKey) => ({
//             keyId: preKey.keyId,
//             publicKey: preKey.keyPair.pubKey,
//         }));

//         // Insert pre-keys into the collection
//         await collection.insertMany(preKeysForUpload);

//         console.log('Pre-keys uploaded to MongoDB:', preKeysForUpload);
//     } finally {
//         await client.close();
//     }
// }

// export { generateKeys, generateAdditionalPreKeys, managePreKeys, uploadKeysToServer };
