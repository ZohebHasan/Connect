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
exports.verifyPhoneCode = exports.sendVerificationSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountSid = "ACab11528a05bfb3688514267e596090b9";
const authToken = "d804677cf08df0e79f05ab92373a66c8";
const serviceSid = "VA9e40885422c64ecca5f5f1cf7475a8ce";
if (!accountSid || !authToken || !serviceSid) {
    throw new Error('Twilio credentials are not set.');
}
const client = (0, twilio_1.default)(accountSid, authToken);
const sendVerificationSMS = (to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield client.verify.v2.services(serviceSid).verifications.create({
            to,
            channel: 'sms',
        });
        console.log('Verification SMS sent successfully.');
        return verification;
    }
    catch (error) {
        console.error('Error sending verification SMS:', error);
        throw new Error('Failed to send verification SMS');
    }
});
exports.sendVerificationSMS = sendVerificationSMS;
const verifyPhoneCode = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationCheck = yield client.verify.v2.services(serviceSid).verificationChecks.create({
            to,
            code,
        });
        console.log('Verification check:', verificationCheck.status);
        return verificationCheck.status === 'approved';
    }
    catch (error) {
        console.error('Error verifying code:', error);
        throw new Error('Failed to verify code');
    }
});
exports.verifyPhoneCode = verifyPhoneCode;
