// creating a personal_profile router
import express from "express";
import { organization} from '../../../controllers/signupAndLogin/signup/organization'

const router = express.Router();
router.post("/", organization);
export default router;
