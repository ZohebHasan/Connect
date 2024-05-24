import express from 'express';
import { getMicrosoftAuthUrl } from '../controllers/microsoft';
const router = express.Router();
router.get('/auth', getMicrosoftAuthUrl);
export default router;