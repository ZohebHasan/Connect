#include "header/decrypt.h"

int main() {
    std::string decryptedSecurityInfo = decrypt(encryptedSecurityInfo, key, iv);
    std::cout << "Decrypted Security Information: " << decryptedSecurityInfo << std::endl;
}