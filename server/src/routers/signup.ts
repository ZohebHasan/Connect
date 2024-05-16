import express from 'express';
const router = express.Router();

import { signup } from '../controllers/signup';

router.post('/signup', signup);

export default router;