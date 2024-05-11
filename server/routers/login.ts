// creating a login router
import express from 'express';
import {Request, Response} from 'express';
const router = express.Router();



router.get('/login', (req: Request, res: Response) => {
    res.send('Login route');

});

export default router;