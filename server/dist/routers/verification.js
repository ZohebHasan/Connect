"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verification_1 = require("../controllers/verification");
const router = express_1.default.Router();
router.post('/', verification_1.sendVerificationEmailController);
router.post('/verify_code', verification_1.verifyCodeController);
exports.default = router;
