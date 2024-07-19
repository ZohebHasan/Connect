import express from 'express';
import { handleFeaturesChange } from '../../../controllers/signupAndLogin/signup/changeFeatures';
import { authenticate } from '../../../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate as express.RequestHandler, handleFeaturesChange as express.RequestHandler);

export default router;
