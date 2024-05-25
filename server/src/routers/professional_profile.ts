// creating a professional_profile router
import express from 'express';
const router = express.Router();
import { professionalProfile } from '../controllers/professional_profile';
router.post('/', professionalProfile);
export default router;