// creating a education_profile router
import express from 'express';
const router = express.Router();

import { educationalProfile } from '../../../controllers/signupAndLogin/signup/schoolProfile';

router.post('/', educationalProfile);
export default router;