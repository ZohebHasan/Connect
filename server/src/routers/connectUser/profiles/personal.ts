import express from 'express';
import { getUserPersonal } from '../../../controllers/ConnectUser/profiles/personal';
import { authenticate } from '../../../middleware/authMiddleware';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserPersonal as express.RequestHandler);

export default router;
