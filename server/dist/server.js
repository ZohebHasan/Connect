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
const valid_identifier_1 = require("./controllers/valid_identifier");
const google_Oauth_1 = __importDefault(require("./routers/google_Oauth"));
const google_Oauth_Callback_1 = __importDefault(require("./routers/google_Oauth_Callback"));
const requireAuth_1 = __importDefault(require("./middleware/requireAuth"));
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
app.use('/login', login_1.default);
app.use('/signup', signup_1.default);
app.use('/personal_profile', requireAuth_1.default, personal_profile_1.default);
app.use('/educational_profile', requireAuth_1.default, educational_profile_1.default);
app.use('/professional_profile', requireAuth_1.default, professional_profile_1.default);
app.use('/valid_identifier', requireAuth_1.default, valid_identifier_1.validIdentifier);
app.use('/google_oauth', google_Oauth_1.default);
app.use('/google_oauth_callback', google_Oauth_Callback_1.default);
