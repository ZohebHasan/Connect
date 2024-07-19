import { Request, Response } from "express";
export const getMicrosoftAuthUrl = (req: Request, res: Response) => {
    const client_id:string='3ff6f391-10d2-473e-9702-42529b920ea6';
    const response_type:string='code';
    const redirect_uri:string='http://localhost:3000/home';
    const scope:string='user.read';
    const response_mode:string='query';

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&response_mode=${response_mode}`;
    res.json({ url: authUrl });
}