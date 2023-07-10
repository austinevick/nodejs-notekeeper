import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetToken);
    return resetToken;
};


const User = mongoose.model('User', userSchema);

export default User;