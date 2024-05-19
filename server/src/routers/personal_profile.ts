// creating a personal_profile router
import express from "express";
import { personalProfile } from "../controllers/personal_profile";
const router = express.Router();
router.post("/personal_profile", personalProfile);
export default router;
