"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';
const JWT_REFRESH_SECRET = '3577a4135cad0bb08c5e5529282265604c9ccec70ea2392090aeab7371d02068e81084d4839c420fee1a4eb3d02c59b58d95f81c9b4d9bd093b389572217a556';
const generateUsername = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUsername = fullName.replace(/\s+/g, '').toLowerCase();
    let suffix = 0;
    let uniqueUsername = baseUsername;
    const exists = yield userModel_1.default.findOne({ username: uniqueUsername });
    if (!exists) {
        return uniqueUsername;
    }
    while (yield userModel_1.default.findOne({ username: uniqueUsername })) {
        suffix++;
        uniqueUsername = `${baseUsername}${suffix}`;
    }
    return uniqueUsername;
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phoneNumber, password, isVerified, verifiedCredential, dataProtection, profileEncryption, contentMonetization, censor, restricted, age, dateOfBirth, keys } = req.body;
    if (!email && !phoneNumber) {
        return res.status(400).json({ message: 'Please provide either an email or a phone number.' });
    }
    const userIdentifier = parseIdentifier(email, phoneNumber);
    const userExists = yield userModel_1.default.findOne(userIdentifier);
    if (userExists) {
        return res.status(400).json({ message: 'User with the provided email or phone number already exists.' });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const username = yield generateUsername(fullName);
    const userData = {
        fullName,
        password: hashedPassword,
        username,
        isVerified,
        verifiedCredential,
        dataProtection,
        profileEncryption,
        contentMonetization,
        censor,
        restricted,
        age,
        dob: dateOfBirth,
        keys: {
            identityPublicKey: convertToBase64(keys.identityPublicKey),
            registrationId: keys.registrationId,
            preKeys: keys.preKeys.map((pk) => ({
                keyId: pk.keyId,
                publicKey: convertToBase64(pk.publicKey)
            })),
            signedPreKey: {
                keyId: keys.signedPreKey.keyId,
                publicKey: convertToBase64(keys.signedPreKey.publicKey),
                signature: convertToBase64(keys.signedPreKey.signature)
            }
        }
    };
    if (email && email.trim() !== "") {
        userData.email = email.toLowerCase();
    }
    if (phoneNumber && phoneNumber.trim() !== "") {
        userData.phoneNumber = phoneNumber;
    }
    const user = new userModel_1.default(userData);
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '6m' });
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 6 * 30 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: 'User registered successfully', user });
});
exports.signup = signup;
const parseIdentifier = (email, phoneNumber) => {
    if (email && email.trim() !== "") {
        return { email: email.toLowerCase() };
    }
    else if (phoneNumber && phoneNumber.trim() !== "") {
        return { phoneNumber };
    }
    return {};
};
const convertToBase64 = (data) => {
    if (typeof data === 'string') {
        return Buffer.from(data).toString('base64');
    }
    else if (data instanceof ArrayBuffer) {
        return Buffer.from(new Uint8Array(data)).toString('base64');
    }
    else {
        throw new TypeError(`Invalid data type for conversion to base64: ${typeof data}`);
    }
};
