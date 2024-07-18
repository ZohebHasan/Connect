import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

const conn = mongoose.createConnection('mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect');

let gfs: any;

conn.once('open', () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

export const fileUpload = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('File uploaded successfully:', req.file);
  return res.status(200).json({
    message: 'File uploaded successfully',
    fileInfo: req.file,
  });
};