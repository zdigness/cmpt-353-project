require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check token
    if (!token) res.status(401).json({ msg: 'authorization denied' });

    try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // add user from payload
    req.user = decoded;
    next();
    } catch(e) {
    }
}

module.exports = auth;