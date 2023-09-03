import express from "express";
import examRoutes from "./exam.routes.js";
import examMaterialRouter from "./examMaterials.routes.js";
import examReportRouter from "./examReport.routes.js";
import feedbackRouter from "./feedback.routes.js";
import userRoutes from "./user.routes.js";
import courseRouter from "./course.routes.js";
import subjectRouter from "./subject.routes.js";

const apiRoutes = express.Router()

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/feedbacks", feedbackRouter)
apiRoutes.use("/exams", examRoutes)
apiRoutes.use("/exam-material", examMaterialRouter)
apiRoutes.use("/exam-reports", examReportRouter);
apiRoutes.use("/courses", courseRouter)
apiRoutes.use("/subjects", subjectRouter)

export default apiRoutes