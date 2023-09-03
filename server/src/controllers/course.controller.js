import mongoose from "mongoose";
import { HttpStatus } from "../constant/constant.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { Course } from "../schemaModels/model.js";
import asyncErrorHandler from "../utils/asyncHandler.js";
import { throwError } from "../utils/throwError.js";

export const createCourse = asyncErrorHandler(async (req, res) => {
    const { title, duration } = req.body;

    if (!title || !duration) {
        throwError({ message: "Course title and description are required", statusCode: HttpStatus.BAD_REQUEST });
    }

    const isCourseExists = await Course.findOne({ title: title.toUpperCase() })

    if (isCourseExists) {
        throwError({ message: "Course with this title already exists", statusCode: HttpStatus.CONFLICT })
    }

    const course = await Course({ title, duration });

    const newCourseDetails = await course.save();

    sendSuccessResponse({
        res,
        data: newCourseDetails,
        message: "Course is added successfully"
    })

})

export const getAllCourses = asyncErrorHandler(async (req, res) => {
    const courses = await Course.find();
    sendSuccessResponse({
        res,
        data: courses,
        message: "List of courses retrieved successfully"
    });
})

export const getCourseByID = asyncErrorHandler(async (req, res) => {

    const courseID = req.params.courseID;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    const course = await Course.findById(courseID);

    if (!course) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    sendSuccessResponse({
        res,
        data: course,
        message: "Course retrieved successfully"
    });
})

export const updateCourseByID = asyncErrorHandler(async (req, res) => {

    const courseID = req.params.courseID;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    const { title, duration } = req.body;

    if (!title || !duration) {
        throwError({ message: "Course title and duration are required", statusCode: HttpStatus.BAD_REQUEST });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
        courseID,
        { title, duration }
    );

    if (!updatedCourse) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    sendSuccessResponse({
        res,
        message: "Course updated successfully"
    })
})

export const deleteCourseByID = asyncErrorHandler(async (req, res) => {

    const courseID = req.params.courseID;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    const deletedCourse = await Course.findByIdAndRemove(courseID);

    if (!deletedCourse) {
        throwError({ message: "Course not found", statusCode: HttpStatus.NOT_FOUND });
    }

    sendSuccessResponse({
        res,
        message: "Course deleted successfully"
    })
})