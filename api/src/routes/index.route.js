import express from "express";
import feedbackRouter from "./feedback.routes.js";
import userRoutes from "./user.routes.js";
import examRoutes from "./exam.router.js";
import examMaterialRouter from "./examMaterials.router.js";

const apiRoutes = express.Router()

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/feedbacks", feedbackRouter)
apiRoutes.use("/exams", examRoutes)
apiRoutes.use("/exam-material", examMaterialRouter)

export default apiRoutes