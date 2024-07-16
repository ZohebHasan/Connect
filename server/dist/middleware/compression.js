"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = __importDefault(require("zlib"));
const compressFile = (req, res, next) => {
    const file = req.file;
    if (!file)
        return next();
    console.log("File: ", file);
    console.log("File Buffer: ", file.buffer);
    zlib_1.default.gzip(file.buffer, (err, buffer) => {
        if (err) {
            return next(err);
        }
        file.buffer = buffer;
        console.log("Compressed File Buffer: ", file.buffer);
        file.originalname = `compressed-${file.originalname}`;
        next();
    });
};
exports.default = compressFile;
