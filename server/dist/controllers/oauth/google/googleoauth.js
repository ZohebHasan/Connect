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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googlecallback = exports.google_oauth_controller = void 0;
const googleapis_1 = require("googleapis");
const GOOGLE_CLIENT_ID = "792300995072-8dpe1tf9k3m6va65673akfevjm0rlaj1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/signup/features";
const google_oauth_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oauth } = req.body;
    if (!oauth) {
        res.status(400).json("Oauth is required");
    }
    console.log("Client ID:", GOOGLE_CLIENT_ID);
    console.log("Client Secret: ", GOOGLE_CLIENT_SECRET);
    console.log("Redirect URI: ", GOOGLE_REDIRECT_URI);
    const oauth2Client = new googleapis_1.google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
    const scopes = [
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/cloud-vision",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ];
    try {
        if (oauth === "google") {
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes.join(' ')
            });
            console.log(authUrl);
            res.json(authUrl);
        }
    }
    catch (err) {
        console.error('Error generating auth URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.google_oauth_controller = google_oauth_controller;
const googlecallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json('No authorization code provided.');
    }
    console.log("Code: ", code);
    const oauth2Client = new googleapis_1.google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
    try {
        const { tokens } = yield oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        if (!tokens) {
            res.status(400).json('No tokens found');
        }
        console.log("Token: ", tokens);
        const oauth2 = googleapis_1.google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        const userInfoResponse = yield oauth2.userinfo.get();
        const profile = userInfoResponse.data;
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
exports.googlecallback = googlecallback;
