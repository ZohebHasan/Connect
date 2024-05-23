import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToMongoDB } from './database/mongoDB';
import loginRouter from './routers/login';
import signupRouter from './routers/signup';
import personalProfileRouter from './routers/personal_profile';
import educationalProfileRouter from './routers/educational_profile';
import professionalProfileRouter from './routers/professional_profile';
import { validIdentifier } from './controllers/valid_identifier';
import googleOauthRouter from './routers/google_Oauth';
import googleOauthCallBackRouter from './routers/google_Oauth_Callback';
import { authenticate } from './middleware/authMiddleware';
import refreshRouter from './routers/refresh';
import authRouter from './routers/authRouter';
import featuresSignupRouter from './routers/featuresSignup'; // Import the featuresSignup router
import googleAuthRouter from './routers/google'; // Ensure correct import

dotenv.config();

const app = express();
const PORT: Number = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to typescript backend!');
});

app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
    connectToMongoDB();
});

app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// Protect routes with JWT middleware
app.use('/personal_profile', authenticate, personalProfileRouter);
app.use('/educational_profile', authenticate, educationalProfileRouter);
app.use('/professional_profile', authenticate, professionalProfileRouter);
app.use('/valid_identifier', authenticate, validIdentifier);

app.use('/google_oauth', googleOauthRouter);
app.use('/google_oauth_callback', googleOauthCallBackRouter);

// Refresh token route
app.use('/refresh-token', refreshRouter);

// Add the featuresSignup route
app.use('/changeFeatures', authenticate, featuresSignupRouter);
app.use('/google', googleAuthRouter); // Ensure correct route