// creating a controller to signup a user
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
 // import body parser

// signup controller
export const signup = async (req: Request, res: Response) => {
    // get the user details from the request body
    const { fullName, email, password, username, phoneNumber } = req.body;
    // check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    const user = new User({
        fullName,
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

