"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationToken = exports.sendVerificationEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey('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');
const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@200;500&display=swap" rel="stylesheet">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600px" cellspacing="0" cellpadding="0" border="0" style=" background-color: rgba(255, 255, 255, 0.4); padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: left;">
          <tr>
            <td align="left" style="padding-bottom: 5px;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="width: 50px;">
                    <img src="http://cdn.mcauto-images-production.sendgrid.net/27abe683557ca819/5375c87c-458d-4757-ac5f-2f48bca9071f/3464x3464.png" alt="Verification Image" style="width: 60px; height: 60px; object-fit: cover;">
                  </td>
                  <td align="left" style="font-size: 1.5rem; font-weight: 300; color: #333333; padding-left: 10px;">
                    Connect
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 20px;">
              <span style="font-size: 1.5rem; font-weight: 400; color: rgba(0, 0, 0, 0.6);">Verification</span>
              <span style="font-size: 1.5rem; font-weight: 400; background: linear-gradient(to right, #662D8C, #ED1E79); color: transparent; -webkit-background-clip: text; background-clip: text;">Code</span>
            </td>
          </tr>
          <tr>
            <td style="font-size: 0.9rem; color: #555555; font-weight: 300; padding-bottom: 20px;">
              Greetings,
            </td>
          </tr>
          <tr>
            <td style="font-size:  0.9rem; color: #555555; font-weight: 300; padding-bottom: 20px;">
              Please use the verification code below to complete your sign-up process:
            </td>
          </tr>
          <tr>
            <td align="left" style="padding-bottom: 20px;">
              <div style="font-size: 24px; font-weight: 500; letter-spacing: 8px; color: #333333; background-color: #f4f4f4; padding: 10px 20px; border-radius: 4px; display: inline-block;">
                {{verification_code}}
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-size: 0.9rem; color: #555555; font-weight: 300; padding-bottom: 20px;">
              If you did not request this code, please ignore this email.
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size: 12px; color: #999999; font-weight: 200; padding-top: 20px;">
              <div>Thank you for choosing privacy.</div>
              <div>Connect Inc. © 2024</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
const sendVerificationEmail = (to, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = emailTemplate.replace('{{verification_code}}', verificationToken);
    const msg = {
        to,
        from: {
            email: 'no-reply@mail.connect-platforms.com',
            name: 'Connect'
        },
        subject: 'Email Verification',
        html: emailContent,
    };
    try {
        yield mail_1.default.send(msg);
        console.log('Verification email sent successfully.');
    }
    catch (error) {
        console.error('Error sending verification email:', error.response ? error.response.body : error);
        throw new Error('Failed to send verification email');
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const generateEmailVerificationToken = (length = 6) => {
    const characters = '0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
