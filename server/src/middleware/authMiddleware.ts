import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserType } from '../models/userModel';

const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user as UserType & Document;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
