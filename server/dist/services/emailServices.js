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
exports.generateVerificationToken = exports.sendVerificationEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey('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');
const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@200;500&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      background-color: rgba(255, 255, 255, 0.4);
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      width: 100%;
      text-align: left;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }
    .top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
    }
    .headerText {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;
      flex: 1;
      gap: 0.3rem;
    }
    .normal {
      font-size: 2rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.600);  
      display: flex;
  
      align-items: center;
      justify-content: flex-end;
      
    }
    .gradient {
      font-size: 2rem;
      font-weight: 400;
      background: linear-gradient(to right, #662D8C, #ED1E79);
      color: transparent;                                       
      -webkit-background-clip: text;
      background-clip: text;
      display: flex;
      align-items: center;
      justify-content: flex-end;

    }
    .logo {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .logoContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
    }
    .logoContainer .image {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
    }
    .logoText {
      font-size: 2rem;
      font-weight: 300;
    }
    .code {
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 8px;
      color: #333333;
      background-color: #f4f4f4;
      padding: 10px 20px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 20px;
      text-align: center;
    }
    .message {
      font-size: 1rem;
      margin-bottom: 20px;
      color: #555555;
      font-weight: 300;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      font-weight: 200;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 0.3rem;
    }
    .copyright {
      font-size: 0.8rem;
    }
    @media (max-width: 600px) {
      .container {
        padding: 20px;
      }
      .top {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 2rem;
      }
      .headerText {

        width: 100%;
        align-items: center;
        display: flex;
        justify-content: flex-start;
      }
      .normal, .gradient {
        font-size: 1.5rem;
        
        
      }
      .logo {
        justify-content: center;
        margin-top: 10px;
      }
      .logoContainer .image {
        width: 4rem;
        height: 4rem;
      }
      .logoText {
        font-size: 1.5rem;
      }
      .code {
        font-size: 24px;
      }
      .message {
        font-size: 0.9rem;
      }
      .footer {
        font-size: 0.9rem;
      }
      .copyright {
        font-size: 0.7rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top">
      <div class="logo">
        <div class="logoContainer">
          <div class="logoImage">
            <img src="http://cdn.mcauto-images-production.sendgrid.net/27abe683557ca819/5375c87c-458d-4757-ac5f-2f48bca9071f/3464x3464.png" alt="Verification Image" class="image">
          </div>
          <div class="logoText">Connect</div>
        </div>
      </div>
        <div class="headerText">
        <div class="normal">Verification</div>
        <div class="gradient">Code</div>
      </div>
    </div>
    <div class="message">
      Greetings,
    </div>
    <div class="message">
      Please use the verification code below to complete your sign-up process:
    </div>
    <div class="code">{{verification_code}}</div>
    <div class="message">
      If you did not request this code, please ignore this email.
    </div>
    <div class="footer">
      <div class="thankyou">Thank you for choosing privacy.</div>
      <div class="copyright">Connect Inc. © 2024</div>
    </div>
  </div>
</body>
</html>
`;
const sendVerificationEmail = (to, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const emailContent = emailTemplate.replace('{{verification_code}}', verificationToken);
    const msg = {
        to,
        from: 'nikhilks29@gmail.com',
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
const generateVerificationToken = (length = 6) => {
    const characters = '0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};
exports.generateVerificationToken = generateVerificationToken;
