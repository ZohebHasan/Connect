import express from 'express';
import { getUserData } from '../../controllers/ConnectUser/userData';
import { authenticate } from '../../middleware/authMiddleware'; // Adjust the path as necessary

const router = express.Router();

// Route to get user data
router.get('/', authenticate as express.RequestHandler, getUserData as express.RequestHandler);

export default router;
