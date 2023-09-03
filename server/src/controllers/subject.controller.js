import mongoose from "mongoose";
import asyncErrorHandler from "../utils/asyncHandler.js";
import { throwError } from "../utils/throwError.js";
import { Course, Subject } from "../schemaModels/model.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { HttpStatus } from "../constant/constant.js";

// Create a new subject
export const createSubject = asyncErrorHandler(async (req, res) => {

    const { title, code, courseID } = req.body;

    if (!title || !code || !courseID) {
        throwError({
            message: "Subject title, code, and course are required",
            statusCode: HttpStatus.BAD_REQUEST,
        });
    }

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    const isCourseExists = await Course.findById(courseID);

    if (!isCourseExists) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    const isSubjectExists = await Subject.findOne({
        code,
        course: courseID
    });

    if (isSubjectExists) {
        throwError({
            message: "Subject with this code already exists",
            statusCode: HttpStatus.CONFLICT,
        });
    }

    const subject = new Subject({ title, code, course: courseID });

    const newSubjectDetails = await subject.save();

    sendSuccessResponse({
        res,
        data: newSubjectDetails,
        message: "Subject is added successfully",
    });
});

// Get all subjects
export const getAllSubjects = asyncErrorHandler(async (req, res) => {
    const subjects = await Subject.find().populate("course");

    sendSuccessResponse({
        res,
        data: subjects,
        message: "All subjects retrieved successfully",
    });
});

// Retrieve a subject by ID
export const getSubjectByID = asyncErrorHandler(async (req, res) => {

    const subjectID = req.params.subjectID;

    if (!mongoose.Types.ObjectId.isValid(subjectID)) {
        throwError({
            message: "Subject not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    const subject = await Subject.findById(subjectID).populate("course");

    if (!subject) {
        throwError({
            message: "Subject not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    sendSuccessResponse({
        res,
        data: subject,
        message: "Subject retrieved successfully",
    });
});

// Update a subject by ID
export const updateSubject = asyncErrorHandler(async (req, res) => {

    const subjectID = req.params.subjectID;

    if (!mongoose.Types.ObjectId.isValid(subjectID)) {
        throwError({
            message: "Subject not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    const { title, code, courseID } = req.body;

    if (!title || !code || !courseID) {
        throwError({
            message: "Subject title, code, and course ID are required",
            statusCode: HttpStatus.BAD_REQUEST,
        });
    }

    const isSubjectExists = await Subject.findOne({
        code: code,
        course: courseID
    })


    if (isSubjectExists) {
        throwError({
            message: "Failed to update: Subject with this code already exists",
            statusCode: HttpStatus.CONFLICT,
        });
    }

    const subject = await Subject.findById(subjectID);

    if (!subject) {
        throwError({
            message: "Subject Not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    subject.title = title;
    subject.code = code;
    subject.course = courseID;

    await subject.save();

    sendSuccessResponse({
        res,
        message: "Subject updated successfully",
    });
});

// Delete a subject by ID
export const deleteSubject = asyncErrorHandler(async (req, res) => {

    const subjectID = req.params.subjectID;

    if (!mongoose.Types.ObjectId.isValid(subjectID)) {
        throwError({
            message: "Subject not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    const deletedSubject = await Subject.findByIdAndRemove(subjectID);

    if (!deletedSubject) {
        throwError({
            message: "Subject not found",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }

    sendSuccessResponse({
        res,
        message: "Subject deleted successfully",
    });
});
