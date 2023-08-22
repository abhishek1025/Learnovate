import { HttpStatus } from "../constant/constant.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { ExamMaterial } from "../schemaModels/model.js";
import asyncErrorHandler from "../utils/asyncHandler.js";
import { throwError } from "../utils/throwError.js";


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

    await examMaterial.save();

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