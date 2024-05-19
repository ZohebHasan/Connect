"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauth = void 0;
const google_Oauth_1 = __importDefault(require("../auth/google_Oauth"));
const googleOauth = (req, res) => {
    const url = (0, google_Oauth_1.default)();
    return res.redirect(url);
};
exports.googleOauth = googleOauth;
