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
const multer_1 = __importDefault(require("multer"));
const zlib_1 = __importDefault(require("zlib"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const util_1 = require("util");
const gzip = (0, util_1.promisify)(zlib_1.default.gzip);
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: 'mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect',
    file: (req, file) => {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const buffer = yield gzip(file.buffer);
            const filename = `compressed-${Date.now()}-${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
                buffer: buffer,
                metadata: {
                    originalName: file.originalname,
                    compressed: true,
                },
            };
            resolve(fileInfo);
        }));
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
