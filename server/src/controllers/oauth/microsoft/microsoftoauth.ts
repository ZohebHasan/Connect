import { Request, Response } from "express";
import axios from 'axios';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { ConfidentialClientApplication } from '@azure/msal-node';
import User from "../../../models/userModel";

const CLIENT_ID ='7579bb59-af43-4647-9720-a5c7254f7a63';
const RESPONSE_TYPE ='code';
const REDIRECT_URI ='http://localhost:3000/signup/features';
const SCOPE ='user.read';
const RESPONSE_MODE ='query';
const CLIENT_SECRET = 'ff680cec-1c03-4bb9-8d8a-2bbc1410e24c';

export const getMicrosoftAuthUrl = (req: Request, res: Response) => {
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_mode=${RESPONSE_MODE}`;
    res.json({ url: authUrl });
}

const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common',
        clientSecret: CLIENT_SECRET
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

export const microsoftCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;

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
        const response = await cca.acquireTokenByCode(tokenRequest);
        const tokens = response ? response : null;

        if (!tokens) {
            throw new Error('Failed to obtain tokens');
        }

        console.log("Tokens: ", tokens);

        // Use the access token to get user profile information from Microsoft Graph
        const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`
            }
        });

        const profile = graphResponse.data;
        console.log("Profile: ", profile);


        // req.session.tokens = tokens;
        // req.session.user = user;

        res.json({
            tokens,
            profile
        });
    } catch (err) {
        console.error('Failed to retrieve access token', err);
        res.status(500).send('Authentication failed');
    }
};
