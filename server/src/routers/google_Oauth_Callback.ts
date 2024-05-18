import { googleOauthCallBack } from "../controllers/google_Oauth_Callback";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
router.get(process.env.GOOGLE_REDIRECT_URI as string, googleOauthCallBack);
export default router;