"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const conn = mongoose_1.default.createConnection('mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect');
let gfs;
conn.once('open', () => {
    gfs = (0, gridfs_stream_1.default)(conn.db, mongoose_1.default.mongo);
    gfs.collection('uploads');
});
const fileUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded successfully:', req.file);
    return res.status(200).json({
        message: 'File uploaded successfully',
        fileInfo: req.file,
    });
};
exports.fileUpload = fileUpload;
