const jwt = require('jsonwebtoken');
const userModel = require('../api/models/user_model');


module.exports.isLoggedin = async function (req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.redirect('/signup');
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
            return res.redirect('/signup');
        }

        let user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            return res.redirect('/signup');
        }

        req.user = user;

        next(); 
    } catch (error) {
        return res.redirect('/signup');
    }
};
