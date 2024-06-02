import express from 'express';
import { Comment } from '../../controllers/posts/commentController';

const router = express.Router();

router.post('/', Comment);

export default router;