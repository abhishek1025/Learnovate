import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default subjectSchema;
