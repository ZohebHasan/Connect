"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organization_1 = require("../../../controllers/signupAndLogin/signup/organization");
const router = express_1.default.Router();
router.post("/", organization_1.organization);
exports.default = router;
