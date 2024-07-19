"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microsoft_1 = require("../../controllers/signupAndLogin/microsoft");
const router = express_1.default.Router();
router.get('/auth', microsoft_1.getMicrosoftAuthUrl);
exports.default = router;
