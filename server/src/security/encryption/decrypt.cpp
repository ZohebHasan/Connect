#include "encrypt.h"

using json = nlohmann::json;

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