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
exports.microsoftCallback = exports.getMicrosoftAuthUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const msal_node_1 = require("@azure/msal-node");
const CLIENT_ID = '7579bb59-af43-4647-9720-a5c7254f7a63';
const RESPONSE_TYPE = 'code';
const REDIRECT_URI = 'http://localhost:3000/signup/features';
const SCOPE = 'user.read';
const RESPONSE_MODE = 'query';
const CLIENT_SECRET = 'ff680cec-1c03-4bb9-8d8a-2bbc1410e24c';
const getMicrosoftAuthUrl = (req, res) => {
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_mode=${RESPONSE_MODE}`;
    res.json({ url: authUrl });
};
exports.getMicrosoftAuthUrl = getMicrosoftAuthUrl;
const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common',
        clientSecret: CLIENT_SECRET
    }
};
const cca = new msal_node_1.ConfidentialClientApplication(msalConfig);
const microsoftCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No authorization code provided.');
    }
    console.log("Code: ", code);
    const tokenRequest = {
        code,
        scopes: [SCOPE],
        redirectUri: REDIRECT_URI
    };
    try {
        const response = yield cca.acquireTokenByCode(tokenRequest);
        const tokens = response ? response : null;
        if (!tokens) {
            throw new Error('Failed to obtain tokens');
        }
        console.log("Tokens: ", tokens);
        const graphResponse = yield axios_1.default.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`
            }
        });
        const profile = graphResponse.data;
        console.log("Profile: ", profile);
        req.session.tokens = tokens;
        req.session.profile = profile;
        res.json({
            tokens,
            profile
        });
    }
    catch (err) {
        console.error('Failed to retrieve access token', err);
        res.status(500).send('Authentication failed');
    }
});
exports.microsoftCallback = microsoftCallback;
