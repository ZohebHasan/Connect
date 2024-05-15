// creating a controller to signup a user
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user_model';
 // import body parser

// signup controller
export const signup = async (req: Request, res: Response) => {
    // get the user details from the request body
    const { firstName, lastName, email, password, username, phoneNumber } = req.body;
    // check if the user already exists
   
    const userExists2 = isUnique(email, username, phoneNumber);
    if (!userExists2) {
        return res.status(400).json({ message: 'Please sign up with a different username, email or phonenumber' });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        username,
        phoneNumber
    });
    // save the user
    await user.save();
    // // create a token
    // const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    // // send the token and user details
    // res.status(201).json({ token, user });
    res.status(201).json({ user });

};

const isUnique = async (email: string, username: string, phoneNumber: string) =>  {
    
    const exists =  await User.findOne({
        $or: [
            { email },
            { username },
            { phoneNumber }
        ]
    });
    if(!exists){
        return true;
    }
    return false;


}
