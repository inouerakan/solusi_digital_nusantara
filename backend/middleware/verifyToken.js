const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided on the device.' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format.' });
    }
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: 'Token is invalid or expired.' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;