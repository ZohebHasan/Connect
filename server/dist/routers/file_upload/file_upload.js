"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_upload_1 = require("../../controllers/file_upload/file_upload");
const router = express_1.default.Router();
router.post('/', file_upload_1.fileUpload);
exports.default = router;
