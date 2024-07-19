"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const schoolProfile_1 = require("../../../controllers/signupAndLogin/signup/schoolProfile");
router.post('/', schoolProfile_1.educationalProfile);
exports.default = router;
