import express from 'express';
const router = express.Router();
import { googleOauth } from '../controllers/google_Oauth';
router.get('/auth/google', googleOauth);
export default router;
