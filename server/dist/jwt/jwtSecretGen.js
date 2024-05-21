"use strict";
const cryptoLib = require('crypto');
const generateSecret = () => {
    return cryptoLib.randomBytes(64).toString('hex');
};
const JWT_SECRET = generateSecret();
const JWT_REFRESH_SECRET = generateSecret();
console.log('JWT_SECRET:', JWT_SECRET);
console.log('JWT_REFRESH_SECRET:', JWT_REFRESH_SECRET);
