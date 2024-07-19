import express from 'express';
import { getGoogleAuthUrl } from "../../controllers/signupAndLogin/google";
const router = express.Router();

router.get('/auth', getGoogleAuthUrl);

export default router;