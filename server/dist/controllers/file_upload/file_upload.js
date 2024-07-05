"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const connection_string = 'mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect';
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = new multer_gridfs_storage_1.GridFsStorage({
        url: connection_string,
        file: (req, file) => {
            return {
                filename: file.originalname
            };
        }
    });
    const upload = (0, multer_1.default)({ storage }).single('file');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'An error occurred while uploading the file' });
        }
        return res.status(200).json({ message: 'File uploaded successfully' });
    });
});
exports.fileUpload = fileUpload;
