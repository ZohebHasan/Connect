import express from 'express';
// import { getGoogleAuthUrl } from "../controllers/google";
import { recommendationAlgo } from '../social_networking/social_network';
const router = express.Router();

router.get('/', recommendationAlgo);

export default router;