#include <libsignal-client.h>

void generateKeys() {
    auto identityKeyPair = libsignal::generateIdentityKeyPair();
    auto preKeyBundle = libsignal::generatePreKeyBundle(identityKeyPair);

    // Store or use identityKeyPair and preKeyBundle as needed
}
