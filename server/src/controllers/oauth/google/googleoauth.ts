import session from 'express-session';
import { Request, Response } from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import UserModel from '../../../models/userModel';


const GOOGLE_CLIENT_ID = "792300995072-8dpe1tf9k3m6va65673akfevjm0rlaj1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/signup/features";

declare module 'express-session' {
    export interface SessionData {
      tokens: any;  // Define the type according to what you expect here, e.g., any, specific object type, etc.
      profile: any;  // Similarly, define the type as needed
    }
}

export const google_oauth_controller = async (req: Request, res: Response) => {
    const { oauth } = req.body;

    if (!oauth){
        res.status(400).json("Oauth is required")
    }
    console.log("Client ID:", GOOGLE_CLIENT_ID)
    console.log("Client Secret: ", GOOGLE_CLIENT_SECRET)
    console.log("Redirect URI: ", GOOGLE_REDIRECT_URI)
    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );
    const scopes = [
        "https://www.googleapis.com/auth/cloud-platform", 
        "https://www.googleapis.com/auth/cloud-vision",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
    try{
        if (oauth === "google"){
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes.join(' ')
            });
            console.log(authUrl);
            res.json(authUrl);
        }
    } catch(err){
        console.error('Error generating auth URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const googlecallback = async(req: Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) {
        return res.status(400).json('No authorization code provided.');
    }
    console.log("Code: ", code)


    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    try {
        const { tokens } = await oauth2Client.getToken(code); // Using async/await for clarity
        oauth2Client.setCredentials(tokens);

        if (!tokens) {
            res.status(400).json('No tokens found');
        }
        console.log("Token: ", tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const userInfoResponse = await oauth2.userinfo.get();
        const profile = userInfoResponse.data;
        console.log("Profile: ", profile);

        //Store the tokens and profiles in sessions
        req.session.tokens = tokens;
        req.session.profile = profile;

        res.json({
            tokens,
            profile
        });
    } catch (err) {
        console.error('Failed to retrieve access token', err);
        res.status(500).send('Authentication failed');
    }
}