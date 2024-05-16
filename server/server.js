"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { connectToMongoDB } from './database/mongoDB';
const mongoDB_1 = require("./src/database/mongoDB");
const login_1 = __importDefault(require("./src/routers/login"));
const signup_1 = __importDefault(require("./src/routers/signup"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(body_parser_1.default.json());
// express json
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
});
// Server setup
app.listen(PORT, () => {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
    // connect to MongoDB
    (0, mongoDB_1.connectToMongoDB)();
});
// use the login router
app.use(login_1.default);
// use the signup router
app.use(signup_1.default);
// use the body parser
