
import express, {Request, Response} from 'express';

// import { connectToMongoDB } from './database/mongoDB';
import { connectToMongoDB } from './database/mongoDB';


import loginRouter from './routers/login';

import signupRouter from './routers/signup';

import personalProfileRouter from './routers/personal_profile';
import educationalProfileRouter from './routers/educational_profile';
import professionalProfileRouter from './routers/professional_profile';
import { validIdentifier } from './controllers/valid_identifier';

import bodyParser from 'body-parser';


import cors from 'cors';

const app = express();
const PORT:Number=8000;


app.use(bodyParser.json());
// express json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

// Handling GET / Request
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to typescript backend!');
}) 

// Server setup
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
    // connect to MongoDB
    connectToMongoDB();

})


// use the login router
app.use(loginRouter);
// use the signup router
app.use(signupRouter);
// use the personal profile router
app.use(personalProfileRouter);
// use the educational profile router
 app.use(educationalProfileRouter);
// use the professional profile router
app.use(professionalProfileRouter);
// use the valid identifier router
app.use(validIdentifier);