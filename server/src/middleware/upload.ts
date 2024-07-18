import multer from 'multer';
import zlib from 'zlib';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import { promisify } from 'util';
 
const gzip = promisify(zlib.gzip)
// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect',
  file: (req, file) => {
    return new Promise(async (resolve, reject) => {
      // Compress file content before uploading
      const buffer = await gzip(file.buffer);
      const filename = `compressed-${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads', // Use the same collection name as initialized with GridFS
        buffer: buffer,
        metadata: {
          originalName: file.originalname,
          compressed: true,
          // Additional metadata like original and compressed sizes could be added here
        },
      };
      resolve(fileInfo);
    });
  },
});


const upload = multer({ storage });

export default upload;
