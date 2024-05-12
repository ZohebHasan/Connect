// Importing module
import express, {Request, Response} from 'express';
// import the mongoDB connection
import { connectToMongoDB } from './database/mongoDB';
// import the login router
import loginRouter from './routers/login';
// import the signup router
import signupRouter from './routers/signup';

// import the body parser
import bodyParser from 'body-parser';

// import the cors
import cors from 'cors';

const app = express();
const PORT:Number=8000;

// use the body parser
app.use(bodyParser.json());
// express json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS with specific origins
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
     // Replace with your React app's origin
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
// use the body parser
