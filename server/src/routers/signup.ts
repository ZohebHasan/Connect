// creating a signup router
import express from 'express';
const router = express.Router();
// import the signup controller
import { signup } from '../src/controllers/signup';

router.post('/signup', signup);

export default router;