import jwt from 'jsonwebtoken';
import util from 'util';
import User from '../model/user.js';

export const protect = async (req, res, next) => {
    const checkToken = req.headers.authorization;
    let token;
    if (checkToken && checkToken.startsWith('bearer')) {
        token = checkToken.split(" ")[1];
    }
    token = checkToken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Authorization required'
        });
    }
    try {
        await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

    } catch (error) {
        if (error.expiredAt && error.expiredAt < new Date()) {
            return res.status(401).json({
                status: 401,
                message: 'Session expired'
            });
        } else {
            return res.status(401).json({
                status: 401,
                message: error.message
            });
        }
    }
    next();
};