"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personal_profile_1 = require("../controllers/personal_profile");
const router = express_1.default.Router();
router.post("/", personal_profile_1.personalProfile);
exports.default = router;
