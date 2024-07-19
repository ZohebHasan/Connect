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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';
const JWT_REFRESH_SECRET = '3577a4135cad0bb08c5e5529282265604c9ccec70ea2392090aeab7371d02068e81084d4839c420fee1a4eb3d02c59b58d95f81c9b4d9bd093b389572217a556';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        console.log('Missing identifier or password');
        return res.status(400).json({ message: 'Identifier and password are required' });
    }
    const userIdentifier = parseIdentifier(identifier);
    const user = yield userModel_1.default.findOne(userIdentifier);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '6m' });
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 6 * 30 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: 'Login successful', user });
});
exports.login = login;
const parseIdentifier = (identifier) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    if (isNaN(parseInt(identifier))) {
        return { username: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
};
