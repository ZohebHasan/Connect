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
const login_1 = __importDefault(require("./routers/signupAndLogin/login/login"));
const signup_1 = __importDefault(require("./routers/signupAndLogin/signup/signup"));
const personalProfile_1 = __importDefault(require("./routers/signupAndLogin/signup/personalProfile"));
const schoolProfile_1 = __importDefault(require("./routers/signupAndLogin/signup/schoolProfile"));
const professionalProfile_1 = __importDefault(require("./routers/signupAndLogin/signup/professionalProfile"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const refresh_1 = __importDefault(require("./routers/refresh"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const featuresSignup_1 = __importDefault(require("./routers/signupAndLogin/signup/featuresSignup"));
const google_1 = __importDefault(require("./routers/signupAndLogin/google"));
const microsoft_1 = __importDefault(require("./routers/signupAndLogin/microsoft"));
const verification_1 = __importDefault(require("./routers/signupAndLogin/verification"));
const post_1 = __importDefault(require("./routers/posts/post"));
const comment_1 = __importDefault(require("./routers/posts/comment"));
const text_extraction_router_1 = __importDefault(require("./routers/tags_extraction/text_extraction_router"));
const profileSelection_1 = __importDefault(require("./routers/signupAndLogin/signup/profileSelection"));
const file_upload_1 = __importDefault(require("./routers/file_upload/file_upload"));
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
app.use('/upload', file_upload_1.default);
app.use('/auth', authRouter_1.default);
app.use('/login', login_1.default);
app.use('/signup', signup_1.default);
app.use('/verification', verification_1.default);
app.use('/personal_profile', personalProfile_1.default);
app.use('/educational_profile', schoolProfile_1.default);
app.use('/professional_profile', professionalProfile_1.default);
app.use('/post', post_1.default);
app.use('/comment', comment_1.default);
app.use('/refresh-token', refresh_1.default);
app.use('/changeFeatures', authMiddleware_1.authenticate, featuresSignup_1.default);
app.use('/profileSelection', authMiddleware_1.authenticate, profileSelection_1.default);
app.use('/google', google_1.default);
app.use('/microsoft', microsoft_1.default);
app.use('/text_extraction', text_extraction_router_1.default);
app.use('/profileSelection', authMiddleware_1.authenticate, profileSelection_1.default);
