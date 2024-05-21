"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const generateSecret = () => {
    return crypto_1.default.randomBytes(64).toString('hex');
};
const JWT_SECRET = generateSecret();
const JWT_REFRESH_SECRET = generateSecret();
console.log('JWT_SECRET:', JWT_SECRET);
console.log('JWT_REFRESH_SECRET:', JWT_REFRESH_SECRET);
