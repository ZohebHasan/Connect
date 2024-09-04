"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolEmailVerification_1 = require("../../../../controllers/ConnectUser/profiles/school/schoolEmailVerification");
const router = express_1.default.Router();
router.post('/send_email', schoolEmailVerification_1.sendVerificationEmailController);
router.post('/verify_email', schoolEmailVerification_1.verifyEmailCodeController);
exports.default = router;
