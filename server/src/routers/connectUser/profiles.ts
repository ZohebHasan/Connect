import express from 'express';
import { getUserProfiles } from '../../controllers/ConnectUser/profiles';
import { authenticate } from '../../middleware/authMiddleware';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserProfiles as express.RequestHandler);

export default router;
