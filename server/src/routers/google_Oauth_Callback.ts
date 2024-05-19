import { googleOauthCallBack } from "../controllers/google_Oauth_Callback";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
router.get("/google/Oauth/v2/callback", googleOauthCallBack);
export default router;