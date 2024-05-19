"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const google_Oauth_1 = require("../controllers/google_Oauth");
router.get('/auth/google', google_Oauth_1.googleOauth);
exports.default = router;
