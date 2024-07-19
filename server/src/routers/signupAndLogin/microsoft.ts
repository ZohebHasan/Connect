import express from 'express';
import { getMicrosoftAuthUrl } from '../../controllers/signupAndLogin/microsoft';
const router = express.Router();
router.get('/auth', getMicrosoftAuthUrl);
export default router;