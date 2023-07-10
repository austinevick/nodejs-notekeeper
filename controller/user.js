import User from "../model/user.js";
import { sendEmail } from "../utils/email.js";
import { generateToken } from "../utils/token.js";
import bcrypt from 'bcrypt';


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email }).select('+password');
        if (user && (await bcrypt.compare(password, user.password))) {
            let token = generateToken(user._id);
            const data = await User.findOne({ email });
            return res.status(200).json({
                status: 200,
                message: 'success',
                data: data,
                token: token
            });
        }
        return res.status(400).json({
            status: 400,
            message: 'Invalid email or password',
            data: null
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message

        });
    }
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!(name && email && password)) {
            return res.status(400).json({
                status: 400,
                message: 'All fields are required',
                data: null
            });
        }
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({
                status: 400,
                message: 'User already exists',
                data: null
            });
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password
        });
        if (user) {
            const data = await User.findOne({ email: user.email });
            let token = generateToken(user._id);
            return res.status(201).json({
                status: 201,
                message: 'Congratulations, your account has been successfully created.',
                data: data,
                token: token
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }

};

export const forgotPassword = async (req, res, next) => {
    // Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "We could not find the user with given email."
        });
    }
    // Generate a random token
    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Send the token back to the user email
    const resetUrl = `${ req.protocol }://${ req.get("host") }/api/user/resetPassword/${ resetToken }`;
    const message = `We have received a password reset request. Please use the link below to reset your password\n\n${ resetUrl }`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password change request received',
            message: message
        });
        return res.status(200).json({
            status: 200,
            message: "Password reset link send to the user email successfully."
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({ validateBeforeSave: false });
        return res.status(500).json({
            status: 500,
            message: "There was an error sending password reset email. Please try again later"
        });
    }

};

export const resetPassword = (req, res, next) => {



};
