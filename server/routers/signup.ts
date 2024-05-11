// creating a signup router
import express from 'express';
import {Request, Response} from 'express';
const router = express.Router();



router.get('/signup', (req: Request, res: Response) => {
    res.send('Signup route');

});
export default router;