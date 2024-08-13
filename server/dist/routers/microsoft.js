"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microsoftoauth_1 = require("../controllers/oauth/microsoft/microsoftoauth");
const microsoftoauth_2 = require("../controllers/oauth/microsoft/microsoftoauth");
const router = express_1.default.Router();
router.get('/auth', microsoftoauth_1.getMicrosoftAuthUrl);
router.get('/', microsoftoauth_2.microsoftCallback);
exports.default = router;
