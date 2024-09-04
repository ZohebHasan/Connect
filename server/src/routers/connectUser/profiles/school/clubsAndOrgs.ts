import express from 'express';
import { getUserClubAndOrg } from '../../../../controllers/ConnectUser/profiles/school/clubsAndOrgs';
import { authenticate } from '../../../../middleware/authMiddleware';

const router = express.Router();

// Route to get user profiles
router.get('/', authenticate as express.RequestHandler, getUserClubAndOrg as express.RequestHandler);

export default router;
