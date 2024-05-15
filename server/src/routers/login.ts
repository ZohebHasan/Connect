// creating a login router
import express from 'express';
const router = express.Router();

// import the login controller
import { login } from '../src/controllers/login';

router.post('/login', login);

export default router;
