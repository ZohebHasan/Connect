import express from 'express';
const router = express.Router();
import { createPost } from '../../controllers/posts/posts';
router.post('/', createPost);
export default router;