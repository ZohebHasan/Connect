import express from 'express';
import { getUserProfessional } from '../../../../controllers/ConnectUser/profiles/professional/professional';
import { authenticate } from '../../../../middleware/authMiddleware';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserProfessional as express.RequestHandler);

export default router;
