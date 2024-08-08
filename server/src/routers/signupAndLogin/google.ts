import express from 'express';
<<<<<<< HEAD:server/src/routers/google.ts
// import { getGoogleAuthUrl } from "../controllers/google";
import { google_oauth_controller } from '../controllers/oauth/google/googleoauth';
import { googlecallback } from '../controllers/oauth/google/googleoauth';
=======
import { getGoogleAuthUrl } from "../../controllers/signupAndLogin/google";
>>>>>>> TestBranch:server/src/routers/signupAndLogin/google.ts
const router = express.Router();

router.get('/auth', google_oauth_controller);
router.get('/googleoauth', googlecallback);

export default router;