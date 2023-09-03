import { Router } from "express";
import { subjectController } from "../controllers/index.js";

const subjectRouter = Router();

subjectRouter
    .route("/")
    .get(subjectController.getAllSubjects)
    .post(subjectController.createSubject)
    .patch()
    .delete()

subjectRouter
    .route("/:subjectID")
    .get(subjectController.getSubjectByID)
    .post()
    .patch(subjectController.updateSubject)
    .delete(subjectController.deleteSubject)


export default subjectRouter;