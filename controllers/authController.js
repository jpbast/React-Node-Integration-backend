const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('authorization-token')

    if (!token) {
        res.json({
            error: true,
            message: "You must login first"
        })
    }

    let user = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!user) {
        res.json({
            error: true,
            message: "Invalid token"
        })
    }
    if (!User.findById(user.id)) {
        res.json({
            error: true,
            message: "User not registered yet"
        })
    }
    req.user = user;
    next();
}