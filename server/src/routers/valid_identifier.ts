import express from 'express';
import { validIdentifier } from '../controllers/valid_identifier';
const router = express.Router();
router.post('/validIdentifier', validIdentifier);
export default router;