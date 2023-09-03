import { Router } from "express";
import { courseController } from "../controllers/index.js";

const courseRouter = Router();

courseRouter
    .route("/")
    .get(courseController.getAllCourses)
    .post(courseController.createCourse)
    .patch()
    .delete()

courseRouter
    .route("/:courseID")
    .get(courseController.getCourseByID)
    .post()
    .patch(courseController.updateCourseByID)
    .delete(courseController.deleteCourseByID)

export default courseRouter;