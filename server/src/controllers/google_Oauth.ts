// now that youhave created the google Oauth redirect the user to google googleOauth url
import googleOauthGenerator from '../auth/google_Oauth';
import { Request, Response } from 'express';
export const googleOauth =  (req: Request, res: Response) => {
    const url = googleOauthGenerator();
    return res.redirect(url)
}
