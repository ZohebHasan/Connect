import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
};

export default requireAuth;
