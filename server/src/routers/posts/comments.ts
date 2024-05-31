import express from 'express';
const router = express.Router();
import { comments } from '../../controllers/posts/comments';
router.post('/', comments);
export default router;