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
import { authenticate } from './middleware/authMiddleware';
import refreshRouter from './routers/refresh';
import authRouter from './routers/authRouter';
import featuresSignupRouter from './routers/featuresSignup'; // Import the featuresSignup router
import googleAuthRouter from './routers/google'; // Ensure correct import
import microsoftAuthRouter from './routers/microsoft'; // Ensure correct import

import postRouter from './routers/posts/post'
import commentRouter from './routers/posts/comment'
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
app.use('/personal_profile', personalProfileRouter); // for testing purposes : added back the authenticate middleware
app.use('/educational_profile', educationalProfileRouter); // for testing purposes : removed the authenticate middleware
app.use('/professional_profile', professionalProfileRouter); // for testing purposes : removed the authenticate middleware
app.use('/post', postRouter);
app.use('/comment', commentRouter);

// Refresh token route
app.use('/refresh-token', refreshRouter);

// Add the featuresSignup route
app.use('/changeFeatures', authenticate, featuresSignupRouter);
app.use('/google', googleAuthRouter); 
app.use('/microsoft', microsoftAuthRouter); // Ensure correct route

