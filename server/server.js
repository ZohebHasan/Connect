"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
// import the mongoDB connection
const mongoDB_1 = require("./database/mongoDB");
// import the login router
const login_1 = __importDefault(require("./routers/login"));
// import the signup router
const signup_1 = __importDefault(require("./routers/signup"));
// import the body parser
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 8000;
// use the body parser
app.use(body_parser_1.default.json());
// express json
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
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
