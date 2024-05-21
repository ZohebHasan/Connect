import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey("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");

export const sendVerificationEmail = async (to: string, verificationToken: string) => {
    const msg = {
        to,
        from: 'admin@connectai.earth',
        templateId: 'd-ed644ff94c2346a181e2f92d4398e1f0',
        dynamic_template_data: {
            verificationToken,
        },
    };

    try {
        await sgMail.send(msg);
        console.log('Verification email sent successfully.');
    } catch (error: any) {
        console.error('Error sending verification email:', error.response ? error.response.body : error);
        throw new Error('Failed to send verification email');
    }
};

export const generateVerificationToken = (length: number = 6): string => {
    const characters = '0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};
