// src/routes/protectedRoutes.ts
import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getProtectedResource } from '../controllers/protectedController';
import { errorHandler } from '../middleware/errorMiddleware';

const router = express.Router();

router.get('/protected-resource', authenticate, getProtectedResource);
router.use(errorHandler);

export default router;
