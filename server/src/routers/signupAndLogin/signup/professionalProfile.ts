// creating a professional_profile router
import express from 'express';
const router = express.Router();
import { professionalProfile } from '../../../controllers/signupAndLogin/signup/professionalProfile';
router.post('/', professionalProfile);
export default router;