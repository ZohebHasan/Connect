// src/controllers/protectedController.ts
import { Request, Response } from 'express';

export const getProtectedResource = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ message: 'This is a protected resource', user: req.user });
};
