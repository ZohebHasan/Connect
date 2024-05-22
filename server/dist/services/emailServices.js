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
exports.generateVerificationToken = exports.sendVerificationEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey("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");
const sendVerificationEmail = (to, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to,
        from: 'admin@connectai.earth',
        templateId: 'd-ed644ff94c2346a181e2f92d4398e1f0',
        dynamic_template_data: {
            verificationToken,
        },
    };
    try {
        yield mail_1.default.send(msg);
        console.log('Verification email sent successfully.');
    }
    catch (error) {
        console.error('Error sending verification email:', error.response ? error.response.body : error);
        throw new Error('Failed to send verification email');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const generateVerificationToken = (length = 6) => {
    const characters = '0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};
exports.generateVerificationToken = generateVerificationToken;
