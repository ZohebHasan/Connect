// creating a personal_profile router
import express from "express";
import { personalProfile } from "../controllers/personal_profile";
const router = express.Router();
router.post("/", personalProfile);
export default router;
