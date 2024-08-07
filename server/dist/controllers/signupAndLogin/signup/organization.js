"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organization = void 0;
const organization_1 = __importDefault(require("../../../models/organization"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const organization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = yield userModel_1.default.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newOrg = new organization_1.default({
        user: user
    });
    yield newOrg.save();
    res.status(200).json({ profile: newOrg });
});
exports.organization = organization;
