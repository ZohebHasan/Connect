import express from 'express';
import { Post, updatePost } from '../../controllers/posts/postController';

const router = express.Router();

router.post('/:media_type', Post);
router.put('/', updatePost)

export default router;
