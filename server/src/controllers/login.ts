// // creating a controller for login
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import User from '../models/user_model';

// // login controller
// export const login = async (req: Request, res: Response) => {
//     // get the user details from the request body
//     const { email, password } = req.body;
    
//     if (!email ) {
//         return res.status(400).json({ message: 'identifier is required' });
//     }
    
//     // check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: 'User does not exist' });
//     }
//     // check if the password is correct
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//         return res.status(400).json({ message: 'Invalid password' });
//     }
//     // create a token
//     // const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//     // send the token and user details
//     res.status(200).json({ user });
// };


//this code should work, but for some reason it's not
// export const login = async (req: Request, res: Response) => {
//     const { identifier, password } = req.body;   
//     if (!identifier || !password) {
//         return res.status(400).json({ message: 'Identifier and password are required' });
//     }

//     const user = await User.findOne({
//         $or: [
//             { email: identifier.toLowerCase() },
//             { username: identifier.toLowerCase() },
//             { phone: identifier }
//         ]
//     });

//     if (!user) {
//         return res.status(400).json({ message: 'User does not exist' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//         return res.status(400).json({ message: 'Invalid password' });
//     }

//     res.status(200).json({ user });
// };


// check if the user sent a indentifier for an email


import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user_model";


export const login = async(req: Request, res: Response) =>{

    const {identifier, password} = req.body;
    // parse the identifier and password from the request body
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Identifier and password are required' });
    }
    const userIdentifier = parseIdentifier(identifier);
    const user = await User.findOne(userIdentifier);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });

  
        
        }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    res.status(200).json({ user: user });
}


const parseIdentifier = (identifier: string) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    if (isNaN(parseInt(identifier))) {
        return { username: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
}