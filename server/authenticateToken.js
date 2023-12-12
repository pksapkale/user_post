/*
    This is for authentication requests
    Here we are checking whether user is sending correct token or not
    If token is valid and not expired then we will proceed further otherwise we will return the request with invalid token response 
*/

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. Token not provided.' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ status: false, message: err.message });
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;