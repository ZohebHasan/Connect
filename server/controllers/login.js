"use strict";
// // creating a controller for login
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import User from '../models/user_model';
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
const user_model_1 = __importDefault(require("../models/user_model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body;
    // parse the identifier and password from the request body
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Identifier and password are required' });
    }
    const userIdentifier = parseIdentifier(identifier);
    const user = yield user_model_1.default.findOne(userIdentifier);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    res.status(200).json({ user: user });
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
