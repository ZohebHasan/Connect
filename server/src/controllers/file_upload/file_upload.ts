// using gridfs to store files and the multer middleware to handle file uploads

import { Request, Response } from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const connection_string ='mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect';

export const fileUpload = async (req: Request, res: Response) => {

    const storage = new GridFsStorage({
        url: connection_string,
        file: (req, file) => {
            return {
                filename: file.originalname
            };
        }
    });
    const upload = multer({ storage }).single('file');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'An error occurred while uploading the file' });
        }
        return res.status(200).json({ message: 'File uploaded successfully' });
    });


}