"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtectedResource = void 0;
const getProtectedResource = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ message: 'This is a protected resource', user: req.user });
};
exports.getProtectedResource = getProtectedResource;
