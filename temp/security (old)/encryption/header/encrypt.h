#ifndef ENCRYPT_H
#define ENCRYPT_H

#include "../../header/security.h"

// Function Declarations
std::string generateSalt();
std::string hashPassword(const std::string& password, const std::string& salt);
std::string encrypt(const std::string& plainText, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv);

// Helper Function Declarations
json encryptData(const json& j, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv);
CryptoPP::SecByteBlock generateKek(const std::string& hashedPassword, const std::string& salt);
std::pair<std::string, std::string> encryptKeyIV(const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv, const CryptoPP::SecByteBlock& keyEncryptionKey);
std::string encodeKeyEncryptionKeyToHex(const CryptoPP::SecByteBlock& keyEncryptionKey);
void storeEncryptedData(const json& encryptedDataJson, const std::string& fileName);
void storeKeyIV(const json& encryptedKeysJson, const std::string& fileName);
void storeSalt(const json& saltJson, const std::string& fileName);
void storeKek(const json& kekJson, const std::string& fileName);

#endif  // ENCRYPT_H
