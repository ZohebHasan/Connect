"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubsAndOrgs_1 = require("../../../../controllers/ConnectUser/profiles/school/clubsAndOrgs");
const authMiddleware_1 = require("../../../../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticate, clubsAndOrgs_1.getUserClubAndOrg);
exports.default = router;
