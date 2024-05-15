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
exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user_model"));
// import body parser
// signup controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user details from the request body
    const { firstName, lastName, email, password, username, phoneNumber } = req.body;
    // check if the user already exists
    const userExists = yield user_model_1.default.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // hash the password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    // create a new user
    const user = new user_model_1.default({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        username,
        phoneNumber
    });
    // save the user
    yield user.save();
    // // create a token
    // const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    // // send the token and user details
    // res.status(201).json({ token, user });
    res.status(201).json({ user });
});
exports.signup = signup;