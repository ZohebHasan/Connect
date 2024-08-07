"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendations_1 = require("../../../../controllers/ConnectUser/profiles/professional/recommendations");
const authMiddleware_1 = require("../../../../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticate, recommendations_1.getUserRecommendations);
exports.default = router;
