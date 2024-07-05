import express from "express";
import { fileUpload } from "../../controllers/file_upload/file_upload";

const router = express.Router();
router.post('/', fileUpload);

export default router;