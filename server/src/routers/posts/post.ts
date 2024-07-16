import express from 'express';
import { Post, updatePost } from '../../controllers/posts/postController';
import upload from '../../controllers/file_upload/upload';
const router = express.Router();

router.post('/:media_type', upload.single('file'), Post);
router.put('/', updatePost)

export default router;
