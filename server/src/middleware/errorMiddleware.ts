// src/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message || 'Internal Server Error' });
};
