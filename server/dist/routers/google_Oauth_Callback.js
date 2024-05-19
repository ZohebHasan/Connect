"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_Oauth_Callback_1 = require("../controllers/google_Oauth_Callback");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get(process.env.GOOGLE_REDIRECT_URI, google_Oauth_Callback_1.googleOauthCallBack);
exports.default = router;
