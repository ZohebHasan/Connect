import express from 'express';
const router = express.Router();
import { posts } from '../../controllers/posts/posts';
router.post('/', posts);
export default router;