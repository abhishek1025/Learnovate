import mongoose from "mongoose";

// Create a schema for the questions
const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    options: [String],
    correctAnswer: { type: String },
});

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, // Exam title
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, // Exam date
    duration: {
        type: Number,
        required: true
    }, // Exam duration in minutes
    questions: [questionSchema]
}, { timestamps: true })


export default examSchema;