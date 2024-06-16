"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const text_extraction_model_controller_1 = require("../../controllers/tags_extraction/text_extraction/text_extraction_model_controller");
const router = express_1.default.Router();
router.post('/', text_extraction_model_controller_1.extractTags);
exports.default = router;
