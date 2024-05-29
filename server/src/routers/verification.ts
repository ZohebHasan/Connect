import express from 'express';
import { sendVerificationEmailController, verifyCodeController } from '../controllers/verification';
const router = express.Router();

router.post('/', sendVerificationEmailController);
router.post('/verify_code', verifyCodeController);

export default router;