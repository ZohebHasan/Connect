import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToMongoDB } from './database/mongoDB';
import loginRouter from './routers/signupAndLogin/login/login';
import signupRouter from './routers/signupAndLogin/signup/signup';
import personalProfileRouter from './routers/signupAndLogin/signup/personalProfile';
import schoolProfileRouter from './routers/signupAndLogin/signup/schoolProfile';
import professionalProfileRouter from './routers/signupAndLogin/signup/professionalProfile';
import { authenticate } from './middleware/authMiddleware';
import refreshRouter from './routers/refresh';
import authRouter from './routers/authRouter';
import featuresSignupRouter from './routers/signupAndLogin/signup/featuresSignup'; // Import the featuresSignup router
import googleAuthRouter from './routers/signupAndLogin/google'; // Ensure correct import
import microsoftAuthRouter from './routers/signupAndLogin/microsoft'; // Ensure correct import
import verificationRouter from './routers/signupAndLogin/verification'
import postRouter from './routers/posts/post'
import commentRouter from './routers/posts/comment'
import text_extraction_router from './routers/tags_extraction/text_extraction_router';
import ProfileSelectionRouter from './routers/signupAndLogin/signup/profileSelection'
import fileUploadRouter from './routers/file_upload/file_upload';

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


// File upload route
app.use('/upload', fileUploadRouter);


app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/verification', verificationRouter)

// Protect routes with JWT middleware
app.use('/personal_profile', personalProfileRouter); // for testing purposes : added back the authenticate middleware
app.use('/educational_profile', schoolProfileRouter); // for testing purposes : removed the authenticate middleware
app.use('/professional_profile', professionalProfileRouter); // for testing purposes : removed the authenticate middleware
app.use('/post', postRouter);
app.use('/comment', commentRouter);

// Refresh token route
app.use('/refresh-token', refreshRouter);

// Add the featuresSignup route
app.use('/changeFeatures', authenticate, featuresSignupRouter);
app.use('/profileSelection', authenticate, ProfileSelectionRouter);
app.use('/google', googleAuthRouter); 
app.use('/microsoft', microsoftAuthRouter); // Ensure correct route

// use the text_extraction_router
app.use('/text_extraction', text_extraction_router);
app.use('/profileSelection', authenticate, ProfileSelectionRouter);

