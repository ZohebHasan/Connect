"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauthCallBack = void 0;
const googleapis_1 = require("googleapis");
const url_1 = __importDefault(require("url"));
const googleOauthCallBack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qs = url_1.default.parse(req.url, true).query;
    const code = qs.code;
    const OauthClient = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    const { tokens } = yield OauthClient.getToken(code);
    OauthClient.setCredentials(tokens);
    const oauth2 = googleapis_1.google.oauth2({
        auth: OauthClient,
        version: 'v2'
    });
    const { data } = yield oauth2.userinfo.get();
    res.status(200).json({ user: data });
});
exports.googleOauthCallBack = googleOauthCallBack;
