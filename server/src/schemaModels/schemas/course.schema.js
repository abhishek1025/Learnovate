import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        uppercase: true,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }

}, { timestamps: true })

export default courseSchema;