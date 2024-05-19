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
const userModel_1 = __importDefault(require("../models/userModel"));
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
    const { fullName, email, phoneNumber, password, dataProtection, profileEncryption, contentMonitization, censor, restricted, age, dateOfBirth } = req.body;
    const userExists = yield isUnique(email, phoneNumber);
    if (!userExists) {
        return res.status(400).json({ message: 'Please sign up with a different email or phone number.' });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const username = yield generateUsername(fullName);
    let userData = {
        fullName,
        password: hashedPassword,
        username,
        dataProtection,
        profileEncryption,
        contentMonitization,
        censor,
        restricted,
        age,
        dob: dateOfBirth,
    };
    if (email && email.trim() !== "") {
        userData.email = email.toLowerCase();
    }
    if (phoneNumber && phoneNumber.trim() !== "") {
        userData.phoneNumber = phoneNumber;
    }
    const user = new userModel_1.default(userData);
    yield user.save();
    res.status(201).json({ user });
});
exports.signup = signup;
const isUnique = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdentifier = parseIdentifier(email, phoneNumber);
    const user = yield userModel_1.default.findOne(userIdentifier);
    if (!user) {
        return true;
    }
    return false;
});
const parseIdentifier = (email, phoneNumber) => {
    if (email.includes('@')) {
        return { email: email.toLowerCase() };
    }
    return { phoneNumber: phoneNumber };
};
