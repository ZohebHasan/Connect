#include <cryptopp/aes.h>
#include <cryptopp/base64.h>
#include <cryptopp/filters.h>
#include <cryptopp/hex.h>
#include <cryptopp/modes.h>
#include <cryptopp/osrng.h>
#include <cryptopp/pwdbased.h>
#include <cryptopp/sha.h>

#include <fstream>
#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

std::string readFile(const std::string& fileName) {
    std::ifstream file(fileName);
    std::string str((std::istreambuf_iterator<char>(file)),
                    std::istreambuf_iterator<char>());
    return str;
}

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

int main() {
    std::string filePath = "user.json";
    std::string fileContents = readFile(filePath);
    auto j = json::parse(fileContents);

    std::string salt = generateSalt();
    std::string hashedPassword = hashPassword(j["security"]["password"], salt);

    CryptoPP::AutoSeededRandomPool rnd;
    CryptoPP::SecByteBlock key(CryptoPP::AES::DEFAULT_KEYLENGTH);
    CryptoPP::SecByteBlock iv(CryptoPP::AES::BLOCKSIZE);
    rnd.GenerateBlock(key, key.size());
    rnd.GenerateBlock(iv, iv.size());

    json encryptedSecurityInfo;
    for (auto& el : j["security"].items()) {
        if (el.key() != "password") {
            encryptedSecurityInfo[el.key()] = encrypt(el.value(), key, iv);
        }
    }

    encryptedSecurityInfo["hashedPassword"] = hashedPassword;
    encryptedSecurityInfo["salt"] = salt;

    json encryptedJson = j;
    encryptedJson["security"] = encryptedSecurityInfo;

    std::ofstream outFile("encryptedInformation/encryptedData.json");
    outFile << encryptedJson.dump(4);
    outFile.close();

    // Generate a key-encryption_key from the hashed password (or another method)
    CryptoPP::SecByteBlock keyEncryptionKey(CryptoPP::AES::DEFAULT_KEYLENGTH);
    CryptoPP::PKCS5_PBKDF2_HMAC<CryptoPP::SHA256> pbkdf;
    pbkdf.DeriveKey(keyEncryptionKey, keyEncryptionKey.size(), 0,
                    reinterpret_cast<const CryptoPP::byte*>(hashedPassword.data()), hashedPassword.size(),
                    reinterpret_cast<const CryptoPP::byte*>(salt.data()), salt.size(), 1000);

    // Encrypt the key and IV using the key-encryption_key
    std::string encryptedKey = encrypt(std::string((char*)key.data(), key.size()), keyEncryptionKey, iv);
    std::string encryptedIV = encrypt(std::string((char*)iv.data(), iv.size()), keyEncryptionKey, iv);

    // Store the encrypted key and IV
    json encryptedKeysJson;
    encryptedKeysJson["key"] = encryptedKey;
    encryptedKeysJson["iv"] = encryptedIV;

    std::ofstream encryptedKeysFile("encryptedInformation/encryptedKeys.json");
    encryptedKeysFile << encryptedKeysJson.dump(4);
    encryptedKeysFile.close();

    // Assuming keyEncryptionKey is a SecByteBlock that you want to store as hex in JSON
    std::string encodedKeyEncryptionKey;
    CryptoPP::StringSink* stringSink = new CryptoPP::StringSink(encodedKeyEncryptionKey);
    CryptoPP::HexEncoder encoder(stringSink);
    encoder.Put(keyEncryptionKey, keyEncryptionKey.size());
    encoder.MessageEnd();

    // Now you can safely assign encodedKeyEncryptionKey to the json object
    json kekJson;
    kekJson["key-encryption_key"] = encodedKeyEncryptionKey;

    std::ofstream kekFile("encryptedInformation/key-encryption_key.json");
    kekFile << kekJson.dump(4);
    kekFile.close();

    // Store the salt
    json saltJson;
    saltJson["salt"] = salt;

    std::ofstream saltFile("encryptedInformation/salt.json");
    saltFile << saltJson.dump(4);
    saltFile.close();

    std::cout << "Encryption completed successfully and saved to encryptedData.json, encryptedKeys.json, salt.json, and key-encryption_key.json" << std::endl;

    return 0;
}
