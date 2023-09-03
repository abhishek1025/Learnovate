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
    }
}, { timestamps: true })

export default subjectSchema;
