import mongoose from "mongoose";
import bcrypt from "bcrypt"


const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    disableAccount: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

export default teacherSchema;