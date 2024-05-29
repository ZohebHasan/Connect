import express from 'express';
import { refreshToken } from '../middleware/refreshTokenMiddleware';

const router = express.Router();

router.post('/', refreshToken);

export default router;
