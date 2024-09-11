

# Connect: Developer Documentation

## Introduction

Welcome to **Connect**, a revolutionary platform that redefines social media by giving users full control over their data. Our goal is to empower users and provide a secure, privacy-centric platform. We prioritize data protection while providing an exceptional digital experience.

The platform is divided into three branches:
1. **Personal**
2. **Professional**
3. **Educational**

Users can customize their experience across these categories and control what content is visible in each branch.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Client Setup](#client-setup)
   - [Server Setup](#server-setup)
   - [Database Setup](#database-setup)
3. [Version Control](#version-control)
4. [Security](#security)
   - [End-to-End Encryption](#end-to-end-encryption)
5. [Content Analysis and Moderation](#content-analysis-and-moderation)
6. [Social Networking Algorithm](#social-networking-algorithm)
7. [Messaging](#messaging)

---

## Getting Started

### 2.1 Dependencies and Initialization

### File Directory Structure

```
CONNECT
│
├── client
│   ├── build
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── types
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── Documentations
│
├── server
│   ├── dist
│   ├── node_modules
│   ├── src
│   ├── types
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── UML
├── .env
└── connect_documentation.md
```

---

### Client Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React server:
   ```bash
   npm start
   ```

   You can now view **Connect** in the browser at [http://localhost:3000](http://localhost:3000).

**Note:** The development build is not optimized. Use `npm run build` to create a production build.

---

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Compile the TypeScript files:
   ```bash
   cd src
   npx tsc
   ```

   This creates `.js` executables inside the `dist` directory.

4. Start the server:
   ```bash
   cd ..
   node dist/server.js
   ```

   The server will run on [http://localhost:8000](http://localhost:8000).

---

### Database Setup

We use **MongoDB** as the database for Connect.

1. Download MongoDB Compass from [here](https://www.mongodb.com/try/download/compass).

2. Connect to the database using the following connection string:
   ```plaintext
   mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.ny9wvom.mongodb.net/
   ```

**Note:** Do not share the connection string with anyone.

---

## Version Control

### Git Commands

Make sure you are in the root directory before running these commands.

1. Add your changes:
   ```bash
   git add .
   ```

2. Commit your changes:
   ```bash
   git commit -m "your message"
   ```

3. Push to your branch:
   ```bash
   git push origin <your_branch>
   ```

4. To check your current branch:
   ```bash
   git branch
   ```

### Pushing Code

- Always push to your respective branch first. Collaborate with your teammates through pull requests.
- **Kamrul** and **Zoheb** are the only ones who can push from the `TestBranch` to `main`.

### Creating a Pull Request

1. Go to [GitHub Pull Requests](https://github.com/ZohebHasan/Connect).
2. Click on **New pull request**.
3. Choose the branch you want to merge from and into.

---

## Security

### End-to-End Encryption

We use the **Signal Protocol** to ensure secure messaging and profile content protection in Connect.

#### Messaging Encryption

- **Key Generation:** Each user generates a unique identity key pair during registration, which consists of identity keys and pre-keys.
- **Double Ratchet Algorithm:** Ensures that each message is encrypted with a unique key, offering forward secrecy.

#### Code Snippets for E2E Encryption in TypeScript

**Key Generation:**

```typescript
import { generateIdentityKeyPair, generatePreKeyBundle } from '@signalapp/libsignal-client';

const generateKeys = async () => {
    const identityKeyPair = await generateIdentityKeyPair();
    const preKeyBundle = await generatePreKeyBundle(identityKeyPair);
    return { identityKeyPair, preKeyBundle };
};
```

**Session Setup:**

```typescript
import { SignalProtocolAddress, SessionBuilder, PreKeyBundle } from '@signalapp/libsignal-client';

const setupSession = async (store, address, preKeyBundle: PreKeyBundle) => {
    const sessionBuilder = new SessionBuilder(store, address);
    await sessionBuilder.processPreKey(preKeyBundle);
};
```

**Message Encryption & Decryption:**

```typescript
import { SessionCipher } from '@signalapp/libsignal-client';

const encryptMessage = async (store, address, message) => {
    const sessionCipher = new SessionCipher(store, address);
    const ciphertext = await sessionCipher.encrypt(message);
    return ciphertext;
};

const decryptMessage = async (store, address, ciphertext) => {
    const sessionCipher = new SessionCipher(store, address);
    const plaintext = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary');
    return plaintext;
};
```

---

#### Profile Content Encryption

- **Profile Content Protection:** Each user's profile content (photos, videos, text) is encrypted with a unique symmetric key (AES).
- The symmetric key is then encrypted using the recipient's public key (ECC).

**Profile Encryption in TypeScript:**

```typescript
import { randomBytes, createCipheriv } from 'crypto';

// Generate AES key for content encryption
const generateSenderKey = () => {
    return randomBytes(32); // 256-bit AES key
};

// Encrypt content using the sender's key
const encryptContent = (content: Buffer, senderKey: Buffer) => {
    const iv = randomBytes(16); // Random initialization vector (IV) for AES
    const cipher = createCipheriv('aes-256-cbc', senderKey, iv);
    const encryptedContent = Buffer.concat([cipher.update(content), cipher.final()]);
    return { encryptedContent, iv };
};

// Example content to encrypt
const videoContent = Buffer.from('Example video content');

// Generate the key and encrypt the content
const senderKey = generateSenderKey();
const { encryptedContent, iv } = encryptContent(videoContent, senderKey);
```

**Encrypting the Sender Key with Session Keys:**

```typescript
import { SessionCipher } from '@signalapp/libsignal-client';

// Encrypt sender key using session keys
const encryptSenderKey = async (store, address, senderKey) => {
    const sessionCipher = new SessionCipher(store, address);
    const encryptedSenderKey = await sessionCipher.encrypt(senderKey);
    return encryptedSenderKey;
};

// Example usage for encrypting sender keys for multiple recipients
const encryptedSenderKeyForRecipient1 = await encryptSenderKey(store, recipient1Address, senderKey);
const encryptedSenderKeyForRecipient2 = await encryptSenderKey(store, recipient2Address, senderKey);

// Store the encrypted content and keys on the server
await uploadEncryptedContentToServer({
    encryptedContent,
    iv,
    encryptedKeys: {
        recipient1: encryptedSenderKeyForRecipient1,
        recipient2: encryptedSenderKeyForRecipient2,
    },
});
```

---

## Content Analysis and Moderation

### Content Analysis

We use **multi-label classification** for tagging content, leveraging models like **TensorFlow Lite** and **PyTorch Mobile**.

- **Text, Images, Videos:** The system supports analyzing text, multiple images, and video posts.
- **Pre-trained models** are fine-tuned for optimal performance across mobile and web platforms.

---

## Social Networking Algorithm

We are implementing a **social networking algorithm** to enhance user interaction and content recommendation.

---

## Messaging (End-to-End Encrypted)

Messaging on Connect is fully **end-to-end encrypted** using the **Signal Protocol**. This ensures private and secure communication between users.

---

For more details and further technical documentation, please refer to `connect_documentation.md`.

---

Connect LLC © 2024

