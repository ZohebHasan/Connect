import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import cookieParser from 'cookie-parser'; // Import cookie-parser
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
import requireAuth from './middleware/requireAuth'; // Import custom middleware for route protection

dotenv.config();

const app = express();
const PORT: Number = 8000;

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
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

app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// Protect routes with JWT middleware
app.use('/personal_profile', requireAuth, personalProfileRouter); // Protect route with requireAuth middleware
app.use('/educational_profile', requireAuth, educationalProfileRouter); // Protect route with requireAuth middleware
app.use('/professional_profile', requireAuth, professionalProfileRouter); // Protect route with requireAuth middleware
app.use('/valid_identifier', requireAuth, validIdentifier); // Protect route with requireAuth middleware

app.use('/google_oauth', googleOauthRouter);
app.use('/google_oauth_callback', googleOauthCallBackRouter);
