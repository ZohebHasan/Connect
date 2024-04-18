#include "encrypt.h"

int main() {
    // Conversion of Jsx To Json
    convertJsxToJson("node ../convertJsxToJson.js");

    // Parsing the Json File
    auto j = parseJsonFile("tempSensitive/user.json");

    // Defining the Key and IV, then Generating a block
    CryptoPP::SecByteBlock key(CryptoPP::AES::DEFAULT_KEYLENGTH);
    CryptoPP::SecByteBlock iv(CryptoPP::AES::BLOCKSIZE);
    CryptoPP::AutoSeededRandomPool rnd;
    rnd.GenerateBlock(key, key.size());
    rnd.GenerateBlock(iv, iv.size());

    // Looping through contents of security information and encrypting the data with the Key and IV
    json encryptedSecurityInfo = encryptData(j, key, iv);

    // Salt Generation
    std::string salt = generateSalt();

    // Hashing Password
    std::string hashedPassword = hashPassword(j["security"]["password"], salt);

    // Storing the hashed password
    encryptedSecurityInfo["hashedPassword"] = hashedPassword;

    // Setting encryptedData.json file to head of j
    json encryptedDataJson = j;

    // Storing Encrypted Security Data
    encryptedDataJson["security"] = encryptedSecurityInfo;

    storeEncryptedData(encryptedDataJson, "encryptedInformation/encryptedData.json");

    // Generate a key-encryption_key from the hashed password (or another method)
    CryptoPP::SecByteBlock keyEncryptionKey = generateKek(hashedPassword, salt);

    // Encrypt the key and IV using the key-encryption_key
    std::pair<std::string, std::string> encryptedKeyAndIV = encryptKeyIV(key, iv, keyEncryptionKey);

    // Store the encrypted key and IV
    json encryptedKeysJson;
    encryptedKeysJson["key"] = encryptedKeyAndIV.first;
    encryptedKeysJson["iv"] = encryptedKeyAndIV.second;

    storeKeyIV(encryptedKeysJson, "encryptedInformation/encryptedKeys.json");

    // Assuming keyEncryptionKey is a SecByteBlock that you want to store as hex in JSON
    std::string encodedKeyEncryptionKey = encodeKeyEncryptionKeyToHex(keyEncryptionKey);

    // Now you can safely assign encodedKeyEncryptionKey to the json object
    json kekJson;
    kekJson["key-encryption_key"] = encodedKeyEncryptionKey;

    storeKek(kekJson, "encryptedInformation/key-encryption_key.json");

    // Store the salt
    json saltJson;
    saltJson["salt"] = salt;

    storeSalt(saltJson, "encryptedInformation/salt.json");

    // Return message
    std::cout << "Encryption completed successfully and saved to encryptedData.json, encryptedKeys.json, salt.json, and key-encryption_key.json" << std::endl;

    return 0;
}