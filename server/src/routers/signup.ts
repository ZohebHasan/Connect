import express from 'express';
import { signup, sendVerificationEmailController } from '../controllers/signup';

const router = express.Router();

router.post('/', signup);  
router.post('/send-verification-email', sendVerificationEmailController);

export default router;
