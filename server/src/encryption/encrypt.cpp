#include <cryptopp/aes.h>
#include <cryptopp/filters.h>
#include <cryptopp/hex.h>
#include <cryptopp/modes.h>
#include <cryptopp/osrng.h>
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

std::string encrypt(const std::string& plainText, const CryptoPP::SecByteBlock& key, const CryptoPP::SecByteBlock& iv) {
    std::string cipherText;
    try {
        CryptoPP::AES::Encryption aesEncryption(key, CryptoPP::AES::DEFAULT_KEYLENGTH);
        CryptoPP::CBC_Mode_ExternalCipher::Encryption cbcEncryption(aesEncryption, iv);
        CryptoPP::StreamTransformationFilter stfEncryptor(cbcEncryption, new CryptoPP::StringSink(cipherText));
        stfEncryptor.Put(reinterpret_cast<const unsigned char*>(plainText.c_str()), plainText.length() + 1);
        stfEncryptor.MessageEnd();
    } catch (const CryptoPP::Exception& e) {
        std::cerr << e.what() << std::endl;
        exit(1);
    }
    return cipherText;
}
std::string decrypt(const std::string& cipherText, const CryptoPP::SecByteBlock& key, const CryptoPP::SecByteBlock& iv) {
    std::string decryptedText;
    try {
        CryptoPP::AES::Decryption aesDecryption(key, CryptoPP::AES::DEFAULT_KEYLENGTH);
        CryptoPP::CBC_Mode_ExternalCipher::Decryption cbcDecryption(aesDecryption, iv);

        CryptoPP::StreamTransformationFilter stfDecryptor(cbcDecryption, new CryptoPP::StringSink(decryptedText));
        stfDecryptor.Put(reinterpret_cast<const unsigned char*>(cipherText.data()), cipherText.size());
        stfDecryptor.MessageEnd();
    } catch (const CryptoPP::Exception& e) {
        std::cerr << e.what() << std::endl;
        exit(1);
    }
    return decryptedText;
}

int main() {
    std::string filePath = "server/src/user.json";
    std::string fileContents = readFile(filePath);
    auto j = json::parse(fileContents);

    // Hash the password
    std::string salt = generateSalt();
    std::string hashedPassword = hashPassword(j["security"]["password"], salt);

    // Encrypt other security information
    CryptoPP::AutoSeededRandomPool rnd;
    CryptoPP::SecByteBlock key(CryptoPP::AES::DEFAULT_KEYLENGTH);
    CryptoPP::SecByteBlock iv(CryptoPP::AES::BLOCKSIZE);
    rnd.GenerateBlock(key, key.size());
    rnd.GenerateBlock(iv, iv.size());

    // Removing password and adding hashed password and salt for encryption
    auto securityInfo = j["security"];
    securityInfo.erase("password");
    securityInfo["hashedPassword"] = hashedPassword;
    securityInfo["salt"] = salt;

    std::string encryptedSecurityInfo = encrypt(securityInfo.dump(), key, iv);

    std::cout << "Hashed Password: " << hashedPassword << std::endl;
    std::cout << "Salt: " << salt << std::endl;
    std::cout << "Encrypted Security Information: " << encryptedSecurityInfo << std::endl;

    // Temporary
    std::string decryptedSecurityInfo = decrypt(encryptedSecurityInfo, key, iv);
    std::cout << "Decrypted Security Information: " << decryptedSecurityInfo << std::endl;

    return 0;
}
