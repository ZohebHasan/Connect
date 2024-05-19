import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import url from 'url'; // Add this line to import the 'url' module
export const googleOauthCallBack = async (req: Request, res: Response) => {
    const qs = url.parse(req.url, true).query;
    const code = qs.code as string;
    const OauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID as string,
        process.env.GOOGLE_CLIENT_SECRET as string,
        process.env.GOOGLE_REDIRECT_URI as string
    );
    const { tokens } = await OauthClient.getToken(code);
    OauthClient.setCredentials(tokens);
    const oauth2 = google.oauth2({
        auth: OauthClient,
        version: 'v2'
    });
    const { data } = await oauth2.userinfo.get();
    res.status(200).json({ user: data });
    
}