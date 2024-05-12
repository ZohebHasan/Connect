// creating a controller for login
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user_model';

// login controller
export const login = async (req: Request, res: Response) => {
    // get the user details from the request body
    const { email, password } = req.body;
    // check if email or username is provided
    if (!email ) {
        return res.status(400).json({ message: 'Email is required' });
    }
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    // check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    // create a token
    // const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    // send the token and user details
    res.status(200).json({ user });
};