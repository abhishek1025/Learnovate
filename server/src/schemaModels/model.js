import { model } from "mongoose";

import feedbackSchema from "./schemas/feedback.schema.js";

import userSchema from "./schemas/user.schema.js";
import teacherSchema from "./schemas/teacher.schema.js";

import courseSchema from "./schemas/course.schema.js";
import subjectSchema from "./schemas/subject.schema.js";

import examSchema from "./schemas/exam.schema.js";
import examMaterialSchema from './schemas/examMaterials.schema.js';
import examReportSchema from "./schemas/examReport.schema.js";


export const User = model("User", userSchema)
export const Teacher = model("Teacher", teacherSchema)

export const Feedback = model("Feedback", feedbackSchema);

export const Course = model("Course", courseSchema);
export const Subject = model("Subject", subjectSchema);

export const Exam = model("Exam", examSchema)
export const ExamMaterial = model("ExamMaterial", examMaterialSchema)
export const ExamReport = model("ExamReport", examReportSchema);