
# Welcome to Connect!

## Introduction

Connect is a revolutionary platform designed to reshape the social media landscape by empowering users with unprecedented control over their data. Our goal is to challenge the dominance of tech giants over personal data and offer a secure, user-controlled digital experience. At Connect, privacy and security are our foremost priorities, allowing users to enjoy, express, and explore freely.

Connect is designed around three branches: **Personal**, **Professional**, and **Educational**. This structure allows users to tailor their experience and control the flow of information between different aspects of their lives. We are building an easy, secure, and reliable social media platform that ensures your data remains yours.

---

## Getting Started

### File Structure

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

## Dependencies Installation

### Client Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies using `npm`:
   ```bash
   npm install
   ```

3. To start the React server:
   ```bash
   npm start
   ```

   - You can now view Connect in the browser at [http://localhost:3000](http://localhost:3000).
   - The development build is not optimized; use `npm run build` for production.

---

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies using `npm`:
   ```bash
   npm install
   ```

3. To compile the TypeScript files and build the server executables:
   ```bash
   cd src
   npx tsc
   ```

4. Run the server on port 8000:
   ```bash
   cd ..
   node dist/server.js
   ```

   The server will now be running on [http://localhost:8000](http://localhost:8000).

---

### Database Setup

We use **MongoDB** as our database.

1. Download MongoDB Compass from [here](https://www.mongodb.com/try/download/compass).
2. Connect to the database using the provided connection string:
   ```
   mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.ny9wvom.mongodb.net/
   ```

**Note:** Please do not share this connection string with anyone.

---

## Version Control

We use **GitHub** for version control.

1. To add and commit your changes, ensure you are in the root directory:
   ```bash
   git add .
   git commit -m "your message"
   git push origin <your_branch>
   ```

2. Always check your branch before committing:
   ```bash
   git branch
   ```

3. To create a pull request:
   - Visit: [GitHub Pull Requests](https://github.com/ZohebHasan/Connect).
   - Create a new pull request by selecting your branch.

---

## Security

We utilize **Signal Protocol** for end-to-end encryption (E2EE) on Connect. The encryption will be applied to both **Message Encryption** and **Profile Encryption**.

### Message Encryption

- **Key Generation:** Identity and pre-keys are generated upon registration and stored on the server.
- **Double Ratchet Algorithm:** Ensures each message has a unique key.

### Profile Encryption

- User profiles, including photos, videos, and text, are encrypted with a unique symmetric key (AES).
- The symmetric key is encrypted with the recipient's public key (ECC).

For more detailed encryption steps, refer to the Signal Protocol implementation in TypeScript.

---

## Content Analysis & Moderation

We employ multi-label classification for analyzing and tagging content, making use of **TensorFlow Lite** and **PyTorch Mobile** for model optimization on both mobile and web platforms.

---

For more detailed documentation and setup, refer to the `connect_documentation.md` file.

---

Connect Inc. © 2024


