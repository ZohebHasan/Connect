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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCodeController = exports.sendVerificationEmailController = void 0;
const emailServices_1 = require("../services/emailServices");
const verificationCodes = new Map();
const sendVerificationEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    const verificationToken = (0, emailServices_1.generateVerificationToken)();
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
const verifyCodeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    console.log(email, code);
    const data = verificationCodes.get(email);
    if (!data) {
        return res.status(400).send({ message: 'Invalid code' });
    }
    const { code: storedCode, timestamp } = data;
    console.log(storedCode, code);
    const now = Date.now();
    if (storedCode === code && now - timestamp <= 10 * 60 * 1000) {
        verificationCodes.delete(email);
        res.status(200).send({ message: 'Code verified successfully' });
    }
    else {
        res.status(400).send({ message: 'Invalid code' });
    }
});
exports.verifyCodeController = verifyCodeController;
