"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const social_network_1 = require("../social_networking/social_network");
const router = express_1.default.Router();
router.get('/', social_network_1.recommendationAlgo);
exports.default = router;
