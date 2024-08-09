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
exports.verifyPhoneCodeController = exports.sendVerificationSMSController = exports.verifyEmailCodeController = exports.sendVerificationEmailController = void 0;
const emailServices_1 = require("../services/emailServices");
const phoneServices_1 = require("../services/phoneServices");
const userModel_1 = __importDefault(require("../models/userModel"));
const verificationCodes = new Map();
const sendVerificationEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    const verificationToken = (0, emailServices_1.generateEmailVerificationToken)();
    const timestamp = Date.now();
    verificationCodes.set(email, { code: verificationToken, timestamp });
    try {
        yield (0, emailServices_1.sendVerificationEmail)(email, verificationToken);
        res.status(200).send({ message: 'Verification email sent', token: verificationToken });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to send verification email' });
    }
});
exports.sendVerificationEmailController = sendVerificationEmailController;
const verifyEmailCodeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    const data = verificationCodes.get(email);
    if (!data) {
        return res.status(400).send({ message: 'Invalid code' });
    }
    const { code: storedCode, timestamp } = data;
    const now = Date.now();
    if (storedCode === code && now - timestamp <= 10 * 60 * 1000) {
        verificationCodes.delete(email);
        const user = yield userModel_1.default.findOneAndUpdate({ email: email }, { verified: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Code verified successfully' });
    }
    else {
        res.status(400).send({ message: 'Invalid code' });
    }
});
exports.verifyEmailCodeController = verifyEmailCodeController;
const sendVerificationSMSController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).send('Phone number is required');
    }
    try {
        yield (0, phoneServices_1.sendVerificationSMS)(phone);
        res.status(200).send({ message: 'Verification SMS sent' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to send verification SMS' });
    }
});
exports.sendVerificationSMSController = sendVerificationSMSController;
const verifyPhoneCodeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, code } = req.body;
    if (!phone || !code) {
        return res.status(400).send({ message: 'Phone number and code are required' });
    }
    if (yield (0, phoneServices_1.verifyPhoneCode)(phone, code)) {
        const user = yield userModel_1.default.findOneAndUpdate({ phoneNumber: phone.slice(3) }, { verified: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Code verified successfully' });
    }
    else {
        res.status(400).send({ message: 'Invalid code' });
    }
});
exports.verifyPhoneCodeController = verifyPhoneCodeController;
