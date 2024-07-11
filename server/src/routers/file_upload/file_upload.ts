import express from 'express';
import { fileUpload } from '../../controllers/file_upload/file_upload_controller';
import upload from '../../middleware/upload';

const router = express.Router();

router.post('/', upload.single('file'), fileUpload);

export default router;
