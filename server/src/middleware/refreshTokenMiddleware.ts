import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';
const JWT_REFRESH_SECRET = '3577a4135cad0bb08c5e5529282265604c9ccec70ea2392090aeab7371d02068e81084d4839c420fee1a4eb3d02c59b58d95f81c9b4d9bd093b389572217a556';

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: 'No refresh token found' });
    }

    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string };
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate new tokens
        const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '6m' });

        // Send new tokens as cookies
        res.cookie('jwt', newAccessToken, { httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 }); // 1 hour
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: false, maxAge: 6 * 30 * 24 * 60 * 60 * 1000 }); // 6 months

        res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
