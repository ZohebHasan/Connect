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
exports.verifyEmailCodeController = exports.sendVerificationEmailController = void 0;
const schoolEmailService_1 = require("../../../../services/schoolEmailService");
const school_1 = __importDefault(require("../../../../models/profiles/school/school"));
const verificationCodes = new Map();
const sendVerificationEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    const schoolProfile = yield school_1.default.findOne({ user: userId });
    if (!schoolProfile) {
        return res.status(404).json({ message: 'School profile not found' });
    }
    const verificationToken = (0, schoolEmailService_1.generateEmailVerificationToken)();
    const expiresIn = 10 * 60 * 1000;
    const expirationDate = new Date(Date.now() + expiresIn);
    schoolProfile.verificationToken = verificationToken;
    schoolProfile.verificationTokenExpires = expirationDate;
    try {
        yield (0, schoolEmailService_1.sendVerificationEmail)(email, verificationToken);
        yield schoolProfile.save();
        res.status(200).send({ message: 'Verification email sent', token: verificationToken });
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send({ error: 'Failed to send verification email' });
    }
});
exports.sendVerificationEmailController = sendVerificationEmailController;
const verifyEmailCodeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const { verificationCode } = req.body;
    if (!verificationCode) {
        return res.status(400).json({ message: 'Verification Code is required' });
    }
    const schoolProfile = yield school_1.default.findOne({ user: userId });
    if (!schoolProfile) {
        return res.status(404).json({ message: 'School profile not found' });
    }
    const now = new Date();
    if (schoolProfile.verificationToken !== verificationCode) {
        return res.status(400).json({ message: 'Incorrect verification code' });
    }
    if (schoolProfile.verificationTokenExpires && now > schoolProfile.verificationTokenExpires) {
        return res.status(410).json({ message: 'Verification code has expired' });
    }
    schoolProfile.verifiedSchoolEmail = true;
    schoolProfile.verificationToken = undefined;
    schoolProfile.verificationTokenExpires = undefined;
    yield schoolProfile.save();
    return res.status(200).json({ message: 'Email verified successfully' });
});
exports.verifyEmailCodeController = verifyEmailCodeController;
