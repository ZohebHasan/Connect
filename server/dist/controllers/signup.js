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
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phoneNumber, password, dataProtection, profileEncryption, contentMonitization, censor, restricted, dateOfBirth } = req.body;
    const userExists2 = isUnique(email, phoneNumber);
    if (!userExists2) {
        return res.status(400).json({ message: 'Please sign up with a different username, email or phonenumber' });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const user = new userModel_1.default({
        fullName: fullName,
        email: email,
        password: hashedPassword,
        username: Math.random(),
        dataProtection: dataProtection,
        profileEncryption: profileEncryption,
        contentMonitization: contentMonitization,
        censor: censor,
        restricted: restricted,
        dob: dateOfBirth,
        phoneNumber: phoneNumber
    });
    yield user.save();
    res.status(201).json({ user });
});
exports.signup = signup;
const isUnique = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield userModel_1.default.findOne({
        $or: [
            { email },
            { phoneNumber }
        ]
    });
    if (!exists) {
        return true;
    }
    return false;
});
