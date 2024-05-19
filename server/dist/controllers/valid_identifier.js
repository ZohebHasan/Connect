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
exports.validIdentifier = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const validIdentifier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.body;
    if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required' });
    }
    const userIdentifier = parseIdentifier(identifier);
    const user = yield userModel_1.default.findOne(userIdentifier);


    if (user){
        return res.status(400).json({ message: 'An user already exist' });
    }
    res.status(200)
        .send(true);
});
exports.validIdentifier = validIdentifier;
const parseIdentifier = (identifier) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
};
