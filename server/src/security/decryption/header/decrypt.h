#ifndef DECRYPT_H
#define DECRYPT_H

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

std::string decrypt(const std::string& cipherText, const CryptoPP::SecByteBlock& key, const CryptoPP::SecByteBlock& iv);

// Helper Function Declarations

#endif  // DECRYPT_H