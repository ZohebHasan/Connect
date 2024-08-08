import express from 'express';
import { sendVerificationEmailController, verifyEmailCodeController, sendVerificationSMSController, verifyPhoneCodeController } from '../../controllers/signupAndLogin/verification';
const router = express.Router();

router.post('/send_email', sendVerificationEmailController);
router.post('/verify_email', verifyEmailCodeController);
router.post('/send_sms', sendVerificationSMSController);
router.post('/verify_sms', verifyPhoneCodeController);

export default router;