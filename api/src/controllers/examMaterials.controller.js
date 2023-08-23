import { HttpStatus } from "../constant/constant.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { Exam, ExamMaterial, User } from "../schemaModels/model.js";
import asyncErrorHandler from "../utils/asyncHandler.js";
import sendMail from "../utils/sendMail.js";
import { throwError } from "../utils/throwError.js";
import { getAllStudentEmails } from "./user.controller.js";


export const addExamMaterials = asyncErrorHandler(async (req, res) => {

    const { links, examID, teacherID } = req.body

    if (!teacherID || !examID) {
        throwError({
            message: "Exam ID or Teacher ID is missing"
        })
    }

    const files = req.files.map(({ originalname, filename }) => {
        return {
            originalFileName: originalname,
            path: `http://localhost:${process.env.SERVER_PORT || process.env.DEFAULT_PORT}/${filename}`
        }
    })

    const examMaterial = ExamMaterial({
        exam: examID,
        teacher: teacherID,
        links,
        files
    })

    const teacher = await User.findById(teacherID).select("name");
    const exam = await Exam.findById(examID).select("title");

    await examMaterial.save();

    const studentMails = await getAllStudentEmails();

    const emailContent = {
        from: process.env.email,
        to: studentMails,
        subject: 'Notice About Exam Materials',
        html: `
        <p>Dear Students,</p>

        <p>We hope this message finds you well. We wanted to inform you that new exam materials for <b> ${exam.title} </b> have been added to your course by your instructor,
         ${teacher.name}. These materials are designed to aid your preparation and enhance your understanding of the course material.</p>

        <p>You can access these materials by logging into your account on our online learning platform.

        <p>Best regards,</p>
        <p>Your Online Learning Team</p>`
    }

    await sendMail(emailContent)

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Exam materials are added successfully"
    })

})

export const getAllExamMaterials = async (req, res) => {

    const examMaterials = await ExamMaterial
        .find()
        .populate({
            path: "exam",
            select: "title date duration"
        })
        .populate({
            path: "teacher",
            select: "-password"
        })

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        data: examMaterials,
        message: "All exam materials"
    })
}