// creating a personal_profile router
import express from "express";
import { personalProfile} from '../../../controllers/signupAndLogin/signup/personalProfile';

const router = express.Router();
router.post("/", personalProfile);
export default router;
