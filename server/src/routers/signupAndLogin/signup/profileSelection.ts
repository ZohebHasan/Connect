import express from 'express';
import { handleProfileSelections} from '../../../controllers/signupAndLogin/signup/profileSelection';
import { authenticate } from '../../../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate as express.RequestHandler, handleProfileSelections as express.RequestHandler);

export default router;
