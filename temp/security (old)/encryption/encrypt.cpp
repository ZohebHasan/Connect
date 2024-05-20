#include "header/encrypt.h"

//
// Main Functions
//

std::string generateSalt() {
    CryptoPP::AutoSeededRandomPool rng;
    CryptoPP::byte salt[16];
    rng.GenerateBlock(salt, sizeof(salt));

    std::string saltString;
    CryptoPP::ArraySource(salt, sizeof(salt), true,
                          new CryptoPP::HexEncoder(new CryptoPP::StringSink(saltString)));
    return saltString;
}

std::string hashPassword(const std::string& password, const std::string& salt) {
    CryptoPP::SHA256 hash;
    std::string digest;
    CryptoPP::StringSource(password + salt, true,
                           new CryptoPP::HashFilter(hash,
                                                    new CryptoPP::HexEncoder(new CryptoPP::StringSink(digest))));
    return digest;
}

std::string encrypt(const std::string& plainText, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv) {
    std::string cipherText;
    try {
        CryptoPP::AES::Encryption aesEncryption(key, CryptoPP::AES::DEFAULT_KEYLENGTH);
        CryptoPP::CBC_Mode_ExternalCipher::Encryption cbcEncryption(aesEncryption, iv);
        CryptoPP::StreamTransformationFilter stfEncryptor(cbcEncryption, new CryptoPP::StringSink(cipherText));
        stfEncryptor.Put(reinterpret_cast<const unsigned char*>(plainText.c_str()), plainText.length());
        stfEncryptor.MessageEnd();

        // Base64 encode the cipher text
        std::string base64CipherText;
        CryptoPP::StringSource(cipherText, true,
                               new CryptoPP::Base64Encoder(new CryptoPP::StringSink(base64CipherText)));
        cipherText = base64CipherText;
    } catch (const CryptoPP::Exception& e) {
        std::cerr << e.what() << std::endl;
        exit(1);
    }
    return cipherText;
}

//
// Helper Functions
//

json encryptData(const json& j, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv) {
    json encryptedSecurityInfo;
    for (auto& el : j["security"].items()) {
        if (el.key() != "password") {
            encryptedSecurityInfo[el.key()] = encrypt(el.value(), key, iv);
        }
    }
    return encryptedSecurityInfo;
}

CryptoPP::SecByteBlock generateKek(const std::string& hashedPassword, const std::string& salt) {
    CryptoPP::SecByteBlock keyEncryptionKey(CryptoPP::AES::DEFAULT_KEYLENGTH);
    CryptoPP::PKCS5_PBKDF2_HMAC<CryptoPP::SHA256> pbkdf;
    pbkdf.DeriveKey(keyEncryptionKey, keyEncryptionKey.size(), 0,
                    reinterpret_cast<const CryptoPP::byte*>(hashedPassword.data()), hashedPassword.size(),
                    reinterpret_cast<const CryptoPP::byte*>(salt.data()), salt.size(), 1000);
    return keyEncryptionKey;
}

std::pair<std::string, std::string> encryptKeyIV(const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv, const CryptoPP::SecByteBlock& keyEncryptionKey) {
    std::string encryptedKey = encrypt(std::string((char*)key.data(), key.size()), keyEncryptionKey, iv);
    std::string encryptedIV = encrypt(std::string((char*)iv.data(), iv.size()), keyEncryptionKey, iv);
    return {encryptedKey, encryptedIV};
}

std::string encodeKeyEncryptionKeyToHex(const CryptoPP::SecByteBlock& keyEncryptionKey) {
    std::string encodedKeyEncryptionKey;
    CryptoPP::StringSink* stringSink = new CryptoPP::StringSink(encodedKeyEncryptionKey);
    CryptoPP::HexEncoder encoder(stringSink);
    encoder.Put(keyEncryptionKey, keyEncryptionKey.size());
    encoder.MessageEnd();
    return encodedKeyEncryptionKey;
}
void storeEncryptedData(const json& encryptedDataJson, const std::string& fileName) {
    std::ofstream outFile(fileName);
    outFile << encryptedDataJson.dump(4);
    outFile.close();
}
void storeKeyIV(const json& encryptedKeysJson, const std::string& fileName) {
    std::ofstream encryptedKeysFile(fileName);
    encryptedKeysFile << encryptedKeysJson.dump(4);
    encryptedKeysFile.close();
}
void storeSalt(const json& saltJson, const std::string& fileName) {
    std::ofstream saltFile(fileName);
    saltFile << saltJson.dump(4);
    saltFile.close();
}
void storeKek(const json& kekJson, const std::string& fileName) {
    std::ofstream kekFile(fileName);
    kekFile << kekJson.dump(4);
    kekFile.close();
}