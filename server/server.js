"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
// import the mongoDB connection
const mongoDB_1 = require("./database/mongoDB");
const app = (0, express_1.default)();
const PORT = 8000;
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
