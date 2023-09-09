import { Router } from 'express';
import { teacherController } from '../controllers/index.js';
import upload from '../middlewares/uploadFile.js';

const teacherRouter = Router();

teacherRouter
    .route("/")
    .get(teacherController.getAllTeachers)
    .post(upload.single("file"), teacherController.addTeacher)
    .patch()
    .delete()

teacherRouter
    .route("/:teacherID")
    .get(teacherController.getTeacherByID)
    .post()
    .patch(upload.single("file"), teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher)

teacherRouter
    .route("/disable-account/:teacherID")
    .get()
    .post()
    .patch(teacherController.disableTeacherAccount)
    .delete()



export default teacherRouter;