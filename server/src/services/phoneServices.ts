import twilio from 'twilio';
//import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = "ACab11528a05bfb3688514267e596090b9";
const authToken = "d804677cf08df0e79f05ab92373a66c8";
const serviceSid = "VA9e40885422c64ecca5f5f1cf7475a8ce";

if (!accountSid || !authToken || !serviceSid) {
    throw new Error('Twilio credentials are not set.');
}

const client = twilio(accountSid, authToken);

export const sendVerificationSMS = async (to: string) => {
    try {
        const verification = await client.verify.v2.services(serviceSid).verifications.create({
            to,
            channel: 'sms',
        });
        console.log('Verification SMS sent successfully.');
        return verification;
    } catch (error: any) {
        console.error('Error sending verification SMS:', error);
        throw new Error('Failed to send verification SMS');
    }
};

export const verifyPhoneCode = async (to: string, code: string) => {
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({
            to,
            code,
        });
        console.log('Verification check:', verificationCheck.status);
        return verificationCheck.status === 'approved';
    } catch (error: any) {
        console.error('Error verifying code:', error);
        throw new Error('Failed to verify code');
    }
};

// export const generateSMSVerificationToken = (length: number = 6): string => {
//     const characters = '0123456789';
//     let token = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = crypto.randomInt(0, characters.length);
//         token += characters.charAt(randomIndex);
//     }
//     return token;
// };