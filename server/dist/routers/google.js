"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleoauth_1 = require("../controllers/oauth/google/googleoauth");
const googleoauth_2 = require("../controllers/oauth/google/googleoauth");
const router = express_1.default.Router();
router.get('/auth', googleoauth_1.google_oauth_controller);
router.get('/googleoauth', googleoauth_2.googlecallback);
exports.default = router;
