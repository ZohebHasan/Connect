import { Request, Response } from 'express';
import { sendVerificationEmail, generateVerificationToken } from '../services/emailServices';
const verificationCodes = new Map<string, { code: string, timestamp: number }>();

export const sendVerificationEmailController = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    const verificationToken = generateVerificationToken();
    const timestamp = Date.now();
    verificationCodes.set(email, { code: verificationToken, timestamp }); 
    try {
        await sendVerificationEmail(email, verificationToken);
        res.status(200).send({ message: 'Verification email sent', token: verificationToken });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send verification email' });
    }
};



export const verifyCodeController = async (req: Request, res: Response) => {
    const { email, code } = req.body;
    console.log(email, code);
    const data = verificationCodes.get(email);
    if (!data) {
        return res.status(400).send({ message: 'Invalid code' });
    }
    const { code: storedCode, timestamp } = data;
    console.log(storedCode, code);
    const now = Date.now();

    if (storedCode === code && now - timestamp <= 10 * 60 * 1000) { // 10 minutes expiration
        verificationCodes.delete(email); // Remove code after verification
        res.status(200).send({ message: 'Code verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid code' });
    }
};