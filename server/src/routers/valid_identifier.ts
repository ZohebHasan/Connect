import express from 'express';
import { validIdentifier } from '../controllers/valid_identifier';
const router = express.Router();
router.post('/valididentifier', validIdentifier);
export default router;