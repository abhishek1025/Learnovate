
import { Router } from 'express';
import { examReportController } from '../controllers/index.js';

const examRouter = Router();

examRouter
    .route("/")
    .get(examReportController.getAllReports)
    .post(examReportController.createExamReport)
    .patch()
    .delete()


examRouter
    .route("/:examID")
    .get(examReportController.getReportsByExamID)
    .post()
    .patch()
    .delete()

examRouter
    .route("/:examID/:userID")
    .get(examReportController.getReportsByExamIDAndUserID)
    .post()
    .patch()
    .delete()


export default examRouter;