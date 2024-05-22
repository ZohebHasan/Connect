import { openDB } from 'idb';

const DB_NAME = 'crypto-keys-db';
const STORE_NAME = 'crypto-keys';

const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        db.createObjectStore(STORE_NAME);
    },
});

export const saveToIndexedDB = async (key: string, value: any) => {
    const db = await dbPromise;
    await db.put(STORE_NAME, value, key);
};

export const getFromIndexedDB = async (key: string) => {
    const db = await dbPromise;
    return await db.get(STORE_NAME, key);
};
