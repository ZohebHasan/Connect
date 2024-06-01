import express from 'express';
import { Post } from '../../controllers/posts/postController';

const router = express.Router();

router.post('/:media_type', Post);

export default router;
