import express from 'express';
import { fileUpload } from '../../controllers/file_upload/file_upload_controller';
import upload from '../../controllers/file_upload/upload';

const router = express.Router();

router.post('/', upload.single('file'), fileUpload);

export default router;
