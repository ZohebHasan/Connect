"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const protectedController_1 = require("../controllers/protectedController");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const router = express_1.default.Router();
router.get('/protected-resource', authMiddleware_1.authenticate, protectedController_1.getProtectedResource);
router.use(errorMiddleware_1.errorHandler);
exports.default = router;
