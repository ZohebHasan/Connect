#ifndef SECURITY_H
#define SECURITY_H

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

// Helper Function Declarations
void convertJsxToJson(const std::string command);
json parseJsonFile(const std::string& filePath);
void deleteJsonFile(const std::string& filePath);

#endif  // SECURITY_H