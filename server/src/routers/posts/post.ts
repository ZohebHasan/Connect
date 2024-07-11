import express from 'express';
import { Post, updatePost } from '../../controllers/posts/postController';
import upload from '../../middleware/upload';
import compressFile from '../../middleware/compression';

const router = express.Router();

router.post('/:media_type', upload.single('file'), compressFile, Post);
router.put('/', updatePost)

export default router;
