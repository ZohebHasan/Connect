"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../../controllers/posts/postController");
const router = express_1.default.Router();
router.post('/:media_type', postController_1.Post);
router.put('/', postController_1.updatePost);
exports.default = router;
