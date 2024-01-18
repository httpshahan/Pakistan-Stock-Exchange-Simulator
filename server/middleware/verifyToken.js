const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const tokenHeader = req.header('auth-token');

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Access Denied. Token not provided.' });
    }

    const [bearer, token] = tokenHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid token format.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: 'Invalid Token' });
    }
};
module.exports = verifyToken;