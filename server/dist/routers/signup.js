"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controllers/signup");
const router = express_1.default.Router();
router.post('/', signup_1.signup);
router.post('/send-verification-email', signup_1.sendVerificationEmailController);
exports.default = router;
