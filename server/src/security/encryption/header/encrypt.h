#ifndef ENCRYPT_H
#define ENCRYPT_H

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

// Function Declarations
std::string readFile(const std::string& fileName);
std::string generateSalt();
std::string hashPassword(const std::string& password, const std::string& salt);
std::string encrypt(const std::string& plainText, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv);
std::string decrypt(const std::string& cipherText, const CryptoPP::SecByteBlock& key, const CryptoPP::SecByteBlock& iv);

// Helper Function Declarations
void convertJsxToJson(const std::string command);
json parseJsonFile(const std::string& filePath);
void deleteJsonFile(const std::string& filePath);
json encryptData(const json& j, const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv);
CryptoPP::SecByteBlock generateKek(const std::string& hashedPassword, const std::string& salt);
std::pair<std::string, std::string> encryptKeyIV(const CryptoPP::SecByteBlock& key, CryptoPP::SecByteBlock& iv, const CryptoPP::SecByteBlock& keyEncryptionKey);
std::string encodeKeyEncryptionKeyToHex(const CryptoPP::SecByteBlock& keyEncryptionKey);
void storeEncryptedData(const json& encryptedDataJson, const std::string& fileName);
void storeKeyIV(const json& encryptedKeysJson, const std::string& fileName);
void storeSalt(const json& saltJson, const std::string& fileName);
void storeKek(const json& kekJson, const std::string& fileName);

#endif  // ENCRYPT_H
