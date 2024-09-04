import { Request, Response } from 'express';
import { sendVerificationEmail, generateEmailVerificationToken } from '../../../../services/schoolEmailService';

import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

import SchoolProfile from "../../../../models/profiles/school/school"
// import User from '../../../../models/userModel'; 
const verificationCodes = new Map<string, { code: string, timestamp: number }>();
export const sendVerificationEmailController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const schoolProfile = await SchoolProfile.findOne({ user: userId });

    if (!schoolProfile) {
        return res.status(404).json({ message: 'School profile not found' });
    }

    const verificationToken = generateEmailVerificationToken();
    const expiresIn = 10 * 60 * 1000; // 10 minutes
    const expirationDate = new Date(Date.now() + expiresIn);

    schoolProfile.verificationToken = verificationToken;
    schoolProfile.verificationTokenExpires = expirationDate;

    try {
        await sendVerificationEmail(email, verificationToken);
        await schoolProfile.save(); // Don't forget to save the changes to the database

        res.status(200).send({ message: 'Verification email sent', token: verificationToken });
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send({ error: 'Failed to send verification email' });
    }
};



export const verifyEmailCodeController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const { verificationCode } = req.body;

    if (!verificationCode) {
        return res.status(400).json({ message: 'Verification Code is required' });
    }

    const schoolProfile = await SchoolProfile.findOne({ user: userId });

    if (!schoolProfile) {
        return res.status(404).json({ message: 'School profile not found' });
    }

    const now = new Date();

    if (schoolProfile.verificationToken !== verificationCode) {
        return res.status(400).json({ message: 'Incorrect verification code' });
    }

    if (schoolProfile.verificationTokenExpires && now > schoolProfile.verificationTokenExpires) {
        return res.status(410).json({ message: 'Verification code has expired' });
    }

    // If the code matches and is within the 10-minute window, mark the email as verified
    schoolProfile.verifiedSchoolEmail = true;
    schoolProfile.verificationToken = undefined; // Clear the token
    schoolProfile.verificationTokenExpires = undefined; // Clear the expiration

    await schoolProfile.save();

    return res.status(200).json({ message: 'Email verified successfully' });
};


