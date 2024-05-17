import {Request, Response} from 'express';
import User from '../models/userModel';

export const validIdentifier =  async (req: Request, res: Response) => {
    const {identifier} = req.body;
    if (!identifier) {
        return res.status(400).json({message: 'Identifier is required'});
    }
    const userIdentifier = parseIdentifier(identifier);
    const user = await User.findOne(userIdentifier);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
        }
    res.status(200).json({ user: user });

}


const parseIdentifier = (identifier: string) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
}