// controllers/file_upload/upload.ts

// import multer from 'multer';

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

export default upload;
