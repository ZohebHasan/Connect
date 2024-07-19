"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verification_1 = require("../../controllers/signupAndLogin/verification");
const router = express_1.default.Router();
router.post('/send_email', verification_1.sendVerificationEmailController);
router.post('/verify_email', verification_1.verifyEmailCodeController);
router.post('/send_sms', verification_1.sendVerificationSMSController);
router.post('/verify_sms', verification_1.verifyPhoneCodeController);
exports.default = router;
