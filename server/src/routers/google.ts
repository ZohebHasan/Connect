import express from 'express';
// import { getGoogleAuthUrl } from "../controllers/google";
import { google_oauth_controller } from '../controllers/oauth/google/googleoauth';
import { googlecallback } from '../controllers/oauth/google/googleoauth';
const router = express.Router();

router.get('/auth', google_oauth_controller);
router.get('/googleoauth', googlecallback);

export default router;