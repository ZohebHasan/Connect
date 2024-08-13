import { Request, Response } from 'express';
import { google } from 'googleapis';

const GOOGLE_CLIENT_ID = "927314664227-e5ukk88gdjem7f4mn8dkk6op0fjv6ej8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/home";

export const getGoogleAuthUrl = (req: Request, res: Response) => {
    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    const scopes = [   
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' ')
        });
        res.json({ url: authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

