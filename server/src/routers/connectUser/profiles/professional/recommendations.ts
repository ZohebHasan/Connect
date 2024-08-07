import express from 'express';
import { getUserRecommendations } from '../../../../controllers/ConnectUser/profiles/professional/recommendations';
import { authenticate } from '../../../../middleware/authMiddleware';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserRecommendations as express.RequestHandler);

export default router;
