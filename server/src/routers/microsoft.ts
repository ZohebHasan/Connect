import express from 'express';
import { getMicrosoftAuthUrl } from '../controllers/oauth/microsoft/microsoftoauth';
import { microsoftCallback } from '../controllers/oauth/microsoft/microsoftoauth';
const router = express.Router();
router.get('/auth', getMicrosoftAuthUrl);
router.get('/', microsoftCallback)
export default router;