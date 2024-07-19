"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMicrosoftAuthUrl = void 0;
const getMicrosoftAuthUrl = (req, res) => {
    const client_id = '3ff6f391-10d2-473e-9702-42529b920ea6';
    const response_type = 'code';
    const redirect_uri = 'http://localhost:3000/home';
    const scope = 'user.read';
    const response_mode = 'query';
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&response_mode=${response_mode}`;
    res.json({ url: authUrl });
};
exports.getMicrosoftAuthUrl = getMicrosoftAuthUrl;
