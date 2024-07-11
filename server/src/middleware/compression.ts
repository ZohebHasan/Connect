import { Request, Response, NextFunction } from 'express';
import zlib from 'zlib';

const compressFile = (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (!file) return next();
    console.log("File: ", file)
    console.log("File Buffer: ", file.buffer)

    zlib.gzip(file.buffer, (err, buffer) => {
        if (err) {
            return next(err);
        }

        file.buffer = buffer;  // Replace the original file buffer with compressed data
        console.log("Compressed File Buffer: ", file.buffer)
        file.originalname = `compressed-${file.originalname}`;
        next();
    });
};

export default compressFile;
