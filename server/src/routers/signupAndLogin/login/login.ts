// creating a login router
import express from 'express';
const router = express.Router();

// import the login controller
import { login } from '../../../controllers/signupAndLogin/login/login';

router.post('/', login);

export default router;
