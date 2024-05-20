#ifndef DECRYPT_H
#define DECRYPT_H

#include "../../header/security.h"

// Function Declarations

std::string decrypt(const std::string& cipherText, const CryptoPP::SecByteBlock& key, const CryptoPP::SecByteBlock& iv);

// Helper Function Declarations

#endif  // DECRYPT_H