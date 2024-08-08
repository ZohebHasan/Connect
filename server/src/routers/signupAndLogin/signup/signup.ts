import express from 'express';
import { signup} from '../../../controllers/signupAndLogin/signup/signup';

const router = express.Router();

router.post('/', signup);  

export default router;
