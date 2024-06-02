"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoDB_1 = require("./database/mongoDB");
const login_1 = __importDefault(require("./routers/login"));
const signup_1 = __importDefault(require("./routers/signup"));
const personal_profile_1 = __importDefault(require("./routers/personal_profile"));
const educational_profile_1 = __importDefault(require("./routers/educational_profile"));
const professional_profile_1 = __importDefault(require("./routers/professional_profile"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const refresh_1 = __importDefault(require("./routers/refresh"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const featuresSignup_1 = __importDefault(require("./routers/featuresSignup"));
const google_1 = __importDefault(require("./routers/google"));
const microsoft_1 = __importDefault(require("./routers/microsoft"));
const post_1 = __importDefault(require("./routers/posts/post"));
const comment_1 = __importDefault(require("./routers/posts/comment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
});
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
    (0, mongoDB_1.connectToMongoDB)();
});
app.use('/auth', authRouter_1.default);
app.use('/login', login_1.default);
app.use('/signup', signup_1.default);
app.use('/personal_profile', personal_profile_1.default);
app.use('/educational_profile', educational_profile_1.default);
app.use('/professional_profile', professional_profile_1.default);
app.use('/post', post_1.default);
app.use('/comment', comment_1.default);
app.use('/refresh-token', refresh_1.default);
app.use('/changeFeatures', authMiddleware_1.authenticate, featuresSignup_1.default);
app.use('/google', google_1.default);
app.use('/microsoft', microsoft_1.default);
