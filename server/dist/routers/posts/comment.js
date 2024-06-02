"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../../controllers/posts/commentController");
const router = express_1.default.Router();
router.post('/', commentController_1.Comment);
exports.default = router;
