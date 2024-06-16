import express from 'express';
import { extractTags } from '../../controllers/tags_extraction/text_extraction/text_extraction_model_controller';
const router = express.Router();
router.post('/', extractTags);
export default router;