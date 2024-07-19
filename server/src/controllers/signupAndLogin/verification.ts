import { Request, Response } from 'express';
import { sendVerificationEmail, generateEmailVerificationToken } from '../../services/emailServices';
import { sendVerificationSMS, verifyPhoneCode } from '../../services/phoneServices';
import User from '../../models/userModel'; 
const verificationCodes = new Map<string, { code: string, timestamp: number }>();

export const sendVerificationEmailController = async (req: Request, res: Response) => {
    const { email} = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    const verificationToken = generateEmailVerificationToken();
    const timestamp = Date.now();
    verificationCodes.set(email, { code: verificationToken, timestamp }); 
    try {
        await sendVerificationEmail(email, verificationToken);
        res.status(200).send({ message: 'Verification email sent', token: verificationToken });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send verification email' });
    }
};



export const verifyEmailCodeController = async (req: Request, res: Response) => {
    const { email, code} = req.body;
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
        const user = await User.findOneAndUpdate({email: email},{ verified: true });

        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Code verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid code' });
    }
};


export const sendVerificationSMSController = async (req: Request, res: Response) => {
    const { phone} = req.body;
    if (!phone) {
        return res.status(400).send('Phone number is required');
    }

    try {
        await sendVerificationSMS(phone);
        res.status(200).send({ message: 'Verification SMS sent'});
    } catch (error) {
        res.status(500).send({ error: 'Failed to send verification SMS' });
    }
};

// Controller for verifying phone code
export const verifyPhoneCodeController = async (req: Request, res: Response) => {
    const { phone, code} = req.body;
    if (!phone || !code) {
        return res.status(400).send({ message: 'Phone number and code are required' });
    }
    if (await verifyPhoneCode(phone, code)) { 
        const user = await User.findOneAndUpdate({phoneNumber: phone.slice(3)},{ verified: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Code verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid code' });
    }
};