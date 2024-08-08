import express from 'express';
<<<<<<< HEAD:server/src/routers/microsoft.ts
import { getMicrosoftAuthUrl } from '../controllers/oauth/microsoft/microsoftoauth';
import { microsoftCallback } from '../controllers/oauth/microsoft/microsoftoauth';
=======
import { getMicrosoftAuthUrl } from '../../controllers/signupAndLogin/microsoft';
>>>>>>> TestBranch:server/src/routers/signupAndLogin/microsoft.ts
const router = express.Router();
router.get('/auth', getMicrosoftAuthUrl);
router.get('/', microsoftCallback)
export default router;